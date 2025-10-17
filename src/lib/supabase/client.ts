/**
 * Supabase Browser Client
 *
 * For use in Client Components (components with 'use client' directive)
 * This client runs in the browser and uses cookies for auth state
 *
 * Database: "Supercivilization"
 * - Main platform data (users, content, communities)
 * - Avolve admin orchestration (agents, workflows, logs)
 */

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
