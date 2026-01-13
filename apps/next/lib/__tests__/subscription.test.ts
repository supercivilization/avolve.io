import { describe, it, expect } from 'vitest'
import { getTierLimits, hasFeatureAccess, TIER_LIMITS } from '../subscription'
import type { SubscriptionTier } from '../subscription'

describe('subscription utilities', () => {
  describe('getTierLimits', () => {
    it('returns free tier limits for null tier', () => {
      const limits = getTierLimits(null)
      expect(limits).toEqual(TIER_LIMITS.free)
      expect(limits.aiChatMessagesPerDay).toBe(5)
      expect(limits.aiChatMaxTokens).toBe(500)
    })

    it('returns VIP tier limits', () => {
      const limits = getTierLimits('individual_vip')
      expect(limits.aiChatMessagesPerDay).toBe(50)
      expect(limits.aiChatMaxTokens).toBe(2000)
      expect(limits.teamSeats).toBe(0)
    })

    it('returns PRO tier limits', () => {
      const limits = getTierLimits('collective_pro')
      expect(limits.aiChatMessagesPerDay).toBe(200)
      expect(limits.aiChatMaxTokens).toBe(4000)
      expect(limits.teamSeats).toBe(5)
    })

    it('returns CEO tier limits with unlimited values', () => {
      const limits = getTierLimits('ecosystem_ceo')
      expect(limits.aiChatMessagesPerDay).toBe(-1) // Unlimited
      expect(limits.aiChatMaxTokens).toBe(8000)
      expect(limits.teamSeats).toBe(-1) // Unlimited
    })
  })

  describe('hasFeatureAccess', () => {
    describe('null tier (free)', () => {
      it('returns false for all features', () => {
        expect(hasFeatureAccess(null, 'ai_chat')).toBe(false)
        expect(hasFeatureAccess(null, 'team_workspace')).toBe(false)
        expect(hasFeatureAccess(null, 'training_docs')).toBe(false)
      })
    })

    describe('individual_vip tier', () => {
      const tier: SubscriptionTier = 'individual_vip'

      it('has access to VIP features', () => {
        expect(hasFeatureAccess(tier, 'ai_chat')).toBe(true)
        expect(hasFeatureAccess(tier, 'training_docs')).toBe(true)
        expect(hasFeatureAccess(tier, 'training_tutorials')).toBe(true)
        expect(hasFeatureAccess(tier, 'projects')).toBe(true)
      })

      it('does NOT have access to PRO features', () => {
        expect(hasFeatureAccess(tier, 'team_workspace')).toBe(false)
        expect(hasFeatureAccess(tier, 'training_advanced')).toBe(false)
        expect(hasFeatureAccess(tier, 'support_priority')).toBe(false)
      })

      it('does NOT have access to CEO features', () => {
        expect(hasFeatureAccess(tier, 'technician_dedicated')).toBe(false)
        expect(hasFeatureAccess(tier, 'support_direct_line')).toBe(false)
      })
    })

    describe('collective_pro tier', () => {
      const tier: SubscriptionTier = 'collective_pro'

      it('has access to VIP features', () => {
        expect(hasFeatureAccess(tier, 'ai_chat')).toBe(true)
        expect(hasFeatureAccess(tier, 'training_docs')).toBe(true)
      })

      it('has access to PRO features', () => {
        expect(hasFeatureAccess(tier, 'team_workspace')).toBe(true)
        expect(hasFeatureAccess(tier, 'training_advanced')).toBe(true)
        expect(hasFeatureAccess(tier, 'support_priority')).toBe(true)
        expect(hasFeatureAccess(tier, 'technician_office_hours')).toBe(true)
      })

      it('does NOT have access to CEO features', () => {
        expect(hasFeatureAccess(tier, 'technician_dedicated')).toBe(false)
        expect(hasFeatureAccess(tier, 'support_direct_line')).toBe(false)
      })
    })

    describe('ecosystem_ceo tier', () => {
      const tier: SubscriptionTier = 'ecosystem_ceo'

      it('has access to all features', () => {
        expect(hasFeatureAccess(tier, 'ai_chat')).toBe(true)
        expect(hasFeatureAccess(tier, 'team_workspace')).toBe(true)
        expect(hasFeatureAccess(tier, 'technician_dedicated')).toBe(true)
        expect(hasFeatureAccess(tier, 'support_direct_line')).toBe(true)
        expect(hasFeatureAccess(tier, 'support_custom_solutions')).toBe(true)
      })
    })

    describe('unknown features', () => {
      it('returns false for unknown features', () => {
        expect(hasFeatureAccess('ecosystem_ceo', 'unknown_feature')).toBe(false)
        expect(hasFeatureAccess('collective_pro', 'nonexistent')).toBe(false)
      })
    })
  })

  describe('TIER_LIMITS', () => {
    it('has correct tier hierarchy (free < VIP < PRO < CEO)', () => {
      const free = TIER_LIMITS.free
      const vip = TIER_LIMITS.individual_vip
      const pro = TIER_LIMITS.collective_pro
      const ceo = TIER_LIMITS.ecosystem_ceo

      // Messages per day increases with tier (or unlimited for CEO)
      expect(free.aiChatMessagesPerDay).toBeLessThan(vip.aiChatMessagesPerDay)
      expect(vip.aiChatMessagesPerDay).toBeLessThan(pro.aiChatMessagesPerDay)

      // Max tokens increases with tier
      expect(free.aiChatMaxTokens).toBeLessThan(vip.aiChatMaxTokens)
      expect(vip.aiChatMaxTokens).toBeLessThan(pro.aiChatMaxTokens)
      expect(pro.aiChatMaxTokens).toBeLessThan(ceo.aiChatMaxTokens)

      // Team seats: 0 for free/VIP, positive for PRO, unlimited for CEO
      expect(free.teamSeats).toBe(0)
      expect(vip.teamSeats).toBe(0)
      expect(pro.teamSeats).toBeGreaterThan(0)
      expect(ceo.teamSeats).toBe(-1) // Unlimited
    })
  })
})
