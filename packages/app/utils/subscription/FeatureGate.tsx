'use client'

import type { ReactNode } from 'react'

import { useSubscription } from './useSubscription'
import type { FeatureKey, SubscriptionTier } from './types'
import { TIER_CONFIGS } from './types'

export interface FeatureGateProps {
  /** The feature to check access for */
  feature: FeatureKey
  /** Minimum tier required (optional, will use feature access matrix if not provided) */
  requiredTier?: SubscriptionTier
  /** Content to show when user has access */
  children: ReactNode
  /** Content to show when user doesn't have access (default: UpgradePrompt) */
  fallback?: ReactNode
  /** If true, shows nothing when user doesn't have access */
  hideWhenNoAccess?: boolean
}

/**
 * Gate content behind subscription tier access.
 *
 * @example
 * ```tsx
 * <FeatureGate feature="technician_dedicated">
 *   <DedicatedTechnicianChat />
 * </FeatureGate>
 * ```
 */
export function FeatureGate({
  feature,
  requiredTier,
  children,
  fallback,
  hideWhenNoAccess = false,
}: FeatureGateProps) {
  const { hasAccess, tier, isLoading } = useSubscription()

  // While loading, show nothing to prevent flash
  if (isLoading) {
    return null
  }

  // Check access either by feature or required tier
  const hasFeatureAccess = requiredTier
    ? tier === requiredTier ||
      (tier === 'ecosystem_ceo') ||
      (tier === 'collective_pro' && requiredTier === 'individual_vip')
    : hasAccess(feature)

  if (hasFeatureAccess) {
    return <>{children}</>
  }

  if (hideWhenNoAccess) {
    return null
  }

  if (fallback) {
    return <>{fallback}</>
  }

  // Default fallback - determine minimum required tier for the feature
  const minTier = requiredTier ?? getMinimumTierForFeature(feature)

  return <UpgradePrompt feature={feature} requiredTier={minTier} currentTier={tier} />
}

function getMinimumTierForFeature(feature: FeatureKey): SubscriptionTier {
  // Individual VIP features
  const vipFeatures: FeatureKey[] = [
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
  ]

  // Collective PRO features (beyond VIP)
  const proFeatures: FeatureKey[] = [
    'training_advanced',
    'techniques_workshops',
    'technology_premium',
    'technician_office_hours',
    'technician_group_reviews',
    'support_priority',
    'support_mentors',
    'team_workspace',
  ]

  if (vipFeatures.includes(feature)) {
    return 'individual_vip'
  }

  if (proFeatures.includes(feature)) {
    return 'collective_pro'
  }

  // Everything else requires CEO tier
  return 'ecosystem_ceo'
}

interface UpgradePromptProps {
  feature: FeatureKey
  requiredTier: SubscriptionTier
  currentTier: SubscriptionTier | null
}

function UpgradePrompt({ feature, requiredTier, currentTier }: UpgradePromptProps) {
  const tierConfig = TIER_CONFIGS[requiredTier]

  // This is a minimal prompt - you can make this more sophisticated
  // by importing Tamagui components and making it visually appealing
  return (
    <div
      style={{
        padding: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0.05)',
        textAlign: 'center',
      }}
    >
      <h3 style={{ margin: 0, marginBottom: 8 }}>
        Upgrade to {tierConfig.name}
      </h3>
      <p style={{ margin: 0, marginBottom: 16, opacity: 0.7 }}>
        This feature requires {tierConfig.name} or higher.
      </p>
      <a
        href={`/checkout/${requiredTier}`}
        style={{
          display: 'inline-block',
          padding: '12px 24px',
          borderRadius: 8,
          backgroundColor: '#000',
          color: '#fff',
          textDecoration: 'none',
          fontWeight: 600,
        }}
      >
        Upgrade Now - ${tierConfig.monthlyPrice}/mo
      </a>
    </div>
  )
}

/**
 * Hook to check if user can access a feature.
 * Useful when you need to conditionally render based on access
 * but don't want to use the FeatureGate component.
 */
export function useFeatureAccess(feature: FeatureKey): boolean {
  const { hasAccess } = useSubscription()
  return hasAccess(feature)
}

/**
 * Higher-order component to gate a component behind a feature.
 *
 * @example
 * ```tsx
 * const ProtectedComponent = withFeatureGate(
 *   MyComponent,
 *   'technician_dedicated'
 * )
 * ```
 */
export function withFeatureGate<P extends object>(
  Component: React.ComponentType<P>,
  feature: FeatureKey,
  fallback?: ReactNode
) {
  return function FeatureGatedComponent(props: P) {
    return (
      <FeatureGate feature={feature} fallback={fallback}>
        <Component {...props} />
      </FeatureGate>
    )
  }
}
