// API Route: /api/brain/chat
// RAG-powered chat with Google Gemini for the Project Brain

import type { NextApiRequest, NextApiResponse } from 'next'
import { streamText } from 'ai'
import { google } from '@ai-sdk/google'
import { createClient } from '@supabase/supabase-js'
import type { CSuiteDomain } from 'app/features/brain/types'
import {
  BrainChatRequestSchema,
  validateRequest,
  sanitizeInput,
  detectPromptInjection,
} from '../../../lib/validation'
import { checkRateLimit, setRateLimitHeaders, RATE_LIMITS } from '../../../lib/rate-limit'
import {
  getSubscriptionStatus,
  getTierLimits,
  hasFeatureAccess,
  trackAIChatUsage,
} from '../../../lib/subscription'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Domain-specific system prompts
const DOMAIN_PROMPTS: Record<CSuiteDomain, string> = {
  ceo: `You are an expert business strategist and leadership coach. Focus on:
- Vision and mission clarity
- Strategic priorities and OKRs
- Leadership decisions
- Long-term planning
- Team alignment`,

  cmo: `You are an expert marketing strategist and growth advisor. Focus on:
- Customer acquisition and retention
- Marketing funnels and campaigns
- Brand positioning
- Sales strategies
- Market analysis`,

  cvo: `You are an expert product strategist and value creation advisor. Focus on:
- Product development
- Service delivery
- Value propositions
- Customer outcomes
- Innovation and improvement`,

  coo: `You are an expert operations and systems advisor. Focus on:
- Process optimization
- Systems and workflows
- Team operations
- Standard operating procedures
- Efficiency and productivity`,

  cfo: `You are an expert financial strategist and metrics advisor. Focus on:
- Cash flow management
- Financial metrics and KPIs
- Pricing strategies
- Budget planning
- Financial projections`,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get auth token from request
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const token = authHeader.replace('Bearer ', '')

    // Create authenticated Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    // Check subscription status and feature access
    const subscriptionStatus = await getSubscriptionStatus(supabase, user.id)
    const tierLimits = getTierLimits(subscriptionStatus.tier)

    // Check if user has access to AI chat feature
    if (!subscriptionStatus.tier && !hasFeatureAccess(null, 'ai_chat')) {
      // Allow free tier limited access
      const usage = await trackAIChatUsage(supabase, user.id)
      if (usage.limitReached) {
        return res.status(403).json({
          error: 'Daily message limit reached',
          limit: usage.limit,
          used: usage.count,
          upgrade_url: '/pricing',
        })
      }
    }

    // Rate limiting - check before processing (with tier-aware limits)
    const rateLimitResult = checkRateLimit(user.id, RATE_LIMITS.brainChat)
    setRateLimitHeaders(res, rateLimitResult, RATE_LIMITS.brainChat)

    if (!rateLimitResult.success) {
      return res.status(429).json({
        error: 'Too many requests',
        retryAfter: Math.ceil((rateLimitResult.retryAfterMs || 60000) / 1000),
      })
    }

    // Validate request body with Zod
    const validation = validateRequest(BrainChatRequestSchema, req.body)
    if (!validation.success) {
      return res.status(400).json({
        error: validation.error,
        details: validation.details,
      })
    }

    const { message: rawMessage, domain, context_limit } = validation.data!

    // Sanitize and check for prompt injection
    const message = sanitizeInput(rawMessage)

    if (detectPromptInjection(message)) {
      console.warn(`Potential prompt injection detected from user ${user.id}`)
      return res.status(400).json({
        error: 'Invalid message content',
      })
    }

    // Get relevant context from knowledge base
    let contextChunks: Array<{ content: string; source_title: string }> = []

    try {
      // First, get embedding for the query
      const { data: embeddingData, error: embeddingError } = await supabase.functions.invoke(
        'embed-content',
        {
          body: { content: message, model: 'text-embedding-3-small' },
        }
      )

      if (!embeddingError && embeddingData?.embedding) {
        // Search for relevant chunks
        const { data: chunks, error: searchError } = await supabase.rpc('search_knowledge_chunks', {
          query_embedding: embeddingData.embedding,
          match_count: context_limit,
          match_threshold: 0.5,
          filter_domains: domain ? [domain] : null,
          filter_profile_id: user.id,
        })

        if (!searchError && chunks) {
          // Get source titles
          const sourceIds = [...new Set(chunks.map((c: any) => c.source_id))]
          const { data: sources } = await supabase
            .from('knowledge_sources')
            .select('id, title')
            .in('id', sourceIds)

          const sourceMap = new Map(sources?.map((s) => [s.id, s.title]) || [])

          contextChunks = chunks.map((chunk: any) => ({
            content: chunk.content,
            source_title: sourceMap.get(chunk.source_id) || 'Unknown Source',
          }))
        }
      }
    } catch (e) {
      // Continue without context if retrieval fails
      console.error('Context retrieval error:', e)
    }

    // Build system prompt
    let systemPrompt = `You are an AI assistant for Avolve, a business growth platform for solopreneurs.
You help users understand and apply business concepts across five key roles: CEO (strategy), CMO (marketing), CVO (products), COO (operations), and CFO (finance).

${domain ? DOMAIN_PROMPTS[domain] : 'Provide balanced advice across all business domains.'}

Guidelines:
- Be concise and actionable
- Use examples when helpful
- Ask clarifying questions if needed
- Reference the user's knowledge base when available
- Suggest next steps or actions`

    // Add context if available
    if (contextChunks.length > 0) {
      systemPrompt += `

## Relevant Context from User's Knowledge Base:

${contextChunks.map((c, i) => `[${i + 1}] From "${c.source_title}":
${c.content}`).join('\n\n')}

Use this context to provide more relevant and personalized responses. Cite sources by number [1], [2], etc. when referencing specific information.`
    }

    // Stream the response with telemetry
    // Using Gemini 2.0 Flash for cost efficiency (~70% cheaper than Claude)
    // Token limit based on subscription tier
    const result = streamText({
      model: google('gemini-2.0-flash'),
      system: systemPrompt,
      messages: [{ role: 'user', content: message }],
      maxOutputTokens: tierLimits.aiChatMaxTokens,
      experimental_telemetry: {
        isEnabled: true,
        functionId: 'brain-chat',
        metadata: {
          userId: user.id,
          domain: domain || 'all',
          contextChunks: contextChunks.length,
          tier: subscriptionStatus.tier || 'free',
        },
      },
    })

    // Set headers for streaming
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.setHeader('Transfer-Encoding', 'chunked')
    res.setHeader('Cache-Control', 'no-cache')

    // Stream the response
    for await (const chunk of result.textStream) {
      res.write(chunk)
    }

    res.end()
  } catch (error) {
    console.error('Chat API error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
}
