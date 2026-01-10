#!/usr/bin/env npx tsx
/**
 * Stripe Product Setup Script
 *
 * Creates the 6 subscription products for Avolve:
 * - Individual VIP (Monthly & Yearly)
 * - Collective PRO (Monthly & Yearly)
 * - Ecosystem CEO (Monthly & Yearly)
 *
 * Usage:
 *   STRIPE_SECRET_KEY=sk_test_xxx npx tsx scripts/setup-stripe-products.ts
 *
 * Or add to package.json scripts and use environment variables
 */

import Stripe from 'stripe'

// Verify Stripe key is set
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
if (!stripeSecretKey) {
  console.error('Error: STRIPE_SECRET_KEY environment variable is required')
  process.exit(1)
}

const stripe = new Stripe(stripeSecretKey)

interface TierConfig {
  id: string
  name: string
  description: string
  monthlyPrice: number // in cents
  yearlyPrice: number // in cents
  features: string[]
  metadata: Record<string, string>
}

const tiers: TierConfig[] = [
  {
    id: 'individual_vip',
    name: 'Individual VIP',
    description: 'For solopreneurs ready to accelerate their growth with AI-powered tools and training.',
    monthlyPrice: 2800, // $28
    yearlyPrice: 28800, // $288
    features: [
      'Full documentation & tutorials',
      'Playbooks & SOPs library',
      'Templates & components',
      'AI chat assistant (100/day)',
      'Community forum access',
      'Knowledge base access',
      'Up to 3 active projects',
    ],
    metadata: {
      tier: 'individual_vip',
      seats: '1',
      ai_messages: '100',
      projects: '3',
    },
  },
  {
    id: 'collective_pro',
    name: 'Collective PRO',
    description: 'For teams building together with advanced features and group sessions.',
    monthlyPrice: 28800, // $288
    yearlyPrice: 288800, // $2,888
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
      'Up to 10 active projects',
    ],
    metadata: {
      tier: 'collective_pro',
      seats: '10',
      ai_messages: '500',
      projects: '10',
    },
  },
  {
    id: 'ecosystem_ceo',
    name: 'Ecosystem CEO',
    description: 'For organizations requiring dedicated support and strategic partnership.',
    monthlyPrice: 288800, // $2,888
    yearlyPrice: 2288800, // $22,888
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
      'Unlimited AI chat & projects',
    ],
    metadata: {
      tier: 'ecosystem_ceo',
      seats: 'unlimited',
      ai_messages: 'unlimited',
      projects: 'unlimited',
    },
  },
]

async function createProduct(tier: TierConfig) {
  console.log(`\nCreating product: ${tier.name}...`)

  // Create the product
  const product = await stripe.products.create({
    name: tier.name,
    description: tier.description,
    metadata: tier.metadata,
    marketing_features: tier.features.slice(0, 15).map((name) => ({ name })), // Stripe limits to 15
  })

  console.log(`  ✓ Product created: ${product.id}`)

  // Create monthly price
  const monthlyPrice = await stripe.prices.create({
    product: product.id,
    unit_amount: tier.monthlyPrice,
    currency: 'usd',
    recurring: {
      interval: 'month',
    },
    metadata: {
      tier: tier.id,
      billing_interval: 'month',
    },
  })

  console.log(`  ✓ Monthly price created: ${monthlyPrice.id} ($${tier.monthlyPrice / 100}/mo)`)

  // Create yearly price
  const yearlyPrice = await stripe.prices.create({
    product: product.id,
    unit_amount: tier.yearlyPrice,
    currency: 'usd',
    recurring: {
      interval: 'year',
    },
    metadata: {
      tier: tier.id,
      billing_interval: 'year',
    },
  })

  console.log(`  ✓ Yearly price created: ${yearlyPrice.id} ($${tier.yearlyPrice / 100}/yr)`)

  return {
    product,
    monthlyPrice,
    yearlyPrice,
  }
}

async function main() {
  console.log('🚀 Setting up Stripe products for Avolve...\n')

  const results: Record<string, any> = {}

  for (const tier of tiers) {
    results[tier.id] = await createProduct(tier)
  }

  console.log('\n✅ All products created successfully!\n')
  console.log('='.repeat(60))
  console.log('\nAdd these Price IDs to your environment variables:\n')

  for (const [tierId, data] of Object.entries(results)) {
    const tierName = tierId.toUpperCase().replace('_', '_')
    console.log(`# ${tierId}`)
    console.log(`STRIPE_PRICE_${tierName}_MONTHLY=${data.monthlyPrice.id}`)
    console.log(`STRIPE_PRICE_${tierName}_YEARLY=${data.yearlyPrice.id}`)
    console.log('')
  }

  console.log('='.repeat(60))
  console.log('\nProduct IDs (for reference):\n')

  for (const [tierId, data] of Object.entries(results)) {
    console.log(`${tierId}: ${data.product.id}`)
  }
}

main().catch((error) => {
  console.error('Error setting up Stripe products:', error)
  process.exit(1)
})
