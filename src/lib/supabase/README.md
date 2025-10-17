# Supabase Configuration - Supercivilization Database

## Architecture Decision: Single Database

**Database Name:** `Supercivilization`
**Project ID:** `coybefkmcykzbeosjgyt`
**URL:** `https://coybefkmcykzbeosjgyt.supabase.co`

### Decision Rationale

After careful consideration, we chose a **single Supabase database** for both Supercivilization (main platform) and Avolve.io (admin orchestration tool) because:

1. **Tight Coupling**: Avolve.io is fundamentally the admin control panel for Supercivilization, not a separate product
2. **Unified Auth**: Admins are already authenticated in Supercivilization - no need for duplicate auth flows
3. **Direct Data Access**: Avolve orchestration needs direct access to Supercivilization data without API overhead
4. **Referential Integrity**: Foreign keys can link orchestration tasks to platform entities
5. **Simplified Operations**: One database means one backup strategy, one monitoring setup, one source of truth
6. **Easier Transactions**: Atomic operations across both systems (e.g., AI agent creates content in Supercivilization)

### Schema Organization

We use **table prefixes** to maintain clear separation:

```sql
-- Supercivilization Platform
users
content
communities
posts
comments

-- Avolve Admin Orchestration
avolve_agents
avolve_workflows
avolve_executions
avolve_logs
avolve_prompts
avolve_model_routing
```

Alternatively, you could use Postgres **schemas**:
```sql
public.users
public.content
avolve.agents
avolve.workflows
```

### Security via RLS

Row Level Security (RLS) policies provide the separation:

- **Platform tables**: Standard user RLS policies
- **Avolve tables**: Admin-only RLS policies
  ```sql
  -- Example: Only admins can access Avolve tables
  CREATE POLICY "Admins only" ON avolve_agents
    FOR ALL USING (
      auth.uid() IN (
        SELECT id FROM users WHERE role = 'admin'
      )
    );
  ```

### When to Reconsider

Split into separate databases only if:
- Avolve generates massive AI data (embeddings, logs) that would bloat the main DB
- You plan to offer Avolve as a service to other organizations
- Avolve needs dramatically different scaling characteristics (different regions, backup schedules, etc.)

## Usage Examples

### Client Component (Browser)
```tsx
'use client'

import { createBrowserClient } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export function MyComponent() {
  const [data, setData] = useState(null)
  const supabase = createBrowserClient()

  useEffect(() => {
    supabase.from('users').select().then(({ data }) => setData(data))
  }, [])

  return <div>{JSON.stringify(data)}</div>
}
```

### Server Component
```tsx
import { createServerClient } from '@/lib/supabase'

export default async function MyServerComponent() {
  const supabase = await createServerClient()
  const { data: users } = await supabase.from('users').select()

  return (
    <div>
      {users?.map(user => (
        <div key={user.id}>{user.email}</div>
      ))}
    </div>
  )
}
```

### Server Action
```tsx
'use server'

import { createServerClient } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('posts')
    .insert({
      title: formData.get('title'),
      content: formData.get('content'),
    })
    .select()
    .single()

  if (error) throw error

  revalidatePath('/posts')
  return data
}
```

### Admin Operation (Service Role)
```tsx
'use server'

import { createServiceRoleClient } from '@/lib/supabase'

export async function adminCreateUser(email: string) {
  // CAUTION: This bypasses RLS - admin operations only!
  const supabase = createServiceRoleClient()

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    email_confirm: true,
  })

  if (error) throw error
  return data
}
```

## Environment Variables

Required in `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://coybefkmcykzbeosjgyt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Security:** Never commit `.env.local` to git. It's already in `.gitignore`.

## Middleware Setup

Add to `src/middleware.ts` to enable auth refresh:
```tsx
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

## Database Schema Types

Generate TypeScript types from your database:
```bash
npx supabase gen types typescript --project-id coybefkmcykzbeosjgyt > src/lib/supabase/database.types.ts
```

Then use them:
```tsx
import { Database } from '@/lib/supabase/database.types'
import { createServerClient } from '@/lib/supabase'

const supabase = await createServerClient<Database>()
```

## MCP Integration

Supabase provides an MCP server for AI orchestration. Add to Claude Code MCP config:

```json
{
  "mcpServers": {
    "supabase": {
      "url": "https://mcp.supabase.com/mcp",
      "params": {
        "features": "database,docs,debugging,development,functions,storage",
        "project": "coybefkmcykzbeosjgyt"
      }
    }
  }
}
```

This allows AI assistants to help with database operations, schema design, and debugging.

## Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Changelog](https://supabase.com/changelog)
- [Next.js Integration Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [@supabase/ssr Docs](https://supabase.com/docs/guides/auth/server-side/nextjs)
