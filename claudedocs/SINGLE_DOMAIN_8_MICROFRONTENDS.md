# Avolve.io: 8 Microfrontends on Single Domain

**Created:** October 10, 2025
**Domain:** `avolve.io` only (no subdomains)
**Magic UI Pro API Key:** `mui_pro_W3z6fOSz_RrZleG_w7iWzqhQkA5wvf1rP7Hp02GlQ`
**Vercel Plan:** Pro ($20/month) ✅

---

## Architecture Overview

**8 Magic UI Templates → 8 Vercel Projects → 1 Domain (`avolve.io`)**

### User Experience (What Users See)

```
✅ avolve.io/                    (Homepage - Startup template)
✅ avolve.io/solutions           (AI Agent template)
✅ avolve.io/software            (Dev Tool template)
✅ avolve.io/systems             (Mobile template)
✅ avolve.io/services            (SaaS template)
✅ avolve.io/support             (Blog template)
✅ avolve.io/about               (Portfolio template)
✅ avolve.io/updates             (Changelog template)
```

**All routes stay on `avolve.io` - no subdomains, no other domains.**

### Behind the Scenes (How It Works)

```
User visits: avolve.io/solutions
            ↓
Shell app (avolve.io) receives request
            ↓
Rewrites to: avolve-solutions.vercel.app/solutions
            ↓
Returns content from Solutions project
            ↓
User sees: avolve.io/solutions (URL never changes!)
```

---

## Project Structure

### Turborepo Monorepo

```
avolve-microfrontends/
├── apps/
│   ├── shell/                    # Vercel Project 1 → avolve.io
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── layout.tsx   # Shared layout with navigation
│   │   │   │   └── page.tsx     # Homepage (Startup template)
│   │   │   └── components/
│   │   │       └── magic-ui/    # Startup template components
│   │   ├── next.config.js       # ⭐ REWRITES to all 7 other projects
│   │   └── package.json
│   │
│   ├── solutions/                # Vercel Project 2 → avolve-solutions.vercel.app
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── solutions/   # Base path must match route
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── ai-chat-saas/
│   │   │   │   │   └── ai-content-generator/
│   │   │   └── components/
│   │   │       └── magic-ui/    # AI Agent template components
│   │   ├── next.config.js
│   │   └── package.json
│   │
│   ├── software/                 # Vercel Project 3 → avolve-software.vercel.app
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   └── software/    # Base path must match route
│   │   │   │       ├── page.tsx
│   │   │   │       ├── nextjs/
│   │   │   │       ├── react/
│   │   │   │       └── playground/
│   │   │   └── components/
│   │   │       └── magic-ui/    # Dev Tool template components
│   │   └── package.json
│   │
│   ├── systems/                  # Vercel Project 4 → avolve-systems.vercel.app
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   └── systems/     # Base path must match route
│   │   │   │       ├── page.tsx
│   │   │   │       ├── mobile/
│   │   │   │       └── auth/
│   │   │   └── components/
│   │   │       └── magic-ui/    # Mobile template components
│   │   └── package.json
│   │
│   ├── services/                 # Vercel Project 5 → avolve-services.vercel.app
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   └── services/    # Base path must match route
│   │   │   │       ├── page.tsx
│   │   │   │       ├── vercel/
│   │   │   │       └── supabase/
│   │   │   └── components/
│   │   │       └── magic-ui/    # SaaS template components
│   │   └── package.json
│   │
│   ├── support/                  # Vercel Project 6 → avolve-support.vercel.app
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   └── support/     # Base path must match route
│   │   │   │       ├── page.tsx
│   │   │   │       └── ai-streaming-errors/
│   │   │   └── components/
│   │   │       └── magic-ui/    # Blog template components
│   │   └── package.json
│   │
│   ├── about/                    # Vercel Project 7 → avolve-about.vercel.app
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   └── about/       # Base path must match route
│   │   │   │       └── page.tsx
│   │   │   └── components/
│   │   │       └── magic-ui/    # Portfolio template components
│   │   └── package.json
│   │
│   └── updates/                  # Vercel Project 8 → avolve-updates.vercel.app
│       ├── src/
│       │   ├── app/
│       │   │   └── updates/     # Base path must match route
│       │   │       ├── page.tsx
│       │   │       ├── 2025-10/
│       │   │       └── latest/
│       │   └── components/
│       │       └── magic-ui/    # Changelog template components
│       └── package.json
│
├── packages/
│   ├── ui-shared/               # Shared components across all apps
│   │   ├── navigation/          # Navigation component (same for all)
│   │   ├── theme/               # Theme provider
│   │   └── footer/              # Footer component
│   │
│   ├── config/                  # Shared configuration
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   └── eslint.config.js
│   │
│   └── types/                   # Shared TypeScript types
│       └── index.ts
│
├── turbo.json                   # Turborepo configuration
├── package.json                 # Root package.json
└── pnpm-workspace.yaml          # pnpm workspace config
```

---

## Critical Configuration: Shell App Rewrites

### Shell App Next.js Config

```javascript
// apps/shell/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Solutions routes
      {
        source: '/solutions',
        destination: 'https://avolve-solutions.vercel.app/solutions',
      },
      {
        source: '/solutions/:path*',
        destination: 'https://avolve-solutions.vercel.app/solutions/:path*',
      },

      // Software routes
      {
        source: '/software',
        destination: 'https://avolve-software.vercel.app/software',
      },
      {
        source: '/software/:path*',
        destination: 'https://avolve-software.vercel.app/software/:path*',
      },

      // Systems routes
      {
        source: '/systems',
        destination: 'https://avolve-systems.vercel.app/systems',
      },
      {
        source: '/systems/:path*',
        destination: 'https://avolve-systems.vercel.app/systems/:path*',
      },

      // Services routes
      {
        source: '/services',
        destination: 'https://avolve-services.vercel.app/services',
      },
      {
        source: '/services/:path*',
        destination: 'https://avolve-services.vercel.app/services/:path*',
      },

      // Support routes
      {
        source: '/support',
        destination: 'https://avolve-support.vercel.app/support',
      },
      {
        source: '/support/:path*',
        destination: 'https://avolve-support.vercel.app/support/:path*',
      },

      // About routes
      {
        source: '/about',
        destination: 'https://avolve-about.vercel.app/about',
      },
      {
        source: '/about/:path*',
        destination: 'https://avolve-about.vercel.app/about/:path*',
      },

      // Updates routes
      {
        source: '/updates',
        destination: 'https://avolve-updates.vercel.app/updates',
      },
      {
        source: '/updates/:path*',
        destination: 'https://avolve-updates.vercel.app/updates/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
```

**Why this works:**
- Rewrites are **server-side proxies** - user never sees the destination URL
- URL bar stays `avolve.io/solutions` while content comes from `avolve-solutions.vercel.app`
- Works for all routes, including dynamic routes like `/solutions/ai-chat-saas`
- No CORS issues because it's a server-side proxy

---

## Shared Navigation (Critical!)

All 8 apps need the **same navigation** for seamless UX.

### Approach: Shared Package

**Create shared navigation package:**

```typescript
// packages/ui-shared/navigation/Navigation.tsx
'use client';

import Link from 'next/link';

export function Navigation() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Avolve.io
          </Link>

          <div className="flex gap-6">
            <Link href="/solutions" className="hover:underline">
              Solutions
            </Link>
            <Link href="/software" className="hover:underline">
              Software
            </Link>
            <Link href="/systems" className="hover:underline">
              Systems
            </Link>
            <Link href="/services" className="hover:underline">
              Services
            </Link>
            <Link href="/support" className="hover:underline">
              Support
            </Link>
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/updates" className="hover:underline">
              Updates
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
```

**Each app imports it:**

```typescript
// apps/solutions/src/app/layout.tsx
import { Navigation } from '@avolve/ui-shared/navigation';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
```

**Package setup:**

```json
// packages/ui-shared/package.json
{
  "name": "@avolve/ui-shared",
  "version": "0.0.0",
  "main": "./index.ts",
  "types": "./index.ts",
  "exports": {
    "./navigation": "./navigation/Navigation.tsx",
    "./theme": "./theme/ThemeProvider.tsx",
    "./footer": "./footer/Footer.tsx"
  }
}
```

**Apps import it:**

```json
// apps/solutions/package.json
{
  "dependencies": {
    "@avolve/ui-shared": "workspace:*"
  }
}
```

---

## Vercel Project Configuration

### 8 Vercel Projects Setup

**All projects link to the SAME GitHub repository**

#### Project 1: Shell (Main Domain)
```
Project Name: avolve-shell
Git Repository: your-org/avolve-microfrontends
Root Directory: apps/shell
Framework Preset: Next.js
Build Command: cd ../.. && pnpm turbo run build --filter=shell
Output Directory: .next
Install Command: pnpm install

Custom Domain: avolve.io ✅
```

#### Project 2: Solutions
```
Project Name: avolve-solutions
Git Repository: your-org/avolve-microfrontends
Root Directory: apps/solutions
Framework Preset: Next.js
Build Command: cd ../.. && pnpm turbo run build --filter=solutions
Output Directory: .next
Install Command: pnpm install

Custom Domain: (none - uses avolve-solutions.vercel.app internally)
```

#### Project 3: Software
```
Project Name: avolve-software
Git Repository: your-org/avolve-microfrontends
Root Directory: apps/software
Framework Preset: Next.js
Build Command: cd ../.. && pnpm turbo run build --filter=software
Output Directory: .next
Install Command: pnpm install

Custom Domain: (none)
```

#### Project 4: Systems
```
Project Name: avolve-systems
Git Repository: your-org/avolve-microfrontends
Root Directory: apps/systems
Framework Preset: Next.js
Build Command: cd ../.. && pnpm turbo run build --filter=systems
Output Directory: .next
Install Command: pnpm install

Custom Domain: (none)
```

#### Project 5: Services
```
Project Name: avolve-services
Git Repository: your-org/avolve-microfrontends
Root Directory: apps/services
Framework Preset: Next.js
Build Command: cd ../.. && pnpm turbo run build --filter=services
Output Directory: .next
Install Command: pnpm install

Custom Domain: (none)
```

#### Project 6: Support
```
Project Name: avolve-support
Git Repository: your-org/avolve-microfrontends
Root Directory: apps/support
Framework Preset: Next.js
Build Command: cd ../.. && pnpm turbo run build --filter=support
Output Directory: .next
Install Command: pnpm install

Custom Domain: (none)
```

#### Project 7: About
```
Project Name: avolve-about
Git Repository: your-org/avolve-microfrontends
Root Directory: apps/about
Framework Preset: Next.js
Build Command: cd ../.. && pnpm turbo run build --filter=about
Output Directory: .next
Install Command: pnpm install

Custom Domain: (none)
```

#### Project 8: Updates
```
Project Name: avolve-updates
Git Repository: your-org/avolve-microfrontends
Root Directory: apps/updates
Framework Preset: Next.js
Build Command: cd ../.. && pnpm turbo run build --filter=updates
Output Directory: .next
Install Command: pnpm install

Custom Domain: (none)
```

---

## Magic UI Pro Setup (Per App)

### Install in Each App

```bash
# Shell app (Startup template)
cd apps/shell
npm install magicui-pro
npx magicui-cli init
# Edit components.json with API key
npx magicui-cli add startup

# Solutions app (AI Agent template)
cd apps/solutions
npm install magicui-pro
npx magicui-cli init
npx magicui-cli add ai-agent

# Software app (Dev Tool template)
cd apps/software
npm install magicui-pro
npx magicui-cli init
npx magicui-cli add dev-tool

# Systems app (Mobile template)
cd apps/systems
npm install magicui-pro
npx magicui-cli init
npx magicui-cli add mobile

# Services app (SaaS template)
cd apps/services
npm install magicui-pro
npx magicui-cli init
npx magicui-cli add saas

# Support app (Blog template)
cd apps/support
npm install magicui-pro
npx magicui-cli init
npx magicui-cli add blog

# About app (Portfolio template)
cd apps/about
npm install magicui-pro
npx magicui-cli init
npx magicui-cli add portfolio

# Updates app (Changelog template)
cd apps/updates
npm install magicui-pro
npx magicui-cli init
npx magicui-cli add changelog
```

### components.json (Same for All Apps)

```json
{
  "registry": {
    "name": "magic-ui-pro",
    "url": "https://pro.magicui.design/r",
    "token": "mui_pro_W3z6fOSz_RrZleG_w7iWzqhQkA5wvf1rP7Hp02GlQ"
  },
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css"
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}
```

---

## Step-by-Step Implementation

### Phase 1: Project Setup (Week 1)

**Step 1: Create Turborepo Monorepo**

```bash
cd ~/dev/active/
npx create-turbo@latest avolve-microfrontends

# Choose:
# - Package manager: pnpm
# - Workspace: apps and packages
```

**Step 2: Create 8 Next.js Apps**

```bash
cd avolve-microfrontends

# Create shell app
pnpm dlx create-next-app@latest apps/shell --typescript --tailwind --app --src-dir

# Create 7 remote apps
pnpm dlx create-next-app@latest apps/solutions --typescript --tailwind --app --src-dir
pnpm dlx create-next-app@latest apps/software --typescript --tailwind --app --src-dir
pnpm dlx create-next-app@latest apps/systems --typescript --tailwind --app --src-dir
pnpm dlx create-next-app@latest apps/services --typescript --tailwind --app --src-dir
pnpm dlx create-next-app@latest apps/support --typescript --tailwind --app --src-dir
pnpm dlx create-next-app@latest apps/about --typescript --tailwind --app --src-dir
pnpm dlx create-next-app@latest apps/updates --typescript --tailwind --app --src-dir
```

**Step 3: Configure Turborepo**

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

**Step 4: Create Shared Packages**

```bash
# Create ui-shared package
mkdir -p packages/ui-shared/navigation
mkdir -p packages/ui-shared/theme
mkdir -p packages/ui-shared/footer

# Create config package
mkdir -p packages/config

# Create types package
mkdir -p packages/types
```

**Step 5: Set Up Workspace**

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### Phase 2: Magic UI Integration (Week 2)

**Step 1: Install Magic UI in Each App**

Run the Magic UI installation commands listed above for each app.

**Step 2: Configure Rewrites in Shell App**

Copy the `next.config.js` configuration from the "Shell App Rewrites" section above.

**Step 3: Set Up Base Paths**

Each remote app must have its content under the correct base path:

```typescript
// apps/solutions/src/app/solutions/page.tsx
export default function SolutionsPage() {
  return <div>Solutions Index</div>;
}

// apps/software/src/app/software/page.tsx
export default function SoftwarePage() {
  return <div>Software Index</div>;
}

// ... etc for all apps
```

**Step 4: Create Shared Navigation**

Implement the shared navigation package as described above.

### Phase 3: Content Migration (Weeks 3-4)

**Week 3: Migrate Core Routes**

1. **Solutions** (`apps/solutions/src/app/solutions/`)
   - Copy from `/Users/avolve/dev/active/avolve/src/app/solutions/`
   - Add AI Agent template components
   - Create new solutions with interactive demos

2. **Software** (`apps/software/src/app/software/`)
   - Copy from `/Users/avolve/dev/active/avolve/src/app/software/`
   - Add Dev Tool template components
   - Create code playgrounds

3. **Systems** (`apps/systems/src/app/systems/`)
   - Copy from `/Users/avolve/dev/active/avolve/src/app/systems/`
   - Add Mobile template components
   - Enhance mobile page with device mockups

**Week 4: Migrate Supporting Routes**

4. **Services** (`apps/services/src/app/services/`)
   - Copy from `/Users/avolve/dev/active/avolve/src/app/services/`
   - Add SaaS template components
   - Create pricing calculators

5. **Support** (`apps/support/src/app/support/`)
   - Copy from `/Users/avolve/dev/active/avolve/src/app/support/`
   - Add Blog template components
   - Format as articles

6. **About** (`apps/about/src/app/about/`)
   - Create new about page with Portfolio template
   - Add mission, timeline, creator profile

7. **Updates** (`apps/updates/src/app/updates/`)
   - Create new updates section with Changelog template
   - Add timeline view and version cards

8. **Shell/Homepage** (`apps/shell/src/app/page.tsx`)
   - Create homepage with Startup template
   - Add hero, features, CTAs

### Phase 4: Vercel Deployment (Week 5)

**Step 1: Push to GitHub**

```bash
git init
git add .
git commit -m "Initial monorepo with 8 Next.js apps"
git remote add origin git@github.com:your-org/avolve-microfrontends.git
git push -u origin main
```

**Step 2: Create 8 Vercel Projects**

For each project, in Vercel Dashboard:
1. New Project → Import Git Repository
2. Select `avolve-microfrontends` repository
3. Configure settings as listed in "Vercel Project Configuration" section above
4. Deploy

**Step 3: Configure Custom Domain**

Only for `avolve-shell` project:
1. Go to Project Settings → Domains
2. Add custom domain: `avolve.io`
3. Update DNS: `CNAME avolve.io → cname.vercel-dns.com`
4. Wait for SSL certificate (automatic)

**Step 4: Update Rewrites with Production URLs**

```javascript
// apps/shell/next.config.js
async rewrites() {
  return [
    {
      source: '/solutions/:path*',
      destination: 'https://avolve-solutions.vercel.app/solutions/:path*',
    },
    // ... all other rewrites
  ];
}
```

**Step 5: Test All Routes**

Visit and verify:
- `avolve.io/` → Homepage works
- `avolve.io/solutions` → Solutions works
- `avolve.io/software` → Software works
- `avolve.io/systems` → Systems works
- `avolve.io/services` → Services works
- `avolve.io/support` → Support works
- `avolve.io/about` → About works
- `avolve.io/updates` → Updates works

### Phase 5: Testing & Optimization (Week 6)

**Performance Testing:**
- [ ] Lighthouse score >90 for all routes
- [ ] Core Web Vitals pass for all pages
- [ ] Test navigation speed between sections
- [ ] Verify rewrites add <100ms latency

**Cross-Browser Testing:**
- [ ] Chrome, Firefox, Safari, Edge
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)
- [ ] Test all 8 routes on each browser

**Functionality Testing:**
- [ ] All cross-layer links work (solutions → systems, etc.)
- [ ] Navigation works from all pages
- [ ] Magic UI components render correctly
- [ ] Shared theme consistent across all apps

---

## Local Development

### Running All Apps Simultaneously

```bash
# Start all 8 apps in parallel
pnpm turbo run dev --parallel

# Apps will run on:
# Shell:      http://localhost:3000
# Solutions:  http://localhost:3001
# Software:   http://localhost:3002
# Systems:    http://localhost:3003
# Services:   http://localhost:3004
# Support:    http://localhost:3005
# About:      http://localhost:3006
# Updates:    http://localhost:3007
```

### Local Development Rewrites

For local development, update shell rewrites to point to localhost:

```javascript
// apps/shell/next.config.js
const isDev = process.env.NODE_ENV === 'development';

const getDestination = (app, path) => {
  const ports = {
    solutions: 3001,
    software: 3002,
    systems: 3003,
    services: 3004,
    support: 3005,
    about: 3006,
    updates: 3007,
  };

  return isDev
    ? `http://localhost:${ports[app]}/${app}${path}`
    : `https://avolve-${app}.vercel.app/${app}${path}`;
};

module.exports = {
  async rewrites() {
    return [
      {
        source: '/solutions/:path*',
        destination: getDestination('solutions', '/:path*'),
      },
      // ... repeat for all apps
    ];
  },
};
```

---

## Benefits of This Architecture

### For Users
✅ **Single domain** - Everything on `avolve.io`
✅ **Fast navigation** - No page reloads between sections
✅ **Consistent UX** - Same navigation, theme, footer everywhere
✅ **SEO friendly** - All content indexed under `avolve.io`

### For Development
✅ **Independent deploys** - Each app deploys separately
✅ **Team scalability** - Different teams can own different apps
✅ **Faster builds** - Turborepo only rebuilds changed apps
✅ **Shared code** - Common components in packages
✅ **Isolated failures** - One app breaking doesn't affect others

### For Business
✅ **Cost effective** - Pro plan ($20/month) supports 60 projects
✅ **No additional domains** - Just `avolve.io`
✅ **8 unique experiences** - Each Magic UI template showcased
✅ **Easy to scale** - Add more apps later without architecture changes

---

## Troubleshooting

### Issue: Rewrites not working

**Symptom:** Visiting `avolve.io/solutions` shows 404

**Fix:**
1. Verify destination URL is correct: `https://avolve-solutions.vercel.app/solutions`
2. Check that Solutions app has content at `/solutions` path
3. Ensure Solutions project is deployed and accessible

### Issue: Navigation broken between apps

**Symptom:** Clicking navigation links causes page reload or 404

**Fix:**
1. Use `next/link` (not `<a>` tags) in navigation
2. Use absolute paths (`/solutions`, not `solutions`)
3. Ensure shared navigation package is imported in all apps

### Issue: Different styling across apps

**Symptom:** Colors, fonts, spacing inconsistent between sections

**Fix:**
1. Share Tailwind config via `packages/config`
2. Import same globals.css in all apps
3. Use shared theme provider from `packages/ui-shared`

### Issue: Build failures in Vercel

**Symptom:** Some apps fail to build, others succeed

**Fix:**
1. Check "Root Directory" setting matches app path
2. Verify build command: `cd ../.. && pnpm turbo run build --filter=<app-name>`
3. Ensure pnpm workspace is configured correctly
4. Check that all dependencies are installed

---

## Success Checklist

### Setup Complete
- [ ] Turborepo monorepo created with 8 apps
- [ ] Magic UI Pro installed in all 8 apps
- [ ] Shared navigation package created
- [ ] Rewrites configured in shell app

### Deployment Complete
- [ ] 8 Vercel projects created from same repo
- [ ] `avolve.io` custom domain added to shell project
- [ ] All projects deployed successfully
- [ ] DNS configured and SSL active

### Testing Complete
- [ ] All 8 routes accessible on `avolve.io`
- [ ] Navigation works between all sections
- [ ] Cross-layer links verified
- [ ] Performance scores >90
- [ ] Mobile responsive

### Migration Complete
- [ ] All 46 existing pages migrated
- [ ] "For AI Assistants" sections added
- [ ] New content created for each domain
- [ ] Updates section launched

---

## Timeline Summary

**Total: 6 weeks (120 hours)**

- **Week 1:** Project setup, Turborepo, shared packages
- **Week 2:** Magic UI installation, rewrite configuration
- **Week 3:** Migrate solutions, software, systems
- **Week 4:** Migrate services, support, about, updates, homepage
- **Week 5:** Vercel deployment, domain configuration
- **Week 6:** Testing, optimization, launch

---

## Next Steps

**Ready to start?**

```bash
# 1. Create the monorepo
cd ~/dev/active/
npx create-turbo@latest avolve-microfrontends

# 2. Follow Phase 1: Project Setup steps above

# 3. Install Magic UI in each app

# 4. Configure rewrites in shell app

# 5. Deploy to Vercel

# 6. Point avolve.io to shell project
```

**All 8 Magic UI templates on a single domain: `avolve.io`** ✅

No subdomains. No other domains. Just `avolve.io` with 8 independent microfrontends behind the scenes.
