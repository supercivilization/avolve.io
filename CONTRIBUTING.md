# Contributing to Avolve.io

## Philosophy

**The pages are the docs.** Don't create separate documentation files. Instead, build pages that demonstrate the patterns they describe.

## Before Contributing

1. **Verify versions** - Test code with Next.js 15.5.4 + React 19.2.0 + TypeScript 5.9.2 + Node.js 24.8.0
2. **Check existing patterns** - Review similar pages to match style and structure
3. **No speculation** - Only document what you've verified in production or local testing

## Content Standards

### Required Elements for All Pages

1. **BreadcrumbSchema component** at the top
2. **Schema markup** with `@graph` containing:
   - `WebPage` with `@id` and `isPartOf`
   - `TechArticle` for technical content
   - `HowTo` for step-by-step guides
   - `FAQPage` for Q&A sections
   - `SoftwareApplication` for software versions
3. **Fresh date** - `dateModified` within 30 days (for AI citation boost)
4. **Metadata export** with title, description, keywords
5. **Version comments** at top of file:
   ```typescript
   // Dependencies (October 5, 2025):
   // - Next.js: 15.5.4
   // - React: 19.2.0
   // Last verified: 2025-10-05
   ```

### Content Hierarchy

Follow this structure for AI extraction:

```markdown
<h1>Main Topic</h1>
<p>Direct answer in first 40-60 words</p>

<h2>Subtopic</h2>
<p>Clear explanation</p>

<h3>Specific Detail</h3>
<ul>
  <li>Bullet point with specific data</li>
  <li>Another concrete fact with numbers</li>
</ul>
```

### Code Examples

- **Real code only** - No placeholders, mock data, or `TODO` comments
- **Complete implementations** - Show full working examples, not snippets
- **Production patterns** - Include error handling, TypeScript types, edge cases
- **Syntax highlighting** - Use `<pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">`

### "What Breaks in Production" Sections

Required for all System pages. Format:

```typescript
<div className="bg-stone-50 border-l-4 border-stone-400 p-4">
  <h3 className="text-lg font-bold mb-2">What Breaks in Production</h3>
  <ul className="space-y-3 text-gray-700 text-sm">
    <li>
      <strong>Issue description:</strong> What fails and why<br />
      <span className="text-stone-700">Fix:</span> Specific solution with code
    </li>
  </ul>
</div>
```

## File Organization

### Where to Put New Content

- **Solutions** → Business outcomes (e.g., `/solutions/saas-mvp`)
- **Systems** → Architecture patterns with multiple components (e.g., `/systems/auth`)
- **Software** → Individual frameworks/libraries (e.g., `/software/nextjs`)
- **Services** → External platforms (e.g., `/services/vercel`)
- **Support** → Operational runbooks (e.g., `/support#database-slow`)

### Naming Conventions

- **Files:** `page.tsx` in kebab-case directories (`/software/react-email/page.tsx`)
- **Components:** PascalCase (`BreadcrumbSchema.tsx`)
- **Functions:** camelCase (`getDataForSEOAuth()`)
- **Constants:** SCREAMING_SNAKE_CASE (`DATAFORSEO_API_BASE`)

## Schema Implementation

### BreadcrumbSchema Usage

```typescript
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

<BreadcrumbSchema items={[
  { name: "Home", url: "/" },
  { name: "Systems", url: "/systems" },
  { name: "Email", url: "/systems/email" }
]} />
```

### Page Schema Pattern

```typescript
const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://avolve.io/systems/email#webpage",
      "url": "https://avolve.io/systems/email",
      "isPartOf": { "@id": "https://avolve.io/#website" },
      "datePublished": "2025-10-05",
      "dateModified": "2025-10-05"
    },
    {
      "@type": "TechArticle",
      "@id": "https://avolve.io/systems/email#article",
      "headline": "Email System Implementation",
      "author": { "@id": "https://www.joshuaseymour.com/#person" }
    }
  ]
};

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
/>
```

## Git Workflow

1. **Test locally** - `npm run build` must succeed
2. **One feature per commit** - Logical, atomic changes
3. **Descriptive messages** - Explain what and why, not how
4. **Fresh dates** - Update `dateModified` when changing content

### Commit Message Format

```
Add/Update/Fix [what]

- Specific change 1
- Specific change 2
- Production impact or reasoning

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Testing Checklist

Before submitting:

- [ ] `npm run build` succeeds
- [ ] All links work (internal and external)
- [ ] Schema validates at [schema.org validator](https://validator.schema.org/)
- [ ] Page renders correctly on mobile
- [ ] Code examples are complete and tested
- [ ] Verified versions are current (October 2025)
- [ ] No console errors in browser
- [ ] BreadcrumbSchema included
- [ ] Fresh `dateModified` within 30 days

## What NOT to Do

❌ **Don't create separate documentation files** - Build pages instead
❌ **Don't use placeholder code** - Real, tested implementations only
❌ **Don't add TODO comments** - Complete the feature or don't add it
❌ **Don't skip schema markup** - Required for AI citations
❌ **Don't use outdated versions** - Verify against October 2025 stack
❌ **Don't add third-party services** - Focus on core stack (Next.js, React, Supabase, Vercel)
❌ **Don't speculate** - Only document verified, tested patterns

## Questions?

Check existing pages for patterns:
- `/systems/email` - Complete system implementation example
- `/software/nextjs` - Software page pattern
- `/services/dataforseo` - Service integration example

---

**Remember:** The site is the documentation. Make pages that demonstrate what they describe.
