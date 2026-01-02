'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { createClient } from './supabase/client'
import type {
  SubscriptionTier,
  Subscription,
  Organization,
  FeatureAccess,
  TIER_PRICING,
} from './supabase/database.types'

// ============================================================================
// TYPES
// ============================================================================

export interface SubscriptionState {
  subscription: Subscription | null
  organization: Organization | null
  tier: SubscriptionTier | null
  isLoading: boolean
  error: Error | null
}

export interface FeatureAccessState {
  features: Map<string, FeatureAccess>
  isLoading: boolean
}

// ============================================================================
// useSubscription Hook
// Get current user's subscription status
// ============================================================================

export function useSubscription() {
  const [state, setState] = useState<SubscriptionState>({
    subscription: null,
    organization: null,
    tier: null,
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    const supabase = createClient()

    async function fetchSubscription() {
      try {
        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user) {
          setState(prev => ({ ...prev, isLoading: false }))
          return
        }

        // Get subscription
        const { data: subscription, error: subError } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .single()

        if (subError && subError.code !== 'PGRST116') {
          throw subError
        }

        // Get organization if applicable
        let organization: Organization | null = null
        if (subscription?.organization_id) {
          const { data: org } = await supabase
            .from('organizations')
            .select('*')
            .eq('id', subscription.organization_id)
            .single()
          organization = org
        }

        setState({
          subscription: subscription || null,
          organization,
          tier: subscription?.tier || null,
          isLoading: false,
          error: null,
        })
      } catch (error) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error as Error,
        }))
      }
    }

    fetchSubscription()

    // Subscribe to auth changes
    const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange(() => {
      fetchSubscription()
    })

    return () => {
      authSub.unsubscribe()
    }
  }, [])

  // Check if user has access to a specific feature
  const hasAccess = useCallback((featureKey: string): boolean => {
    if (!state.tier) return false

    // Use tier hierarchy for basic checks
    const tierOrder: SubscriptionTier[] = ['individual_vip', 'collective_pro', 'ecosystem_ceo']
    const userTierIndex = tierOrder.indexOf(state.tier)

    // Higher tiers have access to all lower tier features
    // This is a simplified check - real implementation should query feature_access table
    return userTierIndex >= 0
  }, [state.tier])

  // Check if user can add more team members
  const canAddMember = useCallback(async (): Promise<boolean> => {
    if (!state.organization) return false

    const supabase = createClient()
    const { data: count } = await supabase
      .rpc('get_org_member_count', { p_org_id: state.organization.id })

    if (count === null) return false

    // null seat_limit means unlimited
    if (state.organization.seat_limit === null) return true

    return count < state.organization.seat_limit
  }, [state.organization])

  return {
    ...state,
    hasAccess,
    canAddMember,
  }
}

// ============================================================================
// useFeatureAccess Hook
// Get all features for a specific tier
// ============================================================================

export function useFeatureAccess(tier: SubscriptionTier | null) {
  const [state, setState] = useState<FeatureAccessState>({
    features: new Map(),
    isLoading: true,
  })

  useEffect(() => {
    if (!tier) {
      setState({ features: new Map(), isLoading: false })
      return
    }

    const supabase = createClient()

    async function fetchFeatures() {
      const { data, error } = await supabase
        .from('feature_access')
        .select('*')
        .eq('tier', tier)

      if (error) {
        console.error('Error fetching features:', error)
        setState(prev => ({ ...prev, isLoading: false }))
        return
      }

      const featuresMap = new Map<string, FeatureAccess>()
      data?.forEach(feature => {
        featuresMap.set(feature.feature_key, feature)
      })

      setState({
        features: featuresMap,
        isLoading: false,
      })
    }

    fetchFeatures()
  }, [tier])

  // Check if a specific feature is enabled
  const isEnabled = useCallback((featureKey: string): boolean => {
    const feature = state.features.get(featureKey)
    return feature?.enabled ?? false
  }, [state.features])

  // Get feature limits
  const getLimits = useCallback((featureKey: string) => {
    const feature = state.features.get(featureKey)
    return feature?.limits ?? {}
  }, [state.features])

  return {
    ...state,
    isEnabled,
    getLimits,
  }
}

// ============================================================================
// useOrganization Hook
// Manage organization and team members
// ============================================================================

export function useOrganization() {
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [members, setMembers] = useState<Array<{
    id: string
    user_id: string
    role: string
    joined_at: string
  }>>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    async function fetchOrganization() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setIsLoading(false)
        return
      }

      // Get user's organization membership
      const { data: membership } = await supabase
        .from('organization_members')
        .select('organization_id')
        .eq('user_id', user.id)
        .single()

      if (!membership) {
        setIsLoading(false)
        return
      }

      // Get organization details
      const { data: org } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', membership.organization_id)
        .single()

      // Get all members
      const { data: orgMembers } = await supabase
        .from('organization_members')
        .select('*')
        .eq('organization_id', membership.organization_id)

      setOrganization(org)
      setMembers(orgMembers || [])
      setIsLoading(false)
    }

    fetchOrganization()
  }, [])

  return {
    organization,
    members,
    isLoading,
  }
}

// ============================================================================
// Tier Comparison Utilities
// ============================================================================

export function getTierLevel(tier: SubscriptionTier | null): number {
  if (!tier) return -1
  const levels: Record<SubscriptionTier, number> = {
    individual_vip: 0,
    collective_pro: 1,
    ecosystem_ceo: 2,
  }
  return levels[tier]
}

export function isHigherTier(
  currentTier: SubscriptionTier | null,
  compareTier: SubscriptionTier
): boolean {
  return getTierLevel(currentTier) >= getTierLevel(compareTier)
}

export function getUpgradePath(currentTier: SubscriptionTier | null): SubscriptionTier | null {
  if (!currentTier) return 'individual_vip'
  if (currentTier === 'individual_vip') return 'collective_pro'
  if (currentTier === 'collective_pro') return 'ecosystem_ceo'
  return null // Already at highest tier
}

// ============================================================================
// Server-side helpers (for API routes)
// ============================================================================

export async function getUserTierServer(userId: string): Promise<SubscriptionTier | null> {
  // Import server client dynamically to avoid client-side import
  const { createClient } = await import('./supabase/server')
  const supabase = await createClient()

  const { data } = await supabase
    .rpc('get_user_tier', { p_user_id: userId })

  return data as SubscriptionTier | null
}

export async function checkFeatureAccessServer(
  userId: string,
  featureKey: string
): Promise<boolean> {
  const { createClient } = await import('./supabase/server')
  const supabase = await createClient()

  const { data } = await supabase
    .rpc('has_feature_access', { p_user_id: userId, p_feature_key: featureKey })

  return data ?? false
}
