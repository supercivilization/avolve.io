import type { NextApiRequest, NextApiResponse } from 'next'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import Stripe from 'stripe'

import { getPriceId } from 'app/lib/stripe/config'
import type { SubscriptionTier, BillingInterval } from 'app/utils/subscription/types'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get authenticated user
    const supabase = createPagesServerClient({ req, res })
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { tier, interval } = req.body as {
      tier: SubscriptionTier
      interval: BillingInterval
    }

    if (!tier || !interval) {
      return res.status(400).json({ error: 'Missing tier or interval' })
    }

    // Get or create Stripe customer
    let stripeCustomerId: string

    // Check if user already has a Stripe customer ID
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', session.user.id)
      .single()

    if (profile?.stripe_customer_id) {
      stripeCustomerId = profile.stripe_customer_id
    } else {
      // Create new Stripe customer
      const customer = await stripe.customers.create({
        email: session.user.email,
        metadata: {
          supabase_user_id: session.user.id,
        },
      })

      stripeCustomerId = customer.id

      // Save Stripe customer ID to profile
      await supabase
        .from('profiles')
        .update({ stripe_customer_id: stripeCustomerId })
        .eq('id', session.user.id)
    }

    // Get the price ID for this tier and interval
    const priceId = getPriceId(tier, interval)

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/${tier}?interval=${interval}`,
      subscription_data: {
        metadata: {
          supabase_user_id: session.user.id,
          tier,
          billing_interval: interval,
        },
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    })

    return res.status(200).json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to create checkout session',
    })
  }
}
