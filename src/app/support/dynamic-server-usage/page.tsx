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
  title: "Dynamic Server Usage Error | Support | Avolve.io",
  description:
    "Fix 'Dynamic server usage: cookies' error in Next.js 15. Async cookies require await and Suspense boundaries.",
  keywords: "dynamic server usage, Next.js 15 cookies, async cookies error, Suspense boundaries, middleware cookies",
}

export default function DynamicServerUsagePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Support", url: "/support" },
          { name: "Dynamic Server Usage", url: "/support/dynamic-server-usage" },
        ]}
      />

      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
            <Link href="/support" className="hover:underline">
              Support
            </Link>
            <span>/</span>
            <span>Dynamic Server Usage Error</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-amber-900 dark:text-amber-100">
            Error: Dynamic Server Usage - cookies
          </h1>

          <p className="text-xl text-amber-700 dark:text-amber-300">
            Next.js 15 made cookies() async. Components using cookies must be wrapped in Suspense boundaries and use await.
          </p>

          <LastVerified date="2025-01-15" />
        </div>

        <div className="mb-12">
          <QuickFix
            title="Add await to cookies()"
            problem="cookies() is now async in Next.js 15, causing 'Dynamic server usage' error"
            solution="Wrap component in Suspense and add await to all cookies() calls"
            oldCode={`// ❌ Before (causes error)
export default function Page() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  return <div>{token?.value}</div>
}`}
            newCode={`// ✅ After (works)
import { Suspense } from 'react'

export default async function Page() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')
  return <div>{token?.value}</div>
}

// Wrap in layout.tsx or parent:
<Suspense fallback={<Loading />}>
  <Page />
</Suspense>`}
            estimatedTime="2 minutes"
          />
        </div>

        <div className="mb-12">
          <ErrorDetails
            errorName="Dynamic Server Usage: cookies"
            errorMessage="Error: Route /your-page couldn't be rendered statically because it used cookies. Learn more: https://nextjs.org/docs/messages/dynamic-server-error"
            frequency="common"
            timing="Immediately after upgrading to Next.js 15"
            location="Any Server Component or Route Handler using cookies()"
            severity="critical"
            affects={["Next.js 15+", "Server Components", "Route Handlers"]}
          />
        </div>

        <div className="mb-12">
          <RootCause
            title="Why This Happens"
            explanation="Next.js 15 changed cookies() and headers() from synchronous to asynchronous functions to enable better streaming and static analysis. This breaking change requires updating all cookie access patterns."
            technicalDetails="The async change enables Next.js to detect dynamic data access earlier in the render tree and optimize static generation accordingly. Components using dynamic APIs must now be wrapped in Suspense to handle the async boundary properly."
            contributingFactors={[
              "cookies() changed from sync to async in Next.js 15",
              "Missing Suspense boundary around component",
              "Forgot to add await before cookies() call",
              "headers() and params() also changed to async",
            ]}
          />
        </div>

        <div className="mb-12">
          <StepByStepFix
            steps={[
              {
                step: 1,
                title: "Make the component async",
                description: "Add async keyword to the component function",
                code: `// Change this:
export default function Page() {

// To this:
export default async function Page() {`,
                language: "typescript",
              },
              {
                step: 2,
                title: "Add await to cookies() calls",
                description: "Await the cookies() function before accessing values",
                code: `// Change this:
const cookieStore = cookies()

// To this:
const cookieStore = await cookies()`,
                language: "typescript",
              },
              {
                step: 3,
                title: "Wrap in Suspense boundary",
                description: "Add Suspense wrapper in parent layout or page",
                code: `// In layout.tsx or parent component:
import { Suspense } from 'react'

export default function Layout({ children }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  )
}`,
                language: "typescript",
              },
              {
                step: 4,
                title: "Test all pages",
                description: "Check every page using cookies, headers, or params",
                command: "npm run dev",
                note: "Search codebase for cookies(), headers(), params() and update each",
              },
            ]}
            verification="Run your app and navigate to pages that use cookies. They should load without errors."
          />
        </div>

        <div className="mb-12">
          <ProductionImpact
            severity="critical"
            estimatedFixTime="5-10 minutes"
            impactDescription="Application crashes on pages using cookies. Users cannot access protected routes or see personalized content. Site appears broken."
            userImpact={[
              {
                aspect: "Accessibility",
                description: "Pages fail to load, showing error screen or white page",
              },
              {
                aspect: "Auth & Sessions",
                description: "Login, logout, and session management broken",
              },
              {
                aspect: "Personalization",
                description: "User preferences and settings inaccessible",
              },
            ]}
            monitoring={[
              {
                metric: "Error Rate",
                recommendation: "Monitor for 'Dynamic server usage' errors in logs. Should drop to zero after fix.",
              },
              {
                metric: "Page Load Success",
                recommendation: "Track successful renders of pages using cookies. Should return to 100%.",
              },
            ]}
            rollback="If immediate fix not possible, rollback to Next.js 14.x or create temporary static fallbacks"
          />
        </div>

        <div className="mb-12">
          <RelatedErrors
            errors={[
              {
                id: "pkce-flow-failed",
                title: "PKCE Flow Failed Error",
                href: "/support/pkce-flow-failed",
                description: "Cookie-related auth error in Next.js 15 middleware",
                relationship: "similar-to",
                frequency: "common",
              },
              {
                id: "hydration-mismatch",
                title: "Hydration Mismatch",
                href: "/support/hydration-mismatch",
                description: "Server/client HTML mismatch, often from async data",
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
              <h4 className="mb-2 font-medium text-amber-900 dark:text-amber-100">System Patterns</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/systems/nextjs-15-supabase-auth" className="text-blue-600 hover:underline">
                    Next.js 15 + Supabase Auth
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-medium text-amber-900 dark:text-amber-100">Software Documentation</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/software/nextjs" className="text-blue-600 hover:underline">
                    Next.js Framework
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
