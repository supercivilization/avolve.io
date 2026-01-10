'use client'

import { useQuery, useMutation } from '@tanstack/react-query'
import { useState, useCallback, useMemo } from 'react'
import { useSupabase } from 'app/utils/supabase/useSupabase'
import { useUser } from 'app/utils/useUser'
import type {
  SearchRequest,
  SearchResult,
  SearchResponse,
  CSuiteDomain,
  KnowledgeSourceType,
  EntityType,
} from '../types'

const SEARCH_QUERY_KEY = 'knowledge-search'

// Debounce hook for search input
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useMemo(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

interface UseKnowledgeSearchOptions {
  debounceMs?: number
  defaultDomains?: CSuiteDomain[]
  defaultLimit?: number
}

export function useKnowledgeSearch(options: UseKnowledgeSearchOptions = {}) {
  const { debounceMs = 300, defaultDomains, defaultLimit = 10 } = options
  const supabase = useSupabase()
  const { user } = useUser()

  const [query, setQuery] = useState('')
  const [domains, setDomains] = useState<CSuiteDomain[]>(defaultDomains || [])
  const [sourceTypes, setSourceTypes] = useState<KnowledgeSourceType[]>([])
  const [entityTypes, setEntityTypes] = useState<EntityType[]>([])
  const [semanticWeight, setSemanticWeight] = useState(0.7)

  const debouncedQuery = useDebounce(query, debounceMs)

  const searchQuery = useQuery({
    queryKey: [
      SEARCH_QUERY_KEY,
      {
        query: debouncedQuery,
        domains,
        sourceTypes,
        entityTypes,
        semanticWeight,
        userId: user?.id,
      },
    ],
    queryFn: async (): Promise<SearchResponse> => {
      if (!user?.id || !debouncedQuery.trim()) {
        return { chunks: [], total: 0, took_ms: 0 }
      }

      const startTime = performance.now()

      // Call the hybrid search function via RPC
      // Note: RPC function types will be available after migration
      const { data, error } = await (supabase as any).rpc('hybrid_search_knowledge', {
        query_text: debouncedQuery,
        query_embedding: null, // Will be generated server-side
        filter_domains: domains.length > 0 ? domains : null,
        filter_profile_id: user.id,
        semantic_weight: semanticWeight,
        keyword_weight: 1 - semanticWeight,
        match_count: defaultLimit,
      })

      if (error) throw error

      // Get source info for results
      const sourceIds = [...new Set((data || []).map((r: any) => r.source_id))]
      const { data: sources } = await (supabase as any)
        .from('knowledge_sources')
        .select('id, title, source_type')
        .in('id', sourceIds)

      const sourceMap = new Map(
        (sources as Array<{ id: string; title: string; source_type: string }> || []).map((s) => [s.id, s])
      )

      const chunks: SearchResult[] = (data || []).map((chunk: any) => {
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

      return {
        chunks,
        total: chunks.length,
        took_ms: Math.round(endTime - startTime),
      }
    },
    enabled: !!user?.id && debouncedQuery.trim().length > 2,
    staleTime: 30000, // Cache for 30 seconds
  })

  const clearSearch = useCallback(() => {
    setQuery('')
    setDomains(defaultDomains || [])
    setSourceTypes([])
    setEntityTypes([])
  }, [defaultDomains])

  return {
    // State
    query,
    setQuery,
    domains,
    setDomains,
    sourceTypes,
    setSourceTypes,
    entityTypes,
    setEntityTypes,
    semanticWeight,
    setSemanticWeight,
    clearSearch,

    // Results
    results: searchQuery.data?.chunks || [],
    total: searchQuery.data?.total || 0,
    took_ms: searchQuery.data?.took_ms || 0,
    isLoading: searchQuery.isLoading,
    isFetching: searchQuery.isFetching,
    error: searchQuery.error,
  }
}

// Semantic-only search (for when we have embeddings)
export function useSemanticSearch() {
  const supabase = useSupabase()
  const { user } = useUser()

  return useMutation({
    mutationFn: async ({
      query,
      domains,
      limit = 10,
      threshold = 0.5,
    }: {
      query: string
      domains?: CSuiteDomain[]
      limit?: number
      threshold?: number
    }) => {
      if (!user?.id) throw new Error('User not authenticated')

      // First, get the embedding for the query via Edge Function
      const { data: embeddingData, error: embeddingError } = await supabase.functions.invoke(
        'embed-content',
        {
          body: { content: query, model: 'text-embedding-3-small' },
        }
      )

      if (embeddingError) throw embeddingError

      // Then search with the embedding
      const { data, error } = await (supabase as any).rpc('search_knowledge_chunks', {
        query_embedding: embeddingData.embedding,
        match_count: limit,
        match_threshold: threshold,
        filter_domains: domains?.length ? domains : null,
        filter_profile_id: user.id,
      })

      if (error) throw error

      return data as SearchResult[]
    },
  })
}

// Quick search for autocomplete/suggestions
export function useQuickSearch() {
  const supabase = useSupabase()
  const { user } = useUser()

  return useMutation({
    mutationFn: async ({
      query,
      limit = 5,
    }: {
      query: string
      limit?: number
    }) => {
      if (!user?.id || !query.trim()) return { chunks: [], entities: [] }

      // Search chunks by keyword
      const { data: chunks } = await (supabase as any)
        .from('knowledge_chunks')
        .select('id, content, source_id, domains')
        .textSearch('content', query)
        .limit(limit)

      // Search entities by name
      const { data: entities } = await (supabase as any).rpc('search_entities', {
        query,
        filter_types: null,
        filter_domains: null,
        filter_profile_id: user.id,
        match_limit: limit,
      })

      return {
        chunks: chunks || [],
        entities: entities || [],
      }
    },
  })
}
