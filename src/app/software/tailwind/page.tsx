import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

// Dependencies (October 6, 2025):
// - Tailwind CSS: v4.1.14
// - Next.js: 15.5.4
// - React: 19.2.0
// Last verified: 2025-10-06

export const metadata: Metadata = {
  title: "Tailwind CSS v4.1.14 - 100x Faster CSS with Oxide Engine | Avolve.io",
  description: "Tailwind CSS v4.1.14 with revolutionary Oxide engine: 100x faster builds, CSS-first configuration, native container queries. Complete architectural rewrite. October 2025.",
  keywords: ["Tailwind CSS v4", "Oxide engine", "CSS-first config", "utility CSS", "100x faster", "container queries", "Rust CSS"],
  alternates: {
    canonical: "https://avolve.io/software/tailwind",
  },
};

export default function TailwindPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "headline": "Tailwind CSS v4.1.14: Utility-First CSS with Revolutionary Performance",
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-05",
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        },
        "description": "Comprehensive analysis of Tailwind CSS v4.1.14's Oxide engine architecture, CSS-first configuration, and 100x performance improvements"
      },
      {
        "@type": "SoftwareApplication",
        "name": "Tailwind CSS",
        "applicationCategory": "DeveloperApplication",
        "softwareVersion": "v4.1.14",
        "operatingSystem": "Node.js 24.8.0",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
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
          <h1 className="text-4xl font-bold mb-4 text-zinc-600">Tailwind CSS v4.1.14</h1>
          <p className="text-xl text-gray-700 mb-12">
            Utility-first CSS framework rebuilt from the ground up with Rust-powered Oxide engine delivering 100x faster builds and CSS-first configuration
          </p>

          {/* Core Identity Section */}
          <section id="overview" className="mb-12 bg-zinc-100 border-l-4 border-zinc-600 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">What It Is</h2>
            <p className="text-gray-700 mb-4">
              <strong>Tailwind CSS v4.1.14</strong> is a utility-first CSS framework completely rewritten in Rust with the Oxide engine, delivering <strong>100x faster incremental builds</strong> and eliminating JavaScript configuration entirely through CSS-first design tokens.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Market Position</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• <strong>22.47M weekly downloads</strong> (3x growth from v3)</li>
                  <li>• <strong>51% market share</strong> (State of CSS 2025)</li>
                  <li>• <strong>182x faster no-change rebuilds</strong> (35ms → 192µs)</li>
                  <li>• <strong>CSS-first configuration</strong> - no more tailwind.config.js</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-800 mb-2">Core Capabilities</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Oxide engine (Rust + TypeScript)</li>
                  <li>• Native container queries (no plugin)</li>
                  <li>• 3D transform system</li>
                  <li>• OKLCH color space with P3 gamut</li>
                  <li>• Automatic content detection</li>
                  <li>• Persistent caching with intelligent invalidation</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Why It Matters Section */}
          <section id="why-matters" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Why It Matters</h2>

            <div className="space-y-6">
              <div className="border-l-4 border-zinc-600 pl-4">
                <h3 className="text-xl font-bold mb-3 text-zinc-700">Architectural Revolution</h3>
                <p className="text-gray-700 mb-3">
                  v4.1.14 represents a complete ground-up rewrite that eliminates the performance bottlenecks of JavaScript-based CSS processing. The Oxide engine delivers microsecond-level rebuilds that fundamentally change the development experience.
                </p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Build Performance Transformation:</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border border-gray-300 px-3 py-2 text-left">Operation</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">v3.x</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">v4.1.14</th>
                          <th className="border border-gray-300 px-3 py-2 text-left">Improvement</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">Full build</td>
                          <td className="border border-gray-300 px-3 py-2">378ms</td>
                          <td className="border border-gray-300 px-3 py-2">100ms</td>
                          <td className="border border-gray-300 px-3 py-2"><strong>3.78x</strong></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">Incremental + new CSS</td>
                          <td className="border border-gray-300 px-3 py-2">44ms</td>
                          <td className="border border-gray-300 px-3 py-2">5ms</td>
                          <td className="border border-gray-300 px-3 py-2"><strong>8.8x</strong></td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2">No-change rebuild</td>
                          <td className="border border-gray-300 px-3 py-2">35ms</td>
                          <td className="border border-gray-300 px-3 py-2">192µs</td>
                          <td className="border border-gray-300 px-3 py-2"><strong>182x</strong></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-slate-600 pl-4">
                <h3 className="text-xl font-bold mb-3 text-slate-700">CSS-First Configuration</h3>
                <p className="text-gray-700 mb-3">
                  The elimination of JavaScript configuration files represents a philosophical shift toward web-native design systems. All customization lives in CSS custom properties, enabling runtime theming and better integration with CSS ecosystem tools.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-neutral-100 p-4 rounded-lg">
                    <h4 className="font-bold text-neutral-700 mb-2">❌ v3.x (JavaScript Config)</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">{`// tailwind.config.js
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#3b82f6'
        }
      }
    }
  }
}`}</pre>
                  </div>
                  <div className="bg-zinc-100 p-4 rounded-lg">
                    <h4 className="font-bold text-zinc-700 mb-2">✅ v4.1.14 (CSS-First)</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">{`/* styles.css */
@import "tailwindcss";

@theme {
  --color-brand-500: #3b82f6;
}

/* Runtime accessible */
.custom { color: var(--color-brand-500); }`}</pre>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-gray-600 pl-4">
                <h3 className="text-xl font-bold mb-3 text-gray-700">Modern CSS Integration</h3>
                <p className="text-gray-700 mb-3">
                  Native support for container queries, 3D transforms, and OKLCH colors eliminates the need for plugins and provides a unified development experience for modern CSS features.
                </p>
                <div className="space-y-3">
                  <div className="bg-zinc-100 p-3 rounded">
                    <h5 className="font-bold text-sm mb-2">Container Queries (No Plugin):</h5>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">{`<div class="@container">
  <div class="@sm:grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3">
    <!-- Responds to container, not viewport -->
  </div>
</div>`}</pre>
                  </div>
                  <div className="bg-gray-100 p-3 rounded">
                    <h5 className="font-bold text-sm mb-2">3D Transform System:</h5>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">{`<div class="perspective-1000">
  <div class="rotate-x-45 rotate-y-30 scale-z-150">
    3D transformed card
  </div>
</div>`}</pre>
                  </div>
                  <div className="bg-neutral-100 p-3 rounded">
                    <h5 className="font-bold text-sm mb-2">OKLCH Color Space (P3 Gamut):</h5>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">{`@theme {
  --color-red-500: oklch(62.8% 0.257 27.85);
  /* Wider gamut, better vibrancy on P3 displays */
}`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Architecture Section */}
          <section id="architecture" className="mb-12 border-t pt-8 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Technical Architecture</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">Oxide Engine Design</h3>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <h4 className="font-bold mb-2">Core Components:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• <strong>Custom CSS Parser:</strong> 2x faster than PostCSS, written in Rust</li>
                    <li>• <strong>Lightning CSS Integration:</strong> Replaces autoprefixer + cssnano + postcss-nested</li>
                    <li>• <strong>Persistent Caching:</strong> Intelligent invalidation with file watching</li>
                    <li>• <strong>Context-Aware Detection:</strong> Framework-specific class extraction (React, Vue, Svelte)</li>
                    <li>• <strong>Native Binaries:</strong> Platform-specific optimization with 35% smaller footprint</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Migration Path from v3.x</h3>
                <div className="bg-slate-100 p-4 rounded border-l-4 border-slate-600">
                  <h4 className="font-bold mb-2">Upgrade Process:</h4>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">{`# Install v4
npm install tailwindcss@next

# Remove old config (backup first)
mv tailwind.config.js tailwind.config.js.bak

# Update globals.css
@import "tailwindcss";

@theme {
  /* Move theme.extend here as CSS variables */
  --color-brand-500: #3b82f6;
}

# Run automated migration (optional)
npx @tailwindcss/upgrade@next`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Framework Integration</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <h4 className="font-bold mb-2">Next.js 15.5 Setup:</h4>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">{`// app/globals.css
@import "tailwindcss";

// Automatic content detection
// No config needed for:
// - app/**/*.{js,ts,jsx,tsx}
// - components/**/*.tsx
// - Dynamic classes work automatically`}</pre>
                  </div>
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <h4 className="font-bold mb-2">Performance with Turbopack:</h4>
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li>• Combined with Turbopack: &lt;1ms CSS updates</li>
                      <li>• HMR preserves state during style changes</li>
                      <li>• Production builds leverage Oxide optimization</li>
                      <li>• Automatic purging with zero config</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Real-World Implementation Section */}
          <section id="implementation" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Real-World Implementation</h2>

            <div className="space-y-6">
              <div className="bg-zinc-100 p-4 rounded-lg border-l-4 border-zinc-600">
                <h3 className="text-lg font-bold mb-3">Complete Next.js 15.5 Integration</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-sm mb-2">1. Installation & Setup:</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">{`npm install tailwindcss@next

# app/globals.css
@import "tailwindcss";

@theme {
  /* Design system tokens */
  --font-sans: system-ui, sans-serif;
  --color-primary: oklch(67.5% 0.205 263.4);

  /* Spacing scale extension */
  --spacing-18: 4.5rem;

  /* Custom breakpoints */
  --breakpoint-3xl: 1920px;
}`}</pre>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm mb-2">2. Component Usage with shadcn/ui:</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">{`// components/ui/card.tsx
export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="@container rounded-lg border bg-white p-4">
      <div className="@sm:grid-cols-1 @md:grid-cols-2">
        {children}
      </div>
    </div>
  );
}

// Automatic container query support
// No configuration needed`}</pre>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm mb-2">3. Advanced Theming (Dark Mode):</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">{`@theme {
  --color-background: oklch(100% 0 0);
  --color-text: oklch(20% 0 0);
}

@media (prefers-color-scheme: dark) {
  @theme {
    --color-background: oklch(20% 0 0);
    --color-text: oklch(100% 0 0);
  }
}

/* Usage: automatic with bg-background and text-text */`}</pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg border-l-4 border-gray-600">
                <h3 className="text-lg font-bold mb-3">Performance Optimization</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-sm mb-2">Development:</h4>
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li>• 182x faster no-change rebuilds (192µs)</li>
                      <li>• Automatic content detection</li>
                      <li>• Persistent caching across restarts</li>
                      <li>• HMR with state preservation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-2">Production:</h4>
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li>• Automatic CSS purging (zero config)</li>
                      <li>• Lightning CSS minification</li>
                      <li>• Critical CSS extraction</li>
                      <li>• Gzip: ~10KB typical application</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Decision Framework Section */}
          <section id="decisions" className="mb-12 border-t pt-8 bg-stone-100 p-6 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Decision Framework</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-zinc-600">✅ Choose Tailwind CSS v4 When:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Rapid prototyping:</strong> Utility-first for fast iteration without context switching</li>
                  <li>• <strong>Design system consistency:</strong> Constrained design tokens prevent one-off styles</li>
                  <li>• <strong>Component libraries:</strong> Works seamlessly with shadcn/ui, Radix UI primitives</li>
                  <li>• <strong>Large teams:</strong> Consistent styling patterns across developers</li>
                  <li>• <strong>Performance critical:</strong> 100x faster builds enable instant feedback loops</li>
                  <li>• <strong>Modern CSS features:</strong> Native container queries, 3D transforms, OKLCH colors</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-neutral-600">❌ Consider Alternatives When:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Existing CSS architecture:</strong> Heavy investment in CSS Modules, styled-components</li>
                  <li>• <strong>Team unfamiliarity:</strong> Learning curve for utility-first paradigm</li>
                  <li>• <strong>Highly custom designs:</strong> Every element requires unique one-off styling</li>
                  <li>• <strong>Legacy browser support:</strong> Need IE11 (Tailwind v4 targets modern browsers)</li>
                  <li>• <strong>Minimal styling needs:</strong> Overkill for simple static sites</li>
                </ul>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-xl font-bold mb-3">Migration Strategy</h3>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <h4 className="font-bold mb-2">Incremental Adoption Path:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    <li>Install v4 alongside existing CSS solution</li>
                    <li>Use Tailwind for new components only</li>
                    <li>Migrate high-change components to Tailwind gradually</li>
                    <li>Convert theme/config to CSS variables over time</li>
                    <li>Remove old CSS architecture when adoption reaches 80%+</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* AI Assistant Reference Section */}
          <section id="for-ai" className="mb-12 border-t pt-8 bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">🤖 For AI Assistants</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold mb-2">Core Facts:</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• <strong>Version:</strong> v4.1.14 (September 2025)</li>
                  <li>• <strong>Engine:</strong> Oxide (Rust + TypeScript)</li>
                  <li>• <strong>Performance:</strong> 100x faster incremental, 182x no-change</li>
                  <li>• <strong>Config:</strong> CSS-first with @theme directive</li>
                  <li>• <strong>Modern Features:</strong> Container queries, 3D, OKLCH</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">Code Generation:</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Use utility classes: <code className="bg-gray-200 px-1 rounded">flex items-center gap-4</code></li>
                  <li>• Responsive: <code className="bg-gray-200 px-1 rounded">sm:grid md:grid-cols-2 lg:grid-cols-3</code></li>
                  <li>• Container queries: <code className="bg-gray-200 px-1 rounded">@container @md:flex</code></li>
                  <li>• Custom vars: Define in @theme, use in utilities</li>
                  <li>• No tailwind.config.js - use CSS @theme instead</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 bg-white p-3 rounded border border-gray-300">
              <h4 className="font-bold text-sm mb-2">Quick Reference Template:</h4>
              <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">{`// Component with Tailwind v4 best practices
export function Component() {
  return (
    <div className="@container rounded-lg bg-white p-4 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900">Title</h2>
      <div className="@md:grid @md:grid-cols-2 gap-4">
        {/* Content responds to container, not viewport */}
      </div>
    </div>
  );
}`}</pre>
            </div>
          </section>

          {/* Stack Relationships Section */}
          <section id="relationships" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Stack Relationships</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-2 text-gray-800">Depends On:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <Link href="/software/nodejs" className="text-slate-600 hover:underline">Node.js 24.8.0</Link> - Runtime for Oxide engine</li>
                  <li>• CSS parsing: Lightning CSS (replaces PostCSS)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-gray-800">Enables:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <Link href="/software/shadcn-ui" className="text-slate-600 hover:underline">shadcn/ui</Link> - Component styling foundation</li>
                  <li>• <Link href="/software/nextjs" className="text-slate-600 hover:underline">Next.js 15.5</Link> - Works with Turbopack for &lt;1ms CSS updates</li>
                  <li>• <Link href="/software/react" className="text-slate-600 hover:underline">React 19</Link> - Server Component styling without runtime overhead</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Part of <Link href="/software" className="text-slate-600 hover:underline">Avolve Software Stack</Link> -
                CSS styling layer for Next.js + React + TypeScript applications
              </p>
            </div>
          </section>

          <nav className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/software" className="text-slate-600 hover:underline">
              ← Back to Software
            </Link>
          </nav>
        </article>
      </main>
    </>
  );
}
