import type { Database } from '@my/supabase/types'
import type { SupabaseClient } from '@supabase/supabase-js'
import { Session, createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'

import { AuthStateChangeHandler } from './AuthStateChangeHandler'

export type AuthProviderProps = {
  initialSession?: Session | null
  children?: React.ReactNode
}

export const AuthProvider = ({ initialSession, children }: AuthProviderProps) => {
  // Create a new supabase browser client on every first render.
  // Note: auth-helpers is deprecated, migrate to @supabase/ssr in production
  const [supabaseClient] = useState(() =>
    createPagesBrowserClient<Database>() as unknown as SupabaseClient
  )

  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={initialSession}>
      <AuthStateChangeHandler />
      {children}
    </SessionContextProvider>
  )
}
