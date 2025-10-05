import type { Metadata } from "next";
import Link from "next/link";

// Dependencies (October 5, 2025):
// - Next.js: 15.5.4
// - React: 19.2.0
// - TypeScript: 5.9.2
// - Vercel AI SDK: 5.0.48
// Last verified: 2025-10-05

export const metadata: Metadata = {
  title: "Solutions - Working Examples | Avolve.io",
  description: "Complete working solutions with Next.js 15 + React 19.2. AI customer support agent example with code, costs, and timelines.",
};

export default function SolutionsPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "headline": "Solutions: Business Outcomes with Modern Stack",
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-05",
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        }
      },
      {
        "@type": "HowTo",
        "name": "Build AI Customer Support Agent",
        "description": "Complete guide to building an AI-powered customer support system",
        "totalTime": "PT40H",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": "0-25"
        },
        "step": [
          {
            "@type": "HowToStep",
            "name": "Set up Next.js project",
            "text": "Initialize Next.js 15.5.4 with TypeScript and Vercel AI SDK"
          },
          {
            "@type": "HowToStep",
            "name": "Configure AI provider",
            "text": "Connect to Anthropic Claude API with streaming responses"
          },
          {
            "@type": "HowToStep",
            "name": "Build chat interface",
            "text": "Create real-time chat UI with React 19.2 Server Components"
          },
          {
            "@type": "HowToStep",
            "name": "Deploy to production",
            "text": "Deploy to Vercel with edge functions for global performance"
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
          <h1 className="text-4xl font-bold mb-4 text-slate-700">Solutions</h1>
          <p className="text-xl text-gray-700 mb-12">
            Business outcomes delivered to end users
          </p>

          <section id="solutions-definition" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">What are Solutions?</h2>
            <p className="text-gray-700 mb-4">
              Solutions are complete, working applications that solve real business problems.
              They combine <Link href="/systems" className="text-gray-600 hover:underline">Systems</Link> (architecture),
              <Link href="/software" className="text-zinc-700 hover:underline ml-1">Software</Link> (frameworks),
              <Link href="/services" className="text-neutral-600 hover:underline ml-1">Services</Link> (external tools), and
              <Link href="/support" className="text-stone-600 hover:underline ml-1">Support</Link> (maintenance).
            </p>
            <p className="text-gray-700">
              Every solution on this page includes: tech stack with versions, time to build, cost at scale,
              and working code examples.
            </p>
          </section>

          <section id="ai-customer-support" className="mb-16 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Example: AI Customer Support Agent</h2>

            <div className="bg-slate-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Overview</h3>
              <p className="text-gray-700 mb-4">
                AI-powered chat agent that answers customer questions using your documentation,
                previous support tickets, and product knowledge base.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Tech Stack:</strong> Next.js 15.5 + React 19.2 + Vercel AI SDK 5.0 + Claude 3.7 Sonnet</li>
                <li><strong>Time to Build:</strong> 3-5 days (1 developer)</li>
                <li><strong>Time to Deploy:</strong> 1 hour (Vercel)</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Cost at Scale</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">Users/Month</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Hosting (Vercel)</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">AI API (Claude)</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Database (Supabase)</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Total/Month</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">0-1,000</td>
                      <td className="border border-gray-300 px-4 py-2">$0 (Hobby)</td>
                      <td className="border border-gray-300 px-4 py-2">$5-10</td>
                      <td className="border border-gray-300 px-4 py-2">$0 (Free tier)</td>
                      <td className="border border-gray-300 px-4 py-2 font-bold">$5-10</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">1,000-10,000</td>
                      <td className="border border-gray-300 px-4 py-2">$20 (Pro)</td>
                      <td className="border border-gray-300 px-4 py-2">$50-100</td>
                      <td className="border border-gray-300 px-4 py-2">$25 (Pro)</td>
                      <td className="border border-gray-300 px-4 py-2 font-bold">$95-145</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">10,000+</td>
                      <td className="border border-gray-300 px-4 py-2">Custom</td>
                      <td className="border border-gray-300 px-4 py-2">$200-500</td>
                      <td className="border border-gray-300 px-4 py-2">$599+ (Team)</td>
                      <td className="border border-gray-300 px-4 py-2 font-bold">$799-1,099+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Costs verified: October 5, 2025
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Implementation</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// app/api/chat/route.ts
// Dependencies (October 5, 2025):
// - Next.js: 15.5.4
// - Vercel AI SDK: 5.0.48
// - @ai-sdk/anthropic: 2.0.22
// Last verified: 2025-10-05

import { createAnthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

export const runtime = 'edge';

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: anthropic('claude-3-7-sonnet-20250219'),
    messages,
    system: \`You are a helpful customer support agent.
Answer questions based on our knowledge base.
Be concise, friendly, and professional.\`,
  });

  return result.toDataStreamResponse();
}`}
              </pre>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Frontend Component</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// components/chat.tsx
'use client';
import { useChat } from 'ai/react';

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map(m => (
          <div key={m.id} className={\`p-4 rounded-lg \${
            m.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
          } max-w-[80%]\`}>
            <p className="text-sm font-semibold mb-1">
              {m.role === 'user' ? 'You' : 'Support Agent'}
            </p>
            <p>{m.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask a question..."
          className="flex-1 p-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Send
        </button>
      </form>
    </div>
  );
}`}
              </pre>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h3 className="text-lg font-bold mb-2">Production Considerations</h3>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>• Add rate limiting (Vercel Edge Config)</li>
                <li>• Implement authentication (Supabase Auth)</li>
                <li>• Monitor costs (Vercel Analytics + Anthropic dashboard)</li>
                <li>• Cache common responses (Upstash Redis)</li>
                <li>• Log conversations (Supabase database)</li>
              </ul>
            </div>
          </section>

          <section id="relationships" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">How Solutions Relate to Other Layers</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Built with <Link href="/software" className="text-zinc-700 hover:underline">Software</Link>:</strong> Next.js 15.5, React 19.2, TypeScript 5.9</li>
              <li>• <strong>Use <Link href="/services" className="text-neutral-600 hover:underline">Services</Link>:</strong> Vercel, Anthropic Claude, Supabase</li>
              <li>• <strong>Implement <Link href="/systems" className="text-gray-600 hover:underline">Systems</Link>:</strong> Real-time chat, authentication, data storage</li>
              <li>• <strong>Require <Link href="/support" className="text-stone-600 hover:underline">Support</Link>:</strong> Monitoring, debugging, cost optimization</li>
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
