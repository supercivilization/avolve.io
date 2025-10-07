import type { Metadata } from "next"
import Link from "next/link"
import { PricingOverview } from "@/components/services/PricingOverview"
import { CostTriggers } from "@/components/services/CostTriggers"
import { LimitsAndQuotas } from "@/components/services/LimitsAndQuotas"
import { CostCalculator } from "@/components/services/CostCalculator"
import { IntegrationRequirements } from "@/components/services/IntegrationRequirements"
import { LastVerified } from "@/components/shared/LastVerified"
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"

export const metadata: Metadata = {
  title: "Anthropic Claude API Service | Pricing & Integration | Avolve.io",
  description:
    "Complete guide to Anthropic Claude API pricing, rate limits, and integration. Cost optimization for AI SaaS applications.",
  keywords: "Anthropic pricing, Claude API, AI costs, token pricing, rate limits, Claude integration",
}

export default function AnthropicServicePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Anthropic", url: "/services/anthropic" },
        ]}
      />

      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <Link href="/services" className="hover:underline">
              Services
            </Link>
            <span>/</span>
            <span>Anthropic</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Anthropic Claude API
          </h1>

          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Production AI capabilities with Claude 3.7 Sonnet. Pay-as-you-go pricing with enterprise volume discounts.
          </p>

          <LastVerified date="2025-01-15" />
        </div>

        <div className="mb-12">
          <PricingOverview
            serviceName="Anthropic Claude"
            description="Token-based pricing varies by model. Claude 3.7 Sonnet is the recommended production model for most use cases."
            tiers={[
              {
                name: "Claude 3.7 Sonnet",
                price: "$3 / MTok",
                billingNote: "input",
                highlights: [
                  "Best price/performance ratio",
                  "200K context window",
                  "Fast inference (~30 tokens/sec)",
                ],
                recommended: true,
              },
              {
                name: "Claude 3.7 Sonnet",
                price: "$15 / MTok",
                billingNote: "output",
                highlights: ["Same model", "Output tokens cost 5x input"],
              },
              {
                name: "Claude 3 Opus",
                price: "$15 / $75 MTok",
                billingNote: "in/out",
                highlights: ["Highest quality", "Best for complex tasks", "Slower and expensive"],
              },
              {
                name: "Claude 3 Haiku",
                price: "$0.25 / $1.25 MTok",
                billingNote: "in/out",
                highlights: ["Fastest & cheapest", "Good for simple tasks", "Smaller context"],
              },
            ]}
            features={[
              {
                name: "Context Window",
                description: "Maximum tokens per request",
                tiers: {
                  "Claude 3.7 Sonnet": "200K",
                  "Claude 3 Opus": "200K",
                  "Claude 3 Haiku": "200K",
                },
              },
              {
                name: "Max Output",
                description: "Maximum tokens in response",
                tiers: {
                  "Claude 3.7 Sonnet": "8K",
                  "Claude 3 Opus": "4K",
                  "Claude 3 Haiku": "4K",
                },
              },
              {
                name: "Vision",
                description: "Image understanding",
                tiers: {
                  "Claude 3.7 Sonnet": true,
                  "Claude 3 Opus": true,
                  "Claude 3 Haiku": true,
                },
              },
              {
                name: "Function Calling",
                description: "Tool use capabilities",
                tiers: {
                  "Claude 3.7 Sonnet": true,
                  "Claude 3 Opus": true,
                  "Claude 3 Haiku": true,
                },
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <CostTriggers
            serviceName="Anthropic Claude"
            triggers={[
              {
                id: "high-volume",
                title: "High Message Volume",
                currentTier: "Standard Usage",
                upgradeTo: "Contact Sales for Volume Discount",
                scenario: "Your application is processing over 10K messages per day with standard per-token pricing.",
                metrics: [
                  { name: "Daily Messages", threshold: ">10K messages/day" },
                  { name: "Monthly Cost", threshold: "$500+/month" },
                ],
                costIncrease: "Volume discounts available",
                urgency: "high",
              },
              {
                id: "long-context",
                title: "Long Context Usage",
                currentTier: "Claude 3.7 Sonnet",
                upgradeTo: "Optimize with context management",
                scenario: "Average input token count exceeds 10K tokens per message, driving up input costs significantly.",
                metrics: [
                  { name: "Avg Input Tokens", threshold: ">10K tokens" },
                  { name: "Cost Impact", threshold: "$30 per 1K messages" },
                ],
                costIncrease: "Implement caching or summarization",
                urgency: "medium",
              },
              {
                id: "function-calling",
                title: "Heavy Function Calling",
                currentTier: "Standard API",
                upgradeTo: "Optimize tool usage",
                scenario: "Multiple tool calls per message increase token usage by 2-3x due to function definitions and results.",
                metrics: [
                  { name: "Tools per Request", threshold: ">5 tools" },
                  { name: "Token Overhead", threshold: "2-3x base usage" },
                ],
                costIncrease: "Batch calls or limit tools",
                urgency: "medium",
              },
              {
                id: "vision",
                title: "Vision at Scale",
                currentTier: "Claude with Vision",
                upgradeTo: "Optimize image processing",
                scenario: "Processing images at scale with vision capabilities drives costs higher than text-only usage.",
                metrics: [
                  { name: "Images Processed", threshold: ">1K images/day" },
                  { name: "Cost Impact", threshold: "$5-15 per 1K images" },
                ],
                costIncrease: "Compress images or batch",
                urgency: "low",
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <LimitsAndQuotas
            serviceName="Anthropic Claude"
            limits={[
              {
                id: "rate-limit-free",
                name: "Rate Limit (Free Tier)",
                tier: "Free",
                value: "5 requests/min",
                type: "rate",
                blocksCapability: [
                  "Real-time chat applications",
                  "High-traffic public APIs",
                  "Concurrent user requests",
                ],
                workarounds: [
                  "Upgrade to paid tier for 1000 req/min",
                  "Implement request queuing",
                  "Use response caching",
                ],
                critical: true,
              },
              {
                id: "rate-limit-paid",
                name: "Rate Limit (Paid Tier)",
                tier: "Paid",
                value: "1000 requests/min",
                type: "rate",
                blocksCapability: [
                  "Enterprise-scale applications (contact sales for higher)",
                ],
                workarounds: [
                  "Contact Anthropic sales for custom limits",
                ],
              },
              {
                id: "burst-limit",
                name: "Burst Capacity",
                tier: "All",
                value: "20 requests (free) / 5000 requests (paid)",
                type: "soft",
                blocksCapability: [
                  "Sudden traffic spikes",
                  "Batch processing without throttling",
                ],
                workarounds: [
                  "Upgrade to paid tier",
                  "Implement exponential backoff",
                ],
              },
              {
                id: "token-limit",
                name: "Max Tokens Per Request",
                tier: "All",
                value: "200K input + 8K output",
                type: "hard",
                blocksCapability: [
                  "Processing entire books or large codebases in single request",
                  "Very long conversation histories without summarization",
                ],
                workarounds: [
                  "Implement conversation summarization",
                  "Use sliding window for context",
                  "Break large documents into chunks",
                ],
                critical: true,
              },
              {
                id: "concurrency",
                name: "Concurrent Requests",
                tier: "Free/Paid",
                value: "5 (free) / 100+ (paid)",
                type: "hard",
                blocksCapability: [
                  "Multi-user applications on free tier",
                  "Parallel batch processing",
                ],
                workarounds: [
                  "Upgrade to paid tier",
                  "Implement request queuing",
                  "Contact support for custom limits",
                ],
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <CostCalculator
            serviceName="Anthropic Claude"
            scenarios={[
              {
                id: "startup",
                name: "100 Daily Active Users",
                description: "Small AI chat application with moderate usage",
                usage: [
                  { metric: "Daily Active Users", value: "100" },
                  { metric: "Messages per User", value: "10/day" },
                  { metric: "Avg Input Tokens", value: "500" },
                  { metric: "Avg Output Tokens", value: "1000" },
                ],
                breakdown: [
                  {
                    component: "Input Tokens",
                    cost: "$1.50/day",
                    notes: "100 users × 10 msgs × 500 tokens × $3/MTok",
                  },
                  {
                    component: "Output Tokens",
                    cost: "$15/day",
                    notes: "100 users × 10 msgs × 1000 tokens × $15/MTok",
                  },
                ],
                totalCost: "$50-200/month",
                type: "startup",
              },
              {
                id: "growth",
                name: "1K Daily Active Users",
                description: "Growing application with optimized prompts and caching",
                usage: [
                  { metric: "Daily Active Users", value: "1,000" },
                  { metric: "Messages per User", value: "15/day" },
                  { metric: "Avg Input Tokens", value: "300 (optimized)" },
                  { metric: "Avg Output Tokens", value: "800 (optimized)" },
                ],
                breakdown: [
                  {
                    component: "Input Tokens",
                    cost: "$13.50/day",
                    notes: "1K users × 15 msgs × 300 tokens × $3/MTok",
                  },
                  {
                    component: "Output Tokens",
                    cost: "$180/day",
                    notes: "1K users × 15 msgs × 800 tokens × $15/MTok",
                  },
                ],
                totalCost: "$500-2K/month",
                type: "growth",
              },
              {
                id: "enterprise",
                name: "10K Daily Active Users",
                description: "Enterprise scale with volume discounts",
                usage: [
                  { metric: "Daily Active Users", value: "10,000" },
                  { metric: "Messages per User", value: "20/day" },
                  { metric: "Volume Discount", value: "20% (contact sales)" },
                ],
                breakdown: [
                  {
                    component: "Base Cost",
                    cost: "$6K-25K/month",
                    notes: "Before volume discount",
                  },
                  {
                    component: "With Discount",
                    cost: "$5K-20K/month",
                    notes: "After 20% enterprise discount",
                  },
                ],
                totalCost: "$5K-20K/month",
                type: "enterprise",
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <IntegrationRequirements
            serviceName="Anthropic Claude"
            steps={[
              {
                id: "auth",
                title: "Authentication Setup",
                description: "Configure API key for server-side usage only",
                required: true,
                estimatedTime: "5 min",
                configExample: `// .env.local
ANTHROPIC_API_KEY=sk-ant-...

// Never expose in client-side code!
// Always use API routes or server components`,
                docs: [
                  { text: "Get API Key", href: "https://console.anthropic.com/settings/keys" },
                ],
              },
              {
                id: "sdk",
                title: "Install SDK",
                description: "Add Vercel AI SDK with Anthropic provider",
                required: true,
                estimatedTime: "2 min",
                configExample: `npm install ai @ai-sdk/anthropic

// app/api/chat/route.ts
import { anthropic } from '@ai-sdk/anthropic'
import { streamText } from 'ai'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: anthropic('claude-3-7-sonnet-20250929'),
    messages,
  })

  return result.toDataStreamResponse()
}`,
                docs: [
                  { text: "Vercel AI SDK Docs", href: "https://sdk.vercel.ai/docs" },
                ],
              },
              {
                id: "error-handling",
                title: "Error Handling",
                description: "Handle rate limits, timeouts, and API errors gracefully",
                required: true,
                estimatedTime: "15 min",
                configExample: `async function callClaude(messages: Message[]) {
  try {
    const result = await streamText({
      model: anthropic('claude-3-7-sonnet-20250929'),
      messages,
      maxRetries: 3, // Retry on rate limits
      abortSignal: AbortSignal.timeout(60000), // 60s timeout
    })
    return result
  } catch (error) {
    if (error.status === 429) {
      // Rate limit - implement exponential backoff
      await sleep(Math.pow(2, retryCount) * 1000)
      return retry()
    }
    // Log error and return user-friendly message
    console.error('Claude API error:', error)
    throw new Error('AI service temporarily unavailable')
  }
}`,
              },
              {
                id: "monitoring",
                title: "Usage Monitoring",
                description: "Track token usage and costs for optimization",
                required: false,
                estimatedTime: "20 min",
                configExample: `// Track usage in database
await db.insert({
  userId: user.id,
  inputTokens: result.usage.promptTokens,
  outputTokens: result.usage.completionTokens,
  cost: calculateCost(result.usage),
  timestamp: new Date(),
})

// Set up alerts in Anthropic Console for:
// - Monthly spend threshold
// - Rate limit approaching
// - Error rate spike`,
                docs: [
                  { text: "Usage Dashboard", href: "https://console.anthropic.com/settings/usage" },
                ],
              },
            ]}
          />
        </div>

        <section className="rounded-lg border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Related Resources</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-medium text-neutral-900 dark:text-neutral-100">Solutions Using This Service</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/solutions/ai-chat-saas" className="text-blue-600 hover:underline">
                    AI Chat SaaS Application
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-medium text-neutral-900 dark:text-neutral-100">System Patterns</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/systems/ai-streaming-chat" className="text-blue-600 hover:underline">
                    AI Streaming Chat
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
