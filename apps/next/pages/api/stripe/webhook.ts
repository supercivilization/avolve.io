import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'
import { buffer } from 'micro'

import { getTierFromPriceId } from 'app/lib/stripe/config'
import type { Database } from '@my/supabase/types'

// Disable body parsing, we need the raw body for webhook verification
export const config = {
  api: {
    bodyParser: false,
  },
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

// Use service role for webhook handler (bypasses RLS)
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const buf = await buffer(req)
  const sig = req.headers['stripe-signature']

  if (!sig) {
    return res.status(400).json({ error: 'Missing stripe-signature header' })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return res.status(400).json({ error: 'Webhook signature verification failed' })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutComplete(session)
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdate(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentFailed(invoice)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return res.status(200).json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return res.status(500).json({ error: 'Webhook processing failed' })
  }
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.supabase_user_id

  if (!userId) {
    console.error('No user ID in checkout session metadata')
    return
  }

  // The subscription will be created/updated by the subscription events
  console.log(`Checkout completed for user: ${userId}`)
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.supabase_user_id

  if (!userId) {
    console.error('No user ID in subscription metadata')
    return
  }

  const priceId = subscription.items.data[0]?.price.id
  const tierInfo = priceId ? getTierFromPriceId(priceId) : null

  if (!tierInfo) {
    console.error(`Unknown price ID: ${priceId}`)
    return
  }

  // Use type assertion for Stripe v20 compatibility
  const sub = subscription as any

  const subscriptionData = {
    user_id: userId,
    tier: tierInfo.tier,
    status: subscription.status as any,
    billing_interval: tierInfo.interval,
    stripe_customer_id: subscription.customer as string,
    stripe_subscription_id: subscription.id,
    stripe_price_id: priceId,
    current_period_start: sub.current_period_start
      ? new Date(sub.current_period_start * 1000).toISOString()
      : null,
    current_period_end: sub.current_period_end
      ? new Date(sub.current_period_end * 1000).toISOString()
      : null,
    cancel_at_period_end: subscription.cancel_at_period_end,
    canceled_at: subscription.canceled_at
      ? new Date(subscription.canceled_at * 1000).toISOString()
      : null,
    trial_start: subscription.trial_start
      ? new Date(subscription.trial_start * 1000).toISOString()
      : null,
    trial_end: subscription.trial_end
      ? new Date(subscription.trial_end * 1000).toISOString()
      : null,
  }

  // Upsert subscription
  const { error } = await supabase
    .from('subscriptions')
    .upsert(subscriptionData, {
      onConflict: 'stripe_subscription_id',
    })

  if (error) {
    console.error('Error upserting subscription:', error)
    throw error
  }

  // Update user's tier in profile
  await supabase
    .from('profiles')
    .update({ tier: tierInfo.tier })
    .eq('id', userId)

  console.log(`Subscription updated for user: ${userId}, tier: ${tierInfo.tier}`)
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.supabase_user_id

  if (!userId) {
    console.error('No user ID in subscription metadata')
    return
  }

  // Update subscription status
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'canceled',
      canceled_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id)

  if (error) {
    console.error('Error updating subscription status:', error)
    throw error
  }

  // Clear user's tier
  await supabase
    .from('profiles')
    .update({ tier: null })
    .eq('id', userId)

  console.log(`Subscription canceled for user: ${userId}`)
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  // Use type assertion for Stripe v20 compatibility
  const inv = invoice as any
  const subscriptionId = inv.subscription as string

  if (!subscriptionId) {
    return
  }

  // Update subscription status to past_due
  const { error } = await supabase
    .from('subscriptions')
    .update({ status: 'past_due' })
    .eq('stripe_subscription_id', subscriptionId)

  if (error) {
    console.error('Error updating subscription status:', error)
  }

  console.log(`Payment failed for subscription: ${subscriptionId}`)
}
