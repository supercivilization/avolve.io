/**
 * AI SDK 6.0 Tools - MCP-style tool definitions
 * These tools allow AI agents to interact with the app's data layer
 */

import { tool } from 'ai'
import { z } from 'zod'

/**
 * Tool: Get user profile
 * Retrieves the current user's profile information
 */
export const getUserProfile = tool({
  description: 'Get the current user profile information including name, avatar, and about text',
  parameters: z.object({
    userId: z.string().describe('The user ID to fetch profile for'),
  }),
  execute: async ({ userId }) => {
    // This will be called with the supabase client injected at runtime
    return { userId, message: 'Profile fetched - implement with supabase context' }
  },
})

/**
 * Tool: List user events
 * Retrieves events for a user
 */
export const listEvents = tool({
  description: 'List events for a user, optionally filtered by status',
  parameters: z.object({
    userId: z.string().describe('The user ID to fetch events for'),
    status: z.enum(['active', 'completed', 'cancelled']).optional().describe('Filter by event status'),
    limit: z.number().min(1).max(50).default(10).describe('Number of events to return'),
  }),
  execute: async ({ userId, status, limit }) => {
    return { userId, status, limit, message: 'Events fetched - implement with supabase context' }
  },
})

/**
 * Tool: Create event
 * Creates a new event for a user
 */
export const createEvent = tool({
  description: 'Create a new event for a user',
  parameters: z.object({
    name: z.string().min(1).max(100).describe('Event name'),
    description: z.string().optional().describe('Event description'),
    startTime: z.string().optional().describe('Event start time (ISO 8601 format)'),
    endTime: z.string().optional().describe('Event end time (ISO 8601 format)'),
    status: z.enum(['active', 'completed', 'cancelled']).default('active').describe('Event status'),
  }),
  execute: async ({ name, description, startTime, endTime, status }) => {
    return { name, description, startTime, endTime, status, message: 'Event created - implement with supabase context' }
  },
})

/**
 * Tool: Search posts
 * Search through posts with a query
 */
export const searchPosts = tool({
  description: 'Search through posts by title or content',
  parameters: z.object({
    query: z.string().min(1).describe('Search query'),
    limit: z.number().min(1).max(50).default(10).describe('Number of results to return'),
  }),
  execute: async ({ query, limit }) => {
    return { query, limit, message: 'Posts searched - implement with supabase context' }
  },
})

/**
 * Tool: Get achievements
 * Retrieves user achievements and progress
 */
export const getAchievements = tool({
  description: 'Get user achievements and progress towards goals',
  parameters: z.object({
    userId: z.string().describe('The user ID to fetch achievements for'),
  }),
  execute: async ({ userId }) => {
    return { userId, message: 'Achievements fetched - implement with supabase context' }
  },
})

/**
 * Tool: Update achievement progress
 * Updates progress on an achievement
 */
export const updateAchievementProgress = tool({
  description: 'Update progress on a specific achievement',
  parameters: z.object({
    achievementId: z.string().describe('The achievement ID to update'),
    progress: z.number().min(0).describe('New progress value'),
  }),
  execute: async ({ achievementId, progress }) => {
    return { achievementId, progress, message: 'Achievement updated - implement with supabase context' }
  },
})

/**
 * All available tools for AI agents
 */
export const appTools = {
  getUserProfile,
  listEvents,
  createEvent,
  searchPosts,
  getAchievements,
  updateAchievementProgress,
}

export type AppTools = typeof appTools
