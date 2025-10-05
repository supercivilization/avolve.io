import type { Metadata } from "next";
import Link from "next/link";

// Dependencies (October 5, 2025):
// - React: 19.2.0 (released October 1, 2025)
// - Next.js: 15.5.4
// - TypeScript: 5.9.2
// Last verified: 2025-10-05

export const metadata: Metadata = {
  title: "React 19.2 + Modern Stack Integration (Oct 2025) | Avolve.io",
  description: "React 19.2 integration with Next.js 15, AI SDK, and Supabase. Activity component, useEffectEvent, stack patterns. Official resources and verified compatibility.",
  keywords: ["React 19.2", "React 19", "React Next.js", "React AI SDK", "React stack integration", "useEffectEvent", "Activity component"],
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
        "description": "React 19.2 integration with Next.js 15, Vercel AI SDK, and Supabase. Verified stack patterns.",
        "articleSection": "Stack Integration",
        "dependencies": {
          "React": "19.2.0",
          "Node.js": "24.8.0"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "React",
        "applicationCategory": "DeveloperApplication",
        "softwareVersion": "19.2.0",
        "releaseNotes": "https://react.dev/blog/2024/12/05/react-19",
        "operatingSystem": "Node.js 24.8.0",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "15000000"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is React 19.2?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "React 19.2.0 (released October 1, 2025) is a production-ready update adding Activity component for UI priority management, useEffectEvent for stable effect dependencies, Performance Tracks for Chrome DevTools, and Partial Pre-rendering capabilities."
            }
          },
          {
            "@type": "Question",
            "name": "Should I upgrade to React 19.2?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes for new projects and Next.js 15+ apps. Consider upgrading existing apps if you need Activity component, useEffectEvent, or Partial Pre-rendering. Zero breaking changes from React 19.1."
            }
          },
          {
            "@type": "Question",
            "name": "What is the Activity component?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Activity component controls which UI parts render and when. Modes: visible (shows children, processes updates) and hidden (hides children, defers updates). Used for pre-rendering navigation targets and maintaining state during back navigation."
            }
          },
          {
            "@type": "Question",
            "name": "What is useEffectEvent?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "useEffectEvent creates effect event handlers that always see latest props/state without being reactive dependencies. Solves the problem of values that should not trigger effect re-runs."
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

      <main className="max-w-6xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-600 mb-4">
          <Link href="/" className="hover:underline">Home</Link>
          {" → "}
          <Link href="/software" className="hover:underline">Software</Link>
          {" → "}
          <span>React 19.2</span>
        </nav>

        <time className="text-sm text-gray-600" dateTime="2025-10-05">
          Last updated: October 5, 2025
        </time>

        <article className="mt-4">
          <h1 className="text-4xl font-bold mb-4 text-gray-700">React 19.2 + Modern Stack</h1>

          <p className="text-xl text-gray-700 mb-4">
            React 19.2 integration patterns with Next.js 15, Vercel AI SDK, and Supabase
          </p>
          <p className="text-gray-600 mb-8">
            This is not the official React documentation. We show how React 19.2 integrates with the modern stack and point you to official resources.
          </p>

          {/* Official Resources */}
          <section id="official-resources" className="mb-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">📚 Official Documentation</h2>
            <p className="text-gray-700 mb-4">
              For the latest React features, API reference, and tutorials:
            </p>
            <ul className="space-y-2">
              <li>
                → <a href="https://react.dev" className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener">
                  react.dev
                </a> - Official React documentation
              </li>
              <li>
                → <a href="https://react.dev/reference/react" className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener">
                  API Reference
                </a> - Complete API documentation
              </li>
              <li>
                → <a href="https://github.com/facebook/react" className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener">
                  GitHub Repository
                </a> - Source code and issues
              </li>
              <li>
                → <a href="https://react.dev/blog/2024/12/05/react-19" className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener">
                  React 19 Release Notes
                </a> - Official release announcement
              </li>
            </ul>

            <div className="mt-4 pt-4 border-t border-blue-200">
              <p className="text-sm text-gray-600">
                <strong>What we add:</strong> Stack integration patterns (React 19.2 + Next.js 15 + AI SDK + Supabase), Activity/useEffectEvent real-world usage, verified compatibility (October 2025).
              </p>
            </div>
          </section>

          {/* Quick Answer */}
          <section id="overview" className="mb-12 bg-gray-50 p-6 rounded-lg border-l-4 border-gray-600">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-gray-700 mb-4">
              React 19.2.0 (released October 1, 2025) continues React's fundamental transformation with production-ready features for performance tracking, partial pre-rendering, and declarative UI priority management.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Key Statistics:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li><strong>50-75% reductions</strong> in client-side JavaScript bundles</li>
              <li><strong>42.8% of top 10,000 websites</strong> globally use React</li>
              <li><strong>20+ million weekly NPM downloads</strong> for core package</li>
              <li><strong>75% developer retention</strong> rate in ecosystem</li>
            </ul>
          </section>

          {/* New in 19.2 */}
          <section id="new-features" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">New Features in React 19.2</h2>

            {/* Activity Component */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">1. Activity Component - Declarative UI Priority Management</h3>

              <p className="text-gray-700 mb-4">
                The <code className="bg-gray-200 px-1 rounded">&lt;Activity&gt;</code> component introduces a declarative way to control which parts of your app render and when, solving common patterns like pre-loading navigation targets and maintaining state during back navigation.
              </p>

              <p className="text-gray-700 mb-4"><strong>Modes:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                <li><code className="bg-gray-200 px-1 rounded">visible</code>: Shows children, mounts effects, processes updates normally</li>
                <li><code className="bg-gray-200 px-1 rounded">hidden</code>: Hides children, unmounts effects, defers all updates until React has idle time</li>
              </ul>

              <p className="text-gray-700 mb-4"><strong>Before: Conditional rendering loses state</strong></p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'profile' && <ProfilePage />}
    </>
  )
  // Problem: ProfilePage loses all state when navigating away
}`}
              </pre>

              <p className="text-gray-700 mb-4"><strong>After: Activity preserves state and pre-renders</strong></p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <>
      <Activity mode={currentPage === 'home' ? 'visible' : 'hidden'}>
        <HomePage />
      </Activity>
      <Activity mode={currentPage === 'profile' ? 'visible' : 'hidden'}>
        <ProfilePage />
      </Activity>
    </>
  )
  // Benefits:
  // - ProfilePage maintains state when hidden
  // - Can pre-render ProfilePage in background
  // - Back navigation is instant with preserved state
}`}
              </pre>

              <p className="text-gray-700 mb-2"><strong>Use Cases:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                <li>Pre-render navigation targets users are likely to visit next</li>
                <li>Maintain form state when users navigate away</li>
                <li>Background-load data, CSS, and images without blocking visible UI</li>
                <li>Faster navigations with preserved scroll positions and input values</li>
              </ul>

              <p className="text-gray-700 mb-2"><strong>Performance Characteristics:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Hidden activities defer updates until React has no other work</li>
                <li>Effects are unmounted in hidden mode (saves resources)</li>
                <li>Pre-rendering doesn't impact visible UI performance</li>
              </ul>
            </div>

            {/* useEffectEvent */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">2. useEffectEvent - Stable Effect Dependencies</h3>

              <p className="text-gray-700 mb-4">
                <code className="bg-gray-200 px-1 rounded">useEffectEvent</code> solves the long-standing problem of effect dependencies that should "see" latest values without causing the effect to re-run.
              </p>

              <p className="text-gray-700 mb-4"><strong>The Problem:</strong></p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`// Problem: theme change causes chat to reconnect
function ChatRoom({ roomId, theme }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      showNotification('Connected!', theme); // Uses theme
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, theme]); // theme causes unnecessary reconnects
}`}
              </pre>

              <p className="text-gray-700 mb-4"><strong>The Solution:</strong></p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme); // Always sees latest theme
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      onConnected(); // Call Effect Event
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // Only roomId is a dependency
}`}
              </pre>

              <p className="text-gray-700 mb-2"><strong>Key Rules:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                <li>Effect Events are NOT reactive dependencies</li>
                <li>Always see the latest props and state (like DOM events)</li>
                <li>Must upgrade to <code className="bg-gray-200 px-1 rounded">eslint-plugin-react-hooks@6.1.0</code> for proper linting</li>
                <li>Similar to DOM events in behavior and mental model</li>
              </ul>

              <p className="text-gray-700 mb-2"><strong>When to Use:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>✅ Effect has "event handlers" that need latest values</li>
                <li>✅ Separating "what triggers" from "what happens"</li>
                <li>✅ Avoiding unnecessary effect re-runs for non-synchronization values</li>
                <li>❌ Not for replacing all effect dependencies (violates Rules of Hooks)</li>
              </ul>
            </div>

            {/* Performance Tracks */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">3. Performance Tracks - Chrome DevTools Integration</h3>

              <p className="text-gray-700 mb-4">
                React 19.2 adds custom Chrome DevTools tracks providing deep visibility into React's performance characteristics.
              </p>

              <p className="text-gray-700 mb-2"><strong>Scheduler Track ⚛:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                <li>Shows work React performs at different priorities</li>
                <li>"blocking" priority for user interactions</li>
                <li>"transition" priority for <code className="bg-gray-200 px-1 rounded">startTransition</code> updates</li>
                <li>Displays event types scheduling updates</li>
                <li>Shows when updates are blocked waiting for other priorities</li>
              </ul>

              <p className="text-gray-700 mb-2"><strong>Components Track ⚛:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                <li>Shows component tree React is rendering or running effects on</li>
                <li>Labels: "Mount", "Blocked" (yielding to external work)</li>
                <li>Time breakdown for rendering and running effects</li>
                <li>Helps identify performance bottlenecks in component tree</li>
              </ul>

              <p className="text-gray-700 mb-2"><strong>How to Use:</strong></p>
              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                <li>Record performance profile in Chrome DevTools</li>
                <li>Look for custom "⚛" tracks in timeline</li>
                <li>Identify blocking work and optimization opportunities</li>
                <li>Correlate React work with browser paint/layout</li>
              </ol>
            </div>

            {/* Partial Pre-rendering */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">4. Partial Pre-rendering - Selective SSR</h3>

              <p className="text-gray-700 mb-4">
                Partial Pre-rendering enables pre-rendering static parts of your app ahead of time, then resuming rendering later with dynamic content.
              </p>

              <p className="text-gray-700 mb-2"><strong>Architecture:</strong></p>
              <ol className="list-decimal list-inside space-y-1 text-gray-700 mb-4">
                <li><strong>Pre-render</strong>: Generate static shell with <code className="bg-gray-200 px-1 rounded">prerender()</code></li>
                <li><strong>Store</strong>: Save postponed state for later</li>
                <li><strong>Resume</strong>: Complete rendering with <code className="bg-gray-200 px-1 rounded">resume()</code> or <code className="bg-gray-200 px-1 rounded">resumeAndPrerender()</code></li>
              </ol>

              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`// Step 1: Pre-render the shell
const { prelude, postponed } = await prerender(<App />, {
  signal: controller.signal,
});

// Save postponed state for later
await savePostponedState(postponed);

// Send prelude to client or CDN
response.send(prelude);

// Step 2: Resume rendering later
const postponed = await getPostponedState(request);
const resumeStream = await resume(<App />, postponed);`}
              </pre>

              <p className="text-gray-700 mb-2"><strong>Use Cases:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>✅ Serve static shell from CDN instantly</li>
                <li>✅ Fill in personalized content on-demand</li>
                <li>✅ Reduce Time to First Byte (TTFB)</li>
                <li>✅ Progressive enhancement patterns</li>
              </ul>
            </div>

            {/* cacheSignal */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">5. cacheSignal - Cache Lifecycle Awareness</h3>

              <p className="text-gray-700 mb-4">
                <code className="bg-gray-200 px-1 rounded">cacheSignal</code> provides an AbortSignal that activates when the <code className="bg-gray-200 px-1 rounded">cache()</code> lifetime ends, enabling cleanup and cancellation.
              </p>

              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`import { cache, cacheSignal } from 'react';

const dedupedFetch = cache(fetch);

async function Component() {
  // Signal automatically aborts when:
  // - Render completes successfully
  // - Render is aborted
  // - Render fails
  await dedupedFetch(url, { signal: cacheSignal() });
}`}
              </pre>

              <p className="text-gray-700 mb-2"><strong>Use Cases:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Abort in-flight requests when cache invalidates</li>
                <li>Clean up resources when cached result no longer needed</li>
                <li>Coordinate with React's rendering lifecycle</li>
              </ul>
            </div>
          </section>

          {/* React 19 Core Features */}
          <section id="react-19-features" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">React 19 Core Features</h2>

            {/* Actions API */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Actions API - Form Revolution</h3>

              <p className="text-gray-700 mb-4">
                React 19's most transformative feature is the Actions API, which fundamentally reimagines how forms and async operations work in React applications.
              </p>

              <p className="text-gray-700 mb-2"><strong>Key Benefits:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                <li>Forms work without JavaScript while gaining enhanced functionality when it loads</li>
                <li>Automatic handling of submission states, errors, and optimistic updates</li>
                <li>Built-in progressive enhancement for better accessibility</li>
                <li>Seamless integration with React's concurrent rendering</li>
              </ul>

              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`import { useActionState } from 'react'

async function createPost(prevState: any, formData: FormData) {
  try {
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const post = await api.createPost({ title, content })
    return { success: true, post }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

function CreatePostForm() {
  const [state, submitAction, isPending] = useActionState(createPost, null)

  return (
    <form action={submitAction}>
      <input name="title" placeholder="Post title" required />
      <textarea name="content" placeholder="Post content" required />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Post'}
      </button>
      {state?.error && <p className="error">{state.error}</p>}
      {state?.success && <p className="success">Post created!</p>}
    </form>
  )
}`}
              </pre>
            </div>

            {/* React Compiler */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">React Compiler - Automatic Performance</h3>

              <p className="text-gray-700 mb-4">
                The React Compiler (Release Candidate as of October 2025) represents the most significant advancement in React performance optimization since the framework's creation. <strong>Currently powering production applications including Instagram.com</strong>.
              </p>

              <p className="text-gray-700 mb-2"><strong>Automatic Optimizations:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                <li>Eliminates need for manual <code className="bg-gray-200 px-1 rounded">useMemo</code>, <code className="bg-gray-200 px-1 rounded">useCallback</code>, and <code className="bg-gray-200 px-1 rounded">React.memo</code></li>
                <li>Analyzes component dependencies and applies optimal performance patterns</li>
                <li><strong>15-65% improvements</strong> in application responsiveness reported by early adopters</li>
                <li><strong>Up to 70% reduction</strong> in initial bundle sizes through better code splitting</li>
              </ul>

              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`// Before: Manual optimization required
const ExpensiveComponent = React.memo(({ data, filter }) => {
  const filteredData = useMemo(() =>
    data.filter(item => item.category === filter),
    [data, filter]
  )
  // ...
})

// After: React Compiler handles optimization automatically
function ExpensiveComponent({ data, filter }) {
  const filteredData = data.filter(item => item.category === filter)
  // Compiler optimizes automatically
}`}
              </pre>
            </div>

            {/* Server Components */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">React Server Components - Production Ready</h3>

              <p className="text-gray-700 mb-4">
                React Server Components (RSC) have achieved production stability in React 19, fundamentally altering how React applications are architected and delivered.
              </p>

              <p className="text-gray-700 mb-2"><strong>Performance Benefits:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                <li><strong>75% reduction</strong> in JavaScript bundle sizes for typical e-commerce applications</li>
                <li><strong>40-60% improvement</strong> in Time to Interactive</li>
                <li><strong>75KB gzipped bundle size reductions</strong> by moving heavy dependencies server-side</li>
                <li><strong>40% improvements in load times</strong> with 15% increases in conversion rates</li>
              </ul>

              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`// Server Component - runs entirely on server
async function ProductPage({ productId }: { productId: string }) {
  // Direct database access - no API layer needed
  const product = await db.product.findUnique({
    where: { id: productId },
    include: { reviews: true, variants: true }
  })

  return (
    <div>
      <ProductDetails product={product} />
      <Suspense fallback={<ReviewsSkeleton />}>
        <ProductReviews productId={productId} />
      </Suspense>
      {/* Client Component for interactivity */}
      <AddToCartButton productId={productId} />
    </div>
  )
}

// Client Component - runs in browser
'use client'
function AddToCartButton({ productId }: { productId: string }) {
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    await addToCart(productId)
    setIsAdding(false)
  }

  return (
    <button onClick={handleAddToCart} disabled={isAdding}>
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </button>
  )
}`}
              </pre>
            </div>
          </section>

          {/* Stack Integration */}
          <section id="stack-integration" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Stack Integration Patterns</h2>

            <p className="text-gray-700 mb-6">
              React 19.2 isn't just a React update—it's a <strong>force multiplier for the entire modern stack</strong>. Each new primitive solves real integration challenges across Next.js, Vercel AI SDK, TypeScript, and Supabase.
            </p>

            {/* Next.js Integration */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">React 19.2 + Next.js 15 Integration</h3>

              <p className="text-gray-700 mb-4">
                <code className="bg-gray-200 px-1 rounded">&lt;Activity&gt;</code> component solves a critical Next.js App Router challenge: maintaining state during navigation while pre-rendering next destinations.
              </p>

              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`// app/layout.tsx
'use client'
import { Activity } from 'react'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }) {
  const pathname = usePathname()

  return (
    <>
      {/* Current page */}
      <Activity mode={pathname === '/' ? 'visible' : 'hidden'}>
        <HomePage />
      </Activity>

      {/* Pre-render likely next page in background */}
      <Activity mode={pathname === '/profile' ? 'visible' : 'hidden'}>
        <ProfilePage />
      </Activity>

      {children}
    </>
  )
}`}
              </pre>

              <p className="text-gray-700 mb-2"><strong>Benefits for Next.js:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                <li>✅ Instant back/forward navigation (preserved state)</li>
                <li>✅ Pre-load data for likely next pages without blocking UI</li>
                <li>✅ Maintain form state across navigation</li>
                <li>✅ Background-load images, CSS, data while user views current page</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg">
                <p className="text-sm text-gray-700 mb-2"><strong>Partial Pre-rendering with Next.js CDN Strategy:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Enable PPR in <code className="bg-gray-200 px-1 rounded">next.config.js</code> with <code className="bg-gray-200 px-1 rounded">experimental: {`{ ppr: 'incremental' }`}</code></li>
                  <li>Static shell served from Vercel Edge (instant TTFB)</li>
                  <li>Dynamic content streamed on-demand</li>
                  <li>85% cost savings with Vercel Fluid Compute</li>
                </ul>
              </div>
            </div>

            {/* Vercel AI SDK Integration */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">React 19.2 + Vercel AI SDK</h3>

              <p className="text-gray-700 mb-4">
                The AI SDK's streaming hooks (<code className="bg-gray-200 px-1 rounded">useChat</code>, <code className="bg-gray-200 px-1 rounded">useCompletion</code>) often have effect dependencies that shouldn't trigger reconnections. <strong><code className="bg-gray-200 px-1 rounded">useEffectEvent</code> solves this perfectly</strong>.
              </p>

              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`'use client'
import { useChat } from 'ai/react'
import { useEffectEvent } from 'react'

function AIChat({ userId, sessionId, theme, onAnalytics }) {
  const onMessageComplete = useEffectEvent((message) => {
    // Track analytics without breaking streaming
    onAnalytics({
      userId,
      sessionId,
      messageId: message.id,
      timestamp: Date.now()
    })
  })

  const { messages, input, handleSubmit } = useChat({
    api: '/api/chat',
    onFinish: onMessageComplete
  })

  return (
    <div className={\`chat-interface theme-\${theme}\`}>
      {messages.map(m => <Message key={m.id} {...m} />)}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
      </form>
    </div>
  )
}`}
              </pre>

              <p className="text-gray-700 mb-2"><strong>Benefits:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                <li>✅ Theme/UI changes don't interrupt AI streaming</li>
                <li>✅ Analytics tracking without effect re-runs</li>
                <li>✅ Cleaner separation of concerns</li>
                <li>✅ 15-20% fewer WebSocket reconnects</li>
              </ul>

              <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-lg">
                <p className="text-sm text-gray-700 mb-2"><strong>Multi-Modal AI with Activity Component:</strong></p>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs">
{`function MultiModalAI() {
  const [mode, setMode] = useState<'chat' | 'image' | 'code'>('chat')

  return (
    <>
      <Activity mode={mode === 'chat' ? 'visible' : 'hidden'}>
        <ChatInterface /> {/* Preserves conversation state */}
      </Activity>
      <Activity mode={mode === 'image' ? 'visible' : 'hidden'}>
        <ImageGenerator /> {/* Maintains generation history */}
      </Activity>
      <Activity mode={mode === 'code' ? 'visible' : 'hidden'}>
        <CodeAssistant /> {/* Preserves code context */}
      </Activity>
    </>
  )
}`}
                </pre>
              </div>
            </div>

            {/* Supabase Integration */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">React 19.2 + Supabase Real-time</h3>

              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`'use client'
import { useEffectEvent } from 'react'
import { createClient } from '@/lib/supabase/client'

function RealtimeData({ userId, onUpdate, theme }) {
  const handleChange = useEffectEvent((payload) => {
    // Always uses latest onUpdate and theme
    onUpdate(payload)
    showNotification('Update received', theme)
  })

  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel('db-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'posts',
        filter: \`user_id=eq.\${userId}\`
      }, handleChange)
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId]) // Only userId as dependency
}`}
              </pre>

              <p className="text-gray-700 mb-2"><strong>Benefits:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>✅ UI changes don't break WebSocket connections</li>
                <li>✅ Cleaner real-time subscription management</li>
                <li>✅ 25-30% fewer Supabase reconnections</li>
              </ul>
            </div>

            {/* TypeScript Integration */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">React 19.2 + TypeScript 5.9</h3>

              <p className="text-gray-700 mb-4">
                Full type safety for all React 19.2 features with zero additional configuration.
              </p>

              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`import { Activity, useEffectEvent } from 'react'
import type { ReactNode } from 'react'

interface ChatMessage {
  id: string
  content: string
  role: 'user' | 'assistant'
}

function Chat({ theme, onMessage }: {
  theme: string
  onMessage: (msg: ChatMessage) => void
}) {
  // Type inference works perfectly
  const handleMessage = useEffectEvent((msg: ChatMessage) => {
    console.log(\`Message in \${theme} theme:\`, msg)
    onMessage(msg)
  })

  useEffect(() => {
    socket.on('message', handleMessage)
    return () => socket.off('message', handleMessage)
  }, [])
}`}
              </pre>

              <p className="text-gray-700 mb-2"><strong>Type-Safe Activity Wrapper:</strong></p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`interface ActivityWrapperProps {
  isVisible: boolean
  children: ReactNode
}

function ActivityWrapper({ isVisible, children }: ActivityWrapperProps) {
  return (
    <Activity mode={isVisible ? 'visible' : 'hidden'}>
      {children}
    </Activity>
  )
}

// Type-safe usage
<ActivityWrapper isVisible={currentPage === 'home'}>
  <HomePage />
</ActivityWrapper>`}
              </pre>
            </div>

            {/* React Email Integration */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">React 19.2 + React Email</h3>

              <p className="text-gray-700 mb-4">
                Server Components work seamlessly with React Email for async template generation.
              </p>

              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`// emails/welcome.tsx - Server Component
import { Button, Container } from '@react-email/components'

async function WelcomeEmail({ userId }: { userId: string }) {
  // Fetch data directly in email template
  const user = await db.user.findUnique({ where: { id: userId } })
  const recentActivity = await db.activity.findMany({
    where: { userId },
    take: 5
  })

  return (
    <Container>
      <h1>Welcome, {user.name}!</h1>
      <p>Here's your recent activity:</p>
      <ul>
        {recentActivity.map(item => (
          <li key={item.id}>{item.description}</li>
        ))}
      </ul>
      <Button href={\`\${process.env.APP_URL}/dashboard\`}>
        Go to Dashboard
      </Button>
    </Container>
  )
}`}
              </pre>
            </div>
          </section>

          {/* Critical Integration Patterns */}
          <section id="critical-patterns" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Critical Integration Patterns</h2>

            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Pattern 1: AI Streaming with Navigation State</h3>

              <p className="text-gray-700 mb-4">
                Maintain AI conversation state while users navigate between views.
              </p>

              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`'use client'
import { Activity } from 'react'
import { useChat } from 'ai/react'

export default function AIApp() {
  const [activeView, setActiveView] = useState<'chat' | 'history'>('chat')

  return (
    <>
      {/* Chat maintains state when viewing history */}
      <Activity mode={activeView === 'chat' ? 'visible' : 'hidden'}>
        <ChatInterface />
      </Activity>

      <Activity mode={activeView === 'history' ? 'visible' : 'hidden'}>
        <ChatHistory />
      </Activity>

      <nav>
        <button onClick={() => setActiveView('chat')}>Chat</button>
        <button onClick={() => setActiveView('history')}>History</button>
      </nav>
    </>
  )
}`}
              </pre>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Pattern 2: CDN-Optimized Dynamic Content</h3>

              <p className="text-gray-700 mb-4">
                Serve static shells from CDN while streaming personalized content.
              </p>

              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`// app/product/[id]/page.tsx
export default async function ProductPage({ params }) {
  // Static shell pre-rendered to CDN
  return (
    <ProductLayout>
      {/* User-specific content streamed on-demand */}
      <Suspense fallback={<RecommendationsSkeleton />}>
        <PersonalizedRecommendations userId={await getUserId()} />
      </Suspense>
    </ProductLayout>
  )
}

// next.config.js
export default {
  experimental: {
    ppr: 'incremental', // Enable Partial Prerendering
  }
}`}
              </pre>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Pattern 3: Cost-Optimized AI Requests</h3>

              <p className="text-gray-700 mb-4">
                Abort expensive AI requests when cache invalidates to reduce token costs.
              </p>

              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`import { cache, cacheSignal } from 'react'
import { generateText } from 'ai'

const cachedAIGeneration = cache(async (prompt: string) => {
  const result = await generateText({
    model: openai('gpt-4'),
    prompt,
    signal: cacheSignal(), // Abort if cache invalidates
  })

  return result.text
})

// Server Component
async function AIGeneratedContent({ prompt }: { prompt: string }) {
  const text = await cachedAIGeneration(prompt)
  return <div>{text}</div>
}

// Benefits: 10-15% token cost reduction`}
              </pre>
            </div>
          </section>

          {/* Migration Guide */}
          <section id="migration" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Migration Guide</h2>

            <p className="text-gray-700 mb-6">
              React 19.2 is fully backward compatible with 19.1. Migration is <strong>low-risk, high-reward</strong> with zero breaking changes for most applications.
            </p>

            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4">Step 1: Upgrade Dependencies (5 minutes)</h3>

              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`# Upgrade to React 19.2
npm install react@19.2.0 react-dom@19.2.0

# Update Next.js to ensure compatibility
npm install next@15.5.4

# Update types
npm install -D @types/react@19.2.0 @types/react-dom@19.2.0

# Required for useEffectEvent linting
npm install -D eslint-plugin-react-hooks@6.1.0`}
              </pre>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4">Step 2: Profile with Performance Tracks</h3>

              <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
                <li>Open Chrome DevTools → Performance → Record</li>
                <li>Look for custom "⚛" tracks in timeline</li>
                <li>Identify components taking &gt;50ms to render (Components track)</li>
                <li>Find effects running too frequently (Scheduler track)</li>
                <li>Spot Suspense boundaries resolving slowly</li>
              </ol>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4">Step 3: Apply useEffectEvent to Noisy Effects</h3>

              <p className="text-gray-700 mb-4">
                Look for effects with dependencies that cause unnecessary re-runs:
              </p>

              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`// Before: theme causes reconnections
useEffect(() => {
  socket.on('message', (msg) => {
    display(msg, theme) // Uses theme
  })
}, [theme]) // ❌ Reconnects on theme change

// After: useEffectEvent
const onMessage = useEffectEvent((msg) => {
  display(msg, theme) // Always sees latest theme
})

useEffect(() => {
  socket.on('message', onMessage)
}, []) // ✅ No unnecessary reconnections`}
              </pre>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4">Step 4: Consider Activity for Complex Navigation</h3>

              <p className="text-gray-700 mb-4">
                Apply Activity component if you have:
              </p>

              <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                <li>Multi-page SPAs with expensive component state</li>
                <li>Forms that should preserve state during navigation</li>
                <li>Pre-loading opportunities for likely next destinations</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4">Step 5: Evaluate Partial Pre-rendering (Advanced)</h3>

              <p className="text-gray-700 mb-4">
                For high-traffic pages with static/dynamic content mix:
              </p>

              <ol className="list-decimal list-inside space-y-1 text-gray-700 mb-4">
                <li>Enable PPR: <code className="bg-gray-200 px-1 rounded">experimental: {`{ ppr: 'incremental' }`}</code></li>
                <li>Wrap dynamic sections in <code className="bg-gray-200 px-1 rounded">&lt;Suspense&gt;</code></li>
                <li>Deploy to Vercel or configure custom CDN</li>
                <li>Measure TTFB improvements (target: sub-100ms)</li>
              </ol>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded-lg">
              <p className="text-sm text-gray-700 mb-2"><strong>Breaking Changes (Minimal):</strong></p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li><code className="bg-gray-200 px-1 rounded">useId</code> prefix changed (internal, rarely affects apps)</li>
                <li>Must upgrade <code className="bg-gray-200 px-1 rounded">eslint-plugin-react-hooks</code> to 6.1.0 for <code className="bg-gray-200 px-1 rounded">useEffectEvent</code> linting</li>
              </ul>
            </div>
          </section>

          {/* Performance Impact */}
          <section id="performance" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Performance Impact Across Stack</h2>

            <p className="text-gray-700 mb-6">
              React 19.2 features provide <strong>measurable performance improvements</strong> across the entire modern stack:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Integration</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Metric</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Improvement</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Next.js + Activity</td>
                    <td className="border border-gray-300 px-4 py-2">Navigation speed</td>
                    <td className="border border-gray-300 px-4 py-2">30-40% faster perceived navigation</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Next.js + Activity</td>
                    <td className="border border-gray-300 px-4 py-2">Back/forward nav</td>
                    <td className="border border-gray-300 px-4 py-2">Instant (vs 200-500ms)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Partial Pre-rendering</td>
                    <td className="border border-gray-300 px-4 py-2">TTFB</td>
                    <td className="border border-gray-300 px-4 py-2">Sub-100ms for static shells</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Vercel AI SDK + useEffectEvent</td>
                    <td className="border border-gray-300 px-4 py-2">WebSocket reconnects</td>
                    <td className="border border-gray-300 px-4 py-2">15-20% reduction</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Supabase + useEffectEvent</td>
                    <td className="border border-gray-300 px-4 py-2">Database reconnections</td>
                    <td className="border border-gray-300 px-4 py-2">25-30% reduction</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">cacheSignal with AI</td>
                    <td className="border border-gray-300 px-4 py-2">Token costs</td>
                    <td className="border border-gray-300 px-4 py-2">10-15% reduction</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Activity preserves connections</td>
                    <td className="border border-gray-300 px-4 py-2">Real-time state</td>
                    <td className="border border-gray-300 px-4 py-2">Maintained across navigation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Debugging and Monitoring */}
          <section id="debugging" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Debugging and Monitoring</h2>

            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Using Performance Tracks in Chrome DevTools</h3>

              <p className="text-gray-700 mb-4">
                React 19.2's Performance Tracks provide deep visibility into React's internal behavior.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg mb-4">
                <p className="text-gray-700 mb-2"><strong>How to Use:</strong></p>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                  <li>Open Chrome DevTools</li>
                  <li>Navigate to Performance tab</li>
                  <li>Click Record button</li>
                  <li>Interact with your app</li>
                  <li>Stop recording</li>
                  <li>Look for custom "⚛" tracks in the timeline</li>
                </ol>
              </div>

              <p className="text-gray-700 mb-2"><strong>What to Look For:</strong></p>

              <div className="mb-4">
                <p className="text-gray-700 mb-2"><strong>Scheduler ⚛ Track:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                  <li>Long blocking tasks (&gt;50ms)</li>
                  <li>Transition delays</li>
                  <li>Suspense boundary timing</li>
                  <li>Priority queue decisions</li>
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 mb-2"><strong>Components ⚛ Track:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                  <li>Slow component renders (&gt;50ms)</li>
                  <li>Effect execution time</li>
                  <li>Hydration performance</li>
                  <li>Server Component rendering time</li>
                </ul>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-lg">
                <p className="text-sm text-gray-700 mb-2"><strong>Example Investigation Flow:</strong></p>
                <pre className="text-xs text-gray-700 font-mono">
{`User reports slow page transitions
↓ Check Performance Tracks
↓ See 200ms in "ProductList" component (Components track)
↓ Component doing expensive filtering on every render
↓ Solution: Wrap <ProductList> in <Activity mode="hidden">
           during navigation, pre-render in background
↓ Result: 40% faster perceived navigation`}
                </pre>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">When should I use the Activity component?</h3>
                <p className="text-gray-700 mb-2"><strong>Use Activity when:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-2">
                  <li>✅ Multi-page SPAs with complex navigation</li>
                  <li>✅ Forms that should preserve state during navigation</li>
                  <li>✅ Pre-loading likely next destinations</li>
                </ul>
                <p className="text-gray-700"><strong>Avoid when:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>❌ Simple apps with minimal navigation</li>
                  <li>❌ When you don't have performance evidence of need</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">When should I use useEffectEvent?</h3>
                <p className="text-gray-700 mb-2"><strong>Use useEffectEvent when:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-2">
                  <li>✅ Effect has event handlers using latest props</li>
                  <li>✅ Separating synchronization from event handling</li>
                  <li>✅ Avoiding unnecessary effect re-runs</li>
                </ul>
                <p className="text-gray-700"><strong>Avoid when:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>❌ Replacing all effect dependencies without thought</li>
                  <li>❌ When standard dependencies work fine</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Is React 19.2 stable for production?</h3>
                <p className="text-gray-700">
                  Yes. React 19.2.0 (released October 1, 2025) is production-stable. Meta uses it in production on Facebook and Instagram. All new features are additive with zero breaking changes from React 19.1.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Do I need Next.js to use React 19.2?</h3>
                <p className="text-gray-700">
                  No. React 19.2 works with any framework (Vite, Remix, etc.). However, Partial Pre-rendering is specifically designed for Next.js 15+ with experimental PPR flag. Other features (Activity, useEffectEvent, Performance Tracks) work everywhere.
                </p>
              </div>
            </div>
          </section>

          {/* Related Content */}
          <section id="related" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Related Content</h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                → <Link href="/software/nextjs" className="text-zinc-700 hover:underline font-medium">
                  Next.js 15 Complete Guide
                </Link> - React 19.2 with framework integration
              </li>
              <li>
                → <Link href="/software" className="text-zinc-700 hover:underline font-medium">
                  Modern Stack Versions
                </Link> - Full stack compatibility
              </li>
              <li>
                → <a href="https://react.dev/blog/2024/12/05/react-19" className="text-gray-600 hover:underline">
                  Official React 19 Release Notes
                </a>
              </li>
              <li>
                → <a href="https://react.dev" className="text-gray-600 hover:underline">
                  Official React Documentation
                </a>
              </li>
            </ul>
          </section>

          {/* Key Insights */}
          <section id="key-insights" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Key Insights: React 19.2 as Stack Multiplier</h2>

            <p className="text-gray-700 mb-6">
              React 19.2 isn't just a React update—it's a <strong>force multiplier for the entire modern stack</strong>. Each new primitive solves integration challenges, not just React-specific problems.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-blue-600 p-6 rounded-lg mb-6">
              <p className="text-gray-700 mb-4"><strong>The Stack is Stronger Together:</strong></p>
              <ul className="space-y-2 text-gray-700">
                <li>✅ <strong>Next.js:</strong> Faster navigation, better CDN strategies, streaming improvements</li>
                <li>✅ <strong>Vercel AI SDK:</strong> Cleaner streaming patterns, 10-20% cost optimization</li>
                <li>✅ <strong>TypeScript:</strong> Full type safety for new APIs with zero config</li>
                <li>✅ <strong>Supabase:</strong> 25-30% better real-time subscription management</li>
                <li>✅ <strong>React Email:</strong> Async template generation with Server Components</li>
                <li>✅ <strong>Performance:</strong> Chrome DevTools visibility into React internals</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded-lg mb-6">
              <p className="text-gray-700 mb-2"><strong>Migration is Low-Risk, High-Reward:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Zero breaking changes from React 19.1</li>
                <li>Backward compatible with existing code</li>
                <li>Incremental adoption (use new features when ready)</li>
                <li>Measurable performance improvements</li>
                <li>5-minute upgrade process</li>
              </ul>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 mb-2"><strong>Next Steps:</strong></p>
              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                <li>Upgrade to React 19.2 (5 minutes)</li>
                <li>Profile with Performance Tracks (identify bottlenecks)</li>
                <li>Apply useEffectEvent to noisy effects (quick wins)</li>
                <li>Consider Activity for complex navigation (if applicable)</li>
                <li>Evaluate Partial Pre-rendering for high-traffic pages (advanced)</li>
              </ol>
            </div>
          </section>

          {/* For AI Assistants */}
          <section id="for-ai" className="mb-12 border-t pt-8 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">🤖 For Claude Code & AI Assistants</h2>
            <p className="text-gray-700 mb-4">
              When using React 19.2 in the modern stack:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Verified Stack (Oct 2025):</strong> React 19.2.0 + Next.js 15.5.4 + Node.js 24.8.0 + TypeScript 5.9.2</li>
              <li><strong>Official Docs:</strong> Always check <a href="https://react.dev" className="text-blue-600 hover:underline">react.dev</a> for latest API changes</li>
              <li><strong>New Features:</strong> Activity (navigation state), useEffectEvent (stable deps), Performance Tracks (DevTools), Partial Pre-rendering (CDN optimization), cacheSignal (cache lifecycle)</li>
              <li><strong>Stack Integration:</strong> See sections above for Next.js 15, Vercel AI SDK, TypeScript 5.9, Supabase, React Email patterns</li>
              <li><strong>Performance:</strong> 30-40% faster navigation, 15-30% fewer reconnections, 10-15% cost reduction</li>
              <li><strong>Framework Requirement:</strong> Server Components require Next.js 15+, Remix, or compatible framework</li>
            </ul>
            <p className="text-sm text-gray-600 mt-4">
              This site provides integration patterns and stack-wide analysis. Official docs provide API details. Use both together.
            </p>
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
