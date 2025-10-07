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
  title: "PKCE Flow Failed Error | Support | Avolve.io",
  description:
    "Fix Supabase PKCE flow failed error in Next.js 15. Cookie timing issue in middleware causes silent auth failures.",
  keywords: "PKCE flow failed, Supabase auth error, Next.js 15 cookies, middleware auth, social login error",
}

export default function PKCEFlowFailedPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Support", url: "/support" },
          { name: "PKCE Flow Failed", url: "/support/pkce-flow-failed" },
        ]}
      />

      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
            <Link href="/support" className="hover:underline">
              Support
            </Link>
            <span>/</span>
            <span>PKCE Flow Failed</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-amber-900 dark:text-amber-100">
            Error: PKCE Flow Failed
          </h1>

          <p className="text-xl text-amber-700 dark:text-amber-300">
            Supabase authentication fails silently after social login redirect. Cookies not set properly in Next.js 15
            middleware.
          </p>

          <LastVerified date="2025-01-15" />
        </div>

        <div className="mb-12">
          <QuickFix
            title="Fix Cookie Timing in Middleware"
            problem="PKCE flow fails silently after social login redirect because cookies aren't set on both request and response objects"
            solution="Set cookies on BOTH request.cookies AND response.cookies in middleware, then return the response object"
            newCode={`import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value
        },
        set(name, value, options) {
          // CRITICAL: Set on BOTH request and response
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request })
          response.cookies.set({ name, value, ...options })
        },
        remove(name, options) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  await supabase.auth.getUser()
  return response
}`}
            estimatedTime="5 minutes"
          />
        </div>

        <div className="mb-12">
          <ErrorDetails
            errorMessage="PKCE flow failed. Invalid code verifier or code challenge."
            frequency="common"
            timing="First auth attempt after social login"
            affectedVersions={["Next.js 15+", "Supabase SSR latest"]}
            symptoms={[
              "Social login redirect returns to app but user not logged in",
              "No error shown to user, just silently fails",
              "Works in development but fails in production",
              "Email/password login works, but OAuth fails",
            ]}
          />
        </div>

        <div className="mb-12">
          <RootCause
            title="Cookie Timing Issue in Next.js 15"
            description="Next.js 15 middleware requires cookies to be set on both the request AND response objects. Supabase's PKCE flow exchanges a code for a session and stores it in cookies. If cookies aren't set on both objects, the session is lost."
            technicalDetails={[
              "PKCE (Proof Key for Code Exchange) is OAuth 2.0 security extension",
              "Code verifier stored in cookie before redirect to OAuth provider",
              "After redirect back, code verifier needed to exchange code for session",
              "If cookie not set on response, verifier is lost and exchange fails",
            ]}
          />
        </div>

        <div className="mb-12">
          <StepByStepFix
            steps={[
              {
                title: "Update middleware.ts",
                description: "Replace your middleware with the correct cookie handling pattern",
                code: `// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          // CRITICAL: Set on BOTH request and response
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}`,
              },
              {
                title: "Create OAuth callback route",
                description: "Handle the redirect from OAuth provider",
                code: `// app/auth/callback/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(\`\${origin}\${next}\`)
    }
  }

  return NextResponse.redirect(\`\${origin}/auth/error\`)
}`,
              },
              {
                title: "Test social login flow",
                description: "Verify the fix works end-to-end",
                code: `// Test checklist:
// 1. Click "Sign in with Google/GitHub"
// 2. Complete OAuth flow
// 3. Redirected back to app
// 4. User should be logged in (check auth state)
// 5. Session should persist across page refreshes`,
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <ProductionImpact
            severity="high"
            userExperience="Users click login, complete OAuth flow, but remain logged out. Very confusing."
            businessImpact="Blocks user signups and revenue. High support burden."
            monitoringQuery={`// Check auth error rates
SELECT
  DATE_TRUNC('hour', created_at) as hour,
  COUNT(*) as failed_attempts
FROM auth.audit_log_entries
WHERE event_type = 'auth_error'
  AND payload->>'error' LIKE '%PKCE%'
GROUP BY hour
ORDER BY hour DESC;`}
            estimatedFixTime="5-10 minutes"
          />
        </div>

        <div className="mb-12">
          <RelatedErrors
            errors={[
              {
                name: "Dynamic Server Usage Error",
                href: "/support/dynamic-server-usage",
                description: "Another Next.js 15 cookie-related error",
                relationship: "Similar root cause with async cookies",
              },
              {
                name: "Session Expired",
                href: "/support/session-expired",
                description: "Session not persisting across requests",
                relationship: "May be caused by same cookie timing issue",
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
              <h4 className="mb-2 font-medium text-amber-900 dark:text-amber-100">Solutions Using This</h4>
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
