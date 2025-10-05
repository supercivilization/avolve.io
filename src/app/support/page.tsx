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
          <h1 className="text-4xl font-bold mb-4 text-red-700">Support</h1>
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
              monitors <Link href="/services" className="text-orange-600 hover:underline ml-1">Services</Link>.
            </p>
          </section>

          <section id="runbook-database-slow" className="mb-16 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Runbook: Database Queries Suddenly Slow</h2>

            <div className="bg-red-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Symptom</h3>
              <p className="text-gray-700">
                API responses taking 5-30 seconds. Users reporting &quot;loading forever&quot; on dashboard.
                Sentry showing increased database timeout errors.
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

# Sentry
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
                    <td className="border border-gray-300 px-4 py-2 font-bold">Sentry</td>
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

          <section id="incident-response" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Incident Response Process</h2>

            <ol className="list-decimal list-inside space-y-4 text-gray-700 ml-4">
              <li>
                <strong>Detect:</strong> Alert fires (Sentry, Vercel, Uptime Robot)
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
              <li>• <strong>Monitor <Link href="/services" className="text-orange-600 hover:underline">Services</Link>:</strong> Track costs, API usage, uptime</li>
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
