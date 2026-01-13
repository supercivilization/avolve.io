'use client'

import {
  Target,
  Compass,
  Flag,
  Calendar,
  CheckCircle,
  ArrowRight,
  Plane,
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
import { useLink } from 'solito/link'

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
          backgroundColor="$purple4"
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

function CEOHeader() {
  const { profile, isLoading } = useUser()

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
          backgroundColor="$purple4"
          alignItems="center"
          justifyContent="center"
        >
          <Plane size={28} color="$purple10" />
        </YStack>
        <YStack>
          <SizableText size="$3" color="$purple10" fontWeight="600">
            THE COCKPIT
          </SizableText>
          <H2 size="$8">CEO — Focus</H2>
        </YStack>
      </XStack>
      <Paragraph size="$5" color="$color11" maxWidth={600}>
        Leadership, mission, and strategic direction. Where you set the course and keep the plane on
        track toward your destination.
      </Paragraph>
    </YStack>
  )
}

function MissionSection() {
  return (
    <YStack gap="$4">
      <H3 size="$6">Mission & Vision</H3>
      <Card padding="$5" borderRadius="$4" backgroundColor="$purple3">
        <YStack gap="$4">
          <YStack gap="$2">
            <SizableText size="$3" color="$purple10" fontWeight="600">
              YOUR MISSION STATEMENT
            </SizableText>
            <SizableText size="$5" color="$purple11" fontStyle="italic">
              "We help solopreneurs build sustainable businesses by providing AI-powered tools,
              proven frameworks, and expert guidance."
            </SizableText>
          </YStack>
          <XStack gap="$3" flexWrap="wrap">
            <Button size="$3" theme="purple" icon={<Target size={16} />}>
              Edit Mission
            </Button>
            <Button size="$3" variant="outlined" theme="purple">
              View Full Strategy
            </Button>
          </XStack>
        </YStack>
      </Card>
    </YStack>
  )
}

function PrioritiesSection() {
  const priorities: Array<Omit<ActionCardProps, 'onPress'>> = [
    {
      title: '3 Economic Priorities',
      description: 'Define the 3 things that must happen for business success',
      icon: <Flag size={22} color="$purple10" />,
      status: 'coming-soon',
    },
    {
      title: 'Quarterly OKRs',
      description: 'Set 3-5 objectives with measurable key results',
      icon: <Target size={22} color="$purple10" />,
      status: 'coming-soon',
    },
    {
      title: 'Weekly Review',
      description: 'Assess progress and adjust course',
      icon: <Calendar size={22} color="$purple10" />,
      status: 'coming-soon',
    },
  ]

  return (
    <YStack gap="$4">
      <H3 size="$6">Strategic Priorities</H3>
      <YStack gap="$3">
        {priorities.map((item) => (
          <ActionCard key={item.title} {...item} />
        ))}
      </YStack>
    </YStack>
  )
}

function KeyCharacteristicsSection() {
  const characteristics = [
    {
      title: 'Clear Communicator',
      description: 'Can you explain your business in one sentence?',
    },
    {
      title: 'Focused Leader',
      description: 'Do you know your 3 economic priorities?',
    },
    {
      title: 'Strategic Thinker',
      description: 'Do you have a 10-year vision and quarterly goals?',
    },
    {
      title: 'Mission-Driven',
      description: 'Does your team know why the work matters?',
    },
  ]

  return (
    <YStack gap="$4">
      <H3 size="$6">CEO Key Characteristics</H3>
      <XStack flexWrap="wrap" gap="$3">
        {characteristics.map((item) => (
          <Card key={item.title} flex={1} padding="$4" borderRadius="$4" minWidth={200}>
            <YStack gap="$2">
              <SizableText size="$4" fontWeight="600">
                {item.title}
              </SizableText>
              <Paragraph size="$3" color="$color11">
                {item.description}
              </Paragraph>
            </YStack>
          </Card>
        ))}
      </XStack>
    </YStack>
  )
}

function CriticalActionsSection() {
  const actions = [
    'Create a mission statement that inspires action',
    'Identify and communicate your 3 economic priorities',
    'Establish quarterly OKRs and weekly review cadence',
    'Build a one-page strategic plan (Vision/Traction Organizer)',
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
                backgroundColor="$purple4"
                alignItems="center"
                justifyContent="center"
              >
                <SizableText size="$2" fontWeight="600" color="$purple10">
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

export function CEOScreen() {
  const { isLoading: isUserLoading } = useUser()
  const { isLoading: isSubLoading } = useSubscription()
  const isLoading = isUserLoading || isSubLoading

  return (
    <DashboardLayout activeSection="ceo">
      <YStack gap="$8" maxWidth={900}>
        <CEOHeader />
        <DomainKnowledgePanel domain="ceo" />
        <MissionSection />
        <PrioritiesSection />
        <KeyCharacteristicsSection />
        <CriticalActionsSection />
      </YStack>
    </DashboardLayout>
  )
}
