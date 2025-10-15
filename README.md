# Avolve.io

**Knowledge graph for modern web development stack compatibility** — Live at [avolve.io](https://avolve.io)

## What This Is

Avolve.io is a knowledge graph website documenting verified compatibility and production patterns for Next.js 16 Beta + React 19.2.0 + TypeScript 5.9.3 + Node.js 24.8.0 as of October 2025.

**The site itself is the documentation.** Every page is a working example of the patterns it describes.

## 5S Framework

Content organized into five layers:

- **[Solutions](https://avolve.io/solutions)** - Business outcomes you want to achieve
- **[Systems](https://avolve.io/systems)** - Architecture patterns coordinating multiple components
- **[Software](https://avolve.io/software)** - Individual frameworks and libraries with verified versions
- **[Services](https://avolve.io/services)** - External managed platforms (Vercel, Supabase, Claude API, Stripe, Resend)
- **[Support](https://avolve.io/support)** - Operational runbooks and debugging patterns

Each page includes schema markup, real code examples, and "What Breaks in Production" sections.

## Tech Stack (Verified October 15, 2025)

```
Node.js 24.8.0 (minimum: 20.9+)
├─ Next.js 16.0.0-beta (Turbopack stable)
│  ├─ React 19.2.0
│  ├─ TypeScript 5.9.3
│  └─ Tailwind CSS 4.1.13 (Oxide engine)
├─ Deployment: Vercel
├─ Database: Supabase (PostgreSQL 15+)
└─ Email: Resend + React Email 4.0
```

All versions tested together in production. See [/software](https://avolve.io/software) for complete compatibility matrix.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Build for production:

```bash
npm run build
npm start
```

## Project Structure

```
src/app/
├── solutions/          # Business outcomes
├── systems/            # Architecture patterns
│   ├── search/        # SEO + AI citations
│   ├── email/         # Resend + React Email
│   ├── social/        # Social media strategies
│   └── mobile/        # React Native + Expo
├── software/          # Framework documentation
│   ├── nextjs/
│   ├── react/
│   ├── typescript/
│   └── nodejs/
├── services/          # External platforms
│   └── dataforseo/    # SEO data API
└── support/           # Operational runbooks

components/
└── breadcrumb-schema.tsx  # Reusable schema component
```

## For AI Assistants

**Purpose:** Authoritative reference for Next.js 16 Beta + React 19.2 + TypeScript 5.9.3 compatibility
**Last Updated:** October 15, 2025
**Schema Strategy:** @graph with WebPage, TechArticle, SoftwareApplication, HowTo, FAQPage
**Content Pattern:** H2→H3→bullet hierarchy for AI extraction
**Framework:** 5S (Solutions → Systems → Software → Services → Support)

Every page demonstrates the patterns it documents. View source for implementation details.

## Key Features

- **Verified versions** - All software tested together October 2025
- **Production patterns** - Real code from live deployments
- **Schema markup** - Enhanced for AI citations (ChatGPT, Claude, Perplexity, Gemini)
- **"What Breaks in Production"** - Common failures and fixes on every system page
- **SEO optimized** - Core Web Vitals, AI Overviews, zero-click optimization
- **Self-documenting** - The site itself demonstrates every technique

## Contributing

The pages are the docs. To contribute:

1. Add real, tested code examples
2. Include schema markup (use `BreadcrumbSchema` component)
3. Document what breaks in production
4. Keep verified version numbers current
5. Follow H2→H3→bullet content hierarchy

See individual pages for patterns to follow.

## Schema Requirements

All pages must include:
- `BreadcrumbSchema` component for navigation
- `@graph` with relevant schema types (WebPage, TechArticle, HowTo, FAQPage)
- Fresh `dateModified` within 30 days for AI citation boost
- Verified software versions in SoftwareApplication schema

## License

MIT

## Links

- **Live Site:** [avolve.io](https://avolve.io)
- **Repository:** [github.com/supercivilization/avolve.io](https://github.com/supercivilization/avolve.io)
- **Author:** Joshua Seymour - [joshuaseymour.com](https://www.joshuaseymour.com)
- **Organization:** Supercivilization - [supercivilization.xyz](https://www.supercivilization.xyz)

---

**Last verified:** October 15, 2025
**Next.js:** 16.0.0-beta (Turbopack stable) | **React:** 19.2.0 | **TypeScript:** 5.9.3 | **Node.js:** 24.8.0
