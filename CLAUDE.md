# Avolve - Claude Code Project Instructions

> Project-specific instructions for Claude Code when working on this codebase.
> For AI assistant guidelines, see [AGENTS.md](./AGENTS.md)

## Project Overview

Avolve is a **Universal React application** (web + native) for solopreneur business management.

**Status**: Active development, product direction being refined

### Tech Stack
- **Next.js 16** - Web framework with App Router
- **Expo SDK 54** - Native mobile (iOS/Android)
- **Tamagui** - Universal design system
- **Supabase** - Backend (PostgreSQL, Auth, Realtime, Edge Functions)
- **Vercel AI SDK 6.0 + Google Gemini** - AI/LLM (cost-optimized)

### Architecture
```
apps/
├── next/           # Next.js web app (Pages Router + App Router migration)
└── expo/           # React Native app

packages/
├── app/            # Shared feature code (screens, hooks, components)
├── ui/             # Tamagui UI components (@my/ui)
├── api/            # tRPC API definitions
└── supabase/       # Database types

supabase/
├── migrations/     # SQL migrations
└── functions/      # Edge Functions
```

## Current Features

### Brain (AI Knowledge Management)
- Location: `packages/app/features/brain/`
- RAG-based chat with hybrid search (vector + text)
- Real-time typing indicators and presence via Supabase Realtime
- FlashList for native, ScrollView fallback for web

### Dashboard
- Location: `packages/app/features/dashboard/`
- C-Suite Framework screens (CEO, CMO, CVO, COO, CFO)
- Airplane metaphor for business operations

### Authentication
- Location: `packages/app/features/auth/`
- Supabase Auth with email/password
- Password reset flow

## Development Commands

```bash
# Development
yarn web              # Start Next.js dev server
yarn native           # Start Expo dev server

# Building
yarn build            # Full build (packages + web)
yarn web:build        # Next.js production build

# Database
yarn supa:start       # Start local Supabase
yarn supa:reset       # Reset database with migrations

# Quality
yarn typecheck        # TypeScript validation
yarn lint             # ESLint checks
yarn test             # Unit tests
yarn test:e2e         # Playwright E2E tests
```

## Key Patterns to Follow

### Import Structure
```typescript
// 1. React/React Native
import { useState } from 'react'

// 2. External libraries
import { useQuery } from '@tanstack/react-query'

// 3. Internal packages
import { Button, YStack } from '@my/ui'
import { useUser } from 'app/utils/useUser'

// 4. Relative imports
import { MessageBubble } from './MessageBubble'
```

### Component Pattern (Universal)
```typescript
// packages/app/features/<feature>/components/MyComponent.tsx
'use client'

import { YStack, Text } from '@my/ui'
import { useReducedMotion } from 'react-native-reanimated'

export function MyComponent() {
  const reducedMotion = useReducedMotion()

  return (
    <YStack padding="$4" gap="$2">
      <Text>Content</Text>
    </YStack>
  )
}
```

### Screen Pattern
```typescript
// packages/app/features/<feature>/screens/MyScreen.tsx
'use client'

import { YStack, ScrollView } from '@my/ui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function MyScreen() {
  const insets = useSafeAreaInsets()

  return (
    <ScrollView>
      <YStack paddingTop={insets.top} paddingBottom={insets.bottom}>
        {/* Screen content */}
      </YStack>
    </ScrollView>
  )
}
```

## Critical Rules

### MUST Do
- Use `'use client'` directive for components with hooks/interactivity
- Use Tamagui design tokens (`$4`, `$color11`) not raw values
- Use `useReducedMotion()` for animations (accessibility)
- Use `size="$4"` or larger for touch targets (44px minimum)
- Run `yarn typecheck` before committing

### NEVER Do
- Import from `react-native` directly in shared code (use Tamagui)
- Use `@ts-ignore` or `@ts-nocheck`
- Commit `console.log` statements
- Hardcode secrets or API keys
- Skip TypeScript errors

## Environment Variables

### Required for Development
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AI (Hybrid: Google for chat, OpenAI for embeddings)
GOOGLE_GENERATIVE_AI_API_KEY=
OPENAI_API_KEY=
```

### Required for Production
```bash
# Payments (Stripe)
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Email (Resend)
RESEND_API_KEY=
```

## Documentation References

- [AGENTS.md](./AGENTS.md) - AI assistant guidelines (accessibility, animations, forms)
- [claudedocs/jan-2026-excellence-plan.md](./claudedocs/jan-2026-excellence-plan.md) - Current sprint work
- [Tamagui Docs](https://tamagui.dev)
- [Expo Docs](https://docs.expo.dev)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel AI SDK](https://sdk.vercel.ai)

## Known Issues

1. **patch-package warning**: react-native-reanimated patch for 3.17.5 doesn't apply to 4.2.1 (cosmetic, doesn't affect functionality)
2. **ESLint warnings**: 229 warnings allowed (mostly unused vars in generated types)

## Session Continuity

When resuming work on this project:
1. Check `claudedocs/jan-2026-excellence-plan.md` for current sprint status
2. Run `git status` to see uncommitted changes
3. Run `yarn typecheck` to verify no regressions
