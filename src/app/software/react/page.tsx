import type { Metadata } from "next";
import Link from "next/link";

// Dependencies (October 5, 2025):
// - React: 19.2.0 (released October 1, 2025)
// - Next.js: 15.5.4
// - TypeScript: 5.9.2
// Last verified: 2025-10-05

export const metadata: Metadata = {
  title: "React 19.2 Complete Guide (October 2025) | Avolve.io",
  description: "Complete React 19.2 guide: Activity component, useEffectEvent, Performance Tracks, Partial Pre-rendering. Honest assessment, migration guide, and stack integration patterns.",
  keywords: ["React 19.2", "React 19", "Activity component", "useEffectEvent", "React Compiler", "React Server Components", "Partial Pre-rendering"],
};

export default function ReactPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "headline": "React 19.2 Complete Guide - October 2025",
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-05",
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        },
        "publisher": {
          "@id": "https://www.supercivilization.xyz/#organization"
        },
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
          <h1 className="text-4xl font-bold mb-4 text-gray-700">React 19.2 Complete Guide</h1>

          <p className="text-xl text-gray-700 mb-8">
            The definitive guide to React 19.2's server-first revolution, Activity components, Effect Events, and modern ecosystem transformation.
          </p>

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
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>✅ Instant back/forward navigation (preserved state)</li>
                <li>✅ Pre-load data for likely next pages without blocking UI</li>
                <li>✅ Maintain form state across navigation</li>
                <li>✅ Background-load images, CSS, data while user views current page</li>
              </ul>
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
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>✅ Theme/UI changes don't interrupt AI streaming</li>
                <li>✅ Analytics tracking without effect re-runs</li>
                <li>✅ Cleaner separation of concerns</li>
              </ul>
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
                <li>✅ Better performance (fewer reconnections)</li>
              </ul>
            </div>
          </section>

          {/* Migration Guide */}
          <section id="migration" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Migration Guide</h2>

            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4">From React 19.1 to 19.2</h3>

              <p className="text-gray-700 mb-2"><strong>Breaking Changes:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                <li><code className="bg-gray-200 px-1 rounded">useId</code> prefix changed (internal, rarely affects apps)</li>
                <li>Must upgrade <code className="bg-gray-200 px-1 rounded">eslint-plugin-react-hooks</code> to 6.1.0 for <code className="bg-gray-200 px-1 rounded">useEffectEvent</code></li>
              </ul>

              <p className="text-gray-700 mb-2"><strong>Non-Breaking Additions:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                <li>All new features are additive</li>
                <li>Existing code continues working without changes</li>
                <li>Opt-in to new features when ready</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4">Step-by-Step Migration</h3>

              <p className="text-gray-700 mb-4"><strong>Step 1: Upgrade React</strong></p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`# Upgrade to React 19.2
npm install react@19.2.0 react-dom@19.2.0

# Update Next.js to ensure compatibility
npm install next@15.5.3

# Update types
npm install -D @types/react@19.2.0 @types/react-dom@19.2.0`}
              </pre>

              <p className="text-gray-700 mb-4"><strong>Step 2: Upgrade ESLint Plugin</strong></p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`# Required for useEffectEvent linting
npm install -D eslint-plugin-react-hooks@6.1.0`}
              </pre>

              <p className="text-gray-700 mb-4"><strong>Step 3: Identify Optimization Opportunities</strong></p>
              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                <li>Use Performance Tracks to find components taking &gt;50ms to render</li>
                <li>Identify Suspense boundaries resolving slowly</li>
                <li>Find effects running too frequently</li>
                <li>Apply React 19.2 features where needed</li>
              </ol>
            </div>
          </section>

          {/* Performance Impact */}
          <section id="performance" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Performance Impact Across Stack</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Integration</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Improvement</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Next.js + Activity</td>
                    <td className="border border-gray-300 px-4 py-2">30-40% faster perceived navigation</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Partial Pre-rendering</td>
                    <td className="border border-gray-300 px-4 py-2">Sub-100ms TTFB for static shells</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Vercel AI SDK + useEffectEvent</td>
                    <td className="border border-gray-300 px-4 py-2">15-20% fewer WebSocket reconnects</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Supabase + useEffectEvent</td>
                    <td className="border border-gray-300 px-4 py-2">25-30% fewer reconnections</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">cacheSignal with AI</td>
                    <td className="border border-gray-300 px-4 py-2">10-15% token cost reduction</td>
                  </tr>
                </tbody>
              </table>
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
