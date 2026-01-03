/**
 * AI Module - AI SDK 6.0 Integration
 *
 * This module provides AI capabilities for the Avolve app:
 * - Tool definitions for AI agents (MCP-style)
 * - Supabase-connected tools factory
 * - React hooks for chat interfaces
 * - Type definitions for AI interactions
 *
 * @example
 * ```tsx
 * // Client-side chat hook
 * import { useAIChat } from 'app/lib/ai'
 *
 * function ChatComponent() {
 *   const { messages, input, handleInputChange, handleSubmit, isLoading } = useAIChat()
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <input value={input} onChange={handleInputChange} />
 *       <button type="submit" disabled={isLoading}>Send</button>
 *     </form>
 *   )
 * }
 * ```
 *
 * @example
 * ```ts
 * // Server-side Supabase tools (API routes)
 * import { createSupabaseTools } from 'app/lib/ai'
 *
 * const tools = createSupabaseTools(supabase, userId)
 * // tools.getUserProfile, tools.listEvents, etc.
 * ```
 */

// Tool definitions (static, no auth context)
export * from './tools'
export type { AppTools } from './tools'

// Supabase-connected tools factory (requires auth context)
export { createSupabaseTools } from './createSupabaseTools'
export type { SupabaseTools } from './createSupabaseTools'

// React hooks for client-side chat
export * from './useAIChat'
export type { UseAIChatReturn, AIModel } from './useAIChat'
