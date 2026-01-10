// Analytics Types

export interface PageView {
  path: string
  referrer?: string
  userAgent?: string
  screenWidth?: number
  screenHeight?: number
}

export interface AnalyticsEvent {
  name: string
  category?: EventCategory
  data?: Record<string, unknown>
  path?: string
}

export type EventCategory =
  | 'navigation'
  | 'engagement'
  | 'conversion'
  | 'error'
  | 'subscription'
  | 'auth'
  | 'feature'

// Predefined events for consistency
export const Events = {
  // Navigation
  PAGE_VIEW: 'page_view',

  // Auth
  SIGN_UP_STARTED: 'sign_up_started',
  SIGN_UP_COMPLETED: 'sign_up_completed',
  SIGN_IN: 'sign_in',
  SIGN_OUT: 'sign_out',

  // Subscription
  PRICING_VIEW: 'pricing_view',
  CHECKOUT_STARTED: 'checkout_started',
  CHECKOUT_COMPLETED: 'checkout_completed',
  SUBSCRIPTION_CANCELLED: 'subscription_cancelled',
  BILLING_PORTAL_OPENED: 'billing_portal_opened',

  // Engagement
  FEATURE_USED: 'feature_used',
  CONTENT_VIEWED: 'content_viewed',
  DOWNLOAD_STARTED: 'download_started',
  FORM_SUBMITTED: 'form_submitted',

  // Errors
  ERROR_OCCURRED: 'error_occurred',
  API_ERROR: 'api_error',
} as const

export type EventName = (typeof Events)[keyof typeof Events]

export interface AnalyticsSummary {
  total_page_views: number
  unique_visitors: number
  unique_sessions: number
  top_pages: Array<{ path: string; views: number }>
  events_by_category: Array<{ category: string; count: number }>
  top_events: Array<{ name: string; count: number }>
  daily_breakdown: Array<{ date: string; views: number; visitors: number }>
}
