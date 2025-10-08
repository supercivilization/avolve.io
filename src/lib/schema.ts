import type { ArticleFrontmatter } from './articles'

export function generateArticleSchema(
  frontmatter: ArticleFrontmatter,
  url: string
) {
  const schemas: any[] = [
    {
      '@type': 'WebPage',
      '@id': url,
      url,
      name: frontmatter.title,
      dateModified: frontmatter.dateModified,
      description: frontmatter.description,
    },
    {
      '@type': 'TechArticle',
      headline: frontmatter.title,
      description: frontmatter.description,
      author: frontmatter.author
        ? {
            '@type': 'Person',
            name: frontmatter.author.name,
            url: frontmatter.author.url,
          }
        : undefined,
      publisher: frontmatter.organization
        ? {
            '@type': 'Organization',
            name: frontmatter.organization,
          }
        : undefined,
      datePublished: frontmatter.datePublished,
      dateModified: frontmatter.dateModified,
    },
  ]

  // Add SoftwareApplication schema if version specified
  if (frontmatter.softwareVersion) {
    schemas.push({
      '@type': 'SoftwareApplication',
      name: frontmatter.title.split(' ')[0], // e.g., "Next.js" from "Next.js 15.5.4"
      softwareVersion: frontmatter.softwareVersion,
      applicationCategory: 'DeveloperApplication',
    })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  }
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Supercivilization',
    url: 'https://supercivilization.xyz',
    logo: 'https://avolve.io/logo.png',
    sameAs: ['https://github.com/supercivilization/avolve.io'],
  }
}
