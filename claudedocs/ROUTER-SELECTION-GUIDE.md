# Router Selection Quick Reference

**Last Updated:** November 13, 2025

---

## Decision Tree: Which Router Should I Use?

```
Are you creating a NEW route or feature?
│
├─ YES → Use App Router (/app directory)
│   └─ Create in: /app/your-feature/page.tsx
│
└─ NO (fixing/updating existing route)
    │
    ├─ Route already in /pages? → Keep in Pages Router
    │   └─ Edit: /pages/existing-route.tsx
    │
    └─ Route already in /app? → Keep in App Router
        └─ Edit: /app/existing-route/page.tsx
```

---

## Quick Reference Table

| Scenario                          | Router      | Directory | Navigation Hook           |
|-----------------------------------|-------------|-----------|---------------------------|
| New admin dashboard               | App Router  | `/app`    | `solito/navigation`       |
| New API endpoint                  | App Router  | `/app/api`| N/A (route.ts)            |
| New user-facing feature           | App Router  | `/app`    | `solito/navigation`       |
| Fix bug in /pages/sign-in         | Pages       | `/pages`  | `solito/router`           |
| Update /pages/settings/general    | Pages       | `/pages`  | `solito/router`           |
| Fix bug in /app/admin/errors      | App Router  | `/app`    | `solito/navigation`       |

---

## File Creation Cheat Sheet

### App Router (New Features)

**Create a new page:**
```bash
mkdir -p app/your-feature
touch app/your-feature/page.tsx
```

**Template:**
```typescript
// app/your-feature/page.tsx
'use client'

import { YStack, H1, Button } from '@my/ui'
import { useRouter } from 'solito/navigation' // ← App Router hook

export default function YourFeaturePage() {
  const router = useRouter()

  return (
    <YStack f={1} ai="center" jc="center" gap="$4">
      <H1>Your Feature</H1>
      <Button onPress={() => router.push('/home')}>
        Go Home
      </Button>
    </YStack>
  )
}
```

---

### Pages Router (Existing Routes)

**Create a new page (only if required):**
```bash
touch pages/your-route.tsx
```

**Template:**
```typescript
// pages/your-route.tsx
import { YStack, H1, Button } from '@my/ui'
import { useRouter } from 'solito/router' // ← Pages Router hook

export default function YourRoutePage() {
  const router = useRouter()

  return (
    <YStack f={1} ai="center" jc="center" gap="$4">
      <H1>Your Route</H1>
      <Button onPress={() => router.push('/home')}>
        Go Home
      </Button>
    </YStack>
  )
}
```

---

## Navigation Hooks Reference

### App Router (`/app`)

```typescript
import { useRouter, usePathname, useSearchParams } from 'solito/navigation'
import { Link } from 'solito/link'

function AppRouterComponent() {
  const router = useRouter()           // Navigation methods
  const pathname = usePathname()       // Current path
  const searchParams = useSearchParams() // Query params

  return (
    <>
      <Button onPress={() => router.push('/dashboard')}>Go</Button>
      <Link href="/dashboard">Dashboard</Link>
    </>
  )
}
```

---

### Pages Router (`/pages`)

```typescript
import { useRouter } from 'solito/router'
import { Link } from 'solito/link'

function PagesRouterComponent() {
  const router = useRouter()

  return (
    <>
      <Button onPress={() => router.push('/dashboard')}>Go</Button>
      <Link href="/dashboard">Dashboard</Link>
    </>
  )
}
```

---

## Common Mistakes

### ❌ Wrong: Using Pages Router hook in App Router

```typescript
// app/dashboard/page.tsx
import { useRouter } from 'solito/router' // ❌ WRONG!

// Error: NextRouter was not mounted
```

### ✅ Correct: Using App Router hook in App Router

```typescript
// app/dashboard/page.tsx
import { useRouter } from 'solito/navigation' // ✅ CORRECT
```

---

### ❌ Wrong: Creating new features in Pages Router

```typescript
// pages/new-admin-panel.tsx  ❌ WRONG - use App Router for new features
```

### ✅ Correct: Creating new features in App Router

```typescript
// app/admin-panel/page.tsx  ✅ CORRECT - new features use App Router
```

---

## Testing Imports

### App Router Tests

```typescript
// app/dashboard/__tests__/page.test.tsx
jest.mock('solito/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/dashboard',
  useSearchParams: () => new URLSearchParams()
}))
```

---

### Pages Router Tests

```typescript
// pages/__tests__/profile.test.tsx
jest.mock('solito/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/profile',
    query: {}
  })
}))
```

---

## When in Doubt

1. **New feature?** → App Router (`/app`)
2. **Existing route?** → Keep current router
3. **Not sure?** → Check which directory the route is in:
   - `/app/...` → Use `solito/navigation`
   - `/pages/...` → Use `solito/router`

---

## Migration Status (As of Nov 13, 2025)

**Pages Router (15 routes):**
- ✅ All production routes
- ✅ Stable and tested
- 🔄 Gradual migration planned for 2026

**App Router (3 routes):**
- ✅ /admin/errors
- ✅ /api/trpc/[trpc]
- ✅ /_not-found

**Strategy:** New features → App Router, Existing routes → Stay put

---

For complete migration strategy, see: `HYBRID-ROUTER-STRATEGY-2025.md`
