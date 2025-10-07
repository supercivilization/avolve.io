import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

// Dependencies (October 5, 2025):
// - Next.js: 15.5.5
// - REST API authentication
// Last verified: 2025-10-05

export const metadata: Metadata = {
  title: "DataForSEO - SEO Data API Platform | Avolve.io",
  description: "Complete DataForSEO API reference: 8 API suites, 7B+ keywords, SERP tracking, backlink analysis, on-page SEO. $0.0012 per 100 SERP results. Production integration patterns with Next.js 15.",
  keywords: ["DataForSEO API", "SERP API", "keyword research API", "backlink analysis", "SEO data", "rank tracking", "Next.js SEO"],
};

export default function DataForSEOPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://avolve.io/services/dataforseo#webpage",
        "url": "https://avolve.io/services/dataforseo",
        "name": "DataForSEO - SEO Data API Platform",
        "isPartOf": {
          "@id": "https://avolve.io/#website"
        },
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-05"
      },
      {
        "@type": "TechArticle",
        "@id": "https://avolve.io/services/dataforseo#article",
        "headline": "DataForSEO API Integration Guide",
        "description": "Production-ready integration patterns for DataForSEO's 8 API suites with Next.js",
        "datePublished": "2025-10-05",
        "dateModified": "2025-10-05",
        "author": {
          "@id": "https://www.joshuaseymour.com/#person"
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://avolve.io/services/dataforseo#software",
        "name": "DataForSEO",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0.0012",
          "priceCurrency": "USD",
          "description": "Per 100 SERP results"
        }
      }
    ]
  };

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name: "DataForSEO", url: "/services/dataforseo" }
      ]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <time className="text-sm text-muted-foreground" dateTime="2025-10-05">
          Last updated: October 5, 2025
        </time>

        <article className="mt-4">
          <h1 className="text-4xl font-bold mb-4 text-foreground">DataForSEO - SEO Data API Platform</h1>
          <p className="text-xl text-foreground mb-4">
            REST API access to 7B+ keywords, SERP data from 8 search engines, backlink analysis, and comprehensive SEO metrics
          </p>
          <p className="text-muted-foreground mb-12">
            Production-tested by 750+ companies including agencies, SaaS platforms, and enterprise SEO tools. $0.0012 per 100 SERP results with pay-as-you-go pricing.
          </p>

          <section id="overview" className="mb-12 bg-muted/30 border-l-4 border-border p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">What is DataForSEO?</h2>
            <p className="text-foreground mb-4">
              <strong>DataForSEO is a REST API platform</strong> providing programmatic access to SEO data including SERP results, keyword metrics, backlink profiles, on-page analysis, and content data across multiple search engines and locations.
            </p>
            <ul className="space-y-2 text-foreground">
              <li>• <strong>8 API Suites:</strong> SERP, Keywords Data, Backlinks, On-Page, DataForSEO Labs, Content Analysis, Merchant, Business Data</li>
              <li>• <strong>7B+ Keywords:</strong> Search volume, CPC, competition data across 230+ countries</li>
              <li>• <strong>8 Search Engines:</strong> Google, Bing, Yahoo, Baidu, Yandex, YouTube, Amazon, App Store</li>
              <li>• <strong>750+ Customers:</strong> Agencies, SaaS platforms, SEO tools, enterprise companies</li>
              <li>• <strong>Pay-as-you-go:</strong> No minimum commitments, $0.0012 per 100 SERP results</li>
            </ul>
          </section>

          <section id="api-suites" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">8 Core API Suites</h2>

            <div className="space-y-6">
              <div className="border-l-4 border-border pl-4">
                <h3 className="text-xl font-bold mb-3">1. SERP API - Search Results Data</h3>
                <p className="text-foreground mb-3">
                  Get real-time or scheduled SERP data from Google, Bing, Yahoo, Baidu, Yandex with all elements (organic, paid, featured snippets, People Also Ask, Knowledge Graph).
                </p>
                <ul className="space-y-1 text-foreground text-sm">
                  <li>• <strong>Live results:</strong> Real-time SERP data on-demand</li>
                  <li>• <strong>Task-based:</strong> Schedule bulk SERP tracking jobs</li>
                  <li>• <strong>All SERP features:</strong> Organic, ads, featured snippets, PAA, local pack, shopping</li>
                  <li>• <strong>230+ locations:</strong> Country, region, city-level targeting</li>
                  <li>• <strong>Pricing:</strong> $0.0012 per 100 results (Google live), $0.0003 per result (task-based)</li>
                </ul>
              </div>

              <div className="border-l-4 border-border pl-4">
                <h3 className="text-xl font-bold mb-3">2. Keywords Data API - Keyword Research</h3>
                <p className="text-foreground mb-3">
                  Access 7B+ keywords with search volume, CPC, competition, trends, and related keywords across Google Ads and organic search.
                </p>
                <ul className="space-y-1 text-foreground text-sm">
                  <li>• <strong>7B+ keywords:</strong> Comprehensive database across all industries</li>
                  <li>• <strong>Search volume:</strong> Monthly search volume with historical trends</li>
                  <li>• <strong>CPC data:</strong> Cost-per-click and competition metrics</li>
                  <li>• <strong>Related keywords:</strong> Similar, suggested, and question-based keywords</li>
                  <li>• <strong>Pricing:</strong> $0.002 per keyword lookup</li>
                </ul>
              </div>

              <div className="border-l-4 border-border pl-4">
                <h3 className="text-xl font-bold mb-3">3. Backlinks API - Link Profile Analysis</h3>
                <p className="text-foreground mb-3">
                  Comprehensive backlink data including referring domains, anchor text, link attributes, historical data, and competitor analysis.
                </p>
                <ul className="space-y-1 text-foreground text-sm">
                  <li>• <strong>Referring domains:</strong> Complete backlink profile with domain authority</li>
                  <li>• <strong>Anchor text:</strong> Distribution and link context analysis</li>
                  <li>• <strong>Historical data:</strong> Track backlink growth and loss over time</li>
                  <li>• <strong>Competitor analysis:</strong> Compare link profiles across domains</li>
                  <li>• <strong>Pricing:</strong> $0.006 per domain analyzed</li>
                </ul>
              </div>

              <div className="border-l-4 border-border pl-4">
                <h3 className="text-xl font-bold mb-3">4. On-Page API - Technical SEO Audits</h3>
                <p className="text-foreground mb-3">
                  Crawl websites for technical SEO issues: broken links, page speed, meta tags, schema markup, Core Web Vitals, and HTML validation.
                </p>
                <ul className="space-y-1 text-foreground text-sm">
                  <li>• <strong>Site crawling:</strong> Comprehensive website analysis</li>
                  <li>• <strong>Page speed:</strong> Core Web Vitals (LCP, INP, CLS) measurement</li>
                  <li>• <strong>Meta analysis:</strong> Title, description, headers, schema validation</li>
                  <li>• <strong>Link checking:</strong> Internal/external broken links</li>
                  <li>• <strong>Pricing:</strong> $0.002 per page crawled</li>
                </ul>
              </div>

              <div className="border-l-4 border-border pl-4">
                <h3 className="text-xl font-bold mb-3">5. DataForSEO Labs - Advanced SEO Metrics</h3>
                <p className="text-foreground mb-3">
                  Proprietary metrics including domain rank, keyword difficulty, SERP competitor data, ranking distribution, and historical rankings.
                </p>
                <ul className="space-y-1 text-foreground text-sm">
                  <li>• <strong>Domain metrics:</strong> Rank, trust, authority scores</li>
                  <li>• <strong>Keyword difficulty:</strong> Competition analysis for ranking</li>
                  <li>• <strong>SERP analysis:</strong> Top pages, ranking distribution</li>
                  <li>• <strong>Historical rankings:</strong> Track position changes over time</li>
                  <li>• <strong>Pricing:</strong> $0.0015 per request</li>
                </ul>
              </div>

              <div className="border-l-4 border-border pl-4">
                <h3 className="text-xl font-bold mb-3">6. Content Analysis API - Content Insights</h3>
                <p className="text-foreground mb-3">
                  Analyze content performance, topic research, sentiment analysis, readability scores, and competitive content gaps.
                </p>
                <ul className="space-y-1 text-foreground text-sm">
                  <li>• <strong>Topic research:</strong> Discover trending topics and content ideas</li>
                  <li>• <strong>Sentiment analysis:</strong> Gauge content tone and emotion</li>
                  <li>• <strong>Readability:</strong> Flesch-Kincaid and other readability metrics</li>
                  <li>• <strong>Content gaps:</strong> Find underserved topics vs competitors</li>
                  <li>• <strong>Pricing:</strong> $0.003 per analysis</li>
                </ul>
              </div>

              <div className="border-l-4 border-border pl-4">
                <h3 className="text-xl font-bold mb-3">7. Merchant API - E-commerce Search Data</h3>
                <p className="text-foreground mb-3">
                  Amazon and Google Shopping data including product rankings, reviews, pricing, sellers, and marketplace analytics.
                </p>
                <ul className="space-y-1 text-foreground text-sm">
                  <li>• <strong>Product search:</strong> Amazon and Google Shopping SERP data</li>
                  <li>• <strong>Reviews & ratings:</strong> Product review aggregation</li>
                  <li>• <strong>Pricing data:</strong> Competitive price tracking</li>
                  <li>• <strong>Seller info:</strong> Marketplace seller analysis</li>
                  <li>• <strong>Pricing:</strong> $0.002 per product lookup</li>
                </ul>
              </div>

              <div className="border-l-4 border-border pl-4">
                <h3 className="text-xl font-bold mb-3">8. Business Data API - Local SEO & Business Info</h3>
                <p className="text-foreground mb-3">
                  Google Business Profile data, local pack results, reviews, business categories, and location-based search insights.
                </p>
                <ul className="space-y-1 text-foreground text-sm">
                  <li>• <strong>Local pack:</strong> Google Maps and local search results</li>
                  <li>• <strong>Business profiles:</strong> GBP data including hours, reviews, photos</li>
                  <li>• <strong>Reviews:</strong> Aggregate review data across platforms</li>
                  <li>• <strong>Categories:</strong> Business category and niche analysis</li>
                  <li>• <strong>Pricing:</strong> $0.001 per business lookup</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="nextjs-integration" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Next.js 15 Integration Patterns</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">Authentication Setup</h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// .env.local
DATAFORSEO_LOGIN=your_email@example.com
DATAFORSEO_PASSWORD=your_password

// lib/dataforseo.ts
export const DATAFORSEO_API_BASE = 'https://api.dataforseo.com/v3';

export function getDataForSEOAuth() {
  const auth = Buffer.from(
    \`\${process.env.DATAFORSEO_LOGIN}:\${process.env.DATAFORSEO_PASSWORD}\`
  ).toString('base64');

  return {
    'Authorization': \`Basic \${auth}\`,
    'Content-Type': 'application/json'
  };
}`}
                </pre>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">SERP API - Track Rankings</h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// app/api/seo/serp/route.ts
import { DATAFORSEO_API_BASE, getDataForSEOAuth } from '@/lib/dataforseo';

export async function POST(request: Request) {
  const { keyword, location = 2840, language = "en" } = await request.json();

  const response = await fetch(
    \`\${DATAFORSEO_API_BASE}/serp/google/organic/live/advanced\`,
    {
      method: 'POST',
      headers: getDataForSEOAuth(),
      body: JSON.stringify([{
        keyword,
        location_code: location, // 2840 = United States
        language_code: language,
        device: "desktop",
        depth: 100 // Get top 100 results
      }])
    }
  );

  const data = await response.json();

  // Extract ranking position for your domain
  const items = data.tasks?.[0]?.result?.[0]?.items || [];
  const position = items.findIndex(
    item => item.url?.includes('avolve.io')
  ) + 1;

  return Response.json({
    keyword,
    position: position || null,
    totalResults: items.length,
    serp: items.slice(0, 10) // Top 10 results
  });
}`}
                </pre>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Keywords Data API - Keyword Research</h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// app/api/seo/keywords/route.ts
import { DATAFORSEO_API_BASE, getDataForSEOAuth } from '@/lib/dataforseo';

export async function POST(request: Request) {
  const { seed_keyword, location = 2840 } = await request.json();

  const response = await fetch(
    \`\${DATAFORSEO_API_BASE}/keywords_data/google_ads/search_volume/live\`,
    {
      method: 'POST',
      headers: getDataForSEOAuth(),
      body: JSON.stringify([{
        keywords: [seed_keyword],
        location_code: location,
        language_code: "en"
      }])
    }
  );

  const data = await response.json();
  const result = data.tasks?.[0]?.result?.[0];

  return Response.json({
    keyword: seed_keyword,
    searchVolume: result?.search_volume,
    cpc: result?.cpc,
    competition: result?.competition,
    trends: result?.monthly_searches
  });
}`}
                </pre>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Backlinks API - Link Profile</h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// app/api/seo/backlinks/route.ts
import { DATAFORSEO_API_BASE, getDataForSEOAuth } from '@/lib/dataforseo';

export async function POST(request: Request) {
  const { target_domain } = await request.json();

  const response = await fetch(
    \`\${DATAFORSEO_API_BASE}/backlinks/summary/live\`,
    {
      method: 'POST',
      headers: getDataForSEOAuth(),
      body: JSON.stringify([{
        target: target_domain,
        internal_list_limit: 10,
        backlinks_status_type: "live"
      }])
    }
  );

  const data = await response.json();
  const result = data.tasks?.[0]?.result?.[0];

  return Response.json({
    domain: target_domain,
    backlinks: result?.backlinks,
    referringDomains: result?.referring_domains,
    domainRank: result?.rank,
    brokenBacklinks: result?.broken_backlinks
  });
}`}
                </pre>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">On-Page API - Core Web Vitals Audit</h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// app/api/seo/audit/route.ts
import { DATAFORSEO_API_BASE, getDataForSEOAuth } from '@/lib/dataforseo';

export async function POST(request: Request) {
  const { url } = await request.json();

  const response = await fetch(
    \`\${DATAFORSEO_API_BASE}/on_page/page_screenshot\`,
    {
      method: 'POST',
      headers: getDataForSEOAuth(),
      body: JSON.stringify([{
        url,
        enable_javascript: true,
        load_resources: true
      }])
    }
  );

  const data = await response.json();
  const result = data.tasks?.[0]?.result?.[0];

  return Response.json({
    url,
    lcp: result?.page_timing?.largest_contentful_paint,
    cls: result?.page_timing?.cumulative_layout_shift,
    fid: result?.page_timing?.first_input_delay,
    onPageScore: result?.checks?.on_page_score
  });
}`}
                </pre>
              </div>
            </div>
          </section>

          <section id="pricing" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Pricing Structure</h2>

            <div className="bg-muted/30 border-l-4 border-border p-4 rounded-lg mb-6">
              <p className="text-foreground">
                <strong>Pay-as-you-go model:</strong> No monthly minimums, no contracts. Pay only for what you use with per-request pricing.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="border border-border/40 px-4 py-2 text-left">API Suite</th>
                    <th className="border border-border/40 px-4 py-2 text-left">Pricing</th>
                    <th className="border border-border/40 px-4 py-2 text-left">Example Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border/40 px-4 py-2 font-mono">SERP API (Live)</td>
                    <td className="border border-border/40 px-4 py-2">$0.0012 per 100 results</td>
                    <td className="border border-border/40 px-4 py-2">10K queries = $12</td>
                  </tr>
                  <tr>
                    <td className="border border-border/40 px-4 py-2 font-mono">SERP API (Task)</td>
                    <td className="border border-border/40 px-4 py-2">$0.0003 per result</td>
                    <td className="border border-border/40 px-4 py-2">10K queries = $3</td>
                  </tr>
                  <tr>
                    <td className="border border-border/40 px-4 py-2 font-mono">Keywords Data</td>
                    <td className="border border-border/40 px-4 py-2">$0.002 per keyword</td>
                    <td className="border border-border/40 px-4 py-2">5K keywords = $10</td>
                  </tr>
                  <tr>
                    <td className="border border-border/40 px-4 py-2 font-mono">Backlinks</td>
                    <td className="border border-border/40 px-4 py-2">$0.006 per domain</td>
                    <td className="border border-border/40 px-4 py-2">1K domains = $6</td>
                  </tr>
                  <tr>
                    <td className="border border-border/40 px-4 py-2 font-mono">On-Page</td>
                    <td className="border border-border/40 px-4 py-2">$0.002 per page</td>
                    <td className="border border-border/40 px-4 py-2">1K pages = $2</td>
                  </tr>
                  <tr>
                    <td className="border border-border/40 px-4 py-2 font-mono">DataForSEO Labs</td>
                    <td className="border border-border/40 px-4 py-2">$0.0015 per request</td>
                    <td className="border border-border/40 px-4 py-2">10K requests = $15</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-stone-100 border-l-4 border-stone-600 p-4 rounded-lg">
              <p className="text-foreground text-sm">
                <strong>Cost optimization:</strong> Use task-based endpoints (75% cheaper than live), cache results aggressively, batch requests, and start with free tier ($1 credit) to test integration.
              </p>
            </div>
          </section>

          <section id="use-cases" className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-6">Use Cases for Avolve.io</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Rank Tracking Dashboard</h3>
                <p className="text-sm text-foreground mb-2">
                  Track "Next.js 15", "React 19.2", "TypeScript 5.9" rankings daily using SERP API task-based endpoints.
                </p>
                <p className="text-xs text-muted-foreground">
                  <strong>Cost:</strong> 50 keywords × 30 days = $0.45/month
                </p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Topic Cluster Research</h3>
                <p className="text-sm text-foreground mb-2">
                  Use Keywords Data API to find 100+ related keywords for each pillar page, informing content strategy.
                </p>
                <p className="text-xs text-muted-foreground">
                  <strong>Cost:</strong> 500 keywords = $1
                </p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Competitor Backlink Analysis</h3>
                <p className="text-sm text-foreground mb-2">
                  Monitor backlink profiles of 10 competitor domains monthly to identify link-building opportunities.
                </p>
                <p className="text-xs text-muted-foreground">
                  <strong>Cost:</strong> 10 domains × 12 months = $0.72/year
                </p>
              </div>

              <div className="bg-neutral-100 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Technical SEO Monitoring</h3>
                <p className="text-sm text-foreground mb-2">
                  Weekly On-Page API audits of all pages for Core Web Vitals, broken links, and schema validation.
                </p>
                <p className="text-xs text-muted-foreground">
                  <strong>Cost:</strong> 20 pages × 52 weeks = $2.08/year
                </p>
              </div>
            </div>
          </section>

          <section id="for-ai" className="mb-12 border-t pt-8 bg-muted/30 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">🤖 For AI Assistants</h2>
            <ul className="space-y-2 text-foreground">
              <li><strong>8 API suites:</strong> SERP (rank tracking), Keywords Data (7B+ keywords), Backlinks (domain authority), On-Page (Core Web Vitals), Labs (keyword difficulty), Content Analysis, Merchant, Business Data</li>
              <li><strong>Pricing model:</strong> Pay-as-you-go, $0.0012 per 100 SERP results (live), $0.0003 per result (task-based), no minimums</li>
              <li><strong>Integration pattern:</strong> Basic auth with Buffer.from credentials, Next.js API routes, server-side only (never expose credentials client-side)</li>
              <li><strong>Best practices:</strong> Use task-based endpoints (75% cheaper), cache results, batch requests, start with $1 free credit</li>
              <li><strong>Common use cases:</strong> Rank tracking dashboards, keyword research for topic clusters, competitor backlink analysis, technical SEO monitoring</li>
              <li><strong>Next.js implementation:</strong> Store credentials in .env.local, create API routes in app/api/seo/, use Server Components for data fetching</li>
            </ul>
          </section>

          <section id="relationships" className="mb-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Stack Relationships</h2>
            <ul className="space-y-2 text-foreground">
              <li>• <strong>Enhances <Link href="/systems/search" className="text-muted-foreground hover:underline">Search System</Link>:</strong> Programmatic SEO data complements manual optimization</li>
              <li>• <strong>Informs <Link href="/solutions" className="text-primary hover:underline">Solutions</Link>:</strong> Data-driven keyword and content strategy for visibility</li>
              <li>• <strong>Integrates with <Link href="/software/nextjs" className="text-primary hover:underline">Next.js</Link>:</strong> API routes, Server Components, caching patterns</li>
              <li>• <strong>Part of <Link href="/services" className="text-primary hover:underline">Services</Link>:</strong> External managed API platform with pay-as-you-go pricing</li>
            </ul>
          </section>

          <nav className="mt-12 pt-8 border-t border-border">
            <Link href="/services" className="text-muted-foreground hover:underline">
              ← Back to Services
            </Link>
          </nav>
        </article>
      </main>
    </>
  );
}
