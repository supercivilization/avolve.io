'use client'

import {
  Megaphone,
  Users,
  MessageCircle,
  Target,
  ArrowRight,
  CheckCircle,
  Zap,
} from '@tamagui/lucide-icons'
import {
  Button,
  Card,
  H2,
  H3,
  Paragraph,
  SizableText,
  Skeleton,
  XStack,
  YStack,
} from '@my/ui'

import { useUser } from 'app/utils/useUser'
import { useSubscription } from 'app/utils/subscription'
import { DashboardLayout } from '../components/DashboardLayout'
import { DomainKnowledgePanel } from 'app/features/brain'

interface ActionCardProps {
  title: string
  description: string
  icon: React.ReactNode
  status?: 'complete' | 'in-progress' | 'not-started' | 'coming-soon'
  onPress?: () => void
}

function ActionCard({ title, description, icon, status = 'coming-soon', onPress }: ActionCardProps) {
  const isComingSoon = status === 'coming-soon'

  return (
    <Card
      padding="$4"
      borderRadius="$4"
      hoverStyle={isComingSoon ? {} : { backgroundColor: '$color3' }}
      pressStyle={isComingSoon ? {} : { scale: 0.98 }}
      animation="quick"
      cursor={isComingSoon ? 'default' : 'pointer'}
      opacity={isComingSoon ? 0.7 : 1}
      onPress={isComingSoon ? undefined : onPress}
    >
      <XStack gap="$3" alignItems="center">
        <YStack
          width={44}
          height={44}
          borderRadius="$3"
          backgroundColor="$blue4"
          alignItems="center"
          justifyContent="center"
        >
          {icon}
        </YStack>
        <YStack flex={1} gap="$1">
          <XStack gap="$2" alignItems="center">
            <SizableText size="$4" fontWeight="600">
              {title}
            </SizableText>
            {isComingSoon && (
              <XStack backgroundColor="$color4" paddingHorizontal="$2" paddingVertical="$1" borderRadius="$2">
                <SizableText size="$1" color="$color10">Coming Soon</SizableText>
              </XStack>
            )}
          </XStack>
          <Paragraph size="$3" color="$color11">
            {description}
          </Paragraph>
        </YStack>
        {status === 'complete' ? (
          <CheckCircle size={20} color="$green10" />
        ) : !isComingSoon ? (
          <ArrowRight size={18} color="$color10" />
        ) : null}
      </XStack>
    </Card>
  )
}

function CMOHeader() {
  const { isLoading } = useUser()

  if (isLoading) {
    return (
      <YStack gap="$3">
        <Skeleton width={200} height={32} variant="title" />
        <Skeleton width={400} height={20} />
      </YStack>
    )
  }

  return (
    <YStack gap="$3">
      <XStack alignItems="center" gap="$3">
        <YStack
          width={56}
          height={56}
          borderRadius="$4"
          backgroundColor="$blue4"
          alignItems="center"
          justifyContent="center"
        >
          <Zap size={28} color="$blue10" />
        </YStack>
        <YStack>
          <SizableText size="$3" color="$blue10" fontWeight="600">
            THE ENGINES
          </SizableText>
          <H2 size="$8">CMO — Users</H2>
        </YStack>
      </XStack>
      <Paragraph size="$5" color="$color11" maxWidth={600}>
        Marketing and sales. The engines that propel your business forward by attracting and
        converting customers who need your solution.
      </Paragraph>
    </YStack>
  )
}

function StoryBrandSection() {
  const steps = [
    { number: 1, title: 'Character', description: 'Your customer is the hero' },
    { number: 2, title: 'Problem', description: 'They face a challenge' },
    { number: 3, title: 'Guide', description: 'You are the trusted guide' },
    { number: 4, title: 'Plan', description: 'You give them a clear plan' },
    { number: 5, title: 'Action', description: 'Call them to take action' },
    { number: 6, title: 'Failure', description: 'Show what they avoid' },
    { number: 7, title: 'Success', description: 'Paint the transformation' },
  ]

  return (
    <YStack gap="$4">
      <XStack justifyContent="space-between" alignItems="center">
        <H3 size="$6">StoryBrand Framework</H3>
        <Button size="$3" theme="blue" icon={<Megaphone size={16} />}>
          Create BrandScript
        </Button>
      </XStack>
      <Card padding="$4" borderRadius="$4" backgroundColor="$blue3">
        <XStack flexWrap="wrap" gap="$3">
          {steps.map((step) => (
            <YStack
              key={step.number}
              flex={1}
              minWidth={120}
              padding="$3"
              borderRadius="$3"
              backgroundColor="$blue4"
            >
              <XStack gap="$2" alignItems="center" marginBottom="$1">
                <YStack
                  width={20}
                  height={20}
                  borderRadius="$1"
                  backgroundColor="$blue10"
                  alignItems="center"
                  justifyContent="center"
                >
                  <SizableText size="$1" fontWeight="700" color="white">
                    {step.number}
                  </SizableText>
                </YStack>
                <SizableText size="$3" fontWeight="600" color="$blue11">
                  {step.title}
                </SizableText>
              </XStack>
              <SizableText size="$2" color="$blue10">
                {step.description}
              </SizableText>
            </YStack>
          ))}
        </XStack>
      </Card>
    </YStack>
  )
}

function SalesTalkingPointsSection() {
  const talkingPoints = [
    {
      title: 'The Problem',
      description: 'What problem does your customer face that you solve?',
    },
    {
      title: 'Your Solution',
      description: 'How does your product or service solve their problem?',
    },
    {
      title: 'The Result',
      description: 'What positive outcome will they experience?',
    },
    {
      title: 'Differentiation',
      description: 'Why should they choose you over alternatives?',
    },
    {
      title: 'Call to Action',
      description: 'What is the next step they should take?',
    },
  ]

  return (
    <YStack gap="$4">
      <H3 size="$6">Sales Talking Points</H3>
      <SizableText size="$4" color="$color11">
        The customer is the hero. Master these 5 points to guide them to success.
      </SizableText>
      <YStack gap="$3">
        {talkingPoints.map((point, index) => (
          <Card key={point.title} padding="$4" borderRadius="$4">
            <XStack gap="$3" alignItems="flex-start">
              <YStack
                width={28}
                height={28}
                borderRadius="$2"
                backgroundColor="$blue4"
                alignItems="center"
                justifyContent="center"
              >
                <SizableText size="$3" fontWeight="600" color="$blue10">
                  {index + 1}
                </SizableText>
              </YStack>
              <YStack flex={1}>
                <SizableText size="$4" fontWeight="600">
                  {point.title}
                </SizableText>
                <Paragraph size="$3" color="$color11">
                  {point.description}
                </Paragraph>
              </YStack>
            </XStack>
          </Card>
        ))}
      </YStack>
    </YStack>
  )
}

function MarketingToolsSection() {
  const tools: Array<Omit<ActionCardProps, 'onPress'>> = [
    {
      title: 'Lead Generator',
      description: 'Create a compelling lead magnet that captures email addresses',
      icon: <Target size={22} color="$blue10" />,
      status: 'coming-soon',
    },
    {
      title: 'Email Sequences',
      description: 'Nurture leads with automated email campaigns',
      icon: <MessageCircle size={22} color="$blue10" />,
      status: 'coming-soon',
    },
    {
      title: 'Sales Pipeline',
      description: 'Track and manage your sales relationships',
      icon: <Users size={22} color="$blue10" />,
      status: 'coming-soon',
    },
  ]

  return (
    <YStack gap="$4">
      <H3 size="$6">Marketing & Sales Tools</H3>
      <YStack gap="$3">
        {tools.map((tool) => (
          <ActionCard key={tool.title} {...tool} />
        ))}
      </YStack>
    </YStack>
  )
}

function CriticalActionsSection() {
  const actions = [
    'Complete your StoryBrand BrandScript',
    'Create a one-liner that explains what you do',
    'Build a lead generator that provides value',
    'Set up an email nurture sequence',
    'Practice your 5 sales talking points',
  ]

  return (
    <YStack gap="$4">
      <H3 size="$6">Critical Actions</H3>
      <Card padding="$4" borderRadius="$4">
        <YStack gap="$3">
          {actions.map((action, index) => (
            <XStack key={index} gap="$3" alignItems="flex-start">
              <YStack
                width={24}
                height={24}
                borderRadius="$2"
                backgroundColor="$blue4"
                alignItems="center"
                justifyContent="center"
              >
                <SizableText size="$2" fontWeight="600" color="$blue10">
                  {index + 1}
                </SizableText>
              </YStack>
              <Paragraph size="$4" color="$color11" flex={1}>
                {action}
              </Paragraph>
            </XStack>
          ))}
        </YStack>
      </Card>
    </YStack>
  )
}

export function CMOScreen() {
  const { isLoading: isUserLoading } = useUser()
  const { isLoading: isSubLoading } = useSubscription()

  return (
    <DashboardLayout activeSection="cmo">
      <YStack gap="$8" maxWidth={900}>
        <CMOHeader />
        <DomainKnowledgePanel domain="cmo" />
        <StoryBrandSection />
        <SalesTalkingPointsSection />
        <MarketingToolsSection />
        <CriticalActionsSection />
      </YStack>
    </DashboardLayout>
  )
}
