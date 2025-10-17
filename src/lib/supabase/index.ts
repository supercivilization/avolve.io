/**
 * Supabase Client Exports
 *
 * Simplified imports for Supabase clients throughout the application
 */

// Browser client (Client Components)
export { createClient as createBrowserClient } from './client'

// Server clients (Server Components, Server Actions, Route Handlers)
export { createClient as createServerClient, createServiceRoleClient } from './server'

// Middleware (Auth refresh)
export { updateSession } from './middleware'

// Re-export Supabase types for convenience
export type { SupabaseClient, User, Session } from '@supabase/supabase-js'
