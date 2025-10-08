import type { Metadata } from "next"
import Link from "next/link"
import { PatternIdentity } from "@/components/systems/PatternIdentity"
import { QuickDecision } from "@/components/systems/QuickDecision"
import { PatternStructure } from "@/components/systems/PatternStructure"
import { TradeoffMatrix } from "@/components/systems/TradeoffMatrix"
import { IntegrationGotchas } from "@/components/systems/IntegrationGotchas"
import { PatternVariations } from "@/components/systems/PatternVariations"
import { LastVerified } from "@/components/shared/LastVerified"
import { InteractiveCodeBlock } from "@/components/shared/InteractiveCodeBlock"
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"

export const metadata: Metadata = {
  title: "Stripe Subscriptions Pattern | System Integration | Avolve.io",
  description:
    "Production-ready recurring billing with Stripe. Webhooks, subscription lifecycle, upgrades, and cancellations.",
  keywords: "Stripe subscriptions, recurring billing, webhooks, subscription management, payment processing",
}

export default function StripeSubscriptionsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Systems", url: "/systems" },
          { name: "Stripe Subscriptions", url: "/systems/stripe-subscriptions" },
        ]}
      />

      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/systems" className="hover:underline">
              Systems
            </Link>
            <span>/</span>
            <span>Stripe Subscriptions</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Stripe Subscriptions
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400">
            Complete subscription billing system with webhooks, lifecycle management, upgrades, downgrades, and cancellations.
          </p>

          <LastVerified date="2025-01-15" />
        </div>

        <div className="mb-12">
          <PatternIdentity
            category="Payments"
            abstractionLevel="medium"
            abstractionDescription="Managed payment service with webhook integration"
            alternatives={[
              {
                name: "Paddle",
                href: "/systems/paddle-billing",
                description: "Merchant of record handles taxes and compliance",
              },
              {
                name: "LemonSqueezy",
                href: "/systems/lemonsqueezy",
                description: "Simple MoR with lower fees for digital products",
              },
            ]}
            complements={[
              {
                name: "Usage Tracking",
                href: "/systems/api-usage-tracking",
                description: "Combine subscriptions with usage-based pricing",
              },
            ]}
            tags={["Payments", "Subscriptions", "Webhooks", "Billing", "Revenue"]}
          />
        </div>

        <div className="mb-12">
          <QuickDecision
            useThisWhen={[
              { text: "Need recurring billing for SaaS" },
              { text: "Multiple subscription tiers" },
              { text: "Want detailed revenue analytics" },
              { text: "Need payment method management" },
              { text: "Building in US/EU/UK primarily" },
            ]}
            useAlternativeWhen={[
              { text: "Primarily selling to China (Alipay/WeChat better)" },
              { text: "Want to avoid handling taxes (use Paddle/LemonSqueezy)" },
              { text: "One-time payments only (use Stripe Checkout)" },
              { text: "Very small side project (complexity overhead)" },
            ]}
          />
        </div>

        <div className="mb-12">
          <PatternStructure
            patternName="Stripe Subscriptions"
            description="How subscription billing flows through Stripe and your application"
            integrationPoints={[
              {
                id: "subscribe-button",
                name: "Client Subscribe Button",
                type: "input",
                description: "User clicks subscribe button, redirect to Stripe Checkout with price ID",
              },
              {
                id: "stripe-checkout",
                name: "Stripe Checkout",
                type: "bidirectional",
                description: "User enters payment details, Stripe handles payment collection and validation",
              },
              {
                id: "webhook-events",
                name: "Webhook Handler",
                type: "bidirectional",
                description: "Stripe sends subscription events (checkout.session.completed, customer.subscription.updated, etc.)",
              },
              {
                id: "database-sync",
                name: "Database Sync",
                type: "output",
                description: "Store subscription_id, status, current_period_end in your database",
              },
            ]}
            notes={[
              "ALWAYS verify webhook signatures to prevent fake events",
              "Implement idempotency - Stripe sends duplicate webhooks",
              "Handle failed payments with grace period",
              "Use Customer Portal for self-service subscription management",
            ]}
          />
        </div>

        <div className="mb-12">
          <TradeoffMatrix
            title="Payment Provider Comparison"
            description="Compare different payment processors for subscription billing"
            criteria={[
              { key: "fees", label: "Transaction Fees", format: "text" },
              { key: "control", label: "Control/Flexibility", format: "rating" },
              { key: "complexity", label: "Implementation Complexity", format: "rating" },
              { key: "taxes", label: "Tax Handling", format: "text" },
              { key: "analytics", label: "Revenue Analytics", format: "rating" },
            ]}
            patterns={[
              {
                name: "Stripe",
                href: "/systems/stripe-subscriptions",
                ratings: {
                  fees: "2.9% + $0.30",
                  control: 5,
                  complexity: 4,
                  taxes: "Manual",
                  analytics: 5,
                },
              },
              {
                name: "Paddle",
                href: "/systems/paddle-billing",
                ratings: {
                  fees: "5% + $0.50",
                  control: 3,
                  complexity: 2,
                  taxes: "Automatic (MoR)",
                  analytics: 3,
                },
              },
              {
                name: "LemonSqueezy",
                href: "/systems/lemonsqueezy",
                ratings: {
                  fees: "5% flat",
                  control: 3,
                  complexity: 2,
                  taxes: "Automatic (MoR)",
                  analytics: 3,
                },
              },
            ]}
            notes="Stripe is recommended for US/EU SaaS with full control needs. Paddle for global B2C avoiding tax complexity. LemonSqueezy for digital products."
          />
        </div>

        <div className="mb-12">
          <IntegrationGotchas
            gotchas={[
              {
                id: "webhook-signature-verification",
                title: "Webhook Signature Verification",
                frequency: "common",
                description:
                  "Skipping signature verification allows attackers to fake subscription events and grant free access.",
                symptoms: [
                  "Security vulnerability - attackers can fake events",
                  "No verification that webhook came from Stripe",
                  "Potential for unauthorized subscription access",
                ],
                solution: "ALWAYS verify webhook signatures with stripe.webhooks.constructEvent. Never trust webhook payloads without verification. Use separate webhook secrets for test/production. Return 400 on invalid signatures, not 200.",
              },
              {
                id: "webhook-idempotency",
                title: "Webhook Idempotency",
                frequency: "common",
                description:
                  "Stripe sends duplicate webhooks. Without idempotency, you grant subscriptions twice or double-charge users.",
                symptoms: [
                  "Users charged multiple times for same subscription",
                  "Duplicate database records",
                  "Multiple notification emails sent",
                ],
                solution: "Store webhook event IDs in database. Check for duplicates before processing. Use database transactions for critical updates. Return 200 even for duplicates (already processed). Create unique constraint on stripe_event_id.",
              },
              {
                id: "failed-payment-handling",
                title: "Failed Payment Handling",
                frequency: "common",
                description:
                  "Credit cards expire or fail. Without handling invoice.payment_failed, users keep access without paying.",
                symptoms: [
                  "Users retain access despite failed payments",
                  "Revenue loss from expired cards",
                  "No notification to users about payment issues",
                ],
                solution: "Listen to invoice.payment_failed webhook. Implement grace period (7 days) before disabling access. Send email notifications to user. Update subscription status to 'past_due'. Schedule job to disable access after grace period.",
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <PatternVariations
            variations={[
              {
                id: "usage-based-pricing",
                name: "Subscriptions with Usage-Based Pricing",
                href: "/systems/stripe-metered-billing",
                relationship: "extension",
                description: "Charge based on consumption plus base subscription (AI APIs, SMS services, cloud infrastructure)",
                keyDifferences: [
                  "Use metered billing with usage records API",
                  "Track usage and report to Stripe",
                  "More accurate pricing but complex to implement and explain",
                ],
                tags: ["Usage-Based", "Metered Billing", "Pay-as-you-go"],
              },
              {
                id: "with-add-ons",
                name: "Subscriptions with Add-ons",
                href: "/systems/stripe-add-ons",
                relationship: "extension",
                description: "Optional extras users can purchase (extra seats, storage, features)",
                keyDifferences: [
                  "Create separate line items or additional subscriptions",
                  "Allow users to customize their plan",
                  "Flexible but invoice gets more complex",
                ],
                tags: ["Add-ons", "Upsells", "Customization"],
              },
              {
                id: "with-trials",
                name: "Free Trial Subscriptions",
                href: "/systems/stripe-trials",
                relationship: "complement",
                description: "Let users test product before committing with free trial period",
                keyDifferences: [
                  "Use trial_period_days on subscription creation",
                  "No payment collected until trial ends",
                  "Higher conversion but more support for trial users",
                ],
                tags: ["Free Trial", "Conversion", "Onboarding"],
              },
            ]}
          />
        </div>

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">Complete Implementation</h2>

          <div className="space-y-8">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">1. Database Schema</h3>
              <InteractiveCodeBlock
                code={`CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT NOT NULL,
  stripe_subscription_id TEXT NOT NULL UNIQUE,
  stripe_price_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN (
    'trialing', 'active', 'canceled', 'incomplete',
    'incomplete_expired', 'past_due', 'unpaid'
  )),
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  canceled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_event_id TEXT NOT NULL UNIQUE,
  event_type TEXT NOT NULL,
  processed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_customer ON subscriptions(stripe_customer_id);`}
                language="sql"
              />
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">2. Create Checkout Session</h3>
              <InteractiveCodeBlock
                code={`// app/api/stripe/checkout/route.ts
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const { priceId } = await req.json()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Get or create Stripe customer
  let customerId: string
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .single()

  if (sub?.stripe_customer_id) {
    customerId = sub.stripe_customer_id
  } else {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { user_id: user.id },
    })
    customerId = customer.id
  }

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: \`\${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success\`,
    cancel_url: \`\${process.env.NEXT_PUBLIC_APP_URL}/pricing?checkout=canceled\`,
    metadata: { user_id: user.id },
  })

  return Response.json({ url: session.url })
}`}
                language="typescript"
              />
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">3. Webhook Handler</h3>
              <InteractiveCodeBlock
                code={`// app/api/stripe/webhook/route.ts
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    return new Response(\`Webhook Error: \${err.message}\`, { status: 400 })
  }

  const supabase = await createClient()

  // Check for duplicate
  const { data: existing } = await supabase
    .from('webhook_events')
    .select('id')
    .eq('stripe_event_id', event.id)
    .single()

  if (existing) {
    return new Response('Duplicate event', { status: 200 })
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const subscription = await stripe.subscriptions.retrieve(session.subscription as string)

      await supabase.from('subscriptions').upsert({
        user_id: session.metadata!.user_id,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: subscription.id,
        stripe_price_id: subscription.items.data[0].price.id,
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      })
      break
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription

      await supabase
        .from('subscriptions')
        .update({
          status: subscription.status,
          stripe_price_id: subscription.items.data[0].price.id,
          current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          cancel_at_period_end: subscription.cancel_at_period_end,
          canceled_at: subscription.canceled_at
            ? new Date(subscription.canceled_at * 1000).toISOString()
            : null,
        })
        .eq('stripe_subscription_id', subscription.id)
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription

      await supabase
        .from('subscriptions')
        .update({ status: 'canceled' })
        .eq('stripe_subscription_id', subscription.id)
      break
    }
  }

  // Record that we processed this event
  await supabase.from('webhook_events').insert({
    stripe_event_id: event.id,
    event_type: event.type,
  })

  return new Response('Success', { status: 200 })
}`}
                language="typescript"
              />
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Related Resources</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-medium text-gray-900 dark:text-gray-100">Solutions Using This Pattern</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/solutions/ai-chat-saas" className="text-blue-600 hover:underline">
                    AI Chat SaaS Application
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-medium text-gray-900 dark:text-gray-100">Common Errors</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/support/stripe-webhook-errors" className="text-blue-600 hover:underline">
                    Stripe Webhook Errors
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
