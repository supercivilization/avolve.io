import type { Metadata } from "next";
import Link from "next/link";

// Dependencies (October 5, 2025):
// - Next.js: 15.5.4
// - React: 19.2.0
// - TypeScript: 5.9.2
// Last verified: 2025-10-05

export const metadata: Metadata = {
  title: "Modern Stack Best Practices + Official Resources (Oct 2025) | Avolve.io",
  description: "Best practices for Next.js 15 + React 19.2 + TypeScript 5.9 stack integration. Official guidelines, Vercel production patterns, and integration insights. Updated October 2025.",
  keywords: ["Next.js best practices", "React 19 best practices", "TypeScript best practices", "Tailwind CSS v4", "shadcn/ui", "Vercel production", "modern stack 2025"],
};

export default function BestPracticesPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "headline": "Modern Stack Best Practices + Official Resources (October 2025)",
        "description": "Best practices for Next.js 15 + React 19.2 + TypeScript 5.9 stack integration with official guidelines.",
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-05",
        "articleSection": "Stack Integration",
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        }
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
          <h1 className="text-4xl font-bold mb-4 text-zinc-700">Modern Stack Best Practices</h1>
          <p className="text-xl text-gray-700 mb-4">
            Integration patterns and official guidelines for Next.js 15 + React 19.2 + TypeScript 5.9
          </p>
          <p className="text-gray-600 mb-12">
            This is not a replacement for official documentation. We synthesize best practices across the stack and point you to authoritative sources.
          </p>

          <section id="official-resources" className="mb-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">📚 Official Best Practice Guides</h2>
            <p className="text-gray-700 mb-4">
              For authoritative best practices, always start with official documentation:
            </p>
            <ul className="space-y-2">
              <li>
                → <a href="https://nextjs.org/docs/app/building-your-application" className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener">
                  Next.js Best Practices
                </a> - App Router patterns, caching strategies, optimization
              </li>
              <li>
                → <a href="https://react.dev/learn/thinking-in-react" className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener">
                  React Best Practices
                </a> - Component design, hooks patterns, Server Components
              </li>
              <li>
                → <a href="https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html" className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener">
                  TypeScript Do's and Don'ts
                </a> - Official TypeScript best practices
              </li>
              <li>
                → <a href="https://tailwindcss.com/docs/reusing-styles" className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener">
                  Tailwind CSS Best Practices
                </a> - Reusing styles, extracting components
              </li>
              <li>
                → <a href="https://ui.shadcn.com/docs" className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener">
                  shadcn/ui Documentation
                </a> - Component usage and customization
              </li>
              <li>
                → <a href="https://vercel.com/docs/production-checklist" className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener">
                  Vercel Production Checklist
                </a> - Deployment, performance, security guidelines
              </li>
            </ul>

            <div className="mt-4 pt-4 border-t border-blue-200">
              <p className="text-sm text-gray-600">
                <strong>What we add:</strong> Stack integration patterns showing how these tools work together, Vercel production-tested guidelines, and insights from real-world October 2025 deployments.
              </p>
            </div>
          </section>

          <section id="for-ai" className="mb-12 bg-gray-50 border-l-4 border-gray-600 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">🤖 For Claude Code & AI Assistants</h2>
            <p className="text-gray-700 mb-4">
              When implementing with this stack:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Verified Stack (Oct 2025):</strong> Next.js 15.5.4 + React 19.2.0 + Node.js 24.8.0 + TypeScript 5.9.2 + Tailwind CSS 4.1.13 + shadcn/ui 3.0</li>
              <li><strong>Official Docs First:</strong> Check official best practices for each tool (links above) for latest guidance</li>
              <li><strong>Integration Patterns:</strong> Use sections below for how these tools work together in production</li>
              <li><strong>Vercel Production:</strong> Follow Vercel guidelines for deployment, caching, and performance optimization</li>
            </ul>
            <p className="text-sm text-gray-600 mt-4">
              This page synthesizes stack integration patterns. Official docs provide tool-specific best practices. Use both together.
            </p>
          </section>

          <section id="nextjs-react-integration" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Next.js 15 + React 19.2 Integration Patterns</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">Server Components by Default</h3>
                <p className="text-gray-700 mb-3">
                  In Next.js 15 + React 19.2, all components are Server Components by default. Use <code className="bg-gray-100 px-2 py-1 rounded">&apos;use client&apos;</code> only when needed.
                </p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// ✅ Good: Server Component by default
export default async function ProductList() {
  const products = await db.products.findMany();
  return <div>{products.map(p => <ProductCard key={p.id} {...p} />)}</div>;
}

// ✅ Good: Client Component only when needed
'use client';
export function InteractiveChart({ data }) {
  const [filter, setFilter] = useState('all');
  return <Chart data={data} filter={filter} onChange={setFilter} />;
}`}
                </pre>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Official guidance:</strong> <a href="https://nextjs.org/docs/app/building-your-application/rendering/server-components" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Next.js Server Components</a> and <a href="https://react.dev/reference/rsc/server-components" className="text-blue-600 hover:underline" target="_blank" rel="noopener">React Server Components</a>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Data Fetching Patterns</h3>
                <p className="text-gray-700 mb-3">
                  Use async/await in Server Components. Fetch data at the component level for automatic parallelization.
                </p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// ✅ Good: Parallel data fetching
export default async function Dashboard() {
  // Next.js automatically parallelizes these
  const userPromise = getUser();
  const statsPromise = getStats();
  const activityPromise = getActivity();

  const [user, stats, activity] = await Promise.all([
    userPromise,
    statsPromise,
    activityPromise
  ]);

  return <DashboardLayout user={user} stats={stats} activity={activity} />;
}`}
                </pre>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Official guidance:</strong> <a href="https://nextjs.org/docs/app/building-your-application/data-fetching/fetching" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Next.js Data Fetching</a>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Metadata and SEO</h3>
                <p className="text-gray-700 mb-3">
                  Use Next.js 15 Metadata API for SEO. Export <code className="bg-gray-100 px-2 py-1 rounded">metadata</code> object or <code className="bg-gray-100 px-2 py-1 rounded">generateMetadata</code> function.
                </p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// ✅ Good: Static metadata
export const metadata: Metadata = {
  title: "Product Name | Your Site",
  description: "Product description for SEO",
  openGraph: {
    title: "Product Name",
    description: "Product description",
    images: ["/og-image.png"],
  },
};

// ✅ Good: Dynamic metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProduct(params.id);
  return {
    title: \`\${product.name} | Your Site\`,
    description: product.description,
  };
}`}
                </pre>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Official guidance:</strong> <a href="https://nextjs.org/docs/app/building-your-application/optimizing/metadata" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Next.js Metadata</a>
                </p>
              </div>
            </div>
          </section>

          <section id="typescript-integration" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">TypeScript 5.9 Best Practices</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">Strict Mode Configuration</h3>
                <p className="text-gray-700 mb-3">
                  Enable strict mode in <code className="bg-gray-100 px-2 py-1 rounded">tsconfig.json</code> for maximum type safety.
                </p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// ✅ Good: tsconfig.json with strict mode
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}`}
                </pre>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Official guidance:</strong> <a href="https://www.typescriptlang.org/tsconfig#strict" className="text-blue-600 hover:underline" target="_blank" rel="noopener">TypeScript Strict Mode</a>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Type Inference Over Explicit Types</h3>
                <p className="text-gray-700 mb-3">
                  Let TypeScript infer types when obvious. Use explicit types for function parameters and return types.
                </p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// ✅ Good: Let TypeScript infer
const user = await getUser(userId); // Type inferred

// ✅ Good: Explicit types for function signatures
async function getUser(id: string): Promise<User> {
  return await db.user.findUnique({ where: { id } });
}

// ❌ Avoid: Redundant explicit types
const user: User = await getUser(userId); // Unnecessary`}
                </pre>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Zod for Runtime Validation</h3>
                <p className="text-gray-700 mb-3">
                  Use Zod for runtime validation and automatic TypeScript type inference.
                </p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// ✅ Good: Zod schema with inferred types
import { z } from "zod";

const UserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  age: z.number().int().positive().optional(),
});

type User = z.infer<typeof UserSchema>; // Automatic type inference

// Use in API routes or Server Actions
export async function createUser(data: unknown) {
  const validated = UserSchema.parse(data); // Runtime validation
  return await db.user.create({ data: validated });
}`}
                </pre>
              </div>
            </div>
          </section>

          <section id="tailwind-shadcn-integration" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Tailwind CSS v4 + shadcn/ui Patterns</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">Component Composition</h3>
                <p className="text-gray-700 mb-3">
                  Use shadcn/ui components as building blocks. Customize with Tailwind classes and CSS variables.
                </p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// ✅ Good: Compose shadcn/ui components
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function ProductCard({ product }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{product.description}</p>
        <Button className="mt-4">View Details</Button>
      </CardContent>
    </Card>
  );
}`}
                </pre>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Official guidance:</strong> <a href="https://ui.shadcn.com/docs/components" className="text-blue-600 hover:underline" target="_blank" rel="noopener">shadcn/ui Components</a>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">CSS Variables for Theming</h3>
                <p className="text-gray-700 mb-3">
                  Use CSS variables in <code className="bg-gray-100 px-2 py-1 rounded">globals.css</code> for consistent theming with shadcn/ui.
                </p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`/* ✅ Good: CSS variables in globals.css */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
  }
}`}
                </pre>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Official guidance:</strong> <a href="https://ui.shadcn.com/docs/theming" className="text-blue-600 hover:underline" target="_blank" rel="noopener">shadcn/ui Theming</a>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Responsive Design Patterns</h3>
                <p className="text-gray-700 mb-3">
                  Use Tailwind's mobile-first responsive utilities. Start with mobile layout, add breakpoints up.
                </p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// ✅ Good: Mobile-first responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card className="p-4 md:p-6">
    <h2 className="text-lg md:text-xl lg:text-2xl">Title</h2>
  </Card>
</div>

// ✅ Good: Container with max-width
<main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>`}
                </pre>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Official guidance:</strong> <a href="https://tailwindcss.com/docs/responsive-design" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Tailwind Responsive Design</a>
                </p>
              </div>
            </div>
          </section>

          <section id="vercel-production" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Vercel Production Guidelines</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">Environment Variables</h3>
                <p className="text-gray-700 mb-3">
                  Use Vercel environment variables for secrets. Never commit <code className="bg-gray-100 px-2 py-1 rounded">.env</code> files.
                </p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// ✅ Good: Access environment variables in Server Components/Actions
const apiKey = process.env.API_KEY; // Server-side only

// ✅ Good: Public variables with NEXT_PUBLIC_ prefix
const publicUrl = process.env.NEXT_PUBLIC_API_URL; // Client-accessible

// ❌ Avoid: Exposing secrets to client
// Never use secrets in Client Components`}
                </pre>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Official guidance:</strong> <a href="https://vercel.com/docs/projects/environment-variables" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Vercel Environment Variables</a>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Caching Strategies</h3>
                <p className="text-gray-700 mb-3">
                  Use Next.js 15 caching with <code className="bg-gray-100 px-2 py-1 rounded">fetch</code> options and route segment config.
                </p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// ✅ Good: Static data with revalidation
export const revalidate = 3600; // Revalidate every hour

export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }
  });
  return <div>{/* ... */}</div>;
}

// ✅ Good: Dynamic data with no caching
export const dynamic = 'force-dynamic';

export default async function UserProfile({ params }) {
  const user = await getUser(params.id);
  return <Profile user={user} />;
}`}
                </pre>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Official guidance:</strong> <a href="https://nextjs.org/docs/app/building-your-application/caching" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Next.js Caching</a>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Performance Optimization</h3>
                <p className="text-gray-700 mb-3">
                  Use Next.js Image component, dynamic imports, and Suspense for optimal loading.
                </p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// ✅ Good: Optimized images
import Image from "next/image";
<Image src="/hero.jpg" alt="Hero" width={1200} height={600} priority />

// ✅ Good: Dynamic imports for code splitting
const Chart = dynamic(() => import('./Chart'), {
  loading: () => <p>Loading...</p>
});

// ✅ Good: Suspense boundaries for streaming
import { Suspense } from "react";
<Suspense fallback={<LoadingSkeleton />}>
  <SlowComponent />
</Suspense>`}
                </pre>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Official guidance:</strong> <a href="https://nextjs.org/docs/app/building-your-application/optimizing" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Next.js Optimization</a>
                </p>
              </div>
            </div>
          </section>

          <section id="accessibility-seo" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Accessibility & SEO Integration</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">Semantic HTML</h3>
                <p className="text-gray-700 mb-3">
                  Use semantic HTML elements with shadcn/ui components for accessibility and SEO.
                </p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// ✅ Good: Semantic structure
<main className="max-w-6xl mx-auto px-4 py-12">
  <article>
    <header>
      <h1>Page Title</h1>
      <time dateTime="2025-10-05">October 5, 2025</time>
    </header>
    <section>
      <h2>Section Title</h2>
      <p>Content...</p>
    </section>
  </article>
</main>

// ✅ Good: Accessible buttons
<Button aria-label="Close modal" onClick={handleClose}>
  <X className="h-4 w-4" />
</Button>`}
                </pre>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Schema Markup</h3>
                <p className="text-gray-700 mb-3">
                  Add JSON-LD schema markup for rich search results.
                </p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// ✅ Good: Schema markup in page component
export default function ArticlePage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Article Title",
    "datePublished": "2025-10-05",
    "author": {
      "@type": "Person",
      "name": "Author Name"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <article>{/* ... */}</article>
    </>
  );
}`}
                </pre>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Official guidance:</strong> <a href="https://nextjs.org/docs/app/building-your-application/optimizing/metadata#json-ld" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Next.js JSON-LD</a>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">WCAG Compliance</h3>
                <p className="text-gray-700 mb-3">
                  Follow WCAG 2.1 AA standards. shadcn/ui components are accessible by default.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Color contrast ratio ≥ 4.5:1 for normal text</li>
                  <li>Keyboard navigation for all interactive elements</li>
                  <li>ARIA labels for icon-only buttons</li>
                  <li>Focus indicators visible and clear</li>
                  <li>Form labels properly associated with inputs</li>
                </ul>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Official guidance:</strong> <a href="https://www.w3.org/WAI/WCAG21/quickref/" className="text-blue-600 hover:underline" target="_blank" rel="noopener">WCAG Quick Reference</a>
                </p>
              </div>
            </div>
          </section>

          <section id="stack-relationships" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">How Best Practices Relate to the Stack</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Implements <Link href="/systems" className="text-gray-600 hover:underline">Systems</Link>:</strong> Best practices shape system architecture patterns</li>
              <li>• <strong>Delivers <Link href="/solutions" className="text-slate-600 hover:underline">Solutions</Link>:</strong> Production-ready code quality and performance</li>
              <li>• <strong>Uses <Link href="/software" className="text-zinc-700 hover:underline">Software</Link>:</strong> Framework-specific patterns for Next.js, React, TypeScript</li>
              <li>• <strong>Deploys to <Link href="/services" className="text-neutral-600 hover:underline">Services</Link>:</strong> Vercel optimization, Supabase integration, edge deployment</li>
              <li>• <strong>Maintained by <Link href="/support" className="text-stone-600 hover:underline">Support</Link>:</strong> Code quality prevents production issues</li>
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
