// Backend subscription checking utility
// Checks user subscription status for API route enforcement

import type { SupabaseClient } from '@supabase/supabase-js'

export type SubscriptionTier = 'individual_vip' | 'collective_pro' | 'ecosystem_ceo' | null

export interface SubscriptionStatus {
  tier: SubscriptionTier
  isActive: boolean
  organizationId: string | null
}

export interface TierLimits {
  aiChatMessagesPerDay: number
  aiChatMaxTokens: number
  knowledgeSourcesLimit: number
  teamSeats: number
}

// Tier-based limits
export const TIER_LIMITS: Record<SubscriptionTier | 'free', TierLimits> = {
  free: {
    aiChatMessagesPerDay: 5,
    aiChatMaxTokens: 500,
    knowledgeSourcesLimit: 3,
    teamSeats: 0,
  },
  individual_vip: {
    aiChatMessagesPerDay: 50,
    aiChatMaxTokens: 2000,
    knowledgeSourcesLimit: 50,
    teamSeats: 0,
  },
  collective_pro: {
    aiChatMessagesPerDay: 200,
    aiChatMaxTokens: 4000,
    knowledgeSourcesLimit: 500,
    teamSeats: 5,
  },
  ecosystem_ceo: {
    aiChatMessagesPerDay: -1, // Unlimited
    aiChatMaxTokens: 8000,
    knowledgeSourcesLimit: -1, // Unlimited
    teamSeats: -1, // Unlimited
  },
}

/**
 * Valid subscription statuses that grant access
 */
const ACTIVE_STATUSES = ['active', 'trialing'] as const

/**
 * Get subscription status for a user with retry logic
 */
export async function getSubscriptionStatus(
  supabase: SupabaseClient,
  userId: string,
  retries = 2
): Promise<SubscriptionStatus> {
  const defaultResponse: SubscriptionStatus = {
    tier: null,
    isActive: false,
    organizationId: null,
  }

  const attemptFetch = async (): Promise<SubscriptionStatus> => {
    // First check user's personal subscription
    const { data: userSub, error: userSubError } = await supabase
      .from('subscriptions')
      .select('tier, status')
      .eq('profile_id', userId)
      .is('organization_id', null)
      .in('status', ACTIVE_STATUSES)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (userSubError && userSubError.code !== 'PGRST116') {
      // PGRST116 = no rows returned, which is fine
      throw userSubError
    }

    if (userSub) {
      return {
        tier: userSub.tier as SubscriptionTier,
        isActive: true,
        organizationId: null,
      }
    }

    // Check organization subscriptions
    const { data: orgMembership, error: orgError } = await supabase
      .from('organization_members')
      .select('organization_id, organizations(subscriptions(tier, status))')
      .eq('profile_id', userId)
      .limit(1)
      .single()

    if (orgError && orgError.code !== 'PGRST116') {
      throw orgError
    }

    if (orgMembership?.organizations) {
      const orgSubs = (orgMembership.organizations as any).subscriptions
      if (Array.isArray(orgSubs)) {
        const activeSub = orgSubs.find(
          (s: any) => ACTIVE_STATUSES.includes(s.status)
        )
        if (activeSub) {
          return {
            tier: activeSub.tier as SubscriptionTier,
            isActive: true,
            organizationId: orgMembership.organization_id,
          }
        }
      }
    }

    return defaultResponse
  }

  // Retry logic with exponential backoff
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await attemptFetch()
    } catch (error) {
      if (attempt === retries) {
        console.error('Failed to fetch subscription status after retries:', error)
        return defaultResponse // Fail safe to no subscription
      }
      // Exponential backoff: 100ms, 200ms, 400ms
      await new Promise((resolve) => setTimeout(resolve, 100 * Math.pow(2, attempt)))
    }
  }

  return defaultResponse
}

/**
 * Get limits for a subscription tier
 */
export function getTierLimits(tier: SubscriptionTier): TierLimits {
  return TIER_LIMITS[tier ?? 'free']
}

/**
 * Check if user has access to a feature based on tier
 */
export function hasFeatureAccess(tier: SubscriptionTier, feature: string): boolean {
  const vipFeatures = [
    'ai_chat',
    'training_docs',
    'training_tutorials',
    'techniques_playbooks',
    'techniques_sops',
    'technology_templates',
    'technology_components',
    'support_knowledge_base',
    'support_community_forum',
    'projects',
  ]

  const proFeatures = [
    ...vipFeatures,
    'training_advanced',
    'techniques_workshops',
    'technology_premium',
    'technician_office_hours',
    'technician_group_reviews',
    'support_priority',
    'support_mentors',
    'team_workspace',
  ]

  const ceoFeatures = [
    ...proFeatures,
    'training_exclusive',
    'technician_dedicated',
    'technician_strategy',
    'technician_1on1',
    'support_direct_line',
    'support_custom_solutions',
  ]

  if (tier === 'ecosystem_ceo') {
    return ceoFeatures.includes(feature)
  }
  if (tier === 'collective_pro') {
    return proFeatures.includes(feature)
  }
  if (tier === 'individual_vip') {
    return vipFeatures.includes(feature)
  }

  return false
}

/**
 * Track AI chat usage for rate limiting
 */
export async function trackAIChatUsage(
  supabase: SupabaseClient,
  userId: string
): Promise<{ count: number; limitReached: boolean; limit: number }> {
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  // Get today's usage count
  const { count } = await supabase
    .from('brain_messages')
    .select('*', { count: 'exact', head: true })
    .eq('profile_id', userId)
    .eq('role', 'user')
    .gte('created_at', startOfDay.toISOString())

  const usageCount = count ?? 0

  // Get user's tier limits
  const status = await getSubscriptionStatus(supabase, userId)
  const limits = getTierLimits(status.tier)

  return {
    count: usageCount,
    limitReached: limits.aiChatMessagesPerDay !== -1 && usageCount >= limits.aiChatMessagesPerDay,
    limit: limits.aiChatMessagesPerDay,
  }
}
