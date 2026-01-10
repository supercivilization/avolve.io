'use client'

import { useReducedMotion } from 'react-native-reanimated'
import { Platform } from 'react-native'
import { useEffect, useState } from 'react'

/**
 * Hook to check if the user prefers reduced motion.
 * Respects both native OS settings and web prefers-reduced-motion media query.
 *
 * @see https://vercel.com/design/guidelines - Animation guidelines
 */
export function useAccessibilityPreferences() {
  const nativeReducedMotion = useReducedMotion()
  const [webReducedMotion, setWebReducedMotion] = useState(false)

  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setWebReducedMotion(mediaQuery.matches)

      const handler = (e: MediaQueryListEvent) => setWebReducedMotion(e.matches)
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    }
  }, [])

  const prefersReducedMotion = Platform.OS === 'web' ? webReducedMotion : nativeReducedMotion

  return {
    prefersReducedMotion,
  }
}

/**
 * Minimum touch target sizes per Vercel Web Interface Guidelines
 * Desktop: 24px minimum
 * Mobile: 44px minimum
 *
 * @see https://vercel.com/design/guidelines - Interaction guidelines
 */
export const TOUCH_TARGET_SIZES = {
  desktop: 24,
  mobile: 44,
} as const

/**
 * Get the appropriate animation duration based on user preferences.
 * Returns 0 for users who prefer reduced motion.
 */
export function getAnimationDuration(
  defaultDuration: number,
  prefersReducedMotion: boolean
): number {
  return prefersReducedMotion ? 0 : defaultDuration
}
