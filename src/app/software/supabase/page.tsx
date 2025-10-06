import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

// Dependencies (October 5, 2025):
// - Supabase: PostgreSQL 17, pgvector 0.8.0
// - Next.js: 15.5.4
// - React: 19.2.0
// Last verified: 2025-10-05

export const metadata: Metadata = {
  title: "Supabase - PostgreSQL 17 Backend-as-a-Service with AI Vector Search | Avolve.io",
  description: "Supabase with PostgreSQL 17, pgvector 0.8.0, and Next.js 15 integration. Complete auth, RLS, real-time, and AI-powered vector search. October 2025.",
  keywords: ["Supabase", "PostgreSQL 17", "pgvector", "Row Level Security", "Next.js auth", "vector database", "BaaS", "Supabase 2025"],
  alternates: {
    canonical: "https://avolve.io/software/supabase",
  },
};

export default function SupabasePage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "headline": "Supabase: Open-Source Backend-as-a-Service with PostgreSQL 17 and AI Vector Search",
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-05",
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        },
        "description": "Comprehensive analysis of Supabase's PostgreSQL 17 backend, authentication system, Row Level Security, and pgvector 0.8.0 AI capabilities"
      },
      {
        "@type": "SoftwareApplication",
        "name": "Supabase",
        "applicationCategory": "DeveloperApplication",
        "softwareVersion": "PostgreSQL 17",
        "operatingSystem": "PostgreSQL 17",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
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
            Open-source Backend-as-a-Service built on PostgreSQL 17 with authentication, Row Level Security, real-time subscriptions, and pgvector 0.8.0 AI search
          </p>

          {/* Core Identity Section */}
          <section id="overview" className="mb-12 bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">What It Is</h2>
            <p className="text-gray-700 mb-4">
              <strong>Supabase</strong> is an open-source Firebase alternative built on <strong>PostgreSQL 17</strong>, providing authentication, database, storage, real-time subscriptions, and AI-powered vector search. Used by <strong>1.7M developers</strong> and <strong>40% of Y Combinator startups</strong> with <strong>$70M ARR</strong>.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Market Position</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• <strong>1.7M developers</strong> on platform</li>
                  <li>• <strong>40% of YC startups</strong> use Supabase</li>
                  <li>• <strong>$70M ARR</strong> (annual recurring revenue)</li>
                  <li>• <strong>72K+ GitHub stars</strong></li>
                  <li>• <strong>$116M Series B</strong> funding</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-800 mb-2">Core Capabilities</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• PostgreSQL 17 with pgvector 0.8.0</li>
                  <li>• Authentication (email, OAuth, magic links)</li>
                  <li>• Row Level Security (RLS)</li>
                  <li>• Real-time subscriptions (websockets)</li>
                  <li>• Storage with CDN integration</li>
                  <li>• Edge Functions (Deno runtime)</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 bg-blue-50 p-4 rounded border-l-4 border-blue-600">
              <h3 className="font-bold mb-2">Official Documentation</h3>
              <p className="text-sm text-gray-700 mb-2">
                For API reference and guides, visit:
              </p>
              <ul className="space-y-1 text-sm">
                <li>→ <a href="https://supabase.com/docs" className="text-blue-600 hover:underline">supabase.com/docs</a> - Complete documentation</li>
                <li>→ <a href="https://github.com/supabase/supabase" className="text-blue-600 hover:underline">GitHub Repository</a> - Source code and issues</li>
                <li>→ <a href="https://supabase.com/docs/guides/getting-started/quickstarts/nextjs" className="text-blue-600 hover:underline">Next.js Integration Guide</a> - Official Next.js setup</li>
              </ul>
            </div>
          </section>

          {/* Why It Matters Section */}
          <section id="why-matters" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Why It Matters</h2>

            <div className="space-y-6">
              <div className="border-l-4 border-emerald-600 pl-4">
                <h3 className="text-xl font-bold mb-3 text-emerald-800">Production-Grade PostgreSQL Without DevOps</h3>
                <p className="text-gray-700 mb-3">
                  Supabase eliminates database operations complexity while providing full PostgreSQL 17 access. Unlike Firebase's NoSQL limitations, you get SQL joins, transactions, triggers, and extensions—without managing servers, backups, or scaling infrastructure.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">What Supabase Manages For You:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-bold text-sm mb-2">Infrastructure:</h5>
                      <ul className="space-y-1 text-xs text-gray-700">
                        <li>• Automatic backups (point-in-time recovery)</li>
                        <li>• Connection pooling (PgBouncer)</li>
                        <li>• Read replicas for scaling</li>
                        <li>• SSL certificates and encryption</li>
                        <li>• DDoS protection and rate limiting</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold text-sm mb-2">Developer Experience:</h5>
                      <ul className="space-y-1 text-xs text-gray-700">
                        <li>• Auto-generated REST APIs</li>
                        <li>• Type-safe client libraries</li>
                        <li>• Real-time webhooks</li>
                        <li>• Built-in authentication</li>
                        <li>• Database migrations UI</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-xl font-bold mb-3 text-blue-800">Row Level Security for Zero-Trust Architecture</h3>
                <p className="text-gray-700 mb-3">
                  PostgreSQL's Row Level Security (RLS) enforces data access at the database layer, not application code. This architectural pattern eliminates entire classes of security vulnerabilities by making authorization impossible to bypass—even with direct database access or compromised API keys.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-800 mb-2">❌ Without RLS (Application-Layer Auth)</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">{`// Security bug: Anyone can access any user's data
app.get('/documents', async (req, res) => {
  // Forgot to filter by user ID!
  const docs = await db.query('SELECT * FROM documents');
  res.json(docs);
});

// Direct database access bypasses auth
const allDocs = await supabase
  .from('documents')
  .select('*'); // Returns ALL documents!`}</pre>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">✅ With RLS (Database-Layer Auth)</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">{`-- RLS policy enforced at database level
CREATE POLICY "Users see only their documents"
ON documents FOR SELECT
USING (auth.uid() = user_id);

-- Same query now auto-filtered by RLS
const { data } = await supabase
  .from('documents')
  .select('*'); // Only returns user's documents

// Even direct SQL respects RLS
-- Automatically filtered by user`}</pre>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-purple-600 pl-4">
                <h3 className="text-xl font-bold mb-3 text-purple-800">AI-Native Vector Search with pgvector 0.8.0</h3>
                <p className="text-gray-700 mb-3">
                  pgvector 0.8.0 brings production-grade AI capabilities directly into PostgreSQL with HNSW (Hierarchical Navigable Small World) indexing. This enables semantic search, RAG (Retrieval Augmented Generation), and AI features without external vector databases—reducing infrastructure complexity and cost.
                </p>
                <div className="space-y-3">
                  <div className="bg-purple-50 p-3 rounded">
                    <h5 className="font-bold text-sm mb-2">Performance Characteristics:</h5>
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li>• <strong>HNSW indexing:</strong> Sub-10ms queries on millions of vectors</li>
                      <li>• <strong>Cosine similarity:</strong> Optimized for OpenAI/Anthropic embeddings</li>
                      <li>• <strong>1536 dimensions:</strong> Native support for text-embedding-3-small</li>
                      <li>• <strong>RLS integration:</strong> Vector search respects user permissions</li>
                      <li>• <strong>Hybrid search:</strong> Combine SQL filters with semantic similarity</li>
                    </ul>
                  </div>
                  <div className="bg-cyan-50 p-3 rounded">
                    <h5 className="font-bold text-sm mb-2">Real-World Use Case (RAG Implementation):</h5>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">{`// 1. Store document with embedding
const { embedding } = await embed({
  model: openai.embedding('text-embedding-3-small'),
  value: document.content
});

await supabase.from('documents').insert({
  content: document.content,
  embedding,
  user_id: user.id
});

// 2. Semantic search with RLS (only user's documents)
const { data } = await supabase.rpc('match_documents', {
  query_embedding: queryEmbedding,
  match_threshold: 0.8,
  match_count: 5
});
// Returns top 5 similar documents, auto-filtered by RLS`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Architecture Section */}
          <section id="architecture" className="mb-12 border-t pt-8 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Technical Architecture</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">Authentication System</h3>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <h4 className="font-bold mb-2">@supabase/ssr for Next.js 15:</h4>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">{`// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component - cookies can't be modified
          }
        },
      },
    }
  )
}`}</pre>
                  <h4 className="font-bold mt-3 mb-2">Middleware for Session Refresh:</h4>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">{`// middleware.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const supabase = await createClient()

  // Automatically refreshes session if expired
  const { data: { user } } = await supabase.auth.getUser()

  if (!user && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*']
}`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Row Level Security Patterns</h3>
                <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-600">
                  <h4 className="font-bold mb-2">Complete RLS Setup:</h4>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">{`-- Enable RLS on table
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own documents
CREATE POLICY "Users can view own documents"
ON documents FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Users can insert their own documents
CREATE POLICY "Users can insert own documents"
ON documents FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own documents
CREATE POLICY "Users can update own documents"
ON documents FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own documents
CREATE POLICY "Users can delete own documents"
ON documents FOR DELETE
USING (auth.uid() = user_id);`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">pgvector 0.8.0 Setup</h3>
                <div className="bg-purple-50 p-4 rounded border-l-4 border-purple-600">
                  <h4 className="font-bold mb-2">Database Schema with HNSW Index:</h4>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">{`-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create table with vector column
CREATE TABLE documents (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  content TEXT NOT NULL,
  embedding VECTOR(1536), -- OpenAI text-embedding-3-small
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create HNSW index for fast similarity search
CREATE INDEX ON documents
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- Semantic search function
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding VECTOR(1536),
  match_threshold FLOAT,
  match_count INT
)
RETURNS TABLE (
  id BIGINT,
  content TEXT,
  similarity FLOAT
)
LANGUAGE SQL STABLE
AS $$
  SELECT
    id,
    content,
    1 - (embedding <=> query_embedding) AS similarity
  FROM documents
  WHERE 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;`}</pre>
                </div>
              </div>
            </div>
          </section>

          {/* Real-World Implementation Section */}
          <section id="implementation" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Real-World Implementation</h2>

            <div className="space-y-6">
              <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-600">
                <h3 className="text-lg font-bold mb-3">Complete Authentication Flow</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-sm mb-2">1. Server Actions for Auth:</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">{`// app/actions/auth.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return { error: error.message }
  }

  redirect('/dashboard')
}

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  redirect('/dashboard')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}`}</pre>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm mb-2">2. AI-Powered Semantic Search:</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">{`// app/actions/search.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { openai } from '@ai-sdk/openai'
import { embed } from 'ai'

export async function searchDocuments(query: string) {
  const supabase = await createClient()

  // Generate embedding for query
  const { embedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: query,
  })

  // Search using vector similarity (RLS auto-filters by user)
  const { data, error } = await supabase.rpc('match_documents', {
    query_embedding: embedding,
    match_threshold: 0.8,
    match_count: 5,
  })

  if (error) throw error

  return data
}`}</pre>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-600">
                <h3 className="text-lg font-bold mb-3">Production Issues and Fixes</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-sm mb-2">Issue #1: Auth Session Not Refreshing</h4>
                    <p className="text-xs text-gray-700 mb-2">
                      <strong>Symptom:</strong> Users randomly logged out, auth.getUser() returns null
                    </p>
                    <p className="text-xs text-gray-700 mb-2">
                      <strong>Cause:</strong> Not using @supabase/ssr or missing session refresh in middleware
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">{`// ❌ Wrong - old package
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

// ✅ Right - use @supabase/ssr
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  const supabase = await createClient()

  // This automatically refreshes the session
  const { data: { user } } = await supabase.auth.getUser()
}`}</pre>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm mb-2">Issue #2: RLS Policy Blocks Own Queries</h4>
                    <p className="text-xs text-gray-700 mb-2">
                      <strong>Symptom:</strong> Queries return empty even though data exists
                    </p>
                    <p className="text-xs text-gray-700 mb-2">
                      <strong>Cause:</strong> RLS enabled but no SELECT policy, or auth.uid() is null
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">{`-- ❌ Wrong - RLS enabled but no policies
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
-- No policies = no access for anyone!

-- ✅ Right - Add policies immediately
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own documents"
ON documents FOR SELECT
USING (auth.uid() = user_id);

-- Debug: Check auth status
SELECT auth.uid(); -- Should return UUID, not NULL`}</pre>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm mb-2">Issue #3: Vector Search Extremely Slow</h4>
                    <p className="text-xs text-gray-700 mb-2">
                      <strong>Symptom:</strong> Queries take 5-10 seconds with only 10K rows
                    </p>
                    <p className="text-xs text-gray-700 mb-2">
                      <strong>Cause:</strong> Missing HNSW index or using wrong distance operator
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">{`-- ❌ Wrong - No index
SELECT * FROM documents
ORDER BY embedding <-> query_embedding -- Wrong operator!
LIMIT 5;

-- ✅ Right - HNSW index with correct operator
CREATE INDEX ON documents
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

SELECT * FROM documents
ORDER BY embedding <=> query_embedding -- Correct for cosine
LIMIT 5;

-- Distance operators:
-- <-> : L2 distance (Euclidean)
-- <=> : Cosine distance (most common)
-- <#> : Inner product`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Decision Framework Section */}
          <section id="decisions" className="mb-12 border-t pt-8 bg-yellow-50 p-6 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Decision Framework</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-green-700">✅ Choose Supabase When:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>PostgreSQL + Auth needed:</strong> Get both in one platform without DevOps</li>
                  <li>• <strong>Row Level Security required:</strong> Database-enforced access control for compliance</li>
                  <li>• <strong>AI/RAG applications:</strong> Native pgvector 0.8.0 with HNSW indexing</li>
                  <li>• <strong>Real-time features:</strong> Built-in websocket subscriptions for collaborative apps</li>
                  <li>• <strong>Startup/MVP speed:</strong> Free tier supports 50K monthly active users</li>
                  <li>• <strong>Open-source requirement:</strong> Self-hostable alternative to Firebase</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-red-700">❌ Consider Alternatives When:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Multi-cloud requirement:</strong> Supabase primarily AWS-based (GCP/Azure limited)</li>
                  <li>• <strong>NoSQL preference:</strong> Firebase Firestore may be simpler for document-heavy apps</li>
                  <li>• <strong>Extreme scale (1B+ rows):</strong> Custom PostgreSQL setup offers more control</li>
                  <li>• <strong>Existing auth system:</strong> Integration may be complex vs starting fresh</li>
                  <li>• <strong>Zero vendor lock-in:</strong> Fully self-hosted PostgreSQL + custom auth may be better</li>
                </ul>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-xl font-bold mb-3">Migration Strategy</h3>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <h4 className="font-bold mb-2">Incremental Adoption Path:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    <li><strong>Start with database:</strong> Create Supabase project, migrate schema</li>
                    <li><strong>Add authentication:</strong> Implement @supabase/ssr with Next.js middleware</li>
                    <li><strong>Enable RLS:</strong> Add Row Level Security policies progressively per table</li>
                    <li><strong>Integrate AI search:</strong> Add pgvector extension and HNSW indexes</li>
                    <li><strong>Production deployment:</strong> Start on Pro tier ($25/mo) for staging/production split</li>
                  </ol>
                  <div className="mt-3 bg-blue-50 p-3 rounded">
                    <h5 className="font-bold text-sm mb-2">Pricing Tiers (October 2025):</h5>
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li>• <strong>Free:</strong> 500MB database, 50K monthly active users, 2GB bandwidth</li>
                      <li>• <strong>Pro ($25/mo):</strong> 8GB database, 100K MAU, 50GB bandwidth, daily backups</li>
                      <li>• <strong>Team ($599/mo):</strong> 100GB database, 500K MAU, 250GB bandwidth, SOC2</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* AI Assistant Reference Section */}
          <section id="for-ai" className="mb-12 border-t pt-8 bg-purple-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">🤖 For AI Assistants</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold mb-2">Core Facts:</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• <strong>Database:</strong> PostgreSQL 17, pgvector 0.8.0</li>
                  <li>• <strong>Auth Package:</strong> @supabase/ssr (for Next.js)</li>
                  <li>• <strong>RLS:</strong> Database-enforced access control</li>
                  <li>• <strong>Vector Search:</strong> HNSW indexing, cosine similarity</li>
                  <li>• <strong>Adoption:</strong> 1.7M developers, 40% YC startups</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">Code Generation:</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Use <code className="bg-gray-200 px-1 rounded">@supabase/ssr</code> not auth-helpers</li>
                  <li>• Always enable RLS: <code className="bg-gray-200 px-1 rounded">ALTER TABLE ... ENABLE ROW LEVEL SECURITY</code></li>
                  <li>• Vector search: <code className="bg-gray-200 px-1 rounded">embedding {'<=>'}  query_embedding</code></li>
                  <li>• Create HNSW index for production vector search</li>
                  <li>• Use Server Actions for auth mutations</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 bg-white p-3 rounded border border-purple-200">
              <h4 className="font-bold text-sm mb-2">Quick Reference Template:</h4>
              <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs overflow-x-auto">{`// Supabase + Next.js 15 + pgvector pattern
import { createClient } from '@/lib/supabase/server'
import { embed } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function searchAction(query: string) {
  const supabase = await createClient()

  const { embedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: query
  })

  const { data } = await supabase.rpc('match_documents', {
    query_embedding: embedding,
    match_threshold: 0.8,
    match_count: 5
  })

  return data // RLS auto-filters by user
}`}</pre>
            </div>
          </section>

          {/* Stack Relationships Section */}
          <section id="relationships" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Stack Relationships</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-2 text-gray-800">Integrates With:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <Link href="/software/nextjs" className="text-blue-600 hover:underline">Next.js 15.5</Link> - Server-side auth with @supabase/ssr</li>
                  <li>• <Link href="/software/vercel-ai-sdk" className="text-blue-600 hover:underline">Vercel AI SDK</Link> - Vector embeddings for RAG</li>
                  <li>• <Link href="/software/react" className="text-blue-600 hover:underline">React 19</Link> - Real-time subscriptions in components</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-gray-800">Built On:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• PostgreSQL 17 (database engine)</li>
                  <li>• pgvector 0.8.0 (vector extension)</li>
                  <li>• GoTrue (auth service)</li>
                  <li>• PostgREST (auto-generated API)</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Part of <Link href="/software" className="text-blue-600 hover:underline">Avolve Software Stack</Link> -
                Backend-as-a-Service for Next.js + React + AI applications
              </p>
            </div>
          </section>

          <nav className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/software" className="text-blue-600 hover:underline">
              ← Back to Software
            </Link>
          </nav>
        </article>
      </main>
    </>
  );
}
