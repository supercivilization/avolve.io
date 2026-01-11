// Durable Knowledge Processing Workflow
// Future integration with Vercel Workflow SDK
//
// The Workflow SDK (workflow@4.x-beta) requires:
// 1. TypeScript plugin configuration
// 2. Specific build setup with workflow compiler
// 3. Vercel deployment configuration
//
// This file documents the intended workflow structure for when
// we fully integrate the Workflow SDK.
//
// For now, the Edge Function at supabase/functions/process-source/index.ts
// handles knowledge processing.

/**
 * Future Workflow: Process Knowledge Source
 *
 * Durable steps:
 * 1. Extract content (file/URL/note)
 * 2. PDF extraction with Gemini Vision
 * 3. Chunk content semantically
 * 4. Extract entities with AI
 * 5. Save chunks to database
 * 6. Save entities to database
 *
 * Benefits when implemented:
 * - Automatic retries on failure
 * - Resumable from any step
 * - Observable via Vercel dashboard
 * - Survives deployments and crashes
 */

export interface ProcessKnowledgeInput {
  sourceId: string
  userId: string
  sourceType: 'file' | 'url' | 'note'
  storagePath?: string
  url?: string
  content?: string
  mimeType?: string
  domains: string[]
}

export interface ProcessKnowledgeOutput {
  chunksCreated: number
  entitiesExtracted: number
  entitiesCreated: number
  wordCount: number
}

// Placeholder for future workflow implementation
// When Workflow SDK is stable, this will use:
// import { workflow, task } from 'workflow'
//
// export const processKnowledgeWorkflow = workflow<ProcessKnowledgeInput, ProcessKnowledgeOutput>(
//   'process-knowledge',
//   async (ctx) => { ... }
// )

export async function processKnowledge(
  input: ProcessKnowledgeInput
): Promise<ProcessKnowledgeOutput> {
  // For now, call the Edge Function directly
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/process-source`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ source_id: input.sourceId }),
    }
  )

  if (!response.ok) {
    throw new Error(`Processing failed: ${await response.text()}`)
  }

  return response.json()
}
