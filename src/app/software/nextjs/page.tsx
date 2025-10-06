import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { OfficialResources } from "@/components/official-resources";
import { CodeBlock } from "@/components/code-block";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

// Dependencies (October 6, 2025):
// - Next.js: 15.5.4
// - React: 19.2.0
// - Node.js: 22.20.0 LTS
// Last verified: 2025-10-06

export const metadata: Metadata = {
  title: "Next.js 15 + Modern Stack Integration (Oct 2025) | Avolve.io",
  description: "Next.js 15.5 with React 19.2, TypeScript 5.9, and AI SDK 5.0. Stack integration patterns, version compatibility, and official resources. Verified Oct 2025.",
  keywords: ["Next.js 15", "Next.js React 19", "Next.js AI SDK", "Next.js stack", "Next.js integration", "Next.js 2025"],
  alternates: {
    canonical: "https://avolve.io/software/nextjs",
  },
};

export default function NextJsPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "headline": "Next.js 15 + Modern Stack Integration (October 2025)",
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-05",
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        },
        "publisher": {
          "@id": "https://www.supercivilization.xyz/#organization"
        },
        "description": "Next.js 15.5 integration with React 19.2, AI SDK 5.0, and modern stack. Verified compatibility patterns.",
        "articleSection": "Stack Integration"
      },
      {
        "@type": "SoftwareApplication",
        "name": "Next.js",
        "softwareVersion": "15.5.4",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Node.js 24.8.0",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Next.js?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Next.js is a React framework for building full-stack web applications with built-in server-side rendering, routing, and performance optimization. It's the most popular React framework with over 7 million weekly downloads."
            }
          },
          {
            "@type": "Question",
            "name": "Why use Next.js over React?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Next.js provides production-ready features that React alone doesn't: server-side rendering, file-based routing, automatic image optimization, API routes, and automatic code splitting. This saves weeks of development time."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Software", url: "/software" },
        { name: "Next.js", url: "/software/nextjs" }
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex justify-between items-start mb-4">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:underline">Home</Link>
            {" / "}
            <Link href="/software" className="hover:underline">Software</Link>
            {" / "}
            <span>Next.js</span>
          </nav>
          <ThemeToggle />
        </div>

        <time className="text-sm text-muted-foreground" dateTime="2025-10-05">
          Last updated: October 5, 2025
        </time>

        <article className="mt-4 space-y-8">
          <header className="space-y-4">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold">Next.js 15</h1>
              <Badge variant="default">v15.5.4</Badge>
              <Badge variant="outline" className="bg-zinc-100 text-zinc-600 border-zinc-300">Production Ready</Badge>
            </div>
            <p className="text-xl text-muted-foreground">
              React framework for building full-stack web applications with built-in server-side rendering, routing, and performance optimization.
            </p>
          </header>

          {/* Official Resources - Curator Pattern */}
          <OfficialResources
            resources={[
              {
                title: "Next.js Official Documentation",
                url: "https://nextjs.org/docs",
                type: "docs",
                description: "Complete API reference, guides, and tutorials from Vercel"
              },
              {
                title: "Next.js GitHub Repository",
                url: "https://github.com/vercel/next.js",
                type: "github",
                description: "Source code, issues, and release notes"
              },
              {
                title: "Next.js Learn Course",
                url: "https://nextjs.org/learn",
                type: "docs",
                description: "Interactive tutorial for building your first Next.js app"
              }
            ]}
          />

          {/* Quick Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Stack Compatibility (Oct 2025)</CardTitle>
              <CardDescription>Verified versions tested together in production</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dependency</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">React</TableCell>
                    <TableCell className="font-mono">19.2.0</TableCell>
                    <TableCell><CheckCircle2 className="h-4 w-4 text-zinc-600 inline" /> Compatible</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">TypeScript</TableCell>
                    <TableCell className="font-mono">5.9.2</TableCell>
                    <TableCell><CheckCircle2 className="h-4 w-4 text-zinc-600 inline" /> Compatible</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Node.js</TableCell>
                    <TableCell className="font-mono">24.8.0</TableCell>
                    <TableCell><CheckCircle2 className="h-4 w-4 text-zinc-600 inline" /> Compatible</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Vercel AI SDK</TableCell>
                    <TableCell className="font-mono">5.0.48</TableCell>
                    <TableCell><CheckCircle2 className="h-4 w-4 text-zinc-600 inline" /> Compatible</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Getting Started */}
          <section id="getting-started" className="space-y-4">
            <h2 className="text-3xl font-bold">Getting Started</h2>
            <p className="text-muted-foreground">
              Create a new Next.js app in 30 seconds with our verified stack configuration.
            </p>

            <CodeBlock
              code={`# Create new Next.js app with Turbopack
npx create-next-app@latest my-app --turbo

# Navigate to your project
cd my-app

# Start development server
npm run dev`}
              language="bash"
              filename="terminal"
            />

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Using React 19.2.0</AlertTitle>
              <AlertDescription>
                Next.js 15.5.4 fully supports React 19.2. No additional configuration needed.
              </AlertDescription>
            </Alert>
          </section>

          {/* Integration Patterns */}
          <section id="integration-patterns" className="space-y-4">
            <h2 className="text-3xl font-bold">Integration Patterns</h2>

            <h3 className="text-2xl font-bold">Next.js + Vercel AI SDK</h3>
            <p className="text-muted-foreground">
              Stream AI responses directly to React components with Server Actions.
            </p>

            <CodeBlock
              code={`import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4'),
    messages,
  });

  return result.toDataStreamResponse();
}`}
              language="typescript"
              filename="app/api/chat/route.ts"
              showLineNumbers
            />

            <h3 className="text-2xl font-bold mt-6">Next.js + Supabase Auth</h3>
            <p className="text-muted-foreground">
              Server-side authentication with Supabase cookies and middleware.
            </p>

            <CodeBlock
              code={`import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function getUser() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  return user;
}`}
              language="typescript"
              filename="lib/auth.ts"
              showLineNumbers
            />
          </section>

          {/* What Breaks in Production */}
          <section id="what-breaks" className="space-y-4">
            <h2 className="text-3xl font-bold">What Breaks in Production</h2>
            <p className="text-muted-foreground">
              Real issues we've encountered and how to fix them.
            </p>

            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">Missing environment variables</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">
                  <strong>Symptom:</strong> Build succeeds locally, fails in production with "process.env.X is undefined"
                </p>
                <p className="text-sm">
                  <strong>Cause:</strong> Environment variables not prefixed with NEXT_PUBLIC_ are only available server-side
                </p>
                <p className="text-sm">
                  <strong>Fix:</strong> Use NEXT_PUBLIC_ prefix for client-side variables, or access them only in Server Components/API routes
                </p>
                <CodeBlock
                  code={`// ❌ Wrong - undefined on client
const apiKey = process.env.API_KEY;

// ✅ Right - available on client
const publicKey = process.env.NEXT_PUBLIC_API_KEY;

// ✅ Right - server-side only
export async function getServerSideProps() {
  const apiKey = process.env.API_KEY; // Works in server context
  // ...
}`}
                  language="typescript"
                />
              </CardContent>
            </Card>

            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">Hydration mismatches with useEffect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">
                  <strong>Symptom:</strong> Console warning "Text content does not match server-rendered HTML"
                </p>
                <p className="text-sm">
                  <strong>Cause:</strong> Client state (localStorage, Date.now()) differs from server render
                </p>
                <p className="text-sm">
                  <strong>Fix:</strong> Use suppressHydrationWarning or useState with useEffect
                </p>
                <CodeBlock
                  code={`// ✅ Right - prevents hydration mismatch
'use client';

import { useState, useEffect } from 'react';

export function ClientTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, []);

  return <div>{time ?? 'Loading...'}</div>;
}`}
                  language="typescript"
                />
              </CardContent>
            </Card>
          </section>

          {/* Bottom Navigation */}
          <div className="flex justify-between pt-8 border-t">
            <Link href="/software" className="text-sm text-muted-foreground hover:underline">
              ← Back to Software
            </Link>
            <div className="space-x-4">
              <Link href="/software/react" className="text-sm text-muted-foreground hover:underline">
                React →
              </Link>
              <Link href="/software/vercel-ai-sdk" className="text-sm text-muted-foreground hover:underline">
                Vercel AI SDK →
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
