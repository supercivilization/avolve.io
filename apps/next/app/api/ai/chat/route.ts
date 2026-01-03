/**
 * AI Chat API Route - AI SDK 6.0 with MCP-style tools
 *
 * This route provides a streaming chat interface with tool execution capabilities.
 * Features:
 * - Streaming text generation with Claude or GPT
 * - MCP-style tools connected to Supabase
 * - Multi-step agent interactions
 * - User-authenticated database operations
 */

import { anthropic } from '@ai-sdk/anthropic'
import { openai } from '@ai-sdk/openai'
import { streamText, tool } from 'ai'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { z } from 'zod'
import type { Database } from '@my/supabase/types'
import { createSupabaseTools } from 'app/lib/ai/createSupabaseTools'

// Node runtime for proper cookie/auth handling
export const runtime = 'nodejs'

// Request body schema
const requestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string(),
  })),
  model: z.enum(['claude', 'gpt']).default('claude'),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { messages, model } = requestSchema.parse(body)

    // Create Supabase client with user's session
    const cookieStore = await cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })

    // Get the current user (if authenticated)
    const { data: { user } } = await supabase.auth.getUser()

    // Select the model provider
    const modelProvider = model === 'claude'
      ? anthropic('claude-sonnet-4-20250514')
      : openai('gpt-4o')

    // Create Supabase-connected tools for this session
    const supabaseTools = createSupabaseTools(supabase, user?.id)

    // Combine with utility tools
    const tools = {
      // Supabase-connected tools
      ...supabaseTools,

      // Utility tools (always available)
      getWeather: tool({
        description: 'Get the current weather for a location',
        parameters: z.object({
          location: z.string().describe('The city and state/country'),
        }),
        execute: async ({ location }) => {
          // Demo - replace with actual weather API in production
          return {
            location,
            temperature: Math.round(Math.random() * 30 + 10),
            condition: ['sunny', 'cloudy', 'rainy', 'snowy'][Math.floor(Math.random() * 4)],
          }
        },
      }),

      getCurrentTime: tool({
        description: 'Get the current date and time',
        parameters: z.object({
          timezone: z.string().optional().describe('IANA timezone (e.g., America/New_York)'),
        }),
        execute: async ({ timezone }) => {
          const now = new Date()
          const options: Intl.DateTimeFormatOptions = {
            dateStyle: 'full',
            timeStyle: 'long',
            timeZone: timezone || 'UTC',
          }
          return {
            formatted: now.toLocaleString('en-US', options),
            iso: now.toISOString(),
            timezone: timezone || 'UTC',
          }
        },
      }),
    }

    // Build system prompt based on auth status
    const systemPrompt = user
      ? `You are a helpful AI assistant for the Avolve app. The user is authenticated (${user.email}).

Available capabilities:
- View and manage user profile
- List and create events
- Track achievements and progress
- Search posts and content
- Get user statistics
- Check weather and time

Be concise and helpful. When using tools, briefly explain what you're doing.`
      : `You are a helpful AI assistant for the Avolve app. The user is not logged in.

Available capabilities:
- Search public posts
- Check weather and time
- Answer general questions about the app

Some features require authentication. Suggest logging in for full access.`

    // Stream the response with tool execution
    const result = streamText({
      model: modelProvider,
      messages,
      tools,
      maxSteps: 5,
      system: systemPrompt,
    })

    // Return the streaming response
    return result.toDataStreamResponse()
  } catch (error) {
    console.error('AI Chat Error:', error)

    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: 'Invalid request format', details: error.errors }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
