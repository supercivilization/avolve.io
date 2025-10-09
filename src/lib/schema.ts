import type { ArticleFrontmatter } from './articles'

// Universal properties for all schema markup
export const UNIVERSAL_PROPERTIES = {
  inLanguage: 'en',
  isAccessibleForFree: true,
} as const

// Helper to create isBasedOn relationships to official documentation
export function createIsBasedOn(sources: Array<{ name: string; url: string; publisher?: string }>) {
  return sources.map(source => ({
    '@type': 'WebPage' as const,
    name: source.name,
    url: source.url,
    ...(source.publisher && {
      publisher: {
        '@type': 'Organization' as const,
        name: source.publisher
      }
    })
  }))
}

// Helper to create citation array from doc URLs
export function createCitations(urls: string[]) {
  return urls
}

// Helper to create integration pattern metadata
export function createIntegrationPattern(description: string, novelInsight?: string) {
  const pattern: Record<string, unknown> = {
    '@type': 'Thing',
    name: 'Integration Pattern',
    description
  }

  if (novelInsight) {
    pattern.additionalProperty = {
      '@type': 'PropertyValue',
      name: 'Novel Insight',
      value: novelInsight
    }
  }

  return pattern
}

export function generateArticleSchema(
  frontmatter: ArticleFrontmatter,
  url: string
) {
  const schemas: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': url,
      url,
      name: frontmatter.title,
      dateModified: frontmatter.dateModified,
      description: frontmatter.description,
      ...UNIVERSAL_PROPERTIES,
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
      ...UNIVERSAL_PROPERTIES,
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

// Backwards compatibility exports for existing pages
export const LAST_VERIFIED_DATE = '2025-10-07'

export const authorRef = {
  '@id': 'https://www.joshuaseymour.com/#person'
}

export const publisherRef = {
  '@id': 'https://www.supercivilization.xyz/#organization'
}

export const websiteRef = {
  '@id': 'https://avolve.io/#website'
}

export const organizationSchema = {
  '@type': 'Organization',
  '@id': 'https://www.supercivilization.xyz/#organization',
  name: 'Supercivilization',
  slogan: 'Vivify Further, Unify Faster, Thrive Forever',
  url: 'https://www.supercivilization.xyz',
  description: 'We help you vivify further as an individual superachiever, unify faster as a collective of superachievers, and thrive forever in the supercivilization ecosystem.',
  logo: {
    '@type': 'ImageObject',
    url: 'https://avolve.io/logo.png',
    width: 512,
    height: 512
  },
  founder: {
    '@id': 'https://www.joshuaseymour.com/#person'
  },
  sameAs: [
    'https://github.com/supercivilization'
  ],
  foundingDate: '2024'
}

export const personSchema = {
  '@type': 'Person',
  '@id': 'https://www.joshuaseymour.com/#person',
  name: 'Joshua Seymour',
  alternateName: 'Josh Seymour',
  givenName: 'Joshua',
  familyName: 'Seymour',
  url: 'https://www.joshuaseymour.com',
  image: {
    '@type': 'ImageObject',
    url: 'https://www.joshuaseymour.com/profile.png',
    width: '1200',
    height: '1200',
    caption: 'Joshua Seymour - Founder of Supercivilization, Creator of Avolve.io'
  },
  description: 'Founder of Supercivilization. Creator of Avolve.io — AI-native knowledge graph for modern web development stack compatibility',
  jobTitle: 'Founder',
  email: 'admin@joshuaseymour.com',
  foundedOrganization: {
    '@id': 'https://www.supercivilization.xyz/#organization'
  },
  worksFor: {
    '@id': 'https://www.supercivilization.xyz/#organization'
  },
  hasOccupation: [
    {
      '@type': 'Occupation',
      name: 'Entrepreneur',
      occupationalCategory: '11-0000'
    },
    {
      '@type': 'Occupation',
      name: 'Software Developer',
      occupationalCategory: '15-1252.00'
    }
  ],
  knowsAbout: [
    'AI-native applications',
    'Supercivilization',
    'Avolve.io',
    'Next.js',
    'React',
    'TypeScript',
    'Vercel AI SDK',
    'Supabase',
    'shadcn/ui',
    'Web Development',
    'Modern Tech Stack',
    'AI Integration',
    'Full Stack Development',
    'Technology innovation'
  ],
  sameAs: [
    'https://www.youtube.com/@joshuaseymour',
    'https://github.com/joshuaseymour',
    'https://tiktok.com/@joshuajseymour',
    'https://substack.com/@joshuaseymour',
    'https://x.com/joshuaseymour',
    'https://t.me/joshuaseymour',
    'https://www.instagram.com/joshuajseymour/'
  ]
}
