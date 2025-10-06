import type { Metadata } from "next";
import Link from "next/link";

// Dependencies (October 5, 2025):
// - Next.js: 15.5.4
// - React: 19.2.0
// - TypeScript: 5.9.2
// Last verified: 2025-10-05

export const metadata: Metadata = {
  title: "Verified Stack: Next.js 15.5, React 19.2, TypeScript 5.9",
  description: "Get the verified stack for Oct 2025: Next.js 15.5, React 19.2, TS 5.9 & Supabase. Includes install commands & patterns for a faster, production-ready setup.",
  alternates: {
    canonical: "https://avolve.io/software",
  },
};

export default function SoftwarePage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": "https://avolve.io/software#article",
        "url": "https://avolve.io/software",
        "name": "Verified Stack: Next.js 15.5, React 19.2, TypeScript 5.9 Compatibility",
        "headline": "Verified compatibility matrix and integration patterns for the modern development stack as of October 2025.",
        "description": "Get the verified stack for Oct 2025 including Next.js 15.5, React 19.2, TypeScript 5.9, Supabase, and Tailwind CSS 4.1. Includes installation commands and patterns for a faster, production-ready setup.",
        "isPartOf": {
          "@id": "https://avolve.io/#website"
        },
        "datePublished": "2025-10-05T17:00:00-06:00",
        "dateModified": "2025-10-05T17:00:00-06:00",
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        },
        "publisher": {
          "@id": "https://www.supercivilization.xyz/#organization"
        },
        "technicalAudience": "Web Developers, Software Engineers, Full-Stack Developers",
        "proficiencyLevel": "Intermediate",
        "dependencies": [
          {"@type": "SoftwareApplication", "name": "Node.js", "version": "24.8.0"},
          {"@type": "SoftwareApplication", "name": "TypeScript", "version": "5.9.2"},
          {"@type": "SoftwareApplication", "name": "Next.js", "version": "15.5.4"},
          {"@type": "SoftwareApplication", "name": "React", "version": "19.2.0"},
          {"@type": "SoftwareApplication", "name": "Tailwind CSS", "version": "4.1.13"},
          {"@type": "SoftwareApplication", "name": "shadcn/ui", "version": "3.3.1"},
          {"@type": "SoftwareApplication", "name": "Vercel AI SDK", "version": "5.0.48"},
          {"@type": "SoftwareApplication", "name": "Supabase"},
          {"@type": "SoftwareApplication", "name": "Claude Code"}
        ],
        "hasPart": [
          {
            "@id": "https://avolve.io/software#installation"
          }
        ]
      },
      {
        "@type": "HowTo",
        "@id": "https://avolve.io/software#installation",
        "name": "How to Install the Avolve.io Verified Stack",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Step 1: Create a New Next.js Project",
            "text": "Use create-next-app to scaffold a new project with all the recommended settings for TypeScript, Tailwind CSS, and the App Router.",
            "code": {
              "@type": "Code",
              "text": "npx create-next-app@latest my-app --typescript --tailwind --app --src-dir --import-alias \"@/*\""
            }
          },
          {
            "@type": "HowToStep",
            "name": "Step 2: Initialize shadcn/ui",
            "text": "Run the shadcn/ui init command to set up your components.json file.",
            "code": {
              "@type": "Code",
              "text": "npx shadcn@latest init"
            }
          },
          {
            "@type": "HowToStep",
            "name": "Step 3: Add Components and Libraries",
            "text": "Install individual components, the Vercel AI SDK, and icon libraries as needed.",
            "code": {
              "@type": "Code",
              "text": "npx shadcn@latest add button card\nnpm install ai @ai-sdk/anthropic\nnpm install lucide-react"
            }
          },
          {
            "@type": "HowToStep",
            "name": "Step 4: Verify Versions",
            "text": "Check your Node.js version and package.json to ensure all dependencies match the verified stack.",
            "code": {
              "@type": "Code",
              "text": "node --version\ncat package.json | grep '\"next\"\\|\"react\"'"
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://avolve.io/software#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://avolve.io"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Software"
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
        <time className="text-sm text-gray-600" dateTime="2025-10-05">
          Last updated: October 5, 2025
        </time>

        <article className="mt-4">
          <h1 className="text-4xl font-bold mb-4 text-zinc-700">Software - Modern Stack Integration</h1>
          <p className="text-xl text-gray-700 mb-4">
            Verified compatibility matrix and integration patterns for the modern development stack
          </p>
          <p className="text-gray-600 mb-12">
            We show how these tools work together and point you to official documentation for each.
          </p>

          <section id="software-definition" className="mb-12 bg-zinc-50 border-l-4 border-zinc-600 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">What This Page Provides</h2>
            <p className="text-gray-700 mb-4">
              <strong>Verified Stack Compatibility:</strong> We test and verify that Next.js 15.5.4 + React 19.2.0 + TypeScript 5.9.2 + Node.js 24.8.0 work together as of October 2025.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Integration Patterns:</strong> Each tool page shows how it integrates with the rest of the stack, not just isolated features.
            </p>
            <p className="text-gray-700">
              <strong>Official Resources:</strong> We link to official documentation (nextjs.org, react.dev, etc.) for API details and latest updates.
            </p>
            <p className="text-sm text-gray-600 mt-4">
              Software implements <Link href="/systems" className="text-gray-600 hover:underline">Systems</Link>,
              delivers <Link href="/solutions" className="text-slate-600 hover:underline ml-1">Solutions</Link>, and
              runs on <Link href="/services" className="text-neutral-600 hover:underline ml-1">Services</Link>.
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
                    <td className="border border-gray-300 px-4 py-2 font-mono">
                      <Link href="/software/nextjs" className="text-zinc-700 hover:underline">
                        Next.js
                      </Link>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 font-mono">15.5.4</td>
                    <td className="border border-gray-300 px-4 py-2">Turbopack builds (2-5x faster), Server Components</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">UI Library</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono">
                      <Link href="/software/react" className="text-gray-700 hover:underline">
                        React
                      </Link>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 font-mono">19.2.0</td>
                    <td className="border border-gray-300 px-4 py-2">Server Components, React Compiler optimization</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Styling</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono">
                      <Link href="/software/tailwind" className="text-gray-700 hover:underline">
                        Tailwind CSS
                      </Link>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 font-mono">4.1.13</td>
                    <td className="border border-gray-300 px-4 py-2">Oxide engine (100x faster incremental builds)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Components</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono">
                      <Link href="/software/shadcn-ui" className="text-gray-700 hover:underline">
                        shadcn/ui
                      </Link>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 font-mono">3.3.1</td>
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
                    <td className="border border-gray-300 px-4 py-2 font-mono">
                      <Link href="/software/vercel-ai-sdk" className="text-gray-700 hover:underline">
                        Vercel AI SDK
                      </Link>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 font-mono">5.0.48</td>
                    <td className="border border-gray-300 px-4 py-2">100+ models, streaming, tool calling</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Backend</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono">
                      <Link href="/software/supabase" className="text-gray-700 hover:underline">
                        Supabase
                      </Link>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 font-mono">Current</td>
                    <td className="border border-gray-300 px-4 py-2">AI-first backend, pgvector 0.8, remote MCP</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">AI Coding</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono">Claude Code</td>
                    <td className="border border-gray-300 px-4 py-2 font-mono">2025</td>
                    <td className="border border-gray-300 px-4 py-2">Terminal agent (72.5% SWE-bench), see <Link href="/support#ai-coding" className="text-stone-600 hover:underline">Support</Link></td>
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

          <section id="mcp-integration" className="mb-16 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">MCP Integration (AI-Native Development)</h2>

            <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg mb-6 border-l-4 border-blue-500">
              <h3 className="text-xl font-bold mb-3">What is MCP?</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Model Context Protocol (MCP)</strong> enables AI assistants like Claude, ChatGPT, and Cursor to
                install shadcn/ui components using natural language commands—no manual CLI needed.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Example:</strong> Tell your AI assistant &quot;Add a search bar with icon&quot; → AI automatically
                runs <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">npx shadcn@latest add input-group</code> and
                generates the component code.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Setup Instructions</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`# Initialize MCP for Claude Code
pnpm dlx shadcn@latest mcp init --client claude

# For Cursor users
pnpm dlx shadcn@latest mcp init --client cursor

# For VS Code users
pnpm dlx shadcn@latest mcp init --client vscode`}
              </pre>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                This creates a <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">.mcp.json</code> configuration file in your project root.
              </p>

              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <p className="text-sm font-semibold mb-2">Generated .mcp.json:</p>
                <pre className="bg-gray-900 dark:bg-black text-gray-100 p-3 rounded text-xs overflow-x-auto">
{`{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}`}
                </pre>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">AI-Native Workflow Comparison</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4 bg-red-50 dark:bg-red-950/10 border-red-200 dark:border-red-900">
                  <h4 className="font-bold mb-3 text-red-700 dark:text-red-400 flex items-center gap-2">
                    <span>❌</span>
                    <span>Old Way (Manual)</span>
                  </h4>
                  <ol className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                    <li>1. Search shadcn/ui documentation</li>
                    <li>2. Copy CLI command</li>
                    <li>3. Run <code className="bg-white dark:bg-gray-800 px-1 rounded text-xs">npx shadcn@latest add ...</code></li>
                    <li>4. Import component in code</li>
                    <li>5. Write component JSX</li>
                    <li className="font-bold pt-2">⏱️ Time: ~3 minutes</li>
                  </ol>
                </div>
                <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-950/10 border-green-200 dark:border-green-900">
                  <h4 className="font-bold mb-3 text-green-700 dark:text-green-400 flex items-center gap-2">
                    <span>✅</span>
                    <span>New Way (MCP)</span>
                  </h4>
                  <ol className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                    <li>1. Tell AI: &quot;Add a search bar&quot;</li>
                    <li>2. AI installs via MCP</li>
                    <li>3. AI generates code</li>
                    <li>4. Done</li>
                    <li className="opacity-0">5. (spacer)</li>
                    <li className="font-bold pt-2">⏱️ Time: ~3 seconds</li>
                  </ol>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
                <strong>60-100x faster development</strong> with MCP-enabled AI assistants
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">New shadcn/ui v3.0 Components</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                These components were added in August-October 2025 and are available via MCP:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Component</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Use Case</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Install Command</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">Spinner</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Loading states, async operations</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">npx shadcn@latest add spinner</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">Button Group</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Navigation clusters, toolbars</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">npx shadcn@latest add button-group</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">Input Group</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Search bars, icon inputs</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">npx shadcn@latest add input-group</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">Empty</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">No results states, empty lists</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">npx shadcn@latest add empty</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">Kbd</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Keyboard shortcuts display</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">npx shadcn@latest add kbd</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono">Field</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Form field infrastructure</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-mono text-xs">npx shadcn@latest add field</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950/20 border-l-4 border-yellow-400 p-4 mb-8">
              <h3 className="text-lg font-bold mb-2">Supported AI Clients</h3>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                <li>• <strong>Claude Code</strong> - Full MCP support (recommended)</li>
                <li>• <strong>Cursor</strong> - Full MCP support</li>
                <li>• <strong>VS Code</strong> - Requires MCP extension</li>
                <li>• <strong>Codex</strong> - Requires MCP extension</li>
              </ul>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/20 p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-xl font-bold mb-3">Example: AI-Native Component Installation</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">You:</p>
                  <p className="bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 border">
                    &quot;Add a navigation header with Button Group component&quot;
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">AI (via MCP):</p>
                  <div className="bg-gray-900 p-3 rounded text-gray-100 text-sm font-mono">
                    <p className="text-green-400">✓ Installing button-group component...</p>
                    <p className="text-blue-400">✓ Generating SiteHeader component...</p>
                    <p className="text-green-400">✓ Done! Navigation added.</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                The AI automatically installs the component, generates the code, and imports it—all from a single instruction.
              </p>
            </div>
          </section>

          <section id="relationships" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">How Software Relates to Other Layers</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Implements <Link href="/systems" className="text-gray-600 hover:underline">Systems</Link>:</strong> Next.js middleware powers auth, React components build UI</li>
              <li>• <strong>Delivers <Link href="/solutions" className="text-slate-600 hover:underline">Solutions</Link>:</strong> AI chat, real-time apps, e-commerce</li>
              <li>• <strong>Runs on <Link href="/services" className="text-neutral-600 hover:underline">Services</Link>:</strong> Deployed to Vercel, data in Supabase</li>
              <li>• <strong>Needs <Link href="/support" className="text-stone-600 hover:underline">Support</Link>:</strong> Monitoring builds, debugging TypeScript errors</li>
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
