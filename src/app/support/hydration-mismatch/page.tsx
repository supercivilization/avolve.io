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
  title: "Hydration Mismatch Error | Support | Avolve.io",
  description:
    "Fix 'Hydration failed because the server rendered HTML didn't match the client' error in React. Server/client rendering differences.",
  keywords: "hydration mismatch, React hydration error, server client mismatch, Next.js hydration, SSR error",
}

export default function HydrationMismatchPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Support", url: "/support" },
          { name: "Hydration Mismatch", url: "/support/hydration-mismatch" },
        ]}
      />

      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
            <Link href="/support" className="hover:underline">
              Support
            </Link>
            <span>/</span>
            <span>Hydration Mismatch</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-amber-900 dark:text-amber-100">
            Hydration Mismatch Error
          </h1>

          <p className="text-xl text-amber-700 dark:text-amber-300">
            Server-rendered HTML doesn't match client-rendered HTML. Visual glitches, console errors, and broken interactivity.
          </p>

          <LastVerified date="2025-01-15" />
        </div>

        <div className="mb-12">
          <QuickFix
            title="Move browser-only code to useEffect"
            problem="Server renders different HTML than client (Date.now(), localStorage, window, etc.)"
            solution="Move browser-specific code to useEffect or use suppressHydrationWarning for unavoidable mismatches"
            oldCode={`// ❌ Causes hydration mismatch
export default function Component() {
  const timestamp = Date.now()
  const theme = localStorage.getItem('theme')

  return <div>Generated at: {timestamp}</div>
}`}
            newCode={`// ✅ Fixed with useEffect
'use client'
import { useEffect, useState } from 'react'

export default function Component() {
  const [timestamp, setTimestamp] = useState<number | null>(null)

  useEffect(() => {
    setTimestamp(Date.now())
  }, [])

  if (!timestamp) return <div>Loading...</div>

  return <div>Generated at: {timestamp}</div>
}`}
            estimatedTime="5 minutes"
          />
        </div>

        <div className="mb-12">
          <ErrorDetails
            errorName="Hydration Failed"
            errorMessage="Error: Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client."
            frequency="occasional"
            timing="Component first render, especially with dynamic data"
            location="Components using Date, localStorage, window, or random values"
            severity="medium"
            affects={["Server Components with dynamic data", "Client Components with browser APIs", "Components using Date or Math.random()"]}
          />
        </div>

        <div className="mb-12">
          <RootCause
            title="Server vs Client Rendering Mismatch"
            explanation="React expects the HTML generated on the server to exactly match what the client renders. When using browser-only APIs (window, localStorage) or time-dependent values (Date.now(), Math.random()), the server and client produce different HTML, causing React to throw a hydration error and re-render the entire component tree."
            contributingFactors={[
              "Using Date.now(), new Date(), or timestamps in render",
              "Accessing localStorage, sessionStorage, or cookies in render",
              "Using window, document, or other browser-only globals",
              "Math.random() or other non-deterministic functions",
              "Conditional rendering based on user agent or screen size",
              "Third-party scripts modifying DOM before hydration",
            ]}
          />
        </div>

        <div className="mb-12">
          <StepByStepFix
            steps={[
              {
                step: 1,
                title: "Identify the mismatch source",
                description: "React logs show which element caused the mismatch",
                code: `// Look for this in console:
Warning: Text content did not match. Server: "..." Client: "..."

// Or:
Warning: Prop \`className\` did not match. Server: "..." Client: "..."

// Common culprits:
- Date/time values
- localStorage/sessionStorage
- window.location
- Math.random()`,
                language: "text",
              },
              {
                step: 2,
                title: "Move browser-only code to useEffect",
                description: "Delay browser API access until client-side hydration completes",
                code: `'use client'
import { useEffect, useState } from 'react'

export default function ThemeComponent() {
  const [theme, setTheme] = useState<string>('light') // SSR default

  useEffect(() => {
    // Only runs on client after hydration
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
  }, [])

  return <div className={theme}>Content</div>
}`,
                language: "typescript",
              },
              {
                step: 3,
                title: "Use suppressHydrationWarning for unavoidable cases",
                description: "Tell React to ignore specific hydration mismatches",
                code: `// For timestamps or values that MUST differ:
export default function Footer() {
  return (
    <footer>
      <time suppressHydrationWarning>
        {new Date().toLocaleDateString()}
      </time>
    </footer>
  )
}

// Only use when mismatch is intentional and harmless`,
                language: "typescript",
                note: "Use sparingly - only when mismatch is unavoidable and doesn't affect UX",
              },
              {
                step: 4,
                title: "Verify no console errors",
                description: "Check browser console after fix",
                code: `1. Clear browser console
2. Reload page (hard refresh: Cmd+Shift+R or Ctrl+Shift+R)
3. Verify no hydration warnings
4. Test in production build: npm run build && npm start`,
                language: "text",
              },
            ]}
            verification="No hydration warnings in console. Components render correctly without flickering or content changes."
          />
        </div>

        <div className="mb-12">
          <ProductionImpact
            severity="medium"
            estimatedFixTime="5-15 minutes per component"
            impactDescription="Visual glitches during page load. Components flicker or content changes after hydration. Console filled with React errors. Poor user experience and potential SEO impact."
            userImpact={[
              {
                aspect: "Visual Quality",
                description: "Content flashes, styles change, layout shifts during page load",
              },
              {
                aspect: "Performance",
                description: "React re-renders entire component tree, wasting resources",
              },
              {
                aspect: "Developer Experience",
                description: "Console flooded with warnings, hard to debug real issues",
              },
            ]}
            monitoring={[
              {
                metric: "Console Errors",
                recommendation: "Monitor production console for hydration warnings. Should be zero.",
              },
              {
                metric: "Cumulative Layout Shift (CLS)",
                recommendation: "Track CLS in Core Web Vitals. Hydration mismatches increase CLS.",
              },
              {
                metric: "User Reports",
                recommendation: "Watch for 'content changes after load' or 'flickering' reports.",
              },
            ]}
            rollback="If fix causes issues, temporarily revert to client-side only rendering for affected components"
          />
        </div>

        <div className="mb-12">
          <RelatedErrors
            errors={[
              {
                id: "dynamic-server-usage",
                title: "Dynamic Server Usage Error",
                href: "/support/dynamic-server-usage",
                description: "Similar root cause with async cookies in Next.js 16",
                relationship: "similar-to",
                frequency: "common",
              },
              {
                id: "window-undefined",
                title: "Window is Not Defined",
                href: "/support/window-undefined",
                description: "Server-side code trying to access browser APIs",
                relationship: "occurs-with",
                frequency: "common",
              },
            ]}
          />
        </div>

        <section className="rounded-lg border border-amber-200 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-900/20">
          <h3 className="mb-4 text-lg font-semibold text-amber-900 dark:text-amber-100">Related Resources</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-medium text-amber-900 dark:text-amber-100">Software Documentation</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/software/nextjs" className="text-blue-600 hover:underline">
                    Next.js Framework
                  </Link>
                </li>
                <li>
                  <Link href="/software/react" className="text-blue-600 hover:underline">
                    React Library
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-medium text-amber-900 dark:text-amber-100">Solutions</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/solutions/ai-chat-saas" className="text-blue-600 hover:underline">
                    AI Chat SaaS Application
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
