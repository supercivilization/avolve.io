# Avolve.io MDX Architecture

**Status:** ✅ Implemented (October 2025)  
**Architecture:** Best practice MDX + `/content` directory  
**Purpose:** AI citation optimization, industry-standard documentation

---

## Overview

Avolve.io now uses **MDX (Markdown + JSX) with a centralized `/content` directory** for all technical documentation. This architecture follows industry best practices while maintaining the site's unique focus on AI citation optimization and the 5S framework.

### Key Benefits

✅ **Fresh `dateModified` automatically managed** - Boosts AI citation ranking  
✅ **Consistent Schema.org markup** - `@graph` on every page  
✅ **Easier content updates** - Edit .mdx files instead of React components  
✅ **Better AI citations** - Optimized for ChatGPT, Claude, Perplexity, Gemini  
✅ **Industry-standard architecture** - Follows 2025 documentation best practices

---

## Architecture

### Directory Structure

```
/content                           # All MDX content files
  software/
    nextjs.mdx                     # Next.js 15.5.4 documentation
    react.mdx                      # React 19.2.0 documentation
    typescript.mdx                 # TypeScript 5.9.3 documentation
    tailwind.mdx                   # Tailwind CSS 4.1.13 documentation
  systems/
    *.mdx                          # System patterns
  solutions/
    *.mdx                          # Business solutions
  services/
    *.mdx                          # Service integrations
  support/
    *.mdx                          # Operational runbooks

/src/app
  software/
    page.tsx                       # Listing page
    [slug]/page.tsx               # Dynamic route for all software/*.mdx
  systems/[slug]/page.tsx
  solutions/[slug]/page.tsx
  services/[slug]/page.tsx
  support/[slug]/page.tsx
  
/src/lib
  articles.ts                      # MDX reading/parsing utilities
  schema.ts                        # Schema.org generation helpers
```

### How It Works

1. **Content in `/content`** - All articles as .mdx files with frontmatter
2. **Dynamic routes** - Single `[slug]/page.tsx` per category
3. **Automatic compilation** - MDX → React components at build time
4. **Schema.org markup** - Generated from frontmatter metadata

---

## MDX Frontmatter Schema

Every `.mdx` file must have this frontmatter structure:

```yaml
---
title: "Next.js 15.5.4 Production Patterns"
description: "Verified compatibility with React 19.2.0, TypeScript 5.9.3"
datePublished: "2025-10-05"
dateModified: "2025-10-07"          # MUST be fresh (within 30 days)
category: "software"                 # software | systems | solutions | services | support
slug: "nextjs"                       # URL: /software/nextjs
softwareVersion: "15.5.4"           # For SoftwareApplication schema
verifiedWith:                        # Compatible versions
  - "React 19.2.0"
  - "TypeScript 5.9.3"
  - "Node.js 24.8.0"
author:
  name: "Joshua Seymour"
  url: "https://www.joshuaseymour.com"
organization: "Supercivilization"
tags: ["nextjs", "react", "typescript"]
---
```

### Frontmatter Fields

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `title` | string | ✅ | Article headline, shown in `<h1>` |
| `description` | string | ✅ | Meta description, SEO summary |
| `datePublished` | ISO date | ✅ | Initial publication date |
| `dateModified` | ISO date | ✅ | Last update (MUST be fresh) |
| `category` | enum | ✅ | One of: software/systems/solutions/services/support |
| `slug` | string | ✅ | URL segment (e.g., "nextjs") |
| `softwareVersion` | string | - | Adds SoftwareApplication schema |
| `verifiedWith` | string[] | - | Compatible technology versions |
| `author` | object | - | Author name and URL |
| `organization` | string | - | Publisher organization |
| `tags` | string[] | - | Keywords for SEO |

---

## Content Hierarchy for AI Citations

MDX content MUST follow this structure for optimal AI citations:

```markdown
## Main Topic

Production-tested as of October 2025:

### Subtopic

- **Bold key point** - Explanation
- **Another key point** - More details

## What Breaks in Production

### Issue: Descriptive Name

**Symptom:** What users see when it breaks

**Fix:** How to resolve it
\`\`\`typescript
// Code example
\`\`\`
```

### Why This Structure?

1. **H2→H3→bullet** - AI models extract this hierarchy efficiently
2. **Bold key points** - Highlights important information
3. **"What Breaks in Production"** - Crucial for troubleshooting queries
4. **Code examples** - Demonstrates practical usage

---

## Schema.org Markup

Every page automatically generates Schema.org `@graph` markup:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://avolve.io/software/nextjs",
      "name": "Next.js 15.5.4 Production Patterns",
      "dateModified": "2025-10-07"
    },
    {
      "@type": "TechArticle",
      "headline": "Next.js 15.5.4 Production Patterns",
      "author": { "@type": "Person", "name": "Joshua Seymour" },
      "datePublished": "2025-10-05",
      "dateModified": "2025-10-07"
    },
    {
      "@type": "SoftwareApplication",
      "name": "Next.js",
      "softwareVersion": "15.5.4"
    }
  ]
}
```

---

## Creating New Content

### 1. Create MDX File

```bash
touch content/software/new-article.mdx
```

### 2. Add Frontmatter

```yaml
---
title: "Your Article Title"
description: "Brief description for SEO"
datePublished: "2025-10-07"
dateModified: "2025-10-07"
category: "software"
slug: "new-article"
author:
  name: "Joshua Seymour"
  url: "https://www.joshuaseymour.com"
organization: "Supercivilization"
tags: ["keyword1", "keyword2"]
---
```

### 3. Write Content

```markdown
## Main Topic

Your content here with proper H2→H3→bullet structure.

## What Breaks in Production

### Issue: Common Problem

**Symptom:** Error message users see

**Fix:**
\`\`\`typescript
// Solution code
\`\`\`
```

### 4. URL Automatically Generated

File: `content/software/new-article.mdx`  
URL: `https://avolve.io/software/new-article`

---

## Updating `dateModified`

**CRITICAL for AI citations:** `dateModified` must be within 30 days.

### Manual Update

```yaml
---
dateModified: "2025-10-07"  # Change this date
---
```

### Automated Update (Future Enhancement)

```bash
# Run this script to update all dateModified to today
node scripts/update-dates.js
```

---

## Migration Guide

### From page.tsx to .mdx

**Before (page.tsx):**
```tsx
export default function NextjsPage() {
  return (
    <div>
      <h1>Next.js 15.5.4</h1>
      <p>Content...</p>
    </div>
  )
}
```

**After (content/software/nextjs.mdx):**
```yaml
---
title: "Next.js 15.5.4 Production Patterns"
description: "..."
datePublished: "2025-10-05"
dateModified: "2025-10-07"
category: "software"
slug: "nextjs"
---

## Main Topic

Content...
```

### Steps

1. Extract frontmatter from page.tsx metadata
2. Convert JSX to Markdown
3. Save as .mdx in appropriate /content category
4. Delete old page.tsx directory (keep dynamic [slug]/page.tsx)
5. Test at `/category/slug`

---

## Build & Deploy

### Development

```bash
npm run dev
# Visit http://localhost:3000/software/nextjs
```

### Production Build

```bash
npm run build
# MDX compiled to React components
# Sitemap auto-generated with all .mdx files
```

### Vercel Deployment

Automatically detected and optimized:
- MDX compilation at build time
- Static generation for all routes
- Incremental Static Regeneration (ISR) supported

---

## Sitemap Generation

`/src/app/sitemap.ts` automatically discovers all .mdx files:

```typescript
import { getAllCategories, getAllArticles } from '@/lib/articles'

export default function sitemap() {
  const categories = getAllCategories()
  
  const articleRoutes = categories.flatMap(category => {
    const articles = getAllArticles(category)
    return articles.map(article => ({
      url: `https://avolve.io/${category}/${article.slug}`,
      lastModified: new Date(article.dateModified),
      changeFrequency: 'weekly',
      priority: 0.6,
    }))
  })
  
  return [...staticRoutes, ...categoryRoutes, ...articleRoutes]
}
```

**Result:** `/sitemap.xml` lists all pages with correct `lastModified` dates.

---

## Testing

### Verify Schema Markup

1. Visit article URL
2. View page source
3. Search for `application/ld+json`
4. Validate at https://validator.schema.org/

### Verify AI Citation Optimization

1. Check `dateModified` is within 30 days
2. Verify H2→H3→bullet hierarchy
3. Confirm "What Breaks in Production" section exists
4. Ensure exact version numbers present (not "15.x")

---

## Backwards Compatibility

Existing page.tsx files still work via exports in `lib/schema.ts`:

```typescript
export const LAST_VERIFIED_DATE = '2025-10-07'
export const authorRef = { '@id': '...' }
export const publisherRef = { '@id': '...' }
export const organizationSchema = { ... }
export const personSchema = { ... }
```

**Migration is non-breaking** - old and new architectures coexist.

---

## Next Steps

1. **Content Migration** - Convert remaining page.tsx to .mdx
2. **Automation** - Script to update all `dateModified` dates
3. **Enhanced Schema** - Add FAQ, HowTo schemas where appropriate
4. **Image Optimization** - Add OG image generation per article

---

## Reference

### Technology Stack

- Next.js 15.5.4 (App Router, `mdxRs` experimental)
- MDX processing: `next-mdx-remote`, `gray-matter`
- Syntax highlighting: `rehype-pretty-code`, `shiki`
- Markdown enhancements: `remark-gfm`, `remark-toc`
- Typography: `@tailwindcss/typography`

### Key Files

- `/content/**/*.mdx` - All content
- `/src/lib/articles.ts` - MDX utilities
- `/src/lib/schema.ts` - Schema.org helpers
- `/src/app/[category]/[slug]/page.tsx` - Dynamic routes
- `/src/app/sitemap.ts` - Auto-generated sitemap
- `/src/components/breadcrumb-schema.tsx` - Breadcrumb markup

---

**Status:** ✅ Architecture Complete  
**Last Updated:** October 7, 2025  
**Maintained By:** Joshua Seymour (Supercivilization)
