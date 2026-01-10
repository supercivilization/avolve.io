'use client'

import { useCallback, useEffect, useRef } from 'react'

import { useSupabase } from '../supabase/useSupabase'
import { useSessionContext } from '../supabase/useSessionContext'
import type { AnalyticsEvent, EventCategory, EventName, PageView } from './types'
import { Events } from './types'

// Generate or retrieve session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return 'server'

  let sessionId = sessionStorage.getItem('analytics_session_id')
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).slice(2)}`
    sessionStorage.setItem('analytics_session_id', sessionId)
  }
  return sessionId
}

// Get screen dimensions
function getScreenDimensions(): { width: number; height: number } {
  if (typeof window === 'undefined') return { width: 0, height: 0 }
  return {
    width: window.screen.width,
    height: window.screen.height,
  }
}

// Get referrer
function getReferrer(): string | undefined {
  if (typeof document === 'undefined') return undefined
  return document.referrer || undefined
}

// Get user agent
function getUserAgent(): string | undefined {
  if (typeof navigator === 'undefined') return undefined
  return navigator.userAgent
}

export function useAnalytics() {
  const supabase = useSupabase()
  const { session } = useSessionContext()
  const userId = session?.user?.id
  const lastPageView = useRef<string>('')

  // Track page view
  const trackPageView = useCallback(
    async (path?: string) => {
      const currentPath = path || (typeof window !== 'undefined' ? window.location.pathname : '')

      // Prevent duplicate tracking of same page
      if (currentPath === lastPageView.current) return
      lastPageView.current = currentPath

      const sessionId = getSessionId()
      const { width, height } = getScreenDimensions()

      const pageView: PageView & { user_id?: string; session_id: string } = {
        path: currentPath,
        referrer: getReferrer(),
        userAgent: getUserAgent(),
        screenWidth: width,
        screenHeight: height,
        user_id: userId,
        session_id: sessionId,
      }

      try {
        // Use any cast - types will be regenerated after migration is applied
        await (supabase as any).from('page_views').insert({
          user_id: userId || null,
          session_id: sessionId,
          path: currentPath,
          referrer: pageView.referrer || null,
          user_agent: pageView.userAgent || null,
          screen_width: width || null,
          screen_height: height || null,
        })
      } catch (error) {
        // Silently fail analytics - don't break the app
        console.debug('Analytics: Failed to track page view', error)
      }
    },
    [supabase, userId]
  )

  // Track custom event
  const trackEvent = useCallback(
    async (
      eventName: EventName | string,
      category?: EventCategory,
      data?: Record<string, unknown>
    ) => {
      const sessionId = getSessionId()
      const path = typeof window !== 'undefined' ? window.location.pathname : undefined

      try {
        // Use any cast - types will be regenerated after migration is applied
        await (supabase as any).from('analytics_events').insert({
          user_id: userId || null,
          session_id: sessionId,
          event_name: eventName,
          event_category: category || null,
          event_data: data || null,
          path: path || null,
        })
      } catch (error) {
        // Silently fail analytics - don't break the app
        console.debug('Analytics: Failed to track event', error)
      }
    },
    [supabase, userId]
  )

  // Convenience methods for common events
  const track = {
    // Auth events
    signUpStarted: () => trackEvent(Events.SIGN_UP_STARTED, 'auth'),
    signUpCompleted: (data?: Record<string, unknown>) =>
      trackEvent(Events.SIGN_UP_COMPLETED, 'auth', data),
    signIn: () => trackEvent(Events.SIGN_IN, 'auth'),
    signOut: () => trackEvent(Events.SIGN_OUT, 'auth'),

    // Subscription events
    pricingView: (tier?: string) =>
      trackEvent(Events.PRICING_VIEW, 'subscription', tier ? { tier } : undefined),
    checkoutStarted: (tier: string) =>
      trackEvent(Events.CHECKOUT_STARTED, 'conversion', { tier }),
    checkoutCompleted: (tier: string, amount?: number) =>
      trackEvent(Events.CHECKOUT_COMPLETED, 'conversion', { tier, amount }),
    subscriptionCancelled: (tier: string) =>
      trackEvent(Events.SUBSCRIPTION_CANCELLED, 'subscription', { tier }),
    billingPortalOpened: () => trackEvent(Events.BILLING_PORTAL_OPENED, 'subscription'),

    // Engagement events
    featureUsed: (feature: string, data?: Record<string, unknown>) =>
      trackEvent(Events.FEATURE_USED, 'feature', { feature, ...data }),
    contentViewed: (contentId: string, contentType: string) =>
      trackEvent(Events.CONTENT_VIEWED, 'engagement', { contentId, contentType }),
    downloadStarted: (item: string) =>
      trackEvent(Events.DOWNLOAD_STARTED, 'engagement', { item }),
    formSubmitted: (formName: string) =>
      trackEvent(Events.FORM_SUBMITTED, 'engagement', { formName }),

    // Error events
    error: (error: string, context?: Record<string, unknown>) =>
      trackEvent(Events.ERROR_OCCURRED, 'error', { error, ...context }),
    apiError: (endpoint: string, status: number, message?: string) =>
      trackEvent(Events.API_ERROR, 'error', { endpoint, status, message }),
  }

  return {
    trackPageView,
    trackEvent,
    track,
    Events,
  }
}

// Hook for automatic page view tracking
export function usePageViewTracking() {
  const { trackPageView } = useAnalytics()

  useEffect(() => {
    // Track initial page view
    trackPageView()

    // Track on route change (for Next.js)
    const handleRouteChange = () => {
      trackPageView()
    }

    // Listen for popstate (browser back/forward)
    window.addEventListener('popstate', handleRouteChange)

    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [trackPageView])
}
