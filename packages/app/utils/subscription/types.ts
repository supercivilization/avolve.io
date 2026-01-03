import type { SubscriptionTier, SubscriptionStatus, BillingInterval } from '@my/supabase/types'

export type { SubscriptionTier, SubscriptionStatus, BillingInterval }

// Tier configuration with pricing and features
export interface TierConfig {
  id: SubscriptionTier
  name: string
  tagline: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  yearlyMonthlyEquivalent: number
  yearlySavings: number
  features: string[]
  limits: {
    seats: number | 'unlimited'
    projects: number | 'unlimited'
    aiMessages: number | 'unlimited'
  }
  humanInvolvement: 'ai_only' | 'ai_community_group' | 'ai_community_dedicated'
  scope: 'individual' | 'team' | 'organization'
  highlighted?: boolean
}

export const TIER_CONFIGS: Record<SubscriptionTier, TierConfig> = {
  individual_vip: {
    id: 'individual_vip',
    name: 'Individual VIP',
    tagline: 'Vivify Further via Superhuman Enhancements',
    description: 'For solopreneurs ready to accelerate their growth with AI-powered tools and training.',
    monthlyPrice: 28,
    yearlyPrice: 288,
    yearlyMonthlyEquivalent: 24,
    yearlySavings: 48,
    features: [
      'Full documentation & tutorials',
      'Playbooks & SOPs',
      'Templates & components',
      'AI chat assistant (100/day)',
      'Community forum access',
      'Knowledge base access',
    ],
    limits: {
      seats: 1,
      projects: 3,
      aiMessages: 100,
    },
    humanInvolvement: 'ai_only',
    scope: 'individual',
  },
  collective_pro: {
    id: 'collective_pro',
    name: 'Collective PRO',
    tagline: 'Unify Faster via Supersociety Advancements',
    description: 'For teams building together with advanced features, workshops, and group sessions.',
    monthlyPrice: 288,
    yearlyPrice: 2888,
    yearlyMonthlyEquivalent: 240.67,
    yearlySavings: 568,
    features: [
      'Everything in Individual VIP',
      'Team workspace (up to 10 seats)',
      'Advanced training & deep dives',
      'Team workshops',
      'Premium templates & tools',
      'Monthly office hours (2 hrs)',
      'Quarterly group reviews',
      'Priority support',
      'AI chat (500/day)',
    ],
    limits: {
      seats: 10,
      projects: 10,
      aiMessages: 500,
    },
    humanInvolvement: 'ai_community_group',
    scope: 'team',
    highlighted: true,
  },
  ecosystem_ceo: {
    id: 'ecosystem_ceo',
    name: 'Ecosystem CEO',
    tagline: 'Thrive Forever via Supergenius Breakthroughs',
    description: 'For organizations requiring dedicated support, custom solutions, and strategic partnership.',
    monthlyPrice: 2888,
    yearlyPrice: 22888,
    yearlyMonthlyEquivalent: 1907.33,
    yearlySavings: 11768,
    features: [
      'Everything in Collective PRO',
      'Unlimited team seats',
      'Custom training & 1:1 sessions',
      'Executive workshops',
      'Custom templates & enterprise tools',
      'Dedicated technician',
      'Private Slack channel',
      'Weekly strategy calls',
      'White-glove support',
      'SLA guarantees (4hr response)',
      'Unlimited AI chat',
    ],
    limits: {
      seats: 'unlimited',
      projects: 'unlimited',
      aiMessages: 'unlimited',
    },
    humanInvolvement: 'ai_community_dedicated',
    scope: 'organization',
  },
}

// Feature keys for access control
export type FeatureKey =
  // Training (The Map)
  | 'training_docs'
  | 'training_tutorials'
  | 'training_advanced'
  | 'training_custom'
  | 'training_one_on_one'
  // Techniques (The Method)
  | 'techniques_playbooks'
  | 'techniques_sops'
  | 'techniques_workshops'
  | 'techniques_custom'
  | 'techniques_executive'
  // Technology (The Lever)
  | 'technology_templates'
  | 'technology_components'
  | 'technology_premium'
  | 'technology_custom'
  | 'technology_enterprise'
  // Technician (The Artist)
  | 'technician_office_hours'
  | 'technician_group_reviews'
  | 'technician_dedicated'
  | 'technician_slack_access'
  | 'technician_weekly_calls'
  | 'technician_partnership'
  // Support
  | 'support_knowledge_base'
  | 'support_community_forum'
  | 'support_priority'
  | 'support_mentors'
  | 'support_white_glove'
  | 'support_sla'
  // Platform features
  | 'ai_chat'
  | 'projects'
  | 'team_workspace'

// Subscription context shape
export interface SubscriptionContextValue {
  tier: SubscriptionTier | null
  status: SubscriptionStatus | null
  isLoading: boolean
  hasAccess: (feature: FeatureKey) => boolean
  getLimit: (feature: FeatureKey) => number | 'unlimited' | null
  isSubscribed: boolean
  isTrial: boolean
  canUpgrade: boolean
  tierConfig: TierConfig | null
}
