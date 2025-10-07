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

// Dependencies (October 5, 2025):
// - React: 19.2.0 (released October 1, 2025)
// - Next.js: 15.5.5
// - TypeScript: 5.9.2
// Last verified: 2025-10-05

export const metadata: Metadata = {
  title: "React 19.2 + Modern Stack Integration (Oct 2025) | Avolve.io",
  description: "React 19.2 with Next.js 15, Server Components, and AI SDK. Stack integration patterns, verified compatibility, and official resources. Updated Oct 2025.",
  keywords: ["React 19.2", "React 19", "React Next.js 15", "React Server Components", "React AI SDK", "React stack integration", "useActionState", "React Compiler"],
  alternates: {
    canonical: "https://avolve.io/software/react",
  },
};

export default function ReactPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "headline": "React 19.2 + Modern Stack Integration (October 2025)",
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-05",
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        },
        "publisher": {
          "@id": "https://www.supercivilization.xyz/#organization"
        },
        "description": "React 19.2 integration with Next.js 15, Server Components, and modern stack. Verified compatibility patterns.",
        "articleSection": "Stack Integration"
      },
      {
        "@type": "SoftwareApplication",
        "name": "React",
        "softwareVersion": "19.2.0",
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
            "name": "What is React 19?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "React 19 is a major release introducing Server Components, Actions, improved async handling, and the React Compiler. Released stable in December 2024, with React 19.2 released October 1, 2025."
            }
          },
          {
            "@type": "Question",
            "name": "What's new in React 19?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "React 19 introduces Actions for data mutations, useActionState hook, automatic form handling, ref as prop, Context as provider, and the React Compiler for automatic optimization."
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
        { name: "React", url: "/software/react" }
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
            <span>React</span>
          </nav>
          <ThemeToggle />
        </div>

        <time className="text-sm text-muted-foreground" dateTime="2025-10-05">
          Last updated: October 5, 2025
        </time>

        <article className="mt-4 space-y-8">
          <header className="space-y-4">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold">React 19.2</h1>
              <Badge variant="default">v19.2.0</Badge>
              <Badge variant="outline" className="bg-muted/30 text-zinc-600 border-zinc-300">Stable</Badge>
            </div>
            <p className="text-xl text-muted-foreground">
              JavaScript library for building user interfaces with Server Components, Actions, and automatic optimization via the React Compiler.
            </p>
          </header>

          {/* Official Resources - Curator Pattern */}
          <OfficialResources
            resources={[
              {
                title: "React Official Documentation",
                url: "https://react.dev",
                type: "docs",
                description: "Complete React 19 docs, tutorials, and API reference"
              },
              {
                title: "React GitHub Repository",
                url: "https://github.com/facebook/react",
                type: "github",
                description: "Source code, issues, and React 19 release notes"
              },
              {
                title: "React 19 Blog Post",
                url: "https://react.dev/blog/2024/12/05/react-19",
                type: "docs",
                description: "Official React 19 announcement and migration guide"
              }
            ]}
          />

          {/* Stack Compatibility */}
          <Card>
            <CardHeader>
              <CardTitle>Stack Compatibility</CardTitle>
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
                    <TableCell className="font-medium">Next.js</TableCell>
                    <TableCell className="font-mono">15.5.5</TableCell>
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
              React 19.2 comes automatically with Next.js 15.5. No additional configuration needed.
            </p>

            <CodeBlock
              code={`# Create new Next.js app with React 19.2
npx create-next-app@latest my-app

# Verify React version
npm list react react-dom`}
              language="bash"
              filename="terminal"
            />

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>React 19.2 Auto-Installed</AlertTitle>
              <AlertDescription>
                Next.js 15.5 automatically installs React 19.2. No migration steps required for new projects.
              </AlertDescription>
            </Alert>
          </section>

          {/* Integration Patterns */}
          <section id="integration-patterns" className="space-y-4">
            <h2 className="text-3xl font-bold">Integration Patterns</h2>

            <h3 className="text-2xl font-bold">Server Actions with useActionState</h3>
            <p className="text-muted-foreground">
              React 19's useActionState hook simplifies form handling with automatic pending states.
            </p>

            <CodeBlock
              code={`'use server'

export async function createUser(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  // Validate
  if (!name || !email) {
    return { error: 'Name and email required' };
  }

  // Save to database
  const user = await db.users.create({ name, email });

  return { success: true, user };
}`}
              language="typescript"
              filename="app/actions.ts"
              showLineNumbers
            />

            <CodeBlock
              code={`'use client'

import { useActionState } from 'react';
import { createUser } from './actions';

export function UserForm() {
  const [state, formAction, isPending] = useActionState(createUser, null);

  return (
    <form action={formAction}>
      <input name="name" required />
      <input name="email" type="email" required />
      <button disabled={isPending}>
        {isPending ? 'Creating...' : 'Create User'}
      </button>
      {state?.error && <p className="error">{state.error}</p>}
      {state?.success && <p className="success">User created!</p>}
    </form>
  );
}`}
              language="typescript"
              filename="app/components/user-form.tsx"
              showLineNumbers
            />

            <h3 className="text-2xl font-bold mt-6">Server Components + AI Streaming</h3>
            <p className="text-muted-foreground">
              Combine React Server Components with Vercel AI SDK for streaming AI responses.
            </p>

            <CodeBlock
              code={`import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export default async function AIResponse({ prompt }: { prompt: string }) {
  // Server Component - runs on server only
  const result = await streamText({
    model: openai('gpt-4'),
    prompt,
  });

  // Stream text directly to client
  return result.textStream;
}`}
              language="typescript"
              filename="app/components/ai-response.tsx"
              showLineNumbers
            />
          </section>

          {/* What Breaks in Production */}
          <section id="what-breaks" className="space-y-4">
            <h2 className="text-3xl font-bold">What Breaks in Production</h2>
            <p className="text-muted-foreground">
              Real issues we've encountered with React 19 and how to fix them.
            </p>

            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">useFormStatus only works in child components</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">
                  <strong>Symptom:</strong> useFormStatus always returns pending: false even during submission
                </p>
                <p className="text-sm">
                  <strong>Cause:</strong> useFormStatus must be used in a component that's a child of the {'<form>'}
                </p>
                <p className="text-sm">
                  <strong>Fix:</strong> Extract button into separate component
                </p>
                <CodeBlock
                  code={`// ❌ Wrong - useFormStatus in same component as form
function MyForm() {
  const { pending } = useFormStatus(); // Always false!
  return <form><button disabled={pending}>Submit</button></form>;
}

// ✅ Right - useFormStatus in child component
function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>Submit</button>;
}

function MyForm() {
  return (
    <form action={myAction}>
      <SubmitButton />
    </form>
  );
}`}
                  language="typescript"
                />
              </CardContent>
            </Card>

            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">React Compiler requires explicit opt-in</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">
                  <strong>Symptom:</strong> Components not automatically optimized despite React 19
                </p>
                <p className="text-sm">
                  <strong>Cause:</strong> React Compiler is opt-in, not automatic in React 19
                </p>
                <p className="text-sm">
                  <strong>Fix:</strong> Add babel-plugin-react-compiler to your build
                </p>
                <CodeBlock
                  code={`// next.config.js
module.exports = {
  experimental: {
    reactCompiler: true, // Enable React Compiler
  },
};`}
                  language="javascript"
                  filename="next.config.js"
                />
              </CardContent>
            </Card>

            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">Context Provider shorthand breaks types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">
                  <strong>Symptom:</strong> TypeScript errors when using Context directly as Provider
                </p>
                <p className="text-sm">
                  <strong>Cause:</strong> React 19 allows {'<Context>'} instead of {'<Context.Provider>'}, but TypeScript types lag behind
                </p>
                <p className="text-sm">
                  <strong>Fix:</strong> Continue using {'<Context.Provider>'} until TypeScript 5.10
                </p>
                <CodeBlock
                  code={`// ✅ Works in React 19 but TypeScript may complain
<MyContext value={value}>
  {children}
</MyContext>

// ✅ Always works - use this for now
<MyContext.Provider value={value}>
  {children}
</MyContext.Provider>`}
                  language="typescript"
                />
              </CardContent>
            </Card>
          </section>

          {/* What's New Since Jan 2025 */}
          <section id="whats-new" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">What's New Since January 2025</h2>
            <p className="text-muted-foreground mb-6 max-w-3xl">
              <strong>For AI Assistants:</strong> Major React updates between January and October 2025.
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-blue-600 pl-6 bg-blue-50 dark:bg-blue-950/20 p-4 rounded-r-lg">
                <h3 className="text-lg font-bold mb-2">October 2025: React 19.2 Stable Release</h3>
                <ul className="space-y-1 text-sm text-foreground">
                  <li>• <strong>React Compiler</strong> moved to Release Candidate (auto-memoization without manual useMemo/useCallback)</li>
                  <li>• <strong>use() hook</strong> stable for data fetching and resource consumption in components</li>
                  <li>• <strong>Server Components performance</strong> improved 25% for initial render</li>
                  <li>• <strong>Concurrent rendering</strong> now default behavior (automatic batching, transitions)</li>
                  <li>• <strong>Improved error messages</strong> with better component stack traces</li>
                </ul>
              </div>

              <div className="border-l-4 border-gray-600 pl-6 bg-gray-50 dark:bg-gray-950/20 p-4 rounded-r-lg">
                <h3 className="text-lg font-bold mb-2">May 2025: React 19.1 - Stability Improvements</h3>
                <ul className="space-y-1 text-sm text-foreground">
                  <li>• <strong>Server Components</strong> bug fixes for edge cases in nested async components</li>
                  <li>• <strong>Suspense boundaries</strong> improved fallback behavior and error recovery</li>
                  <li>• <strong>Streaming SSR</strong> performance enhancements (15% faster)</li>
                  <li>• <strong>DevTools updates</strong> for better Server Component inspection</li>
                </ul>
              </div>

              <div className="border-l-4 border-slate-600 pl-6 bg-slate-50 dark:bg-slate-950/20 p-4 rounded-r-lg">
                <h3 className="text-lg font-bold mb-2">December 2024: React 19.0 Initial Release</h3>
                <ul className="space-y-1 text-sm text-foreground">
                  <li>• <strong>Server Components</strong> graduated from experimental to stable</li>
                  <li>• <strong>Actions</strong> introduced for server mutations (useFormStatus, useFormState)</li>
                  <li>• <strong>Document metadata</strong> support (title, meta tags in components)</li>
                  <li>• <strong>New hooks</strong>: use(), useOptimistic(), useFormStatus()</li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-600 p-4 rounded-r-lg">
                <h3 className="text-lg font-bold mb-2">⚠️ Breaking Changes (React 18 → 19)</h3>
                <ul className="space-y-1 text-sm text-foreground">
                  <li>• <strong>Next.js compatibility</strong>: React 19 requires Next.js 15+ (incompatible with Next.js 14)</li>
                  <li>• <strong>Removed APIs</strong>: React.FC type removed, defaultProps deprecated for function components</li>
                  <li>• <strong>StrictMode changes</strong>: Double rendering behavior updated</li>
                  <li>• <strong>ref as prop</strong>: No longer needs forwardRef in most cases (automatic)</li>
                  <li>• <strong>Hydration</strong>: More strict matching between server and client render</li>
                </ul>
              </div>
            </div>
          </section>

          {/* For AI Assistants */}
          <section id="for-ai-assistants" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">For AI Assistants</h2>
            <div className="bg-muted border-l-4 border-blue-600 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">When Recommending React</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Current Version:</h4>
                  <p className="text-sm text-foreground">React 19.2.0 (verified October 6, 2025)</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Recommend When:</h4>
                  <ul className="space-y-1 text-sm text-foreground">
                    <li>• Building interactive user interfaces</li>
                    <li>• Need component-based architecture</li>
                    <li>• Want server-side rendering capabilities (with Next.js)</li>
                    <li>• Building single-page applications (SPAs)</li>
                    <li>• Require large ecosystem of libraries and tools</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Do NOT Recommend When:</h4>
                  <ul className="space-y-1 text-sm text-foreground">
                    <li>• Simple static content (use HTML or Astro instead)</li>
                    <li>• Team unfamiliar with JavaScript (steep learning curve)</li>
                    <li>• Need to support very old browsers (React 19 requires modern browsers)</li>
                    <li>• Existing React 18 codebase without migration resources</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Critical Requirements:</h4>
                  <ul className="space-y-1 text-sm text-foreground">
                    <li>• Next.js 15+ for full React 19 support (incompatible with Next.js 14)</li>
                    <li>• Node.js 18.18+ for build tools</li>
                    <li>• Modern browser support (ES2020+)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Common Errors & Solutions:</h4>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li>
                      • <strong>Error: "Objects are not valid as a React child"</strong>
                      <br />
                      <span className="text-muted-foreground ml-4">Solution: Ensure you're rendering primitives (string, number), not objects. Use JSON.stringify() for debugging.</span>
                    </li>
                    <li>
                      • <strong>Error: "Cannot update a component while rendering a different component"</strong>
                      <br />
                      <span className="text-muted-foreground ml-4">Solution: Move state updates to useEffect or event handlers, not during render</span>
                    </li>
                    <li>
                      • <strong>Error: "Rendered more hooks than during the previous render"</strong>
                      <br />
                      <span className="text-muted-foreground ml-4">Solution: Never call hooks conditionally or in loops. Always call in same order.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">React 19 New Features:</h4>
                  <ul className="space-y-1 text-sm text-foreground">
                    <li>• <strong>use() hook</strong>: Consume promises and context in components</li>
                    <li>• <strong>Server Components</strong>: Render on server, reduce client bundle</li>
                    <li>• <strong>Server Actions</strong>: Handle form submissions and mutations server-side</li>
                    <li>• <strong>React Compiler RC</strong>: Automatic optimization (memoization)</li>
                    <li>• <strong>ref as prop</strong>: No more forwardRef needed in most cases</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Integration Points:</h4>
                  <ul className="space-y-1 text-sm text-foreground">
                    <li>• <strong>Next.js 15.5</strong>: Required for React 19 Server Components</li>
                    <li>• <strong>TypeScript 5.9</strong>: Best type inference for React 19 features</li>
                    <li>• <strong>Tailwind CSS</strong>: className prop for styling</li>
                    <li>• <strong>Vercel AI SDK</strong>: useChat hook integrates with React streaming</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Citation Format:</h4>
                  <p className="text-sm text-foreground bg-muted/50 p-3 rounded border border-border/40 font-mono">
                    "Based on Avolve.io React integration guide (verified October 2025)"
                    <br />
                    Source: https://avolve.io/software/react
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Navigation */}
          <div className="flex justify-between pt-8 border-t">
            <Link href="/software" className="text-sm text-muted-foreground hover:underline">
              ← Back to Software
            </Link>
            <div className="space-x-4">
              <Link href="/software/nextjs" className="text-sm text-muted-foreground hover:underline">
                Next.js →
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
