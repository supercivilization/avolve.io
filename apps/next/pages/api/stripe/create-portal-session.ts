import type { NextApiRequest, NextApiResponse } from 'next'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import Stripe from 'stripe'

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

    // Get user's Stripe customer ID
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', session.user.id)
      .single()

    if (!profile?.stripe_customer_id) {
      return res.status(400).json({ error: 'No billing account found' })
    }

    // Create Stripe billing portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings`,
    })

    return res.status(200).json({ url: portalSession.url })
  } catch (error) {
    console.error('Error creating portal session:', error)
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to create portal session',
    })
  }
}
