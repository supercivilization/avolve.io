# Knowledge Graph Route Planning
**Created:** October 5, 2025
**Purpose:** Comprehensive route structure planning for Avolve.io knowledge graph

## Current State (Implemented)

### Systems Layer
- ✅ `/systems` - Hub page
- ✅ `/systems/search` - SEO + AI citations + discoverability

### Software Layer
- ✅ `/software` - Hub page
- ✅ `/software/nextjs` - Next.js 15.5.4
- ✅ `/software/react` - React 19.2.0
- ✅ `/software/nodejs` - Node.js 24.8.0
- 🔄 `/software/typescript` - TypeScript 5.9.2 (being built in another chat)

### Other Layers
- ✅ `/solutions` - Hub with AI customer support example
- ✅ `/services` - Hub with pricing tables
- ✅ `/support` - Hub page
- ✅ `/about` - Site information

## Available Guide Documentation

### AI Development Guides
- `claude-code-complete-guide.md`
- `vercel-ai-sdk-complete-guide.md`
- `vercel-sdk-ecosystem-guide.md`
- `claude-desktop-file-capabilities-guide.md`
- `claude-sonnet-4.5-release-summary.md`

### Framework Guides
- `react-19-2-stack-integration-analysis.md`
- `nextjs-complete-guide.md`
- `react-19-complete-guide.md`
- `typescript-complete-guide.md`
- `nodejs-complete-guide.md`

### UI/Styling Guides
- `shadcn-ui-complete-guide.md`
- `tailwind-css-complete-guide.md`

### Backend Infrastructure Guides
- `vercel-complete-guide.md`
- `supabase-complete-guide.md`

### Specialized Guides
- `resend-react-email-complete-guide.md`
- `mobile-development-complete-guide.md`
- `react-native-expo-complete-guide.md`
- `web-capabilities-complete-guide.md`
- `full-stack-development-complete-guide.md`

## Proposed Route Structure

### Systems Layer (Architecture Patterns)
**Definition:** Multi-component coordination patterns

#### Core Systems (Priority 1)
- ✅ `/systems/search` - SEO, AI citations, knowledge graph, Core Web Vitals
- 🎯 `/systems/email` - Transactional email with Resend + React Email
- 🎯 `/systems/social` - OpenGraph, Twitter Cards, social sharing optimization
- 🎯 `/systems/mobile` - React Native/Expo integration with Next.js monorepo
- 🎯 `/systems/authentication` - Move from systems page to dedicated route

#### Advanced Systems (Priority 2)
- 📋 `/systems/analytics` - Vercel Analytics, conversion tracking, user insights
- 📋 `/systems/payments` - Stripe integration patterns
- 📋 `/systems/storage` - File upload/management (Vercel Blob/Supabase Storage)
- 📋 `/systems/ai-chat` - Complete AI chat system (from solutions example)
- 📋 `/systems/real-time` - WebSocket, Supabase Realtime patterns

### Software Layer (Frameworks & Libraries)
**Definition:** Individual frameworks, libraries, and tools

#### Core Stack (Priority 1)
- ✅ `/software/nextjs` - Next.js 15.5.4
- ✅ `/software/react` - React 19.2.0
- ✅ `/software/nodejs` - Node.js 24.8.0
- 🔄 `/software/typescript` - TypeScript 5.9.2 (in progress)

#### Styling & UI (Priority 2)
- 🎯 `/software/tailwind` - Tailwind CSS 4.1.13 with Oxide engine
- 🎯 `/software/shadcn-ui` - shadcn/ui Platform 3.0

#### AI Development (Priority 2)
- 🎯 `/software/vercel-ai-sdk` - Vercel AI SDK 5.0.48
- 📋 `/software/claude-code` - Claude Code development workflow
- 📋 `/software/anthropic-sdk` - Anthropic SDK integration

#### Backend Tools (Priority 3)
- 📋 `/software/react-email` - React Email component framework
- 📋 `/software/zod` - Schema validation
- 📋 `/software/react-hook-form` - Form management

#### Mobile (Priority 3)
- 📋 `/software/react-native` - React Native 0.81.3
- 📋 `/software/expo` - Expo SDK 54
- 📋 `/software/nativewind` - NativeWind v4 styling

### Services Layer (External Managed Tools)
**Definition:** Hosted services you pay for

#### Infrastructure Services (Priority 1)
- ✅ `/services` - Hub with current pricing tables
- 🎯 `/services/vercel` - Dedicated Vercel pricing, deployment, edge functions
- 🎯 `/services/supabase` - Dedicated Supabase database, auth, storage, realtime

#### AI Services (Priority 2)
- 🎯 `/services/anthropic` - Claude API pricing and integration
- 📋 `/services/openai` - GPT models and pricing
- 📋 `/services/vercel-ai-cloud` - Vercel AI Gateway and infrastructure

#### Communication Services (Priority 3)
- 📋 `/services/resend` - Email delivery service
- 📋 `/services/stripe` - Payment processing
- 📋 `/services/sentry` - Error monitoring

## Route Categorization Logic

### Systems vs Software Decision Tree
```
Does it coordinate multiple components/frameworks?
├─ YES → Systems (e.g., /systems/search uses Next.js + Schema.org + AI optimization)
└─ NO → Software (e.g., /software/nextjs is a single framework)

Does it solve a business capability?
├─ YES → Systems (e.g., /systems/email delivers email capability)
└─ NO → Software (e.g., /software/react-email is just a library)

Is it architectural guidance?
├─ YES → Systems (e.g., /systems/mobile shows monorepo architecture)
└─ NO → Software (e.g., /software/expo is one tool)
```

### Services vs Software Decision Tree
```
Is it externally hosted and managed?
├─ YES → Services (e.g., /services/vercel is a hosting platform)
└─ NO → Software (e.g., /software/nextjs is a framework you use)

Do you pay for it monthly/yearly?
├─ YES → Services (e.g., /services/anthropic charges per token)
└─ NO → Software (e.g., /software/react is open source)

Can it be self-hosted?
├─ NO → Services (e.g., /services/vercel is proprietary)
├─ YES but not recommended → Services (e.g., Supabase has self-host but most use cloud)
└─ YES commonly done → Software
```

## Implementation Dependency Chain

### Foundation (No dependencies)
1. Complete `/software/typescript` (in progress elsewhere)
2. Create `/software/tailwind` (references Next.js, no system dependencies)
3. Create `/software/shadcn-ui` (references Tailwind + React)

### Core Systems (Depends on Foundation)
4. Create `/systems/email` (uses Resend service + React Email software)
   - Depends on: `/services/resend`, `/software/react-email`
   - References: `/software/nextjs`, `/software/react`

5. Create `/systems/social` (extends existing `/systems/search`)
   - Depends on: `/systems/search` existing
   - References: `/software/nextjs` Metadata API

6. Create `/systems/mobile` (comprehensive mobile architecture)
   - Depends on: `/software/react-native`, `/software/expo`, `/software/nativewind`
   - References: `/software/nextjs`, `/software/react`

### Services Deep Dives (Depends on Foundation + Systems)
7. Create `/services/vercel` (dedicated deep dive)
   - Expands on existing `/services` hub pricing
   - References: `/software/nextjs`, `/systems/*` for deployment

8. Create `/services/supabase` (dedicated deep dive)
   - Expands on existing `/services` hub pricing
   - References: `/systems/authentication`, `/systems/storage`, `/systems/real-time`

9. Create `/services/anthropic` (AI provider deep dive)
   - Expands on existing `/services` hub pricing
   - References: `/software/vercel-ai-sdk`, `/systems/ai-chat`

### Advanced Software (Can be done in parallel)
10. Create `/software/vercel-ai-sdk` (AI development foundation)
    - References: `/software/nextjs`, `/software/react`
    - Used by: `/systems/ai-chat`

11. Create `/software/react-email` (email component library)
    - References: `/software/react`
    - Used by: `/systems/email`

## SEO Documentation Integration Strategy

Based on the 4 SEO guides provided:
- `modern-web-mobile-seo-ui-ux-best-practices.md`
- `seo-ai-era.md`
- `complete-seo-transformation-2025.md`
- `schema-markup-for-ai-content.md`

**Meta-implementation approach:** Don't create a `/best-practices` page. Instead:
1. ✅ Applied schema best practices to `/systems/search` (HowTo, FAQ, Breadcrumbs)
2. ✅ Enhanced knowledge graph with @id, sameAs, isPartOf relationships
3. ✅ Implemented BreadcrumbList across all pages
4. 🎯 Apply AI citation optimization to all new pages (H2→H3 hierarchy, fresh dates)
5. 🎯 Implement mobile-specific optimization in `/systems/mobile`
6. 🎯 Document social sharing optimization in `/systems/social`

## Priority Implementation Order

### Phase 1: Core Software Expansion (Completes foundation)
1. `/software/typescript` (in progress)
2. `/software/tailwind`
3. `/software/shadcn-ui`

### Phase 2: Essential Systems (User-facing features)
4. `/systems/email` (high business value)
5. `/systems/social` (extends search system)
6. `/systems/authentication` (move from hub to dedicated)

### Phase 3: Service Deep Dives (Pricing + integration details)
7. `/services/vercel`
8. `/services/supabase`
9. `/services/anthropic`

### Phase 4: Advanced Capabilities (Specialized use cases)
10. `/software/vercel-ai-sdk`
11. `/systems/ai-chat`
12. `/systems/mobile`

### Phase 5: Additional Software (As needed)
13. `/software/react-email`
14. `/software/zod`
15. `/software/react-native` + `/software/expo` + `/software/nativewind`

## Schema Enhancement Checklist (Apply to all new pages)

Based on research findings from `/systems/search` validation:

### Required for Every Page
- ✅ `@id` for unique entity identification
- ✅ `sameAs` for external authority linking (Wikipedia, Wikidata, GitHub)
- ✅ `isPartOf` for hierarchical relationships
- ✅ `BreadcrumbSchema` component for navigation
- ✅ Fresh `dateModified` within 30 days (3.2x citation boost)

### Conditional Based on Content Type
- Use `HowTo` schema for step-by-step guides (prime SERP placement)
- Use `FAQPage` schema for Q&A sections (28% citation boost)
- Use `WebPage` + `TechArticle` + `@graph` for category pages
- Use H2→H3→bullet hierarchy (40% citation boost)

### Content Freshness Strategy
- Update `dateModified` monthly for high-priority pages
- Add "Last verified: YYYY-MM-DD" timestamps
- Include version numbers for all software (Next.js 15.5.4 not just "Next.js 15")
- Reference current release dates for credibility

## Next Actions

1. **Complete TypeScript page** (being handled in another chat)
2. **Plan and create `/software/tailwind`** - Foundation for UI styling
3. **Plan and create `/software/shadcn-ui`** - Component system
4. **Plan and create `/systems/email`** - High-value business system
5. **Plan and create `/systems/social`** - Extends search optimization

---

**Legend:**
- ✅ Implemented
- 🔄 In progress (other chat)
- 🎯 Priority next (Phases 1-3)
- 📋 Planned (Phases 4-5)
