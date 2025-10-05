import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

// Dependencies (October 5, 2025):
// - Tailwind CSS: v4.1.13
// - Next.js: 15.5.4
// - React: 19.2.0
// Last verified: 2025-10-05

export const metadata: Metadata = {
  title: "Tailwind CSS v4.1.13 - 100x Faster with Oxide Engine | Avolve.io",
  description: "Tailwind CSS v4.1.13 with Oxide engine: 100x faster builds, CSS-first configuration, container queries, 3D transforms. Complete architectural revolution. Updated October 2025.",
  keywords: ["Tailwind CSS v4", "Oxide engine", "CSS-first config", "utility CSS", "100x faster builds", "container queries"],
};

export default function TailwindPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "headline": "Tailwind CSS: CSS Framework with Revolutionary Performance",
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-05",
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "Tailwind CSS",
        "applicationCategory": "DeveloperApplication",
        "softwareVersion": "v4.1.13",
        "operatingSystem": "Node.js 24.8.0"
      }
    ]
  };

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Software", url: "/software" },
        { name: "Tailwind CSS", url: "/software/tailwind" }
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <time className="text-sm text-gray-600" dateTime="2025-10-05">
          Last updated: October 5, 2025
        </time>

        <article className="mt-4">
          <h1 className="text-4xl font-bold mb-4 text-teal-700">Tailwind CSS v4.1.13</h1>
          <p className="text-xl text-gray-700 mb-12">
            Revolutionary CSS framework with 100x faster builds, CSS-first configuration, and Oxide engine
          </p>

          <section id="overview" className="mb-12 bg-teal-50 border-l-4 border-teal-600 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Architectural Revolution</h2>
            <p className="text-gray-700 mb-4">
              <strong>Tailwind CSS v4.1.13</strong> (September 2025) represents a complete ground-up rewrite delivering <strong>100x faster incremental builds</strong> through the Rust-powered Oxide engine. The revolutionary CSS-first configuration eliminates JavaScript config files entirely.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>22.47 million weekly downloads</strong> (nearly 3x growth from 8 million)</li>
              <li>• <strong>51% market share</strong> according to State of CSS 2025</li>
              <li>• <strong>182x faster no-change rebuilds</strong> (35ms → 192µs)</li>
              <li>• <strong>CSS-first configuration</strong> - no more tailwind.config.js</li>
            </ul>
          </section>

          <section id="oxide-engine" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Oxide Engine Performance</h2>

            <div className="bg-purple-50 border-l-4 border-purple-600 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Microsecond-Level Build Performance</h3>
              <p className="text-gray-700 mb-3">
                The Oxide engine, written in Rust with TypeScript integration, delivers performance that fundamentally changes the development experience:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-sm mt-3">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-3 py-2 text-left">Operation</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">v3.x (Before)</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">v4.1.13 (After)</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Improvement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Full builds</td>
                      <td className="border border-gray-300 px-3 py-2">378ms</td>
                      <td className="border border-gray-300 px-3 py-2">100ms</td>
                      <td className="border border-gray-300 px-3 py-2"><strong>3.78x faster</strong></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Incremental + new CSS</td>
                      <td className="border border-gray-300 px-3 py-2">44ms</td>
                      <td className="border border-gray-300 px-3 py-2">5ms</td>
                      <td className="border border-gray-300 px-3 py-2"><strong>8.8x faster</strong></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">No-change rebuilds</td>
                      <td className="border border-gray-300 px-3 py-2">35ms</td>
                      <td className="border border-gray-300 px-3 py-2">192µs</td>
                      <td className="border border-gray-300 px-3 py-2"><strong>182x faster</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-bold mb-2">Architecture Innovations:</h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Custom CSS parsing 2x faster than PostCSS</li>
                  <li>Lightning CSS integration replacing multiple dependencies</li>
                  <li>Persistent caching with intelligent invalidation</li>
                  <li>Context-aware class detection for JavaScript frameworks</li>
                  <li>35% smaller installation footprint despite native binaries</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="css-first-config" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">CSS-First Configuration Revolution</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-bold text-red-800 mb-2">❌ Before (v3.x)</h4>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
{`// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a'
        }
      }
    }
  }
}`}
                </pre>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-bold text-green-800 mb-2">✅ After (v4.1.13)</h4>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
{`/* styles.css */
@import "tailwindcss";

@theme {
  --color-brand-50: #eff6ff;
  --color-brand-500: #3b82f6;
  --color-brand-900: #1e3a8a;
}`}
                </pre>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Modern CSS Variable Integration</h3>
              <p className="text-sm text-gray-700 mb-3">
                All design tokens exposed as native CSS custom properties, automatically used in utilities:
              </p>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
{`/* Automatic usage in utilities */
.text-xs { font-size: var(--font-size-xs); }
.p-4 { padding: var(--spacing-4); }
.text-brand-500 { color: var(--color-brand-500); }`}
              </pre>
            </div>
          </section>

          <section id="modern-features" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Modern CSS Capabilities</h2>

            <div className="space-y-6">
              <div className="border-l-4 border-cyan-600 pl-4">
                <h3 className="text-xl font-bold mb-3">Container Queries (Built-in Core)</h3>
                <p className="text-gray-700 mb-3">
                  Container queries are now first-class citizens, no plugin needed:
                </p>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
{`<!-- Container-based responsive design -->
<div class="@container">
  <div class="@sm:grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3">
    <!-- Responds to container size, not viewport -->
  </div>
</div>

<!-- Named containers -->
<div class="@container/sidebar">
  <nav class="@md/sidebar:flex @lg/sidebar:flex-col">
    <!-- Responds to 'sidebar' container specifically -->
  </nav>
</div>`}
                </pre>
              </div>

              <div className="border-l-4 border-purple-600 pl-4">
                <h3 className="text-xl font-bold mb-3">3D Transform System</h3>
                <p className="text-gray-700 mb-3">
                  Comprehensive 3D transform utilities for sophisticated animations:
                </p>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
{`<!-- 3D rotation and perspective -->
<div class="perspective-1000">
  <div class="rotate-x-45 rotate-y-30 scale-z-150">
    3D transformed element
  </div>
</div>`}
                </pre>
              </div>

              <div className="border-l-4 border-orange-600 pl-4">
                <h3 className="text-xl font-bold mb-3">OKLCH Color Space</h3>
                <p className="text-gray-700 mb-3">
                  Modern color system with wider gamut and better vibrancy, automatic P3 display support:
                </p>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
{`@theme {
  --color-red-500: oklch(62.8% 0.257 27.85);
  --color-blue-500: oklch(67.5% 0.205 263.4);
}`}
                </pre>
              </div>
            </div>
          </section>

          <section id="integration" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Stack Integration</h2>

            <div className="bg-teal-50 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-bold mb-2">With Next.js 15.5 + React 19</h3>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
{`# Installation
npm install tailwindcss@next

# Configuration (app/globals.css)
@import "tailwindcss";

@theme {
  /* Your design tokens here */
}

# Automatic content detection - no config needed
# Detects: .js, .jsx, .ts, .tsx, .vue, .svelte files
# Handles: Dynamic classes like grid-cols-15, mt-29`}
              </pre>
            </div>

            <div className="space-y-2 text-gray-700">
              <p>• Works with <Link href="/software/shadcn-ui" className="text-gray-600 hover:underline">shadcn/ui</Link> for component styling</p>
              <p>• Integrates with <Link href="/software/nextjs" className="text-gray-600 hover:underline">Next.js</Link> Turbopack for microsecond builds</p>
              <p>• Compatible with <Link href="/software/react" className="text-gray-600 hover:underline">React 19</Link> Server Components</p>
            </div>
          </section>

          <section id="for-ai" className="mb-12 border-t pt-8 bg-purple-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">🤖 For AI Assistants</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Version:</strong> v4.1.13 (September 2025), Oxide engine with 100x performance</li>
              <li><strong>Configuration:</strong> CSS-first with @import &quot;tailwindcss&quot; and @theme directive</li>
              <li><strong>Performance:</strong> 182x faster no-change rebuilds (35ms → 192µs)</li>
              <li><strong>Modern features:</strong> Container queries (core), 3D transforms, OKLCH colors</li>
              <li><strong>Integration:</strong> Works with Next.js 15.5 Turbopack, shadcn/ui, React 19</li>
            </ul>
          </section>

          <section id="relationships" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Stack Relationships</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Part of <Link href="/software" className="text-zinc-700 hover:underline">Software</Link>:</strong> CSS framework layer</li>
              <li>• <strong>Styles <Link href="/software/shadcn-ui" className="text-gray-600 hover:underline">shadcn/ui</Link>:</strong> Component styling system</li>
              <li>• <strong>Integrates with <Link href="/software/nextjs" className="text-gray-600 hover:underline">Next.js</Link>:</strong> Turbopack for microsecond builds</li>
              <li>• <strong>Works with <Link href="/software/react" className="text-gray-600 hover:underline">React</Link>:</strong> Server Components, utility classes</li>
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
