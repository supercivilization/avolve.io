import type { MetadataRoute } from 'next'
import { getAllCategories, getAllArticles } from '@/lib/articles'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://avolve.io'
  
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]

  const categories = getAllCategories()
  
  const categoryRoutes: MetadataRoute.Sitemap = categories.map(category => ({
    url: `${base}/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const articleRoutes: MetadataRoute.Sitemap = categories.flatMap(category => {
    const articles = getAllArticles(category)
    return articles.map(article => ({
      url: `${base}/${category}/${article.slug}`,
      lastModified: new Date(article.dateModified),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  })

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes]
}
