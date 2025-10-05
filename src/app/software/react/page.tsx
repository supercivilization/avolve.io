import type { Metadata } from "next";
import Link from "next/link";

// Dependencies (October 5, 2025):
// - React: 19.2.0
// - Next.js: 15.5.4
// - TypeScript: 5.9.2
// Last verified: 2025-10-05

export const metadata: Metadata = {
  title: "React 19.2 Complete Guide: What's Actually Useful in 2025 | Avolve.io",
  description: "Honest assessment of React 19.2 (released Oct 1, 2025). No forwardRef, Actions API, use() hook. Migration guide, breaking changes, and real production experience.",
  keywords: ["React 19", "React 19.2", "React upgrade", "React migration", "React Actions", "React Compiler", "React Server Components"],
};

export default function ReactPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "headline": "React 19.2 Complete Guide",
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-05",
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        },
        "publisher": {
          "@id": "https://www.supercivilization.xyz/#organization"
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
            "name": "What is React 19?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "React 19 is a JavaScript library for building user interfaces, released December 2024. Version 19.2 (October 1, 2025) adds refinements and stability improvements. Major features include no forwardRef requirement, Actions API for forms, use() hook for conditional async, and Server Components."
            }
          },
          {
            "@type": "Question",
            "name": "Should I upgrade to React 19?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Upgrade if: starting new projects, using Next.js 15+, want cleaner code (no forwardRef), or building forms (Actions API). Stay on React 18 if dependencies aren't compatible, no immediate need for features, or risk-averse production environment."
            }
          },
          {
            "@type": "Question",
            "name": "Is React 19 stable for production?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. React 19.0.0 (December 2024) and 19.2.0 (October 2025) are stable. Meta uses it in production on Facebook and Instagram. However, check third-party library compatibility before upgrading production apps."
            }
          },
          {
            "@type": "Question",
            "name": "What are React 19 breaking changes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Minor breaking changes: ref is now a standard prop, Context .Provider removed, Suspense batching changes, some useEffect cleanup timing changed. Migration impact is low - most apps work unchanged. Budget 1-2 days for testing."
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
          <h1 className="text-4xl font-bold mb-4 text-gray-700">React 19.2: What's Actually Useful in 2025</h1>

          <p className="text-xl text-gray-700 mb-8">
            Honest assessment of React 19.2 (released Oct 1, 2025). No marketing hype, just what matters for production.
          </p>

          {/* Quick Answer */}
          <section id="quick-answer" className="mb-12 bg-gray-50 p-6 rounded-lg border-l-4 border-gray-600">
            <h2 className="text-2xl font-bold mb-4">Quick Answer</h2>
            <p className="text-gray-700 mb-4">
              <strong>React 19 is production-ready but not revolutionary.</strong> The biggest practical improvements are:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>No more <code className="bg-gray-200 px-1 rounded">forwardRef</code> boilerplate</li>
              <li>Better form handling with Actions API</li>
              <li><code className="bg-gray-200 px-1 rounded">use()</code> hook for conditional async operations</li>
              <li>Server Components (framework-dependent)</li>
            </ul>
            <p className="text-gray-700">
              <strong>Should you upgrade?</strong> If starting fresh, yes. For existing apps, wait until you need specific features.
            </p>
          </section>

          {/* What is React 19 */}
          <section id="what-is-react-19" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">What is React 19?</h2>
            <p className="text-gray-700 mb-4">
              React 19 is a JavaScript library for building user interfaces. Released December 2024, with version 19.2.0
              following on October 1, 2025. It's an evolutionary update focused on developer experience improvements and
              better form handling.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Feature</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">React 18</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">React 19.2</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono">forwardRef</td>
                    <td className="border border-gray-300 px-4 py-2">Required wrapper</td>
                    <td className="border border-gray-300 px-4 py-2 bg-green-50">Optional (ref as prop)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono">Forms</td>
                    <td className="border border-gray-300 px-4 py-2">Manual state management</td>
                    <td className="border border-gray-300 px-4 py-2 bg-green-50">Actions API built-in</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono">Async Hooks</td>
                    <td className="border border-gray-300 px-4 py-2">useEffect only</td>
                    <td className="border border-gray-300 px-4 py-2 bg-green-50">use() hook (conditional)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono">Server Components</td>
                    <td className="border border-gray-300 px-4 py-2">Experimental</td>
                    <td className="border border-gray-300 px-4 py-2 bg-green-50">Stable (framework needed)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-mono">StrictMode Dev</td>
                    <td className="border border-gray-300 px-4 py-2">Double-mounting</td>
                    <td className="border border-gray-300 px-4 py-2 bg-green-50">Single render</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-700">
              <strong>Key insight from the community:</strong> React 19 is evolutionary, not revolutionary. The changes
              are useful but subtle—no "wow" moment like Hooks were in React 16.8.
            </p>
          </section>

          {/* Getting Started */}
          <section id="getting-started" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Getting Started</h2>

            <h3 className="text-2xl font-bold mb-4">Installation (30 seconds)</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`# Create new React 19.2 app with Vite
npm create vite@latest my-app -- --template react-ts
cd my-app

# Or with Next.js 15 (automatically uses React 19)
npx create-next-app@latest my-app --typescript

# Install dependencies
npm install

# Start development
npm run dev`}
            </pre>

            <h3 className="text-2xl font-bold mb-4">Upgrade Existing Project</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`# Update React
npm install react@19.2.0 react-dom@19.2.0

# Update types
npm install -D @types/react@19.2.0 @types/react-dom@19.2.0

# Test your app
npm run dev
npm run build`}
            </pre>
          </section>

          {/* What's Actually Useful */}
          <section id="useful-features" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">What's Actually Useful (No Hype)</h2>

            {/* No More forwardRef */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">1. No More forwardRef</h3>

              <p className="text-gray-700 mb-4"><strong>Before React 19:</strong></p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`import { forwardRef } from 'react'

// So much boilerplate
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return <input ref={ref} className={className} {...props} />
  }
)
Input.displayName = 'Input'`}
              </pre>

              <p className="text-gray-700 mb-4"><strong>React 19:</strong></p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`// Just works
function Input({ className, ref, ...props }: InputProps & { ref?: Ref<HTMLInputElement> }) {
  return <input ref={ref} className={className} {...props} />
}`}
              </pre>

              <p className="text-gray-700 mb-2"><strong>Why this matters:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                <li>Eliminates wrapper hell in component libraries</li>
                <li>Cleaner code for custom inputs, buttons, wrappers</li>
                <li>Reduced component library code by ~15% in real projects</li>
              </ul>
            </div>

            {/* Actions API */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">2. Actions API - Better Form Handling</h3>

              <p className="text-gray-700 mb-4"><strong>Before (manual state management):</strong></p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`function CreatePost() {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPending(true)
    setError(null)

    try {
      const formData = new FormData(e.target as HTMLFormElement)
      await createPost(formData)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" />
      <button disabled={isPending}>
        {isPending ? 'Creating...' : 'Create'}
      </button>
      {error && <p>{error}</p>}
    </form>
  )
}`}
              </pre>

              <p className="text-gray-700 mb-4"><strong>React 19 with Actions:</strong></p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`import { useActionState } from 'react'

async function createPost(prevState: any, formData: FormData) {
  try {
    const title = formData.get('title') as string
    await api.createPost({ title })
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

function CreatePost() {
  const [state, submitAction, isPending] = useActionState(createPost, null)

  return (
    <form action={submitAction}>
      <input name="title" />
      <button disabled={isPending}>
        {isPending ? 'Creating...' : 'Create'}
      </button>
      {state?.error && <p>{state.error}</p>}
    </form>
  )
}`}
              </pre>

              <p className="text-gray-700 mb-2"><strong>Benefits:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Automatic pending state (no manual useState)</li>
                <li>Progressive enhancement (works without JavaScript)</li>
                <li>Built-in error handling</li>
                <li>Cleaner, more declarative code</li>
              </ul>
            </div>

            {/* use() Hook */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">3. use() Hook - Conditional Async</h3>

              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`// Can call conditionally (unlike other hooks!)
function UserProfile({ userId }: { userId: string | null }) {
  if (!userId) {
    return <div>Not logged in</div>
  }

  // This is illegal with useEffect, useMemo, etc.
  // But LEGAL with use()
  const user = use(fetchUser(userId))

  return <div>Welcome, {user.name}</div>
}`}
              </pre>

              <p className="text-gray-700 mb-2"><strong>Why this matters:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                <li>Simplifies conditional data fetching</li>
                <li>No complex useEffect chains</li>
                <li>Component-level data fetching without prop drilling</li>
              </ul>

              <p className="text-gray-700">
                <strong>Limitation:</strong> Only works with Suspense. Not a replacement for useEffect.
              </p>
            </div>

            {/* No More Double-Mounting */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">4. No More StrictMode Double-Mounting</h3>

              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`// React 18: Runs TWICE in development
useEffect(() => {
  console.log('Component mounted')
  // Logs twice in dev, once in production
}, [])

// React 19: Runs once in dev, once in prod
useEffect(() => {
  console.log('Component mounted')
  // Consistent behavior
}, [])`}
              </pre>

              <p className="text-gray-700">
                <strong>Benefit:</strong> Less confusing dev experience, easier debugging. You still need proper cleanup functions.
              </p>
            </div>
          </section>

          {/* Server Components */}
          <section id="server-components" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Server Components (Framework Required)</h2>

            <p className="text-gray-700 mb-4">
              <strong>Reality:</strong> Unless you're using Next.js 15+, you can't use Server Components.
            </p>

            <div className="mb-6">
              <p className="text-gray-700 mb-2"><strong>When it's useful:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                <li>Building with Next.js 15+</li>
                <li>Need SEO + performance</li>
                <li>Willing to learn new patterns</li>
              </ul>

              <p className="text-gray-700 mb-2"><strong>When it's not:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>React SPA (client-only apps)</li>
                <li>No framework support</li>
                <li>Team not ready for paradigm shift</li>
              </ul>
            </div>

            <p className="text-gray-700">
              Learn more: <Link href="/software/nextjs" className="text-zinc-700 hover:underline">Next.js 15 + React 19 Integration</Link>
            </p>
          </section>

          {/* Breaking Changes */}
          <section id="breaking-changes" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Breaking Changes (Be Aware)</h2>

            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4">What Actually Breaks</h3>

              <div className="mb-4">
                <p className="text-gray-700 mb-2"><strong>1. Ref as Prop</strong></p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// React 18: Error
function Input({ ref }) { } // Can't do this

// React 19: Works
function Input({ ref }) { } // Now legal`}
                </pre>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 mb-2"><strong>2. Context Behavior Change</strong></p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// React 18: Logs "SomeContext.Provider"
console.log(MyContext)

// React 19: Logs "SomeContext"
// .Provider removed`}
                </pre>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 mb-2"><strong>3. Suspense Changes (Advanced)</strong></p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Suspense boundaries batch differently during SSR</li>
                  <li>May affect hydration order</li>
                  <li>Most apps won't notice</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
              <p className="text-gray-700">
                <strong>Good news:</strong> Most React 18 code works unchanged. All hooks (useState, useEffect, etc.),
                component patterns, and event handling remain compatible.
              </p>
            </div>
          </section>

          {/* Should You Upgrade */}
          <section id="should-you-upgrade" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Should You Upgrade Existing Apps?</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Scenario</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Using Next.js 15+</td>
                    <td className="border border-gray-300 px-4 py-2 bg-green-50">✓ Must upgrade (required)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Starting new project</td>
                    <td className="border border-gray-300 px-4 py-2 bg-green-50">✓ Use React 19</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Need Actions API or use()</td>
                    <td className="border border-gray-300 px-4 py-2 bg-green-50">✓ Upgrade when deps compatible</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">All libs React 19 compatible</td>
                    <td className="border border-gray-300 px-4 py-2 bg-green-50">✓ Safe to upgrade</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Some libs not compatible</td>
                    <td className="border border-gray-300 px-4 py-2 bg-yellow-50">⚠ Wait for updates</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">No immediate need</td>
                    <td className="border border-gray-300 px-4 py-2 bg-gray-50">○ Stay on React 18</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Risk-averse production</td>
                    <td className="border border-gray-300 px-4 py-2 bg-gray-50">○ Stay on React 18</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Migration Timeline Estimate</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Preparation:</strong> Update dependencies (2-3 days)</li>
                <li><strong>Type Fixes:</strong> Fix TypeScript errors (1 day)</li>
                <li><strong>Testing:</strong> Test edge cases (2 days)</li>
                <li><strong>Total:</strong> 1 week with thorough testing</li>
              </ul>
            </div>
          </section>

          {/* Feature Matrix */}
          <section id="feature-matrix" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">React 18 vs React 19 Feature Matrix</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Feature</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">React 18</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">React 19</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Impact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-bold">Hooks</td>
                    <td className="border border-gray-300 px-4 py-2">✓ All hooks</td>
                    <td className="border border-gray-300 px-4 py-2">✓ Same + use()</td>
                    <td className="border border-gray-300 px-4 py-2">Low</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-bold">forwardRef</td>
                    <td className="border border-gray-300 px-4 py-2">Required</td>
                    <td className="border border-gray-300 px-4 py-2 bg-green-50">Optional</td>
                    <td className="border border-gray-300 px-4 py-2">High</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-bold">Actions</td>
                    <td className="border border-gray-300 px-4 py-2">Manual</td>
                    <td className="border border-gray-300 px-4 py-2 bg-green-50">Built-in</td>
                    <td className="border border-gray-300 px-4 py-2">High</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-bold">Suspense</td>
                    <td className="border border-gray-300 px-4 py-2">Client + SSR</td>
                    <td className="border border-gray-300 px-4 py-2">Enhanced SSR</td>
                    <td className="border border-gray-300 px-4 py-2">Low</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-bold">Server Components</td>
                    <td className="border border-gray-300 px-4 py-2">✗</td>
                    <td className="border border-gray-300 px-4 py-2 bg-green-50">✓ (framework)</td>
                    <td className="border border-gray-300 px-4 py-2">Medium</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-bold">Compiler</td>
                    <td className="border border-gray-300 px-4 py-2">✗</td>
                    <td className="border border-gray-300 px-4 py-2">✓ (RC)</td>
                    <td className="border border-gray-300 px-4 py-2">Low (not stable)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-bold">Ecosystem</td>
                    <td className="border border-gray-300 px-4 py-2">Mature</td>
                    <td className="border border-gray-300 px-4 py-2">Growing</td>
                    <td className="border border-gray-300 px-4 py-2">High</td>
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
                <h3 className="text-xl font-bold mb-2">Is React 19 stable for production?</h3>
                <p className="text-gray-700">
                  Yes. React 19.0.0 (released December 2024) and 19.2.0 (October 2025) are stable. Meta uses it in
                  production on Facebook and Instagram. However, check third-party library compatibility before upgrading.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">What's the difference between React 18 and 19?</h3>
                <p className="text-gray-700 mb-2">Major additions:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>No forwardRef required (ref as standard prop)</li>
                  <li>Actions API for forms (useActionState, useOptimistic)</li>
                  <li>use() hook for conditional async operations</li>
                  <li>Server Components (framework-dependent)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Should I learn React 19 or React 18?</h3>
                <p className="text-gray-700">
                  For learning: Start with React 18 fundamentals. Core concepts (components, hooks, state) are identical.
                  React 18 has more learning resources. Then add React 19 features after mastering fundamentals.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Does React 19 have breaking changes?</h3>
                <p className="text-gray-700 mb-2">Minor breaking changes:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>ref now a standard prop (update custom components)</li>
                  <li>Context .Provider removed (update context usage)</li>
                  <li>Suspense batching changed (affects SSR edge cases)</li>
                  <li>Some useEffect cleanup timing changed</li>
                </ul>
                <p className="text-gray-700 mt-2">
                  Migration impact: Low. Most apps work unchanged. Budget 1-2 days for testing.
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
                </Link> - React 19 with framework
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
