import { Button, H1, Paragraph, YStack, XStack, useMedia } from '@my/ui'
import { Plane, Sparkles } from '@tamagui/lucide-icons'
import { useLink } from 'solito/link'

export function LandingScreen() {
  const media = useMedia()

  return (
    <YStack
      flex={1}
      backgroundColor="$background"
      alignItems="center"
      justifyContent="center"
      padding="$6"
      minHeight="100vh"
    >
      <YStack
        alignItems="center"
        gap="$6"
        maxWidth={600}
        animation="lazy"
        enterStyle={{ opacity: 0, y: 20 }}
      >
        {/* Logo/Icon */}
        <YStack
          backgroundColor="$blue5"
          padding="$4"
          borderRadius="$6"
          animation="bouncy"
          enterStyle={{ scale: 0.8, opacity: 0 }}
        >
          <Plane size={media.gtMd ? 48 : 36} color="$blue10" />
        </YStack>

        {/* Brand */}
        <H1
          size={media.gtMd ? '$12' : '$10'}
          color="$blue10"
          fontWeight="800"
          letterSpacing={-1}
        >
          Avolve
        </H1>

        {/* Tagline */}
        <Paragraph
          size={media.gtMd ? '$7' : '$5'}
          color="$color11"
          textAlign="center"
          lineHeight="$8"
        >
          Master every role in your business.{'\n'}
          Like a pilot masters flight.
        </Paragraph>

        {/* Coming Soon Badge */}
        <XStack
          backgroundColor="$purple5"
          paddingHorizontal="$4"
          paddingVertical="$2"
          borderRadius="$10"
          alignItems="center"
          gap="$2"
        >
          <Sparkles size={16} color="$purple10" />
          <Paragraph size="$3" color="$purple11" fontWeight="600">
            Coming Soon
          </Paragraph>
        </XStack>

        {/* CTA */}
        <YStack gap="$3" alignItems="center" marginTop="$4">
          <Button
            {...useLink({ href: '/sign-in' })}
            size="$5"
            theme="active"
            fontWeight="600"
          >
            Early Access
          </Button>
          <Paragraph size="$2" color="$color10">
            Join the waitlist for exclusive early access
          </Paragraph>
        </YStack>
      </YStack>

      {/* Footer */}
      <YStack position="absolute" bottom="$6">
        <Paragraph size="$2" color="$color9">
          Build a business that flies
        </Paragraph>
      </YStack>
    </YStack>
  )
}
