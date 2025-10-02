# Avolve Monorepo Structure

**Last Updated**: 2025-10-01
**Migration**: Completed October 2025

## Overview

This is a modern monorepo using **Turborepo + pnpm workspaces** following October 2025 best practices for Next.js 15.5, React 19.2, and Supabase projects.

## Structure

```
avolve/
├── apps/
│   ├── web/              # Next.js 15.5 web application
│   └── email/            # (Legacy - migrating to packages/emails)
├── packages/
│   ├── ui/               # Shared UI components (shadcn/ui based)
│   ├── database/         # Supabase types, client, and queries
│   ├── business-logic/   # Shared validation schemas and business rules
│   ├── utils/            # Utility functions (formatting, text, cn helper)
│   ├── emails/           # React Email templates
│   ├── config/           # Shared ESLint/TypeScript configs
│   └── lib/              # Legacy shared library
├── supabase/             # Supabase project configuration
│   └── migrations/       # Database migrations
├── scripts/              # Intelligence and automation scripts
└── docs/                 # Documentation
```

## Package Details

### `@repo/web` (apps/web)
Next.js 15.5 web application with:
- React 19.2 with Server Components
- Tailwind CSS v4
- Vercel AI SDK integration
- TypeScript 5.9

### `@repo/ui` (packages/ui)
Shared UI component library:
- shadcn/ui components
- Radix UI primitives
- Framer Motion animations
- Full TypeScript support

### `@repo/database` (packages/database)
Centralized database layer:
- Supabase client configuration
- TypeScript types generated from schema
- Shared database queries
- Support for both Next.js and Expo environments

### `@repo/business-logic` (packages/business-logic)
Business rules and validation:
- Zod validation schemas
- Shared type definitions
- Common business logic

### `@repo/utils` (packages/utils)
Utility functions:
- `cn()` - Tailwind class merging
- Date/number formatting
- Text manipulation (slugify, truncate, etc.)

### `@repo/emails` (packages/emails)
Email templates and sending:
- React Email templates
- Resend integration
- Welcome and password reset emails

### `@repo/config` (packages/config)
Shared configurations:
- ESLint configurations
- TypeScript configurations
- Tailwind configurations

## Getting Started

```bash
# Install dependencies
pnpm install

# Generate Supabase types
pnpm db:generate-types

# Start development
pnpm dev

# Or start specific app
pnpm dev --filter=web

# Build all packages
pnpm build

# Run tests
pnpm test

# Type check
pnpm type-check

# Lint
pnpm lint
```

## Key Scripts

### Database
- `pnpm db:generate-types` - Generate TypeScript types from Supabase schema
- `pnpm db:push` - Push schema changes to Supabase
- `pnpm db:migrate` - Run migrations

### Development
- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all apps and packages
- `pnpm clean` - Remove all build artifacts and node_modules
- `pnpm reset` - Clean and reinstall dependencies

### Quality
- `pnpm lint` - Lint all packages
- `pnpm type-check` - TypeScript check all packages
- `pnpm test` - Run all tests
- `pnpm quality` - Run lint + type-check + test

## Workspace Imports

Use `@repo/*` imports in your applications:

```typescript
// Import UI components
import { Button, Card } from '@repo/ui'

// Import utilities
import { cn, formatDate, slugify } from '@repo/utils'

// Import database
import { createSupabaseClient, getUserById } from '@repo/database'

// Import validation
import { userRegistrationSchema } from '@repo/business-logic'

// Import email templates
import { WelcomeEmail, sendEmail } from '@repo/emails'
```

## Environment Variables

Required environment variables:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Resend (for emails)
RESEND_API_KEY=your-resend-key

# AI Services (optional)
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key
```

## TypeScript Configuration

Each package extends the root `tsconfig.json` for consistency. Apps use path aliases for workspace packages:

```json
{
  "paths": {
    "@/*": ["./src/*"],
    "@repo/ui": ["../../packages/ui/src"],
    "@repo/database": ["../../packages/database/src"],
    "@repo/utils": ["../../packages/utils/src"]
  }
}
```

## Adding New Packages

1. Create directory: `packages/your-package`
2. Add `package.json` with `@repo/your-package` name
3. Add `tsconfig.json` extending root config
4. Create `src/index.ts` entry point
5. Run `pnpm install`

## Migration Notes

**Migration Date**: October 1, 2025

**Changes Made:**
- Created `@repo/database` package for Supabase
- Created `@repo/utils` package for shared utilities
- Created `@repo/business-logic` package for validation
- Created `@repo/emails` package for email templates
- Renamed all packages from `@unified/*` to `@repo/*`
- Updated TypeScript paths in apps/web
- Added `pnpm db:generate-types` script

**Breaking Changes:**
- All `@unified/*` imports changed to `@repo/*`
- Direct imports from `@/lib/utils` should use `@repo/utils`

## Best Practices

1. **Shared Code**: Put reusable code in packages, not apps
2. **TypeScript**: Always use TypeScript with strict mode
3. **Imports**: Use workspace imports (`@repo/*`) not relative paths
4. **Testing**: Write tests in the same package as the code
5. **Documentation**: Update this file when adding packages

## Troubleshooting

**Cannot find module `@repo/*`:**
- Run `pnpm install` at root
- Check `tsconfig.json` has correct paths
- Restart TypeScript server in your editor

**Type errors after changes:**
- Run `pnpm type-check` to see all errors
- Check package dependencies are correct
- Ensure all packages are built: `pnpm build`

**Changes not reflected:**
- Turborepo caches builds: `pnpm clean` then rebuild
- Restart dev server after package changes
