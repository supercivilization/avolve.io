'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSupabase } from 'app/utils/supabase/useSupabase'
import { useUser } from 'app/utils/useUser'
import type {
  KnowledgeEntity,
  EntityType,
  CSuiteDomain,
  CreateEntityRequest,
  EntityWithRelations,
  EntityGraphResponse,
  EntityGraphNode,
  EntityGraphEdge,
  RelationshipType,
} from '../types'

const ENTITIES_QUERY_KEY = 'knowledge-entities'

interface UseEntitiesOptions {
  types?: EntityType[]
  domains?: CSuiteDomain[]
  verified?: boolean
  limit?: number
  offset?: number
}

export function useEntities(options: UseEntitiesOptions = {}) {
  const supabase = useSupabase()
  const { user } = useUser()
  const { types, domains, verified, limit = 50, offset = 0 } = options

  return useQuery({
    queryKey: [ENTITIES_QUERY_KEY, { types, domains, verified, limit, offset, userId: user?.id }],
    queryFn: async () => {
      if (!user?.id) return { entities: [], total: 0 }

      // Note: knowledge_entities table types will be available after migration
      let query = (supabase as any)
        .from('knowledge_entities')
        .select('*', { count: 'exact' })
        .eq('profile_id', user.id)
        .order('name', { ascending: true })
        .range(offset, offset + limit - 1)

      if (types && types.length > 0) {
        query = query.in('entity_type', types)
      }

      if (domains && domains.length > 0) {
        query = query.overlaps('domains', domains)
      }

      if (verified !== undefined) {
        query = query.eq('verified', verified)
      }

      const { data, error, count } = await query

      if (error) throw error

      return { entities: data as KnowledgeEntity[], total: count || 0 }
    },
    enabled: !!user?.id,
  })
}

export function useEntity(entityId: string | null) {
  const supabase = useSupabase()

  return useQuery({
    queryKey: [ENTITIES_QUERY_KEY, entityId],
    queryFn: async (): Promise<EntityWithRelations | null> => {
      if (!entityId) return null

      // Get entity
      const { data: entity, error: entityError } = await (supabase as any)
        .from('knowledge_entities')
        .select('*')
        .eq('id', entityId)
        .single()

      if (entityError) throw entityError

      // Get mention count
      const { count: mentionCount } = await (supabase as any)
        .from('entity_mentions')
        .select('*', { count: 'exact', head: true })
        .eq('entity_id', entityId)

      // Get relationships and related entities
      const { data: relationships } = await (supabase as any)
        .from('entity_relationships')
        .select(`
          *,
          source_entity:knowledge_entities!source_entity_id(*),
          target_entity:knowledge_entities!target_entity_id(*)
        `)
        .or(`source_entity_id.eq.${entityId},target_entity_id.eq.${entityId}`)

      const relatedEntities = (relationships || []).map((rel) => {
        const isSource = rel.source_entity_id === entityId
        return {
          entity: isSource ? rel.target_entity : rel.source_entity,
          relationship: rel.relationship_type as RelationshipType,
          direction: isSource ? 'outgoing' : 'incoming' as 'outgoing' | 'incoming',
        }
      })

      return {
        ...entity,
        mention_count: mentionCount || 0,
        relationship_count: relationships?.length || 0,
        related_entities: relatedEntities,
      }
    },
    enabled: !!entityId,
  })
}

export function useEntityGraph(entityId: string | null, depth: number = 2) {
  const supabase = useSupabase()

  return useQuery({
    queryKey: [ENTITIES_QUERY_KEY, entityId, 'graph', depth],
    queryFn: async (): Promise<EntityGraphResponse | null> => {
      if (!entityId) return null

      // Get the center entity
      const { data: centerEntity, error: centerError } = await (supabase as any)
        .from('knowledge_entities')
        .select('*')
        .eq('id', entityId)
        .single()

      if (centerError) throw centerError

      // Get the graph using the recursive function
      const { data: graphData, error: graphError } = await (supabase as any).rpc('get_entity_graph', {
        entity_uuid: entityId,
        depth,
        limit_per_level: 10,
      })

      if (graphError) throw graphError

      // Transform to nodes and edges
      const nodeMap = new Map<string, EntityGraphNode>()
      const edges: EntityGraphEdge[] = []

      // Add center entity
      nodeMap.set(entityId, {
        id: entityId,
        entity_type: centerEntity.entity_type,
        name: centerEntity.name,
        domains: centerEntity.domains,
      })

      // Process graph results
      for (const row of graphData || []) {
        // Add source node
        if (!nodeMap.has(row.entity_id)) {
          nodeMap.set(row.entity_id, {
            id: row.entity_id,
            entity_type: row.entity_type,
            name: row.entity_name,
            domains: [],
          })
        }

        // Add target node
        if (!nodeMap.has(row.related_entity_id)) {
          nodeMap.set(row.related_entity_id, {
            id: row.related_entity_id,
            entity_type: row.related_entity_type,
            name: row.related_entity_name,
            domains: [],
          })
        }

        // Add edge
        edges.push({
          source_id: row.entity_id,
          target_id: row.related_entity_id,
          relationship_type: row.relationship_type,
          weight: 1,
          is_bidirectional: false,
        })
      }

      return {
        nodes: Array.from(nodeMap.values()),
        edges,
        center_entity: centerEntity,
      }
    },
    enabled: !!entityId,
  })
}

export function useCreateEntity() {
  const supabase = useSupabase()
  const queryClient = useQueryClient()
  const { user } = useUser()

  return useMutation({
    mutationFn: async (request: CreateEntityRequest) => {
      if (!user?.id) throw new Error('User not authenticated')

      const { data, error } = await (supabase as any)
        .from('knowledge_entities')
        .insert({
          profile_id: user.id,
          entity_type: request.entity_type,
          name: request.name,
          description: request.description,
          domains: request.domains,
          aliases: request.aliases || [],
          external_id: request.external_id,
          external_url: request.external_url,
          tags: request.tags || [],
          metadata: request.metadata || {},
          provenance: 'human_authored',
          verified: true, // Human-created entities are pre-verified
          verified_by: user.id,
          verified_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) throw error
      return data as KnowledgeEntity
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ENTITIES_QUERY_KEY] })
    },
  })
}

export function useUpdateEntity() {
  const supabase = useSupabase()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string
      updates: Partial<
        Pick<
          KnowledgeEntity,
          'name' | 'description' | 'domains' | 'aliases' | 'tags' | 'metadata' | 'external_id' | 'external_url'
        >
      >
    }) => {
      const { data, error } = await (supabase as any)
        .from('knowledge_entities')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data as KnowledgeEntity
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [ENTITIES_QUERY_KEY] })
      queryClient.setQueryData([ENTITIES_QUERY_KEY, data.id], data)
    },
  })
}

export function useVerifyEntity() {
  const supabase = useSupabase()
  const queryClient = useQueryClient()
  const { user } = useUser()

  return useMutation({
    mutationFn: async ({ entityId, verified }: { entityId: string; verified: boolean }) => {
      if (!user?.id) throw new Error('User not authenticated')

      const { data, error } = await (supabase as any)
        .from('knowledge_entities')
        .update({
          verified,
          verified_by: verified ? user.id : null,
          verified_at: verified ? new Date().toISOString() : null,
          provenance: verified ? 'human_verified' : 'ai_extracted',
        })
        .eq('id', entityId)
        .select()
        .single()

      if (error) throw error
      return data as KnowledgeEntity
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [ENTITIES_QUERY_KEY] })
      queryClient.setQueryData([ENTITIES_QUERY_KEY, data.id], data)
    },
  })
}

export function useDeleteEntity() {
  const supabase = useSupabase()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (entityId: string) => {
      const { error } = await (supabase as any).from('knowledge_entities').delete().eq('id', entityId)

      if (error) throw error
      return entityId
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ENTITIES_QUERY_KEY] })
    },
  })
}

// Create relationship between entities
export function useCreateRelationship() {
  const supabase = useSupabase()
  const queryClient = useQueryClient()
  const { user } = useUser()

  return useMutation({
    mutationFn: async ({
      sourceEntityId,
      targetEntityId,
      relationshipType,
      description,
      isBidirectional = false,
    }: {
      sourceEntityId: string
      targetEntityId: string
      relationshipType: RelationshipType
      description?: string
      isBidirectional?: boolean
    }) => {
      if (!user?.id) throw new Error('User not authenticated')

      const { data, error } = await (supabase as any)
        .from('entity_relationships')
        .insert({
          profile_id: user.id,
          source_entity_id: sourceEntityId,
          target_entity_id: targetEntityId,
          relationship_type: relationshipType,
          description,
          is_bidirectional: isBidirectional,
          provenance: 'human_authored',
          verified: true,
          verified_by: user.id,
          verified_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ENTITIES_QUERY_KEY] })
    },
  })
}

// Search entities by name
export function useSearchEntities() {
  const supabase = useSupabase()
  const { user } = useUser()

  return useMutation({
    mutationFn: async ({
      query,
      types,
      domains,
      limit = 20,
    }: {
      query: string
      types?: EntityType[]
      domains?: CSuiteDomain[]
      limit?: number
    }) => {
      if (!user?.id) return []

      const { data, error } = await (supabase as any).rpc('search_entities', {
        query,
        filter_types: types?.length ? types : null,
        filter_domains: domains?.length ? domains : null,
        filter_profile_id: user.id,
        match_limit: limit,
      })

      if (error) throw error
      return data as KnowledgeEntity[]
    },
  })
}
