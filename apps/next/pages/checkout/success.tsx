import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  Button,
  H2,
  Paragraph,
  SizableText,
  Spinner,
  YStack,
  validToken,
} from '@my/ui'
import { CheckCircle, PartyPopper } from '@tamagui/lucide-icons'
import { useLink } from 'solito/link'
import confetti from 'canvas-confetti'

export default function CheckoutSuccessPage() {
  const router = useRouter()
  const { session_id: _session_id } = router.query
  const [isLoading, setIsLoading] = useState(true)

  // All hooks must be called before any conditional rendering
  const dashboardLink = useLink({ href: '/dashboard' })
  const trainingLink = useLink({ href: '/dashboard/training' })

  useEffect(() => {
    // Celebrate!
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        setIsLoading(false)
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return (
    <YStack
      flex={1}
      backgroundColor="$background"
      minHeight={validToken('100vh')}
      padding="$4"
      alignItems="center"
      justifyContent="center"
    >
      <YStack
        maxWidth={500}
        width="100%"
        gap="$6"
        alignItems="center"
        padding="$6"
      >
        {isLoading ? (
          <Spinner size="large" />
        ) : (
          <>
            {/* Success Icon */}
            <YStack
              width={80}
              height={80}
              borderRadius={40}
              backgroundColor="$green4"
              alignItems="center"
              justifyContent="center"
            >
              <CheckCircle size={40} color="$green10" />
            </YStack>

            {/* Success Message */}
            <YStack gap="$2" alignItems="center">
              <H2 size="$8" textAlign="center">
                Welcome to Avolve!
              </H2>
              <Paragraph size="$5" color="$color11" textAlign="center">
                Your subscription is now active. Get ready to accelerate your growth.
              </Paragraph>
            </YStack>

            {/* Party */}
            <YStack alignItems="center" gap="$2">
              <PartyPopper size={32} color="$yellow10" />
              <SizableText size="$4" color="$color10">
                Let&apos;s build something amazing
              </SizableText>
            </YStack>

            {/* CTA */}
            <YStack gap="$3" width="100%">
              <Button
                {...dashboardLink}
                size="$5"
                theme="active"
              >
                Go to Dashboard
              </Button>
              <Button
                {...trainingLink}
                size="$4"
                chromeless
              >
                Start with Training
              </Button>
            </YStack>
          </>
        )}
      </YStack>
    </YStack>
  )
}
