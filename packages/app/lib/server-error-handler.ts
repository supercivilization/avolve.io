import { NextResponse } from 'next/server'
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { logError, logException } from './error-tracking'

/**
 * Wrap API route handlers with error tracking
 */
export function withErrorTracking<T extends (...args: any[]) => Promise<Response>>(
  handler: T,
  supabase: SupabaseClient
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await handler(...args)
    } catch (error) {
      // Log error to Supabase
      if (error instanceof Error) {
        const request = args[0] as Request
        await logException(supabase, error, {
          route: request.url,
          method: request.method,
          userAgent: request.headers.get('user-agent') || undefined,
        })
      }

      // Re-throw to allow normal error handling
      throw error
    }
  }) as T
}

/**
 * Standard error response for API routes
 */
export function errorResponse(
  message: string,
  status: number = 500,
  details?: any
): NextResponse {
  return NextResponse.json(
    {
      error: message,
      details,
      timestamp: new Date().toISOString(),
    },
    { status }
  )
}

/**
 * Handle and log server-side errors
 */
export async function handleServerError(
  supabase: SupabaseClient,
  error: unknown,
  context?: {
    route?: string
    method?: string
    userId?: string
  }
): Promise<NextResponse> {
  // Log to console for server logs
  console.error('Server error:', error)

  // Log to Supabase
  if (error instanceof Error) {
    await logException(supabase, error, {
      route: context?.route,
      method: context?.method,
      userId: context?.userId,
    })

    // Return appropriate error response
    if (error.name === 'ZodError') {
      return errorResponse('Validation error', 400, error)
    }

    return errorResponse(error.message, 500)
  }

  // Handle non-Error objects
  await logError(supabase, {
    message: String(error),
    errorType: 'UnknownError',
    route: context?.route,
    method: context?.method,
    userId: context?.userId,
  })

  return errorResponse('An unexpected error occurred', 500)
}
