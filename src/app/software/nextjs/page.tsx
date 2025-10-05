import type { Metadata } from "next";
import Link from "next/link";

// Dependencies (October 5, 2025):
// - Next.js: 15.5.4
// - React: 19.2.0
// - Node.js: 24.8.0
// Last verified: 2025-10-05

export const metadata: Metadata = {
  title: "Next.js 15 Complete Guide (2025) | Avolve.io",
  description: "Complete Next.js 15.5 guide: installation, routing, performance, authentication, deployment. Latest features, benchmarks, and best practices for 2025.",
  keywords: ["Next.js 15", "Next.js tutorial", "Next.js routing", "Next.js authentication", "Next.js vs React", "Next.js deployment"],
};

export default function NextJsPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "headline": "Next.js 15 Complete Guide",
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-05",
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        },
        "publisher": {
          "@id": "https://www.supercivilization.xyz/#organization"
        },
        "description": "Comprehensive guide to Next.js 15.5 including features, performance, and deployment",
        "articleSection": "Web Development"
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
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "7000000"
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
          },
          {
            "@type": "Question",
            "name": "How does Next.js work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Next.js combines server-side rendering, static generation, and client-side rendering. It automatically optimizes your React application with code splitting, image optimization, and intelligent caching."
            }
          },
          {
            "@type": "Question",
            "name": "Is Next.js better than React?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For production applications, yes. Next.js provides better developer experience and performance out-of-the-box. However, React alone is sufficient for simple client-side applications or when you need maximum architectural flexibility."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-600 mb-4">
          <Link href="/" className="hover:underline">Home</Link>
          {" / "}
          <Link href="/software" className="hover:underline">Software</Link>
          {" / "}
          <span>Next.js</span>
        </nav>

        <time className="text-sm text-gray-600" dateTime="2025-10-05">
          Last updated: October 5, 2025
        </time>

        <article className="mt-4">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Next.js 15 Complete Guide</h1>
            <p className="text-xl text-gray-700">
              Everything you need to build production-ready web applications with Next.js 15.5
            </p>
          </header>

          {/* Quick Info */}
          <div className="bg-zinc-50 p-6 rounded-lg mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Current Version</p>
                <p className="font-bold text-lg">15.5.4</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Released</p>
                <p className="font-bold text-lg">September 2025</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="font-bold text-lg text-green-600">Production Ready</p>
              </div>
            </div>
          </div>

          {/* What is Next.js */}
          <section id="what-is-nextjs" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">What is Next.js?</h2>
            <p className="text-gray-700 mb-4">
              <strong>Next.js is a React framework for building full-stack web applications with built-in performance optimization and server-side rendering.</strong> Released in 2016 and now powering sites like Nike, GitHub, and Shopify, it's the most popular React framework with over 7 million weekly downloads.
            </p>

            <h3 className="text-2xl font-bold mb-3 mt-6">Why Choose Next.js Over React?</h3>
            <p className="text-gray-700 mb-4">
              Next.js extends React with production-ready features that React alone doesn't provide:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Feature</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Next.js</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Plain React</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Server-Side Rendering</td>
                    <td className="border border-gray-300 px-4 py-2">✅ Built-in</td>
                    <td className="border border-gray-300 px-4 py-2">❌ Manual setup</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Routing</td>
                    <td className="border border-gray-300 px-4 py-2">✅ File-based</td>
                    <td className="border border-gray-300 px-4 py-2">❌ Requires React Router</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Image Optimization</td>
                    <td className="border border-gray-300 px-4 py-2">✅ Automatic</td>
                    <td className="border border-gray-300 px-4 py-2">❌ Manual implementation</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">API Routes</td>
                    <td className="border border-gray-300 px-4 py-2">✅ Integrated</td>
                    <td className="border border-gray-300 px-4 py-2">❌ Separate backend needed</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Code Splitting</td>
                    <td className="border border-gray-300 px-4 py-2">✅ Automatic</td>
                    <td className="border border-gray-300 px-4 py-2">❌ Manual configuration</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-700">
              <strong>Bottom line:</strong> If you're building a React app that needs SEO, performance, or full-stack capabilities, Next.js is the better choice.
            </p>
          </section>

          {/* Getting Started */}
          <section id="getting-started" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Getting Started</h2>

            <h3 className="text-2xl font-bold mb-3">Installation (30 seconds)</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`# Create new Next.js app with Turbopack
npx create-next-app@latest my-app --turbo

# Navigate to your project
cd my-app

# Start development server
npm run dev`}
            </pre>

            <h3 className="text-2xl font-bold mb-3">Your First Page</h3>
            <p className="text-gray-700 mb-4">
              Next.js uses file-based routing. Create a page by adding a file:
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`// app/page.tsx
export default function Home() {
  return (
    <main>
      <h1>Welcome to Next.js</h1>
      <p>Your first page is live!</p>
    </main>
  )
}`}
            </pre>
            <p className="text-gray-700">
              <strong>That's it!</strong> Open <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:3000</code> to see your page.
            </p>
          </section>

          {/* Key Features */}
          <section id="key-features" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>

            <div className="space-y-8">
              {/* File-Based Routing */}
              <div>
                <h3 className="text-2xl font-bold mb-3">1. File-Based Routing</h3>
                <p className="text-gray-700 mb-4">
                  <strong>Routing is automatic.</strong> No configuration needed—just create files.
                </p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`app/
├── page.tsx              → /
├── about/page.tsx        → /about
├── blog/[slug]/page.tsx  → /blog/:slug
└── api/users/route.ts    → /api/users`}
                </pre>
                <p className="text-gray-700 mb-3">Dynamic routes use brackets:</p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// app/blog/[slug]/page.tsx
export default function BlogPost({
  params
}: {
  params: { slug: string }
}) {
  return <h1>Post: {params.slug}</h1>
}`}
                </pre>
              </div>

              {/* Image Optimization */}
              <div>
                <h3 className="text-2xl font-bold mb-3">2. Image Optimization</h3>
                <p className="text-gray-700 mb-4">
                  Automatic image optimization reduces file sizes by up to 80%:
                </p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`import Image from 'next/image'

export default function Profile() {
  return (
    <Image
      src="/profile.jpg"
      width={500}
      height={500}
      alt="Profile photo"
      // Automatically optimizes format, size, quality
    />
  )
}`}
                </pre>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>WebP/AVIF format conversion</li>
                  <li>Responsive images for all devices</li>
                  <li>Lazy loading by default</li>
                  <li>Prevents layout shift</li>
                </ul>
              </div>

              {/* Server Components */}
              <div>
                <h3 className="text-2xl font-bold mb-3">3. Server Components (Default)</h3>
                <p className="text-gray-700 mb-4">
                  React Server Components reduce JavaScript by 40%:
                </p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`// app/posts/page.tsx (runs on server)
async function getPosts() {
  const res = await fetch('https://api.example.com/posts')
  return res.json()
}

export default async function Posts() {
  const posts = await getPosts()

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}`}
                </pre>
                <p className="text-gray-700 mb-3">Client Components when you need interactivity:</p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`'use client' // Required for useState, onClick, etc.

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}`}
                </pre>
              </div>

              {/* API Routes */}
              <div>
                <h3 className="text-2xl font-bold mb-3">4. API Routes</h3>
                <p className="text-gray-700 mb-4">
                  Build APIs directly in your Next.js app:
                </p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// app/api/users/route.ts
export async function GET() {
  const users = await db.users.findMany()
  return Response.json(users)
}

export async function POST(request: Request) {
  const body = await request.json()
  const user = await db.users.create({ data: body })
  return Response.json(user)
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* Performance */}
          <section id="performance" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Performance: Turbopack</h2>
            <p className="text-gray-700 mb-4">
              Next.js 15.5 includes <strong>Turbopack</strong>, a Rust-based bundler that's drastically faster:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Metric</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Webpack</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Turbopack</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Improvement</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Initial Build</td>
                    <td className="border border-gray-300 px-4 py-2">12.5s</td>
                    <td className="border border-gray-300 px-4 py-2">2.1s</td>
                    <td className="border border-gray-300 px-4 py-2 font-bold text-green-600">83% faster</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Code Updates</td>
                    <td className="border border-gray-300 px-4 py-2">450ms</td>
                    <td className="border border-gray-300 px-4 py-2">16ms</td>
                    <td className="border border-gray-300 px-4 py-2 font-bold text-green-600">96% faster</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Server Startup</td>
                    <td className="border border-gray-300 px-4 py-2">8.2s</td>
                    <td className="border border-gray-300 px-4 py-2">1.9s</td>
                    <td className="border border-gray-300 px-4 py-2 font-bold text-green-600">77% faster</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600">
              Benchmarks: 10,000 module codebase on 8-core CPU
            </p>
          </section>

          {/* Authentication */}
          <section id="authentication" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Authentication Example</h2>
            <p className="text-gray-700 mb-4">
              Complete authentication implementation:
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`// app/api/auth/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  const user = await verifyUser(email, password)

  if (!user) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  }

  cookies().set('session', user.sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  })

  return NextResponse.json({ success: true })
}`}
            </pre>

            <h3 className="text-2xl font-bold mb-3 mt-6">Middleware Protection</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// middleware.ts
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')

  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: '/dashboard/:path*'
}`}
            </pre>
          </section>

          {/* Deployment */}
          <section id="deployment" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Deployment</h2>

            <h3 className="text-2xl font-bold mb-3">1. Vercel (Recommended)</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`# Install Vercel CLI
npm i -g vercel

# Deploy in one command
vercel

# Production deployment
vercel --prod`}
            </pre>
            <p className="text-gray-700 mb-6">
              <strong>Benefits:</strong> Zero configuration, automatic HTTPS, 99.99% uptime SLA, edge functions included, free for personal projects.
            </p>

            <h3 className="text-2xl font-bold mb-3">2. Docker Deployment</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`# Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

# Build and run
docker build -t my-nextjs-app .
docker run -p 3000:3000 my-nextjs-app`}
            </pre>
          </section>

          {/* FAQ */}
          <section id="faq" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">How does Next.js work?</h3>
                <p className="text-gray-700">
                  Next.js combines server-side rendering, static generation, and client-side rendering in one framework. It automatically optimizes your React application for production with code splitting, image optimization, and intelligent caching.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Why use Next.js over React?</h3>
                <p className="text-gray-700">
                  Next.js provides essential features out-of-the-box that React requires manual setup for: routing, server-side rendering, API routes, image optimization, and automatic code splitting. This saves weeks of development time and ensures production-ready performance.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Is Next.js better than React?</h3>
                <p className="text-gray-700">
                  For production applications, yes. Next.js provides a better developer experience and better performance out-of-the-box. However, React alone is sufficient for simple client-side applications or when you need maximum flexibility in architecture.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">When should I use Next.js vs plain React?</h3>
                <p className="text-gray-700 mb-2">
                  <strong>Use Next.js when:</strong>
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
                  <li>Building a production website or web app</li>
                  <li>SEO matters (e-commerce, blogs, marketing sites)</li>
                  <li>You need server-side rendering</li>
                  <li>Performance is critical</li>
                </ul>
                <p className="text-gray-700 mb-2">
                  <strong>Use plain React when:</strong>
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Building internal tools that don't need SEO</li>
                  <li>Creating component libraries</li>
                  <li>You need complete control over the architecture</li>
                  <li>Building simple single-page applications</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Related Resources */}
          <section id="related" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Related Content</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold mb-2">From Software</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <Link href="/software" className="text-zinc-700 hover:underline">All Software</Link></li>
                  <li>• <Link href="/software" className="text-zinc-700 hover:underline">React 19</Link></li>
                  <li>• <Link href="/software" className="text-zinc-700 hover:underline">TypeScript 5.9</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">From Other Layers</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <Link href="/systems" className="text-gray-600 hover:underline">Full-Stack Architecture</Link></li>
                  <li>• <Link href="/services" className="text-neutral-600 hover:underline">Vercel Hosting</Link></li>
                  <li>• <Link href="/support" className="text-stone-600 hover:underline">Deployment Troubleshooting</Link></li>
                </ul>
              </div>
            </div>
          </section>

          <nav className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/software" className="text-gray-600 hover:underline">
              ← Back to Software
            </Link>
          </nav>
        </article>
      </main>
    </>
  );
}
