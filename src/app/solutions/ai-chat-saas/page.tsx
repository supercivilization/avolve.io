import type { Metadata } from "next"
import Link from "next/link"
import { SolutionAtAGlance } from "@/components/solutions/SolutionAtAGlance"
import { ArchitectureDiagram } from "@/components/solutions/ArchitectureDiagram"
import { FullStackBreakdown } from "@/components/solutions/FullStackBreakdown"
import { CostModel } from "@/components/solutions/CostModel"
import { TimeEstimate } from "@/components/solutions/TimeEstimate"
import { CommonPitfalls } from "@/components/solutions/CommonPitfalls"
import { SolutionDecision } from "@/components/solutions/SolutionDecision"
import { LastVerified } from "@/components/shared/LastVerified"
import { InteractiveCodeBlock } from "@/components/shared/InteractiveCodeBlock"
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"

export const metadata: Metadata = {
  title: "AI Chat SaaS Application | Complete Full-Stack Solution | Avolve.io",
  description:
    "Production-ready AI Chat SaaS with Next.js 15, Supabase, Anthropic Claude, and Stripe. Complete architecture, cost models, and implementation guide for streaming chat with usage tracking and subscriptions.",
  keywords:
    "AI chat SaaS, Next.js 15 AI app, Supabase chat, Anthropic integration, Stripe subscriptions, AI streaming, usage tracking, production AI architecture",
  openGraph: {
    title: "AI Chat SaaS Application - Complete Full-Stack Solution",
    description:
      "Build a production-ready AI chat SaaS with streaming, usage tracking, and subscription billing. Real-world architecture and cost models.",
    type: "article",
  },
}

export default function AIPageChatSaaSPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Solutions", url: "/solutions" },
          {
            name: "AI Chat SaaS Application",
            url: "/solutions/ai-chat-saas",
          },
        ]}
      />

      <div className="container mx-auto max-w-5xl px-4 py-12">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Link href="/solutions" className="hover:underline">
              Solutions
            </Link>
            <span>/</span>
            <span>AI Chat SaaS Application</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            AI Chat SaaS Application
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400">
            Complete production-ready architecture for building an AI chat SaaS with streaming responses, user
            authentication, usage tracking, and subscription billing.
          </p>

          <LastVerified date="2025-01-15" />
        </div>

        {/* At a Glance */}
        <div className="mb-12">
          <SolutionAtAGlance
            complexity="🟡🟡"
            complexityLabel="Moderate"
            timeToMVP="2-3 weeks"
            monthlyCost="$100-250/mo"
            notes="Complexity comes from integrating multiple services (auth, streaming, billing) and handling edge cases like connection pooling and rate limiting. MVP can be achieved faster by starting with free tiers and basic features."
          />
        </div>

        {/* What This Is */}
        <section className="prose prose-slate mb-12 max-w-none dark:prose-invert">
          <h2>What This Is</h2>
          <p>
            This is a complete architecture for building a production-ready AI chat SaaS application. Users can sign
            up, subscribe to a plan, and have conversations with an AI assistant. The application tracks token usage,
            enforces rate limits, and handles subscription billing automatically.
          </p>

          <h3>Core Capabilities</h3>
          <ul>
            <li>
              <strong>User Authentication:</strong> Social login (Google, GitHub) and email/password authentication via
              Supabase Auth
            </li>
            <li>
              <strong>AI Streaming Chat:</strong> Real-time streaming responses from Anthropic Claude using Vercel AI
              SDK
            </li>
            <li>
              <strong>Usage Tracking:</strong> Token-based metering with per-user quotas and rate limiting
            </li>
            <li>
              <strong>Subscription Billing:</strong> Multi-tier pricing with Stripe integration and automatic upgrades
            </li>
            <li>
              <strong>Conversation History:</strong> Persistent chat storage with search and export capabilities
            </li>
          </ul>

          <h3>Technical Features</h3>
          <ul>
            <li>Next.js 15 App Router with React Server Components</li>
            <li>Supabase PostgreSQL with Row Level Security (RLS)</li>
            <li>Vercel AI SDK for streaming AI responses</li>
            <li>Stripe webhooks for subscription lifecycle management</li>
            <li>Real-time token counting and quota enforcement</li>
            <li>Optimistic UI updates with error recovery</li>
          </ul>
        </section>

        {/* Who This Is For */}
        <section className="prose prose-slate mb-12 max-w-none dark:prose-invert">
          <h2>Who This Is For</h2>

          <h3>✅ Great Choice If You:</h3>
          <ul>
            <li>Need to build an AI SaaS product with subscription billing</li>
            <li>Want streaming AI responses for better user experience</li>
            <li>Need to track and limit AI usage per user or plan</li>
            <li>Prefer PostgreSQL and want to leverage Row Level Security</li>
            <li>Value cost-effective infrastructure (can start on free tiers)</li>
          </ul>

          <h3>❌ Consider Alternatives If You:</h3>
          <ul>
            <li>
              <strong>Simple chatbot widget:</strong> Use embedded chat libraries like Botpress or Voiceflow instead
            </li>
            <li>
              <strong>Internal tool only:</strong> Skip subscription billing and use basic auth
            </li>
            <li>
              <strong>No usage tracking needed:</strong> Simplify to basic Next.js + AI SDK integration
            </li>
            <li>
              <strong>Mobile-first app:</strong> Consider React Native with Expo for native mobile experience
            </li>
          </ul>
        </section>

        {/* Live Examples */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-slate-100">Live Examples</h2>
          <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-slate-600 dark:text-slate-400">
              Production examples of AI chat SaaS applications built with this architecture:
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://chatgpt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  ChatGPT
                </a>{" "}
                - Industry-leading example (similar architecture at scale)
              </li>
              <li>
                <a
                  href="https://claude.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  Claude.ai
                </a>{" "}
                - Anthropic's official chat interface
              </li>
              <li>
                <a
                  href="https://vercel.com/templates/next.js/ai-chatbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  Vercel AI Chatbot Template
                </a>{" "}
                - Open-source starter with similar patterns
              </li>
            </ul>
          </div>
        </section>

        {/* Architecture Diagram */}
        <div className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-slate-100">Architecture</h2>
          <ArchitectureDiagram
            nodes={[
              // System Patterns
              {
                id: "nextjs-supabase-auth",
                label: "Next.js 15 + Supabase Auth",
                type: "system",
                href: "/systems/nextjs-15-supabase-auth",
                description: "Authentication with middleware cookie handling",
              },
              {
                id: "ai-streaming",
                label: "AI Streaming Chat",
                type: "system",
                href: "/systems/ai-streaming-chat",
                description: "Real-time AI response streaming with Vercel AI SDK",
              },
              {
                id: "usage-tracking",
                label: "API Usage Tracking",
                type: "system",
                href: "/systems/api-usage-tracking",
                description: "Metering and quota management",
              },
              {
                id: "stripe-subs",
                label: "Stripe Subscriptions",
                type: "system",
                href: "/systems/stripe-subscriptions",
                description: "Payment integration and webhooks",
              },
              // Software Stack
              {
                id: "nextjs",
                label: "Next.js 15",
                type: "software",
                href: "/software/nextjs",
                description: "React framework with App Router",
              },
              {
                id: "react",
                label: "React 19",
                type: "software",
                href: "/software/react",
                description: "UI library with Server Components",
              },
              {
                id: "typescript",
                label: "TypeScript",
                type: "software",
                href: "/software/typescript",
                description: "Type-safe development",
              },
              {
                id: "vercel-ai-sdk",
                label: "Vercel AI SDK",
                type: "software",
                href: "/software/vercel-ai-sdk",
                description: "AI streaming and tool calling",
              },
              // Services
              {
                id: "vercel",
                label: "Vercel",
                type: "service",
                href: "/services/vercel",
                description: "Hosting and deployment",
              },
              {
                id: "supabase",
                label: "Supabase",
                type: "service",
                href: "/services/supabase",
                description: "Database, auth, and real-time",
              },
              {
                id: "anthropic",
                label: "Anthropic Claude",
                type: "service",
                href: "/services/anthropic",
                description: "AI inference",
              },
              {
                id: "stripe",
                label: "Stripe",
                type: "service",
                href: "/services/stripe",
                description: "Payment processing",
              },
            ]}
          />
        </div>

        {/* Full Stack Breakdown */}
        <div className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-slate-100">Full Stack Breakdown</h2>
          <FullStackBreakdown
            systems={[
              {
                name: "Next.js 15 + Supabase Auth",
                href: "/systems/nextjs-15-supabase-auth",
                description: "User authentication with social login and email/password",
                complexity: "medium",
              },
              {
                name: "AI Streaming Chat",
                href: "/systems/ai-streaming-chat",
                description: "Real-time streaming AI responses with state management",
                complexity: "medium",
              },
              {
                name: "API Usage Tracking",
                href: "/systems/api-usage-tracking",
                description: "Token counting, quota enforcement, and rate limiting",
                complexity: "medium",
              },
              {
                name: "Stripe Subscriptions",
                href: "/systems/stripe-subscriptions",
                description: "Multi-tier billing with webhook handling",
                complexity: "high",
              },
            ]}
            software={[
              {
                name: "Next.js",
                href: "/software/nextjs",
                version: "15.5+",
                purpose: "React framework with App Router and Server Components",
              },
              {
                name: "Vercel AI SDK",
                href: "/software/vercel-ai-sdk",
                version: "5.0+",
                purpose: "Streaming AI responses and chat state management",
              },
              {
                name: "Supabase JS",
                href: "/software/supabase",
                version: "2.57+",
                purpose: "Database client and authentication",
              },
              {
                name: "Stripe JS",
                href: "/software/stripe-js",
                version: "4.7+",
                purpose: "Payment processing and subscription management",
              },
              {
                name: "React",
                href: "/software/react",
                version: "19.1+",
                purpose: "UI library with hooks and suspense",
              },
              {
                name: "TypeScript",
                href: "/software/typescript",
                version: "5.9+",
                purpose: "Type safety across the stack",
              },
            ]}
            services={[
              {
                name: "Vercel",
                href: "/services/vercel",
                purpose: "Hosting, edge functions, and deployments",
                cost: "$0-60/mo",
              },
              {
                name: "Supabase",
                href: "/services/supabase",
                purpose: "PostgreSQL database, auth, and storage",
                cost: "$0-25/mo",
              },
              {
                name: "Anthropic",
                href: "/services/anthropic",
                purpose: "Claude AI API for chat completions",
                cost: "$50-200/mo",
              },
              {
                name: "Stripe",
                href: "/services/stripe",
                purpose: "Payment processing and subscription billing",
                cost: "2.9% + $0.30",
              },
            ]}
            supportLinks={[
              {
                title: "Dynamic Server Usage Error",
                href: "/support/dynamic-server-usage",
                description: "Fix Next.js 15 async cookie/header errors",
              },
              {
                title: "AI Streaming Errors",
                href: "/support/ai-streaming-errors",
                description: "Handle stream interruption and timeouts",
              },
              {
                title: "Connection Pool Exhaustion",
                href: "/support/connection-pool-exhaustion",
                description: "Enable Supabase connection pooling",
              },
              {
                title: "Stripe Webhook Errors",
                href: "/support/stripe-webhook-errors",
                description: "Fix webhook signature verification",
              },
              {
                title: "PKCE Flow Failed",
                href: "/support/pkce-flow-failed",
                description: "Fix Supabase auth cookie timing",
              },
              {
                title: "Hydration Mismatch",
                href: "/support/hydration-mismatch",
                description: "Resolve server/client HTML differences",
              },
            ]}
          />
        </div>

        {/* Cost Model */}
        <div className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-slate-100">Cost Model</h2>
          <CostModel
            phases={[
              {
                name: "MVP (0-100 users)",
                totalCost: "$100-250/mo",
                breakdown: [
                  {
                    service: "Vercel",
                    tier: "Hobby (Free)",
                    cost: "$0",
                    notes: "Sufficient for MVP with <100GB bandwidth",
                  },
                  {
                    service: "Supabase",
                    tier: "Free",
                    cost: "$0",
                    notes: "500MB DB, 50K MAU, 2GB storage",
                  },
                  {
                    service: "Anthropic",
                    tier: "Pay-as-you-go",
                    cost: "$50-200",
                    notes: "~10K-40K messages/mo with Claude 3.7 Sonnet",
                  },
                  {
                    service: "Stripe",
                    tier: "Standard",
                    cost: "$50-250",
                    notes: "2.9% + $0.30 on $1.7K-8.6K monthly revenue",
                  },
                ],
                triggerPoints: [
                  "Upgrade Vercel when bandwidth >100GB/mo",
                  "Upgrade Supabase when DB >500MB or users >50K",
                  "Scale Anthropic costs with message volume",
                ],
              },
              {
                name: "Growth (100-1K users)",
                totalCost: "$550-2K/mo",
                breakdown: [
                  {
                    service: "Vercel",
                    tier: "Pro",
                    cost: "$20",
                    notes: "Team features + 1TB bandwidth",
                  },
                  {
                    service: "Supabase",
                    tier: "Pro",
                    cost: "$25",
                    notes: "8GB DB + connection pooler",
                  },
                  {
                    service: "Anthropic",
                    tier: "Pay-as-you-go",
                    cost: "$500-2K",
                    notes: "100K-400K messages/mo",
                  },
                  {
                    service: "Stripe",
                    tier: "Standard",
                    cost: "$145-580",
                    notes: "2.9% + $0.30 on $5K-20K MRR",
                  },
                ],
                triggerPoints: [
                  "Consider Anthropic volume discounts",
                  "Monitor connection pool usage",
                  "Optimize token usage with caching",
                ],
              },
              {
                name: "Scale (1K+ users)",
                totalCost: "$5K-50K+/mo",
                breakdown: [
                  {
                    service: "Vercel",
                    tier: "Enterprise",
                    cost: "$500+",
                    notes: "Custom limits + SLA",
                  },
                  {
                    service: "Supabase",
                    tier: "Pro + Compute",
                    cost: "$599+",
                    notes: "Dedicated compute + point-in-time recovery",
                  },
                  {
                    service: "Anthropic",
                    tier: "Enterprise",
                    cost: "$5K-40K+",
                    notes: "Volume discounts + dedicated support",
                  },
                  {
                    service: "Stripe",
                    tier: "Negotiated",
                    cost: "2.7% + $0.30",
                    notes: "Lower rates on $100K+ MRR",
                  },
                ],
                triggerPoints: [
                  "Negotiate enterprise contracts",
                  "Consider multi-region deployment",
                  "Implement aggressive caching",
                ],
              },
            ]}
          />
        </div>

        {/* Time Estimate */}
        <div className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-slate-100">Development Timeline</h2>
          <TimeEstimate
            phases={[
              {
                name: "Project Setup",
                duration: "1 hour",
                tasks: [
                  "Initialize Next.js 15 project with TypeScript",
                  "Set up Tailwind CSS and shadcn/ui",
                  "Configure ESLint and Prettier",
                  "Initialize Git repository",
                ],
              },
              {
                name: "Authentication",
                duration: "4 hours",
                tasks: [
                  "Set up Supabase project and auth",
                  "Implement auth middleware for protected routes",
                  "Build login/signup UI components",
                  "Test social login flows (Google, GitHub)",
                ],
              },
              {
                name: "Chat UI",
                duration: "6 hours",
                tasks: [
                  "Build chat interface with message bubbles",
                  "Implement streaming UI with loading states",
                  "Add conversation sidebar with history",
                  "Create new conversation and delete flows",
                ],
              },
              {
                name: "AI Integration",
                duration: "4 hours",
                tasks: [
                  "Set up Anthropic API and Vercel AI SDK",
                  "Implement streaming chat completion",
                  "Add error handling and retry logic",
                  "Test token counting and limits",
                ],
              },
              {
                name: "Database Schema",
                duration: "2 hours",
                tasks: [
                  "Design tables (users, conversations, messages, usage)",
                  "Implement Row Level Security policies",
                  "Create database indexes for performance",
                  "Write migrations and test data",
                ],
              },
              {
                name: "Usage Tracking",
                duration: "6 hours",
                tasks: [
                  "Implement token counting middleware",
                  "Create usage dashboard for users",
                  "Add quota enforcement and rate limiting",
                  "Build admin usage analytics",
                ],
              },
              {
                name: "Stripe Integration",
                duration: "8 hours",
                tasks: [
                  "Set up Stripe account and products",
                  "Implement checkout flow and customer portal",
                  "Build webhook handlers for subscription events",
                  "Test subscription lifecycle (create, upgrade, cancel)",
                ],
              },
              {
                name: "Testing & Polish",
                duration: "8 hours",
                tasks: [
                  "Write unit tests for critical paths",
                  "E2E testing with Playwright",
                  "Fix edge cases and error states",
                  "Performance optimization and caching",
                ],
              },
            ]}
            totalEstimate="2-3 weeks"
            notes="Timeline assumes 20 hours/week. Can be accelerated with full-time focus or slowed by learning curve for new technologies."
          />
        </div>

        {/* Common Pitfalls */}
        <div className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-slate-100">Common Pitfalls</h2>
          <CommonPitfalls
            pitfalls={[
              {
                title: "AI Cost Spikes",
                severity: "high",
                description:
                  "Uncontrolled token usage can lead to massive unexpected bills. A single power user or bot can consume thousands of dollars in API credits.",
                prevention: [
                  "Implement per-user rate limiting from day one",
                  "Set up usage alerts in Anthropic dashboard",
                  "Add circuit breakers to stop requests at thresholds",
                  "Monitor token usage in real-time",
                ],
                detection: "Sudden increase in Anthropic API costs or user complaints about rate limits",
                mitigation:
                  "Immediately implement stricter rate limits, investigate abuse patterns, and contact users with anomalous usage",
              },
              {
                title: "Streaming State Management",
                severity: "medium",
                description:
                  "Managing UI state during streaming is complex. Connections can drop mid-stream, causing incomplete messages and confused state.",
                prevention: [
                  "Use Vercel AI SDK's useChat hook for state management",
                  "Implement error boundaries around streaming components",
                  "Add timeout handling for long-running streams",
                  "Store message state in database as it streams",
                ],
                detection: "Users report incomplete messages or blank chat after errors",
                mitigation:
                  "Add reconnection logic, show clear error states, and allow users to retry failed messages",
              },
              {
                title: "Connection Pool Exhaustion",
                severity: "high",
                description:
                  "Supabase free tier has connection limits. Each serverless function invocation creates a new connection, quickly exhausting the pool.",
                prevention: [
                  "Enable Supabase connection pooler from the start",
                  "Use pgBouncer mode for transactional queries",
                  "Set proper connection timeout values",
                  "Monitor connection usage in Supabase dashboard",
                ],
                detection: "Error: 'remaining connection slots are reserved' or 'too many clients already'",
                mitigation:
                  "Enable connection pooler immediately, upgrade to Pro tier for higher limits, or implement connection retry logic",
              },
              {
                title: "Webhook Idempotency",
                severity: "medium",
                description:
                  "Stripe sends duplicate webhooks. Without idempotency, you might grant subscriptions twice or charge users multiple times.",
                prevention: [
                  "Store webhook event IDs in database",
                  "Check for duplicate events before processing",
                  "Use database transactions for critical operations",
                  "Implement Stripe's idempotency keys",
                ],
                detection: "Users report duplicate charges or subscription state inconsistencies",
                mitigation: "Add idempotency checks retroactively and manually reconcile affected accounts",
              },
              {
                title: "Auth Cookie Timing",
                severity: "medium",
                description:
                  "Supabase auth cookies must be set on both request AND response in Next.js 15 middleware, or PKCE flow fails silently.",
                prevention: [
                  "Follow Supabase Next.js SSR guide exactly",
                  "Set cookies on both request and response",
                  "Test auth flow in production-like environment",
                  "Add comprehensive auth logging",
                ],
                detection: "PKCE flow failed error or users can't log in after social auth redirect",
                mitigation: "Update middleware to set cookies properly (see support article for fix)",
              },
            ]}
          />
        </div>

        {/* Decision Framework */}
        <div className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-slate-100">When to Choose This Solution</h2>
          <SolutionDecision
            chooseIf={{
              title: "Choose This Solution If:",
              criteria: [
                {
                  condition: "Building an AI-powered SaaS product",
                  reasoning:
                    "This architecture is specifically designed for AI SaaS with all necessary components: auth, billing, usage tracking, and streaming AI.",
                },
                {
                  condition: "Need subscription billing and usage limits",
                  reasoning:
                    "Stripe integration handles multi-tier plans, and usage tracking enforces quotas per plan automatically.",
                },
                {
                  condition: "Want fast, streaming AI responses",
                  reasoning:
                    "Vercel AI SDK provides best-in-class streaming with built-in state management and error handling.",
                },
                {
                  condition: "Prefer PostgreSQL and Row Level Security",
                  reasoning:
                    "Supabase gives you full PostgreSQL with RLS, making multi-tenant data isolation straightforward and secure.",
                },
                {
                  condition: "Value cost-effective infrastructure",
                  reasoning:
                    "Can start entirely on free tiers (except AI API) and scale costs gradually as you grow revenue.",
                },
              ],
            }}
            chooseAlternativeIf={{
              title: "Consider Alternatives If:",
              alternatives: [
                {
                  condition: "Building a simple chatbot widget",
                  alternative: "Use Botpress, Voiceflow, or embedded chat libraries",
                  reasoning:
                    "These provide pre-built UI and require minimal backend setup. Better for non-SaaS use cases.",
                },
                {
                  condition: "Internal tool with no billing needed",
                  alternative: "Simplify to Next.js + AI SDK + basic auth",
                  reasoning:
                    "Skip Stripe entirely and use simple environment-based auth. Reduces complexity by 40%.",
                },
                {
                  condition: "No usage tracking or limits required",
                  alternative: "Next.js + Vercel AI SDK + Supabase (no usage tables)",
                  reasoning:
                    "Removes the complexity of metering and quota enforcement. Good for unlimited internal tools.",
                },
                {
                  condition: "Mobile-first application",
                  alternative: "React Native + Expo with similar backend",
                  reasoning:
                    "Web-based chat works on mobile but native apps provide better UX for mobile-first products.",
                },
                {
                  condition: "Need multi-modal AI (voice, images, video)",
                  alternative: "Consider OpenAI API with GPT-4 Vision or Whisper",
                  reasoning:
                    "Anthropic focuses on text. OpenAI has better multi-modal support for diverse content types.",
                },
              ],
            }}
          />
        </div>

        {/* Quick Start Code */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-slate-100">Quick Start</h2>

          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-slate-100">1. Initialize Project</h3>
              <InteractiveCodeBlock
                code={`# Create Next.js 15 project
npx create-next-app@latest ai-chat-saas --typescript --tailwind --app

# Install dependencies
cd ai-chat-saas
npm install ai @ai-sdk/anthropic @supabase/supabase-js @supabase/ssr stripe zod react-hook-form @hookform/resolvers

# Install dev dependencies
npm install -D @types/node @types/react @types/react-dom`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-slate-100">
                2. Environment Variables
              </h3>
              <InteractiveCodeBlock
                code={`# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

ANTHROPIC_API_KEY=your_anthropic_api_key

STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

NEXT_PUBLIC_APP_URL=http://localhost:3000`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-slate-100">
                3. Basic Streaming Chat
              </h3>
              <InteractiveCodeBlock
                code={`// app/api/chat/route.ts
import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: anthropic('claude-3-7-sonnet-20250219'),
    messages,
    maxTokens: 1024,
  });

  return result.toDataStreamResponse();
}

// app/chat/page.tsx
'use client';
import { useChat } from 'ai/react';

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div>
      <div>
        {messages.map((m) => (
          <div key={m.id}>
            <strong>{m.role}:</strong> {m.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}`}
                language="typescript"
              />
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="prose prose-slate mb-12 max-w-none dark:prose-invert">
          <h2>Next Steps</h2>
          <ol>
            <li>
              <strong>
                <Link href="/systems/nextjs-15-supabase-auth">Set up authentication</Link>
              </strong>{" "}
              - Follow the complete guide for Supabase auth integration
            </li>
            <li>
              <strong>
                <Link href="/systems/ai-streaming-chat">Implement streaming chat</Link>
              </strong>{" "}
              - Build production-ready chat with error handling
            </li>
            <li>
              <strong>
                <Link href="/systems/api-usage-tracking">Add usage tracking</Link>
              </strong>{" "}
              - Implement token counting and quota enforcement
            </li>
            <li>
              <strong>
                <Link href="/systems/stripe-subscriptions">Integrate Stripe billing</Link>
              </strong>{" "}
              - Set up subscriptions and webhooks
            </li>
            <li>
              <strong>Review common errors</strong> - Check support articles for PKCE flow failures, streaming errors,
              and connection pool issues
            </li>
          </ol>
        </section>

        {/* Related Resources */}
        <section className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Related Resources</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-medium text-slate-900 dark:text-slate-100">System Patterns</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/systems/nextjs-15-supabase-auth" className="text-blue-600 hover:underline">
                    Next.js 15 + Supabase Auth
                  </Link>
                </li>
                <li>
                  <Link href="/systems/ai-streaming-chat" className="text-blue-600 hover:underline">
                    AI Streaming Chat
                  </Link>
                </li>
                <li>
                  <Link href="/systems/api-usage-tracking" className="text-blue-600 hover:underline">
                    API Usage Tracking
                  </Link>
                </li>
                <li>
                  <Link href="/systems/stripe-subscriptions" className="text-blue-600 hover:underline">
                    Stripe Subscriptions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-medium text-slate-900 dark:text-slate-100">Common Errors</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/support/dynamic-server-usage" className="text-blue-600 hover:underline">
                    Dynamic Server Usage Error
                  </Link>
                </li>
                <li>
                  <Link href="/support/ai-streaming-errors" className="text-blue-600 hover:underline">
                    AI Streaming Errors
                  </Link>
                </li>
                <li>
                  <Link href="/support/connection-pool-exhaustion" className="text-blue-600 hover:underline">
                    Connection Pool Exhaustion
                  </Link>
                </li>
                <li>
                  <Link href="/support/stripe-webhook-errors" className="text-blue-600 hover:underline">
                    Stripe Webhook Errors
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
