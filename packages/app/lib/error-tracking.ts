import type { SupabaseClient } from '@supabase/auth-helpers-nextjs'

export type ErrorLevel = 'error' | 'warning' | 'info'

export interface LogErrorOptions {
  message: string
  stack?: string
  errorType?: string
  url?: string
  route?: string
  method?: string
  userAgent?: string
  userId?: string
  sessionId?: string
  environment?: string
  deploymentId?: string
  metadata?: Record<string, any>
  level?: ErrorLevel
}

/**
 * Log an error to Supabase for tracking
 */
export async function logError(
  supabase: SupabaseClient,
  options: LogErrorOptions
): Promise<void> {
  try {
    const { data, error } = await supabase.from('errors').insert({
      message: options.message,
      stack: options.stack,
      error_type: options.errorType || 'unknown',
      url: options.url,
      route: options.route,
      method: options.method,
      user_agent: options.userAgent,
      user_id: options.userId,
      session_id: options.sessionId,
      environment: options.environment || process.env.NODE_ENV || 'production',
      deployment_id: process.env.VERCEL_DEPLOYMENT_ID || process.env.DEPLOYMENT_ID,
      metadata: options.metadata || {},
    })

    if (error) {
      console.error('Failed to log error to database:', error)
    }
  } catch (err) {
    // Don't throw - error tracking failures shouldn't break the app
    console.error('Error tracking system failed:', err)
  }
}

/**
 * Log an error from a caught exception
 */
export async function logException(
  supabase: SupabaseClient,
  error: Error,
  context?: Partial<LogErrorOptions>
): Promise<void> {
  return logError(supabase, {
    message: error.message,
    stack: error.stack,
    errorType: error.name,
    ...context,
  })
}

/**
 * Extract error details from window.onerror event
 */
export function extractWindowError(
  message: string | Event,
  source?: string,
  lineno?: number,
  colno?: number,
  error?: Error
): LogErrorOptions {
  return {
    message: typeof message === 'string' ? message : 'Unknown error',
    stack: error?.stack,
    errorType: error?.name || 'WindowError',
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    metadata: {
      source,
      lineno,
      colno,
    },
  }
}

/**
 * Extract error details from unhandled promise rejection
 */
export function extractPromiseError(event: PromiseRejectionEvent): LogErrorOptions {
  const reason = event.reason
  const isError = reason instanceof Error

  return {
    message: isError ? reason.message : String(reason),
    stack: isError ? reason.stack : undefined,
    errorType: isError ? reason.name : 'UnhandledPromiseRejection',
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    metadata: {
      promise: event.promise,
    },
  }
}

/**
 * Get current user session ID if available
 */
export async function getCurrentSessionId(
  supabase: SupabaseClient
): Promise<string | undefined> {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session?.access_token
  } catch {
    return undefined
  }
}

/**
 * Get current user ID if authenticated
 */
export async function getCurrentUserId(
  supabase: SupabaseClient
): Promise<string | undefined> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user?.id
  } catch {
    return undefined
  }
}
