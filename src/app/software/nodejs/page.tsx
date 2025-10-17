import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

// Dependencies (October 17, 2025):
// - Node.js: 22.20.0 LTS (production), 24.9.0 (becomes LTS Oct 28, 2025)
// - V8 Engine: 13.6
// - npm: 11.6.0
// Last verified: 2025-10-06

export const metadata: Metadata = {
  title: "Node.js 24.9.0 - Native TypeScript + LTS Coming Oct 28 | Avolve.io",
  description: "Node.js 24.9.0 with native TypeScript execution (becomes LTS Oct 28, 2025). Use 22.20.0 LTS for production now. V8 13.6 engine, 400% performance gains, modern stack integration.",
  keywords: ["Node.js 24", "native TypeScript", "Node.js performance", "V8 13.6", "runtime security", "Worker Threads", "Next.js Node.js", "JavaScript runtime 2025"],
  alternates: {
    canonical: "https://avolve.io/software/nodejs",
  },
};

export default function NodeJSPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "headline": "Node.js 24.9.0: JavaScript Runtime with Native TypeScript (LTS Oct 28, 2025)",
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-06",
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        },
        "description": "Comprehensive analysis of Node.js 24.9.0's native TypeScript support, 400% performance improvements, LTS status (Oct 28, 2025), and production recommendations (use 22.20.0 LTS until then)"
      },
      {
        "@type": "SoftwareApplication",
        "name": "Node.js",
        "applicationCategory": "DeveloperApplication",
        "softwareVersion": "24.9.0",
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
        { name: "Node.js", url: "/software/nodejs" }
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <time className="text-sm text-muted-foreground" dateTime="2025-10-06">
          Last updated: October 17, 2025
        </time>

        <article className="mt-4">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Node.js 24.9.0 (LTS Oct 28, 2025)</h1>
          <p className="text-xl text-foreground mb-12">
            JavaScript runtime with native TypeScript execution and 400% performance improvements. <strong>Use 22.20.0 LTS for production until Oct 28, 2025</strong>, then upgrade to 24.9.0 LTS.
          </p>

          {/* Core Identity Section */}
          <section id="overview" className="mb-12 bg-muted border border-border/50 bg-gradient-to-b from-background to-muted/20 shadow-sm p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">What It Is</h2>
            <p className="text-foreground mb-4">
              <strong>Node.js 24.9.0</strong> (released Sep 25, 2025, <strong>becomes LTS Oct 28, 2025</strong>) is an open-source JavaScript runtime built on Chrome's V8 13.6 engine, enabling native TypeScript execution without build tools, delivering <strong>400% faster URL parsing</strong> and powering <strong>98% of Fortune 500 companies</strong>. For production environments, <strong>use Node.js 22.20.0 LTS</strong> until the Oct 28 transition.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <h3 className="font-bold text-foreground mb-2">Market Dominance</h3>
                <ul className="space-y-1 text-sm text-foreground">
                  <li>• <strong>98% Fortune 500 adoption</strong></li>
                  <li>• <strong>30M+ websites</strong> (4.6% of all sites)</li>
                  <li>• <strong>40.8% developer usage</strong> (Stack Overflow 2025)</li>
                  <li>• <strong>107K+ GitHub stars</strong></li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-2">Revolutionary Features</h3>
                <ul className="space-y-1 text-sm text-foreground">
                  <li>• Native TypeScript: <code className="bg-gray-200 px-1 rounded text-xs">node app.ts</code></li>
                  <li>• 400% faster URL parsing (Ada)</li>
                  <li>• 364% faster TextDecoder (simdutf)</li>
                  <li>• Stable Permission Model (sandboxing)</li>
                  <li>• Built-in WebSocket client</li>
                  <li>• V8 13.6 Maglev JIT compiler</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 bg-muted/30 p-4 rounded border-l-2 border-border/30">
              <h3 className="font-bold mb-2">Official Documentation</h3>
              <p className="text-sm text-foreground mb-2">
                For API reference and latest releases, visit:
              </p>
              <ul className="space-y-1 text-sm">
                <li>→ <a href="https://nodejs.org" className="text-primary hover:underline">nodejs.org</a> - Official docs and downloads</li>
                <li>→ <a href="https://nodejs.org/api/" className="text-primary hover:underline">API Documentation</a> - Complete API reference</li>
                <li>→ <a href="https://github.com/nodejs/node" className="text-primary hover:underline">GitHub Repository</a> - Source code and issues</li>
              </ul>
            </div>
          </section>

          {/* Why It Matters Section */}
          <section id="why-matters" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Why It Matters</h2>

            <div className="space-y-6">
              <div className="border border-border/50 bg-gradient-to-b from-background to-muted/20 shadow-sm pl-4">
                <h3 className="text-xl font-bold mb-3 text-foreground">Native TypeScript Revolution</h3>
                <p className="text-foreground mb-3">
                  Node.js 24.9.0 (and 22.20.0 LTS) eliminates the entire TypeScript build pipeline. Direct execution of .ts files without tsc, webpack, or babel fundamentally changes development workflow and deployment architecture.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-bold text-foreground mb-2">❌ Before (Node.js 22 and Earlier)</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">{`// Required build pipeline
npm install -D typescript @types/node
npx tsc app.ts
node dist/app.js

// package.json scripts
{
  "build": "tsc",
  "start": "node dist/app.js"
}`}</pre>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-bold text-foreground mb-2">✅ Now (Node.js 24.9.0 / 22.20.0 LTS)</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">{`// Direct execution - zero build
node app.ts

// package.json scripts
{
  "dev": "node --watch app.ts",
  "start": "node app.ts"
}
// No tsconfig.json, no dist/, no build step`}</pre>
                  </div>
                </div>
                <div className="mt-3 bg-muted/30 p-3 rounded">
                  <h5 className="font-bold text-sm mb-2">Microsoft's Go-Powered Compiler (Preview):</h5>
                  <ul className="space-y-1 text-xs text-foreground">
                    <li>• <strong>8x faster project loading</strong> in VS Code (1.2s vs 9.6s)</li>
                    <li>• <strong>10x average performance</strong> across codebases</li>
                    <li>• <strong>50% memory reduction</strong> vs JavaScript implementation</li>
                    <li>• Expected as TypeScript 7.0 by end of 2025</li>
                  </ul>
                </div>
              </div>

              <div className="border-l-2 border-border/30 pl-4">
                <h3 className="text-xl font-bold mb-3 text-foreground">Performance Transformation</h3>
                <p className="text-foreground mb-3">
                  Node.js 24.9.0 (and 22.20.0 LTS) delivers measurable, dramatic performance improvements that translate to real-world application benefits: 15-20% faster data-heavy workloads, reduced infrastructure costs, and improved user experience.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Core Performance Metrics:</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead className="bg-muted/30">
                        <tr>
                          <th className="border border-border/40 px-3 py-2 text-left">Operation</th>
                          <th className="border border-border/40 px-3 py-2 text-left">Improvement</th>
                          <th className="border border-border/40 px-3 py-2 text-left">Technology</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border/40 px-3 py-2">URL parsing</td>
                          <td className="border border-border/40 px-3 py-2"><strong>400%</strong></td>
                          <td className="border border-border/40 px-3 py-2">Ada parser (C++)</td>
                        </tr>
                        <tr>
                          <td className="border border-border/40 px-3 py-2">TextDecoder (UTF-8)</td>
                          <td className="border border-border/40 px-3 py-2"><strong>364%</strong></td>
                          <td className="border border-border/40 px-3 py-2">simdutf (SIMD)</td>
                        </tr>
                        <tr>
                          <td className="border border-border/40 px-3 py-2">Buffer.compare()</td>
                          <td className="border border-border/40 px-3 py-2"><strong>200%</strong></td>
                          <td className="border border-border/40 px-3 py-2">Optimized C++</td>
                        </tr>
                        <tr>
                          <td className="border border-border/40 px-3 py-2">HTTP server</td>
                          <td className="border border-border/40 px-3 py-2"><strong>96%</strong></td>
                          <td className="border border-border/40 px-3 py-2">Core optimization</td>
                        </tr>
                        <tr>
                          <td className="border border-border/40 px-3 py-2">TextEncoder (ASCII)</td>
                          <td className="border border-border/40 px-3 py-2"><strong>93.67%</strong></td>
                          <td className="border border-border/40 px-3 py-2">SIMD encoding</td>
                        </tr>
                        <tr>
                          <td className="border border-border/40 px-3 py-2">Real-world apps</td>
                          <td className="border border-border/40 px-3 py-2"><strong>15-20%</strong></td>
                          <td className="border border-border/40 px-3 py-2">Combined gains</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="border-l-2 border-border/30 pl-4">
                <h3 className="text-xl font-bold mb-3 text-foreground">Enterprise Security Model</h3>
                <p className="text-foreground mb-3">
                  The stabilized Permission Model enables zero-trust architecture by default, allowing granular control over filesystem, network, and process access—critical for running untrusted code and meeting compliance requirements.
                </p>
                <div className="space-y-3">
                  <div className="bg-muted p-3 rounded">
                    <h5 className="font-bold text-sm mb-2">September 2025 Security Context:</h5>
                    <ul className="space-y-1 text-xs text-foreground">
                      <li>• <strong>"Qix" phishing attack:</strong> Compromised 18-20 packages (chalk, debug) affecting 2.6B weekly downloads</li>
                      <li>• <strong>"Shai-Hulud" worm:</strong> Self-propagating infection of 180+ packages with TruffleHog credential harvesting</li>
                      <li>• <strong>2-hour response time:</strong> Community demonstrated improved incident response</li>
                      <li>• <strong>Permission Model benefit:</strong> Sandboxing prevents malicious package access to filesystem/network</li>
                    </ul>
                  </div>
                  <div className="bg-muted/30 p-3 rounded">
                    <h5 className="font-bold text-sm mb-2">Permission Model Usage:</h5>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">{`# Granular permission control
node --permission --allow-fs-read=/app/data --allow-net app.js

# Restrict filesystem writes
node --permission --allow-fs-write=/tmp app.js

# Network access control
node --permission --allow-net=api.example.com:443 app.js`}</pre>
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
                <h3 className="text-xl font-bold mb-3">V8 13.6 Engine</h3>
                <div className="bg-white p-4 rounded border border-border">
                  <h4 className="font-bold mb-2">Maglev Compiler (Default Enabled):</h4>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li>• <strong>30% performance improvement</strong> for short-lived CLI programs</li>
                    <li>• <strong>Background thread JIT:</strong> Non-blocking compilation for better responsiveness</li>
                    <li>• <strong>Explicit compile hints:</strong> Magic comments for optimization control</li>
                    <li>• <strong>WebAssembly GC support:</strong> Efficient memory management for WASM modules</li>
                  </ul>
                  <h4 className="font-bold mt-3 mb-2">Modern JavaScript Features:</h4>
                  <ul className="space-y-1 text-sm text-foreground">
                    <li>• <code className="bg-gray-200 px-1 rounded">Array.fromAsync</code> - Async array creation</li>
                    <li>• <code className="bg-gray-200 px-1 rounded">Set methods</code> - union, intersection, difference</li>
                    <li>• <code className="bg-gray-200 px-1 rounded">Float16Array</code> - Graphics and ML support</li>
                    <li>• <code className="bg-gray-200 px-1 rounded">RegExp.escape()</code> - Safe regex construction</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Native Capabilities</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded border border-border">
                    <h4 className="font-bold mb-2">Built-in glob Support:</h4>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">{`// No external packages needed
import { glob, globSync } from 'node:fs';

const files = await glob('src/**/*.js');
const tests = globSync('test/**/*.test.ts');`}</pre>
                  </div>
                  <div className="bg-white p-4 rounded border border-border">
                    <h4 className="font-bold mb-2">Built-in WebSocket:</h4>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">{`// Browser-compatible API
import { WebSocket } from 'node:ws';

const ws = new WebSocket('wss://api.example.com');
ws.addEventListener('message', (event) => {
  console.log(event.data);
});`}</pre>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Worker Threads Architecture</h3>
                <div className="bg-muted/30 p-4 rounded border-l-2 border-border/30">
                  <h4 className="font-bold mb-2">Production Use Cases:</h4>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li>• <strong>Netflix:</strong> Complex video processing with multi-core scaling</li>
                    <li>• <strong>Zoom/Google Meet:</strong> WebAssembly integration for performance</li>
                    <li>• <strong>CPU-intensive workloads:</strong> Automatic OS thread distribution</li>
                  </ul>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto mt-3">{`import { Worker, MessageChannel } from 'worker_threads';

// Direct thread-to-thread communication
const { port1, port2 } = new MessageChannel();
const worker = new Worker('./worker.js', {
  transferList: [port2]
});

// Memory sharing with SharedArrayBuffer
const sharedBuffer = new SharedArrayBuffer(1024);
const sharedArray = new Int32Array(sharedBuffer);`}</pre>
                </div>
              </div>
            </div>
          </section>

          {/* Real-World Implementation Section */}
          <section id="implementation" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Real-World Implementation</h2>

            <div className="space-y-6">
              <div className="bg-muted p-4 rounded-lg border border-border/50 bg-gradient-to-b from-background to-muted/20 shadow-sm">
                <h3 className="text-lg font-bold mb-3">Node.js 24.9.0 / 22.20.0 LTS + Next.js 16 Beta Integration</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-sm mb-2">1. Project Setup:</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">{`// package.json
{
  "engines": {
    "node": ">=22.20.0"
  },
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start"
  }
}

// Direct TypeScript execution - no build step
// app/page.tsx runs natively in Node.js 24+`}</pre>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm mb-2">2. Performance Benefits:</h4>
                    <ul className="space-y-1 text-xs text-foreground">
                      <li>• <strong>2-5x faster Turbopack</strong> compilation with Node.js 24</li>
                      <li>• <strong>Native TypeScript</strong> eliminates transpilation overhead</li>
                      <li>• <strong>Worker Threads</strong> power Next.js parallel rendering</li>
                      <li>• <strong>HTTP/2 improvements</strong> boost Server Components</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm mb-2">3. Direct TypeScript Server:</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">{`// server.ts - Direct execution
import { createServer } from 'node:http';

interface User {
  id: string;
  name: string;
}

const server = createServer((req, res) => {
  const user: User = { id: '1', name: 'John' };
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(user));
});

server.listen(3000);

// Run: node server.ts
// No tsc, no webpack, no babel`}</pre>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg border-l-2 border-border/30">
                <h3 className="text-lg font-bold mb-3">Enterprise Success Stories</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-bold text-sm mb-2">PayPal</h4>
                    <ul className="space-y-1 text-xs text-foreground">
                      <li>• 33% fewer lines of code</li>
                      <li>• 35% faster response times</li>
                      <li>• Reduced infrastructure costs</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-2">LinkedIn</h4>
                    <ul className="space-y-1 text-xs text-foreground">
                      <li>• 90% server reduction</li>
                      <li>• 20x performance improvement</li>
                      <li>• Simplified architecture</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-2">Netflix</h4>
                    <ul className="space-y-1 text-xs text-foreground">
                      <li>• 70% startup time reduction</li>
                      <li>• Complex video processing</li>
                      <li>• Global CDN integration</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg border border-border/50 bg-gradient-to-b from-background to-muted/20 shadow-sm">
                <h3 className="text-lg font-bold mb-3">Framework Performance (TechEmpower Round 23)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead className="bg-muted/30">
                      <tr>
                        <th className="border border-border/40 px-3 py-2 text-left">Framework</th>
                        <th className="border border-border/40 px-3 py-2 text-left">Requests/Second</th>
                        <th className="border border-border/40 px-3 py-2 text-left">Latency</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border/40 px-3 py-2">Koa</td>
                        <td className="border border-border/40 px-3 py-2"><strong>55,000</strong></td>
                        <td className="border border-border/40 px-3 py-2">Lowest</td>
                      </tr>
                      <tr>
                        <td className="border border-border/40 px-3 py-2">Fastify</td>
                        <td className="border border-border/40 px-3 py-2"><strong>45,743</strong></td>
                        <td className="border border-border/40 px-3 py-2">21.36ms</td>
                      </tr>
                      <tr>
                        <td className="border border-border/40 px-3 py-2">Express</td>
                        <td className="border border-border/40 px-3 py-2"><strong>18,000-20,000</strong></td>
                        <td className="border border-border/40 px-3 py-2">Baseline</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Decision Framework Section */}
          <section id="decisions" className="mb-12 border-t pt-8 bg-muted p-6 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Decision Framework</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-foreground">✅ Choose Node.js 22.20.0 LTS (Production) or 24.9.0 (Oct 28+) When:</h3>
                <ul className="space-y-2 text-foreground">
                  <li>• <strong>New projects:</strong> No legacy constraints, ready for native TypeScript</li>
                  <li>• <strong>Build tool elimination:</strong> Want to remove tsc, webpack, babel from pipeline</li>
                  <li>• <strong>Performance critical:</strong> Applications benefit from 15-20% real-world gains</li>
                  <li>• <strong>Latest features:</strong> Need V8 13.6 Maglev, Float16Array, RegExp.escape()</li>
                  <li>• <strong>Security requirements:</strong> Permission Model for zero-trust architecture</li>
                  <li>• <strong>Dependency reduction:</strong> Built-in glob, WebSocket, watch mode</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-primary">🔵 Consider Node.js 22.x LTS When:</h3>
                <ul className="space-y-2 text-foreground">
                  <li>• <strong>Production stability priority:</strong> Need LTS support (until April 2027)</li>
                  <li>• <strong>Enterprise constraints:</strong> Risk-averse organizations with change control</li>
                  <li>• <strong>Mature ecosystem:</strong> All dependencies thoroughly tested on 22.x</li>
                  <li>• <strong>Conservative approach:</strong> Wait for Node.js 24 LTS (expected October 2025)</li>
                </ul>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-xl font-bold mb-3">Migration Strategy</h3>
                <div className="bg-white p-4 rounded border border-border">
                  <h4 className="font-bold mb-2">Incremental Adoption Path:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-foreground">
                    <li><strong>Install Node.js 22.20.0 LTS</strong> (production) or 24.9.0 (after Oct 28, 2025) using nvm</li>
                    <li><strong>Test native TypeScript</strong> with existing .ts files: <code className="bg-gray-200 px-1 rounded">node app.ts</code></li>
                    <li><strong>Simplify package.json</strong> scripts to remove build steps</li>
                    <li><strong>Enable Permission Model</strong> in staging environment</li>
                    <li><strong>Replace dependencies</strong> with native features (glob, WebSocket, watch)</li>
                    <li><strong>Production deployment</strong> after thorough testing (or use 22.x LTS for stability)</li>
                  </ol>
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
                  <li>• <strong>Version:</strong> 22.20.0 LTS (production) / 24.9.0 (LTS Oct 28, 2025)</li>
                  <li>• <strong>V8 Engine:</strong> 13.6 with Maglev JIT</li>
                  <li>• <strong>Native TypeScript:</strong> Direct <code className="bg-gray-200 px-1 rounded">node app.ts</code> execution</li>
                  <li>• <strong>Performance:</strong> 67-400% improvements, 15-20% real-world</li>
                  <li>• <strong>LTS:</strong> Node.js 22.x (until April 2027)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">Code Generation:</h3>
                <ul className="space-y-1 text-sm text-foreground">
                  <li>• Use <code className="bg-gray-200 px-1 rounded">node:</code> prefix: <code className="bg-gray-200 px-1 rounded">import {'{'} glob {'}'} from 'node:fs'</code></li>
                  <li>• Direct .ts execution: No build tools needed</li>
                  <li>• Permission Model: <code className="bg-gray-200 px-1 rounded">--permission --allow-fs-read=/app</code></li>
                  <li>• Built-in watch: <code className="bg-gray-200 px-1 rounded">node --watch app.ts</code></li>
                  <li>• Worker threads for CPU-intensive tasks</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 bg-white p-3 rounded border border-border/40">
              <h4 className="font-bold text-sm mb-2">Quick Reference Template:</h4>
              <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">{`// package.json for Node.js (Production LTS)
{
  "engines": { "node": ">=22.20.0" },
  "scripts": {
    "dev": "node --watch src/app.ts",
    "start": "node src/app.ts",
    "test": "node --test test/**/*.test.ts"
  }
}
// No build tools, no dist/, no tsconfig.json for execution`}</pre>
            </div>
          </section>

          {/* Stack Relationships Section */}
          <section id="relationships" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Stack Relationships</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-2 text-foreground">Foundation For:</h3>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• <Link href="/software/nextjs" className="text-primary hover:underline">Next.js 16 Beta</Link> - React framework runtime</li>
                  <li>• <Link href="/software/react" className="text-primary hover:underline">React 19</Link> - Server Components execution</li>
                  <li>• <Link href="/software/typescript" className="text-primary hover:underline">TypeScript 5.9</Link> - Native .ts file execution</li>
                  <li>• <Link href="/software/vercel-ai-sdk" className="text-primary hover:underline">Vercel AI SDK</Link> - AI application runtime</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-foreground">Built With:</h3>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• V8 JavaScript Engine 13.6 (Chromium project)</li>
                  <li>• libuv (async I/O, cross-platform)</li>
                  <li>• Ada parser (URL parsing - 400% faster)</li>
                  <li>• simdutf (UTF-8 validation - 364% faster)</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Part of <Link href="/software" className="text-primary hover:underline">Avolve Software Stack</Link> -
                Runtime foundation for Next.js + React + TypeScript modern applications
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
