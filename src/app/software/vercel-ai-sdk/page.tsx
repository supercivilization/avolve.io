import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { OfficialResources } from "@/components/official-resources";
import { CodeBlock } from "@/components/code-block";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

// Dependencies (October 6, 2025):
// - Vercel AI SDK: 5.0.60
// - Next.js: 15.5.4
// - React: 19.2.0
// Last verified: 2025-10-06

export const metadata: Metadata = {
  title: "Vercel AI SDK 5.0.60 + Modern Stack Integration (Oct 2025) | Avolve.io",
  description: "Vercel AI SDK 5.0.60 with Next.js 15, React 19, streaming, tool calling. Stack integration patterns, verified compatibility, and official resources. Updated Oct 2025.",
  keywords: ["Vercel AI SDK", "AI SDK 5.0", "Next.js AI", "streaming AI", "tool calling", "Claude Sonnet 4.5", "GPT-5", "AI Gateway"],
  alternates: {
    canonical: "https://avolve.io/software/vercel-ai-sdk",
  },
};

export default function VercelAISDKPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "headline": "Vercel AI SDK 5.0.60 + Modern Stack Integration (October 2025)",
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-05",
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        },
        "publisher": {
          "@id": "https://www.supercivilization.xyz/#organization"
        },
        "description": "Vercel AI SDK 5.0.60 integration with Next.js 15, React 19, and modern stack. Verified compatibility patterns.",
        "articleSection": "Stack Integration"
      },
      {
        "@type": "SoftwareApplication",
        "name": "Vercel AI SDK",
        "softwareVersion": "5.0.60",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Node.js 24.8.0",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Vercel AI SDK?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Vercel AI SDK is a TypeScript toolkit for building AI-powered applications with 2M+ weekly downloads. It provides unified access to 100+ AI models from 25+ providers with streaming, tool calling, and agentic capabilities."
            }
          },
          {
            "@type": "Question",
            "name": "What's new in Vercel AI SDK 5.0?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "AI SDK 5.0 introduces advanced agentic control (stopWhen, prepareStep), native MCP integration, AI Gateway with sub-20ms routing, enhanced streaming with tool input streaming, and support for Claude Sonnet 4.5, GPT-5 series, and Gemini 2.0 Flash."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Software", url: "/software" },
        { name: "Vercel AI SDK", url: "/software/vercel-ai-sdk" }
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex justify-between items-start mb-4">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:underline">Home</Link>
            {" / "}
            <Link href="/software" className="hover:underline">Software</Link>
            {" / "}
            <span>Vercel AI SDK</span>
          </nav>
          <ThemeToggle />
        </div>

        <time className="text-sm text-muted-foreground" dateTime="2025-10-05">
          Last updated: October 5, 2025
        </time>

        <article className="mt-4 space-y-8">
          <header className="space-y-4">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold">Vercel AI SDK 5.0</h1>
              <Badge variant="default">v5.0.60</Badge>
              <Badge variant="outline" className="bg-zinc-100 text-zinc-600 border-zinc-300">Stable</Badge>
            </div>
            <p className="text-xl text-muted-foreground">
              TypeScript toolkit for building AI applications with streaming, tool calling, and agentic control. 2M+ weekly downloads, 100+ models unified.
            </p>
          </header>

          {/* Official Resources - Curator Pattern */}
          <OfficialResources
            resources={[
              {
                title: "Vercel AI SDK Documentation",
                url: "https://sdk.vercel.ai/docs",
                type: "docs",
                description: "Complete AI SDK docs, examples, and API reference"
              },
              {
                title: "Vercel AI SDK GitHub",
                url: "https://github.com/vercel/ai",
                type: "github",
                description: "Source code, issues, and AI SDK 5.0 release notes"
              },
              {
                title: "AI SDK 5.0 Announcement",
                url: "https://vercel.com/blog/ai-sdk-5-0",
                type: "docs",
                description: "Official AI SDK 5.0 announcement and migration guide"
              }
            ]}
          />

          {/* Stack Compatibility */}
          <Card>
            <CardHeader>
              <CardTitle>Stack Compatibility (Oct 2025)</CardTitle>
              <CardDescription>Verified versions tested together in production</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dependency</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Next.js</TableCell>
                    <TableCell className="font-mono">15.5.5</TableCell>
                    <TableCell><CheckCircle2 className="h-4 w-4 text-zinc-600 inline" /> Compatible</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">React</TableCell>
                    <TableCell className="font-mono">19.2.0</TableCell>
                    <TableCell><CheckCircle2 className="h-4 w-4 text-zinc-600 inline" /> Compatible</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">TypeScript</TableCell>
                    <TableCell className="font-mono">5.9.2</TableCell>
                    <TableCell><CheckCircle2 className="h-4 w-4 text-zinc-600 inline" /> Compatible</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Node.js</TableCell>
                    <TableCell className="font-mono">24.8.0</TableCell>
                    <TableCell><CheckCircle2 className="h-4 w-4 text-zinc-600 inline" /> Compatible</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Claude Sonnet 4.5</TableCell>
                    <TableCell className="font-mono">77.2% SWE-bench</TableCell>
                    <TableCell><CheckCircle2 className="h-4 w-4 text-zinc-600 inline" /> Best Coding Model</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Getting Started */}
          <section id="getting-started" className="space-y-4">
            <h2 className="text-3xl font-bold">Getting Started</h2>
            <p className="text-muted-foreground">
              Install Vercel AI SDK 5.0.60 and start building AI applications with streaming and tool calling.
            </p>

            <CodeBlock
              code={`# Install AI SDK with OpenAI provider
npm install ai @ai-sdk/openai

# Or with Anthropic (Claude)
npm install ai @ai-sdk/anthropic

# Or with Google (Gemini)
npm install ai @ai-sdk/google`}
              language="bash"
              filename="terminal"
            />

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Multiple Providers Supported</AlertTitle>
              <AlertDescription>
                AI SDK 5.0 supports 100+ models from 25+ providers through a unified API. Install only the providers you need.
              </AlertDescription>
            </Alert>
          </section>

          {/* Integration Patterns */}
          <section id="integration-patterns" className="space-y-4">
            <h2 className="text-3xl font-bold">Integration Patterns</h2>

            <h3 className="text-2xl font-bold">Streaming Chat with Next.js 15</h3>
            <p className="text-muted-foreground">
              Server Actions + React 19 streaming for real-time AI responses.
            </p>

            <CodeBlock
              code={`import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4'),
    messages,
  });

  return result.toDataStreamResponse();
}`}
              language="typescript"
              filename="app/api/chat/route.ts"
              showLineNumbers
            />

            <CodeBlock
              code={`'use client'

import { useChat } from 'ai/react';

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>
          <strong>{m.role}:</strong> {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          Send
        </button>
      </form>
    </div>
  );
}`}
              language="typescript"
              filename="app/components/chat-interface.tsx"
              showLineNumbers
            />

            <h3 className="text-2xl font-bold mt-6">Tool Calling with Validation</h3>
            <p className="text-muted-foreground">
              AI can call TypeScript functions with automatic validation using Zod schemas.
            </p>

            <CodeBlock
              code={`import { openai } from '@ai-sdk/openai';
import { generateText, tool } from 'ai';
import { z } from 'zod';

const result = await generateText({
  model: openai('gpt-4'),
  prompt: 'What is the weather in San Francisco?',
  tools: {
    getWeather: tool({
      description: 'Get the current weather for a location',
      parameters: z.object({
        location: z.string().describe('City name'),
        unit: z.enum(['celsius', 'fahrenheit']).default('celsius'),
      }),
      execute: async ({ location, unit }) => {
        // Call weather API
        const weather = await fetchWeather(location, unit);
        return {
          location,
          temperature: weather.temp,
          conditions: weather.conditions,
        };
      },
    }),
  },
});

console.log(result.text); // "The weather in San Francisco is 18°C and sunny"`}
              language="typescript"
              filename="app/actions.ts"
              showLineNumbers
            />

            <h3 className="text-2xl font-bold mt-6">Agentic Control with stopWhen</h3>
            <p className="text-muted-foreground">
              Precise control over multi-step AI workflows with dynamic stopping conditions.
            </p>

            <CodeBlock
              code={`import { Agent } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

const agent = new Agent({
  model: anthropic('claude-sonnet-4.5'),
  systemPrompt: 'You are a data analysis expert',
  tools: {
    analyzeData: tool({ /* ... */ }),
    createVisualization: tool({ /* ... */ }),
    generateReport: tool({ /* ... */ }),
  },

  // Stop when conditions are met
  stopWhen: (step) =>
    step.stepCount >= 5 ||
    step.hasToolCall('generateReport') ||
    step.context.confidence > 0.95,

  // Dynamic step control
  prepareStep: (step) => ({
    model: step.context.complexity > 0.8
      ? anthropic('claude-sonnet-4.5')
      : anthropic('claude-haiku-3.5'),
    tools: selectToolsBasedOnContext(step.context),
  }),
});

const result = await agent.run({ input: 'Analyze Q3 sales data' });`}
              language="typescript"
              filename="app/agents/data-analyst.ts"
              showLineNumbers
            />
          </section>

          {/* What Breaks in Production */}
          <section id="what-breaks" className="space-y-4">
            <h2 className="text-3xl font-bold">What Breaks in Production</h2>
            <p className="text-muted-foreground">
              Real issues we've encountered with Vercel AI SDK and how to fix them.
            </p>

            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">Streaming breaks with middleware edge runtime</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">
                  <strong>Symptom:</strong> StreamingTextResponse closes immediately in Edge runtime
                </p>
                <p className="text-sm">
                  <strong>Cause:</strong> Edge middleware buffering conflicts with streaming responses
                </p>
                <p className="text-sm">
                  <strong>Fix:</strong> Use Node.js runtime for streaming routes or skip middleware
                </p>
                <CodeBlock
                  code={`// ❌ Wrong - Edge runtime breaks streaming
export const runtime = 'edge'; // Don't use with streaming!

// ✅ Right - Use Node.js runtime for streaming
export const runtime = 'nodejs';

// OR skip middleware for streaming routes
// middleware.ts
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/chat')) {
    return; // Skip middleware for streaming
  }
  // ... other middleware logic
}`}
                  language="typescript"
                />
              </CardContent>
            </Card>

            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">Tool calling rate limits hit unexpectedly</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">
                  <strong>Symptom:</strong> Rate limit errors even with low traffic
                </p>
                <p className="text-sm">
                  <strong>Cause:</strong> Each tool call counts as separate API request, multi-step agents multiply quickly
                </p>
                <p className="text-sm">
                  <strong>Fix:</strong> Use stopWhen to limit steps and implement exponential backoff
                </p>
                <CodeBlock
                  code={`// ✅ Limit agent steps to prevent rate limit hits
const agent = new Agent({
  model: openai('gpt-4'),
  tools: myTools,

  // Prevent runaway tool calling
  stopWhen: (step) =>
    step.stepCount >= 5 || // Max 5 steps
    step.hasToolCall('finalAction') ||
    step.totalTokens > 10000, // Token budget

  // Exponential backoff on rate limits
  onError: async (error, retry) => {
    if (error.status === 429) {
      await new Promise(r => setTimeout(r, Math.pow(2, retry) * 1000));
      return 'retry';
    }
    return 'throw';
  },
});`}
                  language="typescript"
                />
              </CardContent>
            </Card>

            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">Token counting mismatch between providers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">
                  <strong>Symptom:</strong> AI SDK token counts don't match provider billing
                </p>
                <p className="text-sm">
                  <strong>Cause:</strong> Different tokenizers (GPT-4 uses tiktoken, Claude uses own tokenizer)
                </p>
                <p className="text-sm">
                  <strong>Fix:</strong> Use provider-specific token counters and add buffer for safety
                </p>
                <CodeBlock
                  code={`// ✅ Use provider-specific token counting
import { encoding_for_model } from '@anthropic-ai/tokenizer';

// For Claude
const claudeTokens = encoding_for_model('claude-3-sonnet').encode(text).length;

// For OpenAI
import { encode } from 'gpt-tokenizer';
const openaiTokens = encode(text).length;

// Always add 10% buffer for safety
const maxTokens = Math.floor(providerLimit * 0.9);`}
                  language="typescript"
                />
              </CardContent>
            </Card>
          </section>

          {/* Bottom Navigation */}
          <div className="flex justify-between pt-8 border-t">
            <Link href="/software" className="text-sm text-muted-foreground hover:underline">
              ← Back to Software
            </Link>
            <div className="space-x-4">
              <Link href="/software/nextjs" className="text-sm text-muted-foreground hover:underline">
                Next.js →
              </Link>
              <Link href="/software/react" className="text-sm text-muted-foreground hover:underline">
                React →
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
