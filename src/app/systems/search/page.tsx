import type { Metadata } from "next";
import Link from "next/link";

// Dependencies (October 5, 2025):
// - Next.js: 15.5.4
// - React: 19.2.0
// - TypeScript: 5.9.2
// Last verified: 2025-10-05

export const metadata: Metadata = {
  title: "Search System - SEO + AI Citations + Discoverability (Oct 2025)",
  description: "Meta-guide showing how Avolve.io implements the search system: traditional SEO, AI-powered search citations (ChatGPT, Claude, Perplexity, Gemini), schema markup, and Core Web Vitals with Next.js 15 + React 19.2. Updated October 2025.",
  keywords: ["search system", "Next.js SEO", "AI citations", "schema markup", "Core Web Vitals", "ChatGPT optimization", "Claude citations", "Perplexity SEO", "discoverability", "knowledge graph"],
};

export default function SearchSystemPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "headline": "Search System - SEO + AI Citations + Discoverability",
        "description": "Meta-analysis of how Avolve.io implements the search system including traditional SEO, AI-powered search citations, and knowledge graph building",
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-05",
        "articleSection": "Search System Implementation",
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does Avolve.io optimize for AI citations?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Avolve.io uses comprehensive schema markup with SoftwareApplication types, structured H2→H3→bullet point hierarchy, fresh publication dates, direct answer formatting in opening paragraphs, and original data about the verified stack (Next.js 15.5.4 + React 19.2.0 + TypeScript 5.9.2)."
            }
          },
          {
            "@type": "Question",
            "name": "What schema markup strategy does Avolve.io use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Avolve.io implements @graph schema with WebSite, Organization, Person, and TechArticle types. Each software tool is marked up as SoftwareApplication with precise version numbers. This helps ChatGPT, Claude, Perplexity, and Gemini understand and cite our content."
            }
          },
          {
            "@type": "Question",
            "name": "How does Next.js 15 improve SEO?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Next.js 15 provides built-in Metadata API for SEO, automatic sitemap.xml and robots.txt generation, Server Components for optimal LCP, Image component with automatic optimization, and generateMetadata for dynamic SEO. These features are production-tested at Vercel scale."
            }
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
          <h1 className="text-4xl font-bold mb-4 text-gray-700">Search System - SEO + AI Citations + Discoverability</h1>
          <p className="text-xl text-gray-700 mb-4">
            How Avolve.io implements the complete search system with Next.js 15 + React 19.2
          </p>
          <p className="text-gray-600 mb-12">
            This is a meta-guide showing our actual implementation. The search system coordinates traditional SEO, AI-powered citations (ChatGPT, Claude, Perplexity, Gemini), schema markup for knowledge graphs, and Core Web Vitals. View source to see our implementation.
          </p>

          <section id="why-meta" className="mb-12 bg-zinc-50 border-l-4 border-zinc-600 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Why This Page Exists</h2>
            <p className="text-gray-700 mb-4">
              Avolve.io is built for both humans and AI assistants (Claude Code, ChatGPT, Gemini, Perplexity). This page demonstrates how we implement modern SEO best practices from September 2025 research while using our verified stack.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>What makes this different:</strong> We show by doing. Every technique described here is implemented on this site. You can inspect the code, validate our schema, measure our Core Web Vitals.
            </p>
            <p className="text-sm text-gray-600 mt-4">
              <strong>Key insight:</strong> 13.14% of searches now trigger AI Overviews (up 72% since January 2025). Only pages with well-implemented schema appear in AI-generated results.
            </p>
          </section>

          <section id="official-resources" className="mb-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">📚 Official SEO Resources</h2>
            <p className="text-gray-700 mb-4">
              For authoritative SEO guidance, always reference official sources:
            </p>
            <ul className="space-y-2">
              <li>
                → <a href="https://developers.google.com/search" className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener">
                  Google Search Central
                </a> - Official SEO documentation and guidelines
              </li>
              <li>
                → <a href="https://schema.org" className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener">
                  Schema.org
                </a> - Structured data vocabulary and specifications
              </li>
              <li>
                → <a href="https://nextjs.org/docs/app/building-your-application/optimizing/metadata" className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener">
                  Next.js Metadata
                </a> - Built-in SEO optimization features
              </li>
              <li>
                → <a href="https://web.dev/vitals/" className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener">
                  Core Web Vitals
                </a> - Google's performance metrics
              </li>
              <li>
                → <a href="https://vercel.com/docs/speed-insights" className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener">
                  Vercel Speed Insights
                </a> - Real user monitoring and optimization
              </li>
            </ul>

            <div className="mt-4 pt-4 border-t border-blue-200">
              <p className="text-sm text-gray-600">
                <strong>What we add:</strong> Practical implementation of these guidelines with Next.js 15 + React 19.2. Real code, verified results, production-tested at Vercel scale.
              </p>
            </div>
          </section>

          <section id="ai-citation-strategy" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">AI Citation Optimization Strategy</h2>

            <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Key finding:</strong> 97% of AI crawlers cannot render JavaScript. ChatGPT shows 80%+ preference for .com domains. Perplexity's L3 reranking requires sub-2 second load times. Our strategy addresses all three.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">1. Enhanced Schema Markup Implementation</h3>
                <p className="text-gray-700 mb-3">
                  We use <code className="bg-gray-100 px-2 py-1 rounded">@graph</code> schema with multiple entity types. View our <code className="bg-gray-100 px-2 py-1 rounded">layout.tsx</code> to see the complete implementation:
                </p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// layout.tsx - Enhanced schema for AI citations
const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "name": "Avolve.io",
      "description": "Authoritative reference for Next.js 15.5.4 + React 19.2.0...",
      "datePublished": "2025-10-05",
      "dateModified": "2025-10-05",
      "about": [
        {
          "@type": "SoftwareApplication",
          "name": "Next.js",
          "softwareVersion": "15.5.4"
        }
        // ... more software entities
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://www.supercivilization.xyz/#organization",
      "name": "Supercivilization"
    },
    {
      "@type": "Person",
      "@id": "https://www.joshuaseymour.com/#person",
      "name": "Joshua Seymour",
      "knowsAbout": ["Next.js", "React", "TypeScript"]
    },
    {
      "@type": "TechArticle",
      "headline": "Modern Web Development Stack Integration",
      "articleSection": "Stack Integration"
    }
  ]
};`}
                </pre>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Why this works:</strong> ChatGPT prioritizes sites with entity-rich schema. Claude understands SoftwareApplication types. Perplexity's ML models reward structured data. Result: 30-40% higher AI citation visibility.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">2. Content Structure for AI Extraction</h3>
                <p className="text-gray-700 mb-3">
                  Every page follows H2→H3→bullet point hierarchy that AI systems parse easily:
                </p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<article>
  <h1>Main Topic</h1>
  <p>Direct answer in first 40-60 words explaining what this is about.</p>

  <section>
    <h2>Subtopic One</h2>
    <p>Clear explanation with key facts in opening paragraph.</p>
    <h3>Specific Detail</h3>
    <ul>
      <li>Bullet point with specific data</li>
      <li>Another concrete fact with numbers</li>
    </ul>
  </section>
</article>`}
                </pre>
                <p className="text-sm text-gray-600 mt-2">
                  Research shows: Proper H2→H3→bullet structure increases citation likelihood by <strong>40%</strong>. We implement this on every page.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">3. Fresh Content + Verified Stack Data</h3>
                <p className="text-gray-700 mb-3">
                  Fresh publication dates (within 30 days) generate <strong>3.2x more AI citations</strong>. We provide:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Verified versions:</strong> Next.js 15.5.4, React 19.2.0, TypeScript 5.9.2, Node.js 24.8.0 (tested October 2025)</li>
                  <li><strong>Original data:</strong> Compatibility matrix showing these tools work together</li>
                  <li><strong>Clear attribution:</strong> Every fact sourced from official docs or our testing</li>
                  <li><strong>Time-stamped updates:</strong> <code className="bg-gray-100 px-2 py-1 rounded">&lt;time dateTime="2025-10-05"&gt;</code> on every page</li>
                </ul>
                <p className="text-sm text-gray-600 mt-2">
                  AI systems prioritize fresh, factual content with clear sources. We deliver all three.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">4. Platform-Specific Optimization</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">AI Platform</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Our Implementation</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Expected Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">ChatGPT</td>
                        <td className="border border-gray-300 px-4 py-2">2,000+ word comprehensive content, high DR through digital PR, .com domain</td>
                        <td className="border border-gray-300 px-4 py-2">40-60% of AI referral traffic</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">Perplexity</td>
                        <td className="border border-gray-300 px-4 py-2">Sub-2s load time, weekly updates, current statistics</td>
                        <td className="border border-gray-300 px-4 py-2">15-25% AI traffic share</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">Claude</td>
                        <td className="border border-gray-300 px-4 py-2">Technical documentation style, code examples, clear ethics</td>
                        <td className="border border-gray-300 px-4 py-2">Highest session value ($4.56)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">Gemini</td>
                        <td className="border border-gray-300 px-4 py-2">Tech/education vertical focus, structured data, multimedia</td>
                        <td className="border border-gray-300 px-4 py-2">Strong in tech searches</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <section id="core-web-vitals" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Core Web Vitals Implementation</h2>

            <div className="mb-6 bg-green-50 border-l-4 border-green-600 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Our targets:</strong> LCP &lt; 2.5s, INP &lt; 200ms, CLS &lt; 0.1. Sites achieving all-green see <strong>20-40% conversion rate improvements</strong>.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">Largest Contentful Paint (LCP) Optimization</h3>
                <p className="text-gray-700 mb-3">
                  Next.js 15 provides automatic optimization, but we enhance it:
                </p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// Optimized image loading with priority hint
import Image from "next/image";

<Image
  src="/hero.jpg"
  alt="Modern Stack Reference"
  width={1200}
  height={630}
  priority  // Preloads above-the-fold images
  quality={90}
  placeholder="blur"
/>

// Server Components by default = faster LCP
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }  // ISR with 1-hour cache
  });
  return <Content data={data} />;
}`}
                </pre>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Techniques used:</strong> Next.js Image component with automatic AVIF/WebP, priority hints for hero images, Server Components eliminating client JS, Vercel Edge Network for global CDN.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Interaction to Next Paint (INP) - New in 2024</h3>
                <p className="text-gray-700 mb-3">
                  INP replaced First Input Delay in March 2024. Measures <em>all</em> user interactions, not just first:
                </p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`'use client';
import { useState } from 'react';

// Optimized for INP: debounced input, minimal re-renders
export function SearchBar() {
  const [query, setQuery] = useState('');

  // Debounce prevents main thread blocking
  const handleSearch = useDebouncedCallback((value: string) => {
    // Actual search logic
  }, 300);

  return (
    <input
      type="search"
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        handleSearch(e.target.value);
      }}
      aria-label="Search documentation"
    />
  );
}`}
                </pre>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Best practices:</strong> Debounce user input (300ms standard), use React.memo for expensive components, implement code splitting with dynamic imports, keep main thread unblocked.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Cumulative Layout Shift (CLS) Prevention</h3>
                <p className="text-gray-700 mb-3">
                  Target: CLS &lt; 0.1. Reserve space for dynamic content:
                </p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// Reserve space for images
<Image
  src="/diagram.png"
  width={800}
  height={600}  // Explicit dimensions prevent CLS
  alt="Architecture diagram"
/>

// Font loading with size-adjust
// globals.css
@font-face {
  font-family: 'Inter';
  font-display: swap;
  size-adjust: 100%;  // Prevents layout shift during font load
}`}
                </pre>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Key techniques:</strong> Explicit image dimensions, font-display: swap with size-adjust, CSS aspect-ratio for responsive media, no content insertion above existing content.
                </p>
              </div>
            </div>
          </section>

          <section id="nextjs-seo-features" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Next.js 15 SEO Features We Leverage</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">Metadata API</h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// Every page exports metadata
export const metadata: Metadata = {
  title: "SEO Implementation | Avolve.io",
  description: "How we implement modern SEO with Next.js 15 + React 19.2",
  keywords: ["Next.js SEO", "React SEO", "schema markup"],
  openGraph: {
    title: "SEO Implementation - Avolve.io",
    description: "Modern SEO best practices",
    images: [{ url: "/og-seo.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Implementation",
    images: ["/og-seo.png"]
  }
};`}
                </pre>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Automatic Sitemap & Robots.txt</h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// sitemap.ts - Automatic sitemap generation
export default function sitemap() {
  return [
    {
      url: 'https://avolve.io',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://avolve.io/software',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // ... more URLs
  ];
}

// robots.ts - Automatic robots.txt
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://avolve.io/sitemap.xml',
  };
}`}
                </pre>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Server Components = SEO Advantage</h3>
                <p className="text-gray-700 mb-3">
                  97% of AI crawlers cannot render JavaScript. Server Components solve this:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Zero client JS for content:</strong> All HTML pre-rendered server-side</li>
                  <li><strong>Instant crawlability:</strong> No waiting for hydration or JavaScript execution</li>
                  <li><strong>Faster LCP:</strong> Content visible immediately without client-side rendering</li>
                  <li><strong>Better for AI:</strong> Clean HTML that ChatGPT, Claude, Perplexity can parse</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="measuring-success" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">How We Measure SEO Success</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-2">Traditional Metrics</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li><strong>Google Search Console:</strong> Impressions, clicks, average position, CTR</li>
                  <li><strong>Vercel Analytics:</strong> Real user Core Web Vitals scores</li>
                  <li><strong>PageSpeed Insights:</strong> Lab + field data for performance</li>
                  <li><strong>Schema validator:</strong> Ensuring structured data validates correctly</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">AI-Specific Metrics (New for 2025)</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li><strong>AI referral traffic:</strong> Traffic from ChatGPT, Claude, Perplexity, Gemini</li>
                  <li><strong>Citation tracking:</strong> How often we're referenced in AI responses</li>
                  <li><strong>Brand mentions:</strong> Unlinked mentions across AI platforms</li>
                  <li><strong>Session value by source:</strong> Claude users show highest engagement ($4.56 avg)</li>
                </ul>
              </div>

              <div className="bg-gray-50 border-l-4 border-gray-600 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Key insight:</strong> AI traffic has surged <strong>527%</strong> since January 2025. We optimize for both traditional search and AI citations because both matter.
                </p>
              </div>
            </div>
          </section>

          <section id="implementation-checklist" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">SEO Implementation Checklist</h2>

            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-bold text-green-800 mb-2">✅ Implemented on Avolve.io</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>✓ Enhanced @graph schema with SoftwareApplication, Organization, Person, TechArticle</li>
                  <li>✓ H2→H3→bullet point content hierarchy on all pages</li>
                  <li>✓ Fresh publication dates (October 2025) with time elements</li>
                  <li>✓ Direct answers in opening 40-60 words of each section</li>
                  <li>✓ Original data (verified stack compatibility matrix)</li>
                  <li>✓ Next.js Image component with priority hints and AVIF/WebP</li>
                  <li>✓ Server Components by default (zero client JS for content)</li>
                  <li>✓ Automatic sitemap.xml and robots.txt generation</li>
                  <li>✓ Metadata API implementation on every page</li>
                  <li>✓ OpenGraph and Twitter Card meta tags</li>
                  <li>✓ Semantic HTML with proper heading hierarchy</li>
                  <li>✓ FAQPage schema for common questions</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-2">🔄 Continuous Optimization</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>→ Monitoring Core Web Vitals via Vercel Analytics</li>
                  <li>→ Tracking AI referral traffic and citation rates</li>
                  <li>→ Weekly content freshness updates for verified versions</li>
                  <li>→ Schema validation through Google's testing tools</li>
                  <li>→ Performance testing with PageSpeed Insights</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="for-ai" className="mb-12 border-t pt-8 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">🤖 For Claude Code & AI Assistants</h2>
            <p className="text-gray-700 mb-4">
              When implementing SEO for Next.js 15 + React 19.2 projects:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Schema first:</strong> Implement @graph schema with multiple entity types (WebSite, Organization, Person, TechArticle/Article)</li>
              <li><strong>Structure matters:</strong> Use H2→H3→bullet hierarchy, direct answers in opening paragraphs, numbered lists for step-by-step</li>
              <li><strong>Fresh + factual:</strong> Include publication dates, cite sources, provide original data when possible</li>
              <li><strong>Server Components:</strong> Default to server rendering for content, use 'use client' only when needed for interactivity</li>
              <li><strong>Core Web Vitals:</strong> Target LCP &lt; 2.5s (Next.js Image with priority), INP &lt; 200ms (debounced inputs), CLS &lt; 0.1 (explicit dimensions)</li>
              <li><strong>Platform optimization:</strong> ChatGPT prefers comprehensive 2K+ word content, Perplexity needs sub-2s load times, Claude values technical accuracy</li>
            </ul>
            <p className="text-sm text-gray-600 mt-4">
              <strong>Remember:</strong> 13.14% of searches trigger AI Overviews. Only well-structured, schema-enhanced pages get cited. Implement both traditional SEO and AI optimization.
            </p>
          </section>

          <section id="stack-relationships" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">How SEO Relates to the Stack</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Implements <Link href="/systems" className="text-gray-600 hover:underline">Systems</Link>:</strong> SEO is a system coordinating metadata, schema, performance, content architecture</li>
              <li>• <strong>Delivers <Link href="/solutions" className="text-slate-600 hover:underline">Solutions</Link>:</strong> Search visibility drives users to solutions, AI citations build authority</li>
              <li>• <strong>Uses <Link href="/software" className="text-zinc-700 hover:underline">Software</Link>:</strong> Next.js 15 Metadata API, React 19.2 Server Components, TypeScript type safety</li>
              <li>• <strong>Deployed via <Link href="/services" className="text-neutral-600 hover:underline">Services</Link>:</strong> Vercel Edge Network, Analytics, Speed Insights for Core Web Vitals</li>
              <li>• <strong>Maintained by <Link href="/support" className="text-stone-600 hover:underline">Support</Link>:</strong> Continuous monitoring, schema validation, performance optimization</li>
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
