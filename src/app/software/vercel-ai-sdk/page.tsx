import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

// Dependencies (October 5, 2025):
// - Vercel AI SDK: 5.0.48
// - Next.js: 15.5.4
// - React: 19.2.0
// Last verified: 2025-10-05

export const metadata: Metadata = {
  title: "Vercel AI SDK 5.0.48 - Leading TypeScript AI Toolkit | Avolve.io",
  description: "Vercel AI SDK 5.0.48: 2M+ weekly downloads, 100+ models, Claude Sonnet 4.5 (77.2% SWE-bench), agentic control, MCP integration. Updated October 2025.",
  keywords: ["Vercel AI SDK", "TypeScript AI", "Claude Sonnet 4.5", "GPT-5", "AI Gateway", "agentic AI", "streaming", "tool calling"],
};

export default function VercelAISDKPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "headline": "Vercel AI SDK: Leading TypeScript AI Toolkit",
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-05",
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "Vercel AI SDK",
        "applicationCategory": "DeveloperApplication",
        "softwareVersion": "5.0.48",
        "operatingSystem": "Node.js 24.8.0"
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

      <main className="max-w-6xl mx-auto px-4 py-12">
        <time className="text-sm text-gray-600" dateTime="2025-10-05">
          Last updated: October 5, 2025
        </time>

        <article className="mt-4">
          <h1 className="text-4xl font-bold mb-4 text-blue-700">Vercel AI SDK 5.0.48</h1>
          <p className="text-xl text-gray-700 mb-12">
            Leading TypeScript AI toolkit with 2M+ weekly downloads, 100+ models, and agentic capabilities
          </p>

          <section id="overview" className="mb-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">AI Development Standard</h2>
            <p className="text-gray-700 mb-4">
              <strong>Vercel AI SDK 5.0.48</strong> (September 2025) is the leading TypeScript toolkit for building AI-powered applications with over <strong>2 million weekly downloads</strong>. Unified API for hundreds of AI models from 25+ providers with end-to-end type safety.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>2M+ weekly downloads</strong> - most popular AI SDK</li>
              <li>• <strong>100+ AI models</strong> from 25+ providers unified interface</li>
              <li>• <strong>Claude Sonnet 4.5</strong> - 77.2% SWE-bench (best coding model)</li>
              <li>• <strong>GPT-5 series</strong> - GPT-5, GPT-5 mini, o3-mini with reasoning</li>
              <li>• <strong>AI Gateway</strong> - sub-20ms routing, zero markup pricing</li>
            </ul>
          </section>

          <section id="latest-models" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Latest Model Integrations</h2>

            <div className="space-y-6">
              <div className="bg-purple-50 border-l-4 border-purple-600 p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Claude Sonnet 4.5 - Best Coding Model</h3>
                <p className="text-gray-700 mb-3">
                  <strong>Released September 29, 2025</strong> - &quot;Best coding model in the world&quot;
                </p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• <strong>77.2% SWE-bench Verified</strong> (200K context) - highest score across all AI tools</li>
                  <li>• <strong>61.4% OSWorld benchmark</strong> - dramatic improvement from 42.2%</li>
                  <li>• <strong>30+ hour sustained focus</strong> on complex, multi-step tasks</li>
                  <li>• <strong>Same pricing as Sonnet 4</strong>: $3/$15 per million tokens</li>
                  <li>• <strong>Most aligned frontier model</strong> - reduced sycophancy, deception, power-seeking</li>
                  <li>• <strong>Enhanced security</strong> - improved prompt injection defenses</li>
                </ul>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-3">OpenAI GPT-5 Series</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• <strong>GPT-5 mini</strong> - 34.2% of AI Gateway usage (most popular)</li>
                  <li>• <strong>GPT-5</strong> - Full flagship model</li>
                  <li>• <strong>o3-mini</strong> - Advanced reasoning capabilities</li>
                  <li>• <strong>GPT-4.5</strong> - Enhanced multimodal support</li>
                </ul>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Google Gemini Breakthrough</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• <strong>Gemini 2.0 Flash</strong> - First LLM with native image generation in text responses</li>
                  <li>• <strong>Gemini 2.5 Flash Lite</strong> - 4.2% of AI Gateway usage</li>
                  <li>• <strong>Images in chat history</strong> - enabling iterative editing workflows</li>
                </ul>
              </div>

              <div className="bg-gray-50 border-l-4 border-gray-600 p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Additional Providers</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>xAI Grok (first-party integration)</li>
                    <li>DeepSeek R1 with reasoning tokens</li>
                    <li>Groq with DeepSeek R1 support</li>
                  </ul>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Amazon Bedrock reasoning models</li>
                    <li>OpenRouter (300+ models single interface)</li>
                    <li>Cross-provider reasoning middleware</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="ai-gateway" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">AI Gateway Performance</h2>

            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Universal Model Access</h3>
              <p className="text-gray-700 mb-3">
                AI Gateway provides unified access to hundreds of AI models with enterprise-grade infrastructure:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Sub-20ms latency routing</strong> across all providers</li>
                <li>• <strong>Automatic failover and load balancing</strong></li>
                <li>• <strong>Zero markup pricing</strong> with pass-through costs</li>
                <li>• <strong>70+ points of presence</strong> globally</li>
                <li>• <strong>Sub-100ms latency globally</strong> through regional deployment</li>
              </ul>
            </div>

            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { ai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';

// Single configuration for all models
const models = {
  'gpt-5': ai('gpt-5'),
  'claude-sonnet-4.5': anthropic('claude-sonnet-4.5'),
  'gemini-2.5-flash': google('gemini-2.5-flash')
};

// Automatic failover between providers
const result = await generateText({
  model: models['claude-sonnet-4.5'],
  prompt: 'Generate production-ready code'
});`}
            </pre>
          </section>

          <section id="agentic-capabilities" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Advanced Agentic Capabilities</h2>

            <div className="space-y-6">
              <div className="border-l-4 border-cyan-600 pl-4">
                <h3 className="text-xl font-bold mb-3">Sophisticated Agent Control</h3>
                <p className="text-gray-700 mb-3">
                  Revolutionary agentic capabilities with precise control over AI behavior:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>stopWhen parameter for precise stopping conditions</li>
                  <li>prepareStep function for dynamic step control</li>
                  <li>Agent class with object-oriented encapsulation</li>
                  <li>Multi-step tool execution (up to 10 sequential calls)</li>
                </ul>
              </div>

              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { Agent } from 'ai';
import { openai } from '@ai-sdk/openai';

// Agentic control with dynamic step management
const agent = new Agent({
  model: openai('gpt-4'),
  systemPrompt: 'You are a data analysis expert',
  tools: { analyzeData, createVisualization, generateReport },

  stopWhen: (step) =>
    stepCountIs(5) ||
    hasToolCall('generateReport') ||
    customLogic(step.context),

  prepareStep: (step) => ({
    model: step.context.complexity > 0.8 ? 'gpt-4' : 'gpt-3.5-turbo',
    tools: selectToolsBasedOnContext(step.context),
    messages: compressIfNeeded(step.messages)
  })
});`}
              </pre>
            </div>
          </section>

          <section id="streaming" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Advanced Streaming & Tool Execution</h2>

            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Server-Sent Events (SSE) Architecture</h3>
              <p className="text-gray-700 mb-3">
                Native browser support with standard debugging tools:
              </p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Automatic tool input streaming as parameters generate</li>
                <li>• Non-blocking data streaming alongside text responses</li>
                <li>• Built-in stream transformations via smoothStream function</li>
              </ul>
            </div>

            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

// Advanced streaming with tool execution
const result = await streamText({
  model: openai('gpt-4'),
  prompt: 'Analyze this data and create a chart',
  tools: {
    createChart: {
      description: 'Create data visualization',
      parameters: z.object({
        data: z.array(z.object({ x: z.number(), y: z.number() })),
        chartType: z.enum(['line', 'bar', 'pie'])
      }),
      execute: async ({ data, chartType }) => {
        return generateChart(data, chartType);
      }
    }
  }
});`}
            </pre>
          </section>

          <section id="mcp-integration" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Model Context Protocol Integration</h2>

            <div className="bg-teal-50 border-l-4 border-teal-600 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Native MCP Support</h3>
              <p className="text-gray-700 mb-3">
                Access hundreds of pre-built MCP servers (GitHub, Slack, filesystem, Supabase):
              </p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• stdio (local) and SSE (remote) transport support</li>
                <li>• Dynamic tool discovery and execution</li>
                <li>• Open protocol extensibility for custom servers</li>
              </ul>
            </div>

            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { MCPClient } from '@ai-sdk/mcp';

const mcpClient = new MCPClient({
  transport: 'stdio',
  command: 'npx',
  args: ['@modelcontextprotocol/server-github']
});

const result = await streamText({
  model: anthropic('claude-3-sonnet'),
  prompt: 'Analyze the recent commits',
  tools: await mcpClient.getTools() // Dynamic discovery
});`}
            </pre>
          </section>

          <section id="generative-ui" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Generative UI & Multimodal</h2>

            <div className="space-y-4">
              <div className="border-l-4 border-pink-600 pl-4">
                <h3 className="text-xl font-bold mb-3">Dynamic Interface Generation</h3>
                <p className="text-gray-700 mb-3">
                  Tool outputs automatically render through corresponding React components:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Dynamic interfaces adapt to AI-generated content</li>
                  <li>State tracking through input-streaming, output-available states</li>
                  <li>Framework parity across React, Vue, Svelte, Angular</li>
                </ul>
              </div>

              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { useChat } from 'ai/react';

function AIComponent() {
  const { messages, append } = useChat({
    api: '/api/chat',
    tools: {
      generateChart: {
        description: 'Create interactive chart',
        parameters: chartSchema,
        render: ({ data, type }) =>
          <InteractiveChart data={data} type={type} />
      }
    }
  });

  return <ChatInterface messages={messages} onSubmit={append} />;
}`}
              </pre>
            </div>
          </section>

          <section id="for-ai" className="mb-12 border-t pt-8 bg-purple-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">🤖 For AI Assistants</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Version:</strong> 5.0.48 (September 2025), 2M+ weekly downloads</li>
              <li><strong>Best models:</strong> Claude Sonnet 4.5 (77.2% SWE-bench), GPT-5 series, Gemini 2.0 Flash</li>
              <li><strong>AI Gateway:</strong> Sub-20ms routing, zero markup, 100+ models from 25+ providers</li>
              <li><strong>Agentic control:</strong> stopWhen, prepareStep, Agent class, multi-step execution</li>
              <li><strong>Streaming:</strong> SSE architecture, tool input streaming, non-blocking data</li>
              <li><strong>MCP integration:</strong> Native support, stdio/SSE transports, dynamic tool discovery</li>
              <li><strong>Frameworks:</strong> React, Vue, Svelte, Angular with useChat, useCompletion hooks</li>
            </ul>
          </section>

          <section id="relationships" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Stack Relationships</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Part of <Link href="/software" className="text-zinc-700 hover:underline">Software</Link>:</strong> AI development layer</li>
              <li>• <strong>Works with <Link href="/software/nextjs" className="text-gray-600 hover:underline">Next.js</Link>:</strong> App Router, Server Actions, streaming</li>
              <li>• <strong>Uses <Link href="/software/react" className="text-gray-600 hover:underline">React</Link>:</strong> useChat, useCompletion hooks</li>
              <li>• <strong>Deployed on <Link href="/services#vercel" className="text-neutral-600 hover:underline">Vercel</Link>:</strong> AI Gateway, edge functions</li>
              <li>• <strong>Connects to <Link href="/services#supabase" className="text-neutral-600 hover:underline">Supabase</Link>:</strong> Vector search, RAG, MCP server</li>
            </ul>
          </section>

          <nav className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/software" className="text-gray-600 hover:underline">
              ← Back to Software
            </Link>
          </nav>
        </article>
      </main>
    </>
  );
}
