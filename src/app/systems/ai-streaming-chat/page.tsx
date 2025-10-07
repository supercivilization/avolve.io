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
  title: "AI Streaming Chat Pattern | System Integration | Avolve.io",
  description:
    "Production-ready streaming AI chat with Vercel AI SDK and Anthropic. Complete guide with state management, error handling, and performance optimization.",
  keywords: "AI streaming, Vercel AI SDK, Anthropic Claude, useChat hook, real-time AI, streaming responses",
}

export default function AIStreamingChatPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", item: "https://avolve.io" },
          { name: "Systems", item: "https://avolve.io/systems" },
          {
            name: "AI Streaming Chat",
            item: "https://avolve.io/systems/ai-streaming-chat",
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
            <span>AI Streaming Chat</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">AI Streaming Chat</h1>

          <p className="text-xl text-gray-600 dark:text-gray-400">
            Real-time streaming AI responses with state management, error recovery, and optimistic updates using Vercel
            AI SDK.
          </p>

          <LastVerified date="2025-01-15" />
        </div>

        <div className="mb-12">
          <PatternIdentity
            category="Real-time Communication"
            abstractionLevel="high"
            abstractionDescription="High-level SDK handles streaming complexity"
            complements={[
              {
                name: "WebSocket Patterns",
                href: "/systems/websocket-realtime",
                description: "For bidirectional real-time communication",
              },
              {
                name: "Function Calling",
                href: "/systems/ai-function-calling",
                description: "Let AI execute actions during conversation",
              },
            ]}
            tags={["AI", "Streaming", "Real-time", "React Hooks", "TypeScript"]}
          />
        </div>

        <div className="mb-12">
          <QuickDecision
            useWhen={[
              "Building chat interfaces with AI",
              "Need streaming responses for better UX",
              "Want built-in state management",
              "Using Anthropic, OpenAI, or compatible providers",
              "Need error recovery and retry logic",
            ]}
            avoidWhen={[
              "Simple one-off AI requests (use basic fetch)",
              "Streaming not needed (batch processing)",
              "Need WebSocket bidirectional communication",
              "Custom protocol requirements",
            ]}
          />
        </div>

        <div className="mb-12">
          <PatternStructure
            flow={[
              {
                step: "Client Component",
                description: "User types message and submits",
                details: "useChat hook manages messages array and input state",
              },
              {
                step: "Server Action",
                description: "Receive messages and start streaming",
                details: "streamText() initializes connection to AI provider",
              },
              {
                step: "AI SDK",
                description: "Process and stream response chunks",
                details: "Tokens stream from AI provider through SDK",
              },
              {
                step: "Stream to Client",
                description: "Send chunks via Server-Sent Events",
                details: "Client receives chunks and updates UI in real-time",
              },
            ]}
            keyComponents={[
              {
                name: "useChat Hook",
                purpose: "Client-side state management",
                technology: "ai/react",
              },
              {
                name: "streamText",
                purpose: "Server-side streaming",
                technology: "ai",
              },
              {
                name: "AI Provider",
                purpose: "Language model inference",
                technology: "@ai-sdk/anthropic",
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <IntegrationGotchas
            gotchas={[
              {
                issue: "State Synchronization During Errors",
                severity: "high",
                frequency: "common",
                description:
                  "When stream fails mid-response, client shows partial message. User doesn't know if response is complete or failed.",
                solution: [
                  "Use error boundaries around chat components",
                  "Add status indicator showing stream progress",
                  "Store message state in database as it streams",
                  "Implement retry button for failed messages",
                ],
                codeExample: `'use client'
import { useChat } from 'ai/react'

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, error, isLoading } = useChat()

  return (
    <div>
      {messages.map((m) => (
        <div key={m.id} className={m.role === 'user' ? 'user' : 'assistant'}>
          {m.content}
          {error && m.id === messages[messages.length - 1].id && (
            <div className="error">
              Stream failed: {error.message}
              <button onClick={() => handleSubmit()}>Retry</button>
            </div>
          )}
        </div>
      ))}
      {isLoading && <div>AI is typing...</div>}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
      </form>
    </div>
  )
}`,
              },
              {
                issue: "Reconnection Logic",
                severity: "medium",
                frequency: "common",
                description: "Network interruption or timeout causes stream to hang. No automatic retry.",
                solution: [
                  "Add timeout to fetch requests (default is no timeout)",
                  "Implement exponential backoff for retries",
                  "Show network status indicator",
                  "Save draft messages locally",
                ],
                codeExample: `export async function POST(req: Request) {
  const { messages } = await req.json()

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30000) // 30s timeout

  try {
    const result = streamText({
      model: anthropic('claude-3-7-sonnet-20250219'),
      messages,
      abortSignal: controller.signal,
    })

    clearTimeout(timeoutId)
    return result.toDataStreamResponse()
  } catch (error) {
    clearTimeout(timeoutId)
    if (error.name === 'AbortError') {
      return new Response('Request timeout', { status: 408 })
    }
    throw error
  }
}`,
              },
              {
                issue: "Token Counting Accuracy",
                severity: "medium",
                frequency: "common",
                description: "Client-side token estimates don't match actual API usage. Leads to billing surprises.",
                solution: [
                  "Use provider's tokenizer library for accuracy",
                  "Track actual usage from API response headers",
                  "Add buffer (10%) to client estimates",
                  "Log token usage to database for analytics",
                ],
                codeExample: `import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic()

// Get accurate token count
const tokenCount = await anthropic.messages.countTokens({
  model: 'claude-3-7-sonnet-20250219',
  messages: messages,
})

// Track in database
await supabase.from('usage').insert({
  user_id: user.id,
  input_tokens: tokenCount.input_tokens,
  output_tokens: response.usage.output_tokens,
  total_tokens: tokenCount.input_tokens + response.usage.output_tokens,
})`,
              },
            ]}
          />
        </div>

        <div className="mb-12">
          <PatternVariations
            variations={[
              {
                name: "With Function Calling",
                description: "AI can execute actions during conversation",
                useCase: "Chatbots that need to query databases or call APIs",
                implementation: "Add tools parameter to streamText() with Zod schemas",
                tradeoffs: "More powerful but adds complexity and latency",
              },
              {
                name: "With Multi-Modal",
                description: "Support images, audio, and video in chat",
                useCase: "AI assistants processing multiple content types",
                implementation: "Use experimental_useChat with file attachments",
                tradeoffs: "Richer UX but higher token costs and complexity",
              },
              {
                name: "With Conversation Memory",
                description: "Persistent chat history across sessions",
                useCase: "Long-running conversations that span days/weeks",
                implementation: "Load previous messages from DB, summarize old context",
                tradeoffs: "Better context but more tokens and DB queries",
              },
            ]}
          />
        </div>

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">Complete Implementation</h2>

          <div className="space-y-8">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">1. Server Route Handler</h3>
              <InteractiveCodeBlock
                code={`// app/api/chat/route.ts
import { anthropic } from '@ai-sdk/anthropic'
import { streamText } from 'ai'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  const { messages } = await req.json()

  // Verify authentication
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Check usage quota
  const { data: usage } = await supabase
    .from('usage')
    .select('tokens_used, tokens_limit')
    .eq('user_id', user.id)
    .single()

  if (usage && usage.tokens_used >= usage.tokens_limit) {
    return new Response('Quota exceeded', { status: 429 })
  }

  const result = streamText({
    model: anthropic('claude-3-7-sonnet-20250219'),
    messages,
    maxTokens: 1024,
    onFinish: async ({ usage }) => {
      // Track token usage
      await supabase.from('usage').upsert({
        user_id: user.id,
        tokens_used: (usage.promptTokens || 0) + (usage.completionTokens || 0),
      })
    },
  })

  return result.toDataStreamResponse()
}`}
                language="typescript"
              />
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">2. Client Chat Component</h3>
              <InteractiveCodeBlock
                code={`'use client'
import { useChat } from 'ai/react'
import { Send } from 'lucide-react'
import { useEffect, useRef } from 'react'

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
    onError: (error) => {
      console.error('Chat error:', error)
    },
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex h-screen flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={\`mb-4 \${message.role === 'user' ? 'text-right' : 'text-left'}\`}
          >
            <div
              className={\`inline-block rounded-lg px-4 py-2 \${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-900'
              }\`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-left">
            <div className="inline-block rounded-lg bg-gray-200 px-4 py-2">
              <span className="animate-pulse">AI is typing...</span>
            </div>
          </div>
        )}
        {error && (
          <div className="text-center text-red-600">
            Error: {error.message}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="flex-1 rounded-lg border px-4 py-2"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  )
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
              <h4 className="mb-2 font-medium text-gray-900 dark:text-gray-100">Common Errors</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/support/ai-streaming-errors" className="text-blue-600 hover:underline">
                    AI Streaming Errors
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
