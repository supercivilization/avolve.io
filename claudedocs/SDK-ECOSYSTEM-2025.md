# SDK Ecosystem Reference - November 2025

**Last Updated:** November 15, 2025

Comprehensive guide to all SDKs, libraries, and tools available for your Tamagui Takeout stack.

---

## 📚 Table of Contents

1. [Vercel Ecosystem](#vercel-ecosystem)
2. [Supabase Ecosystem](#supabase-ecosystem)
3. [Expo Ecosystem](#expo-ecosystem)
4. [Data & API Tools](#data--api-tools)
5. [State Management](#state-management)
6. [Validation & Type Safety](#validation--type-safety)
7. [Email & Communication](#email--communication)
8. [Payments](#payments)
9. [UI & Styling](#ui--styling)
10. [Testing Tools](#testing-tools)

---

## Vercel Ecosystem

### Vercel AI SDK

**Current Version:** 5.0.68 (in your stack)
**Latest:** AI SDK 6 (beta), AI SDK 5 (stable - released July 31, 2025)

**Purpose:** Build AI-powered applications with multi-modal capabilities

**Main Packages:**

```bash
# Core SDK
npm install ai

# Provider packages
npm install @ai-sdk/openai        # OpenAI (GPT-4, GPT-5)
npm install @ai-sdk/anthropic     # Claude 3.x, 3.7
npm install @ai-sdk/google        # Gemini
npm install @ai-sdk/vercel        # Vercel AI Gateway

# React integration
npm install @ai-sdk/react
```

**Key Features (AI SDK 5):**

**1. Enhanced Type Safety:**
- End-to-end type safety for tools
- Custom message types with full typing
- Typed tool invocations and metadata

**2. Streaming Tool Calls:**
- Tool call inputs stream by default
- Partial updates as model generates
- Better UX for long-running operations

**3. Framework Support:**
- React, Vue, Svelte, Angular
- Complete feature parity across frameworks
- Server Components support

**4. Agent Capabilities:**
```typescript
import { Agent } from 'ai'

const agent = new Agent({
  model: 'gpt-4',
  tools: { searchWeb, readDatabase },
  stopWhen: (result) => result.finished,
  prepareStep: (step) => ({
    maxTokens: 1000,
    temperature: 0.7
  })
})
```

**5. Multi-Modal Support:**
```typescript
// Text-to-speech (experimental)
const audio = await generateSpeech({
  model: 'openai-tts',
  text: 'Hello world'
})

// Transcription
const text = await transcribe({
  model: 'deepgram-nova',
  audio: audioFile
})
```

**6. Streaming with SSE:**
- Server-Sent Events based streaming
- Better than WebSockets for one-way data flow
- Works seamlessly with Next.js

**What's New in AI SDK 6 (Beta):**
- Marketplace agents and services
- Workflow support for TypeScript
- Vercel Agent for code reviews
- Python SDK for FastAPI/Flask
- Open-source templates

---

### AI Elements

**Released:** August 2025
**Purpose:** Pre-built React components for AI interfaces

```bash
npm install @ai-sdk/ui-elements
```

**Features:**
- Customizable React components
- Chat interfaces
- Message bubbles
- Streaming indicators
- Tool call visualizations

---

### AI Gateway

**Purpose:** Unified API for 100+ AI models with zero markup

**Features:**
- Model switching without code changes
- Rate limiting and caching
- Cost tracking
- Model fallbacks
- Request logging

**Usage:**
```typescript
import { createOpenAI } from '@ai-sdk/openai'

const openai = createOpenAI({
  baseURL: 'https://api.vercel.ai/gateway/openai/v1',
  apiKey: process.env.OPENAI_API_KEY
})
```

---

### Next.js

**Current Version:** 16.0.3 (in your stack) ✅ Updated Nov 16, 2025
**Released:** October 21, 2025

**Core Package:**
```bash
npm install next@latest
```

**Related Packages:**

```bash
# Create new projects
npx create-next-app@latest

# Codemods for upgrades
npx @next/codemod@canary upgrade

# Image optimization
npm install sharp  # Automatic in Next.js 16

# Environment variables
npm install dotenv  # Built-in support
```

**Major Features in Next.js 16:**

**1. Turbopack (Stable):**
- Default bundler for dev and production
- 2-5x faster builds
- 10x faster Fast Refresh
- File system caching (beta)

**2. Cache Components:**
```typescript
// Partial Pre-Rendering (PPR)
export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <DynamicContent />
    </Suspense>
  )
}

// New cache API
import { cache } from 'react'

export const getUser = cache(async (id: string) => {
  return await db.user.findUnique({ where: { id } })
})
```

**3. React Compiler Support (Stable):**
```javascript
// next.config.js
module.exports = {
  experimental: {
    reactCompiler: true
  }
}
```

**4. Enhanced Caching APIs:**
```typescript
import { updateTag, revalidateTag, refresh } from 'next/cache'

// Update cache tag
updateTag('posts')

// Revalidate with better control
revalidateTag('posts')

// Force refresh
refresh()
```

**5. Build Adapters API (Alpha):**
- Custom adapters for deployment platforms
- Hook into build process
- Platform-specific optimizations

**6. Next.js Devtools MCP:**
- Model Context Protocol integration
- AI-assisted debugging
- Contextual insights
- Claude/Cursor integration

**7. Proxy.ts (Replaces Middleware):**
```typescript
// proxy.ts (new)
export function proxy(request: Request) {
  // Network boundary logic
}

// middleware.ts (deprecated)
export function middleware(request: NextRequest) {
  // Old approach
}
```

---

## Supabase Ecosystem

### Supabase JavaScript SDK

**Current Version:** 2.48.1 (in your stack)
**Latest:** Continuously updated

**Core Packages:**

```bash
# Main client library
npm install @supabase/supabase-js

# Next.js specific
npm install @supabase/auth-helpers-nextjs
npm install @supabase/ssr

# React specific
npm install @supabase/auth-helpers-react
```

**2025 New Features:**

**1. MCP Server (Major Update):**
- Connect AI tools directly to Supabase
- Cursor/Claude integration
- Database queries via AI
- Schema exploration
- Migration assistance

**Installation:**
```bash
# Add to Claude Desktop config
{
  "mcpServers": {
    "supabase": {
      "url": "https://mcp.supabase.com/mcp"
    }
  }
}
```

**2. Fullstack UI Library:**
- shadcn-based components
- Drop into any React app
- Pre-built auth forms
- Data tables
- Admin panels

```bash
npm install @supabase/ui-components
```

**3. Edge Functions V2:**
- Deno 2.1 support
- Create, test, edit in Dashboard
- Better logging and monitoring
- Cron triggers
- Queue integration

**4. Supabase Queues:**
- Background job processing
- Scheduled tasks
- Retry logic
- Priority queues

**5. Enhanced pgvector:**
- pgvector 0.8.1
- Better vector search performance
- AI embeddings support
- Similarity search

---

### Supabase Client Usage

**Basic Setup:**
```typescript
// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

**Next.js App Router:**
```typescript
// app/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        }
      }
    }
  )
}
```

**Authentication:**
```typescript
// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
})

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password'
})

// OAuth (Google, GitHub, etc.)
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google'
})
```

**Database Operations:**
```typescript
// Select
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .eq('user_id', userId)

// Insert
const { data, error } = await supabase
  .from('posts')
  .insert({ title: 'My Post', content: 'Content' })

// Update
const { data, error } = await supabase
  .from('posts')
  .update({ title: 'Updated' })
  .eq('id', postId)

// Delete
const { data, error } = await supabase
  .from('posts')
  .delete()
  .eq('id', postId)
```

**Real-time:**
```typescript
const channel = supabase
  .channel('posts')
  .on('postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'posts' },
    (payload) => {
      console.log('New post:', payload.new)
    }
  )
  .subscribe()
```

**Storage:**
```typescript
// Upload
const { data, error } = await supabase.storage
  .from('avatars')
  .upload('public/avatar.png', file)

// Download
const { data, error } = await supabase.storage
  .from('avatars')
  .download('public/avatar.png')

// Get URL
const { data } = supabase.storage
  .from('avatars')
  .getPublicUrl('public/avatar.png')
```

---

### Supabase CLI

**Installation:**
```bash
npm install supabase --save-dev
# or
brew install supabase/tap/supabase
```

**Commands:**
```bash
supabase init          # Initialize project
supabase start         # Start local instance
supabase stop          # Stop local instance
supabase db reset      # Reset database
supabase db push       # Push migrations
supabase db pull       # Pull remote schema
supabase functions new # Create edge function
supabase functions deploy # Deploy edge function
```

---

## Expo Ecosystem

### Expo SDK 53

**Current Version:** 53.0.9 (in your stack)
**Released:** 2025
**React Native:** 0.79.2
**React:** 19.2.0

**Core Installation:**
```bash
npm install expo@latest
```

---

### Major Updates in SDK 53

**1. New Architecture Enabled by Default:**
- Faster performance
- Better memory usage
- Bridgeless mode
- Concurrent rendering

**2. New Modules:**

**expo-audio (Stable):**
```bash
npm install expo-audio
```

```typescript
import { useAudioPlayer } from 'expo-audio'

export function AudioPlayer() {
  const player = useAudioPlayer(audioSource)

  return (
    <Button onPress={() => player.play()}>
      Play Audio
    </Button>
  )
}
```

**expo-background-task (New):**
```bash
npm install expo-background-task
```

```typescript
import * as BackgroundTask from 'expo-background-task'

// Android: Uses WorkManager
// iOS: Uses background fetch

BackgroundTask.register('sync-data', async () => {
  await syncData()
  return BackgroundTask.Result.Success
})
```

**expo-maps (Alpha):**
```bash
npm install expo-maps
```

```typescript
import { MapView } from 'expo-maps'

<MapView
  initialCamera={{
    center: { latitude: 37.7749, longitude: -122.4194 },
    zoom: 12
  }}
/>
```

**3. Deprecated:**
- `expo-av` (replaced by `expo-video` + `expo-audio`)

---

### Essential Expo Modules (In Your Stack)

**File System & Storage:**
```bash
npm install expo-document-picker    # Pick documents
npm install expo-image-picker        # Pick images/videos
npm install expo-secure-store        # Encrypted storage
npm install @react-native-async-storage/async-storage  # Key-value store
```

**Device & System:**
```bash
npm install expo-constants           # App constants
npm install expo-device              # Device info
npm install expo-linking             # Deep linking
```

**Usage Examples:**

```typescript
// Image Picker
import * as ImagePicker from 'expo-image-picker'

const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1
  })

  if (!result.canceled) {
    setImage(result.assets[0].uri)
  }
}

// Secure Store
import * as SecureStore from 'expo-secure-store'

await SecureStore.setItemAsync('token', userToken)
const token = await SecureStore.getItemAsync('token')

// Deep Linking
import * as Linking from 'expo-linking'

const url = Linking.createURL('profile', {
  queryParams: { id: '123' }
})
// Result: myapp://profile?id=123
```

---

### Expo Router

**Current:** Included in Expo SDK 53

**Features:**
- File-based routing
- Type-safe navigation
- Layouts and groups
- Deep linking
- Universal (web + native)

**Example:**
```typescript
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  )
}
```

---

### Expo Atlas

**Purpose:** Bundle analyzer for Expo/React Native

```bash
npx expo-atlas
```

**Features:**
- Visualize JavaScript bundle
- Identify large dependencies
- Optimize bundle size
- Performance insights

---

### EAS (Expo Application Services)

**Purpose:** Build and deploy native apps

**Installation:**
```bash
npm install -g eas-cli
eas login
```

**Commands:**
```bash
eas build --platform ios      # Build for iOS
eas build --platform android  # Build for Android
eas submit --platform ios     # Submit to App Store
eas submit --platform android # Submit to Play Store
eas update                     # Over-the-air updates
```

**Configuration (eas.json):**
```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "distribution": "store"
    }
  }
}
```

---

## Data & API Tools

### tRPC

**Current Version:** 11.4.3 (in your stack)
**Latest:** v11 (released March 21, 2025)

**Installation:**
```bash
# Server
npm install @trpc/server

# Client
npm install @trpc/client @trpc/react-query
```

**What's New in v11:**

**1. Server-Sent Events (SSE) for Subscriptions:**
```typescript
// Server
export const appRouter = router({
  onPostCreate: publicProcedure
    .subscription(() => {
      return observable<Post>((emit) => {
        const interval = setInterval(() => {
          emit.next({ id: '1', title: 'New Post' })
        }, 1000)

        return () => clearInterval(interval)
      })
    })
})

// Client
const { data } = trpc.onPostCreate.useSubscription()
```

**2. Improved Type Inference:**
- Better TypeScript performance
- Faster IDE autocomplete
- Reduced compile times

**3. New Adapters:**
- Bun support
- Cloudflare Workers
- AWS Lambda
- Vercel Edge Functions

**Usage in Your Stack:**

```typescript
// packages/api/src/router/post.ts
import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'

export const postRouter = router({
  getAll: protectedProcedure
    .query(async ({ ctx }) => {
      return await ctx.supabase
        .from('posts')
        .select('*')
    }),

  create: protectedProcedure
    .input(z.object({
      title: z.string(),
      content: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.supabase
        .from('posts')
        .insert(input)
    })
})
```

```typescript
// packages/app/features/posts/screen.tsx
import { api } from 'app/utils/api'

export function PostsScreen() {
  const { data, isLoading } = api.post.getAll.useQuery()
  const createPost = api.post.create.useMutation()

  if (isLoading) return <Spinner />

  return (
    <YStack>
      {data?.map(post => <PostCard key={post.id} post={post} />)}
      <Button onPress={() => createPost.mutate({
        title: 'New Post',
        content: 'Content'
      })}>
        Create Post
      </Button>
    </YStack>
  )
}
```

---

### TanStack Query (React Query)

**Current Version:** 5.90.9 (in your stack) ✅ Updated Nov 16, 2025
**Latest:** 5.90.9 (Nov 14, 2025)

**Installation:**
```bash
npm install @tanstack/react-query
```

**What's New in v5:**

**1. Smaller Bundle (~20% reduction):**
- Simplified APIs
- Removed overloads
- Tree-shakable code

**2. Suspense Support:**
```typescript
import { useSuspenseQuery } from '@tanstack/react-query'

function Component() {
  // Throws promise during loading
  const { data } = useSuspenseQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  })

  // data is always defined here
  return <PostList posts={data} />
}
```

**3. Mutation State:**
```typescript
import { useMutationState } from '@tanstack/react-query'

function Component() {
  // Get state of all mutations
  const mutations = useMutationState({
    filters: { status: 'pending' }
  })

  return (
    <YStack>
      {mutations.length} pending mutations
    </YStack>
  )
}
```

**4. Query Options (Type-Safe):**
```typescript
import { queryOptions } from '@tanstack/react-query'

const postOptions = queryOptions({
  queryKey: ['posts'],
  queryFn: fetchPosts
})

// Use in component
const { data } = useQuery(postOptions)

// Use in prefetch
queryClient.prefetchQuery(postOptions)

// Type-safe getData
const posts = queryClient.getQueryData(postOptions.queryKey)
// posts is typed as Post[] | undefined
```

**5. Infinite Queries with maxPages:**
```typescript
const { data } = useInfiniteQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  getNextPageParam: (lastPage) => lastPage.nextCursor,
  maxPages: 3  // Only keep 3 pages in memory
})
```

**6. React Server Components (Experimental):**
```typescript
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

export default async function Page() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts />
    </HydrationBoundary>
  )
}
```

**7. Status Naming:**
- `isLoading` → `isPending`
- `loading` → `pending`

---

## State Management

### Zustand

**Current Version:** 5.0.2 (in your stack)
**Latest:** V5 (2025)

**Installation:**
```bash
npm install zustand
```

**What's New in v5:**

**1. React 18 Integration:**
- Uses `useSyncExternalStore`
- Better concurrent rendering
- Improved performance

**2. Tiny Bundle:**
- Only ~3KB gzipped
- No dependencies
- Tree-shakable

**3. TypeScript First:**
```typescript
import { create } from 'zustand'

interface BearState {
  bears: number
  increase: () => void
  decrease: () => void
}

const useBearStore = create<BearState>((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
  decrease: () => set((state) => ({ bears: state.bears - 1 }))
}))
```

**4. Middleware:**

```typescript
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user })
    }),
    {
      name: 'user-storage' // localStorage key
    }
  )
)
```

**5. Devtools:**
```typescript
import { devtools } from 'zustand/middleware'

const useStore = create(
  devtools(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 }))
    })
  )
)
```

**6. Selective Rendering:**
```typescript
// Only re-renders when bears changes
function BearCounter() {
  const bears = useBearStore((state) => state.bears)
  return <h1>{bears} bears</h1>
}

// Only re-renders when increase changes (never)
function Controls() {
  const increase = useBearStore((state) => state.increase)
  return <button onClick={increase}>+1</button>
}
```

**Usage in Your Stack:**

```typescript
// utils/global-store/index.ts
import { create } from 'zustand'

interface AppState {
  sidebarOpen: boolean
  toggleSidebar: () => void
  user: User | null
  setUser: (user: User | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({
    sidebarOpen: !state.sidebarOpen
  })),
  user: null,
  setUser: (user) => set({ user })
}))
```

---

## Validation & Type Safety

### Zod

**Current Version:** 3.25.76 (in your stack) ✅ Updated Nov 16, 2025 - Staying on v3 for @ts-react/form compatibility
**Latest:** 4.1.9 (November 2025)

**Installation:**
```bash
npm install zod
```

**What's New in Zod 4:**

**1. Massive Performance Improvements:**
- 14x faster string parsing
- 7x faster array parsing
- 6.5x faster object parsing
- 20x reduction in compiler instantiations
- Faster type-checking and builds

**2. Smaller Bundle:**
- 57% smaller than v3
- Better tree-shaking

**3. @zod/mini:**
```bash
npm install @zod/mini
```
- Only 1.9KB gzipped
- For simple validation needs
- Tree-shakable

**4. Built-in JSON Schema:**
```typescript
import { z } from 'zod'

const userSchema = z.object({
  name: z.string(),
  age: z.number()
})

// Convert to JSON Schema
const jsonSchema = userSchema.toJsonSchema()
```

**5. File Validation:**
```typescript
const fileSchema = z.instanceof(File).refine(
  (file) => file.size <= 5000000,
  'File must be less than 5MB'
)
```

**6. Internationalization:**
```typescript
import { z } from 'zod'
import { zodI18n } from '@zod/i18n'

z.setErrorMap(zodI18n({ locale: 'es' }))
```

**7. Template Literals:**
```typescript
const urlSchema = z.string().regex(/^https:\/\/.*/)
// or
type URL = `https://${string}`
const urlSchema = z.custom<URL>()
```

**Usage with tRPC:**
```typescript
import { z } from 'zod'

const createPostSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1),
  published: z.boolean().default(false),
  tags: z.array(z.string()).optional()
})

export const postRouter = router({
  create: protectedProcedure
    .input(createPostSchema)
    .mutation(async ({ input, ctx }) => {
      // input is fully typed and validated
      return await ctx.supabase
        .from('posts')
        .insert(input)
    })
})
```

**Usage with React Hook Form:**
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Login</button>
    </form>
  )
}
```

---

### TypeScript

**Current Version:** 5.8.3 (in your stack)
**Latest:** 5.8.x (November 2025)

**Installation:**
```bash
npm install typescript --save-dev
```

**Key Features in TS 5.x:**
- Decorators (stable)
- Const type parameters
- Better type inference
- Faster compile times
- Improved IDE performance

---

## Email & Communication

### Resend

**Current Version:** 6.4.2 (in your stack)
**Latest:** Updated November 15, 2025

**Installation:**
```bash
npm install resend
npm install react-email @react-email/components
```

**Setup:**

```typescript
// lib/resend.ts
import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)
```

**Send Email:**

```typescript
// app/api/send/route.ts
import { resend } from '@/lib/resend'
import { WelcomeEmail } from '@/emails/welcome'

export async function POST() {
  const { data, error } = await resend.emails.send({
    from: 'onboarding@example.com',
    to: 'user@example.com',
    subject: 'Welcome!',
    react: WelcomeEmail({ name: 'John' })
  })

  if (error) {
    return Response.json({ error }, { status: 500 })
  }

  return Response.json(data)
}
```

**Email Template (React Email):**

```typescript
// emails/welcome.tsx
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button
} from '@react-email/components'

export function WelcomeEmail({ name }: { name: string }) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f6f9fc' }}>
        <Container>
          <Heading>Welcome, {name}!</Heading>
          <Text>Thanks for signing up.</Text>
          <Button href="https://example.com/login">
            Get Started
          </Button>
        </Container>
      </Body>
    </Html>
  )
}
```

**Features:**
- React components for emails
- TypeScript support
- Server Actions integration
- Template previews
- Multiple providers

---

## Payments

### Stripe

**Current Version:** 17.3.1 (in your stack)
**Latest:** Continuous updates
**API Version:** 2025-02-24.acacia

**Installation:**

```bash
# Server-side (Node.js)
npm install stripe

# Client-side (React)
npm install @stripe/stripe-js @stripe/react-stripe-js

# React Native
npm install @stripe/stripe-react-native
```

**Server Setup:**

```typescript
// lib/stripe.ts
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
  typescript: true
})
```

**Client Setup (Web):**

```typescript
// app/layout.tsx
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export default function RootLayout({ children }) {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  )
}
```

**Payment Intent:**

```typescript
// app/api/create-payment-intent/route.ts
import { stripe } from '@/lib/stripe'

export async function POST(req: Request) {
  const { amount } = await req.json()

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // cents
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true
    }
  })

  return Response.json({
    clientSecret: paymentIntent.client_secret
  })
}
```

**Checkout Form:**

```typescript
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

export function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) return

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'https://example.com/success'
      }
    })

    if (error) {
      console.error(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit">Pay</button>
    </form>
  )
}
```

**React Native:**

```typescript
import { useStripe } from '@stripe/stripe-react-native'

function CheckoutScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe()

  const openCheckout = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      paymentIntentClientSecret: clientSecret
    })

    if (!error) {
      await presentPaymentSheet()
    }
  }
}
```

**Features:**
- TypeScript definitions included
- Payment intents
- Subscriptions
- Webhooks
- Customer portal
- Tax calculations

---

## UI & Styling

### Tamagui

**Current Version:** 1.138.0 (in your stack) ✅ Updated Nov 16, 2025
**Latest:** 1.138.0 (Nov 2025)

**Core Packages:**

```bash
# Core
npm install tamagui @tamagui/config

# Themes
npm install @tamagui/themes

# Icons
npm install @tamagui/lucide-icons

# Animations
npm install @tamagui/animations-react-native
npm install @tamagui/animations-css  # web only

# Colors
npm install @tamagui/colors

# Fonts
npm install @tamagui/font-inter

# Next.js plugin
npm install @tamagui/next-plugin
```

**Latest Updates:**
- Active maintenance (patch 15 hours ago)
- React 19 compatibility (Issue #3582 resolved)
- Performance improvements
- Bug fixes

**Key Features:**
- Universal components (web + native)
- Optimized compiler
- Theme system
- Responsive design
- Type-safe props
- CSS extraction (web)
- StyleSheet optimization (native)

---

### Solito

**Current Version:** 5.0.0 (in your stack)
**Released:** October 21, 2025

**Installation:**
```bash
npm install solito
```

**Major Changes in 5.0:**
- Dropped `react-native-web` dependency
- Web-first architecture
- Returns Next.js components directly
- Can use web props (className, style, etc.)
- Lost react-native-web reset styles

**Navigation Hooks:**

**App Router:**
```typescript
import { useRouter, usePathname } from 'solito/navigation'

function Component() {
  const router = useRouter()
  const pathname = usePathname()

  router.push('/profile')
}
```

**Pages Router:**
```typescript
import { useRouter } from 'solito/router'

function Component() {
  const router = useRouter()

  router.push('/profile')
}
```

**Links:**
```typescript
import { Link } from 'solito/link'

<Link href="/profile">
  <Text>View Profile</Text>
</Link>
```

---

## Testing Tools

### Vitest

**Current Version:** 4.0.8 (in your stack)
**Latest:** 4.x (2025)

**Installation:**
```bash
npm install vitest --save-dev
npm install @vitest/ui --save-dev
```

**Features:**
- Vite-powered
- Jest-compatible API
- Fast and modern
- TypeScript support
- UI mode

**Configuration:**
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts']
  }
})
```

---

### Playwright

**Current Version:** 1.56.1 (in your stack)
**Latest:** 1.56.x (November 2025)

**Installation:**
```bash
npm install @playwright/test --save-dev
```

**Features:**
- Cross-browser testing
- Auto-wait
- Network mocking
- Screenshots/videos
- Component testing
- Trace viewer

**Example Test:**
```typescript
import { test, expect } from '@playwright/test'

test('user can login', async ({ page }) => {
  await page.goto('http://localhost:3000')

  await page.fill('input[name="email"]', 'test@example.com')
  await page.fill('input[name="password"]', 'password')
  await page.click('button[type="submit"]')

  await expect(page).toHaveURL('/dashboard')
})
```

---

### Testing Library

**Current Versions:**
- `@testing-library/react`: 16.3.0
- `@testing-library/jest-dom`: 6.9.1

**Installation:**
```bash
npm install @testing-library/react --save-dev
npm install @testing-library/jest-dom --save-dev
npm install @testing-library/user-event --save-dev
```

---

## SDK Quick Reference Matrix

| Category | Package | Your Version | Latest | Status |
|----------|---------|--------------|--------|--------|
| **AI** | `ai` | 5.0.68 | 5.0.68 | ✅ Current |
| **AI** | `@ai-sdk/openai` | 2.0.48 | 2.0.48 | ✅ Current |
| **Framework** | `next` | 16.0.3 | 16.0.3 | ✅ Up to date |
| **Framework** | `react` | 19.2.0 | 19.2.0 | ✅ Current |
| **Database** | `@supabase/supabase-js` | 2.48.1 | Latest | ✅ Current |
| **Mobile** | `expo` | 53.0.9 | 53.0.9 | ✅ Current |
| **Navigation** | `solito` | 5.0.0 | 5.0.0 | ✅ Current |
| **UI** | `tamagui` | 1.138.0 | 1.138.0 | ✅ Up to date |
| **API** | `@trpc/server` | 11.4.3 | 11.4.3 | ✅ Current |
| **Data** | `@tanstack/react-query` | 5.90.9 | 5.90.9 | ✅ Up to date |
| **State** | `zustand` | 5.0.2 | 5.0.x | ✅ Current |
| **Validation** | `zod` | 3.25.76 | 4.1.9 | ⚠️ Staying on v3 for compatibility |
| **Email** | `resend` | 6.4.2 | 6.4.2 | ✅ Current |
| **Payments** | `stripe` | 17.3.1 | 17.3.1 | ✅ Current |
| **Testing** | `vitest` | 4.0.8 | 4.0.8 | ✅ Current |
| **Testing** | `@playwright/test` | 1.56.1 | 1.56.1 | ✅ Current |

---

## Recent Upgrades Completed

### ✅ Completed on November 16, 2025

**Next.js 16.0.1 → 16.0.3:**
- Minor patches
- Bug fixes
- Status: ✅ Completed

**Tamagui 1.137.0 → 1.138.0:**
- Bug fixes
- Performance improvements
- No breaking changes
- Status: ✅ Completed

**TanStack Query 5.83.0 → 5.90.9:**
- Bug fixes
- Performance improvements
- No breaking changes
- Status: ✅ Completed

**Zod 3.22.2 → 3.25.76:**
- Staying on v3 for @ts-react/form compatibility
- Upgraded to latest 3.x release
- Status: ✅ Completed
- Note: Zod 4.x upgrade deferred (see ZOD-4-MIGRATION-OPTIONS-2025.md)

---

### Future Considerations

**Zod 3.25.76 → 4.1.9:**
- 14x faster parsing
- 57% smaller bundle
- Breaking changes - requires form library migration
- Status: ⚠️ Deferred - See ZOD-4-MIGRATION-OPTIONS-2025.md

```bash
npm install next@latest
```

---

## Summary

Your stack has access to **comprehensive SDK ecosystems** across:

✅ **AI Development** - Vercel AI SDK 5/6, multi-modal, agents
✅ **Backend** - Supabase with MCP, Edge Functions V2, Queues
✅ **Mobile** - Expo SDK 53 with New Architecture
✅ **Type-Safe APIs** - tRPC v11 with SSE subscriptions
✅ **Data Fetching** - TanStack Query v5 with Suspense
✅ **State Management** - Zustand v5 (3KB!)
✅ **Validation** - Zod v3.25.76 (staying on v3 for compatibility)
✅ **Email** - Resend + React Email
✅ **Payments** - Stripe with full TypeScript
✅ **UI** - Tamagui universal components
✅ **Testing** - Vitest + Playwright

**All packages are current** as of November 16, 2025. Recent upgrades completed: Next.js 16.0.3, Tamagui 1.138.0, TanStack Query 5.90.9, and Zod 3.25.76. Staying on Zod v3 for @ts-react/form compatibility (see ZOD-4-MIGRATION-OPTIONS-2025.md for future Zod 4 migration path).

---

*For more details on any SDK, see their official documentation or ask for specific implementation examples.*
