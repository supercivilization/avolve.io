// Supabase Edge Function: embed-content
// Generates embeddings using OpenAI and processes the embedding queue
// Note: Using OpenAI for embeddings (1536 dims, proven quality) while chat uses Google Gemini

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmbedRequest {
  content?: string
  model?: string
  // For batch processing from queue
  process_queue?: boolean
  batch_size?: number
}

interface OpenAIEmbeddingResponse {
  data: Array<{
    embedding: number[]
    index: number
  }>
  usage: {
    prompt_tokens: number
    total_tokens: number
  }
}

// Generate embeddings using OpenAI's text-embedding-3-small model
// Cost: ~$0.02/M tokens (very cheap, excellent quality)
// Output: 1536 dimensions
async function generateEmbedding(
  content: string,
  model: string = 'text-embedding-3-small'
): Promise<number[]> {
  const openaiKey = Deno.env.get('OPENAI_API_KEY')
  if (!openaiKey) {
    throw new Error('OPENAI_API_KEY not configured')
  }

  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input: content,
      model,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`OpenAI API error: ${error}`)
  }

  const data: OpenAIEmbeddingResponse = await response.json()
  return data.data[0].embedding
}

async function processEmbeddingQueue(
  supabase: ReturnType<typeof createClient>,
  batchSize: number = 10
) {
  // Get pending items from queue
  const { data: queueItems, error: queueError } = await supabase
    .from('embedding_queue')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: true })
    .limit(batchSize)

  if (queueError) {
    throw new Error(`Queue fetch error: ${queueError.message}`)
  }

  if (!queueItems || queueItems.length === 0) {
    return { processed: 0, failed: 0 }
  }

  let processed = 0
  let failed = 0

  for (const item of queueItems) {
    try {
      // Mark as processing
      await supabase
        .from('embedding_queue')
        .update({ status: 'processing', attempts: item.attempts + 1 })
        .eq('id', item.id)

      // Generate embedding
      const embedding = await generateEmbedding(item.content, item.model)

      // Update the target record
      const { error: updateError } = await supabase
        .from(item.target_table)
        .update({ [item.target_column]: embedding, embedding_model: item.model })
        .eq('id', item.target_id)

      if (updateError) {
        throw updateError
      }

      // Mark as completed
      await supabase
        .from('embedding_queue')
        .update({ status: 'completed', processed_at: new Date().toISOString() })
        .eq('id', item.id)

      processed++
    } catch (error) {
      // Mark as failed
      await supabase
        .from('embedding_queue')
        .update({
          status: item.attempts >= 3 ? 'failed' : 'pending',
          last_error: error.message,
        })
        .eq('id', item.id)

      failed++
    }
  }

  return { processed, failed }
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const body: EmbedRequest = await req.json()

    // Direct embedding request
    if (body.content) {
      const embedding = await generateEmbedding(body.content, body.model)
      return new Response(JSON.stringify({ embedding }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Process queue
    if (body.process_queue) {
      const result = await processEmbeddingQueue(supabase, body.batch_size)
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(
      JSON.stringify({ error: 'Invalid request: provide content or process_queue' }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
