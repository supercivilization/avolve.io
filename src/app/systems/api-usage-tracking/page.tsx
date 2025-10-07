import type { Metadata } from "next"
import Link from "next/link"
import { PatternIdentity } from "@/components/systems/PatternIdentity"
import { QuickDecision } from "@/components/systems/QuickDecision"
import { PatternStructure } from "@/components/systems/PatternStructure"
import { TradeoffMatrix } from "@/components/systems/TradeoffMatrix"
import { IntegrationGotchas } from "@/components/systems/IntegrationGotchas"
import { LastVerified } from "@/components/shared/LastVerified"
import { InteractiveCodeBlock } from "@/components/shared/InteractiveCodeBlock"
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"

export const metadata: Metadata = {
  title: "API Usage Tracking Pattern | System Integration | Avolve.io",
  description:
    "Production-ready usage metering and quota enforcement. Token counting, rate limiting, and billing integration patterns.",
  keywords: "API usage tracking, token metering, rate limiting, quota enforcement, usage-based billing",
}

export default function APIUsageTrackingPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://avolve.io" },
          { name: "Systems", item: "https://avolve.io/systems" },
          { name: "API Usage Tracking", item: "https://avolve.io/systems/api-usage-tracking" },
        ]}
      />

      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/systems" className="hover:underline">
              Systems
            </Link>
            <span>/</span>
            <span>API Usage Tracking</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">API Usage Tracking</h1>

          <p className="text-xl text-gray-600 dark:text-gray-400">
            Token-based metering with per-user quotas, rate limiting, and billing integration for AI APIs and usage-based services.
          </p>

          <LastVerified date="2025-01-15" />
        </div>

        <div className="mb-12">
          <PatternIdentity
            category="Metering"
            abstractionLevel="low"
            abstractionDescription="Direct database counters with atomic operations"
            complements={[
              {
                name: "Rate Limiting",
                href: "/systems/rate-limiting",
                description: "Prevent abuse with request throttling",
              },
              {
                name: "Subscription Billing",
                href: "/systems/stripe-subscriptions",
                description: "Convert usage into revenue",
              },
            ]}
            tags={["Usage Tracking", "Quotas", "Billing", "Rate Limiting", "PostgreSQL"]}
          />
        </div>

        <div className="mb-12">
          <QuickDecision
            useWhen={[
              "Need to track consumption per user",
              "Implementing usage-based pricing",
              "Want to prevent abuse with quotas",
              "Need to bill by usage (tokens, API calls, etc.)",
              "Building AI SaaS with tiered limits",
            ]}
            avoidWhen={[
              "Simple unlimited access (no metering needed)",
              "Pure time-based subscriptions (no usage component)",
              "Internal tools with no cost constraints",
            ]}
          />
        </div>

        <div className="mb-12">
          <PatternStructure
            flow={[
              {
                step: "Request",
                description: "User initiates API call",
                details: "Check current usage against quota before processing",
              },
              {
                step: "Counter",
                description: "Atomic increment in database",
                details: "Use UPDATE ... SET tokens_used = tokens_used + X",
              },
              {
                step: "Database",
                description: "Store usage record",
                details: "Track per-user, per-period usage with timestamps",
              },
              {
                step: "Limit Check",
                description: "Enforce quota",
                details: "Reject requests that exceed plan limits",
              },
            ]}
            keyComponents={[
              {
                name: "Usage Table",
                purpose: "Store consumption records",
                technology: "PostgreSQL",
              },
              {
                name: "Atomic Counters",
                purpose: "Prevent race conditions",
                technology: "SQL UPDATE",
              },
              {
                name: "Quota Middleware",
                purpose: "Enforce limits",
                technology: "Server Actions",
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <TradeoffMatrix
            options={[
              {
                name: "Database Counter",
                pros: [
                  "Accurate and persistent",
                  "Works with existing DB",
                  "Atomic operations prevent drift",
                  "Simple to implement",
                  "No additional services",
                ],
                cons: [
                  "Slower than in-memory (adds ~10ms)",
                  "More DB load at scale",
                  "Requires good indexing",
                  "Connection pool sensitive",
                ],
                bestFor: "Most applications with <1K requests/sec",
              },
              {
                name: "Redis Counter",
                pros: [
                  "Very fast (<1ms)",
                  "Built-in TTL for time windows",
                  "Scales to millions of ops/sec",
                  "Atomic INCR command",
                ],
                cons: [
                  "Additional service to manage",
                  "Data can be lost (volatile)",
                  "Must sync to DB eventually",
                  "Higher cost ($10-50/mo minimum)",
                ],
                bestFor: "High-traffic apps needing sub-millisecond latency",
              },
              {
                name: "In-Memory Counter",
                pros: [
                  "Fastest possible (<0.1ms)",
                  "No external dependencies",
                  "Trivial to implement",
                ],
                cons: [
                  "Lost on restart",
                  "Doesn't work in serverless",
                  "No cross-instance sync",
                  "Inaccurate for billing",
                ],
                bestFor: "Development/testing only, not production",
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <IntegrationGotchas
            gotchas={[
              {
                issue: "Race Conditions on Counter Updates",
                severity: "high",
                frequency: "common",
                description:
                  "Concurrent requests can read the same value, both increment, and write back - causing undercounting.",
                solution: [
                  "Use atomic UPDATE with += operator, never SELECT then UPDATE",
                  "Add database-level constraints (CHECK tokens_used >= 0)",
                  "Use transactions only when updating multiple counters",
                  "Add unique constraint on (user_id, period_start)",
                ],
                codeExample: `-- ❌ WRONG: Race condition
const { data } = await supabase
  .from('usage')
  .select('tokens_used')
  .eq('user_id', userId)
  .single()

await supabase
  .from('usage')
  .update({ tokens_used: data.tokens_used + tokens })
  .eq('user_id', userId)

-- ✅ CORRECT: Atomic increment
await supabase.rpc('increment_usage', {
  p_user_id: userId,
  p_tokens: tokens,
})

-- RPC function
CREATE OR REPLACE FUNCTION increment_usage(
  p_user_id UUID,
  p_tokens INTEGER
)
RETURNS void AS $$
BEGIN
  UPDATE usage
  SET tokens_used = tokens_used + p_tokens,
      updated_at = NOW()
  WHERE user_id = p_user_id
    AND period_start = date_trunc('month', NOW());
END;
$$ LANGUAGE plpgsql;`,
              },
              {
                issue: "Counter Drift Over Time",
                severity: "medium",
                frequency: "common",
                description: "Small rounding errors or failed updates accumulate, causing billing discrepancies.",
                solution: [
                  "Periodically reconcile counters with actual usage logs",
                  "Store detailed usage events, not just aggregates",
                  "Add audit logging for all counter changes",
                  "Set up alerts for unusual usage spikes",
                ],
                codeExample: `-- Store detailed events
CREATE TABLE usage_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  event_type TEXT NOT NULL,
  tokens INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reconciliation query
SELECT
  user_id,
  SUM(tokens) as actual_tokens,
  (SELECT tokens_used FROM usage WHERE user_id = ue.user_id) as recorded_tokens,
  SUM(tokens) - (SELECT tokens_used FROM usage WHERE user_id = ue.user_id) as drift
FROM usage_events ue
WHERE created_at >= date_trunc('month', NOW())
GROUP BY user_id
HAVING ABS(drift) > 100;`,
              },
              {
                issue: "Timezone Issues in Period Calculation",
                severity: "medium",
                frequency: "common",
                description: "Usage periods don't align with billing periods due to timezone differences.",
                solution: [
                  "Always use UTC for period calculations",
                  "Store period_start as DATE or TIMESTAMPTZ, not TEXT",
                  "Use date_trunc('month', NOW() AT TIME ZONE 'UTC')",
                  "Document timezone handling in billing terms",
                ],
                codeExample: `-- ❌ WRONG: Local timezone
SELECT date_trunc('month', NOW())

-- ✅ CORRECT: Explicit UTC
SELECT date_trunc('month', NOW() AT TIME ZONE 'UTC')

-- Table schema
CREATE TABLE usage (
  user_id UUID NOT NULL,
  period_start DATE NOT NULL, -- Use DATE for month/day boundaries
  tokens_used INTEGER DEFAULT 0,
  tokens_limit INTEGER NOT NULL,
  PRIMARY KEY (user_id, period_start)
);`,
              },
            ]}
          />
        </div>

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">Complete Implementation</h2>

          <div className="space-y-8">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">1. Database Schema</h3>
              <InteractiveCodeBlock
                code={`-- Usage tracking table
CREATE TABLE usage (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  period_start DATE NOT NULL,
  tokens_used INTEGER DEFAULT 0 CHECK (tokens_used >= 0),
  tokens_limit INTEGER NOT NULL,
  requests_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, period_start)
);

-- Detailed usage events for audit trail
CREATE TABLE usage_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES conversations(id),
  event_type TEXT NOT NULL CHECK (event_type IN ('chat', 'api', 'function_call')),
  input_tokens INTEGER NOT NULL,
  output_tokens INTEGER NOT NULL,
  total_tokens INTEGER GENERATED ALWAYS AS (input_tokens + output_tokens) STORED,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_usage_events_user_created ON usage_events(user_id, created_at DESC);
CREATE INDEX idx_usage_events_created ON usage_events(created_at DESC);

-- Atomic increment function
CREATE OR REPLACE FUNCTION increment_usage(
  p_user_id UUID,
  p_tokens INTEGER
)
RETURNS TABLE(tokens_used INTEGER, tokens_limit INTEGER, over_limit BOOLEAN) AS $$
DECLARE
  v_period_start DATE := date_trunc('month', NOW() AT TIME ZONE 'UTC')::DATE;
BEGIN
  -- Insert or update current period usage
  INSERT INTO usage (user_id, period_start, tokens_used, tokens_limit)
  VALUES (
    p_user_id,
    v_period_start,
    p_tokens,
    (SELECT COALESCE(t.token_limit, 100000) FROM subscriptions s
     LEFT JOIN tiers t ON t.id = s.tier_id
     WHERE s.user_id = p_user_id)
  )
  ON CONFLICT (user_id, period_start)
  DO UPDATE SET
    tokens_used = usage.tokens_used + p_tokens,
    requests_count = usage.requests_count + 1,
    updated_at = NOW();

  -- Return current usage
  RETURN QUERY
  SELECT
    u.tokens_used,
    u.tokens_limit,
    u.tokens_used >= u.tokens_limit as over_limit
  FROM usage u
  WHERE u.user_id = p_user_id
    AND u.period_start = v_period_start;
END;
$$ LANGUAGE plpgsql;`}
                language="sql"
              />
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">2. Usage Tracking Middleware</h3>
              <InteractiveCodeBlock
                code={`// lib/usage.ts
import { createClient } from '@/lib/supabase/server'

export async function checkAndIncrementUsage(
  userId: string,
  tokens: number
): Promise<{ allowed: boolean; usage: { used: number; limit: number } }> {
  const supabase = await createClient()

  // Check current usage
  const { data: currentUsage, error } = await supabase.rpc('increment_usage', {
    p_user_id: userId,
    p_tokens: tokens,
  }).single()

  if (error) throw error

  return {
    allowed: !currentUsage.over_limit,
    usage: {
      used: currentUsage.tokens_used,
      limit: currentUsage.tokens_limit,
    },
  }
}

export async function logUsageEvent(params: {
  userId: string
  conversationId?: string
  eventType: 'chat' | 'api' | 'function_call'
  inputTokens: number
  outputTokens: number
  metadata?: Record<string, any>
}) {
  const supabase = await createClient()

  await supabase.from('usage_events').insert({
    user_id: params.userId,
    conversation_id: params.conversationId,
    event_type: params.eventType,
    input_tokens: params.inputTokens,
    output_tokens: params.outputTokens,
    metadata: params.metadata,
  })
}`}
                language="typescript"
              />
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">3. Enforce Quota in API Route</h3>
              <InteractiveCodeBlock
                code={`// app/api/chat/route.ts
import { checkAndIncrementUsage, logUsageEvent } from '@/lib/usage'
import { anthropic } from '@ai-sdk/anthropic'
import { streamText } from 'ai'

export async function POST(req: Request) {
  const { messages } = await req.json()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Estimate tokens (rough approximation: 4 chars = 1 token)
  const estimatedTokens = Math.ceil(
    messages.reduce((sum, m) => sum + m.content.length, 0) / 4
  )

  // Check quota before processing
  const { allowed, usage } = await checkAndIncrementUsage(user.id, estimatedTokens)

  if (!allowed) {
    return new Response(
      JSON.stringify({
        error: 'Quota exceeded',
        usage,
      }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    )
  }

  let actualTokens = { input: 0, output: 0 }

  const result = streamText({
    model: anthropic('claude-3-7-sonnet-20250219'),
    messages,
    maxTokens: 1024,
    onFinish: async ({ usage: apiUsage }) => {
      actualTokens.input = apiUsage.promptTokens || 0
      actualTokens.output = apiUsage.completionTokens || 0

      // Log actual usage
      await logUsageEvent({
        userId: user.id,
        eventType: 'chat',
        inputTokens: actualTokens.input,
        outputTokens: actualTokens.output,
      })

      // Adjust counter if estimate was off by >10%
      const diff = actualTokens.input + actualTokens.output - estimatedTokens
      if (Math.abs(diff) > estimatedTokens * 0.1) {
        await checkAndIncrementUsage(user.id, diff)
      }
    },
  })

  return result.toDataStreamResponse()
}`}
                language="typescript"
              />
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Related Resources</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-medium text-gray-900 dark:text-gray-100">Solutions Using This Pattern</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/solutions/ai-chat-saas" className="text-blue-600 hover:underline">
                    AI Chat SaaS Application
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-medium text-gray-900 dark:text-gray-100">Complementary Patterns</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/systems/stripe-subscriptions" className="text-blue-600 hover:underline">
                    Stripe Subscriptions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
