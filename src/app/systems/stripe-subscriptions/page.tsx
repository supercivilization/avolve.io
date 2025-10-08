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
            chooseThisIf={[
              "Need recurring billing for SaaS",
              "Multiple subscription tiers",
              "Want detailed revenue analytics",
              "Need payment method management",
              "Building in US/EU/UK primarily",
            ]}
            chooseAlternativeIf={[
              "Primarily selling to China (Alipay/WeChat better)",
              "Want to avoid handling taxes (use Paddle/LemonSqueezy)",
              "One-time payments only (use Stripe Checkout)",
              "Very small side project (complexity overhead)",
            ]}
          />
        </div>

        <div className="mb-12">
          <PatternStructure
            steps={[
              {
                number: 1,
                title: "Client",
                description: "User clicks subscribe button",
                details: "Redirect to Stripe Checkout with price ID",
              },
              {
                number: 2,
                title: "Stripe Checkout",
                description: "User enters payment details",
                details: "Stripe handles payment collection and validation",
              },
              {
                number: 3,
                title: "Webhook",
                description: "Stripe sends subscription events",
                details: "checkout.session.completed, customer.subscription.updated, etc.",
              },
              {
                number: 4,
                title: "Database",
                description: "Update subscription status",
                details: "Store subscription_id, status, current_period_end",
              },
            ]}
            components={[
              {
                name: "Stripe Checkout",
                role: "Payment collection UI",
                technology: "@stripe/stripe-js",
              },
              {
                name: "Webhook Handler",
                role: "Process subscription events",
                technology: "stripe (Node SDK)",
              },
              {
                name: "Customer Portal",
                role: "Self-service management",
                technology: "Stripe Billing Portal",
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <TradeoffMatrix
            approaches={[
              {
                name: "Stripe",
                advantages: [
                  "Comprehensive API and SDKs",
                  "Excellent documentation",
                  "Powerful revenue analytics",
                  "Flexible pricing models",
                  "Large ecosystem",
                ],
                disadvantages: [
                  "2.9% + $0.30 per transaction",
                  "Must handle taxes yourself",
                  "Complex webhook implementation",
                  "Requires PCI compliance awareness",
                ],
                recommendation: "US/EU SaaS companies wanting full control",
              },
              {
                name: "Paddle",
                advantages: [
                  "Merchant of record (handles taxes)",
                  "One global price",
                  "No VAT/sales tax complexity",
                  "Simpler integration",
                ],
                disadvantages: [
                  "5% + $0.50 per transaction (higher)",
                  "Less flexible than Stripe",
                  "Slower payouts",
                  "Fewer features",
                ],
                recommendation: "Global B2C SaaS avoiding tax compliance",
              },
              {
                name: "LemonSqueezy",
                advantages: [
                  "Merchant of record",
                  "5% flat fee (no per-transaction)",
                  "Great for digital products",
                  "Modern developer experience",
                ],
                disadvantages: [
                  "Newer/less proven",
                  "Smaller feature set",
                  "Limited to certain countries",
                  "Less mature ecosystem",
                ],
                recommendation: "Digital product creators and small SaaS",
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <IntegrationGotchas
            gotchas={[
              {
                issue: "Webhook Signature Verification",
                severity: "high",
                frequency: "common",
                description:
                  "Skipping signature verification allows attackers to fake subscription events and grant free access.",
                solution: "ALWAYS verify webhook signatures with stripe.webhooks.constructEvent. Never trust webhook payloads without verification. Use separate webhook secrets for test/production. Return 400 on invalid signatures, not 200.",
                codeExample: `import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return new Response('No signature', { status: 400 })
  }

  let event: Stripe.Event

  try {
    // ✅ MUST verify signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return new Response('Invalid signature', { status: 400 })
  }

  // Now safe to process event
  await handleEvent(event)
  return new Response('Success', { status: 200 })
}`,
              },
              {
                issue: "Webhook Idempotency",
                severity: "high",
                frequency: "common",
                description:
                  "Stripe sends duplicate webhooks. Without idempotency, you grant subscriptions twice or double-charge users.",
                solution: "Store webhook event IDs in database. Check for duplicates before processing. Use database transactions for critical updates. Return 200 even for duplicates (already processed).",
                codeExample: `async function handleEvent(event: Stripe.Event) {
  const supabase = await createClient()

  // Check if we've processed this event already
  const { data: existing } = await supabase
    .from('webhook_events')
    .select('id')
    .eq('stripe_event_id', event.id)
    .single()

  if (existing) {
    console.log('Duplicate webhook event, skipping:', event.id)
    return // Already processed
  }

  // Process the event in a transaction
  const { error } = await supabase.rpc('process_subscription_webhook', {
    p_stripe_event_id: event.id,
    p_event_type: event.type,
    p_customer_id: (event.data.object as any).customer,
    p_subscription_id: (event.data.object as any).id,
  })

  if (error) throw error

  // Store that we've processed this event
  await supabase.from('webhook_events').insert({
    stripe_event_id: event.id,
    event_type: event.type,
    processed_at: new Date().toISOString(),
  })
}`,
              },
              {
                issue: "Failed Payment Handling",
                severity: "high",
                frequency: "common",
                description:
                  "Credit cards expire or fail. Without handling invoice.payment_failed, users keep access without paying.",
                solution: "Listen to invoice.payment_failed webhook. Implement grace period (7 days) before disabling. Send email notifications to user. Update subscription status to 'past_due'.",
                codeExample: `async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const supabase = await createClient()

  // Get subscription
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('stripe_subscription_id', invoice.subscription)
    .single()

  if (!subscription) return

  // Update status to past_due
  await supabase
    .from('subscriptions')
    .update({
      status: 'past_due',
      payment_failed_at: new Date().toISOString(),
    })
    .eq('id', subscription.id)

  // Send notification email
  await sendEmail({
    to: subscription.user_email,
    subject: 'Payment Failed - Action Required',
    template: 'payment-failed',
    data: {
      amount: invoice.amount_due / 100,
      update_url: \`\${process.env.NEXT_PUBLIC_APP_URL}/billing\`,
    },
  })

  // Schedule disabling access after 7 days grace period
  // (implement with cron job or scheduled function)
}`,
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <PatternVariations
            variations={[
              {
                name: "With Usage-Based Pricing",
                scenario: "AI APIs, SMS services, cloud infrastructure",
                description: "Charge based on consumption + base subscription",
                implementation: "Use metered billing with usage records API",
                tradeoffs: "More accurate but complex to implement and explain",
              },
              {
                name: "With Add-ons",
                scenario: "Extra seats, storage, features",
                description: "Optional extras users can purchase",
                implementation: "Create separate line items or additional subscriptions",
                tradeoffs: "Flexible but invoice gets more complex",
              },
              {
                name: "With Trials",
                scenario: "Let users test product before committing",
                description: "Free trial before first payment",
                implementation: "Use trial_period_days on subscription creation",
                tradeoffs: "Higher conversion but more support for trial users",
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
