import type { Metadata } from "next";
import Link from "next/link";

// Dependencies (October 5, 2025):
// - Next.js: 15.5.4
// - React: 19.2.0
// - Supabase: 2.58.0
// Last verified: 2025-10-05

export const metadata: Metadata = {
  title: "Systems - Architecture Patterns | Avolve.io",
  description: "Copy-paste architecture patterns for Next.js 15 + React 19.2. Authentication system with Supabase + middleware.",
};

export default function SystemsPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "headline": "Systems: Architecture Patterns That Work",
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-05",
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        }
      },
      {
        "@type": "SoftwareSourceCode",
        "name": "Authentication System Pattern",
        "description": "Production-ready authentication with Supabase + Next.js 15",
        "programmingLanguage": "TypeScript",
        "runtimePlatform": "Next.js 15.5.4",
        "codeRepository": "https://github.com/supercivilization/avolve.io"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <time className="text-sm text-gray-600" dateTime="2025-10-05">
          Last updated: October 5, 2025
        </time>

        <article className="mt-4">
          <h1 className="text-4xl font-bold mb-4 text-gray-700">Systems</h1>
          <p className="text-xl text-gray-700 mb-12">
            Architecture patterns coordinating multiple components
          </p>

          <section id="systems-definition" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">What are Systems?</h2>
            <p className="text-gray-700 mb-4">
              Systems are architecture patterns that coordinate multiple components to achieve a specific capability.
              They sit between <Link href="/solutions" className="text-slate-600 hover:underline">Solutions</Link> (business outcomes)
              and <Link href="/software" className="text-zinc-700 hover:underline ml-1">Software</Link> (frameworks).
            </p>
            <p className="text-gray-700">
              Every system on this page includes: component list, data flow, complete code, and production failure modes.
            </p>
          </section>

          <section id="auth-system" className="mb-16 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Pattern: Authentication System</h2>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Components</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Supabase Auth:</strong> User management, sessions, OAuth providers</li>
                <li><strong>Next.js Middleware:</strong> Route protection at edge</li>
                <li><strong>Server Components:</strong> Secure data fetching</li>
                <li><strong>Client Components:</strong> Login UI, session state</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Data Flow</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                <li>User visits protected route → Middleware checks session</li>
                <li>No session → Redirect to /login</li>
                <li>User submits login → Supabase creates session</li>
                <li>Session stored in httpOnly cookie → Secure from XSS</li>
                <li>Subsequent requests → Middleware validates session</li>
                <li>Valid session → Allow access, fetch user data server-side</li>
              </ol>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Implementation</h3>

              <h4 className="text-lg font-bold mb-2">1. Middleware (Edge Protection)</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`// middleware.ts
// Dependencies (October 5, 2025):
// - Next.js: 15.5.4
// - @supabase/ssr: 0.7.1
// Last verified: 2025-10-05

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*'],
};`}
              </pre>

              <h4 className="text-lg font-bold mb-2">2. Server Component (Secure Data)</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`// app/dashboard/page.tsx
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export default async function Dashboard() {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookies().get(name)?.value;
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      {/* Secure server-side rendered content */}
    </div>
  );
}`}
              </pre>

              <h4 className="text-lg font-bold mb-2">3. Client Component (Login UI)</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// components/login-form.tsx
'use client';
import { createBrowserClient } from '@supabase/ssr';
import { useState } from 'react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) window.location.href = '/dashboard';
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4 max-w-md">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded"
      >
        Login
      </button>
    </form>
  );
}`}
              </pre>
            </div>

            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <h3 className="text-lg font-bold mb-2">What Breaks in Production</h3>
              <ul className="space-y-3 text-gray-700 text-sm">
                <li>
                  <strong>Cookie domain mismatch:</strong> localhost works, production fails.<br />
                  <span className="text-red-700">Fix:</span> Set <code className="bg-red-100 px-1">cookieOptions.domain</code> correctly for your deployment.
                </li>
                <li>
                  <strong>Session refresh timing:</strong> Users logged out randomly.<br />
                  <span className="text-red-700">Fix:</span> Call <code className="bg-red-100 px-1">supabase.auth.refreshSession()</code> in client layout.
                </li>
                <li>
                  <strong>Middleware infinite redirects:</strong> /login redirects to /login.<br />
                  <span className="text-red-700">Fix:</span> Exclude /login from matcher config.
                </li>
                <li>
                  <strong>Server/client data mismatch:</strong> Hydration errors.<br />
                  <span className="text-red-700">Fix:</span> Use server components for initial user data, sync with client.
                </li>
              </ul>
            </div>
          </section>

          <section id="relationships" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">How Systems Relate to Other Layers</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Deliver <Link href="/solutions" className="text-slate-600 hover:underline">Solutions</Link>:</strong> Authentication enables secure apps, user-specific features</li>
              <li>• <strong>Built with <Link href="/software" className="text-zinc-700 hover:underline">Software</Link>:</strong> Next.js middleware, React components, TypeScript types</li>
              <li>• <strong>Use <Link href="/services" className="text-orange-600 hover:underline">Services</Link>:</strong> Supabase Auth ($0-25/mo), Vercel Edge ($0-20/mo)</li>
              <li>• <strong>Require <Link href="/support" className="text-red-600 hover:underline">Support</Link>:</strong> Monitor login failures, session timeouts, security alerts</li>
            </ul>
          </section>

          <nav className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/" className="text-gray-600 hover:underline">
              ← Back to Home
            </Link>
          </nav>
        </article>
      </main>
    </>
  );
}
