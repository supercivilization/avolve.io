# Configuration Standards (November 2025)

Complete configuration standards for Universal React stack with Tamagui Pro/Takeout.

**Last Updated:** November 13, 2025
**Project:** ~/dev/active/takeout/

---

## Core Tech Stack Versions (Verified Nov 13, 2025)

### Universal React Foundation
- **React:** 19.2.0 (same version for web + native)
- **React DOM:** 19.2.0 (web)
- **React Native:** 0.79.2 (native)
- **TypeScript:** 5.8.3
- **Node.js:** 24.8+ (native TypeScript support)

### Web Framework
- **Next.js:** 16.0.1 (stable)
  - Turbopack for development (default)
  - Webpack for production (`--webpack` flag)
  - Pages Router (main app) + App Router (admin features)

### Native Framework
- **Expo SDK:** 53.0.9 (**NOT SDK 54** - incompatible with Tamagui)
- **Hermes:** Default JS engine for React Native
- **Expo Router:** 4.0.15 (file-based routing)
- **EAS:** Build and deployment service

### Universal Design System
- **Tamagui:** 1.137.0 (universal styling)
- **Bento UI:** Premium components (included with Tamagui Pro)
- **Solito:** 5.0.0 (universal navigation - **NOW SUPPORTS APP ROUTER!**)
- **@tamagui/lucide-icons:** Universal icon system

### Backend & Data
- **Supabase:** PostgreSQL with extensions
  - @supabase/supabase-js: 2.48.1
  - @supabase/auth-helpers-nextjs: 0.10.0
  - @supabase/auth-helpers-react: 0.5.0

### Monorepo Tooling
- **Yarn:** 4.1.1 (package management)
- **Turborepo:** 2.5.3 (task orchestration)
- **Ultra-runner:** 3.10.5 (fast watch mode)

---

## Critical Configuration Requirements

### 1. Next.js 16 Configuration

**File:** `apps/next/next.config.js`

```javascript
module.exports = () => {
  let config = {
    // Turbopack configuration (required for Next.js 16)
    turbopack: {
      // Empty config silences warnings
      // Webpack config still works for production
    },

    // TypeScript build errors ignored for Bento UI
    // Run `yarn typecheck` separately
    typescript: {
      ignoreBuildErrors: true
    },

    // Image optimization disabled for universal compatibility
    images: {
      unoptimized: true
    },

    // Required transpilePackages for Universal React
    transpilePackages: [
      'solito',
      'react-native-web',
      'expo-linking',
      'expo-constants',
      'expo-modules-core',
      'expo-image-picker',
      'react-native-gesture-handler',
      '@ts-react/form',
      'react-hook-form',
      'react-native-reanimated',
    ],

    experimental: {
      scrollRestoration: true,
    },
  }

  // Apply Tamagui plugin
  for (const plugin of plugins) {
    config = { ...config, ...plugin(config) }
  }

  return config
}
```

### 2. Proxy Configuration (Not Middleware)

**File:** `apps/next/proxy.ts` (NOT middleware.ts)

Next.js 16 deprecates `middleware.ts` in favor of `proxy.ts`:

```typescript
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(req: NextRequest) {
  const res = NextResponse.next()

  // Public routes - no authentication needed
  if (publicRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    return res
  }

  // Create authenticated Supabase client
  const supabase = createMiddlewareClient({ req, res })

  // Check authentication and handle redirects
  const { data: { user } } = await supabase.auth.getUser()

  // ... authentication logic ...

  return res
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
}
```

### 3. App Router Support (Solito 5.0+)

**Major Update (Nov 13, 2025):** Solito 5.0.0 now supports Next.js App Router!

**Enable in next.config.js:**

```javascript
withTamagui({
  appDir: true, // Enable App Router support
  // ... rest of config
})
```

**App Router Layout (`apps/next/app/layout.tsx`):**

```typescript
'use client'

import { TamaguiProvider } from 'app/provider/tamagui'
import { NextThemeProvider } from '@tamagui/next-theme'

export default function RootLayout({ children }: { children: React.Node }) {
  return (
    <html lang="en">
      <head><link rel="stylesheet" href="/tamagui.css" /></head>
      <body>
        <NextThemeProvider skipNextHead>
          <TamaguiProvider>{children}</TamaguiProvider>
        </NextThemeProvider>
      </body>
    </html>
  )
}
```

**Key Differences:**
- **Hooks**: Use `solito/navigation` for App Router (NOT `solito/router`)
- **Theme Provider**: Requires `skipNextHead` prop
- **Providers**: Simplified stack (no router-dependent providers)
- **Coexistence**: Both `/pages` and `/app` directories work together

### 4. Required Dependencies

**Critical packages for Supabase auth in Next.js 16:**

```json
{
  "dependencies": {
    "webidl-conversions": "latest",
    "whatwg-url": "latest",
    "tr46": "latest"
  }
}
```

These are required by `@supabase/node-fetch` but not automatically installed.

### 4. Package.json Scripts

**Development:**
```json
{
  "scripts": {
    "web": "yarn workspace next-app dev",
    "native": "cd apps/expo && yarn start",
    "ios": "cd apps/expo && yarn ios",
    "android": "cd apps/expo && yarn android"
  }
}
```

**Production:**
```json
{
  "scripts": {
    "web:build": "yarn workspace next-app next:build",
    "next:build": "yarn with-env next build --webpack",
    "next:build:turbopack": "yarn with-env next build"
  }
}
```

**Note:** Use `--webpack` flag for production builds. Turbopack has Flow syntax issues with react-native.

### 5. Version Resolutions

**File:** Root `package.json`

```json
{
  "resolutions": {
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "react-refresh": "^0.14.0",
    "react-native-svg": "15.11.2",
    "react-native-web": "~0.20.0",
    "next": "16.0.1",
    "@babel/core": "^7.26.0",
    "babel-loader": "^8.3.0"
  }
}
```

These enforce version consistency across the monorepo.

---

## Compatibility Rules

### Tamagui Compatibility (CRITICAL)

**Rule:** ALWAYS check Tamagui compatibility before major version upgrades.

**Check:** https://github.com/tamagui/tamagui/issues

**Known Incompatibilities (Nov 2025):**
- ❌ **Expo SDK 54** - NOT compatible (stay on SDK 53)
- ✅ **React 19.2.0** - Works (Takeout pre-configured)
- ⚠️ **Manual React upgrades** - May cause errors

**Safe to Upgrade:**
- ✅ Tamagui patches (1.137.x)
- ✅ Next.js patches (16.0.x)
- ✅ React patches (19.2.x)
- ✅ Supabase packages

### Build System Requirements

**Development:**
- **Turbopack** - Default bundler (10× faster Fast Refresh)
- **Metro** - React Native bundler for Expo

**Production:**
- **Webpack** - Use `--webpack` flag for Next.js production builds
- **Metro** - React Native bundler for Expo builds

**Known Issue:** Turbopack cannot parse React Native Flow syntax
**Workaround:** Use webpack for production builds until Next.js 16 stable

### Native Build Requirements

**iOS:**
- **Xcode 16+** required for Expo SDK 53
- Check: `yarn ios:check-xcode-version`

**Android:**
- **Android Studio** latest
- **Java 17+**

---

## Development Workflow Standards

### 1. Starting Development

```bash
# Terminal 1: Start Supabase
yarn supa:start

# Terminal 2: Start web development
yarn web

# Terminal 3: Start native development
yarn native
```

### 2. Building for Production

```bash
# Build all packages
yarn build

# Build web (uses webpack)
yarn web:build

# Build native
cd apps/expo
yarn eas:build:dev:ios
yarn eas:build:dev:android
```

### 3. Type Checking

```bash
# Check all packages
yarn typecheck

# Watch mode
yarn check:type:watch
```

### 4. Testing

```bash
# Unit tests
yarn test

# E2E tests
yarn test:e2e

# With UI
yarn test:e2e:ui
```

### 5. Linting & Formatting

```bash
# Lint all packages
yarn lint

# Auto-fix
yarn lint:fix
```

---

## Project Structure Standards

```
takeout/
├── apps/
│   ├── next/              # Next.js web app
│   │   ├── pages/         # Pages Router (main app)
│   │   ├── app/           # App Router (admin features)
│   │   └── proxy.ts       # Authentication proxy (NOT middleware.ts)
│   └── expo/              # React Native mobile app
│       ├── app/           # Expo Router screens
│       └── app.config.js  # Expo configuration
├── packages/
│   ├── app/               # Shared screens & features
│   │   ├── features/      # Feature modules
│   │   ├── provider/      # React providers
│   │   ├── utils/         # Utilities
│   │   └── lib/           # Libraries
│   ├── ui/                # Tamagui components + Bento UI
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   └── bento/ # Bento UI premium components
│   │   │   ├── themes/    # Tamagui themes
│   │   │   └── tamagui.config.ts
│   │   └── package.json
│   ├── api/               # tRPC API layer
│   └── supabase/          # Supabase types & migrations
└── supabase/              # Supabase local instance
    ├── migrations/        # Database migrations
    └── seed.sql           # Seed data
```

---

## Error Tracking Configuration

### Native Error Tracking (No Sentry)

**Database:** `supabase/migrations/20250112000000_create_errors_table.sql`

**Provider:** `packages/app/provider/error-tracking-provider.tsx`
- Automatically captures JavaScript errors
- Captures unhandled promise rejections
- Integrated with Supabase auth

**Logging:** `packages/app/lib/error-tracking.ts`
- `logError()` - Manual error logging
- Automatic metadata capture (URL, route, user agent)

**Admin Dashboard:** `apps/next/app/admin/errors/page.tsx`
- Client component using `'use client'`
- Real-time error viewing
- Mark errors as resolved

---

## Environment Variables

### Required for All Environments

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App
NODE_ENV=development|staging|production
```

### Optional Integrations

```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend
RESEND_API_KEY=re_...

# Google Sign In
GOOGLE_IOS_SCHEME=com.googleusercontent.apps...
```

---

## Deployment Configuration

### Vercel (Web)

**Framework Preset:** Next.js
**Build Command:** `yarn web:build`
**Output Directory:** `apps/next/.next`
**Install Command:** `yarn install`

**Environment Variables:**
- All Supabase vars
- All integration vars (Stripe, Resend, etc.)

### Expo EAS (Native)

**Build Profiles:** `apps/expo/eas.json`

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "staging": {
      "distribution": "internal",
      "channel": "staging"
    },
    "production": {
      "channel": "production"
    }
  }
}
```

---

## Common Issues & Solutions

### Issue: "Module not found: Can't resolve 'webidl-conversions'"

**Solution:**
```bash
yarn add webidl-conversions whatwg-url tr46
```

### Issue: "middleware.ts is deprecated"

**Solution:**
```bash
mv apps/next/middleware.ts apps/next/proxy.ts
```

Update function name from `middleware()` to `proxy()`.

### Issue: Turbopack build fails with React Native Flow syntax

**Solution:**
Use webpack for production builds:
```bash
yarn web:build  # Uses --webpack flag
```

### Issue: Expo SDK 54 compatibility

**Solution:**
DO NOT upgrade to Expo SDK 54. Stay on SDK 53 until Tamagui compatibility confirmed.

Check: https://github.com/tamagui/tamagui/issues

### Issue: TypeScript errors in Bento UI components

**Expected:** TypeScript CLI errors for Tamagui shorthands are normal.

The IDE plugin makes them work, but `tsc` doesn't execute plugins.

**Solution:**
- Build with `typescript: { ignoreBuildErrors: true }` in next.config.js
- Run `yarn typecheck` separately to check your own code

---

## Best Practices (Nov 2025)

### 1. Version Management

- ✅ Always check Tamagui compatibility before major upgrades
- ✅ Use `yarn upgrade:tamagui` for Tamagui updates
- ✅ Keep React versions consistent across web and native
- ✅ Test on both platforms after dependency updates

### 2. Code Organization

- ✅ Shared features in `packages/app/features/`
- ✅ Shared components in `packages/ui/src/components/`
- ✅ Platform-specific code in `.web.tsx` / `.native.tsx` files
- ✅ Universal navigation with Solito

### 3. Type Safety

- ✅ Strict TypeScript configuration
- ✅ End-to-end type safety with tRPC
- ✅ Shared types in `packages/supabase/types/`
- ✅ Run `yarn typecheck` before commits

### 4. Performance

- ✅ Use Turbopack for development (fast)
- ✅ Use webpack for production (stable)
- ✅ Enable Tamagui extraction in production
- ✅ Optimize images with next/image

### 5. Security

- ✅ Row Level Security (RLS) on all Supabase tables
- ✅ Service role key only on server
- ✅ Environment variables never in client code
- ✅ Authentication in proxy.ts

---

## Monitoring & Observability

### Development

- **Next.js Dev Server:** http://localhost:3000
- **Expo Dev Tools:** Automatic on `yarn native`
- **Supabase Studio:** http://localhost:54323

### Production

- **Vercel Analytics:** Built-in web analytics
- **Expo Analytics:** Built-in mobile analytics
- **Supabase Dashboard:** Database monitoring
- **Custom Error Tracking:** Admin dashboard at `/admin/errors`

---

## Upgrade Path (When Available)

### Next.js 16 Stable (Future)

When Next.js 16 reaches stable:
1. ✅ Keep turbopack configuration
2. ✅ Continue using webpack for production until Flow syntax support
3. ✅ Monitor Next.js release notes

### Expo SDK 54 (Future)

When Tamagui confirms SDK 54 compatibility:
1. ✅ Check Tamagui GitHub issues first
2. ✅ Wait for official Tamagui support announcement
3. ✅ Test thoroughly on both iOS and Android
4. ✅ Verify all Bento UI components work

### React 20 (Future)

When React 20 is released:
1. ✅ Check Tamagui compatibility first
2. ✅ Wait for official Tamagui support
3. ✅ Test on both web and native
4. ✅ Verify React Native compatibility

---

## Summary

Your Universal React stack is configured according to November 2025 best practices:

- ✅ Latest stable versions (Next.js 16, React 19.2, Expo SDK 53)
- ✅ Tamagui compatibility verified
- ✅ Next.js 16 proxy configuration (not middleware)
- ✅ Required dependencies installed
- ✅ Hybrid monorepo tooling (Turborepo + Ultra-runner)
- ✅ Development and production builds working
- ✅ Native error tracking implemented
- ✅ Type safety across all platforms

**Status:** Production-ready ✅
