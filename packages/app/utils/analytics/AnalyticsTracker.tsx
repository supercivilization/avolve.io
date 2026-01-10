'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useAnalytics } from './useAnalytics'

/**
 * Component that automatically tracks page views on route changes.
 * Add this to your _app.tsx or layout component.
 */
export function AnalyticsTracker() {
  const { trackPageView } = useAnalytics()
  const router = useRouter()

  useEffect(() => {
    // Track initial page view
    trackPageView()

    // Track on route changes
    const handleRouteChange = (url: string) => {
      // Extract pathname from URL
      const path = url.split('?')[0]
      trackPageView(path)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events, trackPageView])

  return null
}

export default AnalyticsTracker
