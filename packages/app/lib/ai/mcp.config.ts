/**
 * MCP (Model Context Protocol) Configuration
 *
 * This file documents the AI tools available in the Avolve app
 * and their integration points with external systems.
 *
 * Tools follow the AI SDK 6.0 MCP-style pattern:
 * - Each tool has a description, parameters schema, and execute function
 * - Tools can be connected to Supabase for authenticated database operations
 * - Tools are composed at runtime based on user auth status
 */

export const mcpConfig = {
  name: 'avolve-ai',
  version: '1.0.0',
  description: 'AI tools for the Avolve app',

  /**
   * Available tool categories
   */
  categories: {
    // User-facing tools requiring authentication
    authenticated: [
      'getUserProfile',
      'listEvents',
      'createEvent',
      'getAchievements',
      'getUserStats',
    ],
    // Public tools available to all users
    public: [
      'searchPosts',
      'getWeather',
      'getCurrentTime',
    ],
  },

  /**
   * External system integrations
   */
  integrations: {
    supabase: {
      tables: ['profiles', 'events', 'achievements', 'posts', 'user_stats'],
      operations: ['select', 'insert', 'update'],
      authRequired: true,
    },
  },

  /**
   * Model providers supported
   */
  providers: {
    anthropic: {
      models: ['claude-sonnet-4-20250514'],
      default: true,
    },
    openai: {
      models: ['gpt-4o'],
      default: false,
    },
  },

  /**
   * Rate limits and safety configuration
   */
  safety: {
    maxSteps: 5,
    maxTokensPerRequest: 4096,
    toolApprovalRequired: false, // Auto-execute tools
  },
} as const

export type MCPConfig = typeof mcpConfig
