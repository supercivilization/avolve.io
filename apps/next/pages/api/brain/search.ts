// API Route: /api/brain/search
// Hybrid semantic + keyword search for the Project Brain

import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import type { SearchResponse } from 'app/features/brain/types'
import { BrainSearchRequestSchema, validateRequest, sanitizeInput } from '../../../lib/validation'
import { checkRateLimit, setRateLimitHeaders, RATE_LIMITS } from '../../../lib/rate-limit'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get auth token
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const token = authHeader.replace('Bearer ', '')

    // Create authenticated Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    // Rate limiting - check before processing
    const rateLimitResult = checkRateLimit(user.id, RATE_LIMITS.brainSearch)
    setRateLimitHeaders(res, rateLimitResult, RATE_LIMITS.brainSearch)

    if (!rateLimitResult.success) {
      return res.status(429).json({
        error: 'Too many requests',
        retryAfter: Math.ceil((rateLimitResult.retryAfterMs || 60000) / 1000),
      })
    }

    // Validate request body with Zod
    const validation = validateRequest(BrainSearchRequestSchema, req.body)
    if (!validation.success) {
      return res.status(400).json({
        error: validation.error,
        details: validation.details,
      })
    }

    const {
      query: rawQuery,
      domains,
      source_types,
      limit = 20,
      offset = 0,
      semantic_weight = 0.7,
    } = validation.data!

    // Sanitize query
    const query = sanitizeInput(rawQuery)

    const startTime = performance.now()

    // Generate embedding for semantic search
    let queryEmbedding: number[] | null = null
    try {
      const { data: embeddingData, error: embeddingError } = await supabase.functions.invoke(
        'embed-content',
        {
          body: { content: query, model: 'text-embedding-3-small' },
        }
      )

      if (!embeddingError && embeddingData?.embedding) {
        queryEmbedding = embeddingData.embedding
      }
    } catch (e) {
      console.error('Embedding generation error:', e)
    }

    // Perform hybrid search
    const { data: searchResults, error: searchError } = await supabase.rpc('hybrid_search_knowledge', {
      query_text: query,
      query_embedding: queryEmbedding,
      filter_domains: domains && domains.length > 0 ? domains : null,
      filter_profile_id: user.id,
      semantic_weight: queryEmbedding ? semantic_weight : 0,
      keyword_weight: queryEmbedding ? 1 - semantic_weight : 1,
      match_count: limit + offset, // Get extra for offset
    })

    if (searchError) {
      throw new Error(`Search error: ${searchError.message}`)
    }

    // Apply offset
    const paginatedResults = (searchResults || []).slice(offset, offset + limit)

    // Get source details
    const sourceIds = [...new Set(paginatedResults.map((r: any) => r.source_id))]
    const { data: sources } = await supabase
      .from('knowledge_sources')
      .select('id, title, source_type')
      .in('id', sourceIds)

    const sourceMap = new Map(sources?.map((s) => [s.id, s]) || [])

    // Filter by source type if specified
    let results = paginatedResults
    if (source_types && source_types.length > 0) {
      results = results.filter((r: any) => {
        const source = sourceMap.get(r.source_id)
        return source && source_types.includes(source.source_type)
      })
    }

    // Format response
    const chunks = results.map((chunk: any) => {
      const source = sourceMap.get(chunk.source_id)
      return {
        id: chunk.id,
        source_id: chunk.source_id,
        content: chunk.content,
        score: chunk.score,
        domains: chunk.domains,
        source_title: source?.title || 'Unknown',
        source_type: source?.source_type || 'file',
        metadata: {},
      }
    })

    const endTime = performance.now()

    const response: SearchResponse = {
      chunks,
      total: searchResults?.length || 0,
      took_ms: Math.round(endTime - startTime),
    }

    res.status(200).json(response)
  } catch (error) {
    console.error('Search API error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
