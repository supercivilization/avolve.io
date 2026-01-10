import type { SubscriptionTier, BillingInterval } from 'app/utils/subscription/types'

/**
 * Stripe Price IDs Configuration
 *
 * These should be set via environment variables.
 * Run `npx tsx scripts/setup-stripe-products.ts` to create products in Stripe.
 */
export const STRIPE_PRICE_IDS: Record<SubscriptionTier, Record<BillingInterval, string>> = {
  individual_vip: {
    month: process.env.NEXT_PUBLIC_STRIPE_PRICE_INDIVIDUAL_VIP_MONTHLY || '',
    year: process.env.NEXT_PUBLIC_STRIPE_PRICE_INDIVIDUAL_VIP_YEARLY || '',
  },
  collective_pro: {
    month: process.env.NEXT_PUBLIC_STRIPE_PRICE_COLLECTIVE_PRO_MONTHLY || '',
    year: process.env.NEXT_PUBLIC_STRIPE_PRICE_COLLECTIVE_PRO_YEARLY || '',
  },
  ecosystem_ceo: {
    month: process.env.NEXT_PUBLIC_STRIPE_PRICE_ECOSYSTEM_CEO_MONTHLY || '',
    year: process.env.NEXT_PUBLIC_STRIPE_PRICE_ECOSYSTEM_CEO_YEARLY || '',
  },
}

export function getPriceId(tier: SubscriptionTier, interval: BillingInterval): string {
  const priceId = STRIPE_PRICE_IDS[tier]?.[interval]
  if (!priceId) {
    throw new Error(`No price ID configured for tier: ${tier}, interval: ${interval}`)
  }
  return priceId
}

export function getTierFromPriceId(priceId: string): { tier: SubscriptionTier; interval: BillingInterval } | null {
  for (const [tier, prices] of Object.entries(STRIPE_PRICE_IDS)) {
    for (const [interval, id] of Object.entries(prices)) {
      if (id === priceId) {
        return {
          tier: tier as SubscriptionTier,
          interval: interval as BillingInterval,
        }
      }
    }
  }
  return null
}
