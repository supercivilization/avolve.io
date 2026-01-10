'use client'

import {
  Button,
  Card,
  H1,
  H2,
  H3,
  Paragraph,
  ScrollView,
  SizableText,
  XStack,
  YStack,
  useMedia,
} from '@my/ui'
import { Plane, Zap, Layers, Cog, Fuel, ArrowRight } from '@tamagui/lucide-icons'
import { useLink } from 'solito/link'

function HeroSection() {
  const media = useMedia()

  return (
    <YStack
      paddingVertical="$10"
      paddingHorizontal="$4"
      alignItems="center"
      gap="$6"
    >
      <H1
        size={media.gtMd ? '$11' : '$9'}
        textAlign="center"
        fontWeight="800"
      >
        About Avolve
      </H1>
      <Paragraph
        size={media.gtMd ? '$6' : '$5'}
        color="$color11"
        textAlign="center"
        maxWidth={700}
      >
        We help solopreneurs build sustainable, scalable businesses by providing the frameworks,
        tools, and guidance they need to master every aspect of running a company.
      </Paragraph>
    </YStack>
  )
}

function MissionSection() {
  return (
    <YStack
      paddingVertical="$8"
      paddingHorizontal="$4"
      backgroundColor="$color2"
      alignItems="center"
      gap="$6"
    >
      <YStack maxWidth={800} gap="$4">
        <H2 size="$8" fontWeight="700">
          Our Mission
        </H2>
        <Paragraph size="$5" color="$color11" lineHeight="$7">
          Running a business as a solopreneur means wearing every hat. You are the CEO setting strategy,
          the CMO driving growth, the CVO delivering value, the COO managing operations, and the CFO
          watching the finances—all at once.
        </Paragraph>
        <Paragraph size="$5" color="$color11" lineHeight="$7">
          Avolve exists to make this possible. We provide the C-Suite Framework—a comprehensive system
          based on Business Made Simple methodologies—that helps you master each role and build a
          business that truly flies.
        </Paragraph>
      </YStack>
    </YStack>
  )
}

function FrameworkSection() {
  const media = useMedia()

  const roles = [
    {
      title: 'CEO — Focus',
      metaphor: 'The Cockpit',
      description: 'Mission, vision, and strategic direction',
      icon: <Plane size={24} color="$purple11" />,
      color: '$purple3',
    },
    {
      title: 'CMO — Users',
      metaphor: 'The Engines',
      description: 'Marketing, sales, and customer acquisition',
      icon: <Zap size={24} color="$blue11" />,
      color: '$blue3',
    },
    {
      title: 'CVO — Value',
      metaphor: 'The Wings',
      description: 'Products, services, and value creation',
      icon: <Layers size={24} color="$green11" />,
      color: '$green3',
    },
    {
      title: 'COO — Admin',
      metaphor: 'The Body',
      description: 'Operations, processes, and efficiency',
      icon: <Cog size={24} color="$orange11" />,
      color: '$orange3',
    },
    {
      title: 'CFO — Funds',
      metaphor: 'The Fuel Tanks',
      description: 'Cash flow, finances, and profitability',
      icon: <Fuel size={24} color="$yellow11" />,
      color: '$yellow3',
    },
  ]

  return (
    <YStack
      paddingVertical="$10"
      paddingHorizontal="$4"
      alignItems="center"
      gap="$8"
    >
      <YStack alignItems="center" gap="$3" maxWidth={600}>
        <H2 size={media.gtMd ? '$9' : '$7'} textAlign="center" fontWeight="700">
          The C-Suite Framework
        </H2>
        <Paragraph size="$5" color="$color11" textAlign="center">
          Think of your business as an airplane. Each part must work together for successful flight.
        </Paragraph>
      </YStack>

      <YStack gap="$4" maxWidth={800} width="100%">
        {roles.map((role) => (
          <Card
            key={role.title}
            padding="$4"
            borderRadius="$4"
            backgroundColor={role.color as any}
          >
            <XStack gap="$4" alignItems="center">
              <XStack
                width={48}
                height={48}
                borderRadius="$3"
                backgroundColor="$background"
                alignItems="center"
                justifyContent="center"
              >
                {role.icon}
              </XStack>
              <YStack flex={1}>
                <SizableText size="$5" fontWeight="600">
                  {role.title}
                </SizableText>
                <SizableText size="$3" color="$color10">
                  {role.metaphor}
                </SizableText>
                <Paragraph size="$3" color="$color11">
                  {role.description}
                </Paragraph>
              </YStack>
            </XStack>
          </Card>
        ))}
      </YStack>
    </YStack>
  )
}

function CTASection() {
  return (
    <YStack
      paddingVertical="$10"
      paddingHorizontal="$4"
      backgroundColor="$blue3"
      alignItems="center"
      gap="$6"
    >
      <YStack alignItems="center" gap="$4" maxWidth={600}>
        <H3 size="$7" fontWeight="700" color="$blue11" textAlign="center">
          Ready to Build a Business That Flies?
        </H3>
        <Paragraph size="$5" color="$blue10" textAlign="center">
          Join hundreds of solopreneurs mastering the C-Suite Framework.
        </Paragraph>
        <XStack gap="$4" flexWrap="wrap" justifyContent="center">
          <Button
            {...useLink({ href: '/pricing' })}
            size="$5"
            theme="blue"
            iconAfter={<ArrowRight size={18} />}
          >
            View Plans
          </Button>
          <Button
            {...useLink({ href: '/contact' })}
            size="$5"
            variant="outlined"
            theme="blue"
          >
            Contact Us
          </Button>
        </XStack>
      </YStack>
    </YStack>
  )
}

export function AboutScreen() {
  return (
    <ScrollView flex={1} backgroundColor="$background">
      <YStack>
        <HeroSection />
        <MissionSection />
        <FrameworkSection />
        <CTASection />
      </YStack>
    </ScrollView>
  )
}
