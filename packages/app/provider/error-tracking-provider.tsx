'use client'

import { useEffect } from 'react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { logError, extractWindowError, extractPromiseError } from '../lib/error-tracking'

export function ErrorTrackingProvider({ children }: { children: React.ReactNode }) {
  const supabase = useSupabaseClient()
  const user = useUser()

  useEffect(() => {
    // Handle global JavaScript errors
    const handleError = async (
      message: string | Event,
      source?: string,
      lineno?: number,
      colno?: number,
      error?: Error
    ) => {
      const errorDetails = extractWindowError(message, source, lineno, colno, error)

      await logError(supabase, {
        ...errorDetails,
        userId: user?.id,
      })

      // Don't prevent default error handling
      return false
    }

    // Handle unhandled promise rejections
    const handlePromiseRejection = async (event: PromiseRejectionEvent) => {
      const errorDetails = extractPromiseError(event)

      await logError(supabase, {
        ...errorDetails,
        userId: user?.id,
      })
    }

    // Add event listeners
    window.addEventListener('error', handleError as any)
    window.addEventListener('unhandledrejection', handlePromiseRejection)

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError as any)
      window.removeEventListener('unhandledrejection', handlePromiseRejection)
    }
  }, [supabase, user])

  return <>{children}</>
}
