/**
 * MDX Content Utilities
 * Handles reading, parsing, and serving MDX content with frontmatter
 */

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export interface ContentFrontmatter {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  category: string;
  tags: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  schema: {
    type: string;
    proficiencyLevel?: string;
  };
  intelligence?: {
    sources: string[];
    confidence: number;
    dataPoints: number;
    generatedAt: string;
  };
}

export interface Content {
  slug: string;
  frontmatter: ContentFrontmatter;
  content: string;
  excerpt: string;
}

/**
 * Get all content slugs
 */
export async function getAllContentSlugs(): Promise<string[]> {
  const slugs: string[] = [];

  async function findMdxFiles(dir: string, prefix = ''): Promise<void> {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name.startsWith('_')) continue; // Skip meta files

      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await findMdxFiles(fullPath, prefix ? `${prefix}/${entry.name}` : entry.name);
      } else if (entry.name.endsWith('.mdx')) {
        const slug = prefix
          ? `${prefix}/${entry.name.replace(/\.mdx$/, '')}`
          : entry.name.replace(/\.mdx$/, '');
        slugs.push(slug);
      }
    }
  }

  await findMdxFiles(CONTENT_DIR);
  return slugs;
}

/**
 * Get content by slug
 */
export async function getContentBySlug(slug: string): Promise<Content | null> {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
    const fileContent = await fs.readFile(filePath, 'utf-8');

    const { data, content } = matter(fileContent);

    // Generate excerpt (first 160 chars of content, no markdown)
    const plainText = content.replace(/[#*`\[\]]/g, '').trim();
    const excerpt = plainText.substring(0, 160) + (plainText.length > 160 ? '...' : '');

    return {
      slug,
      frontmatter: data as ContentFrontmatter,
      content,
      excerpt,
    };
  } catch (error) {
    console.error(`Error loading content for slug "${slug}":`, error);
    return null;
  }
}

/**
 * Get all content (for index pages)
 */
export async function getAllContent(): Promise<Content[]> {
  const slugs = await getAllContentSlugs();
  const content = await Promise.all(
    slugs.map(slug => getContentBySlug(slug))
  );

  return content.filter((c): c is Content => c !== null);
}

/**
 * Get related content based on tags
 */
export async function getRelatedContent(
  currentSlug: string,
  limit = 3
): Promise<Content[]> {
  const current = await getContentBySlug(currentSlug);
  if (!current) return [];

  const allContent = await getAllContent();

  // Calculate relevance score based on shared tags
  const scored = allContent
    .filter(c => c.slug !== currentSlug)
    .map(c => {
      const sharedTags = c.frontmatter.tags.filter(tag =>
        current.frontmatter.tags.includes(tag)
      );
      return { content: c, score: sharedTags.length };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.content);

  return scored;
}

/**
 * Generate schema.org structured data
 */
export function generateSchemaOrg(content: Content): Record<string, any> {
  const { frontmatter } = content;

  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': frontmatter.schema.type,
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.publishedAt,
    dateModified: frontmatter.updatedAt,
    author: {
      '@type': 'Organization',
      name: frontmatter.author,
      url: 'https://avolve.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Avolve',
      url: 'https://avolve.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://avolve.com/logo.png'
      }
    },
    keywords: frontmatter.seo.keywords.join(', '),
  };

  // Add TechArticle specific fields
  if (frontmatter.schema.type === 'TechArticle') {
    Object.assign(baseSchema, {
      proficiencyLevel: frontmatter.schema.proficiencyLevel || 'Intermediate',
    });
  }

  // Add intelligence metadata if available
  if (frontmatter.intelligence) {
    Object.assign(baseSchema, {
      isBasedOn: {
        '@type': 'Dataset',
        name: 'Avolve Intelligence Data',
        description: `Based on ${frontmatter.intelligence.dataPoints} data points`,
        temporalCoverage: frontmatter.intelligence.generatedAt,
      }
    });
  }

  return baseSchema;
}