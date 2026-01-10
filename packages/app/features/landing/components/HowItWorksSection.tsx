import {
  Card,
  H2,
  H3,
  Paragraph,
  SizableText,
  XStack,
  YStack,
  useMedia,
} from '@my/ui'
import { Target, Compass, Wrench, Users } from '@tamagui/lucide-icons'

interface StepCardProps {
  number: number
  title: string
  description: string
  icon: React.ReactNode
}

function StepCard({ number, title, description, icon }: StepCardProps) {
  return (
    <Card
      flex={1}
      padding="$5"
      borderRadius="$4"
      minWidth={220}
      backgroundColor="$color2"
    >
      <YStack gap="$4">
        <XStack gap="$3" alignItems="center">
          <YStack
            width={32}
            height={32}
            borderRadius="$2"
            backgroundColor="$blue4"
            alignItems="center"
            justifyContent="center"
          >
            <SizableText size="$4" fontWeight="700" color="$blue10">
              {number}
            </SizableText>
          </YStack>
          <XStack
            width={40}
            height={40}
            borderRadius="$3"
            backgroundColor="$color3"
            alignItems="center"
            justifyContent="center"
          >
            {icon}
          </XStack>
        </XStack>
        <YStack gap="$2">
          <H3 size="$5" fontWeight="600">
            {title}
          </H3>
          <Paragraph size="$3" color="$color11">
            {description}
          </Paragraph>
        </YStack>
      </YStack>
    </Card>
  )
}

export function HowItWorksSection() {
  const media = useMedia()

  const steps: StepCardProps[] = [
    {
      number: 1,
      title: 'Assess Your Business',
      description: 'Take the C-Suite diagnostic to identify which roles need the most attention in your business.',
      icon: <Target size={20} color="$color11" />,
    },
    {
      number: 2,
      title: 'Follow the Frameworks',
      description: 'Use proven methodologies like StoryBrand, Profit First, and the 5 Meetings System.',
      icon: <Compass size={20} color="$color11" />,
    },
    {
      number: 3,
      title: 'Use the Tools',
      description: 'Access templates, playbooks, and AI-powered tools to accelerate your implementation.',
      icon: <Wrench size={20} color="$color11" />,
    },
    {
      number: 4,
      title: 'Get Expert Guidance',
      description: 'Connect with technicians and the community for personalized support when you need it.',
      icon: <Users size={20} color="$color11" />,
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
          How It Works
        </H2>
        <Paragraph size="$5" color="$color11" textAlign="center">
          A simple process to master your business
        </Paragraph>
      </YStack>

      <XStack
        flexWrap="wrap"
        gap="$4"
        justifyContent="center"
        maxWidth={1000}
      >
        {steps.map((step) => (
          <StepCard key={step.number} {...step} />
        ))}
      </XStack>

      {/* Airplane Metaphor Callout */}
      <Card
        padding="$6"
        borderRadius="$4"
        backgroundColor="$purple3"
        maxWidth={800}
        width="100%"
      >
        <YStack gap="$4" alignItems="center">
          <H3 size="$6" fontWeight="600" color="$purple11" textAlign="center">
            Think of Your Business as an Airplane
          </H3>
          <Paragraph size="$4" color="$purple11" textAlign="center">
            The cockpit (CEO) sets direction. The engines (CMO) drive growth. The wings (CVO) create lift.
            The body (COO) holds it together. The fuel tanks (CFO) keep it running.
            Master all five to build a business that soars.
          </Paragraph>
        </YStack>
      </Card>
    </YStack>
  )
}
