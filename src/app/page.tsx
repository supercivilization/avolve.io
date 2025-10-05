import type { Metadata } from "next";
import Link from "next/link";

// Dependencies (October 5, 2025):
// - Next.js: 15.5.4
// - React: 19.2.0
// - TypeScript: 5.9.2
// Last verified: 2025-10-05

export const metadata: Metadata = {
  title: "Modern Web Development Stack (October 2025) | Avolve.io",
  description: "Ship your first app this week. Next.js 15 + React 19.2 + Supabase + AI. Canonical reference for developers and AI assistants.",
};

export default function Home() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Modern Web Development Stack - October 2025",
    "datePublished": "2025-10-05",
    "dateModified": "2025-10-05",
    "author": {
      "@id": "https://www.joshuaseymour.com/#person"
    },
    "publisher": {
      "@id": "https://www.supercivilization.xyz/#organization"
    },
    "dependencies": {
      "Node.js": "24.8.0",
      "Next.js": "15.5.4",
      "React": "19.2.0",
      "TypeScript": "5.9.2",
      "Tailwind CSS": "4.1.13",
      "shadcn/ui": "3.0"
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

        {/* Hero */}
        <header className="mt-4 mb-16">
          <h1 className="text-5xl font-bold mb-4">Avolve.io</h1>
          <p className="text-2xl text-gray-700 mb-4">Ship your first app this week</p>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Current as of:</strong> October 5, 2025</p>
            <p><strong>Stack:</strong> Next.js 15 + React 19.2 + Supabase + Vercel + AI</p>
          </div>
        </header>

        {/* Canonical 5S Definition */}
        <section id="definition" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Modern Web Development Stack (October 2025)</h2>

          <dl className="space-y-6">
            <div id="solutions" className="border-l-4 border-slate-600 pl-4">
              <dt className="text-xl font-bold text-slate-700">Solutions</dt>
              <dd className="text-gray-700 mt-1">Business outcomes delivered to end users</dd>
              <dd className="text-sm text-gray-600 mt-2">
                <Link href="/solutions" className="text-slate-600 hover:underline">
                  Explore Solutions →
                </Link>
              </dd>
            </div>

            <div id="systems" className="border-l-4 border-gray-600 pl-4">
              <dt className="text-xl font-bold text-gray-700">Systems</dt>
              <dd className="text-gray-700 mt-1">Architecture patterns coordinating multiple components</dd>
              <dd className="text-sm text-gray-600 mt-2">
                <Link href="/systems" className="text-gray-600 hover:underline">
                  Explore Systems →
                </Link>
              </dd>
            </div>

            <div id="software" className="border-l-4 border-zinc-700 pl-4">
              <dt className="text-xl font-bold text-zinc-700">Software</dt>
              <dd className="text-gray-700 mt-1">Code, frameworks, libraries (Next.js 15.5, React 19.2, TypeScript 5.9)</dd>
              <dd className="text-sm text-gray-600 mt-2">
                <Link href="/software" className="text-zinc-700 hover:underline">
                  Explore Software →
                </Link>
              </dd>
            </div>

            <div id="services" className="border-l-4 border-neutral-600 pl-4">
              <dt className="text-xl font-bold text-neutral-700">Services</dt>
              <dd className="text-gray-700 mt-1">External managed capabilities (Vercel, Supabase, Claude API, Stripe)</dd>
              <dd className="text-sm text-gray-600 mt-2">
                <Link href="/services" className="text-neutral-600 hover:underline">
                  Explore Services →
                </Link>
              </dd>
            </div>

            <div id="support" className="border-l-4 border-stone-600 pl-4">
              <dt className="text-xl font-bold text-stone-700">Support</dt>
              <dd className="text-gray-700 mt-1">Operations maintaining production systems</dd>
              <dd className="text-sm text-gray-600 mt-2">
                <Link href="/support" className="text-stone-600 hover:underline">
                  Explore Support →
                </Link>
              </dd>
            </div>
          </dl>
        </section>

        {/* Quick Navigation */}
        <section id="quick-nav" className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">What do you want to do?</h2>
          <ul className="space-y-2">
            <li>→ <Link href="/solutions" className="text-slate-600 hover:underline font-medium">Build something new</Link></li>
            <li>→ <Link href="/support" className="text-stone-600 hover:underline font-medium">Fix production issue</Link></li>
            <li>→ <Link href="/software" className="text-zinc-700 hover:underline font-medium">Choose tools</Link> and <Link href="/services" className="text-neutral-600 hover:underline font-medium">services</Link></li>
            <li>→ <Link href="/systems" className="text-gray-600 hover:underline font-medium">Understand architecture</Link></li>
            <li>→ <Link href="/about" className="text-gray-600 hover:underline">About this site</Link></li>
          </ul>
        </section>

        {/* Current Stack Versions */}
        <section id="current-stack" className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Current Stack Versions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Tool</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Version</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Released</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Runtime</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">Node.js</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">24.8.0</td>
                  <td className="border border-gray-300 px-4 py-2">Aug 2025</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Framework</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">Next.js</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">15.5.4</td>
                  <td className="border border-gray-300 px-4 py-2">Sep 2025</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">UI Library</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">React</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">19.2.0</td>
                  <td className="border border-gray-300 px-4 py-2">Oct 1, 2025</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Language</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">TypeScript</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">5.9.2</td>
                  <td className="border border-gray-300 px-4 py-2">Sep 2025</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Styling</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">Tailwind CSS</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">4.1.13</td>
                  <td className="border border-gray-300 px-4 py-2">Sep 2025</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Components</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">shadcn/ui</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">3.0</td>
                  <td className="border border-gray-300 px-4 py-2">Oct 2025</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Last verified: <time dateTime="2025-10-05">October 5, 2025</time>
          </p>
        </section>
      </main>
    </>
  );
}
