'use client'

import { ArrowRight, Plane, Zap, Layers, Cog, Fuel } from '@tamagui/lucide-icons'
import {
  Button,
  Card,
  H2,
  H3,
  Paragraph,
  SizableText,
  Skeleton,
  Theme,
  XStack,
  YStack,
} from '@my/ui'
import { useLink } from 'solito/link'

import { useUser } from 'app/utils/useUser'
import { useSubscription } from 'app/utils/subscription'
import { DashboardLayout } from '../components/DashboardLayout'

interface CSuiteCardProps {
  title: string
  role: string
  metaphor: string
  description: string
  href: string
  icon: React.ReactNode
  theme: string
  progress?: number
}

function CSuiteCard({
  title,
  role,
  metaphor,
  description,
  href,
  icon,
  theme,
  progress = 0,
}: CSuiteCardProps) {
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
            <SizableText size="$5" fontWeight="600">
              {title}
            </SizableText>
            <SizableText size="$2" color="$color10" fontWeight="500">
              {metaphor}
            </SizableText>
            <Paragraph size="$3" color="$color11">
              {description}
            </Paragraph>
          </YStack>
          <XStack justifyContent="space-between" alignItems="center">
            <XStack alignItems="center" gap="$1">
              <SizableText size="$3" color="$color10">
                Explore
              </SizableText>
              <ArrowRight size={14} color="$color10" />
            </XStack>
            {progress > 0 && (
              <SizableText size="$2" color="$color10">
                {progress}% complete
              </SizableText>
            )}
          </XStack>
        </YStack>
      </Card>
    </Theme>
  )
}

function WelcomeSectionSkeleton() {
  return (
    <YStack gap="$4">
      <YStack gap="$2">
        <Skeleton width={300} height={36} variant="title" />
        <Skeleton width={400} height={20} />
      </YStack>
    </YStack>
  )
}

function WelcomeSection() {
  const { profile, isLoading: isUserLoading } = useUser()
  const { tierConfig: _tierConfig, isSubscribed, isLoading: isSubLoading } = useSubscription()

  // All hooks must be called before any early returns
  const pricingLink = useLink({ href: '/pricing' })

  const isLoading = isUserLoading || isSubLoading

  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  if (isLoading) {
    return <WelcomeSectionSkeleton />
  }

  return (
    <YStack gap="$4">
      <YStack gap="$2">
        <H2 size="$9">
          {greeting()}, {profile?.name || 'there'}!
        </H2>
        <Paragraph size="$5" color="$color11">
          {isSubscribed
            ? "Your business dashboard. Master each role to build a business that flies."
            : "Welcome to Avolve. Let's build a business that flies."}
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
            <Button {...pricingLink} theme="blue">
              View Plans
            </Button>
          </XStack>
        </Card>
      )}
    </YStack>
  )
}

function AirplaneMetaphorSection() {
  return (
    <YStack gap="$4">
      <H3 size="$6">The Business Airplane</H3>
      <Card padding="$5" borderRadius="$4" backgroundColor="$color2">
        <YStack gap="$4">
          <Paragraph size="$4" color="$color11">
            Think of your business as an airplane. Each part must work together for successful
            flight. As the pilot, you need to master all five roles to keep your business airborne
            and heading toward your destination.
          </Paragraph>
          <XStack flexWrap="wrap" gap="$4">
            <YStack flex={1} minWidth={140} gap="$2">
              <XStack gap="$2" alignItems="center">
                <Plane size={16} color="$purple10" />
                <SizableText size="$3" fontWeight="600" color="$purple10">
                  Cockpit
                </SizableText>
              </XStack>
              <SizableText size="$2" color="$color11">
                CEO sets direction
              </SizableText>
            </YStack>
            <YStack flex={1} minWidth={140} gap="$2">
              <XStack gap="$2" alignItems="center">
                <Zap size={16} color="$blue10" />
                <SizableText size="$3" fontWeight="600" color="$blue10">
                  Engines
                </SizableText>
              </XStack>
              <SizableText size="$2" color="$color11">
                CMO drives growth
              </SizableText>
            </YStack>
            <YStack flex={1} minWidth={140} gap="$2">
              <XStack gap="$2" alignItems="center">
                <Layers size={16} color="$green10" />
                <SizableText size="$3" fontWeight="600" color="$green10">
                  Wings
                </SizableText>
              </XStack>
              <SizableText size="$2" color="$color11">
                CVO creates lift
              </SizableText>
            </YStack>
            <YStack flex={1} minWidth={140} gap="$2">
              <XStack gap="$2" alignItems="center">
                <Cog size={16} color="$orange10" />
                <SizableText size="$3" fontWeight="600" color="$orange10">
                  Body
                </SizableText>
              </XStack>
              <SizableText size="$2" color="$color11">
                COO holds it together
              </SizableText>
            </YStack>
            <YStack flex={1} minWidth={140} gap="$2">
              <XStack gap="$2" alignItems="center">
                <Fuel size={16} color="$yellow10" />
                <SizableText size="$3" fontWeight="600" color="$yellow10">
                  Fuel Tanks
                </SizableText>
              </XStack>
              <SizableText size="$2" color="$color11">
                CFO keeps it running
              </SizableText>
            </YStack>
          </XStack>
        </YStack>
      </Card>
    </YStack>
  )
}

function CSuiteSection({ isLoading }: { isLoading?: boolean }) {
  const sections: CSuiteCardProps[] = [
    {
      title: 'Focus',
      role: 'CEO',
      metaphor: 'The Cockpit',
      description: 'Mission, vision, and strategic direction',
      href: '/dashboard/ceo',
      icon: <Plane size={24} color="$purple11" />,
      theme: 'purple',
    },
    {
      title: 'Users',
      role: 'CMO',
      metaphor: 'The Engines',
      description: 'Marketing, sales, and customer acquisition',
      href: '/dashboard/cmo',
      icon: <Zap size={24} color="$blue11" />,
      theme: 'blue',
    },
    {
      title: 'Value',
      role: 'CVO',
      metaphor: 'The Wings',
      description: 'Products, services, and value creation',
      href: '/dashboard/cvo',
      icon: <Layers size={24} color="$green11" />,
      theme: 'green',
    },
    {
      title: 'Admin',
      role: 'COO',
      metaphor: 'The Body',
      description: 'Operations, processes, and efficiency',
      href: '/dashboard/coo',
      icon: <Cog size={24} color="$orange11" />,
      theme: 'orange',
    },
    {
      title: 'Funds',
      role: 'CFO',
      metaphor: 'The Fuel Tanks',
      description: 'Cash flow, finances, and profitability',
      href: '/dashboard/cfo',
      icon: <Fuel size={24} color="$yellow11" />,
      theme: 'yellow',
    },
  ]

  if (isLoading) {
    return (
      <YStack gap="$4">
        <Skeleton width={180} height={24} variant="title" />
        <XStack flexWrap="wrap" gap="$3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} width={200} height={180} variant="card" />
          ))}
        </XStack>
      </YStack>
    )
  }

  return (
    <YStack gap="$4">
      <H3 size="$6">Your C-Suite Roles</H3>
      <XStack flexWrap="wrap" gap="$3">
        {sections.map((section) => (
          <CSuiteCard key={section.role} {...section} />
        ))}
      </XStack>
    </YStack>
  )
}

function QuickStatsSection({ isLoading }: { isLoading?: boolean }) {
  const stats = [
    { label: 'Mission Clarity', value: '40%', color: '$purple10' },
    { label: 'Marketing Score', value: '25%', color: '$blue10' },
    { label: 'Product Health', value: '60%', color: '$green10' },
    { label: 'Operations', value: '35%', color: '$orange10' },
    { label: 'Cash Position', value: '55%', color: '$yellow10' },
  ]

  if (isLoading) {
    return (
      <YStack gap="$4">
        <Skeleton width={150} height={24} variant="title" />
        <XStack flexWrap="wrap" gap="$3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} width={150} height={80} variant="card" />
          ))}
        </XStack>
      </YStack>
    )
  }

  return (
    <YStack gap="$4">
      <H3 size="$6">Business Health</H3>
      <XStack flexWrap="wrap" gap="$3">
        {stats.map((stat) => (
          <Card key={stat.label} flex={1} padding="$4" borderRadius="$4" minWidth={140}>
            <YStack gap="$2">
              <SizableText size="$3" color="$color10">
                {stat.label}
              </SizableText>
              <SizableText size="$7" fontWeight="700" color={stat.color as any}>
                {stat.value}
              </SizableText>
            </YStack>
          </Card>
        ))}
      </XStack>
    </YStack>
  )
}

export function DashboardOverviewScreen() {
  const { isLoading: isUserLoading } = useUser()
  const { isLoading: isSubLoading } = useSubscription()
  const isLoading = isUserLoading || isSubLoading

  return (
    <DashboardLayout activeSection="overview">
      <YStack gap="$8" maxWidth={1200}>
        <WelcomeSection />
        <AirplaneMetaphorSection />
        <CSuiteSection isLoading={isLoading} />
        <QuickStatsSection isLoading={isLoading} />
      </YStack>
    </DashboardLayout>
  )
}
