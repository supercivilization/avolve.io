import type { MetadataRoute } from 'next'

/**
 * Robots.txt Configuration for Avolve.io
 *
 * SEO Strategy:
 * - Allow all crawlers to access public content
 * - Block API routes and internal Next.js directories
 * - Provide sitemap for efficient crawling
 * - Specify canonical host for consolidation
 *
 * Optimized for:
 * - Google, Bing, DuckDuckGo (general crawlers)
 * - ChatGPT, Claude, Perplexity (AI crawlers)
 * - Developer-focused search engines
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // API routes (internal use only)
          '/_next/',         // Next.js build artifacts
          '/private/',       // Private directory if exists
        ],
      },
      // Allow AI crawlers specifically for better AI assistant discovery
      {
        userAgent: [
          'GPTBot',          // ChatGPT crawler
          'ChatGPT-User',    // ChatGPT user agent
          'CCBot',           // Common Crawl (used by many AI models)
          'anthropic-ai',    // Claude crawler
          'Claude-Web',      // Claude web crawler
          'PerplexityBot',   // Perplexity AI
          'Google-Extended', // Google Bard/Gemini
        ],
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://avolve.io/sitemap.xml',
    host: 'https://avolve.io',
  }
}
