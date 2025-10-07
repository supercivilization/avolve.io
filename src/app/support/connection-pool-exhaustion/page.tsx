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
  title: "Connection Pool Exhaustion | Support | Avolve.io",
  description:
    "Fix 'Connection pool exhausted' error in Supabase. Enable connection pooling for production scale.",
  keywords: "connection pool exhausted, too many connections, Supabase pooling, PgBouncer, database connections",
}

export default function ConnectionPoolExhaustionPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://avolve.io" },
          { name: "Support", item: "https://avolve.io/support" },
          { name: "Connection Pool Exhaustion", item: "https://avolve.io/support/connection-pool-exhaustion" },
        ]}
      />

      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
            <Link href="/support" className="hover:underline">
              Support
            </Link>
            <span>/</span>
            <span>Connection Pool Exhaustion</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-amber-900 dark:text-amber-100">
            Connection Pool Exhaustion
          </h1>

          <p className="text-xl text-amber-700 dark:text-amber-300">
            Database crashes under load with "too many connections" error. Application cannot establish new database connections.
          </p>

          <LastVerified date="2025-01-15" />
        </div>

        <div className="mb-12">
          <QuickFix
            title="Enable Supabase Connection Pooler"
            problem="Database hits connection limit (15 direct connections on Free tier), app crashes"
            solution="Enable PgBouncer pooling in Supabase dashboard and update connection string"
            steps={[
              "Go to Supabase Dashboard > Project Settings > Database",
              "Enable connection pooling (PgBouncer)",
              "Copy the pooler connection string",
              "Update DATABASE_URL in environment variables",
              "Use transaction mode for serverless functions",
            ]}
            estimatedTime="5 minutes"
          />
        </div>

        <div className="mb-12">
          <ErrorDetails
            errorName="Connection Pool Exhausted"
            errorMessage="Error: sorry, too many clients already / FATAL: remaining connection slots are reserved"
            frequency="common"
            timing="Month 2-3 after launch, or during traffic spikes"
            location="Database connection initialization, high concurrency scenarios"
            severity="critical"
            affects={["Supabase Free (15 connections)", "Supabase Pro (60 connections)", "PostgreSQL direct connections"]}
          />
        </div>

        <div className="mb-12">
          <RootCause
            title="Why Connection Pooling Matters"
            explanation="Each serverless function invocation creates a new database connection. Without pooling, you quickly exceed the connection limit (15 on Free tier). PgBouncer acts as a middleman, reusing connections and supporting thousands of concurrent users with just a few actual database connections."
            contributingFactors={[
              "Serverless functions create new connection per invocation",
              "No connection reuse between function calls",
              "Free tier limited to 15 direct connections",
              "High traffic or concurrent users",
              "Long-running queries hold connections",
              "Connection pooling not enabled",
            ]}
          />
        </div>

        <div className="mb-12">
          <StepByStepFix
            steps={[
              {
                step: 1,
                title: "Enable connection pooling in Supabase",
                description: "Turn on PgBouncer in project settings",
                code: `1. Go to Supabase Dashboard
2. Navigate to Project Settings > Database
3. Scroll to "Connection Pooling"
4. Enable PgBouncer
5. Choose pooling mode:
   - Transaction mode: For serverless (Next.js API routes)
   - Session mode: For persistent servers (Prisma, long connections)`,
                language: "text",
              },
              {
                step: 2,
                title: "Update connection string",
                description: "Use the pooler connection string instead of direct",
                code: `// Before (direct connection):
DATABASE_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres

// After (pooled connection):
DATABASE_URL=postgresql://postgres:[password]@db.[project].supabase.co:6543/postgres?pgbouncer=true

// Note the port change: 5432 → 6543`,
                language: "bash",
              },
              {
                step: 3,
                title: "Configure Prisma for pooling (if using Prisma)",
                description: "Use transaction pooler for Prisma with serverless",
                code: `// prisma/schema.prisma
datasource db {
  provider          = "postgresql"
  url               = env("DATABASE_URL")
  directUrl         = env("DIRECT_URL") // For migrations
}

// .env
DATABASE_URL="postgresql://postgres:[password]@db.[project].supabase.co:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres"`,
                language: "prisma",
                note: "Use DIRECT_URL for migrations, DATABASE_URL for queries",
              },
              {
                step: 4,
                title: "Test under load",
                description: "Verify connection pooling works with concurrent requests",
                command: "npm run dev && ab -n 100 -c 10 http://localhost:3000/api/test",
                note: "100 requests with 10 concurrent should succeed without connection errors",
              },
            ]}
            verification="Monitor active connections in Supabase dashboard. Should stay below limit even under high load."
          />
        </div>

        <div className="mb-12">
          <ProductionImpact
            severity="critical"
            estimatedFixTime="5-10 minutes"
            impactDescription="Application completely unusable under load. Users cannot access features requiring database. Site crashes repeatedly during high traffic."
            userImpact={[
              {
                aspect: "Availability",
                description: "App crashes when connection limit hit, requires manual restart",
              },
              {
                aspect: "Scalability",
                description: "Cannot handle more than ~15 concurrent users (Free) or ~60 (Pro)",
              },
              {
                aspect: "User Experience",
                description: "500 errors, timeouts, blank pages during peak usage",
              },
            ]}
            monitoring={[
              {
                metric: "Active Connections",
                recommendation: "Monitor in Supabase dashboard. Should stay well below limit with pooling.",
              },
              {
                metric: "Connection Errors",
                recommendation: "Track 'too many clients' errors. Should be zero with proper pooling.",
              },
              {
                metric: "Query Performance",
                recommendation: "Watch for connection wait times. Pooling should reduce latency.",
              },
            ]}
            rollback="If pooler causes issues, temporarily increase connection limit (upgrade tier) while debugging"
          />
        </div>

        <div className="mb-12">
          <RelatedErrors
            errors={[
              {
                id: "database-timeout",
                title: "Database Timeout Errors",
                href: "/support/database-timeout",
                description: "Queries timing out due to connection wait",
                relationship: "caused-by",
                frequency: "common",
              },
              {
                id: "slow-queries",
                title: "Slow Query Performance",
                href: "/support/slow-queries",
                description: "RLS policies or missing indexes causing delays",
                relationship: "occurs-with",
                frequency: "occasional",
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
                  <Link href="/services/supabase" className="text-blue-600 hover:underline">
                    Supabase Platform
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-medium text-amber-900 dark:text-amber-100">System Patterns</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/systems/nextjs-15-supabase-auth" className="text-blue-600 hover:underline">
                    Next.js 15 + Supabase Auth
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
