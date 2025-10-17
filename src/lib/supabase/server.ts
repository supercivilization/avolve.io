/**
 * Supabase Server Client
 *
 * For use in Server Components, Server Actions, and Route Handlers
 * This client runs on the server and manages auth through cookies
 *
 * Database: "Supercivilization"
 * - Main platform data (users, content, communities)
 * - Avolve admin orchestration (agents, workflows, logs)
 *
 * Usage:
 * ```ts
 * import { createClient } from '@/lib/supabase/server'
 *
 * export async function MyServerComponent() {
 *   const supabase = await createClient()
 *   const { data } = await supabase.from('users').select()
 *   return <div>{JSON.stringify(data)}</div>
 * }
 * ```
 */

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
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

/**
 * Service Role Client (Admin)
 *
 * CAUTION: This bypasses Row Level Security (RLS)
 * Only use for trusted admin operations in Server Components/Actions
 * Never expose this client to the browser
 */
export function createServiceRoleClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return []
        },
        setAll() {
          // No-op for service role client
        },
      },
    }
  )
}
