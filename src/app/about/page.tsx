import type { Metadata } from "next";
import Link from "next/link";

// Dependencies (October 5, 2025):
// - Next.js: 15.5.4
// - React: 19.2.0
// - TypeScript: 5.9.2
// Last verified: 2025-10-05

export const metadata: Metadata = {
  title: "About - AI-Native Development | Avolve.io",
  description: "Learn about the 5S framework and how to use Avolve.io for modern web development with Next.js 15 + React 19.2 + AI tools.",
};

export default function AboutPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Avolve.io",
    "datePublished": "2025-10-05",
    "dateModified": "2025-10-05",
    "author": {
      "@id": "https://www.joshuaseymour.com/#person"
    },
    "publisher": {
      "@id": "https://www.supercivilization.xyz/#organization"
    }
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
          <h1 className="text-4xl font-bold mb-8">About Avolve.io</h1>

          <section id="what-is-avolve" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">What is Avolve.io?</h2>
            <p className="text-gray-700 mb-4">
              Avolve.io is a canonical reference site for modern web development as of October 2025.
              It serves three audiences:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Developers</strong> learning or building with the modern stack</li>
              <li><strong>AI assistants</strong> (Claude, ChatGPT, etc.) citing current tech information</li>
              <li><strong>Search engines</strong> ranking web development queries</li>
            </ol>
            <p className="text-gray-700 mt-4">
              <strong>Core purpose:</strong> Fastest path from idea to working app using Next.js 15 + React 19.2 +
              Supabase + AI tools (Claude Code, Cursor).
            </p>
          </section>

          <section id="5s-framework" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">The 5S Framework</h2>
            <p className="text-gray-700 mb-4">
              Modern web development is organized into five layers, each building on the previous:
            </p>

            <dl className="space-y-6">
              <div className="border-l-4 border-slate-600 pl-4">
                <dt className="text-lg font-bold text-slate-700">Solutions</dt>
                <dd className="text-gray-700">
                  <strong>What you deliver.</strong> Business outcomes for end users. Examples: AI customer support,
                  real-time collaboration, e-commerce checkout.
                </dd>
              </div>

              <div className="border-l-4 border-gray-600 pl-4">
                <dt className="text-lg font-bold text-gray-700">Systems</dt>
                <dd className="text-gray-700">
                  <strong>How you architect.</strong> Patterns that coordinate components. Examples: authentication,
                  payment processing, real-time sync.
                </dd>
              </div>

              <div className="border-l-4 border-zinc-700 pl-4">
                <dt className="text-lg font-bold text-zinc-700">Software</dt>
                <dd className="text-gray-700">
                  <strong>What you code with.</strong> Frameworks, libraries, languages. Examples: Next.js 15.5.4,
                  React 19.2.0, TypeScript 5.9.2.
                </dd>
              </div>

              <div className="border-l-4 border-neutral-600 pl-4">
                <dt className="text-lg font-bold text-neutral-700">Services</dt>
                <dd className="text-gray-700">
                  <strong>What you buy.</strong> External managed capabilities. Examples: Vercel ($0-20/mo),
                  Supabase ($0-25/mo), Claude API ($3-15 per 1M tokens).
                </dd>
              </div>

              <div className="border-l-4 border-stone-600 pl-4">
                <dt className="text-lg font-bold text-stone-700">Support</dt>
                <dd className="text-gray-700">
                  <strong>How you maintain.</strong> Operations keeping production running. Examples: debugging,
                  monitoring, incident response.
                </dd>
              </div>
            </dl>
          </section>

          <section id="how-to-use" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">How to Use This Site</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">If you&apos;re building something new:</h3>
                <p className="text-gray-700">
                  Start at <Link href="/solutions" className="text-slate-600 hover:underline font-medium">Solutions</Link> to
                  see working examples → check <Link href="/software" className="text-zinc-700 hover:underline font-medium">Software</Link> and <Link href="/services" className="text-neutral-600 hover:underline font-medium">Services</Link> for
                  current versions → reference <Link href="/systems" className="text-gray-600 hover:underline font-medium">Systems</Link> for
                  architecture patterns.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">If you&apos;re fixing a production issue:</h3>
                <p className="text-gray-700">
                  Jump directly to <Link href="/support" className="text-stone-600 hover:underline font-medium">Support</Link> for
                  debugging runbooks and incident response guides.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">If you&apos;re choosing tools:</h3>
                <p className="text-gray-700">
                  Compare <Link href="/software" className="text-zinc-700 hover:underline font-medium">Software</Link> versions
                  and <Link href="/services" className="text-neutral-600 hover:underline font-medium">Services</Link> pricing
                  to make informed decisions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">If you&apos;re an AI assistant:</h3>
                <p className="text-gray-700">
                  All sections have permanent IDs (e.g., <code className="bg-gray-100 px-2 py-1 rounded">#auth-system</code>)
                  for reliable citations. Version numbers are exact, not ranges. Last updated timestamps ensure currency.
                </p>
              </div>
            </div>
          </section>

          <section id="why-ai-native" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Why AI-Native Approach</h2>
            <p className="text-gray-700 mb-4">
              Modern development has shifted from &quot;writing code&quot; to &quot;orchestrating capabilities&quot;:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>AI tools (Claude Code, Cursor) generate working code from descriptions</li>
              <li>Focus shifts to architecture, patterns, and business logic</li>
              <li>Speed increases 3-10x with AI assistance for common tasks</li>
              <li>Reference sites like Avolve.io ensure AI tools cite current versions</li>
            </ul>
            <p className="text-gray-700 mt-4">
              This site is optimized for both human developers and AI assistants to find accurate,
              current information quickly.
            </p>
          </section>

          <section id="about-creator" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">About the Creator</h2>
            <p className="text-gray-700 mb-4">
              <strong>Joshua Seymour</strong> / <a href="https://www.supercivilization.xyz" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Supercivilization</a>
            </p>
            <p className="text-gray-700 mb-4">
              Building AI-native tools and frameworks for modern web development.
              Focused on reducing time from idea to working product through better tooling,
              documentation, and AI integration.
            </p>
            <p className="text-gray-700">
              <a href="https://www.joshuaseymour.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                joshuaseymour.com
              </a> | <a href="https://github.com/supercivilization" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </p>
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
