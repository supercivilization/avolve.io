import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

// Dependencies (October 5, 2025):
// - shadcn CLI: 3.3.1
// - Next.js: 15.5.5
// - React: 19.2.0
// - Tailwind CSS: v4.1.13
// Last verified: 2025-10-05

export const metadata: Metadata = {
  title: "shadcn/ui 3.3 - Copy-Paste Component Platform with 95K Stars | Avolve.io",
  description: "shadcn/ui 3.3 component platform built on Radix UI + Tailwind CSS. 182x faster dependency resolution, universal registry, MCP integration. October 2025.",
  keywords: ["shadcn/ui", "Radix UI", "Tailwind components", "Next.js components", "React 19 components", "copy-paste components", "shadcn 2025"],
  alternates: {
    canonical: "https://avolve.io/software/shadcn-ui",
  },
};

export default function ShadcnUIPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "headline": "shadcn/ui 3.3: Copy-Paste Component Platform with Universal Registry",
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-05",
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        },
        "description": "Comprehensive analysis of shadcn/ui 3.3's copy-paste philosophy, universal registry platform, and Radix UI + Tailwind CSS integration"
      },
      {
        "@type": "SoftwareApplication",
        "name": "shadcn/ui",
        "applicationCategory": "DeveloperApplication",
        "softwareVersion": "3.3.1",
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
          <h1 className="text-4xl font-bold mb-4 text-slate-700">shadcn/ui 3.3</h1>
          <p className="text-xl text-gray-700 mb-12">
            Component distribution platform with copy-paste philosophy, built on Radix UI and Tailwind CSS, serving 8,000+ companies with 95.1K GitHub stars
          </p>

          {/* Core Identity Section */}
          <section id="overview" className="mb-12 bg-slate-50 border-l-4 border-slate-600 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">What It Is</h2>
            <p className="text-gray-700 mb-4">
              <strong>shadcn/ui 3.3</strong> is a component distribution platform that copies accessible, customizable components into your project—not an npm package. Built on <strong>Radix UI primitives</strong> and <strong>Tailwind CSS</strong>, used by <strong>OpenAI, Adobe, and 8,000+ companies</strong>.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Market Dominance</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• <strong>95.1K GitHub stars</strong> (top 0.1% repos)</li>
                  <li>• <strong>8,000+ companies</strong> using in production</li>
                  <li>• <strong>OpenAI, Adobe, Netflix</strong> among users</li>
                  <li>• <strong>65+ accessible components</strong></li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-800 mb-2">Revolutionary Features (v3.3)</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• 182x faster dependency resolution</li>
                  <li>• Universal registry platform (namespaced)</li>
                  <li>• MCP server for AI assistants</li>
                  <li>• 7 new components (Spinner, Kbd, Field, etc.)</li>
                  <li>• Copy-paste ownership model</li>
                  <li>• Full customization without eject</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 bg-slate-100 p-4 rounded border-l-4 border-slate-600">
              <h3 className="font-bold mb-2">Official Documentation</h3>
              <p className="text-sm text-gray-700 mb-2">
                For complete component reference and guides, visit:
              </p>
              <ul className="space-y-1 text-sm">
                <li>→ <a href="https://ui.shadcn.com" className="text-slate-600 hover:underline">ui.shadcn.com</a> - Official documentation</li>
                <li>→ <a href="https://github.com/shadcn-ui/ui" className="text-slate-600 hover:underline">GitHub Repository</a> - Source code and issues</li>
                <li>→ <a href="https://ui.shadcn.com/docs/cli" className="text-slate-600 hover:underline">CLI Documentation</a> - Installation and usage</li>
              </ul>
            </div>
          </section>

          {/* Why It Matters Section */}
          <section id="why-matters" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Why It Matters</h2>

            <div className="space-y-6">
              <div className="border-l-4 border-slate-600 pl-4">
                <h3 className="text-xl font-bold mb-3 text-slate-800">Copy-Paste Philosophy: Code Ownership Without Vendor Lock-In</h3>
                <p className="text-gray-700 mb-3">
                  Unlike traditional component libraries (Material-UI, Ant Design) distributed via npm, shadcn/ui copies source code directly into your project. This architectural decision gives you complete ownership, customization control, and eliminates dependency hell—while still providing pre-built, accessible components.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-neutral-100 p-4 rounded-lg">
                    <h4 className="font-bold text-neutral-700 mb-2">❌ Traditional Component Libraries</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">{`// Material-UI approach
npm install @mui/material @emotion/react

// Package.json bloat
"dependencies": {
  "@mui/material": "^5.x",
  "@mui/icons-material": "^5.x",
  "@emotion/react": "^11.x",
  "@emotion/styled": "^11.x"
}

// Locked to library's API
<Button variant="contained">Click</Button>

// Can't customize without "eject"`}</pre>
                  </div>
                  <div className="bg-zinc-100 p-4 rounded-lg">
                    <h4 className="font-bold text-zinc-700 mb-2">✅ shadcn/ui Approach</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">{`// Copy component into your project
npx shadcn@latest add button

// Zero new dependencies (uses existing stack)
// Components added to:
// components/ui/button.tsx

// Full customization - it's YOUR code
<Button className="your-custom-class">
  Click
</Button>

// Modify source directly, no eject needed`}</pre>
                  </div>
                </div>
                <div className="mt-3 bg-gray-100 p-3 rounded">
                  <h5 className="font-bold text-sm mb-2">Benefits of Copy-Paste Model:</h5>
                  <ul className="space-y-1 text-xs text-gray-700">
                    <li>• <strong>No version conflicts:</strong> Components use your existing dependencies</li>
                    <li>• <strong>Full customization:</strong> Edit source code without limitations</li>
                    <li>• <strong>Bundle size control:</strong> Only ship components you actually use</li>
                    <li>• <strong>No breaking changes:</strong> Updates are opt-in, not forced</li>
                    <li>• <strong>Tree-shakeable:</strong> Dead code elimination works perfectly</li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-stone-600 pl-4">
                <h3 className="text-xl font-bold mb-3 text-stone-700">Universal Registry Platform (v3.3)</h3>
                <p className="text-gray-700 mb-3">
                  shadcn/ui 3.3 introduces a universal component registry that works across frameworks and allows community contributions through namespaced components. This transforms shadcn/ui from a Next.js-only solution into a platform for the entire JavaScript ecosystem.
                </p>
                <div className="bg-stone-100 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Framework Support Matrix:</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="font-bold text-sm mb-2">First-Class:</h5>
                      <ul className="space-y-1 text-xs text-gray-700">
                        <li>• Next.js (app router)</li>
                        <li>• Remix</li>
                        <li>• Vite + React</li>
                        <li>• Astro + React</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold text-sm mb-2">Community:</h5>
                      <ul className="space-y-1 text-xs text-gray-700">
                        <li>• Vue (via shadcn-vue)</li>
                        <li>• Svelte (via shadcn-svelte)</li>
                        <li>• Solid (via kobalte)</li>
                        <li>• Angular (community ports)</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold text-sm mb-2">Namespaced Components:</h5>
                      <ul className="space-y-1 text-xs text-gray-700">
                        <li>• @shadcn/ui (official)</li>
                        <li>• @company/ui (private)</li>
                        <li>• @community/ui (public)</li>
                        <li>• Full registry ecosystem</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-zinc-600 pl-4">
                <h3 className="text-xl font-bold mb-3 text-zinc-700">Radix UI Foundation: Production-Grade Accessibility</h3>
                <p className="text-gray-700 mb-3">
                  Every shadcn/ui component is built on Radix UI primitives, providing WCAG 2.1 Level AA accessibility by default. This includes keyboard navigation, screen reader support, and ARIA attributes—solving the hardest parts of building accessible components.
                </p>
                <div className="space-y-3">
                  <div className="bg-zinc-100 p-3 rounded">
                    <h5 className="font-bold text-sm mb-2">Accessibility Features (Built-In):</h5>
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li>• <strong>Keyboard navigation:</strong> Tab, Arrow keys, Escape work correctly</li>
                      <li>• <strong>Screen reader support:</strong> Complete ARIA labeling and live regions</li>
                      <li>• <strong>Focus management:</strong> Automatic focus trapping and restoration</li>
                      <li>• <strong>WCAG 2.1 AA compliant:</strong> Color contrast, touch targets, labels</li>
                      <li>• <strong>RTL support:</strong> Right-to-left languages work automatically</li>
                    </ul>
                  </div>
                  <div className="bg-zinc-100 p-3 rounded">
                    <h5 className="font-bold text-sm mb-2">Example: Dialog Component Accessibility</h5>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">{`// Radix UI handles all accessibility automatically:
// ✅ Focus trapped inside dialog
// ✅ Escape key closes dialog
// ✅ Click outside closes dialog
// ✅ aria-labelledby and aria-describedby set
// ✅ Screen reader announces dialog open/close
// ✅ Body scroll locked when open

<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogTitle>Delete account</DialogTitle>
    <DialogDescription>
      This action cannot be undone.
    </DialogDescription>
    <Button onClick={handleDelete}>Confirm</Button>
  </DialogContent>
</Dialog>`}</pre>
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
                <h3 className="text-xl font-bold mb-3">Project Setup</h3>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <h4 className="font-bold mb-2">Initialize shadcn/ui (Next.js 15):</h4>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">{`# Initialize (auto-detects Next.js, Tailwind, TypeScript)
npx shadcn@latest init

# Configuration prompts:
# ✓ Style: New York or Default
# ✓ Base color: zinc, slate, stone, gray, neutral
# ✓ CSS variables: Yes (recommended for theming)

# Add components
npx shadcn@latest add button card input form dialog

# Components copied to:
# components/ui/button.tsx
# components/ui/card.tsx
# components/ui/input.tsx
# etc.`}</pre>
                  <h4 className="font-bold mt-3 mb-2">What Gets Created:</h4>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">{`components/
  ui/
    button.tsx      # Copied into your project
    card.tsx        # You own the code
    input.tsx       # Modify freely
lib/
  utils.ts          # Helper functions (cn, etc.)
app/
  globals.css       # CSS variables for theming`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Dark Mode Integration</h3>
                <div className="bg-slate-100 p-4 rounded border-l-4 border-slate-600">
                  <h4 className="font-bold mb-2">next-themes Setup:</h4>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">{`// app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

// components/theme-toggle.tsx
"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
    </Button>
  )
}`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Form Validation with Zod</h3>
                <div className="bg-gray-100 p-4 rounded border-l-4 border-gray-600">
                  <h4 className="font-bold mb-2">Type-Safe Forms:</h4>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">{`"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
})

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", email: "" },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values) // Type-safe!
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage /> {/* Auto-displays errors */}
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}`}</pre>
                </div>
              </div>
            </div>
          </section>

          {/* Real-World Implementation Section */}
          <section id="implementation" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Real-World Implementation</h2>

            <div className="space-y-6">
              <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-slate-600">
                <h3 className="text-lg font-bold mb-3">Server Components + Dialogs</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-sm mb-2">Server Action Integration:</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">{`import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { deleteUser } from "@/app/actions"

export async function UserCard({ user }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This will permanently delete {user.name}.
          </DialogDescription>
        </DialogHeader>
        <form action={deleteUser}>
          <input type="hidden" name="userId" value={user.id} />
          <Button type="submit" variant="destructive">
            Confirm Delete
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}`}</pre>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-100 p-4 rounded-lg border-l-4 border-neutral-600">
                <h3 className="text-lg font-bold mb-3">Production Issues and Fixes</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-sm mb-2">Issue #1: Tailwind Variables Not Applied</h4>
                    <p className="text-xs text-gray-700 mb-2">
                      <strong>Symptom:</strong> Components unstyled or wrong colors in production
                    </p>
                    <p className="text-xs text-gray-700 mb-2">
                      <strong>Cause:</strong> globals.css not imported or Tailwind config missing paths
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">{`// ❌ Wrong - Missing component paths
export default {
  content: ["./app/**/*.{ts,tsx}"],
}

// ✅ Right - Include all paths
export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
}

// app/layout.tsx - MUST import globals.css
import "./globals.css"`}</pre>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm mb-2">Issue #2: Dialog Won't Close in Server Components</h4>
                    <p className="text-xs text-gray-700 mb-2">
                      <strong>Symptom:</strong> Dialog stays open after form submission
                    </p>
                    <p className="text-xs text-gray-700 mb-2">
                      <strong>Cause:</strong> Radix UI needs "use client" for state management
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">{`// ❌ Wrong - Server Component with Dialog state
export default function UserForm({ user }) {
  const [open, setOpen] = useState(false) // Error!
  return <Dialog open={open}>...</Dialog>
}

// ✅ Right - Client Component wrapper
"use client"

export function UserFormDialog({ user }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Content */}
    </Dialog>
  )
}`}</pre>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm mb-2">Issue #3: Form Validation Errors Not Showing</h4>
                    <p className="text-xs text-gray-700 mb-2">
                      <strong>Symptom:</strong> No error messages despite invalid data
                    </p>
                    <p className="text-xs text-gray-700 mb-2">
                      <strong>Cause:</strong> Missing FormMessage component
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">{`// ❌ Wrong - No FormMessage
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      {/* Missing FormMessage! */}
    </FormItem>
  )}
/>

// ✅ Right - Always include FormMessage
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage /> {/* Required for errors */}
    </FormItem>
  )}
/>`}</pre>
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
                <h3 className="text-xl font-bold mb-3 text-zinc-600">✅ Choose shadcn/ui When:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Code ownership required:</strong> Need full control without vendor lock-in</li>
                  <li>• <strong>Accessibility critical:</strong> WCAG 2.1 AA compliance built-in via Radix UI</li>
                  <li>• <strong>Tailwind CSS stack:</strong> Already using Tailwind (perfect integration)</li>
                  <li>• <strong>Bundle size matters:</strong> Only ship components you actually use</li>
                  <li>• <strong>Rapid prototyping:</strong> Pre-built components with full customization</li>
                  <li>• <strong>No update pressure:</strong> Opt-in updates, no forced breaking changes</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-neutral-600">❌ Consider Alternatives When:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Non-Tailwind stack:</strong> Material-UI or Ant Design better for CSS-in-JS</li>
                  <li>• <strong>Zero customization needs:</strong> Chakra UI simpler for basic use cases</li>
                  <li>• <strong>Team unfamiliar with Radix:</strong> Learning curve for component APIs</li>
                  <li>• <strong>Need managed updates:</strong> Prefer automatic library updates via npm</li>
                  <li>• <strong>Non-React frameworks:</strong> Use framework-specific ports (shadcn-vue, etc.)</li>
                </ul>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-xl font-bold mb-3">Migration Strategy</h3>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <h4 className="font-bold mb-2">Incremental Adoption Path:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    <li><strong>Initialize shadcn/ui:</strong> Run <code className="bg-gray-200 px-1 rounded">npx shadcn@latest init</code></li>
                    <li><strong>Add components gradually:</strong> Start with Button, Input, Form</li>
                    <li><strong>Replace existing components:</strong> One component at a time (non-breaking)</li>
                    <li><strong>Customize as needed:</strong> Edit source code directly in components/ui/</li>
                    <li><strong>Remove old library:</strong> When adoption reaches 80%+, uninstall old components</li>
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
                  <li>• <strong>Version:</strong> 3.3.1 (October 2025)</li>
                  <li>• <strong>Philosophy:</strong> Copy-paste, not npm package</li>
                  <li>• <strong>Foundation:</strong> Radix UI + Tailwind CSS</li>
                  <li>• <strong>Components:</strong> 65+ accessible primitives</li>
                  <li>• <strong>Stars:</strong> 95.1K GitHub (top 0.1%)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">Code Generation:</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Add: <code className="bg-gray-200 px-1 rounded">npx shadcn@latest add [component]</code></li>
                  <li>• Always include <code className="bg-gray-200 px-1 rounded">FormMessage</code> in forms</li>
                  <li>• Use <code className="bg-gray-200 px-1 rounded">"use client"</code> for Dialog/Sheet state</li>
                  <li>• Import from <code className="bg-gray-200 px-1 rounded">@/components/ui/...</code></li>
                  <li>• Tailwind CSS required for styling</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 bg-white p-3 rounded border border-gray-300">
              <h4 className="font-bold text-sm mb-2">Quick Reference Template:</h4>
              <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">{`// shadcn/ui + Next.js 15 pattern
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

export function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>
        {/* Content */}
      </DialogContent>
    </Dialog>
  )
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
                  <li>• <Link href="/software/react" className="text-slate-600 hover:underline">React 19</Link> - UI library foundation</li>
                  <li>• <Link href="/software/tailwind" className="text-slate-600 hover:underline">Tailwind CSS v4</Link> - Styling system</li>
                  <li>• Radix UI - Accessible primitives</li>
                  <li>• <Link href="/software/typescript" className="text-slate-600 hover:underline">TypeScript 5.9</Link> - Type safety</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-gray-800">Used By:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <Link href="/software/nextjs" className="text-slate-600 hover:underline">Next.js 15</Link> - Primary framework</li>
                  <li>• Remix - React framework</li>
                  <li>• Vite + React - Build tool setup</li>
                  <li>• 8,000+ companies (OpenAI, Adobe, Netflix)</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Part of <Link href="/software" className="text-slate-600 hover:underline">Avolve Software Stack</Link> -
                Component platform for Next.js + React + Tailwind applications
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
