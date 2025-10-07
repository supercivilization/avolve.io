import type { Metadata } from "next"
import Link from "next/link"
import { PricingOverview } from "@/components/services/PricingOverview"
import { CostTriggers } from "@/components/services/CostTriggers"
import { LimitsAndQuotas } from "@/components/services/LimitsAndQuotas"
import { CostCalculator } from "@/components/services/CostCalculator"
import { IntegrationRequirements } from "@/components/services/IntegrationRequirements"
import { LastVerified } from "@/components/shared/LastVerified"
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"

export const metadata: Metadata = {
  title: "Stripe Payment Platform | Pricing & Integration | Avolve.io",
  description:
    "Complete guide to Stripe pricing, payment processing fees, and Next.js integration. Subscriptions, invoicing, and global payments.",
  keywords: "Stripe pricing, payment processing, Stripe subscriptions, payment integration, Stripe fees",
}

export default function StripeServicePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Stripe", url: "/services/stripe" },
        ]}
      />

      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <Link href="/services" className="hover:underline">
              Services
            </Link>
            <span>/</span>
            <span>Stripe</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Stripe Payment Platform
          </h1>

          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Payment infrastructure for the internet. Accept payments, manage subscriptions, and handle complex billing with a single API. No monthly fees.
          </p>

          <LastVerified date="2025-01-15" />
        </div>

        <div className="mb-12">
          <PricingOverview
            serviceName="Stripe"
            description="Simple, transparent pricing with no monthly fees. Pay only for successful transactions. All features available on all tiers."
            tiers={[
              {
                name: "Integrated",
                price: "2.9% + $0.30",
                billingNote: "per transaction",
                highlights: [
                  "All payment methods",
                  "Subscriptions & invoicing",
                  "Tax calculation",
                  "No monthly fee",
                ],
                recommended: true,
              },
              {
                name: "International",
                price: "+1.5%",
                billingNote: "additional fee",
                highlights: [
                  "Non-US cards",
                  "Currency conversion",
                  "Global payments",
                  "135+ currencies",
                ],
              },
              {
                name: "Billing",
                price: "0.5%",
                billingNote: "on recurring revenue",
                highlights: [
                  "Advanced billing features",
                  "Revenue recognition",
                  "Usage-based billing",
                  "Add-on to base pricing",
                ],
              },
            ]}
            features={[
              {
                name: "Payment Methods",
                description: "Supported payment types",
                tiers: {
                  "Integrated": "Cards, wallets, bank",
                  "International": "Same + local methods",
                  "Billing": "Same",
                },
              },
              {
                name: "Subscriptions",
                description: "Recurring billing",
                tiers: {
                  "Integrated": true,
                  "International": true,
                  "Billing": true,
                },
              },
              {
                name: "Invoicing",
                description: "Automated invoicing",
                tiers: {
                  "Integrated": true,
                  "International": true,
                  "Billing": true,
                },
              },
              {
                name: "Tax Calculation",
                description: "Automatic sales tax",
                tiers: {
                  "Integrated": true,
                  "International": true,
                  "Billing": true,
                },
              },
              {
                name: "Radar Fraud Detection",
                description: "Machine learning fraud prevention",
                tiers: {
                  "Integrated": "Included",
                  "International": "Included",
                  "Billing": "Included",
                },
              },
              {
                name: "Revenue Recognition",
                description: "GAAP/IFRS compliant accounting",
                tiers: {
                  "Integrated": false,
                  "International": false,
                  "Billing": true,
                },
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <CostTriggers
            serviceName="Stripe"
            triggers={[
              {
                id: "revenue-milestones",
                title: "Revenue Milestones",
                currentTier: "Standard Pricing",
                upgradeTo: "Custom Pricing (High Volume)",
                scenario: "Your business is processing significant transaction volume that may qualify for custom pricing.",
                metrics: [
                  { name: "Transaction Volume", threshold: "High volume" },
                  { name: "Base Rate", threshold: "2.9% + $0.30 per transaction" },
                ],
                costIncrease: "Percentage-based pricing scales naturally",
                urgency: "low",
              },
              {
                id: "international-payments",
                title: "International Payments",
                currentTier: "Domestic Pricing",
                upgradeTo: "International Card Fees Apply",
                scenario: "Your application is accepting payments from customers outside the US with non-US cards.",
                metrics: [
                  { name: "International Cards", threshold: "Non-US cards" },
                  { name: "Additional Fee", threshold: "+1.5% on top of base rate" },
                ],
                costIncrease: "Unavoidable for global customers",
                urgency: "medium",
              },
              {
                id: "complex-billing",
                title: "Complex Pricing Models",
                currentTier: "Standard Integration",
                upgradeTo: "Billing Engine (+0.5%)",
                scenario: "Your pricing model requires usage-based billing, tiered pricing, or per-seat billing features.",
                metrics: [
                  { name: "Billing Complexity", threshold: "Usage-based billing" },
                  { name: "Additional Fee", threshold: "+0.5% on recurring revenue" },
                ],
                costIncrease: "Billing Engine required",
                urgency: "low",
              },
              {
                id: "chargebacks",
                title: "Chargeback Risk",
                currentTier: "Standard Processing",
                upgradeTo: "Enhanced Fraud Protection",
                scenario: "Disputed transactions are resulting in chargeback fees and potential account risk.",
                metrics: [
                  { name: "Chargeback Fee", threshold: "$15 per chargeback" },
                  { name: "Risk Level", threshold: "High chargeback rate" },
                ],
                costIncrease: "Enable Radar fraud detection",
                urgency: "high",
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <LimitsAndQuotas
            serviceName="Stripe"
            limits={[
              {
                id: "test-mode",
                name: "Test Mode Payments",
                tier: "Test/Live",
                value: "100 test payments / Unlimited live",
                type: "soft",
                blocksCapability: [
                  "Extensive testing with >100 test transactions",
                  "Load testing payment flows",
                ],
                workarounds: [
                  "Move to live mode for production",
                  "Reset test data periodically",
                  "Use live mode with small amounts for testing",
                ],
              },
              {
                id: "webhooks",
                name: "Webhook Deliveries",
                tier: "All",
                value: "Unlimited",
                type: "soft",
                blocksCapability: [
                  "None - webhooks are unlimited",
                ],
                workarounds: [
                  "Configure endpoint URL properly",
                  "Implement retry logic for failed deliveries",
                ],
              },
              {
                id: "payout-schedule",
                name: "Payout Schedule",
                tier: "All",
                value: "Rolling 2-day (default) / Custom after history",
                type: "soft",
                blocksCapability: [
                  "Immediate payouts for new accounts",
                  "Custom schedules without transaction history",
                ],
                workarounds: [
                  "Wait for volume history to customize schedule",
                  "Contact support for faster payouts with good history",
                ],
              },
              {
                id: "api-rate-limit",
                name: "API Rate Limit",
                tier: "All",
                value: "100 requests/second",
                type: "rate",
                blocksCapability: [
                  "Very high-throughput payment processing",
                  "Bulk operations exceeding rate limit",
                ],
                workarounds: [
                  "Implement request batching",
                  "Contact Stripe for higher limits",
                  "Use exponential backoff for retries",
                ],
                critical: true,
              },
              {
                id: "sca-requirement",
                name: "Strong Customer Authentication (SCA)",
                tier: "All (EU)",
                value: "Required for EU customers",
                type: "hard",
                blocksCapability: [
                  "Frictionless checkout for EU customers (regulation)",
                  "Stored card payments without authentication",
                ],
                workarounds: [
                  "Use Payment Intents API (handles SCA automatically)",
                  "Implement 3D Secure authentication flow",
                  "Request exemptions where applicable",
                ],
                critical: true,
              },
              {
                id: "dispute-response",
                name: "Dispute Response Time",
                tier: "All",
                value: "7-21 days (varies by network)",
                type: "hard",
                blocksCapability: [
                  "Late responses result in automatic loss",
                  "No extensions available",
                ],
                workarounds: [
                  "Set up dispute alerts and notifications",
                  "Respond immediately with evidence",
                  "Use Radar to prevent disputes proactively",
                ],
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <CostCalculator
            serviceName="Stripe"
            scenarios={[
              {
                id: "startup",
                name: "$1,000 MRR",
                description: "Small SaaS with domestic customers only",
                usage: [
                  { metric: "Customers", value: "100" },
                  { metric: "Average Order", value: "$10/month" },
                  { metric: "Total Revenue", value: "$1,000 MRR" },
                  { metric: "Card Mix", value: "100% US cards" },
                ],
                breakdown: [
                  {
                    component: "Transaction Fees",
                    cost: "$29/month",
                    notes: "$1,000 × 2.9%",
                  },
                  {
                    component: "Fixed Fees",
                    cost: "$30/month",
                    notes: "100 transactions × $0.30",
                  },
                ],
                totalCost: "$59/month (~5.9% effective rate)",
                type: "startup",
              },
              {
                id: "growth",
                name: "$10,000 MRR",
                description: "Growing SaaS with international customers",
                usage: [
                  { metric: "Customers", value: "500" },
                  { metric: "Average Order", value: "$20/month" },
                  { metric: "Total Revenue", value: "$10,000 MRR" },
                  { metric: "Card Mix", value: "80% US / 20% international" },
                ],
                breakdown: [
                  {
                    component: "Base Transaction Fees",
                    cost: "$290/month",
                    notes: "$10,000 × 2.9%",
                  },
                  {
                    component: "Fixed Fees",
                    cost: "$150/month",
                    notes: "500 transactions × $0.30",
                  },
                  {
                    component: "International Fees",
                    cost: "$30/month",
                    notes: "$2,000 international × 1.5%",
                  },
                ],
                totalCost: "$470/month (~4.7% effective rate)",
                type: "growth",
              },
              {
                id: "enterprise",
                name: "$100,000 MRR",
                description: "Established SaaS with global customer base",
                usage: [
                  { metric: "Customers", value: "2,000" },
                  { metric: "Average Order", value: "$50/month" },
                  { metric: "Total Revenue", value: "$100,000 MRR" },
                  { metric: "Card Mix", value: "70% US / 30% international" },
                ],
                breakdown: [
                  {
                    component: "Base Transaction Fees",
                    cost: "$2,900/month",
                    notes: "$100,000 × 2.9%",
                  },
                  {
                    component: "Fixed Fees",
                    cost: "$600/month",
                    notes: "2,000 transactions × $0.30",
                  },
                  {
                    component: "International Fees",
                    cost: "$450/month",
                    notes: "$30,000 international × 1.5%",
                  },
                ],
                totalCost: "$3,950/month (~3.95% effective rate)",
                type: "enterprise",
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <IntegrationRequirements
            serviceName="Stripe"
            steps={[
              {
                id: "account-verification",
                title: "Account Verification",
                description: "Create and verify Stripe account for production use",
                required: true,
                estimatedTime: "1-2 business days",
                configExample: `// Steps:
// 1. Create Stripe account at stripe.com
// 2. Complete KYC verification
//    - Business information
//    - Bank account for payouts
//    - Identity verification
//    - Tax information
// 3. Wait for approval (1-2 business days)
// 4. Activate live mode`,
                docs: [
                  { text: "Account Setup", href: "https://stripe.com/docs/account" },
                ],
              },
              {
                id: "api-keys",
                title: "API Keys Configuration",
                description: "Set up environment variables for Stripe integration",
                required: true,
                estimatedTime: "5 min",
                configExample: `// .env.local
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_... // Server-side only!
STRIPE_WEBHOOK_SECRET=whsec_...

// Use test keys during development
// Switch to live keys (pk_live_..., sk_live_...) for production
// Never expose secret key client-side`,
                docs: [
                  { text: "API Keys", href: "https://stripe.com/docs/keys" },
                ],
              },
              {
                id: "webhook-setup",
                title: "Webhook Endpoint Setup",
                description: "Configure webhooks for payment event handling",
                required: true,
                estimatedTime: "15 min",
                configExample: `// app/api/webhooks/stripe/route.ts
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('stripe-signature')!

  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  )

  // Handle events: checkout.session.completed, etc.
  switch (event.type) {
    case 'checkout.session.completed':
      // Handle successful payment
      break
  }

  return new Response(JSON.stringify({ received: true }))
}`,
                docs: [
                  { text: "Webhooks", href: "https://stripe.com/docs/webhooks" },
                ],
              },
              {
                id: "products-pricing",
                title: "Product & Price Creation",
                description: "Set up products and pricing in Stripe",
                required: true,
                estimatedTime: "20 min",
                configExample: `// Create products and prices via Dashboard or API
// Dashboard: Products → Add Product

// Or via API:
const product = await stripe.products.create({
  name: 'Pro Plan',
  description: 'Professional tier with advanced features',
})

const price = await stripe.prices.create({
  product: product.id,
  unit_amount: 2000, // $20.00
  currency: 'usd',
  recurring: { interval: 'month' },
})

// Test with test cards: 4242 4242 4242 4242`,
                docs: [
                  { text: "Products & Prices", href: "https://stripe.com/docs/products-prices/overview" },
                ],
              },
              {
                id: "payment-flow",
                title: "Payment Flow Implementation",
                description: "Implement checkout with Stripe Elements and Payment Intents",
                required: true,
                estimatedTime: "30 min",
                configExample: `// Install packages
npm install @stripe/stripe-js stripe

// Client-side checkout
import { loadStripe } from '@stripe/stripe-js'

const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// Create checkout session
const response = await fetch('/api/checkout', {
  method: 'POST',
  body: JSON.stringify({ priceId }),
})

const session = await response.json()

// Redirect to checkout
await stripe.redirectToCheckout({
  sessionId: session.id,
})

// Handle success/failure via webhooks`,
                docs: [
                  { text: "Checkout", href: "https://stripe.com/docs/payments/checkout" },
                  { text: "Payment Intents", href: "https://stripe.com/docs/payments/payment-intents" },
                ],
              },
            ]}
          />
        </div>

        <section className="rounded-lg border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Related Resources</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-medium text-neutral-900 dark:text-neutral-100">Solutions Using This Service</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/solutions/ai-chat-saas" className="text-blue-600 hover:underline">
                    AI Chat SaaS Application
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-medium text-neutral-900 dark:text-neutral-100">System Patterns</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/systems/stripe-subscriptions" className="text-blue-600 hover:underline">
                    Stripe Subscriptions
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
