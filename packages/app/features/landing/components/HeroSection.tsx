import {
  Button,
  H1,
  Paragraph,
  XStack,
  YStack,
  useMedia,
} from '@my/ui'
import { ArrowRight, Plane } from '@tamagui/lucide-icons'
import { useLink } from 'solito/link'

export function HeroSection() {
  const media = useMedia()

  return (
    <YStack
      paddingVertical="$10"
      paddingHorizontal="$4"
      alignItems="center"
      gap="$6"
      $gtMd={{
        paddingVertical: '$12',
      }}
    >
      {/* Badge */}
      <XStack
        backgroundColor="$color3"
        paddingHorizontal="$3"
        paddingVertical="$2"
        borderRadius="$10"
        alignItems="center"
        gap="$2"
      >
        <Plane size={14} color="$purple10" />
        <Paragraph size="$2" color="$color11">
          Build a Business That Flies
        </Paragraph>
      </XStack>

      {/* Headline */}
      <YStack alignItems="center" gap="$3" maxWidth={800}>
        <H1
          size={media.gtMd ? '$12' : '$9'}
          textAlign="center"
          fontWeight="800"
          color="$blue10"
        >
          Master Your Business
        </H1>
        <H1
          size={media.gtMd ? '$10' : '$7'}
          textAlign="center"
          color="$color12"
          fontWeight="700"
        >
          Like a Pilot Masters Flight
        </H1>
      </YStack>

      {/* Subheadline */}
      <Paragraph
        size={media.gtMd ? '$6' : '$5'}
        color="$color11"
        textAlign="center"
        maxWidth={600}
        lineHeight="$7"
      >
        Run your business like a well-tuned airplane. Master the 5 C-Suite roles — CEO, CMO, CVO, COO, and CFO —
        to build, scale, and soar as a solopreneur.
      </Paragraph>

      {/* CTA Buttons */}
      <XStack
        gap="$4"
        flexWrap="wrap"
        justifyContent="center"
        marginTop="$4"
      >
        <Button
          {...useLink({ href: '/pricing' })}
          size="$5"
          theme="active"
          fontWeight="600"
          iconAfter={<ArrowRight size={18} />}
        >
          Start Flying
        </Button>
        <Button
          {...useLink({ href: '/sign-in' })}
          size="$5"
          chromeless
          borderWidth={1}
          borderColor="$borderColor"
        >
          Sign In
        </Button>
      </XStack>

      {/* Social Proof */}
      <XStack
        marginTop="$6"
        gap="$6"
        alignItems="center"
        opacity={0.7}
      >
        <YStack alignItems="center">
          <Paragraph size="$7" fontWeight="700" color="$color12">
            5
          </Paragraph>
          <Paragraph size="$2" color="$color10">
            C-Suite Roles
          </Paragraph>
        </YStack>
        <YStack width={1} height={40} backgroundColor="$borderColor" />
        <YStack alignItems="center">
          <Paragraph size="$7" fontWeight="700" color="$color12">
            50+
          </Paragraph>
          <Paragraph size="$2" color="$color10">
            Playbooks
          </Paragraph>
        </YStack>
        <YStack width={1} height={40} backgroundColor="$borderColor" />
        <YStack alignItems="center">
          <Paragraph size="$7" fontWeight="700" color="$color12">
            24/7
          </Paragraph>
          <Paragraph size="$2" color="$color10">
            AI Support
          </Paragraph>
        </YStack>
      </XStack>
    </YStack>
  )
}
