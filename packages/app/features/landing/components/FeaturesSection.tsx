import {
  Card,
  H2,
  H3,
  Paragraph,
  SizableText,
  Theme,
  XStack,
  YStack,
  useMedia,
} from '@my/ui'
import { Plane, Zap, Layers, Cog, Fuel } from '@tamagui/lucide-icons'

interface FeatureCardProps {
  title: string
  role: string
  metaphor: string
  description: string
  icon: React.ReactNode
  theme: string
}

function FeatureCard({ title, role, metaphor, description, icon, theme }: FeatureCardProps) {
  return (
    <Theme name={theme as any}>
      <Card
        flex={1}
        padding="$5"
        borderRadius="$4"
        minWidth={220}
        backgroundColor="$color2"
        borderWidth={1}
        borderColor="$color4"
      >
        <YStack gap="$3">
          <XStack justifyContent="space-between" alignItems="flex-start">
            <XStack
              width={48}
              height={48}
              borderRadius="$3"
              backgroundColor="$color4"
              alignItems="center"
              justifyContent="center"
            >
              {icon}
            </XStack>
            <XStack
              backgroundColor="$color4"
              paddingHorizontal="$2"
              paddingVertical="$1"
              borderRadius="$2"
            >
              <SizableText size="$1" fontWeight="600" color="$color10">
                {role}
              </SizableText>
            </XStack>
          </XStack>
          <YStack gap="$1">
            <H3 size="$5" fontWeight="600">
              {title}
            </H3>
            <SizableText size="$2" color="$color10" fontWeight="500">
              {metaphor}
            </SizableText>
          </YStack>
          <Paragraph size="$3" color="$color11">
            {description}
          </Paragraph>
        </YStack>
      </Card>
    </Theme>
  )
}

export function FeaturesSection() {
  const media = useMedia()

  const features: FeatureCardProps[] = [
    {
      title: 'Focus',
      role: 'CEO',
      metaphor: 'The Cockpit',
      description: 'Set your mission, vision, and strategic direction. Keep your business on course toward your destination.',
      icon: <Plane size={24} color="$purple11" />,
      theme: 'purple',
    },
    {
      title: 'Users',
      role: 'CMO',
      metaphor: 'The Engines',
      description: 'Drive growth through marketing and sales. Master StoryBrand messaging and the "Customer is Hero" framework.',
      icon: <Zap size={24} color="$blue11" />,
      theme: 'blue',
    },
    {
      title: 'Value',
      role: 'CVO',
      metaphor: 'The Wings',
      description: 'Create lift with optimized products and services. Run profitability audits and maximize customer value.',
      icon: <Layers size={24} color="$green11" />,
      theme: 'green',
    },
    {
      title: 'Admin',
      role: 'COO',
      metaphor: 'The Body',
      description: 'Hold everything together with efficient operations. Implement the 5 Meetings System and document processes.',
      icon: <Cog size={24} color="$orange11" />,
      theme: 'orange',
    },
    {
      title: 'Funds',
      role: 'CFO',
      metaphor: 'The Fuel Tanks',
      description: 'Keep your business running with smart cash flow management. Use the 5 Accounts System and Profit First methodology.',
      icon: <Fuel size={24} color="$yellow11" />,
      theme: 'yellow',
    },
  ]

  return (
    <YStack
      paddingVertical="$10"
      paddingHorizontal="$4"
      backgroundColor="$color1"
      alignItems="center"
      gap="$8"
    >
      <YStack alignItems="center" gap="$3" maxWidth={600}>
        <H2 size={media.gtMd ? '$9' : '$7'} textAlign="center" fontWeight="700">
          The C-Suite Framework
        </H2>
        <Paragraph size="$5" color="$color11" textAlign="center">
          As a solopreneur, you wear every hat. Master these 5 roles to build a business that flies.
        </Paragraph>
      </YStack>

      <XStack
        flexWrap="wrap"
        gap="$4"
        justifyContent="center"
        maxWidth={1200}
      >
        {features.map((feature) => (
          <FeatureCard key={feature.role} {...feature} />
        ))}
      </XStack>
    </YStack>
  )
}
