// In-memory rate limiter for API routes
// For production scale, consider Upstash Redis: @upstash/ratelimit

interface RateLimitEntry {
  count: number
  resetTime: number
}

// In-memory store - cleared on server restart
const rateLimitStore = new Map<string, RateLimitEntry>()

// Cleanup old entries periodically (every 5 minutes)
let cleanupInterval: ReturnType<typeof setInterval> | null = null

function startCleanup() {
  if (cleanupInterval) return

  cleanupInterval = setInterval(
    () => {
      const now = Date.now()
      const keysToDelete: string[] = []
      rateLimitStore.forEach((entry, key) => {
        if (entry.resetTime < now) {
          keysToDelete.push(key)
        }
      })
      keysToDelete.forEach((key) => rateLimitStore.delete(key))
    },
    5 * 60 * 1000
  ) // 5 minutes
}

startCleanup()

export interface RateLimitConfig {
  // Maximum requests allowed in the window
  limit: number
  // Window size in milliseconds
  windowMs: number
  // Identifier prefix (e.g., 'chat', 'search')
  identifier: string
}

export interface RateLimitResult {
  success: boolean
  remaining: number
  resetTime: number
  retryAfterMs?: number
}

/**
 * Check rate limit for a given key
 * @param key - Unique identifier (e.g., user ID)
 * @param config - Rate limit configuration
 * @returns Rate limit result with success status and remaining quota
 */
export function checkRateLimit(key: string, config: RateLimitConfig): RateLimitResult {
  const { limit, windowMs, identifier } = config
  const fullKey = `${identifier}:${key}`
  const now = Date.now()

  const entry = rateLimitStore.get(fullKey)

  // No existing entry or expired - create new window
  if (!entry || entry.resetTime < now) {
    const resetTime = now + windowMs
    rateLimitStore.set(fullKey, { count: 1, resetTime })
    return {
      success: true,
      remaining: limit - 1,
      resetTime,
    }
  }

  // Within existing window - check limit
  if (entry.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime,
      retryAfterMs: entry.resetTime - now,
    }
  }

  // Increment count
  entry.count++
  rateLimitStore.set(fullKey, entry)

  return {
    success: true,
    remaining: limit - entry.count,
    resetTime: entry.resetTime,
  }
}

// Preset configurations for different API endpoints
export const RATE_LIMITS = {
  // Brain chat: 20 requests per minute (LLM calls are expensive)
  brainChat: {
    limit: 20,
    windowMs: 60 * 1000,
    identifier: 'brain-chat',
  } satisfies RateLimitConfig,

  // Brain search: 60 requests per minute
  brainSearch: {
    limit: 60,
    windowMs: 60 * 1000,
    identifier: 'brain-search',
  } satisfies RateLimitConfig,

  // General API: 100 requests per minute
  general: {
    limit: 100,
    windowMs: 60 * 1000,
    identifier: 'general',
  } satisfies RateLimitConfig,
}

/**
 * Helper to set rate limit headers on response
 */
export function setRateLimitHeaders(
  res: { setHeader: (name: string, value: string | number) => void },
  result: RateLimitResult,
  config: RateLimitConfig
) {
  res.setHeader('X-RateLimit-Limit', config.limit)
  res.setHeader('X-RateLimit-Remaining', result.remaining)
  res.setHeader('X-RateLimit-Reset', Math.ceil(result.resetTime / 1000))

  if (!result.success && result.retryAfterMs) {
    res.setHeader('Retry-After', Math.ceil(result.retryAfterMs / 1000))
  }
}
