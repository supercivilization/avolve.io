# Advanced Track: Capability Dependencies

> **Key Principle**: This track is structured by **capability dependencies**, not arbitrary timelines. Each advanced capability builds on specific foundational knowledge.

**Last Updated**: September 30, 2025

---

## 🎯 Advanced Learning Philosophy

**Prerequisites**: Complete **[Foundational Track](./foundational-track.md)** first. Advanced capabilities assume you can already build full-stack AI-native applications.

**Capability-Based**: Each section focuses on a specific capability you want to achieve and what you need to know to achieve it.

**Non-Linear**: Unlike the foundational track, you can pursue these capabilities in any order based on your needs. However, each capability has explicit prerequisites.

---

## 📊 Capability Dependency Map

```
Foundational Track Complete
    ↓
    ├─→ Performance Optimization ──→ Production Deployment
    │                                      ↓
    ├─→ Enterprise Architecture ──────────┤
    │                                      ↓
    ├─→ Advanced AI Patterns ─────────────┤
    │                                      ↓
    └─→ Security Hardening ───────────────┴→ Scaling Strategies
```

---

## Capability 1: Performance Optimization

**Prerequisites**:
- ✅ Foundational track complete
- ✅ Can measure current application performance
- ✅ Understand how to use browser DevTools

**Why This Capability**: Before scaling or deploying to production, you need to understand what performance problems you have and how to fix them.

### What You Need to Learn

**Measurement First** (you can't optimize what you don't measure):
- Core Web Vitals (LCP, FID, CLS)
- React DevTools Profiler
- Next.js Speed Insights
- Lighthouse audits
- Real User Monitoring (RUM)

**Then Optimization**:
- Bundle size optimization
- Code splitting strategies
- Image optimization
- Caching strategies
- Database query optimization
- Server Component vs Client Component choices

### Dependency Chain

```
Can measure performance
    ↓
Identify bottlenecks
    ↓
Apply appropriate optimizations
    ↓
Measure improvements
    ↓
Repeat until targets met
```

### Practical Application

```typescript
// Before: Client Component fetching data
'use client';

import { useEffect, useState } from 'react';

export function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users').then(r => r.json()).then(setUsers);
  }, []);

  return <div>{users.map(u => <div key={u.id}>{u.name}</div>)}</div>;
}

// After: Server Component with no client JavaScript
export async function UserList() {
  const users = await fetchUsers(); // Server-side fetch

  return <div>{users.map(u => <div key={u.id}>{u.name}</div>)}</div>;
}
```

**Why This Works**:
- No client-side JavaScript bundle for data fetching
- No loading state needed (SSR)
- No hydration cost for static content
- Faster initial page load

### Self-Assessment Checklist

You've achieved this capability when you can:
- [ ] Measure Core Web Vitals accurately
- [ ] Identify performance bottlenecks
- [ ] Apply appropriate optimization techniques
- [ ] Reduce bundle sizes by 30%+ when needed
- [ ] Achieve "Good" Core Web Vitals scores
- [ ] Optimize database queries for sub-100ms response

### Resources

- **[Next.js Performance Guide](https://nextjs.org/docs/app/building-your-application/optimizing)**
- **[React Performance Optimization](https://react.dev/learn/render-and-commit)**
- **Performance monitoring tools**: Vercel Analytics, Lighthouse

---

## Capability 2: Production Deployment Patterns

**Prerequisites**:
- ✅ Foundational track complete
- ✅ Performance optimization basics understood
- ✅ Understanding of environment variables and secrets

**Why This Capability**: Production deployment is fundamentally different from local development. You need to understand reliability, monitoring, and rollback strategies.

### What You Need to Learn

**Before Deploying**:
- Environment management (dev, staging, production)
- Secret management (API keys, database credentials)
- Build optimization
- Error tracking setup
- Monitoring and observability

**Deployment Patterns**:
- Continuous deployment from Git
- Preview deployments for pull requests
- Rollback strategies
- Health checks and status pages
- Edge deployment vs serverless functions

### Dependency Chain

```
Local development working
    ↓
Environment variables configured
    ↓
Build succeeds locally
    ↓
Deploy to preview environment
    ↓
Verify functionality in preview
    ↓
Deploy to production
    ↓
Monitor and observe
```

### Practical Application

```typescript
// Environment configuration with type safety
const config = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY, // Server-only
  },
  ai: {
    openaiKey: process.env.OPENAI_API_KEY, // Server-only
    anthropicKey: process.env.ANTHROPIC_API_KEY, // Server-only
  },
} as const;

// Type-safe environment validation
if (!config.supabase.url) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
}

// Error tracking in production
import { captureException } from '@/lib/error-tracking';

try {
  await riskyOperation();
} catch (error) {
  captureException(error);
  throw error; // Re-throw after capturing
}
```

### Self-Assessment Checklist

You've achieved this capability when you can:
- [ ] Deploy applications to production successfully
- [ ] Manage secrets securely
- [ ] Roll back deployments when needed
- [ ] Monitor production applications
- [ ] Debug production issues
- [ ] Implement CI/CD pipelines

### Resources

- **[Vercel Deployment Guide](../../guides/backend-infrastructure/vercel-complete-guide.md)**
- **[Next.js Production Checklist](https://nextjs.org/docs/app/building-your-application/deploying/production-checklist)**

---

## Capability 3: Enterprise Architecture Patterns

**Prerequisites**:
- ✅ Foundational track complete
- ✅ Experience building multiple applications
- ✅ Understanding of design patterns

**Why This Capability**: As applications grow, you need architectural patterns that scale with complexity, not against it.

### What You Need to Learn

**Architectural Patterns**:
- Monorepo vs polyrepo strategies
- Shared component libraries
- API design patterns (RESTful, tRPC, GraphQL)
- State management at scale
- Feature flags and gradual rollouts
- Multi-tenancy patterns

**Code Organization**:
- Domain-driven design
- Clean architecture layers
- Dependency injection
- Testing strategies
- Documentation patterns

### Dependency Chain

```
Simple application working
    ↓
Identify repeated patterns
    ↓
Extract reusable abstractions
    ↓
Create shared libraries
    ↓
Establish architectural guidelines
    ↓
Scale to multiple applications
```

### Practical Application

```typescript
// Feature flag pattern for gradual rollouts
export function useFeatureFlag(flagName: string) {
  const { user } = useAuth();

  // Check if user has access to this feature
  return isFeatureEnabled(flagName, user);
}

// Usage in component
export function Dashboard() {
  const hasNewDashboard = useFeatureFlag('new_dashboard_ui');

  if (hasNewDashboard) {
    return <NewDashboard />;
  }

  return <LegacyDashboard />;
}

// Multi-tenancy pattern with RLS
export async function getTenantData(tenantId: string) {
  const supabase = createClient();

  // RLS automatically filters by tenant
  const { data } = await supabase
    .from('data')
    .select('*')
    .eq('tenant_id', tenantId);

  return data;
}
```

### Self-Assessment Checklist

You've achieved this capability when you can:
- [ ] Design scalable application architectures
- [ ] Implement shared component libraries
- [ ] Create reusable API patterns
- [ ] Manage feature flags effectively
- [ ] Implement multi-tenancy correctly
- [ ] Document architectural decisions

### Resources

- **[Full-Stack Development Guide](../../guides/specialized/full-stack-development-complete-guide.md)**
- **Design pattern resources**: Refactoring.guru, Patterns.dev

---

## Capability 4: Advanced AI Patterns

**Prerequisites**:
- ✅ Foundational track complete (especially Stage 5: AI Integration)
- ✅ Experience with basic AI SDK usage
- ✅ Understanding of async patterns and streaming

**Why This Capability**: Basic AI integration is straightforward. Advanced patterns require understanding context management, tool calling, and multi-step workflows.

### What You Need to Learn

**Advanced Patterns**:
- Context window management
- Tool calling and function execution
- Multi-agent workflows
- RAG (Retrieval Augmented Generation)
- Fine-tuning and embeddings
- Streaming with tool calls
- Error handling and retry strategies

**Production Considerations**:
- Cost optimization (token usage)
- Rate limiting and quotas
- Caching strategies
- Prompt engineering
- Model selection by task

### Dependency Chain

```
Basic AI integration working
    ↓
Understand context limitations
    ↓
Implement context management
    ↓
Add tool calling capabilities
    ↓
Create multi-step workflows
    ↓
Optimize for production use
```

### Practical Application

```typescript
// Advanced: Multi-step agent with tools
'use server';

import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

const tools = {
  search: async ({ query }: { query: string }) => {
    // Search database or external API
    return await searchDatabase(query);
  },
  analyze: async ({ data }: { data: any }) => {
    // Analyze data
    return await analyzeData(data);
  },
};

export async function runAgent(userInput: string) {
  const result = await generateText({
    model: openai('gpt-4'),
    tools,
    maxSteps: 5, // Allow multi-step reasoning
    prompt: userInput,
  });

  return result.text;
}

// RAG pattern with embeddings
import { embed } from 'ai';

export async function semanticSearch(query: string) {
  // Generate embedding for query
  const { embedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: query,
  });

  // Search with vector similarity
  const { data } = await supabase.rpc('match_documents', {
    query_embedding: embedding,
    match_threshold: 0.8,
    match_count: 5,
  });

  return data;
}
```

### Self-Assessment Checklist

You've achieved this capability when you can:
- [ ] Implement multi-step agent workflows
- [ ] Create and use custom tools
- [ ] Manage context windows effectively
- [ ] Implement RAG patterns
- [ ] Optimize token usage and costs
- [ ] Handle streaming with tool calls

### Resources

- **[Vercel AI SDK Complete Guide](../../guides/ai-development/vercel-ai-sdk-complete-guide.md)**
- **[AI SDK API Reference](../../quick-reference/api-cheatsheets/vercel-ai-sdk-reference.md)**
- **Advanced patterns**: Vercel AI SDK examples repository

---

## Capability 5: Security Hardening

**Prerequisites**:
- ✅ Foundational track complete
- ✅ Understanding of authentication and authorization
- ✅ Experience with Row Level Security basics

**Why This Capability**: Security is not optional. You need defense-in-depth strategies to protect user data and application integrity.

### What You Need to Learn

**Security Layers**:
- Authentication vs Authorization
- Row Level Security (RLS) policies
- Input validation and sanitization
- SQL injection prevention
- XSS and CSRF protection
- Rate limiting
- API security
- Secret management

**Production Security**:
- Security headers
- HTTPS enforcement
- Content Security Policy (CSP)
- Audit logging
- Intrusion detection
- Compliance (GDPR, HIPAA, SOC 2)

### Dependency Chain

```
Application functional
    ↓
Identify security requirements
    ↓
Implement authentication
    ↓
Add authorization layer (RLS)
    ↓
Validate all inputs
    ↓
Add rate limiting
    ↓
Audit and monitor
```

### Practical Application

```typescript
// Input validation with Zod
import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  age: z.number().int().positive().max(150),
});

export async function createUser(input: unknown) {
  // Validate before processing
  const validated = UserSchema.parse(input);

  // Now safe to use
  return await db.users.create(validated);
}

// Row Level Security policy
-- In Supabase SQL Editor
create policy "Users can only see their own data"
  on users for select
  using (auth.uid() = id);

create policy "Users can only update their own data"
  on users for update
  using (auth.uid() = id);

// Rate limiting middleware
import { ratelimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new Response('Rate limit exceeded', { status: 429 });
  }

  // Process request
}
```

### Self-Assessment Checklist

You've achieved this capability when you can:
- [ ] Implement proper authentication flows
- [ ] Create secure RLS policies
- [ ] Validate all user inputs
- [ ] Prevent common vulnerabilities (XSS, CSRF, SQL injection)
- [ ] Implement rate limiting
- [ ] Audit security regularly
- [ ] Handle secrets securely

### Resources

- **[Supabase Security Guide](../../guides/backend-infrastructure/supabase-complete-guide.md#security)**
- **[OWASP Top 10](https://owasp.org/www-project-top-ten/)**
- **Security headers**: securityheaders.com

---

## Capability 6: Scaling Strategies

**Prerequisites**:
- ✅ Foundational track complete
- ✅ Performance optimization capability achieved
- ✅ Production deployment experience
- ✅ Monitoring and observability in place

**Why This Capability**: Scaling is not just about handling more traffic - it's about maintaining performance and reliability as complexity grows.

### What You Need to Learn

**Scaling Dimensions**:
- Horizontal scaling (more instances)
- Vertical scaling (bigger instances)
- Database scaling (read replicas, connection pooling)
- Caching strategies (CDN, Redis, edge caching)
- Queue systems for background jobs
- Load balancing

**When to Scale** (Dependency-Based):
```
Monitor performance
    ↓
Identify bottlenecks
    ↓
Determine if optimization or scaling needed
    ↓
If optimization: optimize and measure
    ↓
If scaling: scale and measure
    ↓
Repeat
```

### Practical Application

```typescript
// Database connection pooling
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    db: {
      schema: 'public',
    },
    auth: {
      persistSession: false,
    },
    global: {
      fetch: (...args) => fetch(...args),
    },
  }
);

// Edge caching with stale-while-revalidate
export async function getCachedData() {
  return fetch('/api/data', {
    next: {
      revalidate: 60, // Cache for 60 seconds
      tags: ['data'],
    },
  });
}

// Background job queue pattern
import { Queue } from '@/lib/queue';

export async function processLargeUpload(fileId: string) {
  // Queue instead of processing synchronously
  await Queue.add('process-upload', {
    fileId,
    priority: 'normal',
  });

  return { status: 'queued' };
}
```

### Self-Assessment Checklist

You've achieved this capability when you can:
- [ ] Identify when to scale vs optimize
- [ ] Implement connection pooling
- [ ] Use caching effectively
- [ ] Handle background jobs
- [ ] Monitor scaling effectiveness
- [ ] Maintain performance under load

### Resources

- **[Vercel Edge Network Guide](../../guides/backend-infrastructure/vercel-complete-guide.md)**
- **[Supabase Scaling Guide](../../guides/backend-infrastructure/supabase-complete-guide.md#scaling)**
- **Performance monitoring**: Vercel Analytics, New Relic, DataDog

---

## 🎓 Advanced Track Completion

**Capabilities Achieved**:
- ✅ Performance Optimization - Can measure and improve application performance
- ✅ Production Deployment - Can deploy and maintain production applications
- ✅ Enterprise Architecture - Can design scalable application architectures
- ✅ Advanced AI Patterns - Can implement sophisticated AI workflows
- ✅ Security Hardening - Can secure applications against common threats
- ✅ Scaling Strategies - Can scale applications to handle growth

**What You Can Now Build**:
- Production-grade SaaS platforms
- Enterprise applications with security compliance
- High-performance AI-powered applications
- Scalable multi-tenant systems
- Applications handling millions of requests

**Next Steps**:
- Apply these capabilities to real-world production applications
- Share knowledge through blog posts, talks, or contributions
- Stay current with evolving best practices
- Mentor others on their learning journeys

---

## 📝 Notes on Capability-Based Learning

### Why This Approach Works

**Not Linear**: You don't need all capabilities at once. Choose what you need when you need it.

**Explicit Prerequisites**: Each capability clearly states what you need to know first.

**Measurable**: Self-assessment checklists help you verify you've achieved the capability.

**Practical**: Every capability includes working code examples showing real-world application.

### How to Use This Track

1. **Identify the capability you need** based on current project requirements
2. **Verify you meet prerequisites** before starting
3. **Learn by doing** - build real features that require the capability
4. **Measure success** using the self-assessment checklist
5. **Move to next capability** when ready

---

**Last Updated**: September 30, 2025
**Track Status**: Complete and Validated
**Next Review**: December 2025
