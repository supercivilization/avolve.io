/**
 * Supabase-Connected AI Tools Factory
 *
 * This module creates AI tools that are connected to a Supabase client,
 * enabling real database operations through AI agents.
 *
 * AI SDK 6.0 MCP-style integration for Supabase.
 */

import { tool } from 'ai'
import type { SupabaseClient } from '@supabase/supabase-js'
import { z } from 'zod'
import type { Database } from '@my/supabase/types'

type TypedSupabaseClient = SupabaseClient<Database>

/**
 * Creates a set of AI tools connected to a Supabase client
 * Use this in API routes where you have access to a Supabase client
 */
export function createSupabaseTools(supabase: TypedSupabaseClient, userId?: string) {
  return {
    /**
     * Get user profile from database
     */
    getUserProfile: tool({
      description: 'Get a user profile including name, avatar, and about text',
      parameters: z.object({
        profileId: z.string().optional().describe('Profile ID to fetch. If not provided, uses current user.'),
      }),
      execute: async ({ profileId }) => {
        const id = profileId || userId
        if (!id) {
          return { error: 'No user ID provided and no current user' }
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .single()

        if (error) {
          return { error: error.message }
        }

        return {
          id: data.id,
          name: data.name,
          avatarUrl: data.avatar_url,
          about: data.about,
        }
      },
    }),

    /**
     * List events for a user
     */
    listEvents: tool({
      description: 'List events for a user, with optional filtering and pagination',
      parameters: z.object({
        status: z.string().optional().describe('Filter by status'),
        limit: z.number().min(1).max(100).default(20).describe('Maximum number of events to return'),
      }),
      execute: async ({ status, limit }) => {
        if (!userId) {
          return { error: 'User not authenticated' }
        }

        let query = supabase
          .from('events')
          .select('*')
          .eq('profile_id', userId)
          .limit(limit)
          .order('created_at', { ascending: false })

        if (status) {
          query = query.eq('status', status)
        }

        const { data, error } = await query

        if (error) {
          return { error: error.message }
        }

        return {
          events: data,
          count: data.length,
        }
      },
    }),

    /**
     * Create a new event
     */
    createEvent: tool({
      description: 'Create a new event for the current user',
      parameters: z.object({
        name: z.string().min(1).max(100).describe('Event name'),
        description: z.string().optional().describe('Event description'),
        startTime: z.string().optional().describe('Start time in ISO 8601 format'),
        endTime: z.string().optional().describe('End time in ISO 8601 format'),
        status: z.string().default('active').describe('Event status'),
      }),
      execute: async ({ name, description, startTime, endTime, status }) => {
        if (!userId) {
          return { error: 'User not authenticated' }
        }

        const { data, error } = await supabase
          .from('events')
          .insert({
            name,
            description,
            start_time: startTime,
            end_time: endTime,
            status,
            profile_id: userId,
          })
          .select()
          .single()

        if (error) {
          return { error: error.message }
        }

        return {
          success: true,
          event: data,
        }
      },
    }),

    /**
     * Get user achievements
     */
    getAchievements: tool({
      description: 'Get achievements and progress for the current user',
      parameters: z.object({}),
      execute: async () => {
        if (!userId) {
          return { error: 'User not authenticated' }
        }

        const { data, error } = await supabase
          .from('achievements')
          .select('*')
          .eq('profile_id', userId)
          .order('created_at', { ascending: false })

        if (error) {
          return { error: error.message }
        }

        return {
          achievements: data,
          totalCount: data.length,
          completedCount: data.filter((a) => a.progress >= a.goal).length,
        }
      },
    }),

    /**
     * Search posts
     */
    searchPosts: tool({
      description: 'Search posts by title or content',
      parameters: z.object({
        query: z.string().min(1).describe('Search query'),
        limit: z.number().min(1).max(50).default(10).describe('Maximum results'),
      }),
      execute: async ({ query, limit }) => {
        const { data, error } = await supabase
          .from('posts')
          .select('id, title, content, created_at')
          .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
          .limit(limit)
          .order('created_at', { ascending: false })

        if (error) {
          return { error: error.message }
        }

        return {
          posts: data,
          count: data.length,
          query,
        }
      },
    }),

    /**
     * Get user statistics
     */
    getUserStats: tool({
      description: 'Get aggregate statistics for the current user',
      parameters: z.object({}),
      execute: async () => {
        if (!userId) {
          return { error: 'User not authenticated' }
        }

        const { data, error } = await supabase
          .from('user_stats')
          .select('*')
          .eq('id', userId)
          .single()

        if (error && error.code !== 'PGRST116') {
          return { error: error.message }
        }

        return data || {
          id: userId,
          total_events: 0,
          total_achievements: 0,
          total_posts: 0,
        }
      },
    }),
  }
}

export type SupabaseTools = ReturnType<typeof createSupabaseTools>
