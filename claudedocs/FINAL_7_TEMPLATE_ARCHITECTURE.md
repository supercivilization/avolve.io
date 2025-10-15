# Avolve.io: Final 7-Template Architecture

**Created:** October 10, 2025
**Location:** `~/dev/active/avolve-new/`
**Domain:** `avolve.io` (single domain, no subdomains)
**Magic UI Pro API Key:** `mui_pro_W3z6fOSz_RrZleG_w7iWzqhQkA5wvf1rP7Hp02GlQ`

---

## Template Mapping (Final Decision)

| Route | Template | Magic UI Components | Purpose |
|-------|----------|-------------------|---------|
| `/` | **Startup** | Hero, Features, CTA, Social Proof | Landing page, marketing |
| `/solutions` | **AI Agent** | Chat UI, Streaming, Agent Dashboard | AI SaaS examples with demos |
| `/systems` | **Dev Tool** | Code Blocks, API Explorer, Terminals | Architecture patterns (technical) |
| `/software` | **Blog** | Article Layout, Reading Progress, TOC | Technical guides as articles |
| `/services` | **SaaS** | Pricing Tables, Feature Comparison | Service pricing & comparisons |
| `/support` | **Changelog** | Timeline, Version Cards, Updates | Production runbooks as timeline |
| `/about` | **Portfolio** | Profile, Timeline, Case Studies | Mission, story, creator profile |

**Excluded:** Mobile Template (not needed for current scope)

---

## Project Structure: `~/dev/active/avolve-new/`

```
avolve-new/
├── apps/
│   ├── shell/                           # Vercel Project 1 → avolve.io
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── layout.tsx          # Root layout with nav
│   │   │   │   └── page.tsx            # Homepage (Startup)
│   │   │   └── components/
│   │   │       └── magic-ui/           # Startup components
│   │   ├── next.config.js              # Rewrites to 6 other apps
│   │   └── package.json
│   │
│   ├── solutions/                       # Vercel Project 2
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   └── solutions/
│   │   │   │       ├── page.tsx
│   │   │   │       └── ai-chat-saas/
│   │   │   └── components/
│   │   │       └── magic-ui/           # AI Agent components
│   │   └── package.json
│   │
│   ├── systems/                         # Vercel Project 3
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   └── systems/
│   │   │   │       ├── page.tsx
│   │   │   │       ├── auth/
│   │   │   │       └── search/
│   │   │   └── components/
│   │   │       └── magic-ui/           # Dev Tool components
│   │   └── package.json
│   │
│   ├── software/                        # Vercel Project 4
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   └── software/
│   │   │   │       ├── page.tsx
│   │   │   │       ├── nextjs/
│   │   │   │       └── react/
│   │   │   └── components/
│   │   │       └── magic-ui/           # Blog components
│   │   └── package.json
│   │
│   ├── services/                        # Vercel Project 5
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   └── services/
│   │   │   │       ├── page.tsx
│   │   │   │       ├── vercel/
│   │   │   │       └── supabase/
│   │   │   └── components/
│   │   │       └── magic-ui/           # SaaS components
│   │   └── package.json
│   │
│   ├── support/                         # Vercel Project 6
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   └── support/
│   │   │   │       ├── page.tsx
│   │   │   │       └── ai-streaming-errors/
│   │   │   └── components/
│   │   │       └── magic-ui/           # Changelog components
│   │   └── package.json
│   │
│   └── about/                           # Vercel Project 7
│       ├── src/
│       │   ├── app/
│       │   │   └── about/
│       │   │       └── page.tsx
│       │   └── components/
│       │       └── magic-ui/           # Portfolio components
│       └── package.json
│
├── packages/
│   ├── ui-shared/                      # Shared components
│   │   ├── navigation/Navigation.tsx
│   │   ├── footer/Footer.tsx
│   │   └── theme/ThemeProvider.tsx
│   │
│   ├── config/                         # Shared config
│   │   ├── tailwind.config.ts
│   │   └── tsconfig.json
│   │
│   └── types/                          # Shared types
│       └── index.ts
│
├── turbo.json
├── package.json
└── pnpm-workspace.yaml
```

---

## Quick Start Commands

### Step 1: Create Project

```bash
cd ~/dev/active/

# Create Turborepo
npx create-turbo@latest avolve-new

# Choose:
# - Package manager: pnpm
# - Include apps: yes
# - Include packages: yes

cd avolve-new
```

### Step 2: Create 7 Next.js Apps

```bash
# Shell (root/homepage)
pnpm dlx create-next-app@latest apps/shell \
  --typescript --tailwind --app --src-dir --import-alias "@/*"

# Solutions
pnpm dlx create-next-app@latest apps/solutions \
  --typescript --tailwind --app --src-dir --import-alias "@/*"

# Systems
pnpm dlx create-next-app@latest apps/systems \
  --typescript --tailwind --app --src-dir --import-alias "@/*"

# Software
pnpm dlx create-next-app@latest apps/software \
  --typescript --tailwind --app --src-dir --import-alias "@/*"

# Services
pnpm dlx create-next-app@latest apps/services \
  --typescript --tailwind --app --src-dir --import-alias "@/*"

# Support
pnpm dlx create-next-app@latest apps/support \
  --typescript --tailwind --app --src-dir --import-alias "@/*"

# About
pnpm dlx create-next-app@latest apps/about \
  --typescript --tailwind --app --src-dir --import-alias "@/*"
```

### Step 3: Install Magic UI in Each App

```bash
# Shell - Startup Template
cd apps/shell
npm install magicui-pro
npx magicui-cli init
# Edit components.json with API key: mui_pro_W3z6fOSz_RrZleG_w7iWzqhQkA5wvf1rP7Hp02GlQ
npx magicui-cli add startup
cd ../..

# Solutions - AI Agent Template
cd apps/solutions
npm install magicui-pro
npx magicui-cli init
npx magicui-cli add ai-agent
cd ../..

# Systems - Dev Tool Template
cd apps/systems
npm install magicui-pro
npx magicui-cli init
npx magicui-cli add dev-tool
cd ../..

# Software - Blog Template
cd apps/software
npm install magicui-pro
npx magicui-cli init
npx magicui-cli add blog
cd ../..

# Services - SaaS Template
cd apps/services
npm install magicui-pro
npx magicui-cli init
npx magicui-cli add saas
cd ../..

# Support - Changelog Template
cd apps/support
npm install magicui-pro
npx magicui-cli init
npx magicui-cli add changelog
cd ../..

# About - Portfolio Template
cd apps/about
npm install magicui-pro
npx magicui-cli init
npx magicui-cli add portfolio
cd ../..
```

### Step 4: Configure Shell Rewrites

```javascript
// apps/shell/next.config.js
const isDev = process.env.NODE_ENV === 'development';

const getDestination = (app, path) => {
  const ports = {
    solutions: 3001,
    systems: 3002,
    software: 3003,
    services: 3004,
    support: 3005,
    about: 3006,
  };

  if (isDev) {
    return `http://localhost:${ports[app]}${path}`;
  }

  return `https://avolve-${app}.vercel.app${path}`;
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Solutions
      {
        source: '/solutions',
        destination: getDestination('solutions', '/solutions'),
      },
      {
        source: '/solutions/:path*',
        destination: getDestination('solutions', '/solutions/:path*'),
      },

      // Systems
      {
        source: '/systems',
        destination: getDestination('systems', '/systems'),
      },
      {
        source: '/systems/:path*',
        destination: getDestination('systems', '/systems/:path*'),
      },

      // Software
      {
        source: '/software',
        destination: getDestination('software', '/software'),
      },
      {
        source: '/software/:path*',
        destination: getDestination('software', '/software/:path*'),
      },

      // Services
      {
        source: '/services',
        destination: getDestination('services', '/services'),
      },
      {
        source: '/services/:path*',
        destination: getDestination('services', '/services/:path*'),
      },

      // Support
      {
        source: '/support',
        destination: getDestination('support', '/support'),
      },
      {
        source: '/support/:path*',
        destination: getDestination('support', '/support/:path*'),
      },

      // About
      {
        source: '/about',
        destination: getDestination('about', '/about'),
      },
      {
        source: '/about/:path*',
        destination: getDestination('about', '/about/:path*'),
      },
    ];
  },
};

module.exports = nextConfig;
```

### Step 5: Create Base Paths in Each App

**Important:** Each app must serve content under its matching path.

```bash
# Solutions
mkdir -p apps/solutions/src/app/solutions
echo "export default function SolutionsPage() { return <div>Solutions</div> }" > apps/solutions/src/app/solutions/page.tsx

# Systems
mkdir -p apps/systems/src/app/systems
echo "export default function SystemsPage() { return <div>Systems</div> }" > apps/systems/src/app/systems/page.tsx

# Software
mkdir -p apps/software/src/app/software
echo "export default function SoftwarePage() { return <div>Software</div> }" > apps/software/src/app/software/page.tsx

# Services
mkdir -p apps/services/src/app/services
echo "export default function ServicesPage() { return <div>Services</div> }" > apps/services/src/app/services/page.tsx

# Support
mkdir -p apps/support/src/app/support
echo "export default function SupportPage() { return <div>Support</div> }" > apps/support/src/app/support/page.tsx

# About
mkdir -p apps/about/src/app/about
echo "export default function AboutPage() { return <div>About</div> }" > apps/about/src/app/about/page.tsx
```

### Step 6: Create Shared Navigation

```bash
# Create shared package
mkdir -p packages/ui-shared/navigation
```

```typescript
// packages/ui-shared/navigation/Navigation.tsx
'use client';

import Link from 'next/link';

export function Navigation() {
  return (
    <nav className="border-b bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Avolve.io
          </Link>

          <div className="flex gap-6">
            <Link
              href="/solutions"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              Solutions
            </Link>
            <Link
              href="/systems"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              Systems
            </Link>
            <Link
              href="/software"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              Software
            </Link>
            <Link
              href="/services"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              Services
            </Link>
            <Link
              href="/support"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              Support
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
```

```json
// packages/ui-shared/package.json
{
  "name": "@avolve/ui-shared",
  "version": "0.0.0",
  "main": "./index.ts",
  "types": "./index.ts",
  "exports": {
    "./navigation": "./navigation/Navigation.tsx"
  },
  "dependencies": {
    "next": "^15.5.5",
    "react": "^19.2.0"
  }
}
```

### Step 7: Configure Turborepo

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "type-check": {}
  }
}
```

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### Step 8: Run Locally

```bash
# Start all 7 apps in parallel
pnpm turbo run dev --parallel

# Apps run on:
# Shell:     http://localhost:3000 (homepage + rewrites)
# Solutions: http://localhost:3001
# Systems:   http://localhost:3002
# Software:  http://localhost:3003
# Services:  http://localhost:3004
# Support:   http://localhost:3005
# About:     http://localhost:3006

# Visit http://localhost:3000 to see shell app
# Visit http://localhost:3000/solutions (proxies to 3001)
# Visit http://localhost:3000/systems (proxies to 3002)
# etc.
```

---

## Content Migration Plan

### Week 1: Setup (Complete steps 1-8 above)
- ✅ Create Turborepo monorepo
- ✅ Create 7 Next.js apps
- ✅ Install Magic UI in all apps
- ✅ Configure rewrites
- ✅ Create shared navigation
- ✅ Test local development

### Week 2: Migrate Core Content

**Solutions** (AI Agent Template)
```bash
# Copy from old avolve
cp -r ~/dev/active/avolve/src/app/solutions/* \
      ~/dev/active/avolve-new/apps/solutions/src/app/solutions/

# Add AI Agent components
# - Chat UI for interactive demos
# - Streaming indicators
# - Cost calculators
```

**Systems** (Dev Tool Template)
```bash
# Copy from old avolve
cp -r ~/dev/active/avolve/src/app/systems/* \
      ~/dev/active/avolve-new/apps/systems/src/app/systems/

# Add Dev Tool components
# - Code blocks with syntax highlighting
# - Interactive terminals
# - API explorers
```

**Software** (Blog Template)
```bash
# Copy from old avolve
cp -r ~/dev/active/avolve/src/app/software/* \
      ~/dev/active/avolve-new/apps/software/src/app/software/

# Add Blog components
# - Article layouts
# - Reading progress
# - Table of contents
```

### Week 3: Migrate Services & Support

**Services** (SaaS Template)
```bash
# Copy from old avolve
cp -r ~/dev/active/avolve/src/app/services/* \
      ~/dev/active/avolve-new/apps/services/src/app/services/

# Add SaaS components
# - Pricing comparison tables
# - Feature grids
# - Upgrade triggers
```

**Support** (Changelog Template)
```bash
# Copy from old avolve
cp -r ~/dev/active/avolve/src/app/support/* \
      ~/dev/active/avolve-new/apps/support/src/app/support/

# Add Changelog components
# - Timeline view of runbooks
# - Version cards
# - Update badges
```

### Week 4: Create New Pages

**Homepage** (Startup Template)
```bash
# Create new homepage with Startup template
# - Hero section: "Technical Knowledge Base for AI Assistants"
# - Feature grid: 6 main sections
# - Social proof: AI citation examples
# - CTAs: Browse sections
```

**About** (Portfolio Template)
```bash
# Create about page with Portfolio template
# - Mission statement
# - Project timeline
# - Creator profile
# - How avolve.io is built
```

### Week 5: Deploy to Vercel

**Create 7 Vercel Projects:**

1. **avolve-shell**
   - Root Directory: `apps/shell`
   - Custom Domain: `avolve.io`

2. **avolve-solutions**
   - Root Directory: `apps/solutions`

3. **avolve-systems**
   - Root Directory: `apps/systems`

4. **avolve-software**
   - Root Directory: `apps/software`

5. **avolve-services**
   - Root Directory: `apps/services`

6. **avolve-support**
   - Root Directory: `apps/support`

7. **avolve-about**
   - Root Directory: `apps/about`

**Deploy:**
```bash
# Push to GitHub
git init
git add .
git commit -m "Initial 7-app architecture with Magic UI"
git remote add origin git@github.com:your-org/avolve-new.git
git push -u origin main

# Import in Vercel (7 times, same repo, different root dirs)
```

**Switch Domain:**
```bash
# Once tested at avolve-new.vercel.app:
# 1. Remove avolve.io from old project
# 2. Add avolve.io to avolve-shell project
# 3. DNS automatically updates
```

---

## Template Usage Guide

### 1. Startup Template (Homepage)

**Components to Use:**
- Hero section with gradient background
- Feature grid (6 cards for each section)
- Social proof section
- CTA buttons
- Animated elements

**Content:**
```typescript
// apps/shell/src/app/page.tsx
import { Hero, FeatureGrid, SocialProof } from '@/components/magic-ui/startup';

export default function HomePage() {
  return (
    <>
      <Hero
        title="Technical Knowledge Base for AI Assistants"
        subtitle="Verified solutions, systems, software, services, and support for Next.js + AI stack"
      />
      <FeatureGrid features={[
        { title: "Solutions", href: "/solutions", icon: "..." },
        { title: "Systems", href: "/systems", icon: "..." },
        { title: "Software", href: "/software", icon: "..." },
        { title: "Services", href: "/services", icon: "..." },
        { title: "Support", href: "/support", icon: "..." },
        { title: "About", href: "/about", icon: "..." },
      ]} />
      <SocialProof citations={["ChatGPT", "Claude", "Gemini"]} />
    </>
  );
}
```

### 2. AI Agent Template (Solutions)

**Components to Use:**
- Chat interface with streaming
- Agent dashboard
- Tool calling UI
- Loading states

**Example:**
```typescript
// apps/solutions/src/app/solutions/ai-chat-saas/page.tsx
import { ChatInterface, StreamingIndicator } from '@/components/magic-ui/ai-agent';

export default function AIChatSaaSPage() {
  return (
    <div>
      <h1>AI Chat SaaS Solution</h1>
      <ChatInterface
        systemPrompt="AI customer support assistant"
        model="claude-3-7-sonnet"
      />
    </div>
  );
}
```

### 3. Dev Tool Template (Systems)

**Components to Use:**
- Code blocks with syntax highlighting
- API explorer
- Interactive terminals
- Copy buttons

**Example:**
```typescript
// apps/systems/src/app/systems/auth/page.tsx
import { CodeBlock, APIExplorer } from '@/components/magic-ui/dev-tool';

export default function AuthSystemPage() {
  return (
    <div>
      <h1>Authentication System</h1>
      <CodeBlock
        language="typescript"
        code={`// Middleware authentication...`}
      />
      <APIExplorer
        endpoints={[
          { method: "POST", path: "/api/auth/login" },
          { method: "GET", path: "/api/auth/session" },
        ]}
      />
    </div>
  );
}
```

### 4. Blog Template (Software)

**Components to Use:**
- Article layout
- Reading progress bar
- Table of contents
- Author cards

**Example:**
```typescript
// apps/software/src/app/software/nextjs/page.tsx
import { ArticleLayout, ReadingProgress, TOC } from '@/components/magic-ui/blog';

export default function NextJSPage() {
  return (
    <ArticleLayout>
      <ReadingProgress />
      <TOC sections={["Installation", "Configuration", "Deployment"]} />
      <article>
        <h1>Next.js 15.5 Guide</h1>
        {/* Article content */}
      </article>
    </ArticleLayout>
  );
}
```

### 5. SaaS Template (Services)

**Components to Use:**
- Pricing tables
- Feature comparison
- Upgrade triggers
- Plan cards

**Example:**
```typescript
// apps/services/src/app/services/vercel/page.tsx
import { PricingTable, FeatureComparison } from '@/components/magic-ui/saas';

export default function VercelPage() {
  return (
    <div>
      <h1>Vercel Service</h1>
      <PricingTable
        tiers={[
          { name: "Hobby", price: "$0", features: [...] },
          { name: "Pro", price: "$20", features: [...] },
          { name: "Enterprise", price: "Custom", features: [...] },
        ]}
      />
      <FeatureComparison />
    </div>
  );
}
```

### 6. Changelog Template (Support)

**Components to Use:**
- Timeline view
- Version cards
- Update badges
- Change entries

**Example:**
```typescript
// apps/support/src/app/support/page.tsx
import { Timeline, VersionCard, UpdateBadge } from '@/components/magic-ui/changelog';

export default function SupportPage() {
  return (
    <div>
      <h1>Production Support Runbooks</h1>
      <Timeline>
        <VersionCard
          version="AI Streaming Errors"
          date="Oct 5, 2025"
          changes={["Fix timeout issues", "Add retry logic"]}
        />
        <VersionCard
          version="Connection Pool Exhaustion"
          date="Oct 3, 2025"
          changes={["Enable pooler", "Increase limits"]}
        />
      </Timeline>
    </div>
  );
}
```

### 7. Portfolio Template (About)

**Components to Use:**
- Profile section
- Timeline
- Project showcase
- Skills/tech stack

**Example:**
```typescript
// apps/about/src/app/about/page.tsx
import { Profile, Timeline, TechStack } from '@/components/magic-ui/portfolio';

export default function AboutPage() {
  return (
    <div>
      <Profile
        name="Avolve.io"
        mission="Help AI assistants provide accurate technical guidance"
      />
      <Timeline events={[
        { date: "Oct 2025", title: "Launch", description: "..." },
        { date: "Nov 2025", title: "100K citations", description: "..." },
      ]} />
      <TechStack
        stack={["Next.js 15.5", "React 19.2", "TypeScript 5.9", "Vercel"]}
      />
    </div>
  );
}
```

---

## Success Checklist

### Setup Complete
- [ ] Created `~/dev/active/avolve-new/` Turborepo
- [ ] Created 7 Next.js apps
- [ ] Installed Magic UI in all 7 apps
- [ ] Configured rewrites in shell app
- [ ] Created shared navigation
- [ ] Tested local development (all apps running)

### Content Migrated
- [ ] Solutions content migrated with AI Agent components
- [ ] Systems content migrated with Dev Tool components
- [ ] Software content migrated with Blog components
- [ ] Services content migrated with SaaS components
- [ ] Support content migrated with Changelog components
- [ ] Homepage created with Startup template
- [ ] About page created with Portfolio template

### Deployment Complete
- [ ] 7 Vercel projects created
- [ ] All projects deployed successfully
- [ ] Custom domain `avolve.io` added to shell
- [ ] All routes tested and working
- [ ] Cross-links verified

### Quality Assured
- [ ] Navigation works across all apps
- [ ] URLs stay on `avolve.io` domain
- [ ] Performance >90 on all routes
- [ ] Mobile responsive
- [ ] "For AI Assistants" sections present

---

## Timeline

**Total: 5 weeks (100 hours)**

- **Week 1:** Setup Turborepo, 7 apps, Magic UI installation
- **Week 2:** Migrate solutions, systems, software
- **Week 3:** Migrate services, support, create homepage & about
- **Week 4:** Deploy 7 Vercel projects, test
- **Week 5:** Switch domain, monitor, polish

---

## Final Architecture Summary

```
avolve.io (single domain)
  ├── /              → Shell app (Startup)
  ├── /solutions     → Solutions app (AI Agent)
  ├── /systems       → Systems app (Dev Tool)
  ├── /software      → Software app (Blog)
  ├── /services      → Services app (SaaS)
  ├── /support       → Support app (Changelog)
  └── /about         → About app (Portfolio)

7 Vercel Projects → 7 Magic UI Templates → 1 Domain
```

**Ready to start building!**
