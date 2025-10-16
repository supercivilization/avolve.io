import type { MetadataRoute } from 'next'
import { getAllCategories, getAllArticles } from '@/lib/articles'

/**
 * Comprehensive Sitemap for Avolve.io
 *
 * Structure:
 * 1. Core pages (homepage, about, contact)
 * 2. Legal pages (privacy, terms, refunds)
 * 3. Category pages (software, systems, solutions, services, support)
 * 4. Integration pathway pages (special software routes)
 * 5. Dynamic article/system/service pages
 *
 * Priorities:
 * - 1.0: Homepage
 * - 0.9: About, Category pages
 * - 0.7: Integration pathways, Contact
 * - 0.6: Individual articles/systems/services
 * - 0.5: Legal pages
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://avolve.io'
  const currentDate = new Date()

  // Core pages - highest priority
  const corePages: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${base}/about`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/about/philosophy`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Legal pages - lower priority but important for compliance
  const legalPages: MetadataRoute.Sitemap = [
    {
      url: `${base}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${base}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${base}/refunds`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Category pages - main navigation pillars
  const categories = getAllCategories()
  const categoryRoutes: MetadataRoute.Sitemap = categories.map(category => ({
    url: `${base}/${category}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  // Integration pathway pages - high-value technical content
  const integrationPathways: MetadataRoute.Sitemap = [
    {
      url: `${base}/software/react-to-production`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${base}/software/type-safe-stack`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${base}/software/ai-enabled-stack`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  // Dynamic article/system/service pages from MDX content
  const articleRoutes: MetadataRoute.Sitemap = categories.flatMap(category => {
    const articles = getAllArticles(category)
    return articles.map(article => ({
      url: `${base}/${category}/${article.slug}`,
      lastModified: new Date(article.dateModified),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  })

  return [
    ...corePages,
    ...legalPages,
    ...categoryRoutes,
    ...integrationPathways,
    ...articleRoutes,
  ]
}
