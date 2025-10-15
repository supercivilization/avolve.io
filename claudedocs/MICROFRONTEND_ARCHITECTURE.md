# Avolve Microfrontend Architecture Plan

## Project Overview

**Goal:** Transform avolve into a Turborepo monorepo with 8 microfrontends using Magic UI Pro templates.

**Current State:**
- Next.js 16 Beta + React 19.2.0
- App Router architecture
- Routes: /solutions, /software, /support, /about, /contact
- MDX content support
- shadcn/ui components

**New State:**
- Turborepo monorepo at `/Users/avolve/dev/active/avolve-new`
- 8 independent microfrontends (Next.js multi-zones)
- Shared packages for common utilities
- Magic UI Pro components across all zones

## Microfrontend Architecture

### Zone Mapping

```
avolve-new/
├── apps/
│   ├── main/              # Root (/) - Startup Template
│   ├── ai-solutions/      # /ai - AI Agent Template
│   ├── developer/         # /dev - Dev Tool Template (with blog)
│   ├── mobile/            # /mobile - Mobile Template
│   ├── product/           # /product - SaaS Template
│   ├── company/           # /company - Portfolio Template
│   ├── updates/           # /updates - Changelog Template
│   └── blog/              # /blog - Blog Template
├── packages/
│   ├── ui/                # Shared UI components (shadcn + Magic UI)
│   ├── config/            # Shared configs (TS, ESLint, Tailwind)
│   ├── types/             # Shared TypeScript types
│   └── utils/             # Shared utilities
└── turbo.json

```

### 1. Main (Startup Template) - `/`
**Purpose:** Company landing page and navigation hub
**Routes:** `/`, `/about`, `/contact`, `/terms`, `/privacy`
**Features:**
- Hero section with company mission
- Feature highlights
- Pricing overview
- Call-to-action sections
- Navigation to all other zones

### 2. AI Solutions (AI Agent Template) - `/ai`
**Purpose:** AI agent and solutions showcase
**Routes:** `/ai`, `/ai/chat-saas`, `/ai/[slug]`
**Features:**
- AI agent feature demonstrations
- Use case showcases
- Integration examples
- Live demos
- Pricing for AI solutions

### 3. Developer (Dev Tool Template) - `/dev`
**Purpose:** Developer tools, documentation, and technical blog
**Routes:** `/dev`, `/dev/software/[slug]`, `/dev/docs`, `/dev/blog`
**Features:**
- Code snippets and examples
- API documentation
- Technical articles (MDX blog)
- Developer resources
- SDK/tool downloads

**Migrated Content:**
- Current `/software/*` routes
- Technical documentation
- Integration guides

### 4. Mobile (Mobile Template) - `/mobile`
**Purpose:** Mobile app showcase and features
**Routes:** `/mobile`, `/mobile/features`, `/mobile/download`
**Features:**
- Interactive app previews
- Mobile-first animations
- App store integration
- Feature walkthroughs
- Platform-specific sections (iOS/Android)

### 5. Product (SaaS Template) - `/product`
**Purpose:** SaaS product landing and conversion
**Routes:** `/product`, `/product/features`, `/product/pricing`, `/product/demo`
**Features:**
- Product feature highlights
- Detailed pricing plans
- Live product demos
- Customer testimonials
- Trial/signup flows

**Migrated Content:**
- Current `/solutions/*` routes
- Product-specific pages

### 6. Company (Portfolio Template) - `/company`
**Purpose:** Company information, team, and case studies
**Routes:** `/company`, `/company/team`, `/company/work`, `/company/contact`
**Features:**
- Team member profiles
- Project portfolio
- Case studies
- Company timeline
- Career opportunities

**Migrated Content:**
- Current `/about` page
- Team information

### 7. Updates (Changelog Template) - `/updates`
**Purpose:** Product updates, releases, and announcements
**Routes:** `/updates`, `/updates/[version]`, `/updates/roadmap`
**Features:**
- Version history
- Release notes
- Feature announcements
- Bug fix tracking
- Roadmap visualization

### 8. Blog (Blog Template) - `/blog`
**Purpose:** Content marketing and thought leadership
**Routes:** `/blog`, `/blog/[slug]`, `/blog/categories/[category]`
**Features:**
- MDX article support
- Dynamic OG images
- SEO optimization
- Category/tag filtering
- Author profiles
- Newsletter signup

## Technical Architecture

### Turborepo Configuration

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "type-check": {
      "dependsOn": ["^type-check"]
    }
  }
}
```

### Shared Packages

#### `packages/ui`
- Magic UI Pro components
- shadcn/ui components
- Custom shared components
- Theme provider
- Design tokens

#### `packages/config`
- ESLint config (extends Next.js)
- TypeScript config (base + Next.js variants)
- Tailwind config (shared theme)
- PostCSS config

#### `packages/types`
- Shared TypeScript interfaces
- API types
- Content types
- Common enums

#### `packages/utils`
- Utility functions
- Helpers
- Constants
- Date/string formatting

### Magic UI Pro Integration

Each app will have its own `components.json`:

```json
{
  "registries": {
    "@magicui-pro": {
      "url": "https://pro.magicui.design/registry/{name}",
      "headers": {
        "Authorization": "Bearer ${MAGICUI_PRO_REGISTRY_TOKEN}"
      }
    }
  }
}
```

**Template-specific components to download:**

1. **Startup Template** (main): `@magicui-pro/startup-*`
2. **AI Agent Template** (ai-solutions): `@magicui-pro/ai-agent-*`
3. **Dev Tool Template** (developer): `@magicui-pro/dev-tool-*`
4. **Mobile Template** (mobile): `@magicui-pro/mobile-*`
5. **SaaS Template** (product): `@magicui-pro/saas-*`
6. **Portfolio Template** (company): `@magicui-pro/portfolio-*`
7. **Changelog Template** (updates): `@magicui-pro/changelog-*`
8. **Blog Template** (blog): `@magicui-pro/blog-*`

### Multi-Zone Routing

Root `next.config.ts` in each app:

```typescript
// apps/main/next.config.ts
export default {
  async rewrites() {
    return [
      {
        source: '/ai/:path*',
        destination: process.env.AI_SOLUTIONS_URL + '/ai/:path*',
      },
      {
        source: '/dev/:path*',
        destination: process.env.DEVELOPER_URL + '/dev/:path*',
      },
      // ... other zones
    ];
  },
};
```

### Environment Configuration

```bash
# .env.local (root)
MAGICUI_PRO_REGISTRY_TOKEN=mui_pro_W3z6fOSz_RrZleG_w7iWzqhQkA5wvf1rP7Hp02GlQ

# Development URLs
MAIN_URL=http://localhost:3000
AI_SOLUTIONS_URL=http://localhost:3001
DEVELOPER_URL=http://localhost:3002
MOBILE_URL=http://localhost:3003
PRODUCT_URL=http://localhost:3004
COMPANY_URL=http://localhost:3005
UPDATES_URL=http://localhost:3006
BLOG_URL=http://localhost:3007

# Production (all on same domain via Vercel)
PRODUCTION_DOMAIN=https://avolve.com
```

## Migration Strategy

### Phase 1: Setup (Dependencies: None)
1. Create `avolve-new` directory structure
2. Initialize Turborepo
3. Set up shared packages (`ui`, `config`, `types`, `utils`)
4. Configure Magic UI Pro registry
5. Set up base Next.js apps for each zone

### Phase 2: Template Integration (Dependencies: Phase 1)
1. Download Magic UI Pro templates for each zone
2. Configure zone-specific routing
3. Set up multi-zone rewrites
4. Implement shared UI package
5. Configure development environment (8 ports)

### Phase 3: Content Migration (Dependencies: Phase 2)
1. Migrate `/solutions/*` → `/product` and `/ai`
2. Migrate `/software/*` → `/dev/software`
3. Migrate `/support/*` → `/dev/docs` or `/updates`
4. Migrate `/about` → `/company`
5. Migrate MDX content to appropriate zones
6. Update internal links and navigation

### Phase 4: Optimization (Dependencies: Phase 3)
1. Implement shared component library
2. Set up cross-zone navigation
3. Configure unified SEO and metadata
4. Implement analytics across zones
5. Set up CI/CD for monorepo
6. Performance optimization per zone

### Phase 5: Deployment (Dependencies: Phase 4)
1. Configure Vercel deployment for each zone
2. Set up custom domain routing
3. Configure edge functions per zone
4. Implement monitoring and observability
5. Launch and DNS cutover

## Development Workflow

### Local Development
```bash
# Run all zones
pnpm dev

# Run specific zone
pnpm dev --filter=main
pnpm dev --filter=ai-solutions

# Build all
pnpm build

# Lint all
pnpm lint

# Type check all
pnpm type-check
```

### Adding Magic UI Components
```bash
# From any app directory
cd apps/main
npx shadcn@latest add @magicui-pro/startup-hero-1
npx shadcn@latest add @magicui-pro/startup-features-1

cd apps/blog
npx shadcn@latest add @magicui-pro/blog-card-1
npx shadcn@latest add @magicui-pro/blog-layout-1
```

## Benefits of This Architecture

1. **Independent Deployment:** Each zone can be deployed independently
2. **Team Autonomy:** Different teams can work on different zones
3. **Technology Flexibility:** Can upgrade/change tech stack per zone
4. **Performance:** Optimized bundle size per zone
5. **Scalability:** Zones can scale independently based on traffic
6. **Code Reuse:** Shared packages reduce duplication
7. **Type Safety:** Shared types ensure consistency
8. **Professional UI:** Magic UI Pro templates provide polished design
9. **SEO Optimization:** Each zone optimized for its content type
10. **Maintenance:** Isolated zones reduce coupling and blast radius

## Next Steps

1. **Approve Architecture:** Review and approve this plan
2. **Initialize Project:** Create `avolve-new` Turborepo structure
3. **Set Up Zones:** Create 8 Next.js apps with Magic UI templates
4. **Migrate Content:** Move existing content to appropriate zones
5. **Test & Deploy:** Test locally, then deploy to Vercel

---

**Created:** October 10, 2025
**Status:** Planning Phase
**Next Action:** Approve architecture and begin Phase 1
