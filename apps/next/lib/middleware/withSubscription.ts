/**
 * Server-side subscription enforcement middleware
 *
 * Wraps API handlers to enforce subscription requirements.
 * This is the AUTHORITATIVE check - client-side gating is only for UX.
 */

import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { createClient } from '@supabase/supabase-js'
import type { SubscriptionTier } from '../subscription'
import { getSubscriptionStatus, hasFeatureAccess, getTierLimits } from '../subscription'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export interface SubscriptionContext {
  userId: string
  tier: SubscriptionTier
  organizationId: string | null
  limits: ReturnType<typeof getTierLimits>
}

export interface AuthenticatedRequest extends NextApiRequest {
  subscription: SubscriptionContext
}

type AuthenticatedHandler = (
  req: AuthenticatedRequest,
  res: NextApiResponse
) => Promise<void> | void

interface SubscriptionOptions {
  /** Feature key required (e.g., 'ai_chat', 'team_workspace') */
  feature?: string
  /** Minimum tier required (alternative to feature) */
  minTier?: SubscriptionTier
  /** Allow free tier with limits (for freemium features) */
  allowFreeTier?: boolean
}

/**
 * Middleware to enforce subscription requirements on API routes.
 *
 * @example
 * ```typescript
 * // Require ai_chat feature
 * export default withSubscription(handler, { feature: 'ai_chat' })
 *
 * // Require minimum Pro tier
 * export default withSubscription(handler, { minTier: 'collective_pro' })
 *
 * // Allow free tier with limits
 * export default withSubscription(handler, { feature: 'ai_chat', allowFreeTier: true })
 * ```
 */
export function withSubscription(
  handler: AuthenticatedHandler,
  options: SubscriptionOptions = {}
): NextApiHandler {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Get auth token
      const authHeader = req.headers.authorization
      if (!authHeader) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'Authentication required',
        })
      }

      const token = authHeader.replace('Bearer ', '')

      // Verify user
      const supabase = createClient(supabaseUrl, supabaseServiceKey)
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser(token)

      if (authError || !user) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'Invalid or expired token',
        })
      }

      // Get subscription status
      const subscriptionStatus = await getSubscriptionStatus(supabase, user.id)
      const limits = getTierLimits(subscriptionStatus.tier)

      // Check subscription requirements
      if (options.feature) {
        const hasAccess = subscriptionStatus.tier
          ? hasFeatureAccess(subscriptionStatus.tier, options.feature)
          : false

        if (!hasAccess && !options.allowFreeTier) {
          return res.status(403).json({
            error: 'Subscription required',
            message: `This feature requires an active subscription with ${options.feature} access`,
            upgrade_url: '/pricing',
            required_feature: options.feature,
          })
        }
      }

      if (options.minTier) {
        const tierHierarchy: SubscriptionTier[] = [
          'individual_vip',
          'collective_pro',
          'ecosystem_ceo',
        ]
        const currentIndex = subscriptionStatus.tier
          ? tierHierarchy.indexOf(subscriptionStatus.tier)
          : -1
        const requiredIndex = tierHierarchy.indexOf(options.minTier)

        if (currentIndex < requiredIndex) {
          return res.status(403).json({
            error: 'Insufficient subscription tier',
            message: `This feature requires ${options.minTier} or higher`,
            upgrade_url: '/pricing',
            current_tier: subscriptionStatus.tier,
            required_tier: options.minTier,
          })
        }
      }

      // Attach subscription context to request
      const authenticatedReq = req as AuthenticatedRequest
      authenticatedReq.subscription = {
        userId: user.id,
        tier: subscriptionStatus.tier,
        organizationId: subscriptionStatus.organizationId,
        limits,
      }

      // Call handler
      return handler(authenticatedReq, res)
    } catch (error) {
      console.error('Subscription middleware error:', error)
      return res.status(500).json({
        error: 'Internal server error',
        message: 'Failed to verify subscription',
      })
    }
  }
}

/**
 * Lightweight auth-only middleware (no subscription check)
 */
export function withAuth(handler: AuthenticatedHandler): NextApiHandler {
  return withSubscription(handler, { allowFreeTier: true })
}
