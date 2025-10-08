import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const contentDirectory = path.join(process.cwd(), 'content')

export interface ArticleFrontmatter {
  title: string
  description: string
  datePublished: string
  dateModified: string
  category: 'software' | 'systems' | 'solutions' | 'services' | 'support'
  slug: string
  softwareVersion?: string
  verifiedWith?: string[]
  author?: {
    name: string
    url: string
  }
  organization?: string
  tags?: string[]
}

export async function getArticleBySlug(category: string, slug: string) {
  const filePath = path.join(contentDirectory, category, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)

  const { content: mdxContent } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          [remarkToc, { heading: 'contents', tight: true }],
        ],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          [rehypePrettyCode, { theme: 'github-dark-dimmed' }],
        ],
      },
    },
  })

  return {
    frontmatter: data as ArticleFrontmatter,
    content: mdxContent,
  }
}

export function getAllArticles(category: string): ArticleFrontmatter[] {
  const categoryPath = path.join(contentDirectory, category)

  if (!fs.existsSync(categoryPath)) {
    return []
  }

  const files = fs.readdirSync(categoryPath)

  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const slug = file.replace(/\.mdx$/, '')
      const filePath = path.join(categoryPath, file)
      const { data } = matter(fs.readFileSync(filePath, 'utf8'))
      return { ...data, slug } as ArticleFrontmatter
    })
    .sort((a, b) =>
      new Date(b.dateModified).getTime() - new Date(a.dateModified).getTime()
    )
}

export function getAllCategories(): string[] {
  return ['software', 'systems', 'solutions', 'services', 'support']
}

export function getAllSlugs(): Array<{ category: string; slug: string }> {
  const categories = getAllCategories()
  const slugs: Array<{ category: string; slug: string }> = []

  categories.forEach(category => {
    const articles = getAllArticles(category)
    articles.forEach(article => {
      slugs.push({ category, slug: article.slug })
    })
  })

  return slugs
}
