# Tamagui Takeout Architecture Guide

**Last Updated:** November 15, 2025

Complete guide to understanding your Tamagui Takeout universal React starter template.

---

## 🎯 What Is This?

**Tamagui Takeout** is a **universal React monorepo starter** that lets you build:
- 🌐 **Web apps** (Next.js)
- 📱 **iOS apps** (React Native via Expo)
- 🤖 **Android apps** (React Native via Expo)

**From a SINGLE codebase** with **~95% code sharing** across all platforms.

---

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     YOUR APPLICATION CODE                    │
│                  (Write once, run everywhere)                │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Next.js App │  │  Expo App    │  │  Storybook   │     │
│  │  (Web)       │  │  (iOS/And.)  │  │  (Docs)      │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                  │                  │              │
│         └──────────────────┼──────────────────┘              │
│                            │                                 │
│                            ↓                                 │
│                   ┌─────────────────┐                       │
│                   │  SHARED CODE    │                       │
│                   │  (packages/)    │                       │
│                   └─────────────────┘                       │
│                            │                                 │
│         ┌──────────────────┼──────────────────┐             │
│         ↓                  ↓                  ↓             │
│  ┌────────────┐   ┌────────────┐   ┌────────────┐         │
│  │  app/      │   │  ui/       │   │  api/      │         │
│  │  Features  │   │  Components│   │  Backend   │         │
│  │  & Screens │   │  & Styles  │   │  Logic     │         │
│  └────────────┘   └────────────┘   └────────────┘         │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                            ↓
                   ┌─────────────────┐
                   │    Supabase     │
                   │   (Database +   │
                   │    Auth + API)  │
                   └─────────────────┘
```

---

## 📁 Project Structure

### Root Directory Overview

```
takeout/
├── apps/                    # Platform-specific apps
│   ├── next/               # Next.js web app (Pages + App Router)
│   ├── expo/               # React Native mobile app
│   ├── storybook/          # Web component documentation
│   └── storybook-rn/       # Native component documentation
│
├── packages/                # Shared code (the magic!)
│   ├── app/                # ⭐ Features, screens, business logic
│   ├── ui/                 # ⭐ Tamagui components & design system
│   ├── api/                # Backend API logic (tRPC)
│   ├── fonts-and-icons/    # Font and icon management
│   └── eslint-config-custom/ # Shared ESLint configuration
│
├── supabase/                # Backend configuration
│   ├── migrations/         # Database migrations
│   ├── functions/          # Edge functions
│   └── config.toml         # Supabase configuration
│
├── e2e/                     # End-to-end tests (Playwright)
├── claudedocs/              # Your project documentation
├── scripts/                 # Build and utility scripts
├── patches/                 # Package patches (patch-package)
│
├── .env                     # Environment variables
├── package.json             # Root workspace configuration
├── yarn.lock                # Dependency lock file
├── turbo.json               # Turborepo build configuration
└── tsconfig.json            # TypeScript configuration
```

---

## 🎨 The "Shared Code" Philosophy

### Write Once, Run Everywhere

**The Core Idea:**
```
You write business logic ONCE in packages/
↓
Next.js (web) imports it
Expo (iOS/Android) imports it
Storybook (docs) imports it
```

**Example:**

```tsx
// packages/app/features/home/screen.tsx
// ↑ Written ONCE, shared everywhere

export function HomeScreen() {
  return (
    <YStack gap="$4" padding="$4">
      <H1>Welcome Home!</H1>
      <Button>Click Me</Button>
    </YStack>
  )
}
```

```tsx
// apps/next/pages/index.tsx
// ↑ Next.js web app imports it

import { HomeScreen } from 'app/features/home/screen'

export default function Page() {
  return <HomeScreen />  // Works on web!
}
```

```tsx
// apps/expo/app/index.tsx
// ↑ Expo mobile app imports it

import { HomeScreen } from 'app/features/home/screen'

export default function Screen() {
  return <HomeScreen />  // Works on iOS & Android!
}
```

**Result:** Same code, three platforms! 🎉

---

## 📦 Package Breakdown

### 1. `packages/app/` - Your Application Logic ⭐

**Purpose:** All your features, screens, and business logic

**Structure:**
```
packages/app/
├── features/                # Feature modules
│   ├── home/               # Home screen feature
│   │   ├── screen.tsx      # Main screen component
│   │   ├── layout.web.tsx  # Web-specific layout
│   │   └── components/     # Feature-specific components
│   │       ├── greetings.tsx
│   │       ├── posts-section.tsx
│   │       └── achievements-section.tsx
│   │
│   ├── auth/               # Authentication feature
│   │   ├── sign-in-screen.tsx
│   │   ├── sign-up-screen.tsx
│   │   └── components/
│   │
│   ├── profile/            # User profile feature
│   ├── settings/           # Settings feature
│   └── create/             # Create content feature
│
├── provider/                # React context providers
│   ├── index.tsx           # Main provider wrapper
│   ├── auth/               # Auth provider
│   ├── tamagui/            # Tamagui theme provider
│   ├── toast/              # Toast notification provider
│   └── safe-area/          # Safe area provider (mobile)
│
├── utils/                   # Utility functions
│   ├── auth/               # Auth helpers
│   ├── supabase/           # Supabase client
│   ├── react-query/        # React Query hooks
│   └── global-store/       # Global state management
│
└── lib/                     # Library code
    └── /* utility functions */
```

**Key Concepts:**

**Feature-Based Organization:**
- Each feature is self-contained
- `screen.tsx` = main screen component
- `layout.web.tsx` = web-specific layout (optional)
- `components/` = feature-specific UI components

**Platform-Specific Files:**
```
screen.tsx          → Used on ALL platforms
layout.web.tsx      → Used ONLY on web (Next.js)
component.native.tsx → Used ONLY on native (iOS/Android)
```

---

### 2. `packages/ui/` - Design System & Components ⭐

**Purpose:** Tamagui-based universal UI components

**Structure:**
```
packages/ui/src/
├── components/
│   ├── elements/           # Basic UI elements
│   │   ├── Button.tsx      # Universal button
│   │   ├── Input.tsx       # Universal input
│   │   ├── Card.tsx        # Universal card
│   │   └── /* more elements */
│   │
│   ├── bento/              # Premium Bento UI components
│   │   ├── EventCard.tsx
│   │   ├── TodoCard.tsx
│   │   └── Banner.tsx
│   │
│   ├── forms/              # Form components
│   │   ├── FormInput.tsx
│   │   ├── FormSelect.tsx
│   │   └── FormCheckbox.tsx
│   │
│   └── FormFields/         # Form field wrappers
│       └── /* field wrappers */
│
├── config/                  # Tamagui configuration
│   └── tamagui.config.ts   # Theme, tokens, fonts
│
├── themes/                  # Theme definitions
│   ├── theme-generated.ts  # Auto-generated themes
│   └── themes.ts           # Custom theme values
│
└── types/                   # TypeScript types
    └── /* type definitions */
```

**Key Features:**

**Universal Components:**
```tsx
// Works on web AND native!
<Button size="$4" theme="blue" onPress={handleClick}>
  Click Me
</Button>

// Compiles to:
// Web: <button class="...">Click Me</button>
// Native: <Pressable>Click Me</Pressable>
```

**Tamagui Tokens:**
```tsx
<YStack
  padding="$4"        // ← Token: 16px
  gap="$2"            // ← Token: 8px
  backgroundColor="$background"  // ← Theme color
>
```

**Responsive Design:**
```tsx
<YStack
  width="100%"
  $gtSm={{ width: '50%' }}      // ← >600px width
  $gtMd={{ width: '33.33%' }}   // ← >900px width
>
```

---

### 3. `packages/api/` - Backend Logic

**Purpose:** tRPC API procedures and business logic

**Structure:**
```
packages/api/
├── src/
│   ├── router/              # tRPC routers
│   │   ├── post.ts         # Post-related procedures
│   │   ├── event.ts        # Event-related procedures
│   │   └── auth.ts         # Auth-related procedures
│   │
│   ├── procedures/          # Reusable procedures
│   │   ├── protected.ts    # Auth-required procedure
│   │   └── public.ts       # Public procedure
│   │
│   └── root.ts              # Root tRPC router
│
└── package.json
```

**Example tRPC Procedure:**

```typescript
// packages/api/src/router/post.ts
import { z } from 'zod'
import { protectedProcedure } from '../procedures/protected'

export const postRouter = {
  create: protectedProcedure
    .input(z.object({
      title: z.string(),
      content: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      const post = await ctx.supabase
        .from('posts')
        .insert(input)

      return post
    })
}
```

**Usage in App:**

```tsx
// packages/app/features/create/screen.tsx
import { api } from 'app/utils/api'

export function CreateScreen() {
  const createPost = api.post.create.useMutation()

  const handleSubmit = () => {
    createPost.mutate({
      title: 'My Post',
      content: 'Content here'
    })
  }
}
```

---

### 4. `supabase/` - Backend Configuration

**Purpose:** Supabase database, auth, and edge functions

**Structure:**
```
supabase/
├── migrations/              # Database migrations
│   ├── 20231101000000_initial_schema.sql
│   ├── 20231102000000_add_posts_table.sql
│   └── /* more migrations */
│
├── functions/               # Supabase Edge Functions
│   └── hello/
│       └── index.ts
│
├── seed.sql                 # Seed data for development
├── config.toml              # Supabase configuration
└── package.json
```

**Key Features:**

**Database Migrations:**
```sql
-- supabase/migrations/20231102000000_add_posts_table.sql
create table posts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  title text not null,
  content text not null,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table posts enable row level security;

-- Policy: Users can read their own posts
create policy "Users can read own posts"
  on posts for select
  using (auth.uid() = user_id);
```

**Edge Functions:**
```typescript
// supabase/functions/hello/index.ts
Deno.serve(async (req) => {
  const { name } = await req.json()
  return new Response(
    JSON.stringify({ message: `Hello ${name}!` }),
    { headers: { "Content-Type": "application/json" } }
  )
})
```

---

## 🖥️ Apps Breakdown

### 1. `apps/next/` - Next.js Web App

**Purpose:** Web application using Next.js 16

**Structure:**
```
apps/next/
├── app/                     # App Router (NEW - modern)
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── admin/
│       └── errors/
│           └── page.tsx    # Admin errors page
│
├── pages/                   # Pages Router (existing routes)
│   ├── _app.tsx            # App wrapper with providers
│   ├── _document.tsx       # HTML document
│   ├── index.tsx           # Home page (/)
│   ├── sign-in.tsx         # Sign in page
│   ├── sign-up.tsx         # Sign up page
│   ├── create.tsx          # Create content page
│   ├── profile/
│   │   ├── index.tsx       # Profile page
│   │   └── edit.tsx        # Edit profile page
│   └── settings/
│       ├── index.tsx       # Settings home
│       ├── general.tsx     # General settings
│       ├── change-password.tsx
│       └── change-email.tsx
│
├── public/                  # Static assets
│   ├── tamagui.css         # Extracted Tamagui styles
│   └── /* images, fonts */
│
├── next.config.js           # Next.js configuration
├── tsconfig.json            # TypeScript config
└── package.json
```

**How It Works:**

**Pages Router (Traditional):**
```tsx
// apps/next/pages/index.tsx
import { HomeScreen } from 'app/features/home/screen'
import { HomeLayout } from 'app/features/home/layout.web'

export const Page = () => {
  return <HomeScreen />
}

// Custom layout pattern
Page.getLayout = (page) => <HomeLayout>{page}</HomeLayout>

export default Page
```

**App Router (Modern):**
```tsx
// apps/next/app/dashboard/page.tsx
'use client'

import { DashboardScreen } from 'app/features/dashboard/screen'

export default function Page() {
  return <DashboardScreen />
}
```

**Key Features:**
- ✅ Hybrid routing: Both Pages Router (15 routes) + App Router (3 routes)
- ✅ Tamagui CSS extraction (optimal performance)
- ✅ Turbopack bundler (2-5x faster builds)
- ✅ Static site generation (SSG) + Server-side rendering (SSR)
- ✅ API routes for backend logic

---

### 2. `apps/expo/` - React Native Mobile App

**Purpose:** iOS and Android apps using Expo

**Structure:**
```
apps/expo/
├── app/                     # Expo Router (file-based routing)
│   ├── _layout.tsx         # Root layout with providers
│   ├── index.tsx           # Home screen (/)
│   ├── (auth)/             # Auth group
│   │   ├── sign-in.tsx     # /sign-in
│   │   └── sign-up.tsx     # /sign-up
│   ├── (drawer)/           # Drawer navigation group
│   │   └── _layout.tsx     # Drawer layout
│   ├── create.tsx          # /create
│   ├── about.tsx           # /about
│   └── settings/
│       ├── index.tsx       # /settings
│       └── edit.tsx        # /settings/edit
│
├── assets/                  # Native assets
│   ├── icon.png            # App icon
│   ├── splash.png          # Splash screen
│   └── /* images */
│
├── ios/                     # iOS native project (generated)
├── android/                 # Android native project (generated)
│
├── app.config.js            # Expo configuration
├── babel.config.js          # Babel configuration
├── metro.config.js          # Metro bundler config
├── tsconfig.json            # TypeScript config
└── package.json
```

**How It Works:**

```tsx
// apps/expo/app/index.tsx
import { HomeScreen } from 'app/features/home/screen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <HomeScreen />
    </>
  )
}
```

**Expo Router Navigation:**
```tsx
// Navigate programmatically
import { router } from 'expo-router'

router.push('/profile')
router.back()
```

**Key Features:**
- ✅ Expo Router (file-based navigation like Next.js)
- ✅ Expo dev client (fast refresh, debugging)
- ✅ EAS Build for native compilation
- ✅ Over-the-air updates
- ✅ Native modules support

---

## 🔄 Data Flow Architecture

### Complete Request Flow

```
User Action (Button Click)
↓
Component (packages/app/features/*/screen.tsx)
↓
React Query Hook (useMutation/useQuery)
↓
tRPC Procedure (packages/api/src/router/*.ts)
↓
Supabase Client (database query)
↓
PostgreSQL Database (supabase/migrations/*.sql)
↓
Response Back Through Chain
↓
Component Re-renders with New Data
```

**Example: Creating a Post**

```tsx
// 1. User clicks button in component
// packages/app/features/create/screen.tsx

import { api } from 'app/utils/api'

export function CreateScreen() {
  const createPost = api.post.create.useMutation()

  const handleSubmit = (data) => {
    createPost.mutate({      // ← Triggers tRPC mutation
      title: data.title,
      content: data.content
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input name="title" />
      <TextArea name="content" />
      <Button>Create Post</Button>
    </Form>
  )
}
```

```typescript
// 2. tRPC procedure handles request
// packages/api/src/router/post.ts

export const postRouter = {
  create: protectedProcedure
    .input(z.object({
      title: z.string(),
      content: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      // 3. Query Supabase database
      const { data, error } = await ctx.supabase
        .from('posts')
        .insert({
          user_id: ctx.user.id,
          title: input.title,
          content: input.content
        })
        .select()
        .single()

      if (error) throw error
      return data  // ← Returns to component
    })
}
```

```sql
-- 4. Database table structure
-- supabase/migrations/20231102000000_add_posts_table.sql

create table posts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  title text not null,
  content text not null,
  created_at timestamp with time zone default now()
);
```

---

## 🎨 Styling with Tamagui

### How Tamagui Works

**Concept:** Write styles once, compile to optimal code for each platform

```tsx
// You write this:
<YStack
  backgroundColor="$blue10"
  padding="$4"
  borderRadius="$4"
  gap="$2"
>
  <H1>Hello</H1>
  <Button>Click</Button>
</YStack>
```

**Compiles to:**

**Web (Next.js):**
```html
<div class="ystack-abc123">
  <h1 class="h1-def456">Hello</h1>
  <button class="button-ghi789">Click</button>
</div>

<!-- tamagui.css -->
<style>
.ystack-abc123 {
  background-color: #0078ff;
  padding: 16px;
  border-radius: 8px;
  gap: 8px;
}
</style>
```

**Native (Expo):**
```jsx
<View style={{
  backgroundColor: '#0078ff',
  padding: 16,
  borderRadius: 8,
  gap: 8
}}>
  <Text style={...}>Hello</Text>
  <Pressable style={...}>Click</Pressable>
</View>
```

**Result:** Optimal performance on both platforms!

---

### Design Tokens

**Tamagui uses tokens for consistency:**

```typescript
// packages/ui/src/config/tamagui.config.ts

export default createTamagui({
  tokens: {
    space: {
      1: 4,
      2: 8,
      3: 12,
      4: 16,
      5: 20,
      // ...
    },
    size: {
      sm: 32,
      md: 40,
      lg: 48,
      // ...
    },
    color: {
      blue10: '#0078ff',
      red10: '#ff0000',
      // ...
    }
  }
})
```

**Usage:**
```tsx
<Button
  size="$md"           // ← height: 40px
  paddingHorizontal="$4"  // ← padding: 16px
  backgroundColor="$blue10"  // ← color: #0078ff
>
  Submit
</Button>
```

---

### Responsive Design

```tsx
<YStack
  width="100%"              // Default: all screens
  $gtSm={{ width: '80%' }}  // >600px: 80% width
  $gtMd={{ width: '60%' }}  // >900px: 60% width
  $gtLg={{ width: '40%' }}  // >1200px: 40% width
>
  Content adapts to screen size!
</YStack>
```

**Breakpoints:**
- `$gtSm` = Greater than small (>600px)
- `$gtMd` = Greater than medium (>900px)
- `$gtLg` = Greater than large (>1200px)
- `$gtXl` = Greater than extra-large (>1536px)

---

## 🔐 Authentication Flow

### How Auth Works

```
1. User enters email/password
   ↓
2. App sends to Supabase Auth
   ↓
3. Supabase validates credentials
   ↓
4. Returns JWT token + user session
   ↓
5. Token stored in:
   - Web: localStorage
   - Native: SecureStore (encrypted)
   ↓
6. Token sent with all API requests
   ↓
7. Backend verifies token
   ↓
8. Protected data returned
```

**Implementation:**

```tsx
// packages/app/features/auth/sign-in-screen.tsx

import { supabase } from 'app/utils/supabase/client'
import { useRouter } from 'solito/router' // or solito/navigation

export function SignInScreen() {
  const router = useRouter()

  const handleSignIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      toast.error(error.message)
      return
    }

    // Success! User is authenticated
    router.push('/home')
  }

  return (
    <Form onSubmit={handleSignIn}>
      <Input type="email" name="email" />
      <Input type="password" name="password" />
      <Button>Sign In</Button>
    </Form>
  )
}
```

**Protected Routes:**

```typescript
// packages/api/src/procedures/protected.ts

export const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user  // User is authenticated
    }
  })
})
```

---

## 🏃 Development Workflow

### Starting the Apps

**Web Development:**
```bash
yarn web                    # Start Next.js dev server (http://localhost:3000)
```

**Mobile Development:**
```bash
yarn native                 # Start Expo dev server
yarn ios                    # Run on iOS simulator
yarn android                # Run on Android emulator
```

**Backend Development:**
```bash
yarn supa start             # Start local Supabase instance
yarn supa db reset          # Reset database with migrations
```

**Testing:**
```bash
yarn test                   # Run unit tests (Vitest)
yarn test:e2e               # Run end-to-end tests (Playwright)
```

**Building:**
```bash
yarn web:prod               # Build Next.js for production
yarn expo:prebuild          # Generate native iOS/Android projects
```

---

### Typical Development Session

```bash
# 1. Start backend (Supabase)
yarn supa start

# 2. In another terminal: Start web app
yarn web

# 3. In another terminal: Start mobile app
yarn native

# Now you can develop for web and mobile simultaneously!
# Changes to packages/app or packages/ui affect BOTH apps instantly
```

---

## 📊 Build System (Turborepo)

### How Builds Work

**Turborepo orchestrates builds across the monorepo:**

```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],  // Build dependencies first
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false
    },
    "lint": {
      "dependsOn": ["build"]
    }
  }
}
```

**Build Order:**
```
1. packages/ui         → Tamagui components compiled
2. packages/api        → tRPC routers compiled
3. packages/app        → Features compiled
4. apps/next           → Next.js app built
5. apps/expo           → Expo app bundled
```

**Caching:**
- Turborepo caches build outputs
- Only rebuilds changed packages
- Significantly faster on subsequent builds

---

## 🧩 Key Technologies Explained

### 1. **Solito** - Universal Navigation

**Problem:** Next.js uses different navigation than React Native
**Solution:** Solito provides unified API

```tsx
// Works on web AND native!
import { Link } from 'solito/link'
import { useRouter } from 'solito/navigation'

function MyComponent() {
  const router = useRouter()

  return (
    <>
      <Link href="/profile">View Profile</Link>
      <Button onPress={() => router.push('/settings')}>
        Settings
      </Button>
    </>
  )
}
```

---

### 2. **tRPC** - Type-Safe API

**Problem:** REST APIs lose type safety between frontend/backend
**Solution:** tRPC gives end-to-end TypeScript types

```typescript
// Backend defines procedure
export const postRouter = {
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return { id: input.id, title: 'Post Title' }
    })
}

// Frontend gets FULL TYPE SAFETY
const { data } = api.post.getById.useQuery({ id: '123' })
//     ^? { id: string; title: string }

data.title  // ✅ TypeScript knows this exists
data.foo    // ❌ TypeScript error: Property 'foo' does not exist
```

---

### 3. **React Query** - Data Fetching

**Features:**
- Automatic caching
- Background refetching
- Optimistic updates
- Loading/error states

```tsx
const { data, isLoading, error } = api.post.getAll.useQuery()

if (isLoading) return <Spinner />
if (error) return <ErrorMessage error={error} />

return <PostList posts={data} />
```

---

### 4. **Yarn Workspaces** - Monorepo Management

**Benefits:**
- Single `node_modules` for entire repo
- Shared dependencies
- Internal packages can import each other

```json
// Root package.json
{
  "workspaces": [
    "apps/*",      // All apps
    "packages/*",  // All packages
    "supabase"     // Backend
  ]
}
```

**Import Resolution:**
```tsx
// Any app can import from packages
import { Button } from '@my/ui'          // packages/ui
import { HomeScreen } from 'app/features/home/screen'  // packages/app
import { api } from '@my/api'            // packages/api
```

---

## 🎯 Platform-Specific Code

### When You Need Different Code Per Platform

**File Naming Convention:**
```
component.tsx          → Used on ALL platforms
component.web.tsx      → Used ONLY on web
component.native.tsx   → Used ONLY on mobile (iOS/Android)
component.ios.tsx      → Used ONLY on iOS
component.android.tsx  → Used ONLY on Android
```

**Example:**

```tsx
// packages/app/features/home/layout.tsx
// Default layout (works everywhere)
export function HomeLayout({ children }) {
  return <YStack>{children}</YStack>
}
```

```tsx
// packages/app/features/home/layout.web.tsx
// Web-specific layout (overrides default on web)
export function HomeLayout({ children }) {
  return (
    <YStack maxWidth={1200} alignSelf="center">
      <Sidebar />
      {children}
    </YStack>
  )
}
```

**Usage:**
```tsx
// This automatically picks the right file:
import { HomeLayout } from 'app/features/home/layout'

// Web: imports layout.web.tsx
// Mobile: imports layout.tsx
```

---

### Platform Detection

```tsx
import { isWeb, isNative, isIos, isAndroid } from '@my/ui'

export function Component() {
  return (
    <YStack>
      {isWeb && <WebOnlyFeature />}
      {isNative && <MobileOnlyFeature />}
      {isIos && <iOSSpecificFeature />}
      {isAndroid && <AndroidSpecificFeature />}
    </YStack>
  )
}
```

---

## 🔥 Hot Module Replacement (HMR)

### Fast Refresh During Development

**What Happens When You Edit Code:**

```
1. Edit packages/app/features/home/screen.tsx
   ↓
2. File watcher detects change
   ↓
3. Turborepo triggers rebuild
   ↓
4. HMR sends update to:
   - Next.js dev server (web)
   - Expo dev client (mobile)
   ↓
5. Both apps update WITHOUT full reload
   ↓
6. Component state preserved!
```

**Example:**

```tsx
// Edit this file
export function HomeScreen() {
  const [count, setCount] = useState(0)

  return (
    <Button onPress={() => setCount(c => c + 1)}>
      Count: {count}  {/* Change this text */}
    </Button>
  )
}

// Save file
// → Both web AND mobile update instantly
// → count state is PRESERVED (doesn't reset to 0)
```

---

## 🎨 Storybook Integration

### Component Documentation

**Purpose:** Document and test UI components in isolation

```tsx
// packages/ui/src/components/elements/Button.stories.tsx

import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Elements/Button',
  component: Button,
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Click Me',
    theme: 'blue'
  }
}

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: '$lg'
  }
}
```

**Run Storybook:**
```bash
yarn storybook         # Web Storybook
yarn storybook:native  # Native Storybook (iOS/Android)
```

---

## 🧪 Testing Strategy

### Unit Tests (Vitest)

```tsx
// packages/app/features/home/__tests__/screen.test.tsx

import { render, screen } from '@testing-library/react'
import { HomeScreen } from '../screen'

describe('HomeScreen', () => {
  it('renders greeting', () => {
    render(<HomeScreen />)
    expect(screen.getByText(/welcome/i)).toBeInTheDocument()
  })

  it('shows user name when logged in', () => {
    render(<HomeScreen />)
    expect(screen.getByText(/john doe/i)).toBeInTheDocument()
  })
})
```

### E2E Tests (Playwright)

```typescript
// e2e/auth.spec.ts

import { test, expect } from '@playwright/test'

test('user can sign in', async ({ page }) => {
  await page.goto('http://localhost:3000/sign-in')

  await page.fill('input[name="email"]', 'test@example.com')
  await page.fill('input[name="password"]', 'password123')
  await page.click('button[type="submit"]')

  await expect(page).toHaveURL('/home')
  await expect(page.locator('h1')).toContainText('Welcome')
})
```

---

## 🚀 Deployment

### Next.js (Web) → Vercel

```bash
# 1. Connect to Vercel
vercel link

# 2. Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

# 3. Deploy
vercel deploy --prod
```

### Expo (Mobile) → EAS

```bash
# 1. Configure EAS
eas build:configure

# 2. Build for stores
eas build --platform ios
eas build --platform android

# 3. Submit to stores
eas submit --platform ios
eas submit --platform android
```

### Supabase → Supabase Cloud

```bash
# 1. Link to project
supabase link --project-ref your-project-ref

# 2. Push migrations
supabase db push

# 3. Deploy edge functions
supabase functions deploy
```

---

## 📚 Summary: How It All Works

### The Big Picture

**1. You write features ONCE in `packages/app/`:**
```tsx
// packages/app/features/profile/screen.tsx
export function ProfileScreen() {
  return <YStack>...</YStack>
}
```

**2. Multiple apps import and use them:**
```tsx
// apps/next/pages/profile.tsx (Web)
import { ProfileScreen } from 'app/features/profile/screen'

// apps/expo/app/profile.tsx (Mobile)
import { ProfileScreen } from 'app/features/profile/screen'
```

**3. Tamagui compiles styles optimally for each platform:**
- Web → CSS classes
- Native → React Native StyleSheet

**4. Solito handles navigation universally:**
- Web → Next.js router
- Native → Expo Router

**5. tRPC + React Query handle data fetching:**
- Type-safe API calls
- Automatic caching
- Loading states

**6. Supabase provides backend:**
- PostgreSQL database
- Authentication
- Real-time subscriptions
- Edge functions

**7. Turborepo orchestrates builds:**
- Parallel builds
- Smart caching
- Fast rebuilds

---

## 🎓 Learning Path

### If you're new to this stack:

**Week 1: Understand the structure**
1. Explore `packages/app/features/`
2. See how Next.js pages import features
3. See how Expo screens import features
4. Run `yarn web` and `yarn native` simultaneously

**Week 2: Make a simple change**
1. Edit `packages/app/features/home/screen.tsx`
2. See it update in BOTH web and mobile
3. Add a new component to `packages/ui/`
4. Use it in a feature

**Week 3: Add a new feature**
1. Create `packages/app/features/your-feature/`
2. Create `screen.tsx` and components
3. Add routes in `apps/next/pages/`
4. Add routes in `apps/expo/app/`

**Week 4: Work with data**
1. Create a tRPC procedure in `packages/api/`
2. Call it from a feature with React Query
3. Add a database migration in `supabase/migrations/`
4. Test with local Supabase

---

## 🆘 Common Questions

**Q: Where do I add a new screen?**
A: `packages/app/features/your-feature/screen.tsx`

**Q: Where do I add a new UI component?**
A: `packages/ui/src/components/`

**Q: How do I add a new API endpoint?**
A: Add a procedure to `packages/api/src/router/`

**Q: How do I add a new database table?**
A: Create a migration in `supabase/migrations/`

**Q: Why are there two Next.js routing systems?**
A: Hybrid approach - Pages Router (stable, existing) + App Router (modern, new features)

**Q: Can I use React Native libraries?**
A: Yes, but they won't work on web. Use Tamagui components for cross-platform.

**Q: How do I make something web-only?**
A: Use `.web.tsx` file extension or `{isWeb && <Component />}`

**Q: How do I make something mobile-only?**
A: Use `.native.tsx` file extension or `{isNative && <Component />}`

---

## 🎉 You Now Understand Your Starter!

**Key Takeaways:**

1. **Monorepo** = Multiple apps + shared packages in one repo
2. **packages/app** = Your features (shared code)
3. **packages/ui** = Your components (Tamagui)
4. **apps/next** = Web app (Next.js)
5. **apps/expo** = Mobile apps (iOS/Android)
6. **Write once** = Code in packages/ runs everywhere
7. **Platform-specific** = Use `.web.tsx` or `.native.tsx` when needed
8. **Type-safe** = TypeScript + tRPC = End-to-end type safety
9. **Fast** = Turborepo + Tamagui + HMR = Quick development

**You're ready to build! 🚀**

---

*For more specific topics, see:*
- `HYBRID-ROUTER-STRATEGY-2025.md` - Routing architecture
- `CONFIGURATION-STANDARDS-NOV-2025.md` - Technical configuration
- `ROUTER-SELECTION-GUIDE.md` - Daily routing decisions
