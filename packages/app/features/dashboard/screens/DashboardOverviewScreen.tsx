'use client'

import { ArrowRight, BookOpen, Compass, Cpu, Users } from '@tamagui/lucide-icons'
import {
  Button,
  Card,
  H2,
  H3,
  Paragraph,
  SizableText,
  Theme,
  XStack,
  YStack,
} from '@my/ui'
import { useLink } from 'solito/link'

import { useUser } from 'app/utils/useUser'
import { useSubscription } from 'app/utils/subscription'
import { DashboardLayout } from '../components/DashboardLayout'

interface QuickAccessCardProps {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  theme?: string
}

function QuickAccessCard({ title, description, href, icon, theme }: QuickAccessCardProps) {
  const linkProps = useLink({ href })

  return (
    <Theme name={theme as any}>
      <Card
        {...linkProps}
        flex={1}
        padding="$5"
        borderRadius="$4"
        hoverStyle={{ scale: 1.02, backgroundColor: '$color3' }}
        pressStyle={{ scale: 0.98 }}
        animation="quick"
        minWidth={200}
        cursor="pointer"
      >
        <YStack gap="$3">
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
          <YStack gap="$1">
            <SizableText size="$5" fontWeight="600">
              {title}
            </SizableText>
            <Paragraph size="$3" color="$color11">
              {description}
            </Paragraph>
          </YStack>
          <XStack alignItems="center" gap="$1">
            <SizableText size="$3" color="$color10">
              Explore
            </SizableText>
            <ArrowRight size={14} color="$color10" />
          </XStack>
        </YStack>
      </Card>
    </Theme>
  )
}

function WelcomeSection() {
  const { profile } = useUser()
  const { tierConfig, isSubscribed } = useSubscription()

  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <YStack gap="$4">
      <YStack gap="$2">
        <H2 size="$9">
          {greeting()}, {profile?.name || 'there'}!
        </H2>
        <Paragraph size="$5" color="$color11">
          {isSubscribed
            ? `You're on the ${tierConfig?.name} plan. Let's keep building.`
            : "Welcome to Avolve. Let's get you started."}
        </Paragraph>
      </YStack>

      {!isSubscribed && (
        <Card backgroundColor="$blue3" padding="$4" borderRadius="$4">
          <XStack justifyContent="space-between" alignItems="center" flexWrap="wrap" gap="$3">
            <YStack flex={1} minWidth={200}>
              <SizableText size="$4" fontWeight="600" color="$blue11">
                Ready to accelerate your growth?
              </SizableText>
              <SizableText size="$3" color="$blue10">
                Unlock all features with a subscription.
              </SizableText>
            </YStack>
            <Button {...useLink({ href: '/pricing' })} theme="blue">
              View Plans
            </Button>
          </XStack>
        </Card>
      )}
    </YStack>
  )
}

function QuickAccess() {
  const { hasAccess } = useSubscription()

  const sections = [
    {
      title: 'Training',
      description: 'Documentation, tutorials, and learning resources',
      href: '/dashboard/training',
      icon: <BookOpen size={24} color="$green11" />,
      theme: 'green',
    },
    {
      title: 'Techniques',
      description: 'Playbooks, SOPs, and proven methods',
      href: '/dashboard/techniques',
      icon: <Compass size={24} color="$blue11" />,
      theme: 'blue',
    },
    {
      title: 'Tools',
      description: 'Templates, components, and code',
      href: '/dashboard/tools',
      icon: <Cpu size={24} color="$orange11" />,
      theme: 'orange',
    },
    {
      title: 'Connect',
      description: 'Expert guidance and support',
      href: '/dashboard/connect',
      icon: <Users size={24} color="$purple11" />,
      theme: 'purple',
      requiresAccess: 'technician_office_hours' as const,
    },
  ]

  return (
    <YStack gap="$4">
      <H3 size="$6">Quick Access</H3>
      <XStack flexWrap="wrap" gap="$3">
        {sections.map((section) => {
          if (section.requiresAccess && !hasAccess(section.requiresAccess)) {
            return null
          }
          return (
            <QuickAccessCard
              key={section.title}
              {...section}
            />
          )
        })}
      </XStack>
    </YStack>
  )
}

function ProgressSection() {
  // This would be connected to real data
  const stats = [
    { label: 'Docs Completed', value: '12', total: '24' },
    { label: 'Playbooks Used', value: '3', total: '8' },
    { label: 'Templates Downloaded', value: '5', total: null },
    { label: 'AI Messages Today', value: '47', total: '100' },
  ]

  return (
    <YStack gap="$4">
      <H3 size="$6">Your Progress</H3>
      <XStack flexWrap="wrap" gap="$3">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            flex={1}
            padding="$4"
            borderRadius="$4"
            minWidth={150}
          >
            <YStack gap="$2">
              <SizableText size="$3" color="$color10">
                {stat.label}
              </SizableText>
              <XStack alignItems="baseline" gap="$1">
                <SizableText size="$8" fontWeight="700">
                  {stat.value}
                </SizableText>
                {stat.total && (
                  <SizableText size="$4" color="$color10">
                    / {stat.total}
                  </SizableText>
                )}
              </XStack>
            </YStack>
          </Card>
        ))}
      </XStack>
    </YStack>
  )
}

export function DashboardOverviewScreen() {
  return (
    <DashboardLayout activeSection="overview">
      <YStack gap="$8" maxWidth={1200}>
        <WelcomeSection />
        <QuickAccess />
        <ProgressSection />
      </YStack>
    </DashboardLayout>
  )
}
