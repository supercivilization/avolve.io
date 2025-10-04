# Foundational Track: Dependency-Based Learning Path

> **Key Principle**: This track is structured by **dependencies and prerequisites**, not arbitrary timelines. Progress at your own pace - skip what you already know, focus on what you need to learn next.

**Last Updated**: September 30, 2025

---

## 🎯 Learning Philosophy

**NOT Timeline-Based**: We don't say "Week 1: TypeScript" because everyone learns at different speeds and has different prior knowledge.

**Dependency-Based**: Each stage explicitly states what you need to know before proceeding. This respects your pace and experience.

**Self-Assessment**: Before each stage, evaluate if you meet the prerequisites. If yes, proceed. If no, complete prerequisites first.

---

## 📊 Dependency Chain Overview

```
Start Here (No Prerequisites)
    ↓
TypeScript Fundamentals
    ↓
React 19 Concepts ←─────────────┐
    ↓                           │
Next.js App Router              │
    ↓                           │
Styling (Tailwind + shadcn/ui)  │
    ↓                           │
AI Integration (Vercel AI SDK)  │
    ↓                           │
Backend (Supabase) ─────────────┘
    ↓
Full-Stack AI-Native Application
```

---

## Stage 1: TypeScript Fundamentals

**Prerequisites**: None - Start here if you're new to TypeScript

**Why This First**: TypeScript is the foundation for everything in the modern stack. React, Next.js, and AI SDK are all TypeScript-first.

### What You Need to Learn

**Core Concepts**:
- Basic types (`string`, `number`, `boolean`, `array`, `object`)
- Type inference and type annotations
- Interfaces vs Types
- Union types and intersection types
- Generic types (basic understanding)
- Function signatures and return types

**Practical Application**:
```typescript
// You should be comfortable with code like this:
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

function getUser(id: string): Promise<User | null> {
  // Implementation
}

type ApiResponse<T> = {
  data: T;
  error?: string;
};
```

### Self-Assessment Checklist

Before proceeding to React, verify you can:
- [ ] Define interfaces and types
- [ ] Use type annotations for function parameters and returns
- [ ] Understand union types (`string | number`)
- [ ] Work with generic types (`Array<T>`, `Promise<T>`)
- [ ] Type async functions correctly

### Resources

- **[TypeScript Complete Guide](../../guides/frameworks/typescript-complete-guide.md)** - Comprehensive TypeScript documentation
- **[TypeScript API Patterns](../../quick-reference/api-cheatsheets/typescript-patterns-reference.md)** - Common patterns reference

### Completion State

✅ You're ready for Stage 2 when you can read and write TypeScript code without constantly looking up syntax.

---

## Stage 2: React 19 Concepts

**Prerequisites**:
- ✅ TypeScript fundamentals (Stage 1 complete)
- ✅ Basic HTML/CSS knowledge

**Why Now**: React is the UI layer. You need TypeScript first to understand React's type system.

### What You Need to Learn

**Core Concepts**:
- Components (function components, not classes)
- Props and prop types
- State with `useState`
- Effects with `useEffect`
- Component composition
- **Server Components** (React 19 innovation)
- **Server Actions** (React 19 data mutations)

**Key React 19 Features**:
- Server Components vs Client Components
- `'use client'` and `'use server'` directives
- Async components
- Suspense boundaries
- Actions API

**Practical Application**:
```typescript
// Client Component
'use client';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

export function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

// Server Component (default in Next.js)
interface UserProfileProps {
  userId: string;
}

export async function UserProfile({ userId }: UserProfileProps) {
  const user = await fetchUser(userId); // Can directly fetch data
  return <div>{user.name}</div>;
}
```

### Self-Assessment Checklist

Before proceeding to Next.js, verify you can:
- [ ] Create typed React components
- [ ] Manage component state with `useState`
- [ ] Use effects with `useEffect`
- [ ] Understand Server vs Client Components
- [ ] Use Server Actions for data mutations
- [ ] Compose components effectively

### Resources

- **[React 19 Complete Guide](../../guides/frameworks/react-19-complete-guide.md)** - Comprehensive React documentation
- **Official React Docs**: https://react.dev

### Completion State

✅ You're ready for Stage 3 when you can build interactive components with proper typing and understand Server Components.

---

## Stage 3: Next.js App Router

**Prerequisites**:
- ✅ TypeScript fundamentals (Stage 1 complete)
- ✅ React 19 concepts (Stage 2 complete)

**Why Now**: Next.js builds on React. You need React knowledge to understand Next.js routing, data fetching, and Server Components.

### What You Need to Learn

**Core Concepts**:
- File-based routing (`app/` directory)
- Route groups and layouts
- Loading and error states
- Server Components (default)
- Client Components (`'use client'`)
- Server Actions (`'use server'`)
- Data fetching patterns
- Route handlers (API routes)

**Key Next.js Patterns**:
```typescript
// app/users/[id]/page.tsx - Dynamic route
interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function UserPage({ params }: PageProps) {
  const user = await fetchUser(params.id); // Server-side fetch
  return <UserProfile user={user} />;
}

// app/actions.ts - Server Action
'use server';

export async function updateUser(formData: FormData) {
  const name = formData.get('name') as string;
  // Update user in database
  revalidatePath('/users');
}
```

### Self-Assessment Checklist

Before proceeding to Styling, verify you can:
- [ ] Create pages and nested routes
- [ ] Use layouts and templates
- [ ] Implement loading and error states
- [ ] Fetch data in Server Components
- [ ] Create and use Server Actions
- [ ] Handle route parameters and search params

### Resources

- **[Next.js Complete Guide](../../guides/frameworks/nextjs-complete-guide.md)** - Comprehensive Next.js documentation
- **[Next.js API Reference](../../quick-reference/api-cheatsheets/nextjs-app-router-reference.md)** - API cheatsheet

### Completion State

✅ You're ready for Stage 4 when you can build multi-page applications with proper routing and data fetching.

---

## Stage 4: Styling (Tailwind CSS + shadcn/ui)

**Prerequisites**:
- ✅ React 19 concepts (Stage 2 complete)
- ✅ Next.js App Router (Stage 3 complete)

**Why Now**: You have working components and pages. Now make them look professional.

### What You Need to Learn

**Tailwind CSS**:
- Utility-first CSS philosophy
- Responsive design with breakpoints
- Dark mode with `dark:` prefix
- Custom configuration
- Component styling patterns

**shadcn/ui**:
- Component installation and usage
- Theming and customization
- Radix UI primitives
- Accessibility patterns
- Component composition

**Practical Application**:
```typescript
// Using Tailwind + shadcn/ui
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <Button variant="default" size="lg">
          Get Started
        </Button>
      </Card>
    </div>
  );
}
```

### Self-Assessment Checklist

Before proceeding to AI Integration, verify you can:
- [ ] Use Tailwind utility classes confidently
- [ ] Implement responsive designs
- [ ] Install and customize shadcn/ui components
- [ ] Apply dark mode styling
- [ ] Create accessible UIs

### Resources

- **[Tailwind CSS Complete Guide](../../guides/ui-styling/tailwind-css-complete-guide.md)** - Comprehensive Tailwind documentation
- **[shadcn/ui Complete Guide](../../guides/ui-styling/shadcn-ui-complete-guide.md)** - Component system documentation

### Completion State

✅ You're ready for Stage 5 when your applications look professional and accessible.

---

## Stage 5: AI Integration (Vercel AI SDK)

**Prerequisites**:
- ✅ TypeScript fundamentals (Stage 1 complete)
- ✅ React 19 concepts (Stage 2 complete)
- ✅ Next.js App Router (Stage 3 complete)

**Why Now**: You have a working full-stack foundation. Now add AI capabilities.

### What You Need to Learn

**Core Concepts**:
- AI SDK Core (`generateText`, `generateObject`, `streamText`)
- AI SDK UI (`useChat`, `useCompletion`)
- Provider integration (OpenAI, Anthropic, Google)
- Streaming responses
- Tool calling / function calling
- Multi-modal capabilities

**Practical Application**:
```typescript
// Server Action with AI
'use server';

import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

export async function analyzeText(text: string) {
  const result = await generateObject({
    model: openai('gpt-4'),
    schema: z.object({
      sentiment: z.enum(['positive', 'negative', 'neutral']),
      summary: z.string(),
    }),
    prompt: `Analyze this text: ${text}`,
  });

  return result.object;
}

// Client Component with streaming chat
'use client';

import { useChat } from 'ai/react';

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>{m.content}</div>
      ))}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
      </form>
    </div>
  );
}
```

### Self-Assessment Checklist

Before proceeding to Backend, verify you can:
- [ ] Integrate AI providers (OpenAI, Anthropic, etc.)
- [ ] Generate text and structured data
- [ ] Implement streaming responses
- [ ] Use AI SDK UI hooks
- [ ] Handle tool/function calling
- [ ] Manage AI state and context

### Resources

- **[Vercel AI SDK Complete Guide](../../guides/ai-development/vercel-ai-sdk-complete-guide.md)** - Comprehensive AI SDK documentation
- **[Vercel AI SDK API Reference](../../quick-reference/api-cheatsheets/vercel-ai-sdk-reference.md)** - API cheatsheet

### Completion State

✅ You're ready for Stage 6 when you can integrate AI capabilities into your applications.

---

## Stage 6: Backend (Supabase)

**Prerequisites**:
- ✅ TypeScript fundamentals (Stage 1 complete)
- ✅ Next.js App Router (Stage 3 complete)
- ✅ Understanding of async/await patterns

**Why Now**: Your application needs persistent data, authentication, and real-time features.

### What You Need to Learn

**Core Concepts**:
- PostgreSQL database basics
- Supabase client initialization
- CRUD operations
- Row Level Security (RLS)
- Authentication (email, OAuth)
- Real-time subscriptions
- Storage (file uploads)
- Edge Functions

**Practical Application**:
```typescript
// Server-side Supabase client
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Fetch data with RLS
export async function getUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('active', true);

  if (error) throw error;
  return data;
}

// Real-time subscription
'use client';

import { useEffect, useState } from 'react';

export function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const channel = supabase
      .channel('users')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'users' },
        (payload) => {
          // Handle real-time updates
        }
      )
      .subscribe();

    return () => { channel.unsubscribe(); };
  }, []);

  return <div>{/* Render users */}</div>;
}
```

### Self-Assessment Checklist

Before considering yourself complete, verify you can:
- [ ] Initialize and configure Supabase client
- [ ] Perform CRUD operations
- [ ] Implement Row Level Security
- [ ] Set up authentication flows
- [ ] Use real-time subscriptions
- [ ] Handle file uploads with Storage
- [ ] Understand database schema design

### Resources

- **[Supabase Complete Guide](../../guides/backend-infrastructure/supabase-complete-guide.md)** - Comprehensive Supabase documentation
- **[Supabase API Reference](../../quick-reference/api-cheatsheets/supabase-api-reference.md)** - API cheatsheet

### Completion State

✅ You've completed the foundational track when you can build full-stack AI-native applications with authentication, database, and real-time features.

---

## 🎓 Completion: Full-Stack AI-Native Application

**Prerequisites Met**:
- ✅ TypeScript fundamentals
- ✅ React 19 concepts and Server Components
- ✅ Next.js App Router and routing patterns
- ✅ Professional UI with Tailwind + shadcn/ui
- ✅ AI integration with Vercel AI SDK
- ✅ Backend infrastructure with Supabase

**What You Can Now Build**:
- AI-powered web applications with chat interfaces
- Real-time collaborative applications
- Full-stack applications with authentication
- Production-ready SaaS products
- Applications with file storage and database
- Multi-user applications with proper security

**Next Steps**:
- **[Advanced Track](./advanced-track.md)** - Performance optimization, scaling, enterprise patterns
- **[Build Real Projects](../../quick-start/LEARNING_PATHS.md)** - Apply your knowledge to production applications
- **[Contribute](../../CONTRIBUTING.md)** - Share your knowledge and improve documentation

---

## 📝 Notes on This Approach

### Why Dependency-Based Works Better

**Traditional Timeline Approach**:
- ❌ "Week 1: TypeScript, Week 2: React, Week 3: Next.js"
- ❌ Assumes everyone learns at same pace
- ❌ Ignores prior knowledge
- ❌ Creates artificial pressure
- ❌ Not machine-readable for AI systems

**Dependency-Based Approach**:
- ✅ "Learn X before Y because Y depends on X"
- ✅ Respects individual learning pace
- ✅ Can skip what you already know
- ✅ Self-paced progression
- ✅ Clear causal relationships (AI can parse)

### How to Use This Track

1. **Start at the first stage where you don't meet prerequisites**
2. **Complete self-assessment checklists honestly**
3. **Move to next stage when prerequisites are met**
4. **Don't rush - understanding > speed**
5. **Build small projects at each stage to reinforce learning**

---

**Last Updated**: September 30, 2025
**Track Status**: Complete and Validated
**Next Review**: December 2025
