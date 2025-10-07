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
          { name: "Home", item: "https://avolve.io" },
          { name: "Services", item: "https://avolve.io/services" },
          { name: "Anthropic", item: "https://avolve.io/services/anthropic" },
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
            triggers={[
              {
                trigger: "High Message Volume",
                threshold: ">10K messages/day",
                impact: "$500+/month",
                mitigation:
                  "Implement aggressive caching, use Haiku for simple queries, optimize prompt length",
              },
              {
                trigger: "Long Context Usage",
                threshold: "Avg >10K tokens input",
                impact: "$30 per 1K messages",
                mitigation: "Summarize old conversation history, use sliding window for context",
              },
              {
                trigger: "Function Calling",
                threshold: "Multiple tool calls per message",
                impact: "2-3x token usage",
                mitigation: "Batch tool calls, cache function results, limit tools per request",
              },
              {
                trigger: "Vision Requests",
                threshold: "Image analysis at scale",
                impact: "$5-15 per 1K images",
                mitigation: "Compress images, use lower detail mode, batch processing",
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <LimitsAndQuotas
            limits={[
              {
                name: "Rate Limits",
                free: "5 requests/min",
                paid: "1000 requests/min",
                notes: "Contact sales for higher limits",
              },
              {
                name: "Burst Limit",
                free: "20 requests",
                paid: "5000 requests",
                notes: "Short burst capacity before throttling",
              },
              {
                name: "Max Tokens",
                free: "200K input + 8K output",
                paid: "200K input + 8K output",
                notes: "Per request limit",
              },
              {
                name: "Concurrent Requests",
                free: "5",
                paid: "100+",
                notes: "Contact support for higher concurrency",
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <CostCalculator
            scenarios={[
              {
                name: "100 Daily Active Users",
                usage: "10 messages/user/day, 500 tokens avg input, 1000 tokens output",
                calculation: "100 users × 10 msgs × (0.5K × $3 + 1K × $15) / 1M = $18/day",
                monthlyCost: "$50-200",
                notes: "Varies by actual message length and complexity",
              },
              {
                name: "1K Daily Active Users",
                usage: "15 messages/user/day, optimized prompts",
                calculation: "1K users × 15 msgs × (0.3K × $3 + 0.8K × $15) / 1M = $191/day",
                monthlyCost: "$500-2K",
                notes: "Assumes prompt optimization and caching",
              },
              {
                name: "10K Daily Active Users",
                usage: "20 messages/user/day, enterprise volume",
                calculation: "10K users × 20 msgs × costs with 20% discount",
                monthlyCost: "$5K-20K",
                notes: "Contact sales for volume discounts at this scale",
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <IntegrationRequirements
            requirements={[
              {
                category: "Authentication",
                items: [
                  "API key from Anthropic Console",
                  "Set ANTHROPIC_API_KEY environment variable",
                  "Never expose key in client-side code",
                ],
              },
              {
                category: "SDK Setup",
                items: [
                  "Install @ai-sdk/anthropic and ai packages",
                  "Use Vercel AI SDK for streaming",
                  "Or use @anthropic-ai/sdk for direct API access",
                ],
              },
              {
                category: "Error Handling",
                items: [
                  "Handle rate limit errors (429) with exponential backoff",
                  "Implement timeout handling (30-60 seconds)",
                  "Log API errors for monitoring",
                  "Add circuit breakers for cascading failures",
                ],
              },
              {
                category: "Monitoring",
                items: [
                  "Track token usage per user/request",
                  "Set up cost alerts in Console",
                  "Monitor error rates and latency",
                  "Implement usage quotas per user",
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
