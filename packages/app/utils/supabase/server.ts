import { Database } from '@my/supabase/types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

/**
 * Create Supabase client for Server Components (App Router)
 * Use this in server components, server actions, and route handlers
 */
export function createServerClient() {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
}
