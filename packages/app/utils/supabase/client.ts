import { Database } from '@my/supabase/types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

/**
 * Create Supabase client for Client Components (App Router)
 * Use this in client components ('use client')
 */
export function createClient() {
  return createClientComponentClient<Database>()
}
