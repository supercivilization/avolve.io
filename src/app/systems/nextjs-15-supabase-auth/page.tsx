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
  title: "Next.js 15 + Supabase Auth Pattern | System Integration | Avolve.io",
  description:
    "Production-ready authentication pattern for Next.js 15 App Router with Supabase Auth. Complete guide with SSR, middleware, RLS, and common pitfalls.",
  keywords:
    "Next.js 15 auth, Supabase authentication, SSR auth, Next.js middleware, Row Level Security, PKCE flow, cookie management",
}

export default function NextJS15SupabaseAuthPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Systems", url: "/systems" },
          {
            name: "Next.js 15 + Supabase Auth",
            url: "/systems/nextjs-15-supabase-auth",
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
            <span>Next.js 15 + Supabase Auth</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Next.js 15 + Supabase Auth
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400">
            Complete authentication system with SSR, middleware protection, social login, and Row Level Security for
            Next.js 15 App Router applications.
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
            chooseThisIf={[
              "Building on Next.js 15 App Router",
              "Need social login (Google, GitHub, etc.)",
              "Want integrated database with auth",
              "Budget-conscious (free tier is generous)",
              "Need Row Level Security for multi-tenant apps",
            ]}
            chooseAlternativeIf={[
              "Need enterprise SSO (Auth0 is better)",
              "Want pre-built auth UI components (try Clerk)",
              "Building serverless-only (NextAuth might be simpler)",
              "Need advanced auth features (MFA, passkeys) immediately",
            ]}
          />
        </div>

        {/* Pattern Structure */}
        <div className="mb-12">
          <PatternStructure
            steps={[
              {
                number: 1,
                title: "Request",
                description: "User navigates to protected route",
                details: "Browser sends request with cookies to Next.js server",
              },
              {
                number: 2,
                title: "Middleware",
                description: "Validate session and refresh if needed",
                details: "Check Supabase auth token, refresh if expired, set cookies on request AND response",
              },
              {
                number: 3,
                title: "Server Component",
                description: "Create Supabase client for SSR",
                details: "Use createServerClient with cookie handlers for server-side rendering",
              },
              {
                number: 4,
                title: "Database Query",
                description: "Fetch user-specific data",
                details: "PostgreSQL uses Row Level Security to filter data based on auth.uid()",
              },
            ]}
            components={[
              {
                name: "Middleware",
                role: "Session validation and refresh",
                technology: "Next.js Edge Runtime",
              },
              {
                name: "Server Client",
                role: "SSR authentication",
                technology: "@supabase/ssr",
              },
              {
                name: "Browser Client",
                role: "Client-side auth actions",
                technology: "@supabase/supabase-js",
              },
              {
                name: "RLS Policies",
                role: "Database access control",
                technology: "PostgreSQL Row Level Security",
              },
            ]}
          />
        </div>

        {/* Tradeoff Matrix */}
        <div className="mb-12">
          <TradeoffMatrix
            approaches={[
              {
                name: "Supabase Auth",
                advantages: [
                  "Integrated with PostgreSQL and RLS",
                  "Generous free tier (50K MAU)",
                  "Social login providers included",
                  "Good TypeScript support",
                  "Built-in email templates",
                ],
                disadvantages: [
                  "Cookie timing can be tricky in Next.js",
                  "Limited MFA options (only TOTP)",
                  "Less mature than Auth0",
                  "Fewer enterprise features",
                  "Must understand RLS for security",
                ],
                recommendation: "Budget-conscious startups needing social login and database integration",
              },
              {
                name: "Auth0",
                advantages: [
                  "Enterprise-grade features",
                  "Advanced MFA (SMS, WebAuthn)",
                  "Extensive integrations",
                  "Better compliance tools",
                  "Mature and battle-tested",
                ],
                disadvantages: [
                  "Expensive ($240+/mo for production)",
                  "More complex setup",
                  "Requires separate database",
                  "Overkill for simple apps",
                  "Learning curve is steeper",
                ],
                recommendation: "Enterprise apps with complex auth requirements and compliance needs",
              },
              {
                name: "Clerk",
                advantages: [
                  "Pre-built UI components",
                  "Excellent developer experience",
                  "Modern design patterns",
                  "Great documentation",
                  "Easy Next.js integration",
                ],
                disadvantages: [
                  "Expensive ($25/mo minimum, scales quickly)",
                  "Less control over UI",
                  "Requires separate database",
                  "Younger ecosystem",
                  "Vendor lock-in concerns",
                ],
                recommendation: "Fast-moving teams who value DX and don't want to build auth UI",
              },
            ]}
          />
        </div>

        {/* Integration Gotchas */}
        <div className="mb-12">
          <IntegrationGotchas
            gotchas={[
              {
                issue: "Cookie Timing in Middleware",
                severity: "high",
                frequency: "common",
                description:
                  "Cookies must be set on BOTH request and response in Next.js 15 middleware, or PKCE flow fails silently. This is the #1 cause of auth issues.",
                solution: "Use Supabase's createServerClient with proper cookie handlers. Set cookies on request.cookies AND response.cookies. Always return response from middleware. See /support/pkce-flow-failed for detailed fix.",
                codeExample: `import { createServerClient } from '@supabase/ssr'
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
}`,
              },
              {
                issue: "Server vs Client Initialization",
                severity: "medium",
                frequency: "common",
                description:
                  "Using createClient in Server Components causes hydration errors. Must use createServerClient for SSR.",
                solution: "Use createServerClient in Server Components and Server Actions. Use createBrowserClient in Client Components. Never import client methods in server code. Create separate utility files for server/client.",
                codeExample: `// lib/supabase/server.ts (Server Components)
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = () => {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) { return cookieStore.get(name)?.value },
        set(name, value, options) { cookieStore.set({ name, value, ...options }) },
        remove(name, options) { cookieStore.delete(name) },
      },
    }
  )
}

// lib/supabase/client.ts (Client Components)
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )`,
              },
              {
                issue: "RLS Policy Gaps",
                severity: "high",
                frequency: "common",
                description:
                  "Forgetting RLS policies or testing with service role key bypasses security, creating data leaks in production.",
                solution: "Enable RLS on ALL tables with user data. Test with anon key, not service role key. Use auth.uid() in policies, never trust client input. Add logging to detect policy violations.",
                codeExample: `-- Enable RLS on table
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own messages
CREATE POLICY "Users can view own messages"
  ON messages
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own messages
CREATE POLICY "Users can insert own messages"
  ON messages
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own messages
CREATE POLICY "Users can update own messages"
  ON messages
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);`,
              },
            ]}
          />
        </div>

        {/* Pattern Variations */}
        <div className="mb-12">
          <PatternVariations
            variations={[
              {
                name: "With Magic Links",
                scenario: "Better UX for infrequent users, no password management",
                description: "Passwordless authentication via email",
                implementation: "Use signInWithOtp instead of signInWithPassword",
                tradeoffs: "More secure but requires email delivery, slower than password login",
              },
              {
                name: "With JWT Validation",
                scenario: "Fine-grained control over token validation",
                description: "Manually validate JWTs for API routes",
                implementation: "Use jose library to verify Supabase JWT signatures",
                tradeoffs: "More control but more code, easy to get wrong",
              },
              {
                name: "Multi-Tenant with RLS",
                scenario: "SaaS apps with multiple teams per user",
                description: "Workspace/organization isolation via RLS",
                implementation: "Add organization_id to auth.jwt() claims and filter in RLS policies",
                tradeoffs: "Powerful but complex, requires understanding JWT claims",
              },
              {
                name: "With MFA (TOTP)",
                scenario: "High-security applications requiring 2FA",
                description: "Two-factor authentication with authenticator apps",
                implementation: "Enable MFA in Supabase dashboard, use enroll and challenge APIs",
                tradeoffs: "Better security but adds friction to login flow",
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
