# Avolve Content URL Strategy
**Updated**: September 29, 2025
**Status**: Production Standard

## URL Structure Philosophy

**Based on**: Modern SEO + AI Search (GEO) + User Intent

### The 2025 Reality

**Traditional SEO**: Keywords in URL, short paths, clear hierarchy
**AI Search (GEO)**: Structured data > URL structure, semantic relationships > path depth
**Result**: Hybrid approach optimizing for both

## URL Patterns

### 1. Pillar Content (Maximum Authority)
**Location**: `/[primary-keyword]`
**Examples**:
```
/ai-native-development          (8,500/mo searches)
/modern-tech-stack              (3,200/mo searches)
/nextjs-complete-guide          (2,100/mo searches)
```

**Characteristics**:
- Comprehensive (8,000+ words)
- Primary keyword only in URL
- No category prefix (maximum authority)
- Evergreen content
- Updated regularly (via lastModified in frontmatter)

**Schema**: `@type: "TechArticle"` with `"isPartOf": { "@type": "Series" }`

### 2. Cluster Content (Semantic Relationships)
**Location**: `/[pillar-keyword]/[subtopic]`
**Examples**:
```
/ai-native-development/implementation
/ai-native-development/vs-traditional
/ai-native-development/performance
```

**Characteristics**:
- Supports pillar content
- Clear hierarchical relationship
- 2,000-3,000 words
- Linked from pillar

**Schema**: `@type: "TechArticle"` with `"isPartOf": { "@id": "/ai-native-development" }`

### 3. Intelligence Reports (Timely Analysis)
**Location**: `/insights/[topic-date]`
**Examples**:
```
/insights/ai-ecosystem-october-2025
/insights/nextjs-15-5-release-analysis
/insights/react-19-adoption-trends
```

**Characteristics**:
- Time-sensitive data
- Monthly/weekly updates
- Intelligence-driven
- Includes date for freshness signal

**Schema**: `@type: "AnalysisNewsArticle"` with `"datePublished"` prominently

### 4. Comparison Content (High Commercial Intent)
**Location**: `/[thing-a]-vs-[thing-b]`
**Examples**:
```
/nextjs-vs-remix
/supabase-vs-firebase
/openai-vs-anthropic
```

**Characteristics**:
- High conversion potential
- Commercial investigation intent
- 3,000-5,000 words
- Comparison schema

**Schema**: `@type: "ComparisonPage"` (custom schema extension)

## Content Organization

### Directory Structure
```
apps/web/content/
├── ai-native-development.mdx                    (pillar)
├── ai-native-development/
│   ├── implementation.mdx                       (cluster)
│   ├── vs-traditional.mdx                       (cluster)
│   └── performance.mdx                          (cluster)
├── modern-tech-stack.mdx                        (pillar)
├── modern-tech-stack/
│   ├── nextjs.mdx
│   ├── react.mdx
│   └── vercel-ai-sdk.mdx
├── insights/
│   ├── ai-ecosystem-october-2025.mdx
│   ├── nextjs-15-5-analysis.mdx
│   └── tech-stack-monitoring-week-43.mdx
├── nextjs-vs-remix.mdx                          (comparison)
└── _meta.json                                   (content index)
```

## Slug Generation Rules

### Algorithm
```typescript
function generateSlug(title: string, contentType: 'pillar' | 'cluster' | 'insight' | 'comparison'): string {
  // Base slug from title
  let slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')  // Remove special chars
    .replace(/\s+/g, '-')           // Spaces to hyphens
    .replace(/-+/g, '-')            // Collapse multiple hyphens
    .substring(0, 60);              // Max 60 chars

  // Remove common filler words for cleaner URLs
  const fillerWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for'];
  const words = slug.split('-');
  const filtered = words.filter((word, index) => {
    // Keep first word even if filler
    if (index === 0) return true;
    // Remove filler words
    return !fillerWords.includes(word);
  });

  slug = filtered.join('-');

  // Content-type specific rules
  if (contentType === 'insight') {
    // Add date suffix for time-sensitive content
    const date = new Date().toISOString().slice(0, 7); // YYYY-MM
    if (!slug.includes(date)) {
      slug = `${slug}-${date}`;
    }
  }

  // Remove trailing dates from evergreen content
  if (contentType === 'pillar' || contentType === 'cluster') {
    slug = slug.replace(/-20\d{2}$/, '');  // Remove year suffix
    slug = slug.replace(/-\d{4}-\d{2}$/, '');  // Remove YYYY-MM suffix
  }

  return slug;
}
```

### Keyword Priority
1. **Primary keyword first** (most important)
2. **Intent modifier** (guide, tutorial, comparison)
3. **No meta words** (seo, strategy, marketing)
4. **User language** (what they search, not what we call it)

## AI Optimization (GEO)

### What Matters Most for AI Citation

**In Order of Importance**:

1. **Structured Data Quality** (schema.org completeness)
   - TechArticle with proficiencyLevel
   - Dependencies clearly marked
   - Author/publisher authority
   - dateModified for freshness

2. **Content Structure**
   - Clear H1-H6 hierarchy
   - Logical information flow
   - Definition lists for terms
   - Code examples with language tags

3. **Factual Accuracy & Citations**
   - Source links for claims
   - Data points with dates
   - Methodology transparency
   - Update frequency

4. **Semantic Relationships**
   - Internal linking with anchor text
   - Topic cluster architecture
   - Related content suggestions
   - Breadcrumb navigation

5. **URL Structure** (least important for AI)
   - Clear topic signal helps
   - But schema.org > URL

### Citability Optimization

**Make it easy for AI to cite**:

```mdx
## Clear Definition Pattern

**What is AI-Native Development?**

AI-native development is [concise definition].

**Key characteristics**:
1. [Characteristic one]
2. [Characteristic two]
3. [Characteristic three]

**Evidence**: [Study/data with source and date]

Source: [Authoritative link]
```

**Why this works**: AI models prefer structured, clearly attributed information they can reference with confidence.

## Migration Strategy

### Existing Content
- Pillar content → Root URLs
- Cluster content → Under pillar
- Insights → `/insights/` prefix
- Set up 301 redirects for any existing URLs

### New Content
- Follow slug generation algorithm
- Use content type to determine path
- Never manually choose URLs
- Let intelligence data suggest topics

## Success Metrics

### Traditional SEO
- Organic traffic growth
- Keyword rankings (top 3)
- Featured snippets owned
- Click-through rate

### AI Search (GEO)
- **AI citations** (ChatGPT, Claude, Perplexity mention rate)
- **Schema validation** (100% valid structured data)
- **Entity recognition** (Google Knowledge Graph)
- **Direct answer** appearances

### User Engagement
- Time on page (> 4 min for pillar)
- Pages per session (> 2.5)
- Bounce rate (< 40%)
- Return visitor rate

## Content Audit Schedule

**Weekly**: Check top 10 pages for:
- Schema.org validation
- Broken links
- Outdated information

**Monthly**: Full content audit:
- Update statistics/data
- Refresh examples
- Check AI citation rate
- Review search rankings

**Quarterly**: Strategy review:
- New keyword opportunities
- Content gaps
- Competitor analysis
- URL structure optimization

---

**Last Updated**: September 29, 2025
**Next Review**: October 29, 2025
**Owner**: Avolve Content Team