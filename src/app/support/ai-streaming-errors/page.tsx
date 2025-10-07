import type { Metadata } from "next"
import Link from "next/link"
import { QuickFix } from "@/components/support/QuickFix"
import { ErrorDetails } from "@/components/support/ErrorDetails"
import { RootCause } from "@/components/support/RootCause"
import { StepByStepFix } from "@/components/support/StepByStepFix"
import { ProductionImpact } from "@/components/support/ProductionImpact"
import { RelatedErrors } from "@/components/support/RelatedErrors"
import { LastVerified } from "@/components/shared/LastVerified"
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"

export const metadata: Metadata = {
  title: "AI Streaming Errors | Support | Avolve.io",
  description:
    "Fix 'Stream interrupted' and timeout errors with Vercel AI SDK. Handle network issues, rate limits, and token limits gracefully.",
  keywords: "AI streaming error, stream interrupted, Vercel AI SDK, useChat error, streaming timeout",
}

export default function AIStreamingErrorsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Support", url: "/support" },
          { name: "AI Streaming Errors", url: "/support/ai-streaming-errors" },
        ]}
      />

      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
            <Link href="/support" className="hover:underline">
              Support
            </Link>
            <span>/</span>
            <span>AI Streaming Errors</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-amber-900 dark:text-amber-100">
            AI Streaming Errors
          </h1>

          <p className="text-xl text-amber-700 dark:text-amber-300">
            Stream interrupted or timeout errors during AI response streaming. Users see incomplete responses or connection failures.
          </p>

          <LastVerified date="2025-01-15" />
        </div>

        <div className="mb-12">
          <QuickFix
            title="Add error boundary and retry logic"
            problem="AI streaming fails silently, users see incomplete responses"
            solution="Wrap useChat in error boundary, implement exponential backoff retry, show user-friendly error messages"
            newCode={`// Add error handling to useChat hook:
import { useChat } from 'ai/react'
import { useState } from 'react'

export default function ChatComponent() {
  const [error, setError] = useState<string | null>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    onError: (error) => {
      console.error('Chat error:', error)
      setError(error.message || 'Stream interrupted. Please try again.')
    },
    onFinish: () => {
      setError(null) // Clear error on successful completion
    },
  })

  return (
    <div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-2 rounded">
          {error}
        </div>
      )}
      {/* ... rest of chat UI */}
    </div>
  )
}`}
            estimatedTime="10 minutes"
          />
        </div>

        <div className="mb-12">
          <ErrorDetails
            errorName="Stream Interrupted / Stream Timeout"
            errorMessage="TypeError: Failed to fetch / AbortError: The operation was aborted / Stream terminated unexpectedly"
            frequency="occasional"
            timing="During AI response streaming, especially with long outputs"
            location="useChat hook, streaming response handlers"
            severity="high"
            affects={["Vercel AI SDK", "Claude API", "OpenAI API", "All streaming endpoints"]}
          />
        </div>

        <div className="mb-12">
          <RootCause
            title="Common Causes"
            explanation="AI streaming errors occur when the connection between client and AI provider is interrupted. This can happen due to network timeouts, rate limits, token limits being exceeded, or model overload."
            contributingFactors={[
              "Network timeout (client or server)",
              "Rate limit hit (too many requests)",
              "Token limit exceeded (context too long)",
              "Model overload (provider capacity issues)",
              "Vercel serverless timeout (10s Hobby, 60s Pro)",
              "Missing error handling in useChat",
            ]}
          />
        </div>

        <div className="mb-12">
          <StepByStepFix
            steps={[
              {
                step: 1,
                title: "Add error callback to useChat",
                description: "Capture and display streaming errors to users",
                code: `const { messages, error } = useChat({
  onError: (error) => {
    console.error('Chat error:', error)
    // Show user-friendly message
    toast.error('Response interrupted. Retrying...')
  },
})`,
                language: "typescript",
              },
              {
                step: 2,
                title: "Implement timeout handling",
                description: "Set reasonable timeouts for API routes",
                code: `// app/api/chat/route.ts
export const maxDuration = 60 // seconds (Pro tier)

export async function POST(req: Request) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 55000) // 55s safety margin

  try {
    const response = await fetch(AI_API_URL, {
      signal: controller.signal,
      // ... other options
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    if (error.name === 'AbortError') {
      return new Response('Request timeout', { status: 408 })
    }
    throw error
  }
}`,
                language: "typescript",
              },
              {
                step: 3,
                title: "Add retry logic with exponential backoff",
                description: "Automatically retry failed requests",
                code: `async function retryWithBackoff(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      if (i === maxRetries - 1) throw error

      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, i) * 1000
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
}

// Use in API route:
return retryWithBackoff(() => callAIAPI(prompt))`,
                language: "typescript",
              },
              {
                step: 4,
                title: "Show user-friendly error UI",
                description: "Display helpful error messages and retry button",
                code: `{error && (
  <div className="bg-red-50 border border-red-200 p-4 rounded">
    <p className="text-red-800">Stream interrupted: {error.message}</p>
    <button
      onClick={() => handleSubmit()}
      className="mt-2 text-blue-600 hover:underline"
    >
      Retry message
    </button>
  </div>
)}`,
                language: "typescript",
              },
            ]}
            verification="Test by simulating network issues (throttle in DevTools) or exceeding rate limits. Errors should be caught and retried gracefully."
          />
        </div>

        <div className="mb-12">
          <ProductionImpact
            severity="high"
            estimatedFixTime="15-20 minutes"
            impactDescription="Users see incomplete AI responses or blank screens. Poor UX leads to frustration and reduced engagement. No clear feedback about what went wrong."
            userImpact={[
              {
                aspect: "User Experience",
                description: "Incomplete responses, no error messages, appears broken",
              },
              {
                aspect: "Trust",
                description: "Users lose confidence in AI feature reliability",
              },
              {
                aspect: "Support Burden",
                description: "Increased support tickets about 'AI not working'",
              },
            ]}
            monitoring={[
              {
                metric: "Stream Success Rate",
                recommendation: "Track percentage of successful stream completions. Should be >95%.",
              },
              {
                metric: "Error Types",
                recommendation: "Monitor timeout vs rate limit vs network errors. Identify patterns.",
              },
              {
                metric: "Retry Success",
                recommendation: "Track how often retries succeed. If high, increase initial timeout.",
              },
            ]}
            rollback="Implement fallback to non-streaming mode if streaming repeatedly fails for a user"
          />
        </div>

        <div className="mb-12">
          <RelatedErrors
            errors={[
              {
                id: "anthropic-rate-limit",
                title: "Anthropic Rate Limit Errors",
                href: "/services/anthropic",
                description: "429 Too Many Requests from Claude API",
                relationship: "causes",
                frequency: "occasional",
              },
              {
                id: "vercel-timeout",
                title: "Vercel Serverless Timeout",
                href: "/services/vercel",
                description: "Function execution exceeded time limit",
                relationship: "causes",
                frequency: "common",
              },
            ]}
          />
        </div>

        <section className="rounded-lg border border-amber-200 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-900/20">
          <h3 className="mb-4 text-lg font-semibold text-amber-900 dark:text-amber-100">Related Resources</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-medium text-amber-900 dark:text-amber-100">System Patterns</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/systems/ai-streaming-chat" className="text-blue-600 hover:underline">
                    AI Streaming Chat Pattern
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-medium text-amber-900 dark:text-amber-100">Services</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/services/anthropic" className="text-blue-600 hover:underline">
                    Anthropic Claude API
                  </Link>
                </li>
                <li>
                  <Link href="/services/vercel" className="text-blue-600 hover:underline">
                    Vercel Platform
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
