// Supabase Edge Function: process-source
// Processes uploaded sources: chunks content, extracts entities, queues embeddings
// Supports PDF extraction via Google Gemini Vision API

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ProcessRequest {
  source_id: string
}

type CSuiteDomain = 'ceo' | 'cmo' | 'cvo' | 'coo' | 'cfo'

interface ExtractedEntity {
  name: string
  type: 'person' | 'company' | 'project' | 'product' | 'concept' | 'tool' | 'metric' | 'process' | 'goal' | 'location' | 'event' | 'resource'
  confidence: number
  description?: string
}

// Chunking configuration
const CHUNK_SIZE = 1000 // Target characters per chunk
const CHUNK_OVERLAP = 200 // Overlap between chunks

// Google Gemini API for PDF extraction and entity analysis
// Using Gemini 2.0 Flash for cost efficiency (~70% cheaper than Claude)
async function callGemini(
  system: string,
  userContent: string | Array<{ type: string; inlineData?: { mimeType: string; data: string }; text?: string }>,
  maxTokens: number = 4096
): Promise<string> {
  const googleKey = Deno.env.get('GOOGLE_GENERATIVE_AI_API_KEY')
  if (!googleKey) {
    throw new Error('GOOGLE_GENERATIVE_AI_API_KEY not configured')
  }

  // Build parts array for Gemini
  const parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = []

  if (typeof userContent === 'string') {
    parts.push({ text: userContent })
  } else {
    for (const item of userContent) {
      if (item.type === 'text' && item.text) {
        parts.push({ text: item.text })
      } else if (item.type === 'document' && item.inlineData) {
        parts.push({ inlineData: item.inlineData })
      }
    }
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${googleKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ parts }],
        generationConfig: {
          maxOutputTokens: maxTokens,
        },
      }),
    }
  )

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Gemini API error: ${error}`)
  }

  const data = await response.json()
  return data.candidates[0].content.parts[0].text
}

// Extract text from PDF using Google Gemini Vision
async function extractPdfContent(pdfData: ArrayBuffer): Promise<string> {
  const base64 = btoa(
    new Uint8Array(pdfData).reduce((data, byte) => data + String.fromCharCode(byte), '')
  )

  const result = await callGemini(
    'You are a document text extractor. Extract ALL text content from the provided PDF document. Preserve the structure including headings, paragraphs, lists, and tables. Output only the extracted text, no commentary.',
    [
      {
        type: 'document',
        inlineData: {
          mimeType: 'application/pdf',
          data: base64,
        },
      },
      {
        type: 'text',
        text: 'Please extract all text content from this PDF document, preserving the structure.',
      },
    ],
    8192
  )

  return result
}

// Gemini-powered entity extraction
async function extractEntitiesWithGemini(
  content: string,
  domains: CSuiteDomain[]
): Promise<ExtractedEntity[]> {
  const domainContext = {
    ceo: 'CEO/Strategy: focus on leadership, vision, strategy, culture, partnerships',
    cmo: 'CMO/Marketing: focus on customers, marketing, sales, brand, acquisition',
    cvo: 'CVO/Value: focus on products, services, innovation, value creation',
    coo: 'COO/Operations: focus on processes, systems, efficiency, administration',
    cfo: 'CFO/Finance: focus on metrics, revenue, costs, cash flow, forecasting',
  }

  const domainHints = domains.map((d) => domainContext[d]).join('; ')

  // Truncate content if too long
  const truncatedContent = content.slice(0, 15000)

  const systemPrompt = `You are an entity extraction system for a business knowledge graph.
Extract entities from the provided text. Focus on: ${domainHints}

Return a JSON array of entities with this exact structure:
[
  {
    "name": "Entity Name",
    "type": "person|company|project|product|concept|tool|metric|process|goal|location|event|resource",
    "confidence": 0.0-1.0,
    "description": "Brief description if available"
  }
]

Rules:
- Only extract concrete, specific entities (not generic terms)
- Confidence should reflect how certain you are about the entity type
- Skip entities that are too vague or common
- Maximum 20 entities
- Return ONLY valid JSON, no other text`

  try {
    const result = await callGemini(systemPrompt, truncatedContent, 2000)

    // Parse JSON from response (handle potential markdown code blocks)
    let jsonStr = result.trim()
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/```(?:json)?\n?/g, '').trim()
    }

    const entities = JSON.parse(jsonStr) as ExtractedEntity[]

    // Validate and filter
    return entities.filter(
      (e) =>
        e.name &&
        e.type &&
        typeof e.confidence === 'number' &&
        e.confidence >= 0 &&
        e.confidence <= 1
    )
  } catch (error) {
    console.error('Gemini entity extraction failed:', error)
    // Fall back to basic extraction
    return extractBasicEntities(content)
  }
}

// Split text into semantic chunks
function chunkText(text: string, maxSize: number = CHUNK_SIZE, overlap: number = CHUNK_OVERLAP): string[] {
  const chunks: string[] = []

  // Split by paragraphs first
  const paragraphs = text.split(/\n\n+/)

  let currentChunk = ''

  for (const paragraph of paragraphs) {
    // If adding this paragraph exceeds max size
    if (currentChunk.length + paragraph.length > maxSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim())

      // Start new chunk with overlap from end of previous
      const overlapText = currentChunk.slice(-overlap)
      currentChunk = overlapText + '\n\n' + paragraph
    } else {
      currentChunk += (currentChunk ? '\n\n' : '') + paragraph
    }
  }

  // Don't forget the last chunk
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim())
  }

  return chunks
}

// Extract content from storage file
async function extractContent(
  supabase: ReturnType<typeof createClient>,
  storagePath: string,
  mimeType: string
): Promise<string> {
  // Download file
  const { data, error } = await supabase.storage
    .from('knowledge-sources')
    .download(storagePath)

  if (error) {
    throw new Error(`Storage download error: ${error.message}`)
  }

  // Handle different file types
  if (mimeType === 'text/plain' || mimeType === 'text/markdown') {
    return await data.text()
  }

  if (mimeType === 'application/json') {
    const json = await data.json()
    return JSON.stringify(json, null, 2)
  }

  // PDF extraction using Claude Vision API
  if (mimeType === 'application/pdf') {
    const arrayBuffer = await data.arrayBuffer()
    return await extractPdfContent(arrayBuffer)
  }

  // CSV - convert to readable text
  if (mimeType === 'text/csv' || mimeType === 'application/csv') {
    return await data.text()
  }

  // DOCX - basic extraction (would need more sophisticated handling for production)
  if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    // For DOCX, we can try to use Claude to extract from the raw XML
    // This is a simplified approach - production would use a proper DOCX parser
    try {
      const text = await data.text()
      // If it's readable as text, return it
      if (text && text.length > 0) {
        return text
      }
    } catch {
      // Fall through to error
    }
    throw new Error('DOCX extraction requires additional processing - please convert to PDF or TXT')
  }

  // Fallback: try to read as text
  try {
    return await data.text()
  } catch {
    throw new Error(`Unsupported file type: ${mimeType}. Supported: PDF, TXT, MD, JSON, CSV`)
  }
}

// Fetch URL content
async function fetchUrlContent(url: string): Promise<string> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch URL: ${response.status}`)
  }

  const contentType = response.headers.get('content-type') || ''

  if (contentType.includes('text/html')) {
    // Strip HTML tags for now (basic extraction)
    const html = await response.text()
    return html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  }

  return await response.text()
}

// Simple entity extraction (would use Claude for better extraction)
function extractBasicEntities(text: string): Array<{
  name: string
  type: string
  confidence: number
}> {
  const entities: Array<{ name: string; type: string; confidence: number }> = []

  // Extract URLs as potential tools/resources
  const urlRegex = /https?:\/\/[^\s]+/g
  const urls = text.match(urlRegex) || []
  for (const url of urls) {
    entities.push({
      name: new URL(url).hostname,
      type: 'tool',
      confidence: 0.7,
    })
  }

  // Extract capitalized phrases (potential people/companies)
  const capitalizedRegex = /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)\b/g
  const capitalized = text.match(capitalizedRegex) || []
  for (const name of capitalized.slice(0, 10)) {
    // Limit to avoid noise
    if (name.length > 3 && name.length < 50) {
      entities.push({
        name,
        type: 'person', // Could be person or company
        confidence: 0.5,
      })
    }
  }

  return entities
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

    const body: ProcessRequest = await req.json()
    const { source_id } = body

    if (!source_id) {
      return new Response(JSON.stringify({ error: 'source_id is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Get the source
    const { data: source, error: sourceError } = await supabase
      .from('knowledge_sources')
      .select('*')
      .eq('id', source_id)
      .single()

    if (sourceError || !source) {
      throw new Error(`Source not found: ${sourceError?.message}`)
    }

    // Update status to processing
    await supabase
      .from('knowledge_sources')
      .update({ status: 'processing' })
      .eq('id', source_id)

    let content: string

    try {
      // Extract content based on source type
      if (source.source_type === 'file' && source.storage_path) {
        content = await extractContent(supabase, source.storage_path, source.mime_type || 'text/plain')
      } else if (source.source_type === 'url' && source.url) {
        content = await fetchUrlContent(source.url)
      } else if (source.source_type === 'note') {
        // Notes should already have chunks, skip processing
        await supabase
          .from('knowledge_sources')
          .update({ status: 'completed', processed_at: new Date().toISOString() })
          .eq('id', source_id)

        return new Response(JSON.stringify({ success: true, message: 'Note already processed' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      } else {
        throw new Error('Unsupported source type or missing content location')
      }

      // Chunk the content
      const chunks = chunkText(content)

      // Insert chunks
      const chunkInserts = chunks.map((chunkContent, index) => ({
        source_id,
        content: chunkContent,
        chunk_index: index,
        depth: 0,
        domains: source.domains,
      }))

      const { error: chunksError } = await supabase.from('knowledge_chunks').insert(chunkInserts)

      if (chunksError) {
        throw new Error(`Chunk insert error: ${chunksError.message}`)
      }

      // Extract entities using Gemini (falls back to basic extraction)
      const googleKey = Deno.env.get('GOOGLE_GENERATIVE_AI_API_KEY')
      const entities = googleKey
        ? await extractEntitiesWithGemini(content, source.domains as CSuiteDomain[])
        : extractBasicEntities(content)

      // Insert unique entities
      let entitiesCreated = 0
      for (const entity of entities) {
        // Check if entity exists
        const { data: existing } = await supabase
          .from('knowledge_entities')
          .select('id')
          .eq('profile_id', source.profile_id)
          .eq('normalized_name', entity.name.toLowerCase())
          .eq('entity_type', entity.type)
          .single()

        if (!existing) {
          const { error: entityError } = await supabase.from('knowledge_entities').insert({
            profile_id: source.profile_id,
            organization_id: source.organization_id,
            entity_type: entity.type,
            name: entity.name,
            description: entity.description || null,
            domains: source.domains,
            provenance: 'ai_extracted',
            confidence_score: entity.confidence,
          })

          if (!entityError) {
            entitiesCreated++
          }
        }
      }

      // Update source with stats
      await supabase
        .from('knowledge_sources')
        .update({
          status: 'completed',
          processed_at: new Date().toISOString(),
          word_count: content.split(/\s+/).length,
        })
        .eq('id', source_id)

      return new Response(
        JSON.stringify({
          success: true,
          chunks_created: chunks.length,
          entities_extracted: entities.length,
          entities_created: entitiesCreated,
          used_gemini_extraction: !!googleKey,
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    } catch (processingError) {
      // Mark as failed
      await supabase
        .from('knowledge_sources')
        .update({
          status: 'failed',
          error_message: processingError.message,
        })
        .eq('id', source_id)

      throw processingError
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
