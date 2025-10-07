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
  title: "Supabase Platform Service | Pricing & Integration | Avolve.io",
  description:
    "Complete guide to Supabase pricing, database limits, and Next.js integration. Auth, database, and storage for production applications.",
  keywords: "Supabase pricing, PostgreSQL database, Supabase auth, realtime database, Supabase integration",
}

export default function SupabaseServicePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Supabase", url: "/services/supabase" },
        ]}
      />

      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <Link href="/services" className="hover:underline">
              Services
            </Link>
            <span>/</span>
            <span>Supabase</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Supabase Platform
          </h1>

          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Open source Firebase alternative with PostgreSQL database, authentication, storage, and realtime subscriptions. Built for developers who need full SQL power.
          </p>

          <LastVerified date="2025-01-15" />
        </div>

        <div className="mb-12">
          <PricingOverview
            serviceName="Supabase"
            description="Three tiers with generous free tier. Pro tier unlocks production features like connection pooling and point-in-time recovery."
            tiers={[
              {
                name: "Free",
                price: "$0/mo",
                billingNote: "forever",
                highlights: [
                  "500MB database storage",
                  "50,000 monthly active users",
                  "1GB file storage",
                  "500K Edge Function invocations",
                ],
                recommended: false,
              },
              {
                name: "Pro",
                price: "$25/mo",
                billingNote: "per project",
                highlights: [
                  "8GB database storage",
                  "100,000 monthly active users",
                  "100GB file storage",
                  "2M Edge Function invocations",
                ],
                recommended: true,
              },
              {
                name: "Enterprise",
                price: "$599+/mo",
                billingNote: "custom pricing",
                highlights: [
                  "Custom database size",
                  "Unlimited MAU",
                  "Custom storage",
                  "SLA + Priority support",
                ],
              },
            ]}
            features={[
              {
                name: "Database Storage",
                description: "PostgreSQL database size",
                tiers: {
                  "Free": "500MB",
                  "Pro": "8GB (then $0.125/GB)",
                  "Enterprise": "Custom",
                },
              },
              {
                name: "Monthly Active Users",
                description: "Auth users per month",
                tiers: {
                  "Free": "50,000",
                  "Pro": "100,000 (then $0.00325/MAU)",
                  "Enterprise": "Unlimited",
                },
              },
              {
                name: "File Storage",
                description: "Object storage size",
                tiers: {
                  "Free": "1GB",
                  "Pro": "100GB (then $0.021/GB)",
                  "Enterprise": "Custom",
                },
              },
              {
                name: "Edge Functions",
                description: "Serverless function invocations",
                tiers: {
                  "Free": "500K/month",
                  "Pro": "2M/month (then $2/1M)",
                  "Enterprise": "Custom",
                },
              },
              {
                name: "Connection Pooling",
                description: "PgBouncer for scale",
                tiers: {
                  "Free": false,
                  "Pro": true,
                  "Enterprise": true,
                },
              },
              {
                name: "Point-in-Time Recovery",
                description: "Database backup recovery",
                tiers: {
                  "Free": false,
                  "Pro": "7 days",
                  "Enterprise": "Custom",
                },
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <CostTriggers
            triggers={[
              {
                trigger: "50K+ Active Users",
                threshold: ">50,000 MAU",
                impact: "$25/month + overage",
                mitigation:
                  "Free tier caps at 50K MAU. Pro tier needed immediately. Monitor auth.users table.",
              },
              {
                trigger: "Connection Pool Exhaustion",
                threshold: "High concurrent users",
                impact: "App crashes without pooling",
                mitigation: "Pro tier enables PgBouncer pooling. Critical for production scale.",
              },
              {
                trigger: "Database Size Growth",
                threshold: ">500MB database",
                impact: "$25/month + $0.125/GB overage",
                mitigation:
                  "Monitor disk usage in dashboard. Archive old data or upgrade to Pro.",
              },
              {
                trigger: "Enterprise SSO Requirement",
                threshold: "SAML/OIDC needed",
                impact: "$599+/month minimum",
                mitigation:
                  "Enterprise tier only. Social OAuth (Google/GitHub) available on all tiers.",
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <LimitsAndQuotas
            limits={[
              {
                name: "Direct Database Connections",
                free: "15 connections",
                paid: "15 (Free), 60 (Pro), Custom (Enterprise)",
                notes: "Use connection pooling to scale beyond this",
              },
              {
                name: "Connection Pooler",
                free: "Not available",
                paid: "PgBouncer on Pro/Enterprise only",
                notes: "Session mode: 1,000+ connections, Transaction mode: 10,000+",
              },
              {
                name: "Edge Function Timeout",
                free: "2 seconds",
                paid: "10 seconds (Pro/Enterprise)",
                notes: "Hard timeout enforced",
              },
              {
                name: "Realtime Connections",
                free: "200 concurrent",
                paid: "500 concurrent (Pro), Custom (Enterprise)",
                notes: "WebSocket connections for live updates",
              },
              {
                name: "Storage File Size",
                free: "50MB per file",
                paid: "50MB (all tiers)",
                notes: "Resumable uploads for large files",
              },
              {
                name: "API Rate Limit",
                free: "Moderate",
                paid: "Higher on Pro, Custom on Enterprise",
                notes: "Contact support if hitting limits",
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <CostCalculator
            scenarios={[
              {
                name: "MVP / Side Project",
                usage: "<50K users, <500MB DB, basic auth",
                calculation: "$0 (Free tier)",
                monthlyCost: "$0",
                notes: "Free tier perfect for MVPs and hobby projects",
              },
              {
                name: "Growing SaaS",
                usage: "75K users, 2GB DB, connection pooling needed",
                calculation: "$25 (Pro base) + $0.125×2GB overage = $25.25",
                monthlyCost: "$25-50",
                notes: "Pro tier recommended once you need connection pooling",
              },
              {
                name: "Enterprise Application",
                usage: "500K users, 50GB DB, SSO required",
                calculation: "$599 base + custom pricing",
                monthlyCost: "$599+",
                notes: "Enterprise tier for SSO, compliance, SLA requirements",
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <IntegrationRequirements
            requirements={[
              {
                category: "Project Creation",
                items: [
                  "Sign up at supabase.com",
                  "Create new project (select region)",
                  "Save project URL and anon key",
                  "Note: Database password shown once",
                ],
              },
              {
                category: "API Keys Setup",
                items: [
                  "NEXT_PUBLIC_SUPABASE_URL from project settings",
                  "NEXT_PUBLIC_SUPABASE_ANON_KEY for client access",
                  "SUPABASE_SERVICE_ROLE_KEY for admin operations (server only)",
                  "Never expose service role key client-side",
                ],
              },
              {
                category: "Row Level Security (RLS)",
                items: [
                  "Enable RLS on all tables in Table Editor",
                  "Create policies for SELECT, INSERT, UPDATE, DELETE",
                  "Use auth.uid() to restrict access to user's own data",
                  "Test policies with different user roles",
                ],
              },
              {
                category: "Database Migrations",
                items: [
                  "Use Supabase CLI or dashboard SQL editor",
                  "Version control schema changes",
                  "Test migrations on staging first",
                  "Enable point-in-time recovery on Pro tier",
                ],
              },
              {
                category: "Connection Pooling (Pro)",
                items: [
                  "Enable PgBouncer in project settings",
                  "Use pooler connection string for high concurrency",
                  "Session mode for Prisma/ORMs",
                  "Transaction mode for serverless functions",
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
                  <Link href="/systems/nextjs-15-supabase-auth" className="text-blue-600 hover:underline">
                    Next.js 15 + Supabase Auth
                  </Link>
                </li>
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
