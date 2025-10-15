import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

// Dependencies (October 15, 2025):
// - TypeScript: 5.9.3
// - Node.js: 22.20.0 LTS (native TypeScript support)
// - Next.js: 15.5.4
// Last verified: 2025-10-06

export const metadata: Metadata = {
  title: "TypeScript 5.9 - Strongly Typed JavaScript with 10x Faster Compiler | Avolve.io",
  description: "TypeScript 5.9.3 with native Node.js 24 execution, Project Corsa 10x compiler, and Next.js 16 integration. Complete 2025 guide with modern stack patterns.",
  keywords: ["TypeScript 5.9", "Project Corsa", "Native TypeScript", "Node.js TypeScript", "TypeScript Next.js", "TypeScript 2025", "Go compiler"],
  alternates: {
    canonical: "https://avolve.io/software/typescript",
  },
};

export default function TypeScriptPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "headline": "TypeScript 5.9: Strongly Typed JavaScript with Revolutionary Performance",
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-06",
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        },
        "description": "Comprehensive analysis of TypeScript 5.9's type system, Project Corsa 10x compiler, and native Node.js 24 execution"
      },
      {
        "@type": "SoftwareApplication",
        "name": "TypeScript",
        "applicationCategory": "DeveloperApplication",
        "softwareVersion": "5.9.3",
        "operatingSystem": "Cross-platform",
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
        { name: "TypeScript", url: "/software/typescript" }
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <time className="text-sm text-muted-foreground" dateTime="2025-10-05">
          Last updated: October 15, 2025
        </time>

        <article className="mt-4">
          <h1 className="text-4xl font-bold mb-4 text-primary">TypeScript 5.9</h1>
          <p className="text-xl text-foreground mb-12">
            Strongly typed programming language that builds on JavaScript, with 83.5M weekly downloads, 85% enterprise adoption, and native Node.js 24 execution
          </p>

          {/* Core Identity Section */}
          <section id="overview" className="mb-12 bg-muted/30 border-l-2 border-border/30 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">What It Is</h2>
            <p className="text-foreground mb-4">
              <strong>TypeScript 5.9.3</strong> is a strongly typed superset of JavaScript developed by Microsoft, adding static type checking, interfaces, and modern language features. Used by <strong>Microsoft, Google, Airbnb, and Shopify</strong> with <strong>100K+ GitHub stars</strong>.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <h3 className="font-bold text-foreground mb-2">Market Dominance</h3>
                <ul className="space-y-1 text-sm text-foreground">
                  <li>• <strong>83.5M weekly downloads</strong> (npm)</li>
                  <li>• <strong>85% enterprise adoption</strong> (State of JS 2025)</li>
                  <li>• <strong>100K+ GitHub stars</strong></li>
                  <li>• <strong>78.9% developer satisfaction</strong></li>
                  <li>• <strong>Microsoft, Google, Airbnb</strong> use TypeScript</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-2">Revolutionary Features (5.9)</h3>
                <ul className="space-y-1 text-sm text-foreground">
                  <li>• Native Node.js 24 execution (<code className="bg-gray-200 px-1 rounded text-xs">node app.ts</code>)</li>
                  <li>• Project Corsa: 10x compiler (preview)</li>
                  <li>• Decorators (stage 3 proposal)</li>
                  <li>• Inferred type predicates</li>
                  <li>• Regular expression checking</li>
                  <li>• Performance optimizations</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 bg-muted/30 p-4 rounded border border-border/50 bg-gradient-to-b from-background to-muted/20 shadow-sm">
              <h3 className="font-bold mb-2">Official Documentation</h3>
              <p className="text-sm text-foreground mb-2">
                For complete type system reference and language features, visit:
              </p>
              <ul className="space-y-1 text-sm">
                <li>→ <a href="https://www.typescriptlang.org" className="text-primary hover:underline">typescriptlang.org</a> - Official documentation</li>
                <li>→ <a href="https://github.com/microsoft/TypeScript" className="text-primary hover:underline">GitHub Repository</a> - Source code and issues</li>
                <li>→ <a href="https://devblogs.microsoft.com/typescript/" className="text-primary hover:underline">TypeScript DevBlog</a> - Release announcements</li>
              </ul>
            </div>
          </section>

          {/* Why It Matters Section */}
          <section id="why-matters" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Why It Matters</h2>

            <div className="space-y-6">
              <div className="border-l-2 border-border/30 pl-4">
                <h3 className="text-xl font-bold mb-3 text-foreground">Native Execution Eliminates Build Pipeline</h3>
                <p className="text-foreground mb-3">
                  Node.js 24.8.0's native TypeScript support fundamentally changes the development workflow. Direct <code className="bg-gray-200 px-1 rounded">node app.ts</code> execution eliminates tsc, webpack, and babel from the build chain—reducing complexity, startup time, and infrastructure requirements.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-bold text-foreground mb-2">❌ Traditional Workflow (Pre-Node.js 24)</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">{`// package.json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/app.js",
    "dev": "ts-node-dev --respawn app.ts"
  },
  "devDependencies": {
    "typescript": "^5.9.3",
    "@types/node": "^22.14.0",
    "ts-node": "^10.9.2",
    "ts-node-dev": "^2.0.0"
  }
}

// Multi-step process:
// 1. Write TypeScript
// 2. Compile with tsc
// 3. Run JavaScript output
// 4. Repeat for every change`}</pre>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-bold text-foreground mb-2">✅ Native Execution (Node.js 24+)</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">{`// package.json
{
  "scripts": {
    "dev": "node --watch app.ts",
    "start": "node app.ts"
  }
  // No devDependencies needed!
  // TypeScript types used for IDE only
}

// Single-step process:
// 1. Write TypeScript
// 2. Run with: node app.ts
// Done!

// No dist/ directory
// No build artifacts
// Instant startup`}</pre>
                  </div>
                </div>
                <div className="mt-3 bg-muted p-3 rounded">
                  <h5 className="font-bold text-sm mb-2">⚠️ Important Caveat:</h5>
                  <p className="text-xs text-foreground">
                    Native execution strips types at runtime but doesn't perform type checking. Use <code className="bg-gray-200 px-1 rounded">tsc --noEmit</code> in CI/CD for validation, but dev/prod execution requires zero build step.
                  </p>
                </div>
              </div>

              <div className="border-l-2 border-border/30 pl-4">
                <h3 className="text-xl font-bold mb-3 text-foreground">Project Corsa: 10x Compiler Performance</h3>
                <p className="text-foreground mb-3">
                  Microsoft's Project Corsa rewrites the TypeScript compiler in Go, delivering 8-10x faster performance with 50% less memory usage. Expected as TypeScript 7.0 by end of 2025, this represents the biggest compiler improvement since TypeScript's creation.
                </p>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Measured Performance Improvements:</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead className="bg-muted/30">
                        <tr>
                          <th className="border border-border/40 px-3 py-2 text-left">Operation</th>
                          <th className="border border-border/40 px-3 py-2 text-left">TS 5.9 (JS)</th>
                          <th className="border border-border/40 px-3 py-2 text-left">Corsa (Go)</th>
                          <th className="border border-border/40 px-3 py-2 text-left">Improvement</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border/40 px-3 py-2">VS Code project load</td>
                          <td className="border border-border/40 px-3 py-2">9.6s</td>
                          <td className="border border-border/40 px-3 py-2">1.2s</td>
                          <td className="border border-border/40 px-3 py-2"><strong>8x faster</strong></td>
                        </tr>
                        <tr>
                          <td className="border border-border/40 px-3 py-2">Full type check</td>
                          <td className="border border-border/40 px-3 py-2">15.3s</td>
                          <td className="border border-border/40 px-3 py-2">1.8s</td>
                          <td className="border border-border/40 px-3 py-2"><strong>8.5x faster</strong></td>
                        </tr>
                        <tr>
                          <td className="border border-border/40 px-3 py-2">Average workload</td>
                          <td className="border border-border/40 px-3 py-2">Baseline</td>
                          <td className="border border-border/40 px-3 py-2">10x faster</td>
                          <td className="border border-border/40 px-3 py-2"><strong>10x faster</strong></td>
                        </tr>
                        <tr>
                          <td className="border border-border/40 px-3 py-2">Memory usage</td>
                          <td className="border border-border/40 px-3 py-2">Baseline</td>
                          <td className="border border-border/40 px-3 py-2">50% less</td>
                          <td className="border border-border/40 px-3 py-2"><strong>2x better</strong></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="border-l-2 border-border/30 pl-4">
                <h3 className="text-xl font-bold mb-3 text-foreground">Type Safety Prevents Entire Bug Classes</h3>
                <p className="text-foreground mb-3">
                  TypeScript's static type system catches errors at compile time that would otherwise crash in production. Industry research shows TypeScript prevents 15% of bugs in JavaScript codebases—directly translating to reduced support costs, faster development, and higher reliability.
                </p>
                <div className="space-y-3">
                  <div className="bg-muted p-3 rounded">
                    <h5 className="font-bold text-sm mb-2">Bug Prevention Examples:</h5>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">{`// JavaScript - Runtime crash
function getUser(id) {
  return users.find(u => u.id === id);
}

const user = getUser(123);
console.log(user.name.toUpperCase()); // Crash if user is undefined!

// TypeScript - Compile-time error
function getUser(id: number): User | undefined {
  return users.find(u => u.id === id);
}

const user = getUser(123);
console.log(user.name.toUpperCase()); // Error: user might be undefined
                                       // Fix: user?.name.toUpperCase()

// Prevents:
// ✅ Null/undefined reference errors
// ✅ Type mismatch errors (string vs number)
// ✅ Missing property errors
// ✅ Incorrect function arguments
// ✅ Async/await mistakes`}</pre>
                  </div>
                  <div className="bg-muted/30 p-3 rounded">
                    <h5 className="font-bold text-sm mb-2">Enterprise Impact (Airbnb Case Study):</h5>
                    <ul className="space-y-1 text-xs text-foreground">
                      <li>• <strong>38% reduction</strong> in production bugs after TypeScript migration</li>
                      <li>• <strong>15% faster</strong> feature development (better IDE autocomplete)</li>
                      <li>• <strong>50% reduction</strong> in runtime errors from type mismatches</li>
                      <li>• <strong>Paid for itself</strong> in first 3 months through bug reduction</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Architecture Section */}
          <section id="architecture" className="mb-12 border-t pt-8 bg-muted p-6 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Technical Architecture</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">Next.js 16 Integration</h3>
                <div className="bg-white p-4 rounded border border-border">
                  <h4 className="font-bold mb-2">Automatic TypeScript Support:</h4>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">{`// tsconfig.json (auto-generated by Next.js)
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}`}</pre>
                  <h4 className="font-bold mt-3 mb-2">Type-Safe Next.js Components:</h4>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">{`// app/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome'
}

interface User {
  id: number
  name: string
  email: string
}

export default async function Page() {
  const response = await fetch('https://api.example.com/users')
  const users: User[] = await response.json()

  return (
    <div>
      {users.map((user: User) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Vercel AI SDK Type Safety</h3>
                <div className="bg-muted/30 p-4 rounded border-l-2 border-border/30">
                  <h4 className="font-bold mb-2">Fully Typed AI Workflows:</h4>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">{`import { openai } from '@ai-sdk/openai'
import { streamText, tool } from 'ai'
import { z } from 'zod'

// Type-safe tool definition
const weatherTool = tool({
  description: 'Get weather for a location',
  parameters: z.object({
    location: z.string().describe('The city name'),
    unit: z.enum(['celsius', 'fahrenheit'])
  }),
  execute: async ({ location, unit }) => {
    // Return type is inferred!
    return {
      location,
      temperature: 72,
      unit
    }
  }
})

// Type-safe streaming
const { textStream } = await streamText({
  model: openai('gpt-4'),
  prompt: 'What is the weather?',
  tools: { weatherTool },
  // All parameters are type-checked!
})`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Advanced Type Patterns</h3>
                <div className="bg-muted/30 p-4 rounded border border-border/50 bg-gradient-to-b from-background to-muted/20 shadow-sm">
                  <h4 className="font-bold mb-2">TypeScript 5.9 Features:</h4>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">{`// Inferred Type Predicates (5.9)
function isString(value: unknown) {
  return typeof value === 'string'
  // Return type automatically inferred as:
  // value is string
}

// Decorator Support (5.9)
function log(target: any, propertyKey: string) {
  console.log(\`Called \${propertyKey}\`)
}

class Example {
  @log
  method() {}
}

// Regular Expression Checking (5.9)
const regex = /([a-z]+)\\1/
// TypeScript now validates regex syntax!

// Template Literal Types
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
type Endpoint = \`/api/\${string}\`
type Request = \`\${HTTPMethod} \${Endpoint}\`

const req: Request = 'GET /api/users' // ✅
const bad: Request = 'INVALID /api/users' // ❌ Type error`}</pre>
                </div>
              </div>
            </div>
          </section>

          {/* Real-World Implementation Section */}
          <section id="implementation" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Real-World Implementation</h2>

            <div className="space-y-6">
              <div className="bg-muted/30 p-4 rounded-lg border-l-2 border-border/30">
                <h3 className="text-lg font-bold mb-3">Production Type-Safe API</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-sm mb-2">End-to-End Type Safety:</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">{`// lib/types.ts
export interface User {
  id: number
  name: string
  email: string
}

// app/api/users/route.ts (Next.js API)
import { NextRequest, NextResponse } from 'next/server'
import { User } from '@/lib/types'

export async function GET(request: NextRequest): Promise<NextResponse<User[]>> {
  const users: User[] = await db.query('SELECT * FROM users')

  return NextResponse.json(users)
}

// app/page.tsx (Client consumption)
import { User } from '@/lib/types'

export default async function Page() {
  const response = await fetch('/api/users')
  const users: User[] = await response.json()

  // Type-safe access!
  return users.map(user => user.name)
}`}</pre>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg border-l-2 border-border/30">
                <h3 className="text-lg font-bold mb-3">Production Issues and Fixes</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-sm mb-2">Issue #1: "any" Type Escape Hatch Abuse</h4>
                    <p className="text-xs text-foreground mb-2">
                      <strong>Symptom:</strong> Runtime errors despite TypeScript claiming type safety
                    </p>
                    <p className="text-xs text-foreground mb-2">
                      <strong>Cause:</strong> Using "any" type defeats type checking
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">{`// ❌ Wrong - "any" disables type safety
function processUser(user: any) {
  console.log(user.name.toUpperCase()) // Crashes if name doesn't exist!
}

// ✅ Right - Proper typing
interface User {
  name: string
}

function processUser(user: User) {
  console.log(user.name.toUpperCase()) // Safe!
}

// Enable strict checking in tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true
  }
}`}</pre>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm mb-2">Issue #2: Type Assertions Hide Bugs</h4>
                    <p className="text-xs text-foreground mb-2">
                      <strong>Symptom:</strong> Type assertion "as" used to force types, causing runtime errors
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">{`// ❌ Wrong - Forcing type with "as"
const data = JSON.parse(response) as User
// What if response doesn't match User shape?

// ✅ Right - Runtime validation with Zod
import { z } from 'zod'

const UserSchema = z.object({
  name: z.string(),
  email: z.string().email()
})

const data = UserSchema.parse(JSON.parse(response))
// Throws error if shape doesn't match!`}</pre>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm mb-2">Issue #3: Optional Chaining Ignored</h4>
                    <p className="text-xs text-foreground mb-2">
                      <strong>Symptom:</strong> "Cannot read property of undefined" in production
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">{`// ❌ Wrong - Assuming value exists
function getUserEmail(user: User | undefined) {
  return user.email // Crash if user is undefined!
}

// ✅ Right - Optional chaining + nullish coalescing
function getUserEmail(user: User | undefined): string {
  return user?.email ?? 'No email'
}`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Decision Framework Section */}
          <section id="decisions" className="mb-12 border-t pt-8 bg-muted p-6 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Decision Framework</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-foreground">✅ Choose TypeScript When:</h3>
                <ul className="space-y-2 text-foreground">
                  <li>• <strong>Team size &gt;2:</strong> Type safety prevents integration bugs</li>
                  <li>• <strong>Long-term project:</strong> Refactoring confidence and maintainability</li>
                  <li>• <strong>Complex data models:</strong> Interfaces define clear contracts</li>
                  <li>• <strong>Enterprise requirements:</strong> 85% of enterprises use TypeScript</li>
                  <li>• <strong>Library development:</strong> Type definitions improve DX</li>
                  <li>• <strong>IDE autocomplete critical:</strong> 10-15% productivity boost</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-foreground">❌ Consider Alternatives When:</h3>
                <ul className="space-y-2 text-foreground">
                  <li>• <strong>Prototype/hackathon:</strong> JavaScript faster for throwaway code</li>
                  <li>• <strong>Solo project &lt;1K LOC:</strong> Type overhead not worth it</li>
                  <li>• <strong>Learning JavaScript:</strong> Master JS fundamentals first</li>
                  <li>• <strong>Legacy codebase migration:</strong> Gradual adoption via JSDoc may be better</li>
                  <li>• <strong>Build time sensitive:</strong> Wait for Project Corsa (TS 7.0)</li>
                </ul>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-xl font-bold mb-3">Migration Strategy</h3>
                <div className="bg-white p-4 rounded border border-border">
                  <h4 className="font-bold mb-2">Incremental Adoption Path:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-foreground">
                    <li><strong>Enable TypeScript:</strong> Rename .js → .ts, add tsconfig.json</li>
                    <li><strong>Start strict: false:</strong> Migrate gradually without breaking build</li>
                    <li><strong>Add types incrementally:</strong> Start with function signatures, then interfaces</li>
                    <li><strong>Enable strict mode:</strong> When type coverage reaches 80%+</li>
                    <li><strong>Remove "any" types:</strong> Final cleanup for full type safety</li>
                  </ol>
                  <div className="mt-3 bg-muted/30 p-3 rounded">
                    <h5 className="font-bold text-sm mb-2">Quick Win: JSDoc Comments</h5>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">{`// Get TypeScript benefits in .js files
/**
 * @param {number} id
 * @returns {Promise<User | undefined>}
 */
async function getUser(id) {
  // TypeScript checks this in VS Code!
}`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* AI Assistant Reference Section */}
          <section id="for-ai" className="mb-12 border-t pt-8 bg-muted/30 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">🤖 For AI Assistants</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold mb-2">Core Facts:</h3>
                <ul className="space-y-1 text-sm text-foreground">
                  <li>• <strong>Version:</strong> 5.9.3 (August 2025)</li>
                  <li>• <strong>Native execution:</strong> Node.js 24+ runs .ts directly</li>
                  <li>• <strong>Project Corsa:</strong> 10x compiler in preview (TS 7.0)</li>
                  <li>• <strong>Adoption:</strong> 83.5M weekly downloads, 85% enterprise</li>
                  <li>• <strong>Bug prevention:</strong> 15% reduction (industry research)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">Code Generation:</h3>
                <ul className="space-y-1 text-sm text-foreground">
                  <li>• Always use <code className="bg-gray-200 px-1 rounded">strict: true</code> in tsconfig.json</li>
                  <li>• Define interfaces for all data structures</li>
                  <li>• Use <code className="bg-gray-200 px-1 rounded">z.infer&lt;typeof schema&gt;</code> for Zod types</li>
                  <li>• Avoid "any" - use "unknown" then type guard</li>
                  <li>• Runtime validation with Zod for external data</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 bg-white p-3 rounded border border-border/40">
              <h4 className="font-bold text-sm mb-2">Quick Reference Template:</h4>
              <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">{`// TypeScript + Next.js 16 + Zod pattern
import { z } from 'zod'

// 1. Define schema
const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email()
})

// 2. Infer TypeScript type
type User = z.infer<typeof UserSchema>

// 3. Runtime validation + type safety
export async function getUser(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`)
  const data = await response.json()

  return UserSchema.parse(data) // Validates + returns typed User
}`}</pre>
            </div>
          </section>

          {/* Stack Relationships Section */}
          <section id="relationships" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Stack Relationships</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-2 text-foreground">Foundation For:</h3>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• <Link href="/software/nextjs" className="text-primary hover:underline">Next.js 16 Beta</Link> - Type-safe React framework</li>
                  <li>• <Link href="/software/react" className="text-primary hover:underline">React 19</Link> - Type-safe components</li>
                  <li>• <Link href="/software/vercel-ai-sdk" className="text-primary hover:underline">Vercel AI SDK</Link> - Type-safe AI workflows</li>
                  <li>• All modern JavaScript libraries</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-foreground">Runs On:</h3>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• <Link href="/software/nodejs" className="text-primary hover:underline">Node.js 24.8.0</Link> - Native .ts execution</li>
                  <li>• Any JavaScript runtime (Deno, Bun)</li>
                  <li>• Browsers (after compilation)</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Part of <Link href="/software" className="text-primary hover:underline">Avolve Software Stack</Link> -
                Type system for Next.js + React + Node.js applications
              </p>
            </div>
          </section>

          <nav className="mt-12 pt-8 border-t border-border">
            <Link href="/software" className="text-primary hover:underline">
              ← Back to Software
            </Link>
          </nav>
        </article>
      </main>
    </>
  );
}
