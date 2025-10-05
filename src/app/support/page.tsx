import type { Metadata } from "next";
import Link from "next/link";

// Dependencies (October 5, 2025):
// - Next.js: 15.5.4
// - React: 19.2.0
// - TypeScript: 5.9.2
// Last verified: 2025-10-05

export const metadata: Metadata = {
  title: "Support - Production Runbooks | Avolve.io",
  description: "Production troubleshooting guides for Next.js 15 + React 19.2 + Supabase. Database performance, auth issues, deployment failures.",
};

export default function SupportPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "headline": "Support: Production Operations & Troubleshooting",
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-05",
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        }
      },
      {
        "@type": "HowTo",
        "name": "Diagnose and Fix Slow Database Queries",
        "description": "Step-by-step guide to identify and resolve database performance issues in production",
        "totalTime": "PT1H",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Check query execution time",
            "text": "Run EXPLAIN ANALYZE on slow queries to identify bottlenecks"
          },
          {
            "@type": "HowToStep",
            "name": "Verify index usage",
            "text": "Check if queries are using appropriate indexes with pg_stat_user_indexes"
          },
          {
            "@type": "HowToStep",
            "name": "Analyze query plan",
            "text": "Look for sequential scans, nested loops, and missing index hints"
          },
          {
            "@type": "HowToStep",
            "name": "Apply performance fix",
            "text": "Create missing indexes, optimize WHERE clauses, or rewrite inefficient joins"
          },
          {
            "@type": "HowToStep",
            "name": "Verify improvement",
            "text": "Re-run EXPLAIN ANALYZE and monitor query time reduction"
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
          <h1 className="text-4xl font-bold mb-4 text-stone-700">Support</h1>
          <p className="text-xl text-gray-700 mb-12">
            Operations keeping production running
          </p>

          <section id="support-definition" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">What is Support?</h2>
            <p className="text-gray-700 mb-4">
              Support is the operational work that keeps production systems running smoothly.
              This includes monitoring, debugging, incident response, and optimization.
            </p>
            <p className="text-gray-700">
              Support maintains <Link href="/solutions" className="text-slate-600 hover:underline">Solutions</Link>,
              troubleshoots <Link href="/systems" className="text-gray-600 hover:underline ml-1">Systems</Link>,
              debugs <Link href="/software" className="text-zinc-700 hover:underline ml-1">Software</Link>, and
              monitors <Link href="/services" className="text-neutral-600 hover:underline ml-1">Services</Link>.
            </p>
          </section>

          <section id="runbook-database-slow" className="mb-16 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Runbook: Database Queries Suddenly Slow</h2>

            <div className="bg-stone-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Symptom</h3>
              <p className="text-gray-700">
                API responses taking 5-30 seconds. Users reporting &quot;loading forever&quot; on dashboard.
                Vercel Analytics showing increased database timeout errors.
              </p>
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-bold">Severity: High</p>
                  <p className="text-sm text-gray-600">Users can&apos;t access critical features</p>
                </div>
                <div>
                  <p className="font-bold">Time to Fix: 30-60 minutes</p>
                  <p className="text-sm text-gray-600">Diagnosis + index creation</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Diagnosis Steps</h3>
              <ol className="list-decimal list-inside space-y-4 text-gray-700 ml-4">
                <li>
                  <strong>Check Supabase Dashboard</strong>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded mt-2 text-sm overflow-x-auto">
{`# Navigate to Supabase Dashboard
https://supabase.com/dashboard/project/YOUR_PROJECT/logs

# Filter for slow queries (>1s execution time)
Filter: "duration > 1000"`}
                  </pre>
                </li>
                <li>
                  <strong>Identify slow query pattern</strong>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded mt-2 text-sm overflow-x-auto">
{`# Common culprits:
- SELECT * FROM large_table WHERE unindexed_column = 'value'
- JOINs without proper indexes
- ORDER BY on unindexed columns`}
                  </pre>
                </li>
                <li>
                  <strong>Run EXPLAIN ANALYZE</strong>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded mt-2 text-sm overflow-x-auto">
{`-- In Supabase SQL Editor
EXPLAIN ANALYZE
SELECT * FROM users
WHERE email = 'test@example.com';

-- Look for:
-- "Seq Scan" = BAD (no index used)
-- "Index Scan" = GOOD (index used)`}
                  </pre>
                </li>
                <li>
                  <strong>Check index usage</strong>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded mt-2 text-sm overflow-x-auto">
{`-- See which indexes exist and are being used
SELECT
  schemaname,
  tablename,
  indexname,
  idx_scan as times_used
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan ASC;

-- idx_scan = 0 means index never used (consider dropping)`}
                  </pre>
                </li>
              </ol>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Fix Steps</h3>
              <ol className="list-decimal list-inside space-y-4 text-gray-700 ml-4">
                <li>
                  <strong>Create missing index</strong>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded mt-2 text-sm overflow-x-auto">
{`-- Example: Email lookup slow
CREATE INDEX CONCURRENTLY idx_users_email
ON users(email);

-- CONCURRENTLY = no table lock during creation
-- Safe for production with active traffic`}
                  </pre>
                </li>
                <li>
                  <strong>Verify index creation</strong>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded mt-2 text-sm overflow-x-auto">
{`-- Check index exists
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'users'
AND indexname = 'idx_users_email';`}
                  </pre>
                </li>
                <li>
                  <strong>Re-run slow query</strong>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded mt-2 text-sm overflow-x-auto">
{`EXPLAIN ANALYZE
SELECT * FROM users
WHERE email = 'test@example.com';

-- Should now show:
-- "Index Scan using idx_users_email"
-- Execution time: <10ms (was 5000ms+)`}
                  </pre>
                </li>
                <li>
                  <strong>Monitor production impact</strong>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded mt-2 text-sm overflow-x-auto">
{`# Vercel Analytics (if using)
- Check p95 response time improvement

# Vercel Analytics
- Verify database timeout errors decreased

# Supabase Dashboard
- Confirm slow query count dropped`}
                  </pre>
                </li>
              </ol>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <h3 className="text-lg font-bold mb-2">Prevention</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>
                  <strong>Index planning:</strong> Add indexes for all WHERE, JOIN, and ORDER BY columns
                </li>
                <li>
                  <strong>Query testing:</strong> Run EXPLAIN ANALYZE on all queries before production
                </li>
                <li>
                  <strong>Monitoring:</strong> Set up Supabase alerts for queries &gt;1s execution time
                </li>
                <li>
                  <strong>Regular audits:</strong> Review pg_stat_user_indexes monthly, drop unused indexes
                </li>
                <li>
                  <strong>Load testing:</strong> Test with production-scale data before deploy
                </li>
              </ul>
            </div>
          </section>

          <section id="common-issues" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Common Production Issues (Quick Reference)</h2>

            <div className="space-y-6">
              <div className="border-l-4 border-yellow-400 pl-4">
                <h3 className="text-lg font-bold">Authentication Loops</h3>
                <p className="text-sm text-gray-700">
                  <strong>Symptom:</strong> Users stuck redirecting between /login and /dashboard<br />
                  <strong>Fix:</strong> Check middleware matcher excludes /login route<br />
                  <strong>Code:</strong> <code className="bg-gray-100 px-1">export const config = {`{ matcher: ['/dashboard/:path*'] }`}</code>
                </p>
              </div>

              <div className="border-l-4 border-yellow-400 pl-4">
                <h3 className="text-lg font-bold">Build Failures on Vercel</h3>
                <p className="text-sm text-gray-700">
                  <strong>Symptom:</strong> &quot;Type error: Cannot find module&quot; during build<br />
                  <strong>Fix:</strong> Run <code className="bg-gray-100 px-1">npm run build</code> locally first, fix TypeScript errors<br />
                  <strong>Prevention:</strong> Add <code className="bg-gray-100 px-1">npm run type-check</code> to pre-commit hooks
                </p>
              </div>

              <div className="border-l-4 border-yellow-400 pl-4">
                <h3 className="text-lg font-bold">API Rate Limit Exceeded</h3>
                <p className="text-sm text-gray-700">
                  <strong>Symptom:</strong> 429 errors from Claude API, users can&apos;t get AI responses<br />
                  <strong>Fix:</strong> Implement client-side rate limiting with Upstash Redis<br />
                  <strong>Code:</strong> <code className="bg-gray-100 px-1">@upstash/ratelimit</code> with sliding window
                </p>
              </div>

              <div className="border-l-4 border-yellow-400 pl-4">
                <h3 className="text-lg font-bold">Environment Variables Not Loading</h3>
                <p className="text-sm text-gray-700">
                  <strong>Symptom:</strong> <code className="bg-gray-100 px-1">process.env.SUPABASE_URL</code> is undefined in production<br />
                  <strong>Fix:</strong> Add to Vercel dashboard → Settings → Environment Variables<br />
                  <strong>Gotcha:</strong> Redeploy after adding env vars (not automatic)
                </p>
              </div>
            </div>
          </section>

          <section id="monitoring-setup" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Essential Monitoring Setup</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Tool</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">What to Monitor</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Alert Threshold</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-bold">Vercel Analytics</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <ul className="list-disc list-inside text-sm space-y-1">
                        <li>JavaScript errors</li>
                        <li>API failures</li>
                        <li>Performance issues</li>
                      </ul>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      &gt;10 errors/min
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      $0-26/mo
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-bold">Vercel Analytics</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <ul className="list-disc list-inside text-sm space-y-1">
                        <li>Response times (p50, p95, p99)</li>
                        <li>Function execution duration</li>
                        <li>Edge function errors</li>
                      </ul>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      p95 &gt; 1s
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      $10-20/mo
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-bold">Supabase Logs</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <ul className="list-disc list-inside text-sm space-y-1">
                        <li>Slow queries (&gt;1s)</li>
                        <li>Failed auth attempts</li>
                        <li>Database connection pool</li>
                      </ul>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      &gt;10 slow queries/min
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      Included in Pro ($25/mo)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-bold">Uptime Robot</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <ul className="list-disc list-inside text-sm space-y-1">
                        <li>Homepage availability</li>
                        <li>API endpoint health</li>
                        <li>SSL certificate expiry</li>
                      </ul>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      Any downtime
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      $0 (50 monitors)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="ai-coding" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">AI Coding Assistance Tools (Late 2025)</h2>

            <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-lg mb-8">
              <p className="text-gray-700 mb-4">
                <strong>AI coding tools have matured significantly in 2025.</strong> Terminal-native agents like Claude Code achieve 72.5% on SWE-bench Verified, while multi-platform orchestrators like OpenAI Codex hit 74.9%. These tools handle production debugging, complex refactoring, and multi-file edits.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Best for terminal-native workflows:</strong> Claude Code, Gemini CLI</li>
                <li>• <strong>Best for multi-platform orchestration:</strong> OpenAI Codex</li>
                <li>• <strong>Best for speed-critical tasks:</strong> grok-code-fast-1 (92 tokens/sec)</li>
              </ul>
            </div>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-3 py-2 text-left">Tool</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">SWE-bench</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Interface</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Pricing</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-bold">Claude Code</td>
                    <td className="border border-gray-300 px-3 py-2">72.5%</td>
                    <td className="border border-gray-300 px-3 py-2">Terminal</td>
                    <td className="border border-gray-300 px-3 py-2">$20-200/mo</td>
                    <td className="border border-gray-300 px-3 py-2">Terminal-native workflows, MCP integrations</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-bold">OpenAI Codex</td>
                    <td className="border border-gray-300 px-3 py-2">74.5-74.9%</td>
                    <td className="border border-gray-300 px-3 py-2">VS Code/IDE</td>
                    <td className="border border-gray-300 px-3 py-2">$20-200/mo</td>
                    <td className="border border-gray-300 px-3 py-2">Multi-platform orchestration, agent swarms</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-bold">Gemini CLI</td>
                    <td className="border border-gray-300 px-3 py-2">N/A</td>
                    <td className="border border-gray-300 px-3 py-2">Terminal</td>
                    <td className="border border-gray-300 px-3 py-2">Free (1K/day)</td>
                    <td className="border border-gray-300 px-3 py-2">Open-source, 1M token context, free tier</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 font-bold">grok-code-fast-1</td>
                    <td className="border border-gray-300 px-3 py-2">70.8%</td>
                    <td className="border border-gray-300 px-3 py-2">API</td>
                    <td className="border border-gray-300 px-3 py-2">$0.20/$1.50 per M</td>
                    <td className="border border-gray-300 px-3 py-2">Speed-critical tasks (92 tokens/sec)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-6">
              <div className="border-l-4 border-indigo-600 pl-4">
                <h3 className="text-xl font-bold mb-3">Claude Code: Terminal-Native Agent</h3>
                <p className="text-gray-700 mb-3">
                  <strong>72.5% SWE-bench Verified</strong> (Claude 3.7 Sonnet), terminal-native with MCP protocol for tool integrations. Agentic workflow with TodoWrite, MultiEdit, and specialized agents for complex tasks.
                </p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• <strong>Strengths:</strong> Terminal integration, MCP tools (Supabase, GitHub, Playwright), multi-step reasoning</li>
                  <li>• <strong>Use Cases:</strong> Production debugging, complex refactoring, full-stack development</li>
                  <li>• <strong>Pricing:</strong> Pro ($20/mo) to Team ($200/mo), consumption-based API</li>
                  <li>• <strong>Context:</strong> 200K tokens (Claude 3.7 Sonnet), effective codebase understanding</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="text-xl font-bold mb-3">OpenAI Codex: Multi-Platform Orchestration</h3>
                <p className="text-gray-700 mb-3">
                  <strong>74.5-74.9% SWE-bench Verified</strong> (o1 and o3-mini models), multi-platform with VS Code, JetBrains, terminal. Agent orchestration with specialized sub-agents (architect, coder, tester).
                </p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• <strong>Strengths:</strong> Platform flexibility, agent swarms, deep reasoning (o1/o3-mini)</li>
                  <li>• <strong>Use Cases:</strong> Complex architecture, multi-component refactoring, team workflows</li>
                  <li>• <strong>Pricing:</strong> Pro ($20/mo) to Teams ($200/mo), enhanced reasoning costs more</li>
                  <li>• <strong>Context:</strong> 128K tokens (o1), 200K tokens (o3-mini)</li>
                </ul>
              </div>

              <div className="border-l-4 border-orange-600 pl-4">
                <h3 className="text-xl font-bold mb-3">Gemini CLI: Open-Source Terminal Agent</h3>
                <p className="text-gray-700 mb-3">
                  <strong>Apache 2.0 license</strong>, terminal-native with 1M token context window. Free tier: 1,000 requests/day. Best for open-source projects and developers who want full control.
                </p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• <strong>Strengths:</strong> Free tier, 1M token context, open-source, self-hostable</li>
                  <li>• <strong>Use Cases:</strong> Large codebases, cost-sensitive projects, customization needs</li>
                  <li>• <strong>Pricing:</strong> Free (1K requests/day), paid tiers for production</li>
                  <li>• <strong>Context:</strong> 1M tokens (best for large monorepos)</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-xl font-bold mb-3">grok-code-fast-1: Speed-Optimized Model</h3>
                <p className="text-gray-700 mb-3">
                  <strong>70.8% SWE-bench Verified</strong> with 92 tokens/sec generation speed. API-first model for speed-critical applications. Best for real-time coding assistance and rapid iteration.
                </p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• <strong>Strengths:</strong> 92 tokens/sec speed, cost-effective ($0.20/$1.50 per M tokens)</li>
                  <li>• <strong>Use Cases:</strong> Real-time assistance, rapid prototyping, live coding sessions</li>
                  <li>• <strong>Pricing:</strong> $0.20 input / $1.50 output per million tokens</li>
                  <li>• <strong>Context:</strong> Standard context window, optimized for speed over depth</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 mt-8">
              <h3 className="text-lg font-bold mb-2">Selection Guide</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>Terminal-native workflow?</strong> Claude Code or Gemini CLI</li>
                <li>• <strong>IDE integration priority?</strong> OpenAI Codex (VS Code/JetBrains)</li>
                <li>• <strong>Budget constrained?</strong> Gemini CLI (free tier) or grok-code-fast-1 (API)</li>
                <li>• <strong>Complex multi-component work?</strong> OpenAI Codex (agent orchestration)</li>
                <li>• <strong>Speed-critical tasks?</strong> grok-code-fast-1 (92 tokens/sec)</li>
                <li>• <strong>MCP tool integrations?</strong> Claude Code (Supabase, GitHub, Playwright)</li>
              </ul>
            </div>
          </section>

          <section id="incident-response" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Incident Response Process</h2>

            <ol className="list-decimal list-inside space-y-4 text-gray-700 ml-4">
              <li>
                <strong>Detect:</strong> Alert fires (Vercel Analytics, deployment logs, user reports)
              </li>
              <li>
                <strong>Assess Severity:</strong>
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-sm">
                  <li><strong>Critical:</strong> Complete outage, data loss risk → Fix immediately</li>
                  <li><strong>High:</strong> Core features broken → Fix within 1 hour</li>
                  <li><strong>Medium:</strong> Degraded performance → Fix within 4 hours</li>
                  <li><strong>Low:</strong> Minor issues → Fix within 24 hours</li>
                </ul>
              </li>
              <li>
                <strong>Communicate:</strong> Update status page, notify affected users if &gt;5 min downtime
              </li>
              <li>
                <strong>Mitigate:</strong> Stop the bleeding (rollback, disable feature, scale resources)
              </li>
              <li>
                <strong>Diagnose:</strong> Use logs, metrics, and runbooks to find root cause
              </li>
              <li>
                <strong>Fix:</strong> Apply permanent solution, verify in production
              </li>
              <li>
                <strong>Document:</strong> Write post-mortem, update runbook, add monitoring
              </li>
            </ol>
          </section>

          <section id="relationships" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">How Support Relates to Other Layers</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Maintain <Link href="/solutions" className="text-slate-600 hover:underline">Solutions</Link>:</strong> Keep AI chat working, users authenticated</li>
              <li>• <strong>Troubleshoot <Link href="/systems" className="text-gray-600 hover:underline">Systems</Link>:</strong> Debug auth loops, fix data flow issues</li>
              <li>• <strong>Debug <Link href="/software" className="text-zinc-700 hover:underline">Software</Link>:</strong> Fix TypeScript errors, optimize React renders</li>
              <li>• <strong>Monitor <Link href="/services" className="text-neutral-600 hover:underline">Services</Link>:</strong> Track costs, API usage, uptime</li>
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
