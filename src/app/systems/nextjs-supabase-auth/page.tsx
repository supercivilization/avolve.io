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
  title: "Next.js 16 + Supabase Auth Pattern | System Integration | Avolve.io",
  description:
    "Production-ready authentication pattern for Next.js 16 App Router with Supabase Auth. Complete guide with SSR, middleware, RLS, and common pitfalls.",
  keywords:
    "Next.js 16 auth, Supabase authentication, SSR auth, Next.js middleware, Row Level Security, PKCE flow, cookie management",
}

export default function NextJS15SupabaseAuthPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Systems", url: "/systems" },
          {
            name: "Next.js 16 + Supabase Auth",
            url: "/systems/nextjs-supabase-auth",
          },
        ]}
      />

      <div className="container mx-auto max-w-5xl px-4 py-12">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/systems" className="hover:underline">
              Systems
            </Link>
            <span>/</span>
            <span>Next.js 16 + Supabase Auth</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Next.js 16 + Supabase Auth
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400">
            Complete authentication system with SSR, middleware protection, social login, and Row Level Security for
            Next.js 16 App Router applications.
          </p>

          <LastVerified date="2025-01-15" />
        </div>

        {/* Pattern Identity */}
        <div className="mb-12">
          <PatternIdentity
            category="Authentication"
            abstractionLevel="medium"
            abstractionDescription="Managed auth service with good control over flows"
            alternatives={[
              {
                name: "Auth0",
                href: "/systems/nextjs-auth0",
                description: "Enterprise-grade identity platform with more features but higher cost",
              },
              {
                name: "Clerk",
                href: "/systems/nextjs-clerk",
                description: "Modern auth with pre-built UI components and excellent DX",
              },
              {
                name: "NextAuth.js",
                href: "/systems/nextauth-v5",
                description: "Self-hosted auth solution with more control but more setup",
              },
            ]}
            complements={[
              {
                name: "Row Level Security (RLS)",
                href: "/systems/postgres-rls",
                description: "Database-level access control that pairs perfectly with Supabase Auth",
              },
              {
                name: "API Route Protection",
                href: "/systems/nextjs-api-auth",
                description: "Middleware patterns for protecting API routes",
              },
            ]}
            tags={["Authentication", "SSR", "Social Login", "PostgreSQL", "Row Level Security"]}
          />
        </div>

        {/* Quick Decision */}
        <div className="mb-12">
          <QuickDecision
            useThisWhen={[
              { text: "Building on Next.js 16 App Router" },
              { text: "Need social login (Google, GitHub, etc.)" },
              { text: "Want integrated database with auth" },
              { text: "Budget-conscious (free tier is generous)" },
              { text: "Need Row Level Security for multi-tenant apps" },
            ]}
            useAlternativeWhen={[
              { text: "Need enterprise SSO (Auth0 is better)" },
              { text: "Want pre-built auth UI components (try Clerk)" },
              { text: "Building serverless-only (NextAuth might be simpler)" },
              { text: "Need advanced auth features (MFA, passkeys) immediately" },
            ]}
          />
        </div>

        {/* Pattern Structure */}
        <div className="mb-12">
          <PatternStructure
            patternName="Next.js 16 + Supabase Auth"
            description="How authentication flows through Next.js App Router with SSR and RLS"
            integrationPoints={[
              {
                id: "browser-request",
                name: "Browser Request",
                type: "input",
                description: "User navigates to protected route, browser sends request with auth cookies to Next.js server",
              },
              {
                id: "middleware",
                name: "Middleware (Edge Runtime)",
                type: "bidirectional",
                description: "Validate session, refresh if expired, set cookies on BOTH request AND response",
                href: "/support/pkce-flow-failed",
              },
              {
                id: "server-component",
                name: "Server Component",
                type: "bidirectional",
                description: "Create Supabase client with createServerClient and cookie handlers for SSR",
              },
              {
                id: "database-rls",
                name: "Database + RLS",
                type: "output",
                description: "PostgreSQL uses Row Level Security to filter data based on auth.uid()",
              },
            ]}
            notes={[
              "Cookies MUST be set on both request and response in middleware",
              "Use createServerClient for Server Components, createBrowserClient for Client Components",
              "RLS policies must use auth.uid() for security",
              "Always test with anon key, not service role key",
            ]}
          />
        </div>

        {/* Tradeoff Matrix */}
        <div className="mb-12">
          <TradeoffMatrix
            title="Authentication Provider Comparison"
            description="Compare different auth solutions for Next.js applications"
            criteria={[
              { key: "cost", label: "Monthly Cost", format: "text" },
              { key: "setup", label: "Setup Complexity", format: "rating" },
              { key: "features", label: "Features", format: "rating" },
              { key: "dx", label: "Developer Experience", format: "rating" },
              { key: "integration", label: "DB Integration", format: "text" },
            ]}
            patterns={[
              {
                name: "Supabase Auth",
                href: "/systems/nextjs-supabase-auth",
                ratings: {
                  cost: "Free (50K MAU)",
                  setup: 3,
                  features: 3,
                  dx: 4,
                  integration: "Built-in (PostgreSQL + RLS)",
                },
              },
              {
                name: "Auth0",
                href: "/systems/nextjs-auth0",
                ratings: {
                  cost: "$240+/mo",
                  setup: 4,
                  features: 5,
                  dx: 3,
                  integration: "Separate DB required",
                },
              },
              {
                name: "Clerk",
                href: "/systems/nextjs-clerk",
                ratings: {
                  cost: "$25+/mo",
                  setup: 2,
                  features: 4,
                  dx: 5,
                  integration: "Separate DB required",
                },
              },
            ]}
            notes="Supabase Auth is recommended for budget-conscious startups. Auth0 for enterprise. Clerk for teams prioritizing DX."
          />
        </div>

        {/* Integration Gotchas */}
        <div className="mb-12">
          <IntegrationGotchas
            gotchas={[
              {
                id: "cookie-timing-middleware",
                title: "Cookie Timing in Middleware",
                frequency: "common",
                description:
                  "Cookies must be set on BOTH request and response in Next.js 16 middleware, or PKCE flow fails silently. This is the #1 cause of auth issues.",
                symptoms: [
                  "PKCE flow failed error on auth callback",
                  "Users can't complete social login",
                  "Auth works locally but fails in production",
                  "Session not persisting after login",
                ],
                solution: "Use Supabase's createServerClient with proper cookie handlers. Set cookies on request.cookies AND response.cookies. Always return response from middleware. See detailed fix at /support/pkce-flow-failed.",
                supportLink: {
                  text: "PKCE Flow Failed Guide",
                  href: "/support/pkce-flow-failed",
                },
              },
              {
                id: "server-vs-client-init",
                title: "Server vs Client Initialization",
                frequency: "common",
                description:
                  "Using createClient in Server Components causes hydration errors. Must use createServerClient for SSR.",
                symptoms: [
                  "Hydration mismatch errors in console",
                  "Auth state differs between server and client",
                  "User appears logged out on refresh",
                  "React hydration warnings",
                ],
                solution: "Use createServerClient in Server Components and Server Actions. Use createBrowserClient in Client Components. Never import client methods in server code. Create separate utility files: lib/supabase/server.ts and lib/supabase/client.ts.",
              },
              {
                id: "rls-policy-gaps",
                title: "RLS Policy Gaps",
                frequency: "common",
                description:
                  "Forgetting RLS policies or testing with service role key bypasses security, creating data leaks in production.",
                symptoms: [
                  "Users can see other users' data",
                  "Data leaks in production",
                  "Queries return empty results unexpectedly",
                  "Auth works but data access fails",
                ],
                solution: "Enable RLS on ALL tables with user data. Test with anon key, not service role key. Use auth.uid() in policies, never trust client input. Add logging to detect policy violations. Create policies for SELECT, INSERT, UPDATE, and DELETE.",
              },
            ]}
          />
        </div>

        {/* Pattern Variations */}
        <div className="mb-12">
          <PatternVariations
            variations={[
              {
                id: "magic-links",
                name: "Magic Link Authentication",
                href: "/systems/supabase-magic-links",
                relationship: "alternative",
                description: "Passwordless authentication via email links - better UX for infrequent users",
                keyDifferences: [
                  "No password management required",
                  "Use signInWithOtp instead of signInWithPassword",
                  "More secure but requires email delivery",
                  "Slightly slower than password login",
                ],
                tags: ["Passwordless", "Magic Links", "Email"],
              },
              {
                id: "jwt-validation",
                name: "Manual JWT Validation",
                href: "/systems/supabase-jwt-validation",
                relationship: "extension",
                description: "Fine-grained control over token validation for API routes",
                keyDifferences: [
                  "Use jose library to verify Supabase JWT signatures",
                  "More control over token validation logic",
                  "More code to maintain, easier to get wrong",
                ],
                tags: ["JWT", "API Routes", "Security"],
              },
              {
                id: "multi-tenant-rls",
                name: "Multi-Tenant with RLS",
                href: "/systems/multi-tenant-rls",
                relationship: "extension",
                description: "SaaS apps with multiple teams/workspaces per user",
                keyDifferences: [
                  "Add organization_id to auth.jwt() claims",
                  "Filter in RLS policies based on organization",
                  "Powerful but complex, requires understanding JWT claims",
                ],
                tags: ["Multi-Tenant", "RLS", "Organizations"],
              },
              {
                id: "mfa-totp",
                name: "Two-Factor Authentication (TOTP)",
                href: "/systems/supabase-mfa",
                relationship: "complement",
                description: "Two-factor authentication with authenticator apps for high-security applications",
                keyDifferences: [
                  "Enable MFA in Supabase dashboard",
                  "Use enroll and challenge APIs",
                  "Better security but adds friction to login flow",
                ],
                tags: ["MFA", "2FA", "Security", "TOTP"],
              },
            ]}
          />
        </div>

        {/* Complete Implementation */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">Complete Implementation</h2>

          <div className="space-y-8">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">1. Install Dependencies</h3>
              <InteractiveCodeBlock
                code={`npm install @supabase/supabase-js @supabase/ssr`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">2. Environment Variables</h3>
              <InteractiveCodeBlock
                code={`# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                3. Middleware (Cookie Handling)
              </h3>
              <InteractiveCodeBlock
                code={`import { createServerClient } from '@supabase/ssr'
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

  const { data: { user } } = await supabase.auth.getUser()

  // Protect routes
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}`}
                language="typescript"
              />
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                4. Server Component Client
              </h3>
              <InteractiveCodeBlock
                code={`// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.delete(name)
        },
      },
    }
  )
}

// Usage in Server Component
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return <div>Welcome {user?.email}</div>
}`}
                language="typescript"
              />
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">5. Login Component</h3>
              <InteractiveCodeBlock
                code={`'use client'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) alert(error.message)
  }

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: \`\${window.location.origin}/auth/callback\`,
      },
    })
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Sign In</button>
      <button type="button" onClick={handleGoogleLogin}>
        Sign in with Google
      </button>
    </form>
  )
}`}
                language="typescript"
              />
            </div>
          </div>
        </section>

        {/* Testing Checklist */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">Testing Checklist</h2>

          <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Authentication Flows</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex gap-2">
                  <span className="text-gray-500">☐</span>
                  <span>Email/password signup creates user in auth.users</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500">☐</span>
                  <span>Social login (Google, GitHub) works end-to-end</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500">☐</span>
                  <span>Password reset email delivers and link works</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500">☐</span>
                  <span>Magic link login works without password</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Session Management</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex gap-2">
                  <span className="text-gray-500">☐</span>
                  <span>Session persists across page refreshes</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500">☐</span>
                  <span>Session expires after 1 hour and refreshes automatically</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500">☐</span>
                  <span>Logout clears session and redirects to login</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500">☐</span>
                  <span>Protected routes redirect unauthenticated users</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Row Level Security</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex gap-2">
                  <span className="text-gray-500">☐</span>
                  <span>Users can only see their own data (test with anon key)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500">☐</span>
                  <span>Insert/update/delete policies work correctly</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500">☐</span>
                  <span>Service role key bypasses RLS (admin functions only)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500">☐</span>
                  <span>Cross-user data access is blocked</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Related Links */}
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
                  <Link href="/support/pkce-flow-failed" className="text-blue-600 hover:underline">
                    PKCE Flow Failed
                  </Link>
                </li>
                <li>
                  <Link href="/support/dynamic-server-usage" className="text-blue-600 hover:underline">
                    Dynamic Server Usage Error
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
