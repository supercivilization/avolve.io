import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useSessionContext } from '../supabase/useSessionContext'
import { useSupabase } from '../supabase/useSupabase'
import type { FeatureKey, SubscriptionContextValue, SubscriptionTier, TierConfig } from './types'
import { TIER_CONFIGS } from './types'

// Feature access matrix by tier
const TIER_HIERARCHY: SubscriptionTier[] = ['individual_vip', 'collective_pro', 'ecosystem_ceo']

const FEATURE_ACCESS: Record<SubscriptionTier, Set<FeatureKey>> = {
  individual_vip: new Set([
    'training_docs',
    'training_tutorials',
    'techniques_playbooks',
    'techniques_sops',
    'technology_templates',
    'technology_components',
    'support_knowledge_base',
    'support_community_forum',
    'ai_chat',
    'projects',
  ]),
  collective_pro: new Set([
    // All individual_vip features
    'training_docs',
    'training_tutorials',
    'techniques_playbooks',
    'techniques_sops',
    'technology_templates',
    'technology_components',
    'support_knowledge_base',
    'support_community_forum',
    'ai_chat',
    'projects',
    // Plus PRO features
    'training_advanced',
    'techniques_workshops',
    'technology_premium',
    'technician_office_hours',
    'technician_group_reviews',
    'support_priority',
    'support_mentors',
    'team_workspace',
  ]),
  ecosystem_ceo: new Set([
    // All features
    'training_docs',
    'training_tutorials',
    'training_advanced',
    'training_custom',
    'training_one_on_one',
    'techniques_playbooks',
    'techniques_sops',
    'techniques_workshops',
    'techniques_custom',
    'techniques_executive',
    'technology_templates',
    'technology_components',
    'technology_premium',
    'technology_custom',
    'technology_enterprise',
    'technician_office_hours',
    'technician_group_reviews',
    'technician_dedicated',
    'technician_slack_access',
    'technician_weekly_calls',
    'technician_partnership',
    'support_knowledge_base',
    'support_community_forum',
    'support_priority',
    'support_mentors',
    'support_white_glove',
    'support_sla',
    'ai_chat',
    'projects',
    'team_workspace',
  ]),
}

interface SubscriptionData {
  tier: SubscriptionTier
  status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'unpaid' | 'incomplete'
  current_period_end: string | null
  cancel_at_period_end: boolean
  trial_end: string | null
}

export function useSubscription(): SubscriptionContextValue {
  const { session } = useSessionContext()
  const supabase = useSupabase()
  const userId = session?.user?.id

  const { data: subscription, isLoading } = useQuery({
    queryKey: ['subscription', userId],
    queryFn: async (): Promise<SubscriptionData | null> => {
      if (!userId) return null

      // First check direct user subscription
      const { data: userSub, error: userError } = await supabase
        .from('subscriptions')
        .select('tier, status, current_period_end, cancel_at_period_end, trial_end')
        .eq('user_id', userId)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (userSub && !userError) {
        return userSub as SubscriptionData
      }

      // Check organization membership
      const { data: orgMember } = await supabase
        .from('organization_members')
        .select('organization_id')
        .eq('user_id', userId)
        .limit(1)
        .single()

      if (orgMember) {
        const { data: orgSub, error: orgError } = await supabase
          .from('subscriptions')
          .select('tier, status, current_period_end, cancel_at_period_end, trial_end')
          .eq('organization_id', orgMember.organization_id)
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (orgSub && !orgError) {
          return orgSub as SubscriptionData
        }
      }

      return null
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const tier = subscription?.tier ?? null
  const status = subscription?.status ?? null
  const tierConfig = tier ? TIER_CONFIGS[tier] : null

  const hasAccess = useMemo(() => {
    return (feature: FeatureKey): boolean => {
      if (!tier) return false
      return FEATURE_ACCESS[tier].has(feature)
    }
  }, [tier])

  const getLimit = useMemo(() => {
    return (feature: FeatureKey): number | 'unlimited' | null => {
      if (!tier || !tierConfig) return null

      switch (feature) {
        case 'ai_chat':
          return tierConfig.limits.aiMessages
        case 'projects':
          return tierConfig.limits.projects
        case 'team_workspace':
          return tierConfig.limits.seats
        default:
          return null
      }
    }
  }, [tier, tierConfig])

  const isSubscribed = status === 'active' || status === 'trialing'
  const isTrial = status === 'trialing'

  const canUpgrade = useMemo(() => {
    if (!tier) return true // Not subscribed, can upgrade to any tier
    const currentIndex = TIER_HIERARCHY.indexOf(tier)
    return currentIndex < TIER_HIERARCHY.length - 1
  }, [tier])

  return {
    tier,
    status,
    isLoading,
    hasAccess,
    getLimit,
    isSubscribed,
    isTrial,
    canUpgrade,
    tierConfig,
  }
}
