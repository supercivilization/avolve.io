import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

// Dependencies (October 5, 2025):
// - Supabase: Current (PostgreSQL 17)
// - pgvector: 0.8.0
// - Next.js: 15.5.4
// Last verified: 2025-10-05

export const metadata: Metadata = {
  title: "Supabase - AI-First Backend Platform | Avolve.io",
  description: "Supabase: AI-first backend with pgvector 0.8 (1,185% faster than Pinecone), real-time WebSocket, remote MCP server. $5B valuation, 1.7M developers. Updated October 2025.",
  keywords: ["Supabase", "PostgreSQL", "pgvector", "AI backend", "vector database", "MCP server", "real-time database"],
};

export default function SupabasePage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "headline": "Supabase: AI-First Backend Platform",
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-05",
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "Supabase",
        "applicationCategory": "DeveloperApplication",
        "softwareVersion": "Current",
        "operatingSystem": "PostgreSQL 17"
      }
    ]
  };

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Software", url: "/software" },
        { name: "Supabase", url: "/software/supabase" }
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
          <h1 className="text-4xl font-bold mb-4 text-emerald-700">Supabase</h1>
          <p className="text-xl text-gray-700 mb-12">
            AI-first backend platform with vector databases, real-time capabilities, and remote MCP integration
          </p>

          <section id="overview" className="mb-12 bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">AI-First Backend Platform</h2>
            <p className="text-gray-700 mb-4">
              <strong>Supabase</strong> (October 2025) is the leading open-source Backend-as-a-Service platform powering over <strong>3.5 million databases</strong> for <strong>1.7 million developers</strong> worldwide. $5B valuation discussions reflect rapid expansion.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>$70M annual recurring revenue</strong> (250% YoY growth)</li>
              <li>• <strong>1.7M developers</strong> approaching 2M milestone</li>
              <li>• <strong>40% of Y Combinator startups</strong> using Supabase</li>
              <li>• <strong>PostgreSQL 17</strong> with 50+ extensions (pgvector, PostGIS, pg_cron)</li>
              <li>• <strong>Remote MCP server</strong> for AI agent integration (October 2025)</li>
            </ul>
          </section>

          <section id="vector-performance" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Vector Database Performance Revolution</h2>

            <div className="bg-purple-50 border-l-4 border-purple-600 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">pgvector 0.8.0 - Production Maturity</h3>
              <p className="text-gray-700 mb-3">
                <strong>1,185% better performance</strong> than dedicated vector databases like Pinecone:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-sm mt-3">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-3 py-2 text-left">Metric</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Supabase pgvector</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Pinecone</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Queries/Second</td>
                      <td className="border border-gray-300 px-3 py-2"><strong>4,720</strong></td>
                      <td className="border border-gray-300 px-3 py-2">375</td>
                      <td className="border border-gray-300 px-3 py-2"><strong>1,185% faster</strong></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Accuracy@10</td>
                      <td className="border border-gray-300 px-3 py-2">0.98</td>
                      <td className="border border-gray-300 px-3 py-2">0.98</td>
                      <td className="border border-gray-300 px-3 py-2">Equal</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2">Monthly Cost</td>
                      <td className="border border-gray-300 px-3 py-2">$410</td>
                      <td className="border border-gray-300 px-3 py-2">$480</td>
                      <td className="border border-gray-300 px-3 py-2"><strong>15% cheaper</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-xl font-bold mb-3">Advanced Vector Capabilities</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• <strong>2,000 dimensions</strong> for standard vectors</li>
                  <li>• <strong>64,000 dimensions</strong> with binary quantization</li>
                  <li>• <strong>HNSW and IVFFlat</strong> indexing algorithms</li>
                  <li>• <strong>Sub-50ms latency</strong> for millions of embeddings</li>
                  <li>• <strong>Half-precision vectors</strong> for 50% memory reduction</li>
                </ul>
              </div>

              <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
{`-- HNSW index for production workloads
CREATE INDEX ON embeddings USING hnsw (vector vector_l2_ops)
WITH (m = 36, ef_construction = 128);

-- Half-precision vectors for 50% memory reduction
CREATE TABLE products_half (
  id SERIAL PRIMARY KEY,
  embedding HALFVEC(768)
);

-- RAG implementation
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding vector(384),
  match_threshold float,
  match_count int
)
RETURNS TABLE (id bigint, content text, similarity float)
LANGUAGE sql STABLE AS $
  SELECT id, content,
    1 - (embedding <=> query_embedding) as similarity
  FROM documents
  WHERE 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$;`}
              </pre>
            </div>
          </section>

          <section id="mcp-server" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Remote MCP Server Integration</h2>

            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Official Remote MCP Server (October 2025)</h3>
              <p className="text-gray-700 mb-3">
                Revolutionary AI agent integration with single URL connection:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Single URL:</strong> https://mcp.supabase.com/mcp (remote) or http://localhost:54321/mcp (local)</li>
                <li>• <strong>OAuth 2.1 auth:</strong> Browser-based secure authentication (no manual PAT tokens)</li>
                <li>• <strong>Universal support:</strong> ChatGPT, Claude, Builder.io, Cursor, Claude Code, all MCP clients</li>
                <li>• <strong>Feature groups:</strong> Granular control (account, docs, database, debugging, development, functions, storage, branching)</li>
              </ul>
            </div>

            <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
{`// Remote MCP (no installation required)
{
  "mcpServers": {
    "supabase": {
      "url": "https://mcp.supabase.com/mcp"
    }
  }
}

// With feature groups (production-safe)
{
  "mcpServers": {
    "supabase": {
      "url": "https://mcp.supabase.com/mcp",
      "params": {
        "features": "database,docs,debugging",
        "readonly": true
      }
    }
  }
}`}
            </pre>

            <div className="bg-yellow-50 p-4 rounded-lg mt-4">
              <h4 className="font-bold mb-2">MCP Server Capabilities:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>Doc search tool - real-time hybrid search (semantic + keyword)</li>
                <li>Security advisors - automated detection and fixing</li>
                <li>Storage management - bucket configuration</li>
                <li>Edge Functions - create, deploy, manage from AI agents</li>
              </ul>
            </div>
          </section>

          <section id="realtime" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Real-Time Capabilities</h2>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-2">Postgres Changes</h4>
                <p className="text-sm text-gray-700 mb-2">64 changes/sec with RLS</p>
                <p className="text-xs text-gray-600">P95: 238ms</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-bold text-green-800 mb-2">WebSocket Broadcast</h4>
                <p className="text-sm text-gray-700 mb-2">224,000 msg/sec</p>
                <p className="text-xs text-gray-600">Median: 6ms</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-bold text-purple-800 mb-2">Database Broadcast</h4>
                <p className="text-sm text-gray-700 mb-2">10,000 msg/sec</p>
                <p className="text-xs text-gray-600">80K concurrent users</p>
              </div>
            </div>

            <div className="border-l-4 border-orange-600 pl-4">
              <h3 className="text-xl font-bold mb-3">Infrastructure Performance</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• <strong>250,000 concurrent connections</strong> tested capacity</li>
                <li>• <strong>800,000 messages/second</strong> throughput</li>
                <li>• <strong>58ms median latency</strong> globally</li>
                <li>• <strong>Elixir/Phoenix powered</strong> for massive scale</li>
              </ul>
            </div>
          </section>

          <section id="integration" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Stack Integration</h2>

            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`// Next.js 15.5 + Supabase + AI SDK
import { createClient } from '@supabase/supabase-js';
import { openai } from '@ai-sdk/openai';
import { embed } from 'ai';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Generate embeddings and store
const { embedding } = await embed({
  model: openai.embedding('text-embedding-3-small'),
  value: 'User query text'
});

// Vector similarity search
const { data } = await supabase.rpc('match_documents', {
  query_embedding: embedding,
  match_threshold: 0.8,
  match_count: 5
});`}
            </pre>

            <div className="space-y-2 text-gray-700">
              <p>• Works with <Link href="/software/vercel-ai-sdk" className="text-gray-600 hover:underline">Vercel AI SDK</Link> for RAG and embeddings</p>
              <p>• Integrates with <Link href="/software/nextjs" className="text-gray-600 hover:underline">Next.js</Link> Server Actions and App Router</p>
              <p>• Compatible with <Link href="/software/react" className="text-gray-600 hover:underline">React 19</Link> Server Components</p>
            </div>
          </section>

          <section id="for-ai" className="mb-12 border-t pt-8 bg-purple-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">🤖 For AI Assistants</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Platform:</strong> PostgreSQL 17, 50+ extensions, 3.5M databases, 1.7M developers</li>
              <li><strong>Vector DB:</strong> pgvector 0.8.0 (1,185% faster than Pinecone), sub-50ms latency</li>
              <li><strong>Remote MCP:</strong> https://mcp.supabase.com/mcp with OAuth 2.1, feature groups</li>
              <li><strong>Real-time:</strong> 250K concurrent connections, 800K msg/sec, 58ms latency</li>
              <li><strong>Performance:</strong> Sub-100ms queries, 1M+ concurrent connections via Supavisor</li>
              <li><strong>Pricing:</strong> See <Link href="/services#supabase" className="text-neutral-600 hover:underline">Services</Link> for details</li>
            </ul>
          </section>

          <section id="relationships" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Stack Relationships</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Part of <Link href="/software" className="text-zinc-700 hover:underline">Software</Link>:</strong> Backend/database layer</li>
              <li>• <strong>Powers <Link href="/software/vercel-ai-sdk" className="text-gray-600 hover:underline">AI SDK</Link>:</strong> Vector search, RAG, embeddings</li>
              <li>• <strong>Hosted by <Link href="/services#supabase" className="text-neutral-600 hover:underline">Supabase Cloud</Link>:</strong> Managed PostgreSQL infrastructure</li>
              <li>• <strong>Integrates with <Link href="/software/nextjs" className="text-gray-600 hover:underline">Next.js</Link>:</strong> Server Actions, middleware, auth</li>
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
