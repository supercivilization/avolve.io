import type { Metadata } from "next";
import Link from "next/link";

// Dependencies (October 5, 2025):
// - Next.js: 15.5.4
// - React: 19.2.0
// - TypeScript: 5.9.2
// Last verified: 2025-10-05

export const metadata: Metadata = {
  title: "Software - Modern Stack Versions | Avolve.io",
  description: "Current versions of Next.js, React, TypeScript, Tailwind CSS, and more. Last updated October 5, 2025.",
};

export default function SoftwarePage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "headline": "Software: Modern Development Stack",
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-05",
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "Next.js",
        "applicationCategory": "DeveloperApplication",
        "softwareVersion": "15.5.4",
        "operatingSystem": "Node.js 24.8.0"
      },
      {
        "@type": "SoftwareApplication",
        "name": "React",
        "applicationCategory": "DeveloperApplication",
        "softwareVersion": "19.2.0"
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
          <h1 className="text-4xl font-bold mb-4 text-zinc-700">Software</h1>
          <p className="text-xl text-gray-700 mb-12">
            Code, frameworks, libraries - what you build with
          </p>

          <section id="software-definition" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">What is Software?</h2>
            <p className="text-gray-700 mb-4">
              Software is the code you write and the frameworks you use. This includes programming languages (TypeScript),
              UI libraries (React), frameworks (Next.js), and build tools (Turbopack).
            </p>
            <p className="text-gray-700">
              Software implements <Link href="/systems" className="text-gray-600 hover:underline">Systems</Link>,
              delivers <Link href="/solutions" className="text-slate-600 hover:underline ml-1">Solutions</Link>, and
              runs on <Link href="/services" className="text-orange-600 hover:underline ml-1">Services</Link>.
            </p>
          </section>

          <section id="current-stack" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Current Stack (October 2025)</h2>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Tool</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Version</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Why Use It</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Runtime</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono">Node.js</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono">24.8.0</td>
                    <td className="border border-gray-300 px-4 py-2">Native TypeScript execution (67-400% faster)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Language</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono">TypeScript</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono">5.9.2</td>
                    <td className="border border-gray-300 px-4 py-2">Type safety, better DX, catches bugs early</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Framework</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono">Next.js</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono">15.5.4</td>
                    <td className="border border-gray-300 px-4 py-2">Turbopack builds (2-5x faster), Server Components</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">UI Library</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono">React</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono">19.2.0</td>
                    <td className="border border-gray-300 px-4 py-2">Server Components, React Compiler optimization</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Styling</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono">Tailwind CSS</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono">4.1.13</td>
                    <td className="border border-gray-300 px-4 py-2">Oxide engine (100x faster incremental builds)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Components</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono">shadcn/ui</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono">3.0</td>
                    <td className="border border-gray-300 px-4 py-2">Universal registry (182x faster resolution)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Icons</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono">lucide-react</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono">0.460.0</td>
                    <td className="border border-gray-300 px-4 py-2">1,500+ icons, tree-shakeable, consistent</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">AI SDK</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono">Vercel AI SDK</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono">5.0.48</td>
                    <td className="border border-gray-300 px-4 py-2">100+ models, streaming, tool calling</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="version-history" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Version History</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <p className="font-bold">October 5, 2025:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Next.js 15.5.4, React 19.2.0 (Oct 1), shadcn/ui 3.0</li>
                  <li>Tailwind CSS 4.1.13 (Oxide engine stable)</li>
                </ul>
              </div>
              <div>
                <p className="font-bold">September 2025:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Next.js 15.5 stable, Turbopack production builds beta</li>
                  <li>Node.js 24.8.0 with native TypeScript execution</li>
                </ul>
              </div>
              <div>
                <p className="font-bold">December 2024:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>React 19 stable release with Server Components</li>
                  <li>Next.js 15.0 stable with Turbopack dev</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="installation" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Installation</h2>

            <h3 className="text-xl font-bold mb-2">Create New Project</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`# Create Next.js 15.5.4 app with latest stack
npx create-next-app@latest my-app \\
  --typescript \\
  --tailwind \\
  --app \\
  --src-dir \\
  --import-alias "@/*"

cd my-app

# Install shadcn/ui
npx shadcn@latest init

# Add components
npx shadcn@latest add button card input

# Install AI SDK (optional)
npm install ai @ai-sdk/anthropic

# Install icons
npm install lucide-react`}
            </pre>

            <h3 className="text-xl font-bold mb-2">Verify Versions</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`node --version    # Should show v24.8.0+
npm --version     # Should show 11.0.0+

# Check package.json
cat package.json | grep '"next"\\|"react"\\|"typescript"'`}
            </pre>
          </section>

          <section id="why-this-stack" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Why This Stack?</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <p className="font-bold mb-2">Performance:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Node.js 24.8.0: Native TypeScript = 67-400% faster startup</li>
                  <li>Tailwind 4.1.13: Oxide engine = 100x faster incremental builds</li>
                  <li>Next.js 15.5: Turbopack = 2-5x faster compilation</li>
                </ul>
              </div>
              <div>
                <p className="font-bold mb-2">Developer Experience:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>TypeScript catches bugs before runtime</li>
                  <li>shadcn/ui: Copy-paste components, full control</li>
                  <li>React 19.2: Server Components reduce client JS</li>
                </ul>
              </div>
              <div>
                <p className="font-bold mb-2">Production Ready:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>All versions stable, battle-tested</li>
                  <li>Vercel AI SDK: Enterprise-grade AI integration</li>
                  <li>Active communities, frequent updates</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="relationships" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">How Software Relates to Other Layers</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Implements <Link href="/systems" className="text-gray-600 hover:underline">Systems</Link>:</strong> Next.js middleware powers auth, React components build UI</li>
              <li>• <strong>Delivers <Link href="/solutions" className="text-slate-600 hover:underline">Solutions</Link>:</strong> AI chat, real-time apps, e-commerce</li>
              <li>• <strong>Runs on <Link href="/services" className="text-orange-600 hover:underline">Services</Link>:</strong> Deployed to Vercel, data in Supabase</li>
              <li>• <strong>Needs <Link href="/support" className="text-red-600 hover:underline">Support</Link>:</strong> Monitoring builds, debugging TypeScript errors</li>
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
