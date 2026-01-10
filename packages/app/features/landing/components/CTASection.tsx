import {
  Button,
  H2,
  Paragraph,
  XStack,
  YStack,
  useMedia,
} from '@my/ui'
import { ArrowRight, Zap } from '@tamagui/lucide-icons'
import { useLink } from 'solito/link'

export function CTASection() {
  const media = useMedia()

  return (
    <YStack
      paddingVertical="$12"
      paddingHorizontal="$4"
      backgroundColor="$color2"
      alignItems="center"
      gap="$6"
    >
      {/* Icon */}
      <YStack
        width={64}
        height={64}
        borderRadius={32}
        backgroundColor="$blue10"
        alignItems="center"
        justifyContent="center"
      >
        <Zap size={32} color="white" />
      </YStack>

      {/* Content */}
      <YStack alignItems="center" gap="$3" maxWidth={600}>
        <H2 size={media.gtMd ? '$10' : '$8'} textAlign="center" fontWeight="700">
          Ready to Accelerate?
        </H2>
        <Paragraph size="$5" color="$color11" textAlign="center" lineHeight="$6">
          Start with Individual VIP for just $28/month. Get full access to training,
          playbooks, templates, and AI chat. Cancel anytime.
        </Paragraph>
      </YStack>

      {/* CTA */}
      <XStack gap="$4" marginTop="$2">
        <Button
          {...useLink({ href: '/pricing' })}
          size="$5"
          theme="active"
          fontWeight="600"
          iconAfter={<ArrowRight size={18} />}
        >
          Get Started Now
        </Button>
      </XStack>

      {/* Trust badges */}
      <XStack gap="$4" marginTop="$4" opacity={0.6}>
        <Paragraph size="$2" color="$color10">
          30-day money-back guarantee
        </Paragraph>
        <Paragraph size="$2" color="$color10">
          •
        </Paragraph>
        <Paragraph size="$2" color="$color10">
          Cancel anytime
        </Paragraph>
        <Paragraph size="$2" color="$color10">
          •
        </Paragraph>
        <Paragraph size="$2" color="$color10">
          Secure checkout
        </Paragraph>
      </XStack>
    </YStack>
  )
}
