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
            serviceName="Supabase"
            triggers={[
              {
                id: "active-users",
                title: "50K+ Active Users",
                currentTier: "Free (50K MAU)",
                upgradeTo: "Pro (100K MAU + overage)",
                scenario: "Your application is approaching or exceeding 50,000 monthly active users.",
                metrics: [
                  { name: "Monthly Active Users", threshold: ">50,000 MAU" },
                  { name: "Cost Impact", threshold: "$25/month + $0.00325/MAU overage" },
                ],
                costIncrease: "Free tier caps at 50K MAU",
                urgency: "high",
              },
              {
                id: "connection-pooling",
                title: "Connection Pool Exhaustion",
                currentTier: "Free (15 connections)",
                upgradeTo: "Pro (PgBouncer pooling)",
                scenario: "High concurrent users are exhausting the 15 direct database connections, causing app crashes.",
                metrics: [
                  { name: "Concurrent Users", threshold: "High traffic" },
                  { name: "Connection Limit", threshold: "15 direct connections" },
                ],
                costIncrease: "Pro tier enables PgBouncer pooling",
                urgency: "high",
              },
              {
                id: "database-size",
                title: "Database Size Growth",
                currentTier: "Free (500MB)",
                upgradeTo: "Pro (8GB + $0.125/GB overage)",
                scenario: "Database storage is approaching or exceeding the 500MB free tier limit.",
                metrics: [
                  { name: "Database Size", threshold: ">500MB" },
                  { name: "Cost Impact", threshold: "$25/month + $0.125/GB overage" },
                ],
                costIncrease: "Monitor disk usage in dashboard",
                urgency: "medium",
              },
              {
                id: "enterprise-sso",
                title: "Enterprise SSO Requirement",
                currentTier: "Free/Pro",
                upgradeTo: "Enterprise ($599+/month)",
                scenario: "Your organization requires SAML or OIDC single sign-on integration.",
                metrics: [
                  { name: "SSO Requirement", threshold: "SAML/OIDC needed" },
                  { name: "Cost Impact", threshold: "$599+/month minimum" },
                ],
                costIncrease: "Enterprise tier only",
                urgency: "low",
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <LimitsAndQuotas
            serviceName="Supabase"
            limits={[
              {
                id: "direct-connections",
                name: "Direct Database Connections",
                tier: "Free/Pro/Enterprise",
                value: "15 (Free) / 60 (Pro) / Custom (Enterprise)",
                type: "hard",
                blocksCapability: [
                  "High concurrent user applications on Free tier",
                  "Serverless function scaling",
                  "Multiple service connections",
                ],
                workarounds: [
                  "Upgrade to Pro tier for PgBouncer pooling",
                  "Use connection pooler in transaction mode",
                  "Implement connection pooling in application",
                ],
                critical: true,
              },
              {
                id: "connection-pooler",
                name: "Connection Pooler (PgBouncer)",
                tier: "Pro/Enterprise",
                value: "1,000+ (Session) / 10,000+ (Transaction)",
                type: "soft",
                blocksCapability: [
                  "Not available on Free tier",
                  "Production-scale applications without upgrade",
                ],
                workarounds: [
                  "Upgrade to Pro tier ($25/month)",
                  "Use transaction mode for serverless",
                  "Session mode for ORMs like Prisma",
                ],
                critical: true,
              },
              {
                id: "edge-function-timeout",
                name: "Edge Function Timeout",
                tier: "Free/Pro/Enterprise",
                value: "2s (Free) / 10s (Pro/Enterprise)",
                type: "hard",
                blocksCapability: [
                  "Long-running operations on Free tier",
                  "Complex API processing",
                  "External API calls with slow response",
                ],
                workarounds: [
                  "Upgrade to Pro tier for 10s timeout",
                  "Break operations into smaller chunks",
                  "Use database functions for heavy processing",
                ],
              },
              {
                id: "realtime-connections",
                name: "Realtime Connections",
                tier: "Free/Pro/Enterprise",
                value: "200 (Free) / 500 (Pro) / Custom (Enterprise)",
                type: "hard",
                blocksCapability: [
                  "Large-scale realtime applications on Free tier",
                  "Chat applications with many concurrent users",
                  "Live collaboration features",
                ],
                workarounds: [
                  "Upgrade to Pro tier for 500 concurrent",
                  "Implement connection pooling",
                  "Use presence channels strategically",
                ],
              },
              {
                id: "storage-file-size",
                name: "Storage File Size",
                tier: "All",
                value: "50MB per file",
                type: "hard",
                blocksCapability: [
                  "Large file uploads (videos, datasets)",
                  "High-resolution media storage",
                ],
                workarounds: [
                  "Use resumable uploads for large files",
                  "Compress files before upload",
                  "Use external storage for very large files",
                ],
              },
              {
                id: "api-rate-limit",
                name: "API Rate Limit",
                tier: "Free/Pro/Enterprise",
                value: "Moderate (Free) / Higher (Pro) / Custom (Enterprise)",
                type: "rate",
                blocksCapability: [
                  "High-traffic APIs on Free tier",
                  "Bulk operations",
                ],
                workarounds: [
                  "Upgrade to Pro tier for higher limits",
                  "Implement caching",
                  "Contact support for custom limits",
                ],
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <CostCalculator
            serviceName="Supabase"
            scenarios={[
              {
                id: "startup",
                name: "MVP / Side Project",
                description: "Small application with basic auth and moderate database usage",
                usage: [
                  { metric: "Monthly Active Users", value: "<50K" },
                  { metric: "Database Size", value: "<500MB" },
                  { metric: "File Storage", value: "<1GB" },
                  { metric: "Edge Functions", value: "<500K invocations" },
                ],
                breakdown: [
                  {
                    component: "Free Tier Base",
                    cost: "$0/month",
                    notes: "500MB DB, 50K MAU, 1GB storage, 500K edge functions",
                  },
                ],
                totalCost: "$0/month",
                type: "startup",
              },
              {
                id: "growth",
                name: "Growing SaaS",
                description: "Production application requiring connection pooling and increased limits",
                usage: [
                  { metric: "Monthly Active Users", value: "75K" },
                  { metric: "Database Size", value: "2GB" },
                  { metric: "File Storage", value: "10GB" },
                  { metric: "Connection Pooling", value: "Required" },
                ],
                breakdown: [
                  {
                    component: "Pro Tier Base",
                    cost: "$25/month",
                    notes: "8GB DB, 100K MAU, 100GB storage, PgBouncer",
                  },
                  {
                    component: "Database Overage",
                    cost: "$0/month",
                    notes: "2GB within 8GB included",
                  },
                ],
                totalCost: "$25-50/month",
                type: "growth",
              },
              {
                id: "enterprise",
                name: "Enterprise Application",
                description: "Large-scale application with SSO, compliance, and SLA requirements",
                usage: [
                  { metric: "Monthly Active Users", value: "500K" },
                  { metric: "Database Size", value: "50GB" },
                  { metric: "SSO", value: "SAML/OIDC required" },
                  { metric: "SLA", value: "99.9% uptime guarantee" },
                ],
                breakdown: [
                  {
                    component: "Enterprise Base",
                    cost: "$599/month",
                    notes: "Custom limits, SSO, priority support",
                  },
                  {
                    component: "Overages",
                    cost: "Custom pricing",
                    notes: "Based on usage and requirements",
                  },
                ],
                totalCost: "$599+/month",
                type: "enterprise",
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <IntegrationRequirements
            serviceName="Supabase"
            steps={[
              {
                id: "project-creation",
                title: "Project Creation",
                description: "Create new Supabase project and configure settings",
                required: true,
                estimatedTime: "5 min",
                configExample: `// Sign up at supabase.com
// 1. Create new project
// 2. Select region (choose closest to users)
// 3. Save project URL and anon key
// 4. IMPORTANT: Database password shown only once`,
                docs: [
                  { text: "Project Setup", href: "https://supabase.com/docs/guides/getting-started" },
                ],
              },
              {
                id: "api-keys",
                title: "API Keys Setup",
                description: "Configure environment variables for Supabase access",
                required: true,
                estimatedTime: "5 min",
                configExample: `// .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG... // Server-side only!

// Never expose service role key client-side
// Anon key is safe for client use (RLS enforced)`,
                docs: [
                  { text: "API Keys", href: "https://supabase.com/docs/guides/api#api-url-and-keys" },
                ],
              },
              {
                id: "rls-setup",
                title: "Row Level Security (RLS)",
                description: "Enable and configure RLS policies for data security",
                required: true,
                estimatedTime: "20 min",
                configExample: `-- Enable RLS on all tables
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own posts
CREATE POLICY "Users can read own posts"
ON public.posts
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Users can insert their own posts
CREATE POLICY "Users can insert own posts"
ON public.posts
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Test policies with different user roles`,
                docs: [
                  { text: "Row Level Security", href: "https://supabase.com/docs/guides/auth/row-level-security" },
                ],
              },
              {
                id: "migrations",
                title: "Database Migrations",
                description: "Version control and manage schema changes",
                required: false,
                estimatedTime: "30 min",
                configExample: `# Install Supabase CLI
npm install -g supabase

# Initialize local development
supabase init

# Create migration
supabase migration new create_posts_table

# Apply migrations
supabase db push

# Enable point-in-time recovery (Pro tier)
# Settings → Database → Point-in-time Recovery`,
                docs: [
                  { text: "Database Migrations", href: "https://supabase.com/docs/guides/cli/local-development" },
                ],
              },
              {
                id: "connection-pooling",
                title: "Connection Pooling (Pro Tier)",
                description: "Enable PgBouncer for production-scale connection management",
                required: false,
                estimatedTime: "10 min",
                configExample: `// Pro tier only
// Enable in: Settings → Database → Connection Pooling

// Use pooler connection string for high concurrency:
// Session mode (for Prisma/ORMs):
DATABASE_URL=postgres://postgres.xxxxx:6543/postgres

// Transaction mode (for serverless):
DATABASE_URL=postgres://postgres.xxxxx:6543/postgres?pgbouncer=true

// Direct connection (low concurrency):
DATABASE_URL=postgres://postgres.xxxxx:5432/postgres`,
                docs: [
                  { text: "Connection Pooling", href: "https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler" },
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
