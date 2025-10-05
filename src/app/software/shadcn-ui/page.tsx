import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

// Dependencies (October 5, 2025):
// - shadcn CLI: 3.3.1
// - Next.js: 15.5.4
// - React: 19.2.0
// - Tailwind CSS: v4.1.13
// Last verified: 2025-10-05

export const metadata: Metadata = {
  title: "shadcn/ui Platform - Universal Component Distribution | Avolve.io",
  description: "shadcn/ui CLI 3.3.1: Universal code distribution platform with MCP server, namespaced registries, 182x faster resolution. Updated October 2025.",
  keywords: ["shadcn/ui", "component library", "MCP server", "Radix UI", "Tailwind CSS", "React 19", "universal registry"],
};

export default function ShadcnUIPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "headline": "shadcn/ui: Universal Component Distribution Platform",
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-05",
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "shadcn/ui",
        "applicationCategory": "DeveloperApplication",
        "softwareVersion": "3.3.1",
        "operatingSystem": "Node.js 24.8.0"
      }
    ]
  };

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Software", url: "/software" },
        { name: "shadcn/ui", url: "/software/shadcn-ui" }
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
          <h1 className="text-4xl font-bold mb-4 text-slate-700">shadcn/ui Platform</h1>
          <p className="text-xl text-gray-700 mb-12">
            Universal component distribution platform with MCP integration and 182x faster resolution
          </p>

          <section id="overview" className="mb-12 bg-slate-50 border-l-4 border-slate-600 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Platform Evolution</h2>
            <p className="text-gray-700 mb-4">
              <strong>shadcn/ui CLI 3.3.1</strong> (September 2025) has evolved from a component library into a comprehensive <strong>code distribution platform</strong> that fundamentally redefines how developers build, share, and consume UI components.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>95.1k GitHub stars</strong> (growing at 72.7 stars/day)</li>
              <li>• <strong>8,000+ companies</strong> in production (OpenAI, Adobe, Sonos)</li>
              <li>• <strong>182x faster dependency resolution</strong> vs v2</li>
              <li>• <strong>MCP server integration</strong> for AI-native development</li>
              <li>• <strong>Namespaced registries</strong> - decentralized distribution system</li>
            </ul>
          </section>

          <section id="platform-architecture" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Revolutionary Platform Architecture</h2>

            <div className="bg-purple-50 border-l-4 border-purple-600 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Universal Registry System</h3>
              <p className="text-gray-700 mb-3">
                CLI 3.0+ transforms shadcn/ui into a universal code distribution platform where any organization can create registries:
              </p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• <strong>Namespaced registries:</strong> @acme, @internal, @ai - any organization</li>
                <li>• <strong>Multi-source installations:</strong> Official, third-party, private registries</li>
                <li>• <strong>Cross-registry dependencies:</strong> Automatic resolution</li>
                <li>• <strong>Override capabilities:</strong> Customize third-party components</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-xl font-bold mb-3">Universal Registry Items</h3>
                <p className="text-gray-700 mb-3">
                  Beyond components - distribute any code or configuration:
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Framework-agnostic code</li>
                    <li>Configuration files</li>
                    <li>AI prompts and instructions</li>
                  </ul>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Themes and design tokens</li>
                    <li>Utility functions and hooks</li>
                    <li>Documentation and guides</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="performance" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Performance Revolution</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-3 py-2 text-left">Metric</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">CLI 2.x</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">CLI 3.3.1</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Improvement</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Dependency resolution</td>
                    <td className="border border-gray-300 px-3 py-2">Standard speed</td>
                    <td className="border border-gray-300 px-3 py-2">182x faster</td>
                    <td className="border border-gray-300 px-3 py-2"><strong>182x</strong></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Component install</td>
                    <td className="border border-gray-300 px-3 py-2">2.3s</td>
                    <td className="border border-gray-300 px-3 py-2">127ms</td>
                    <td className="border border-gray-300 px-3 py-2"><strong>18x faster</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold text-green-800 mb-2">Technical Improvements</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Multi-pass dependency resolution for complex trees</li>
                <li>• Intelligent caching with parallel fetching</li>
                <li>• Zero-config content detection</li>
                <li>• Seamless Tailwind v4.1.13 + Next.js 15.5 integration</li>
              </ul>
            </div>
          </section>

          <section id="mcp-integration" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">MCP Server Integration - AI-Native Development</h2>

            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Production-Ready MCP Implementation</h3>
              <p className="text-gray-700 mb-3">
                Model Context Protocol server integration enables AI assistants to install and manage components:
              </p>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
{`# Zero-config MCP setup
npx shadcn registry:mcp

# AI assistants can now:
# - Install components by name
# - Browse registry catalogs
# - Handle dependencies automatically
# - Generate component code`}
              </pre>
            </div>

            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-bold mb-2">AI Assistant Compatibility:</h4>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Claude Code with /mcp debugging support</li>
                  <li>Cursor IDE with native shadcn/ui integration</li>
                  <li>VS Code with GitHub Copilot enhancement</li>
                  <li>Windsurf and other MCP-compatible clients</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-2">Natural Language Component Management:</h4>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
{`AI Prompt: "Build a landing page using components from the Aceternity registry"

AI Response: Automatically installs @aceternity/hero, @aceternity/features,
             handles dependencies, generates implementation code`}
                </pre>
              </div>
            </div>
          </section>

          <section id="cross-framework" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Cross-Framework Support</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-2">React Ecosystem (Full Support)</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Next.js 15.5 with App Router + Turbopack</li>
                  <li>Remix with React Router v7</li>
                  <li>Vite with React 19.1</li>
                  <li>Laravel Inertia for full-stack</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-bold text-green-800 mb-2">Other Frameworks</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Vue: shadcn-vue (Reka UI migration Sept 2025)</li>
                  <li>Svelte: shadcn-svelte by @huntabyte</li>
                  <li>Angular: Spartan/ui, Zard UI</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Framework Auto-Detection:</h4>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
{`npx shadcn init
# Automatically detects: Next.js, Vite, Remix, Laravel
# Configures: Import paths, routing, bundler settings`}
              </pre>
            </div>
          </section>

          <section id="october-2025-components" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">October 2025 - Seven New Essential Components</h2>

            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded-lg mb-6">
              <p className="text-gray-700">
                <strong>Released October 2025:</strong> Seven powerful new components that work with every component library (Radix, Base UI, React Aria). These solve everyday UI patterns that developers rebuild constantly.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-l-4 border-teal-600 pl-3">
                <h4 className="font-bold mb-1">Spinner</h4>
                <p className="text-sm text-gray-700">Loading state indicator - customizable size, color, animation</p>
              </div>

              <div className="border-l-4 border-teal-600 pl-3">
                <h4 className="font-bold mb-1">Kbd</h4>
                <p className="text-sm text-gray-700">Keyboard key display - shortcuts, KbdGroup for combinations</p>
              </div>

              <div className="border-l-4 border-teal-600 pl-3">
                <h4 className="font-bold mb-1">Button Group</h4>
                <p className="text-sm text-gray-700">Related button containers - split buttons, nested groups</p>
              </div>

              <div className="border-l-4 border-teal-600 pl-3">
                <h4 className="font-bold mb-1">Input Group</h4>
                <p className="text-sm text-gray-700">Enhanced inputs - icons, buttons, labels, spinner support</p>
              </div>

              <div className="border-l-4 border-teal-600 pl-3">
                <h4 className="font-bold mb-1">Field</h4>
                <p className="text-sm text-gray-700">Universal form component - works with all form libraries</p>
              </div>

              <div className="border-l-4 border-teal-600 pl-3">
                <h4 className="font-bold mb-1">Item</h4>
                <p className="text-sm text-gray-700">Flexible content container - lists, cards, layouts</p>
              </div>

              <div className="border-l-4 border-teal-600 pl-3">
                <h4 className="font-bold mb-1">Separator</h4>
                <p className="text-sm text-gray-700">Visual dividers - horizontal, vertical, with labels</p>
              </div>
            </div>
          </section>

          <section id="installation" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Installation & Usage</h2>

            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`# Initialize shadcn/ui in your project
npx shadcn@latest init

# Add individual components
npx shadcn@latest add button
npx shadcn@latest add card input

# Add from namespaced registries
npx shadcn@latest add @aceternity/hero
npx shadcn@latest add @internal/custom-component

# Add October 2025 new components
npx shadcn@latest add spinner kbd field`}
            </pre>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Copy-Paste Philosophy</h4>
              <p className="text-sm text-gray-700">
                Components are copied into your project, giving you <strong>full ownership and control</strong>. No npm dependencies to manage, no version conflicts, complete customization freedom.
              </p>
            </div>
          </section>

          <section id="for-ai" className="mb-12 border-t pt-8 bg-purple-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">🤖 For AI Assistants</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Version:</strong> CLI 3.3.1 (September 2025), universal platform architecture</li>
              <li><strong>Performance:</strong> 182x faster dependency resolution, 18x faster installs</li>
              <li><strong>MCP Integration:</strong> npx shadcn registry:mcp for AI-native development</li>
              <li><strong>Frameworks:</strong> React (Next.js, Remix, Vite), Vue, Svelte, Angular</li>
              <li><strong>New components:</strong> Spinner, Kbd, Button Group, Input Group, Field, Item, Separator (Oct 2025)</li>
              <li><strong>Styling:</strong> Uses Tailwind CSS v4.1.13, Radix UI primitives</li>
            </ul>
          </section>

          <section id="relationships" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Stack Relationships</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Part of <Link href="/software" className="text-zinc-700 hover:underline">Software</Link>:</strong> UI component layer</li>
              <li>• <strong>Styled by <Link href="/software/tailwind" className="text-gray-600 hover:underline">Tailwind CSS</Link>:</strong> Utility-first styling</li>
              <li>• <strong>Works with <Link href="/software/nextjs" className="text-gray-600 hover:underline">Next.js</Link>:</strong> App Router, Server Components</li>
              <li>• <strong>Built on <Link href="/software/react" className="text-gray-600 hover:underline">React</Link>:</strong> Component primitives, hooks</li>
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
