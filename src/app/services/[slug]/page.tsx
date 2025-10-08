import { getArticleBySlug, getAllArticles } from '@/lib/articles'
import { generateArticleSchema } from '@/lib/schema'
import { BreadcrumbSchema } from '@/components/breadcrumb-schema'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const articles = getAllArticles('services')
  return articles.map(article => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug('services', slug)
  
  if (!article) {
    return {}
  }

  const { frontmatter } = article
  
  return {
    title: `${frontmatter.title} | Avolve.io`,
    description: frontmatter.description,
    keywords: frontmatter.tags,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: 'article',
      publishedTime: frontmatter.datePublished,
      modifiedTime: frontmatter.dateModified,
      url: `https://avolve.io/services/${slug}`,
    },
  }
}

export default async function ServicesPage({ params }: Props) {
  const { slug } = await params
  const article = await getArticleBySlug('services', slug)
  
  if (!article) {
    notFound()
  }

  const { frontmatter, content } = article
  const url = `https://avolve.io/services/${slug}`
  const articleSchema = generateArticleSchema(frontmatter, url)
  
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: frontmatter.title, url: `/services/${slug}` },
  ]

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto px-4 py-12">
        {/* Article header */}
        <header className="mb-8 not-prose">
          <div className="flex items-center gap-2 mb-4 text-sm">
            <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-full font-medium">
              Services
            </span>
            {frontmatter.softwareVersion && (
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-mono text-xs">
                v{frontmatter.softwareVersion}
              </span>
            )}
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-foreground">{frontmatter.title}</h1>
          
          <p className="text-xl text-muted-foreground mb-4">
            {frontmatter.description}
          </p>

          {frontmatter.verifiedWith && frontmatter.verifiedWith.length > 0 && (
            <div className="text-sm text-muted-foreground">
              <strong>Verified with:</strong> {frontmatter.verifiedWith.join(' • ')}
            </div>
          )}
          
          <div className="text-sm text-muted-foreground mt-4">
            <time dateTime={frontmatter.dateModified}>
              Last updated: {new Date(frontmatter.dateModified).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </header>

        {/* MDX content */}
        <div className="prose-headings:scroll-mt-20 prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
          {content}
        </div>
      </article>
    </>
  )
}
