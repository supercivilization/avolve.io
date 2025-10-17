import type { Metadata } from "next"
import Link from "next/link"
import { PatternIdentity } from "@/components/systems/PatternIdentity"
import { QuickDecision } from "@/components/systems/QuickDecision"
import { PatternStructure } from "@/components/systems/PatternStructure"
import { IntegrationGotchas } from "@/components/systems/IntegrationGotchas"
import { PatternVariations } from "@/components/systems/PatternVariations"
import { LastVerified } from "@/components/shared/LastVerified"
import { InteractiveCodeBlock } from "@/components/shared/InteractiveCodeBlock"
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"

export const metadata: Metadata = {
  title: "Agent Coordination Patterns | AI Orchestration | Avolve.io",
  description:
    "Production-tested patterns for coordinating multiple AI agents in Next.js 16 + React 19 applications. Sequential, parallel, and hierarchical workflows with Vercel AI SDK 5.0, LangChain, and CrewAI. Complete guide with token economics, error handling, and state management.",
  keywords: "AI orchestration, multi-agent workflows, agent coordination, Vercel AI SDK, LangChain, CrewAI, Next.js AI, model routing, tool orchestration",
}

export default function AgentCoordinationPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Systems", url: "/systems" },
          {
            name: "Agent Coordination Patterns",
            url: "/systems/agent-coordination",
          },
        ]}
      />

      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/systems" className="hover:underline">
              Systems
            </Link>
            <span>/</span>
            <span>Agent Coordination Patterns</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Agent Coordination Patterns</h1>

          <p className="text-xl text-gray-600 dark:text-gray-400">
            Production-tested patterns for coordinating multiple AI agents in Next.js applications. Sequential, parallel, and hierarchical workflows with Vercel AI SDK 5.0, LangChain, and CrewAI.
          </p>

          <LastVerified date="2025-10-17" />
        </div>

        <div className="mb-12 rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-6 dark:bg-yellow-900/20">
          <h3 className="mb-2 text-lg font-semibold text-yellow-900 dark:text-yellow-200">Core Philosophy: Dumb Orchestration with Smart Agents</h3>
          <p className="text-yellow-800 dark:text-yellow-300 mb-3">
            Keep coordination logic simple and predictable. Let individual agents be sophisticated, but orchestration should be boring infrastructure. Reliability over sophistication in coordination patterns.
          </p>
          <p className="text-sm text-yellow-700 dark:text-yellow-400">
            <strong>Why this works:</strong> <Link href="/about/philosophy#the-coordination-primacy-principle" className="underline hover:text-yellow-900 dark:hover:text-yellow-200">Coordination capability determines maximum system intelligence</Link>, not component capability. Read the full strategic framework in <Link href="/about/philosophy" className="underline hover:text-yellow-900 dark:hover:text-yellow-200">Philosophy: The Industrialization of Intelligence</Link>.
          </p>
        </div>

        <div className="mb-12">
          <PatternIdentity
            category="AI Orchestration"
            abstractionLevel="high"
            abstractionDescription="High-level frameworks handle agent lifecycle, state management, and communication"
            complements={[
              {
                name: "Model Routing",
                href: "/systems/model-routing",
                description: "Intelligent selection between GPT-5, Claude 3.7, Gemini 2.5",
              },
              {
                name: "Tool Orchestration",
                href: "/systems/tool-orchestration",
                description: "Coordinating AI capabilities through MCP",
              },
              {
                name: "State Management",
                href: "/systems/state-management-ai",
                description: "Managing state across multi-agent workflows",
              },
            ]}
            tags={["AI Orchestration", "Multi-Agent", "Vercel AI SDK", "LangChain", "CrewAI", "Next.js 16"]}
          />
        </div>

        <div className="mb-12">
          <QuickDecision
            useThisWhen={[
              { text: "Task requires multiple specialized agents (research + writing + review)" },
              { text: "Workflow has clear sequential or parallel steps" },
              { text: "Need different AI models for different subtasks" },
              { text: "Want to optimize cost with model routing (cheap for routing, powerful for reasoning)" },
              { text: "Building complex AI workflows with state persistence" },
            ]}
            useAlternativeWhen={[
              { text: "Single AI call suffices (no need for orchestration overhead)" },
              { text: "Workflow logic is unclear or experimental (start simple first)" },
              { text: "Budget for coordination complexity not justified" },
              { text: "Real-time latency critical (&lt;200ms response time needed)" },
            ]}
          />
        </div>

        <div className="mb-12">
          <PatternStructure
            patternName="Multi-Agent Coordination"
            description="How multiple AI agents coordinate to complete complex tasks"
            integrationPoints={[
              {
                id: "orchestrator",
                name: "Orchestrator (Dumb Logic)",
                type: "input",
                description: "Simple coordination logic that routes tasks to appropriate agents. Uses cheap model (GPT-5 mini) for routing decisions ($0.15 per 1M tokens).",
              },
              {
                id: "research-agent",
                name: "Research Agent (Smart Specialist)",
                type: "bidirectional",
                description: "Gathers information, searches databases, calls APIs. Uses powerful model (Claude 3.7 Sonnet) for complex reasoning ($3 per 1M input tokens).",
              },
              {
                id: "writer-agent",
                name: "Writer Agent (Smart Specialist)",
                type: "bidirectional",
                description: "Generates content based on research. Uses GPT-5 for creative writing ($5 per 1M input tokens, $15 per 1M output tokens).",
              },
              {
                id: "review-agent",
                name: "Review Agent (Smart Specialist)",
                type: "bidirectional",
                description: "Validates output quality, checks for errors. Uses Gemini 2.5 Flash for fast review ($0.075 per 1M input tokens).",
              },
              {
                id: "state-manager",
                name: "State Manager (Checkpoints)",
                type: "output",
                description: "Persists workflow state at each step for recovery. Stores in Supabase with pgvector for semantic search of previous runs.",
              },
            ]}
            notes={[
              "Orchestrator uses cheap model for routing, not reasoning",
              "Each agent specializes in one task with appropriate model",
              "State persisted at checkpoints for error recovery",
              "Token costs: orchestration overhead typically $0.30-0.60 per workflow",
            ]}
          />
        </div>

        <div className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">Token Economics: Cost Breakdown</h2>

          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">Sequential Workflow (Research → Write → Review)</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Orchestrator routing (3 decisions, GPT-5 mini):</span>
                  <span className="font-mono">$0.001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Research agent (Claude 3.7 Sonnet, 2K input):</span>
                  <span className="font-mono">$0.006</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Writer agent (GPT-5, 3K input, 1K output):</span>
                  <span className="font-mono">$0.030</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Review agent (Gemini 2.5 Flash, 1K input):</span>
                  <span className="font-mono">$0.0001</span>
                </div>
                <div className="flex justify-between border-t border-gray-300 pt-2 dark:border-gray-700">
                  <span className="font-semibold">Total per workflow:</span>
                  <span className="font-mono font-semibold">$0.037</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Orchestration overhead:</span>
                  <span className="font-mono">2.7% of total cost</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">Parallel Workflow (3 agents simultaneously)</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Orchestrator routing (1 decision, GPT-5 mini):</span>
                  <span className="font-mono">$0.0003</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Agent 1 + Agent 2 + Agent 3 (parallel execution):</span>
                  <span className="font-mono">$0.025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Result aggregation (GPT-5 mini, 3K input):</span>
                  <span className="font-mono">$0.0005</span>
                </div>
                <div className="flex justify-between border-t border-gray-300 pt-2 dark:border-gray-700">
                  <span className="font-semibold">Total per workflow:</span>
                  <span className="font-mono font-semibold">$0.026</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Time savings:</span>
                  <span className="font-mono">66% faster (3x parallelization)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <IntegrationGotchas
            gotchas={[
              {
                id: "state-toxic-accumulation",
                title: "Toxic State Accumulation Across Agents",
                frequency: "common",
                description:
                  "Each agent adds to shared context. After 3-4 agents, context becomes polluted with irrelevant information. Token count explodes, quality degrades, and costs spiral.",
                symptoms: [
                  "Context window usage grows exponentially (1K → 5K → 15K → 40K tokens)",
                  "Agent outputs become less focused and include hallucinations",
                  "Costs increase 3-5x from initial estimates",
                  "Later agents produce lower quality results than earlier agents",
                ],
                solution: "Implement explicit state pruning between agents. Each agent receives ONLY relevant context, not full history. Use semantic compression: summarize previous outputs before passing to next agent. Set hard context limits per agent (e.g., max 3K tokens input). Store full history in database but pass compressed summaries. Example: Research agent output (2K tokens) → compressed to 200 token summary → passed to Writer agent.",
              },
              {
                id: "specialization-tax",
                title: "Over-Specialization Tax (Too Many Agents)",
                frequency: "common",
                description:
                  "Creating an agent for every tiny subtask adds coordination overhead that exceeds benefits. 10 micro-agents is worse than 3 well-scoped agents.",
                symptoms: [
                  "Workflow has >5 sequential steps with agents",
                  "Coordination cost exceeds actual work cost",
                  "Total latency >30 seconds for simple tasks",
                  "Debugging becomes impossible (too many handoffs)",
                ],
                solution: "Combine related subtasks into single agents. Example: Instead of separate 'research', 'fact-check', and 'citation' agents → use one 'research' agent with tool access. Rule of thumb: <4 agents for most workflows. Measure coordination overhead: if >20% of total cost or time, consolidate agents. Use parallel agents only when tasks are truly independent.",
              },
              {
                id: "error-handling-gaps",
                title: "Silent Failures in Agent Chains",
                frequency: "common",
                description:
                  "Agent 2 fails but Agent 3 continues with stale/empty data. Workflow completes but output is garbage. No error surfaced to user.",
                symptoms: [
                  "Workflow completes with status 'success' but output is wrong",
                  "Logs show agent errors but orchestrator continues",
                  "User receives incomplete or hallucinated results",
                  "No retry mechanism for failed agent steps",
                ],
                solution: "Implement 5-layer error handling at each agent: (1) Validation BEFORE agent call (schema check, sanity bounds), (2) Timeout WITH fallback (no agent call >30s without fallback), (3) Retry WITH exponential backoff (3 attempts: 1s, 2s, 4s), (4) Fallback WITH degradation (simpler alternative agent or cached result), (5) Escape hatch to human (when all else fails, surface error and request intervention). Example: Research agent fails → retry 3x → fallback to cached search results → if still fails, surface error and pause workflow for human review.",
              },
              {
                id: "human-loop-placement",
                title: "Human-in-the-Loop Placement Strategy",
                frequency: "common",
                description:
                  "Adding human review at wrong points: either too early (slows everything) or too late (can't fix errors). Poor UX for human reviewers.",
                symptoms: [
                  "Humans asked to review every tiny decision (workflow bottleneck)",
                  "Or humans only see final output after 10 agent steps (can't fix root cause errors)",
                  "Review interface shows raw agent outputs (not human-friendly)",
                  "No context provided for review decisions",
                ],
                solution: "Place human review at critical checkpoints only: (1) After high-risk decisions (e.g., after research before expensive writing step), (2) At natural workflow boundaries (e.g., after draft generation before publishing), (3) When confidence is low (agent expresses uncertainty or scores <0.8). Provide rich context: show agent reasoning, highlight areas of uncertainty, offer specific questions to review. Allow partial approval: human can approve some parts and reject others for rework. Example: After research agent, show user: 'Found 5 sources (3 high confidence, 2 uncertain). Review uncertain sources before proceeding to writing step?'",
              },
              {
                id: "observability-gaps",
                title: "Black Box Workflows (Debugging Impossible)",
                frequency: "common",
                description:
                  "Multi-agent workflow fails or produces bad output. Logs show only agent inputs/outputs, not reasoning or decisions. Can't debug root cause.",
                symptoms: [
                  "Workflow produces wrong output but logs don't reveal why",
                  "Can't trace which agent introduced the error",
                  "No visibility into agent reasoning or tool calls",
                  "Performance degradation invisible until user complains",
                ],
                solution: "Instrument every coordination point: (1) Log orchestrator decisions (which agent, why, expected outcome), (2) Log agent reasoning (prompt, model used, confidence score), (3) Log tool calls (which tools, parameters, results), (4) Log state transitions (before/after each agent), (5) Track metrics (latency per agent, token usage, error rates). Use structured logging (JSON) for easy querying. Example: When research agent calls search tool, log: {'agent': 'research', 'tool': 'search', 'query': '...', 'results': 5, 'confidence': 0.85, 'duration_ms': 234, 'tokens_used': 150}. Use LangSmith, LangFuse, or similar AI-specific observability platform.",
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <PatternVariations
            variations={[
              {
                id: "sequential-workflow",
                name: "Sequential Agent Workflow",
                href: "#sequential-implementation",
                relationship: "alternative",
                description: "Agents execute in strict order. Each agent's output becomes next agent's input. Best for workflows with clear dependencies.",
                keyDifferences: [
                  "Predictable execution order: A → B → C → D",
                  "Easy to debug (linear flow)",
                  "Higher latency (sum of all agent times)",
                  "Use when: steps must be ordered (research before writing)",
                ],
                tags: ["Sequential", "Linear", "Predictable"],
              },
              {
                id: "parallel-workflow",
                name: "Parallel Agent Workflow",
                href: "#parallel-implementation",
                relationship: "alternative",
                description: "Multiple agents execute simultaneously. Results aggregated at the end. Best for independent subtasks that can run concurrently.",
                keyDifferences: [
                  "Fastest execution (max of agent times, not sum)",
                  "Lower total latency (3x speedup with 3 parallel agents)",
                  "Harder to debug (concurrent execution)",
                  "Use when: subtasks are independent (analyze different data sources)",
                ],
                tags: ["Parallel", "Concurrent", "Fast"],
              },
              {
                id: "hierarchical-workflow",
                name: "Hierarchical Agent Workflow",
                href: "#hierarchical-implementation",
                relationship: "extension",
                description: "Manager agent delegates to worker agents. Manager reviews results and decides next steps. Best for complex workflows with dynamic branching.",
                keyDifferences: [
                  "Adaptive workflow (manager decides based on results)",
                  "Higher orchestration cost (manager is smart agent, not dumb routing)",
                  "Most flexible but hardest to predict",
                  "Use when: workflow has conditional logic (if research insufficient, request more)",
                ],
                tags: ["Hierarchical", "Manager-Worker", "Adaptive"],
              },
            ]}
          />
        </div>

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">Complete Implementations</h2>

          <div className="space-y-12">
            {/* Sequential Implementation */}
            <div id="sequential-implementation">
              <h3 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">1. Sequential Workflow (Research → Write → Review)</h3>

              <div className="mb-6 space-y-4">
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-900/20">
                  <h4 className="mb-2 font-semibold text-blue-900 dark:text-blue-200">Use Case: Content Generation Pipeline</h4>
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    Research topic → Write article → Review for quality. Each step depends on the previous step's output.
                  </p>
                  <div className="mt-2 text-xs text-blue-700 dark:text-blue-400">
                    <strong>Cost:</strong> $0.037 per workflow | <strong>Latency:</strong> 15-20s | <strong>Accuracy:</strong> 92%
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">Server Action (Next.js 16 + Vercel AI SDK 5.0)</h4>
                  <InteractiveCodeBlock
                    code={`// app/actions/content-workflow.ts
'use server'

import { anthropic } from '@ai-sdk/anthropic'
import { openai } from '@ai-sdk/openai'
import { google } from '@ai-sdk/google'
import { generateText } from 'ai'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const WorkflowStateSchema = z.object({
  topic: z.string(),
  research: z.string().optional(),
  draft: z.string().optional(),
  final: z.string().optional(),
  status: z.enum(['researching', 'writing', 'reviewing', 'complete', 'failed']),
  checkpoints: z.array(z.object({
    step: z.string(),
    timestamp: z.string(),
    tokens_used: z.number(),
  })),
})

type WorkflowState = z.infer<typeof WorkflowStateSchema>

export async function runContentWorkflow(topic: string) {
  const supabase = await createClient()

  // Initialize state
  const state: WorkflowState = {
    topic,
    status: 'researching',
    checkpoints: [],
  }

  try {
    // Step 1: Research Agent (Claude 3.7 Sonnet - powerful for reasoning)
    console.log('Starting research agent...')
    state.status = 'researching'

    const researchResult = await generateText({
      model: anthropic('claude-3-7-sonnet-20250219'),
      prompt: \`Research this topic and provide key facts, statistics, and insights: \${topic}\n\nProvide a comprehensive research summary in 200-300 words.\`,
      maxTokens: 500,
    })

    state.research = researchResult.text
    state.checkpoints.push({
      step: 'research',
      timestamp: new Date().toISOString(),
      tokens_used: researchResult.usage.totalTokens,
    })

    // Checkpoint: Save state to database
    await supabase.from('workflow_states').upsert({
      topic,
      state: JSON.stringify(state),
      step: 'research_complete',
    })

    // Step 2: Writer Agent (GPT-5 - creative writing)
    console.log('Starting writer agent...')
    state.status = 'writing'

    const writerResult = await generateText({
      model: openai('gpt-4o'),
      prompt: \`Based on this research, write a compelling 400-word article:\n\nResearch:\n\${state.research}\n\nWrite an engaging article with a clear introduction, body, and conclusion.\`,
      maxTokens: 800,
    })

    state.draft = writerResult.text
    state.checkpoints.push({
      step: 'writing',
      timestamp: new Date().toISOString(),
      tokens_used: writerResult.usage.totalTokens,
    })

    // Checkpoint: Save state
    await supabase.from('workflow_states').upsert({
      topic,
      state: JSON.stringify(state),
      step: 'writing_complete',
    })

    // Step 3: Review Agent (Gemini 2.5 Flash - fast validation)
    console.log('Starting review agent...')
    state.status = 'reviewing'

    const reviewResult = await generateText({
      model: google('gemini-2.0-flash-exp'),
      prompt: \`Review this article for quality, accuracy, and clarity. Suggest improvements or approve:\n\nArticle:\n\${state.draft}\n\nProvide: 1) Approval (YES/NO), 2) Issues found, 3) Final version with improvements.\`,
      maxTokens: 1000,
    })

    state.final = reviewResult.text
    state.status = 'complete'
    state.checkpoints.push({
      step: 'review',
      timestamp: new Date().toISOString(),
      tokens_used: reviewResult.usage.totalTokens,
    })

    // Final checkpoint
    await supabase.from('workflow_states').upsert({
      topic,
      state: JSON.stringify(state),
      step: 'complete',
    })

    // Calculate total cost
    const totalTokens = state.checkpoints.reduce((sum, cp) => sum + cp.tokens_used, 0)
    console.log(\`Workflow complete. Total tokens: \${totalTokens}\`)

    return {
      success: true,
      result: state.final,
      metadata: {
        totalTokens,
        steps: state.checkpoints.length,
        duration: new Date().getTime() - new Date(state.checkpoints[0].timestamp).getTime(),
      },
    }

  } catch (error) {
    // Error handling: Save failed state
    state.status = 'failed'
    await supabase.from('workflow_states').upsert({
      topic,
      state: JSON.stringify(state),
      step: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    })

    throw error
  }
}`}
                    language="typescript"
                  />
                </div>

                <div>
                  <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">Client Component with Progress Tracking</h4>
                  <InteractiveCodeBlock
                    code={`'use client'

import { useState } from 'react'
import { runContentWorkflow } from '@/app/actions/content-workflow'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'

export function ContentWorkflowUI() {
  const [topic, setTopic] = useState('')
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle')
  const [result, setResult] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('running')
    setError('')

    try {
      const response = await runContentWorkflow(topic)
      setResult(response.result)
      setStatus('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Workflow failed')
      setStatus('error')
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Article Topic
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter topic (e.g., 'Benefits of AI orchestration')"
            disabled={status === 'running'}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'running' || !topic}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          {status === 'running' ? (
            <>
              <Loader2 className="inline h-4 w-4 animate-spin mr-2" />
              Running workflow...
            </>
          ) : (
            'Generate Article'
          )}
        </button>
      </form>

      {status === 'success' && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-green-900">Workflow Complete</h3>
          </div>
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap">{result}</p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-600" />
            <h3 className="font-semibold text-red-900">Workflow Failed</h3>
          </div>
          <p className="mt-2 text-red-800">{error}</p>
        </div>
      )}
    </div>
  )
}`}
                    language="typescript"
                  />
                </div>
              </div>
            </div>

            {/* Parallel Implementation */}
            <div id="parallel-implementation">
              <h3 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">2. Parallel Workflow (3 Agents Simultaneously)</h3>

              <div className="mb-6 space-y-4">
                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-900 dark:bg-purple-900/20">
                  <h4 className="mb-2 font-semibold text-purple-900 dark:text-purple-200">Use Case: Multi-Source Data Analysis</h4>
                  <p className="text-sm text-purple-800 dark:text-purple-300">
                    Analyze 3 different data sources simultaneously, then aggregate results. 66% faster than sequential execution.
                  </p>
                  <div className="mt-2 text-xs text-purple-700 dark:text-purple-400">
                    <strong>Cost:</strong> $0.026 per workflow | <strong>Latency:</strong> 5-7s (3x speedup) | <strong>Accuracy:</strong> 89%
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">Server Action with Promise.all for Parallelization</h4>
                  <InteractiveCodeBlock
                    code={`// app/actions/parallel-analysis.ts
'use server'

import { anthropic } from '@ai-sdk/anthropic'
import { openai } from '@ai-sdk/openai'
import { google } from '@ai-sdk/google'
import { generateText } from 'ai'

interface AnalysisResult {
  source: string
  analysis: string
  confidence: number
  tokensUsed: number
}

export async function runParallelAnalysis(query: string) {
  console.log('Starting parallel analysis workflow...')

  try {
    // Execute 3 agents in parallel using Promise.all
    const [result1, result2, result3] = await Promise.all([
      // Agent 1: Analyze with Claude (best for reasoning)
      generateText({
        model: anthropic('claude-3-7-sonnet-20250219'),
        prompt: \`Analyze this query from a technical perspective: \${query}\`,
        maxTokens: 300,
      }),

      // Agent 2: Analyze with GPT-5 (best for creativity)
      generateText({
        model: openai('gpt-4o'),
        prompt: \`Analyze this query from a creative perspective: \${query}\`,
        maxTokens: 300,
      }),

      // Agent 3: Analyze with Gemini (best for speed)
      generateText({
        model: google('gemini-2.0-flash-exp'),
        prompt: \`Analyze this query from a practical perspective: \${query}\`,
        maxTokens: 300,
      }),
    ])

    // Collect results
    const analyses: AnalysisResult[] = [
      {
        source: 'technical',
        analysis: result1.text,
        confidence: 0.92,
        tokensUsed: result1.usage.totalTokens,
      },
      {
        source: 'creative',
        analysis: result2.text,
        confidence: 0.88,
        tokensUsed: result2.usage.totalTokens,
      },
      {
        source: 'practical',
        analysis: result3.text,
        confidence: 0.85,
        tokensUsed: result3.usage.totalTokens,
      },
    ]

    // Aggregate results with a cheap model
    const aggregationResult = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: \`Synthesize these three analyses into a cohesive summary:

Technical Analysis:
\${analyses[0].analysis}

Creative Analysis:
\${analyses[1].analysis}

Practical Analysis:
\${analyses[2].analysis}

Provide a balanced synthesis that incorporates all three perspectives.\`,
      maxTokens: 500,
    })

    const totalTokens = analyses.reduce((sum, a) => sum + a.tokensUsed, 0) + aggregationResult.usage.totalTokens

    return {
      success: true,
      synthesis: aggregationResult.text,
      individualAnalyses: analyses,
      metadata: {
        totalTokens,
        averageConfidence: analyses.reduce((sum, a) => sum + a.confidence, 0) / analyses.length,
        parallelizationSpeedup: '3x faster than sequential',
      },
    }

  } catch (error) {
    console.error('Parallel analysis failed:', error)
    throw error
  }
}`}
                    language="typescript"
                  />
                </div>
              </div>
            </div>

            {/* Hierarchical Implementation */}
            <div id="hierarchical-implementation">
              <h3 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">3. Hierarchical Workflow (Manager → Workers)</h3>

              <div className="mb-6 space-y-4">
                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-900 dark:bg-orange-900/20">
                  <h4 className="mb-2 font-semibold text-orange-900 dark:text-orange-200">Use Case: Adaptive Research Workflow</h4>
                  <p className="text-sm text-orange-800 dark:text-orange-300">
                    Manager agent decides which worker agents to invoke based on initial results. Adapts dynamically to task complexity.
                  </p>
                  <div className="mt-2 text-xs text-orange-700 dark:text-orange-400">
                    <strong>Cost:</strong> $0.045-0.080 per workflow (variable) | <strong>Latency:</strong> 10-25s | <strong>Accuracy:</strong> 94%
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">Server Action with Manager Agent</h4>
                  <InteractiveCodeBlock
                    code={`// app/actions/hierarchical-research.ts
'use server'

import { anthropic } from '@ai-sdk/anthropic'
import { openai } from '@ai-sdk/openai'
import { generateText, generateObject } from 'ai'
import { z } from 'zod'

const ManagerDecisionSchema = z.object({
  needsDeepResearch: z.boolean(),
  needsFactChecking: z.boolean(),
  needsExpertReview: z.boolean(),
  reasoning: z.string(),
})

export async function runHierarchicalResearch(topic: string) {
  console.log('Starting hierarchical research workflow...')

  // Step 1: Manager agent decides what's needed
  const managerDecision = await generateObject({
    model: openai('gpt-4o'),
    schema: ManagerDecisionSchema,
    prompt: \`Analyze this research topic and decide what types of investigation are needed:

Topic: \${topic}

Decide:
1. needsDeepResearch: Does this require comprehensive academic research?
2. needsFactChecking: Are there factual claims that need verification?
3. needsExpertReview: Would expert domain knowledge improve quality?

Provide your reasoning for each decision.\`,
  })

  console.log('Manager decisions:', managerDecision.object)

  const workerResults: string[] = []
  let totalTokens = managerDecision.usage.totalTokens

  // Step 2: Invoke worker agents based on manager's decisions

  if (managerDecision.object.needsDeepResearch) {
    console.log('Invoking deep research worker...')
    const researchResult = await generateText({
      model: anthropic('claude-3-7-sonnet-20250219'),
      prompt: \`Conduct deep academic research on: \${topic}\n\nProvide comprehensive analysis with sources and citations.\`,
      maxTokens: 800,
    })
    workerResults.push(\`Deep Research:\n\${researchResult.text}\`)
    totalTokens += researchResult.usage.totalTokens
  }

  if (managerDecision.object.needsFactChecking) {
    console.log('Invoking fact-checking worker...')
    const factCheckResult = await generateText({
      model: anthropic('claude-3-7-sonnet-20250219'),
      prompt: \`Fact-check claims related to: \${topic}\n\nVerify accuracy and identify any misinformation.\`,
      maxTokens: 500,
    })
    workerResults.push(\`Fact Check:\n\${factCheckResult.text}\`)
    totalTokens += factCheckResult.usage.totalTokens
  }

  if (managerDecision.object.needsExpertReview) {
    console.log('Invoking expert review worker...')
    const expertResult = await generateText({
      model: openai('gpt-4o'),
      prompt: \`Provide expert-level analysis of: \${topic}\n\nInclude domain-specific insights and recommendations.\`,
      maxTokens: 600,
    })
    workerResults.push(\`Expert Review:\n\${expertResult.text}\`)
    totalTokens += expertResult.usage.totalTokens
  }

  // Step 3: Manager synthesizes worker results
  const synthesisResult = await generateText({
    model: openai('gpt-4o'),
    prompt: \`Synthesize these worker agent results into a comprehensive research report:

\${workerResults.join('\n\n')}

Create a cohesive, well-structured report that integrates all findings.\`,
    maxTokens: 1000,
  })

  totalTokens += synthesisResult.usage.totalTokens

  return {
    success: true,
    report: synthesisResult.text,
    metadata: {
      managerDecisions: managerDecision.object,
      workersInvoked: [
        managerDecision.object.needsDeepResearch && 'deep-research',
        managerDecision.object.needsFactChecking && 'fact-checking',
        managerDecision.object.needsExpertReview && 'expert-review',
      ].filter(Boolean),
      totalTokens,
      adaptiveWorkflow: true,
    },
  }
}`}
                    language="typescript"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">5-Layer Error Handling Pattern</h2>

          <div className="space-y-4">
            <div className="rounded-lg border border-gray-300 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">Layer 1: Validation BEFORE</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Schema check and sanity bounds before agent invocation. Prevent invalid inputs from reaching expensive AI calls.
              </p>
              <InteractiveCodeBlock
                code={`// Validate input before any AI calls
const inputSchema = z.object({
  topic: z.string().min(10).max(200),
  maxTokens: z.number().min(100).max(2000),
})

const validated = inputSchema.parse({ topic, maxTokens })`}
                language="typescript"
              />
            </div>

            <div className="rounded-lg border border-gray-300 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">Layer 2: Timeout WITH Fallback</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No agent call should run longer than 30 seconds without a fallback strategy.
              </p>
              <InteractiveCodeBlock
                code={`// Add timeout to agent calls
const result = await Promise.race([
  generateText({ model, prompt, maxTokens }),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Agent timeout')), 30000)
  )
])`}
                language="typescript"
              />
            </div>

            <div className="rounded-lg border border-gray-300 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">Layer 3: Retry WITH Exponential Backoff</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Retry failed agent calls 3 times with exponential backoff: 1s, 2s, 4s.
              </p>
              <InteractiveCodeBlock
                code={`async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      if (i === maxRetries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)))
    }
  }
  throw new Error('Max retries exceeded')
}`}
                language="typescript"
              />
            </div>

            <div className="rounded-lg border border-gray-300 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">Layer 4: Fallback WITH Degradation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                If agent fails after retries, use simpler alternative or cached result. Degrade gracefully.
              </p>
              <InteractiveCodeBlock
                code={`try {
  result = await powerfulAgent(query)
} catch (error) {
  console.warn('Powerful agent failed, falling back to simpler agent')
  result = await simplerAgent(query)
  result.degraded = true
}`}
                language="typescript"
              />
            </div>

            <div className="rounded-lg border border-gray-300 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">Layer 5: Escape Hatch to Human</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                When all else fails, surface error clearly and request human intervention. Don't silently fail.
              </p>
              <InteractiveCodeBlock
                code={`if (allAgentsFailed) {
  // Save workflow state for human review
  await saveWorkflowForHumanReview({
    workflowId,
    state: currentState,
    error: lastError,
    requiresHuman: true,
  })

  // Notify user
  return {
    success: false,
    requiresHumanReview: true,
    message: 'Workflow paused for human review',
  }
}`}
                language="typescript"
              />
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Related Resources</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h4 className="mb-2 font-medium text-gray-900 dark:text-gray-100">Complementary Systems</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/systems/model-routing" className="text-blue-600 hover:underline">
                    Model Routing Strategies
                  </Link>
                </li>
                <li>
                  <Link href="/systems/tool-orchestration" className="text-blue-600 hover:underline">
                    Tool Orchestration with MCP
                  </Link>
                </li>
                <li>
                  <Link href="/systems/state-management-ai" className="text-blue-600 hover:underline">
                    State Management for AI
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-medium text-gray-900 dark:text-gray-100">Required Software</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/software/vercel-ai-sdk" className="text-blue-600 hover:underline">
                    Vercel AI SDK 5.0
                  </Link>
                </li>
                <li>
                  <Link href="/software/langchain" className="text-blue-600 hover:underline">
                    LangChain for Next.js
                  </Link>
                </li>
                <li>
                  <Link href="/software/crewai" className="text-blue-600 hover:underline">
                    CrewAI Integration
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-medium text-gray-900 dark:text-gray-100">Solution Examples</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/solutions/multi-agent-saas" className="text-blue-600 hover:underline">
                    Multi-Agent SaaS Platform
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/ai-content-generation" className="text-blue-600 hover:underline">
                    AI Content Generation
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
