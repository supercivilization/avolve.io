import type { Metadata } from "next"
import Link from "next/link"
import { QuickFix } from "@/components/support/QuickFix"
import { ErrorDetails } from "@/components/support/ErrorDetails"
import { RootCause } from "@/components/support/RootCause"
import { StepByStepFix } from "@/components/support/StepByStepFix"
import { ProductionImpact } from "@/components/support/ProductionImpact"
import { RelatedErrors } from "@/components/support/RelatedErrors"
import { LastVerified } from "@/components/shared/LastVerified"
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"

export const metadata: Metadata = {
  title: "Stripe Webhook Errors | Support | Avolve.io",
  description:
    "Fix 'Webhook signature verification failed' error in Stripe integration. Secure webhook handling for payment events.",
  keywords: "Stripe webhook error, signature verification, webhook failed, Stripe integration, payment webhook",
}

export default function StripeWebhookErrorsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Support", url: "/support" },
          { name: "Stripe Webhook Errors", url: "/support/stripe-webhook-errors" },
        ]}
      />

      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
            <Link href="/support" className="hover:underline">
              Support
            </Link>
            <span>/</span>
            <span>Stripe Webhook Errors</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-amber-900 dark:text-amber-100">
            Stripe Webhook Signature Verification Failed
          </h1>

          <p className="text-xl text-amber-700 dark:text-amber-300">
            Webhooks fail signature verification. Payments succeed but app doesn't update subscription status or fulfill orders.
          </p>

          <LastVerified date="2025-01-15" />
        </div>

        <div className="mb-12">
          <QuickFix
            title="Verify webhook endpoint and secret"
            problem="Webhook signature verification fails, events not processed"
            solution="Get correct webhook signing secret from Stripe dashboard and verify endpoint is publicly accessible"
            newCode={`// app/api/webhooks/stripe/route.ts
import Stripe from 'stripe'
import { headers } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return new Response('Webhook Error', { status: 400 })
  }

  // Process the event
  switch (event.type) {
    case 'customer.subscription.created':
      // Handle subscription created
      break
    case 'invoice.payment_succeeded':
      // Handle successful payment
      break
    // ... other events
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 })
}`}
            estimatedTime="10 minutes"
          />
        </div>

        <div className="mb-12">
          <ErrorDetails
            errorName="Webhook Signature Verification Failed"
            errorMessage="No signatures found matching the expected signature for payload / Webhook signature verification failed"
            frequency="common"
            timing="During initial Stripe setup or after endpoint URL changes"
            location="Stripe webhook endpoint handler"
            severity="high"
            affects={["Payment processing", "Subscription updates", "Invoice handling"]}
          />
        </div>

        <div className="mb-12">
          <RootCause
            title="Why Webhook Verification Fails"
            explanation="Stripe signs each webhook with a secret key to prevent malicious requests. Verification fails when: (1) Wrong webhook secret used (test vs live), (2) Endpoint URL not publicly accessible, (3) Request body modified before verification, (4) Secret not configured in environment variables."
            contributingFactors={[
              "Using test webhook secret in production (or vice versa)",
              "Endpoint URL not publicly accessible (localhost, VPN)",
              "Body parsed as JSON before verification (must use raw body)",
              "Webhook secret not set in environment variables",
              "Multiple webhook endpoints configured (using wrong secret)",
              "Endpoint URL changed without updating in Stripe dashboard",
            ]}
          />
        </div>

        <div className="mb-12">
          <StepByStepFix
            steps={[
              {
                step: 1,
                title: "Get webhook signing secret from Stripe",
                description: "Find the correct secret in Stripe dashboard",
                code: `1. Go to Stripe Dashboard
2. Navigate to Developers > Webhooks
3. Click on your webhook endpoint (or create new)
4. Click "Reveal" next to "Signing secret"
5. Copy the secret (starts with whsec_)

Important: Test mode and Live mode have different secrets!`,
                language: "text",
              },
              {
                step: 2,
                title: "Add secret to environment variables",
                description: "Configure STRIPE_WEBHOOK_SECRET in your deployment",
                code: `// .env.local (development)
STRIPE_WEBHOOK_SECRET=whsec_...your_test_secret

// .env.production (production)
STRIPE_WEBHOOK_SECRET=whsec_...your_live_secret

// In Vercel dashboard:
# Add environment variable:
# Key: STRIPE_WEBHOOK_SECRET
# Value: whsec_...your_live_secret`,
                language: "bash",
              },
              {
                step: 3,
                title: "Verify endpoint URL is publicly accessible",
                description: "Ensure Stripe can reach your webhook endpoint",
                code: `// Production endpoint (MUST be publicly accessible):
https://yourdomain.com/api/webhooks/stripe

// NOT accessible (will fail):
- localhost:3000/api/webhooks/stripe
- http://192.168.1.x/api/webhooks/stripe
- Behind VPN or firewall

Test accessibility:
curl -X POST https://yourdomain.com/api/webhooks/stripe`,
                language: "bash",
                note: "Use Stripe CLI for local testing: stripe listen --forward-to localhost:3000/api/webhooks/stripe",
              },
              {
                step: 4,
                title: "Implement correct verification pattern",
                description: "Use raw request body for signature verification",
                code: `// ✅ CORRECT: Use raw body
const body = await req.text() // Raw string
const signature = headers.get('stripe-signature')!

const event = stripe.webhooks.constructEvent(
  body,       // Raw body (string)
  signature,
  webhookSecret
)

// ❌ WRONG: Don't parse JSON first
const body = await req.json() // Parsed object
// This will always fail verification!`,
                language: "typescript",
                note: "Body must be raw text, not parsed JSON",
              },
              {
                step: 5,
                title: "Test with Stripe CLI",
                description: "Verify webhook handling works locally",
                command: "stripe trigger payment_intent.succeeded",
                note: "Check logs to confirm event received and processed successfully",
              },
            ]}
            verification="Send test webhook from Stripe dashboard. Should see 200 response and event logged in your application."
          />
        </div>

        <div className="mb-12">
          <ProductionImpact
            severity="high"
            estimatedFixTime="10-15 minutes"
            impactDescription="Payments succeed but app doesn't update. Users pay but don't get access. Subscriptions created but not activated. Manual reconciliation required."
            userImpact={[
              {
                aspect: "Payment Processing",
                description: "Customers charged but not granted access to product/service",
              },
              {
                aspect: "Subscription Management",
                description: "Subscriptions not activated, renewed, or cancelled properly",
              },
              {
                aspect: "Support Burden",
                description: "High volume of 'I paid but didn't get access' tickets",
              },
            ]}
            monitoring={[
              {
                metric: "Webhook Success Rate",
                recommendation: "Monitor in Stripe dashboard. Should be >99% success rate.",
              },
              {
                metric: "Payment vs Fulfillment",
                recommendation: "Compare successful payments to granted access. Should match.",
              },
              {
                metric: "Webhook Retry Count",
                recommendation: "Track failed webhooks and retries. Investigate if high.",
              },
            ]}
            rollback="Manually process failed webhooks via Stripe dashboard event logs while fixing integration"
          />
        </div>

        <div className="mb-12">
          <RelatedErrors
            errors={[
              {
                id: "idempotency-error",
                title: "Stripe Idempotency Errors",
                href: "/support/stripe-idempotency",
                description: "Duplicate payment processing or requests",
                relationship: "occurs-with",
                frequency: "occasional",
              },
              {
                id: "subscription-sync",
                title: "Subscription Status Out of Sync",
                href: "/support/subscription-sync",
                description: "App subscription status doesn't match Stripe",
                relationship: "caused-by",
                frequency: "common",
              },
            ]}
          />
        </div>

        <section className="rounded-lg border border-amber-200 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-900/20">
          <h3 className="mb-4 text-lg font-semibold text-amber-900 dark:text-amber-100">Related Resources</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-medium text-amber-900 dark:text-amber-100">Services</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/services/stripe" className="text-blue-600 hover:underline">
                    Stripe Payment Platform
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-medium text-amber-900 dark:text-amber-100">System Patterns</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/systems/stripe-subscriptions" className="text-blue-600 hover:underline">
                    Stripe Subscriptions Pattern
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
