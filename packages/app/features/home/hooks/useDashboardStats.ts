'use client'

import { useQuery } from '@tanstack/react-query'
import { useSupabase } from 'app/utils/supabase/useSupabase'
import { useUser } from 'app/utils/useUser'

interface ProfileCompletion {
  hasName: boolean
  hasAbout: boolean
  hasAvatar: boolean
  completedFields: number
  totalFields: number
  percentage: number
}

interface BrainStats {
  documentCount: number
  entityCount: number
  conversationCount: number
}

interface RoleStats {
  ceoVisited: boolean
  cmoVisited: boolean
  cvoVisited: boolean
  cooVisited: boolean
  cfoVisited: boolean
  rolesVisited: number
  totalRoles: number
}

interface DashboardStats {
  profileCompletion: ProfileCompletion
  brainStats: BrainStats
  roleStats: RoleStats
  isLoading: boolean
  error: Error | null
}

interface DashboardStatsRaw {
  profile: { name: string | null; about: string | null; avatar_url: string | null } | null
  brainCounts: { documents: number; entities: number; conversations: number }
  roleVisits: Record<string, boolean>
}

/**
 * Fetches all dashboard stats in parallel to avoid N+1 queries
 */
async function fetchAllDashboardStats(
  supabase: ReturnType<typeof useSupabase>,
  userId: string
): Promise<DashboardStatsRaw> {
  // Run all queries in parallel using Promise.all
  const [profileResult, brainCountsResult, roleVisitsResult] = await Promise.all([
    // 1. Profile data
    supabase
      .from('profiles')
      .select('name, about, avatar_url')
      .eq('id', userId)
      .single(),

    // 2. Brain counts - parallel sub-queries
    Promise.all([
      supabase
        .from('knowledge_sources')
        .select('*', { count: 'exact', head: true })
        .eq('profile_id', userId),
      supabase
        .from('knowledge_entities')
        .select('*', { count: 'exact', head: true })
        .eq('profile_id', userId),
      supabase
        .from('brain_conversations')
        .select('*', { count: 'exact', head: true })
        .eq('profile_id', userId),
    ]),

    // 3. Role visits - single query with IN clause
    supabase
      .from('page_views')
      .select('page_path')
      .eq('profile_id', userId)
      .in('page_path', ['/ceo', '/cmo', '/cvo', '/coo', '/cfo']),
  ])

  // Parse results
  const profile = profileResult.data
  const [docResult, entityResult, convResult] = brainCountsResult
  const visitedPaths = new Set(roleVisitsResult.data?.map((r) => r.page_path) ?? [])

  return {
    profile,
    brainCounts: {
      documents: docResult.count ?? 0,
      entities: entityResult.count ?? 0,
      conversations: convResult.count ?? 0,
    },
    roleVisits: {
      ceo: visitedPaths.has('/ceo'),
      cmo: visitedPaths.has('/cmo'),
      cvo: visitedPaths.has('/cvo'),
      coo: visitedPaths.has('/coo'),
      cfo: visitedPaths.has('/cfo'),
    },
  }
}

export function useDashboardStats(): DashboardStats {
  const supabase = useSupabase()
  const { user } = useUser()

  // Single query that fetches all data in parallel
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard-stats', user?.id],
    queryFn: () => fetchAllDashboardStats(supabase, user!.id),
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  })

  // Calculate profile completion from fetched data
  const profile = data?.profile
  const profileCompletion: ProfileCompletion = {
    hasName: !!profile?.name,
    hasAbout: !!profile?.about,
    hasAvatar: !!profile?.avatar_url,
    completedFields: [profile?.name, profile?.about, profile?.avatar_url].filter(Boolean).length,
    totalFields: 3,
    percentage: Math.round(
      ([profile?.name, profile?.about, profile?.avatar_url].filter(Boolean).length / 3) * 100
    ),
  }

  // Brain stats from fetched data
  const brainStats: BrainStats = {
    documentCount: data?.brainCounts.documents ?? 0,
    entityCount: data?.brainCounts.entities ?? 0,
    conversationCount: data?.brainCounts.conversations ?? 0,
  }

  // Role stats from fetched data
  const roleVisits = data?.roleVisits ?? {}
  const rolesVisitedCount = Object.values(roleVisits).filter(Boolean).length
  const roleStats: RoleStats = {
    ceoVisited: roleVisits.ceo ?? false,
    cmoVisited: roleVisits.cmo ?? false,
    cvoVisited: roleVisits.cvo ?? false,
    cooVisited: roleVisits.coo ?? false,
    cfoVisited: roleVisits.cfo ?? false,
    rolesVisited: rolesVisitedCount,
    totalRoles: 5,
  }

  return {
    profileCompletion,
    brainStats,
    roleStats,
    isLoading,
    error: error as Error | null,
  }
}
