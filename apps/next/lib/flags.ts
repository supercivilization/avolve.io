// Feature Flags for Avolve
// Tier-based feature gating using Vercel Flags SDK

import { flag, dedupe } from 'flags/next'

// Types for subscription tiers
type SubscriptionTier = 'free' | 'starter' | 'pro' | 'enterprise'

interface FlagContext {
  user?: {
    id: string
    tier: SubscriptionTier
  }
}

// Dedupe function to get user context once per request
const getUser = dedupe(async (): Promise<FlagContext['user'] | undefined> => {
  // In real implementation, this would get the user from session/auth
  // For now, we return undefined (will use defaults)
  return undefined
})

// =============================================================================
// BRAIN AI FLAGS
// =============================================================================

/**
 * Brain chat message limit per day
 * Free: 10, Starter: 50, Pro: 200, Enterprise: unlimited
 */
export const brainChatDailyLimit = flag<number>({
  key: 'brain-chat-daily-limit',
  defaultValue: 10,
  async decide() {
    const user = await getUser()
    if (!user) return 10

    switch (user.tier) {
      case 'enterprise':
        return Infinity
      case 'pro':
        return 200
      case 'starter':
        return 50
      default:
        return 10
    }
  },
  description: 'Daily limit for Brain AI chat messages',
})

/**
 * Brain knowledge sources limit
 * Free: 5, Starter: 25, Pro: 100, Enterprise: unlimited
 */
export const brainSourcesLimit = flag<number>({
  key: 'brain-sources-limit',
  defaultValue: 5,
  async decide() {
    const user = await getUser()
    if (!user) return 5

    switch (user.tier) {
      case 'enterprise':
        return Infinity
      case 'pro':
        return 100
      case 'starter':
        return 25
      default:
        return 5
    }
  },
  description: 'Maximum knowledge sources per user',
})

/**
 * Enable advanced RAG features (entity extraction, knowledge graph)
 * Free: false, Starter: false, Pro: true, Enterprise: true
 */
export const advancedRagEnabled = flag<boolean>({
  key: 'advanced-rag-enabled',
  defaultValue: false,
  async decide() {
    const user = await getUser()
    if (!user) return false

    return user.tier === 'pro' || user.tier === 'enterprise'
  },
  description: 'Enable advanced RAG features like entity extraction',
})

// =============================================================================
// DASHBOARD FLAGS
// =============================================================================

/**
 * Enable real-time collaboration features
 * Free: false, Starter: true, Pro: true, Enterprise: true
 */
export const realtimeEnabled = flag<boolean>({
  key: 'realtime-enabled',
  defaultValue: false,
  async decide() {
    const user = await getUser()
    if (!user) return false

    return user.tier !== 'free'
  },
  description: 'Enable real-time typing indicators and presence',
})

/**
 * Enable team features
 * Free: false, Starter: false, Pro: true (5 members), Enterprise: true (unlimited)
 */
export const teamMembersLimit = flag<number>({
  key: 'team-members-limit',
  defaultValue: 0,
  async decide() {
    const user = await getUser()
    if (!user) return 0

    switch (user.tier) {
      case 'enterprise':
        return Infinity
      case 'pro':
        return 5
      default:
        return 0
    }
  },
  description: 'Maximum team members allowed',
})

/**
 * Enable advanced analytics
 * Free: false, Starter: false, Pro: true, Enterprise: true
 */
export const advancedAnalyticsEnabled = flag<boolean>({
  key: 'advanced-analytics-enabled',
  defaultValue: false,
  async decide() {
    const user = await getUser()
    if (!user) return false

    return user.tier === 'pro' || user.tier === 'enterprise'
  },
  description: 'Enable advanced business analytics',
})

// =============================================================================
// EXPORT FLAGS
// =============================================================================

/**
 * Enable export to PDF
 * Free: false, Starter: true, Pro: true, Enterprise: true
 */
export const exportPdfEnabled = flag<boolean>({
  key: 'export-pdf-enabled',
  defaultValue: false,
  async decide() {
    const user = await getUser()
    if (!user) return false

    return user.tier !== 'free'
  },
  description: 'Enable export to PDF',
})

/**
 * Enable API access
 * Free: false, Starter: false, Pro: false, Enterprise: true
 */
export const apiAccessEnabled = flag<boolean>({
  key: 'api-access-enabled',
  defaultValue: false,
  async decide() {
    const user = await getUser()
    if (!user) return false

    return user.tier === 'enterprise'
  },
  description: 'Enable API access for integrations',
})

// =============================================================================
// EXPERIMENTAL FLAGS
// =============================================================================

/**
 * Enable experimental AI models (GPT-5, Claude 4, etc.)
 */
export const experimentalModelsEnabled = flag<boolean>({
  key: 'experimental-models-enabled',
  defaultValue: false,
  description: 'Enable experimental AI models',
  async decide() {
    // Controlled rollout - disabled by default
    return false
  },
})

/**
 * Enable workflow automation
 */
export const workflowAutomationEnabled = flag<boolean>({
  key: 'workflow-automation-enabled',
  defaultValue: false,
  description: 'Enable workflow automation features',
  async decide() {
    // Controlled rollout - disabled by default
    return false
  },
})

// =============================================================================
// PRECOMPUTED FLAGS (for server components)
// =============================================================================

export async function getFeatureFlags(userTier?: SubscriptionTier) {
  // Mock user for flag evaluation
  const mockUser = userTier ? { id: 'temp', tier: userTier } : undefined

  return {
    brain: {
      dailyLimit: mockUser ? await brainChatDailyLimit() : 10,
      sourcesLimit: mockUser ? await brainSourcesLimit() : 5,
      advancedRag: mockUser ? await advancedRagEnabled() : false,
    },
    dashboard: {
      realtime: mockUser ? await realtimeEnabled() : false,
      teamMembersLimit: mockUser ? await teamMembersLimit() : 0,
      advancedAnalytics: mockUser ? await advancedAnalyticsEnabled() : false,
    },
    export: {
      pdf: mockUser ? await exportPdfEnabled() : false,
      api: mockUser ? await apiAccessEnabled() : false,
    },
    experimental: {
      models: await experimentalModelsEnabled(),
      workflows: await workflowAutomationEnabled(),
    },
  }
}
