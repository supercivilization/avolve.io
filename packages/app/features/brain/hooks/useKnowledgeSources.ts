'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSupabase } from 'app/utils/supabase/useSupabase'
import { useUser } from 'app/utils/useUser'
import type {
  KnowledgeSource,
  CreateSourceRequest,
  CSuiteDomain,
  KnowledgeSourceType,
  SourceWithStats,
} from '../types'

const SOURCES_QUERY_KEY = 'knowledge-sources'

interface UseKnowledgeSourcesOptions {
  domains?: CSuiteDomain[]
  types?: KnowledgeSourceType[]
  status?: 'pending' | 'processing' | 'completed' | 'failed'
  limit?: number
  offset?: number
}

export function useKnowledgeSources(options: UseKnowledgeSourcesOptions = {}) {
  const supabase = useSupabase()
  const { user } = useUser()
  const { domains, types, status, limit = 50, offset = 0 } = options

  return useQuery({
    queryKey: [SOURCES_QUERY_KEY, { domains, types, status, limit, offset, userId: user?.id }],
    queryFn: async () => {
      if (!user?.id) return { sources: [], total: 0 }

      // Note: knowledge_sources table types will be available after migration
      let query = (supabase as any)
        .from('knowledge_sources')
        .select('*, chunks:knowledge_chunks(count), entities:entity_mentions(count)', { count: 'exact' })
        .eq('profile_id', user.id)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (domains && domains.length > 0) {
        query = query.overlaps('domains', domains)
      }

      if (types && types.length > 0) {
        query = query.in('source_type', types)
      }

      if (status) {
        query = query.eq('status', status)
      }

      const { data, error, count } = await query

      if (error) throw error

      // Transform to include stats
      const sources: SourceWithStats[] = (data || []).map((source) => ({
        ...source,
        chunk_count: source.chunks?.[0]?.count || 0,
        entity_count: source.entities?.[0]?.count || 0,
      }))

      return { sources, total: count || 0 }
    },
    enabled: !!user?.id,
  })
}

export function useKnowledgeSource(sourceId: string | null) {
  const supabase = useSupabase()

  return useQuery({
    queryKey: [SOURCES_QUERY_KEY, sourceId],
    queryFn: async () => {
      if (!sourceId) return null

      const { data, error } = await (supabase as any)
        .from('knowledge_sources')
        .select('*')
        .eq('id', sourceId)
        .single()

      if (error) throw error
      return data as KnowledgeSource
    },
    enabled: !!sourceId,
  })
}

export function useCreateSource() {
  const supabase = useSupabase()
  const queryClient = useQueryClient()
  const { user } = useUser()

  return useMutation({
    mutationFn: async (request: CreateSourceRequest) => {
      if (!user?.id) throw new Error('User not authenticated')

      // For notes, we store content directly
      // For files/URLs, we create the source and get an upload URL

      const { data, error } = await (supabase as any)
        .from('knowledge_sources')
        .insert({
          profile_id: user.id,
          source_type: request.source_type,
          title: request.title,
          description: request.description,
          url: request.url,
          domains: request.domains,
          tags: request.tags || [],
          metadata: request.metadata || {},
          provenance: request.source_type === 'note' ? 'human_authored' : 'human_uploaded',
          status: 'pending',
        })
        .select()
        .single()

      if (error) throw error

      // For notes, create a chunk directly
      if (request.source_type === 'note' && request.content) {
        const { error: chunkError } = await (supabase as any).from('knowledge_chunks').insert({
          source_id: data.id,
          content: request.content,
          chunk_index: 0,
          depth: 0,
          domains: request.domains,
        })

        if (chunkError) throw chunkError

        // Mark as completed for notes
        await (supabase as any)
          .from('knowledge_sources')
          .update({ status: 'completed', processed_at: new Date().toISOString() })
          .eq('id', data.id)
      }

      // For files, get a presigned upload URL
      let uploadUrl: string | undefined
      if (request.source_type === 'file') {
        const fileName = `${user.id}/${data.id}/${request.title}`
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('knowledge-sources')
          .createSignedUploadUrl(fileName)

        if (uploadError) throw uploadError
        uploadUrl = uploadData.signedUrl

        // Update source with storage path
        await (supabase as any)
          .from('knowledge_sources')
          .update({ storage_path: fileName })
          .eq('id', data.id)
      }

      return { source: data as KnowledgeSource, upload_url: uploadUrl }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SOURCES_QUERY_KEY] })
    },
  })
}

export function useUpdateSource() {
  const supabase = useSupabase()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string
      updates: Partial<Pick<KnowledgeSource, 'title' | 'description' | 'domains' | 'tags' | 'metadata'>>
    }) => {
      const { data, error } = await (supabase as any)
        .from('knowledge_sources')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data as KnowledgeSource
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [SOURCES_QUERY_KEY] })
      queryClient.setQueryData([SOURCES_QUERY_KEY, data.id], data)
    },
  })
}

export function useDeleteSource() {
  const supabase = useSupabase()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (sourceId: string) => {
      // First get the source to check for storage path
      const { data: source } = await (supabase as any)
        .from('knowledge_sources')
        .select('storage_path')
        .eq('id', sourceId)
        .single()

      // Delete from storage if there's a file
      if (source?.storage_path) {
        await supabase.storage.from('knowledge-sources').remove([source.storage_path])
      }

      // Delete the source (cascades to chunks, mentions, etc.)
      const { error } = await (supabase as any).from('knowledge_sources').delete().eq('id', sourceId)

      if (error) throw error
      return sourceId
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SOURCES_QUERY_KEY] })
    },
  })
}

export function useSourceChunks(sourceId: string | null) {
  const supabase = useSupabase()

  return useQuery({
    queryKey: [SOURCES_QUERY_KEY, sourceId, 'chunks'],
    queryFn: async () => {
      if (!sourceId) return []

      const { data, error } = await (supabase as any)
        .from('knowledge_chunks')
        .select('*')
        .eq('source_id', sourceId)
        .order('chunk_index', { ascending: true })

      if (error) throw error
      return data
    },
    enabled: !!sourceId,
  })
}

// Trigger processing for a source (calls Edge Function)
export function useProcessSource() {
  const supabase = useSupabase()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (sourceId: string) => {
      // Update status to processing
      await (supabase as any)
        .from('knowledge_sources')
        .update({ status: 'processing' })
        .eq('id', sourceId)

      // Invoke the Edge Function
      const { data, error } = await supabase.functions.invoke('process-source', {
        body: { source_id: sourceId },
      })

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SOURCES_QUERY_KEY] })
    },
  })
}
