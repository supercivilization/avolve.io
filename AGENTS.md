# Avolve - AI Agent Guidelines

> Guidelines for AI coding assistants working on this codebase.
> Based on [Vercel Web Interface Guidelines](https://vercel.com/design/guidelines)

## Project Overview

Avolve is a Universal React application (web + native) built with:
- **Next.js 16** - Web framework with App Router
- **Expo SDK 54** - Native mobile (iOS/Android)
- **Tamagui** - Universal design system
- **Supabase** - Backend (PostgreSQL, Auth, Realtime, Edge Functions)
- **Vercel AI SDK** - AI/LLM integration

## Code Organization

```
apps/
├── next/           # Next.js web app
└── expo/           # React Native app

packages/
├── app/            # Shared feature code (screens, hooks, components)
├── ui/             # Tamagui UI components
├── api/            # tRPC API definitions
└── supabase/       # Database types

supabase/
├── migrations/     # SQL migrations
└── functions/      # Edge Functions
```

## MUST Follow Guidelines

### Accessibility

1. **Honor `prefers-reduced-motion`**
   ```typescript
   import { useReducedMotion } from 'react-native-reanimated'

   const reducedMotion = useReducedMotion()
   const animation = reducedMotion ? undefined : FadeIn.duration(200)
   ```

2. **Touch targets minimum 44px on mobile**
   - Use `size="$4"` or larger for Tamagui buttons
   - Never use `size="$3"` or smaller for interactive elements

3. **Visible focus states**
   - Tamagui provides default focus styles
   - Use `focusStyle` prop for custom focus states

4. **Semantic HTML**
   - Use proper heading hierarchy (H1 > H2 > H3)
   - Use Button for actions, Link for navigation
   - Add aria-labels when visual context is insufficient

### Animations

1. **GPU-accelerated properties only**
   - PREFER: `transform`, `opacity`
   - AVOID: `width`, `height`, `top`, `left`, `margin`, `padding`

2. **Use Reanimated for native animations**
   ```typescript
   import Animated, { FadeInUp, useAnimatedStyle } from 'react-native-reanimated'
   ```

3. **Keep animations interruptible**
   - Use `springify()` for natural feel
   - Avoid `withDelay` for critical interactions

### Performance

1. **Virtualize large lists**
   ```typescript
   import { FlashList } from '@shopify/flash-list'
   // FlashList for native, ScrollView fallback for web
   ```

2. **Lazy load below-the-fold images**

3. **Keep mutations under 500ms**
   - Use optimistic updates for perceived performance
   - Show loading states immediately

4. **Prevent layout shift**
   - Reserve space for dynamic content
   - Use skeleton loaders with correct dimensions

### Forms

1. **Every input MUST have a label**
   ```typescript
   <Label htmlFor="email">Email</Label>
   <Input id="email" ... />
   ```

2. **Allow Enter to submit in text fields**
   ```typescript
   <Input onSubmitEditing={handleSubmit} returnKeyType="send" />
   ```

3. **Support password managers**
   - Use `textContentType` on native
   - Use `autoComplete` on web

4. **Show validation errors inline**
   - Display error next to the field
   - Focus the first invalid field

### Layout

1. **Respect safe areas on notched devices**
   ```typescript
   import { useSafeAreaInsets } from 'react-native-safe-area-context'
   ```

2. **Use CSS-based layout (flexbox/grid)**
   - Never measure DOM for layout decisions
   - Use Tamagui responsive props (`$gtMd`, `$gtLg`)

3. **Test across viewports**
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1024px, 1440px
   - Ultra-wide: 1920px+

## SHOULD Follow Guidelines

### Code Style

1. **Use TypeScript strict mode**
   - Avoid `any` - use proper types
   - Prefer `unknown` over `any` when type is uncertain

2. **Prefer composition over inheritance**
   ```typescript
   // Good: Composition
   function MessageBubble({ message, ...props }: MessageBubbleProps) {
     return <Card {...props}>{message.content}</Card>
   }
   ```

3. **Co-locate related code**
   ```
   features/brain/
   ├── components/     # UI components
   ├── hooks/          # Feature hooks
   ├── screens/        # Screen components
   └── types.ts        # Shared types
   ```

### Tamagui Patterns

1. **Use design tokens**
   ```typescript
   // Good
   <YStack padding="$4" gap="$2">

   // Avoid
   <YStack padding={16} gap={8}>
   ```

2. **Dynamic colors with type assertion**
   ```typescript
   // Tamagui requires type assertion for dynamic tokens
   backgroundColor={`$${color}4` as any}
   ```

3. **Responsive props**
   ```typescript
   <YStack
     flexDirection="column"
     $gtMd={{ flexDirection: "row" }}
   >
   ```

### State Management

1. **Server state: React Query / tRPC**
2. **Client state: Zustand (if needed)**
3. **Form state: React Hook Form + Zod**

### Testing

1. **Unit tests: Vitest**
2. **E2E tests: Playwright**
3. **Test user flows, not implementation**

## NEVER Do

1. **Never disable browser zoom**
2. **Never use color alone to convey information**
3. **Never auto-play animations without user control**
4. **Never block paste in password fields**
5. **Never submit forms on blur**
6. **Never hide focus indicators**
7. **Never use fixed pixel values for text sizes**
8. **Never ignore TypeScript errors with `@ts-ignore`**
9. **Never commit console.log statements**
10. **Never hardcode secrets or API keys**

## File Naming Conventions

- Components: `PascalCase.tsx` (e.g., `BrainChatUI.tsx`)
- Hooks: `camelCase.ts` (e.g., `useBrainChat.ts`)
- Types: `types.ts` or `PascalCase.types.ts`
- Utils: `camelCase.ts` (e.g., `formatDate.ts`)
- Tests: `*.test.ts` or `*.spec.ts`

## Import Order

```typescript
// 1. React/React Native
import { useState, useEffect } from 'react'
import { Platform } from 'react-native'

// 2. External libraries
import Animated from 'react-native-reanimated'
import { useQuery } from '@tanstack/react-query'

// 3. Internal packages
import { Button, YStack } from '@my/ui'
import { useUser } from 'app/utils/useUser'

// 4. Relative imports
import { MessageBubble } from './MessageBubble'
import type { BrainMessage } from '../types'
```

## Environment Variables

- **Public (client)**: `NEXT_PUBLIC_*` prefix
- **Server-only**: No prefix, access via `process.env`
- **Never commit**: `.env` files with real values

## Deployment

- **Web**: Vercel (automatic from `main` branch)
- **Mobile**: EAS Build (manual or CI)
- **Database**: Supabase (migrations via `supabase db push`)

## Resources

- [Vercel Web Interface Guidelines](https://vercel.com/design/guidelines)
- [Tamagui Documentation](https://tamagui.dev)
- [Expo Documentation](https://docs.expo.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel AI SDK](https://sdk.vercel.ai)
