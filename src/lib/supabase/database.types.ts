/**
 * Supabase Database Types
 *
 * Auto-generate this file with:
 * npx supabase gen types typescript --project-id coybefkmcykzbeosjgyt > src/lib/supabase/database.types.ts
 *
 * Or use the Supabase CLI:
 * supabase gen types typescript --project-id coybefkmcykzbeosjgyt > src/lib/supabase/database.types.ts
 *
 * Run this command whenever you update your database schema to keep types in sync.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// TODO: Generate actual types from database schema
// This is a placeholder - run the command above to populate with real types

export interface Database {
  public: {
    Tables: {
      // Supercivilization Platform Tables
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          // Add your actual user fields here
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
        }
      }
      // Add more Supercivilization tables here
    }
    Views: {
      // Add database views here
    }
    Functions: {
      // Add database functions here
    }
    Enums: {
      // Add database enums here
    }
  }
  // Avolve schema (if using schema separation)
  avolve?: {
    Tables: {
      agents: {
        Row: {
          id: string
          name: string
          created_at: string
          // Add your actual agent fields here
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
      // Add more Avolve tables here
    }
  }
}
