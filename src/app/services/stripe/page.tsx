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
            triggers={[
              {
                trigger: "Revenue Milestones",
                threshold: "Any revenue",
                impact: "2.9% + $0.30 per transaction",
                mitigation:
                  "Percentage-based pricing scales naturally. Higher volume may qualify for custom pricing.",
              },
              {
                trigger: "International Payments",
                threshold: "Non-US cards",
                impact: "+1.5% additional fee",
                mitigation:
                  "Unavoidable for global customers. Consider region-specific pricing to offset.",
              },
              {
                trigger: "Complex Pricing Models",
                threshold: "Usage-based billing",
                impact: "+0.5% on recurring revenue",
                mitigation:
                  "Billing Engine required for metered usage, tiered pricing, or per-seat billing.",
              },
              {
                trigger: "Chargebacks",
                threshold: "Disputed transactions",
                impact: "$15 per chargeback",
                mitigation:
                  "Enable Radar fraud detection, clear refund policy, good customer service.",
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <LimitsAndQuotas
            limits={[
              {
                name: "Test Mode Payments",
                free: "100 payments",
                paid: "Unlimited in live mode",
                notes: "Test thoroughly before going live",
              },
              {
                name: "Webhook Deliveries",
                free: "Unlimited",
                paid: "Unlimited",
                notes: "Must configure endpoint URL and handle retries",
              },
              {
                name: "Payout Schedule",
                free: "Rolling (2-day default)",
                paid: "Daily/weekly/monthly available",
                notes: "Customize in dashboard after volume history",
              },
              {
                name: "API Rate Limit",
                free: "100 req/sec in test",
                paid: "100 req/sec (contact for higher)",
                notes: "Enforced per API key",
              },
              {
                name: "Strong Customer Auth (SCA)",
                free: "Required in EU",
                paid: "Required in EU",
                notes: "Payment Intents API handles SCA automatically",
              },
              {
                name: "Dispute Response Time",
                free: "7-21 days",
                paid: "7-21 days",
                notes: "Varies by card network and reason",
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <CostCalculator
            scenarios={[
              {
                name: "$1,000 MRR",
                usage: "100 customers × $10/month, US cards only",
                calculation: "$1,000 × 2.9% + (100 × $0.30) = $29 + $30 = $59",
                monthlyCost: "$59",
                notes: "~5.9% effective rate at low MRR",
              },
              {
                name: "$10,000 MRR",
                usage: "500 customers × $20/month, 80% US / 20% international",
                calculation: "$10K × 2.9% + (500 × $0.30) + ($2K × 1.5%) = $290 + $150 + $30 = $470",
                monthlyCost: "$470",
                notes: "~4.7% effective rate",
              },
              {
                name: "$100,000 MRR",
                usage: "2,000 customers × $50/month, global",
                calculation: "$100K × 2.9% + (2K × $0.30) + ($30K × 1.5%) = $2,900 + $600 + $450 = $3,950",
                monthlyCost: "$3,950",
                notes: "~3.95% effective rate. Consider negotiating custom pricing.",
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <IntegrationRequirements
            requirements={[
              {
                category: "Account Verification",
                items: [
                  "Create Stripe account at stripe.com",
                  "Complete KYC verification (business info, bank account)",
                  "Verify identity and tax info",
                  "Approval typically takes 1-2 business days",
                ],
              },
              {
                category: "Webhook Endpoint Setup",
                items: [
                  "Create /api/webhooks/stripe route in Next.js",
                  "Add endpoint URL in Stripe dashboard",
                  "Get webhook signing secret",
                  "Verify webhook signatures for security",
                ],
              },
              {
                category: "API Keys",
                items: [
                  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY for client",
                  "STRIPE_SECRET_KEY for server (never expose)",
                  "STRIPE_WEBHOOK_SECRET for webhook verification",
                  "Use test keys during development",
                ],
              },
              {
                category: "Product & Price Creation",
                items: [
                  "Create products in Stripe dashboard or via API",
                  "Set up pricing (one-time, recurring, usage-based)",
                  "Configure billing intervals (monthly, annual)",
                  "Test checkout flow with test cards",
                ],
              },
              {
                category: "Payment Flow",
                items: [
                  "Install @stripe/stripe-js and stripe packages",
                  "Implement Stripe Elements for card collection",
                  "Use Payment Intents API for SCA compliance",
                  "Handle success/failure states and webhooks",
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
