import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  Button,
  Card,
  H2,
  Paragraph,
  Separator,
  SizableText,
  Spinner,
  XStack,
  YStack,
  validToken,
} from '@my/ui'
import { Check, ChevronLeft } from '@tamagui/lucide-icons'
import { useLink } from 'solito/link'

import { useSessionContext } from 'app/utils/supabase/useSessionContext'
import { TIER_CONFIGS } from 'app/utils/subscription/types'
import type { SubscriptionTier, BillingInterval } from 'app/utils/subscription/types'

export default function CheckoutPage() {
  const router = useRouter()
  const { tier: tierParam, interval: intervalParam } = router.query
  const { session, isLoading: sessionLoading } = useSessionContext()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // All hooks must be called before any early returns
  const pricingLink = useLink({ href: '/pricing' })

  const tier = tierParam as SubscriptionTier
  const interval = (intervalParam as BillingInterval) || 'year'
  const tierConfig = tier ? TIER_CONFIGS[tier] : null

  // Redirect to sign in if not authenticated
  useEffect(() => {
    if (!sessionLoading && !session) {
      router.push(`/sign-in?redirect=/checkout/${tier}?interval=${interval}`)
    }
  }, [session, sessionLoading, router, tier, interval])

  const handleCheckout = async () => {
    if (!session) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tier,
          interval,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setIsLoading(false)
    }
  }

  if (sessionLoading || !tierConfig) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center" minHeight={validToken('100vh')}>
        <Spinner size="large" />
      </YStack>
    )
  }

  const price = interval === 'year' ? tierConfig.yearlyPrice : tierConfig.monthlyPrice

  return (
    <YStack flex={1} backgroundColor="$background" minHeight={validToken('100vh')} padding="$4">
      <YStack maxWidth={600} marginHorizontal="auto" width="100%" gap="$6">
        {/* Back link */}
        <XStack>
          <Button
            {...pricingLink}
            chromeless
            icon={<ChevronLeft size={18} />}
            size="$3"
          >
            Back to pricing
          </Button>
        </XStack>

        {/* Header */}
        <YStack gap="$2">
          <H2 size="$8">Complete your subscription</H2>
          <Paragraph size="$4" color="$color11">
            You&apos;re subscribing to {tierConfig.name}
          </Paragraph>
        </YStack>

        {/* Order Summary */}
        <Card padding="$5" borderRadius="$4">
          <YStack gap="$4">
            <YStack gap="$2">
              <XStack justifyContent="space-between" alignItems="center">
                <SizableText size="$5" fontWeight="600">
                  {tierConfig.name}
                </SizableText>
                <XStack
                  backgroundColor="$color3"
                  paddingHorizontal="$2"
                  paddingVertical="$1"
                  borderRadius="$2"
                >
                  <SizableText size="$2" textTransform="capitalize">
                    {interval}ly
                  </SizableText>
                </XStack>
              </XStack>
              <Paragraph size="$3" color="$color10">
                {tierConfig.description}
              </Paragraph>
            </YStack>

            <Separator />

            <YStack gap="$2">
              {tierConfig.features.slice(0, 5).map((feature, index) => (
                <XStack key={index} gap="$2" alignItems="center">
                  <Check size={14} color="$green10" />
                  <SizableText size="$3" color="$color11">
                    {feature}
                  </SizableText>
                </XStack>
              ))}
              {tierConfig.features.length > 5 && (
                <SizableText size="$2" color="$color10">
                  + {tierConfig.features.length - 5} more features
                </SizableText>
              )}
            </YStack>

            <Separator />

            <XStack justifyContent="space-between" alignItems="baseline">
              <SizableText size="$4" color="$color11">
                Total
              </SizableText>
              <XStack alignItems="baseline" gap="$1">
                <SizableText size="$8" fontWeight="700">
                  ${price}
                </SizableText>
                <SizableText size="$3" color="$color10">
                  /{interval === 'year' ? 'year' : 'month'}
                </SizableText>
              </XStack>
            </XStack>

            {interval === 'year' && (
              <XStack backgroundColor="$green3" padding="$3" borderRadius="$3">
                <SizableText size="$3" color="$green11">
                  You&apos;re saving ${tierConfig.yearlySavings} compared to monthly billing
                </SizableText>
              </XStack>
            )}
          </YStack>
        </Card>

        {/* Error */}
        {error && (
          <Card backgroundColor="$red3" padding="$4" borderRadius="$3">
            <SizableText color="$red11">{error}</SizableText>
          </Card>
        )}

        {/* Checkout button */}
        <Button
          size="$5"
          theme="active"
          onPress={handleCheckout}
          disabled={isLoading}
          icon={isLoading ? <Spinner /> : undefined}
        >
          {isLoading ? 'Redirecting to checkout...' : 'Continue to payment'}
        </Button>

        {/* Trust badges */}
        <YStack alignItems="center" gap="$2">
          <SizableText size="$2" color="$color10" textAlign="center">
            Secure payment powered by Stripe
          </SizableText>
          <SizableText size="$2" color="$color10" textAlign="center">
            30-day money-back guarantee • Cancel anytime
          </SizableText>
        </YStack>
      </YStack>
    </YStack>
  )
}
