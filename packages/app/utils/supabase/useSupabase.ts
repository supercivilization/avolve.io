import type { Database } from '@my/supabase/types'
import type { SupabaseClient } from '@supabase/supabase-js'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export const useSupabase = (): SupabaseClient<Database> => {
  return useSupabaseClient<Database>() as unknown as SupabaseClient<Database>
}
