'use client'

import {
  Calendar,
  Clock,
  MessageCircle,
  Phone,
  Slack,
  Users,
  Video,
} from '@tamagui/lucide-icons'
import {
  Button,
  Card,
  H2,
  H3,
  Paragraph,
  Separator,
  SizableText,
  Theme,
  XStack,
  YStack,
} from '@my/ui'
import { useLink } from 'solito/link'

import { FeatureGate, useSubscription } from 'app/utils/subscription'
import { DashboardLayout } from '../components/DashboardLayout'

interface SessionCardProps {
  title: string
  description: string
  icon: React.ReactNode
  available: boolean
  nextSlot?: string
  href: string
}

function SessionCard({ title, description, icon, available, nextSlot, href }: SessionCardProps) {
  const linkProps = useLink({ href })

  return (
    <Card
      padding="$5"
      borderRadius="$4"
      backgroundColor={available ? '$background' : '$color2'}
      opacity={available ? 1 : 0.7}
    >
      <YStack gap="$4">
        <XStack gap="$3" alignItems="flex-start">
          <XStack
            width={48}
            height={48}
            borderRadius="$3"
            backgroundColor="$purple4"
            alignItems="center"
            justifyContent="center"
          >
            {icon}
          </XStack>
          <YStack flex={1} gap="$1">
            <SizableText size="$5" fontWeight="600">
              {title}
            </SizableText>
            <Paragraph size="$3" color="$color10">
              {description}
            </Paragraph>
          </YStack>
        </XStack>

        {available && nextSlot && (
          <XStack
            backgroundColor="$color3"
            padding="$3"
            borderRadius="$3"
            alignItems="center"
            gap="$2"
          >
            <Clock size={16} color="$color10" />
            <SizableText size="$3" color="$color10">
              Next available: {nextSlot}
            </SizableText>
          </XStack>
        )}

        <Button
          {...(available ? linkProps : {})}
          theme={available ? 'purple' : undefined}
          disabled={!available}
        >
          {available ? 'Schedule Session' : 'Upgrade to Access'}
        </Button>
      </YStack>
    </Card>
  )
}

function UpgradePrompt() {
  const { tier, tierConfig } = useSubscription()

  return (
    <Card
      backgroundColor="$purple3"
      padding="$6"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$purple6"
    >
      <YStack gap="$4" alignItems="center">
        <XStack
          width={64}
          height={64}
          borderRadius="$4"
          backgroundColor="$purple5"
          alignItems="center"
          justifyContent="center"
        >
          <Users size={32} color="$purple11" />
        </XStack>

        <YStack gap="$2" alignItems="center">
          <H3 size="$6" textAlign="center">
            Connect with Expert Technicians
          </H3>
          <Paragraph size="$4" color="$purple11" textAlign="center" maxWidth={500}>
            Get personalized guidance from experienced builders who&apos;ve been where you are.
            Office hours, code reviews, and strategic sessions are available with Collective PRO and above.
          </Paragraph>
        </YStack>

        <Button
          {...useLink({ href: '/pricing' })}
          size="$5"
          theme="purple"
          themeInverse
        >
          Upgrade to Access Connect
        </Button>
      </YStack>
    </Card>
  )
}

function ConnectContent() {
  const { hasAccess } = useSubscription()

  const sessions: SessionCardProps[] = [
    {
      title: 'Office Hours',
      description: 'Drop in for quick questions and guidance. Available monthly for PRO members.',
      icon: <Video size={24} color="$purple11" />,
      available: hasAccess('technician_office_hours'),
      nextSlot: 'Tomorrow at 2:00 PM EST',
      href: '/dashboard/connect/office-hours',
    },
    {
      title: 'Code Review',
      description: 'Get expert feedback on your code. Quarterly for PRO, weekly for CEO.',
      icon: <MessageCircle size={24} color="$purple11" />,
      available: hasAccess('technician_group_reviews'),
      nextSlot: 'Friday at 3:00 PM EST',
      href: '/dashboard/connect/code-review',
    },
    {
      title: 'Strategy Call',
      description: 'One-on-one strategic planning sessions. Available for Ecosystem CEO.',
      icon: <Phone size={24} color="$purple11" />,
      available: hasAccess('technician_weekly_calls'),
      nextSlot: 'Schedule anytime',
      href: '/dashboard/connect/strategy-call',
    },
  ]

  return (
    <YStack gap="$6">
      {/* Session Types */}
      <YStack gap="$3">
        <H3 size="$5">Available Sessions</H3>
        <XStack flexWrap="wrap" gap="$4">
          {sessions.map((session) => (
            <YStack key={session.title} flex={1} minWidth={280} maxWidth={400}>
              <SessionCard {...session} />
            </YStack>
          ))}
        </XStack>
      </YStack>

      {/* Dedicated Support - CEO Only */}
      <FeatureGate feature="technician_dedicated" hideWhenNoAccess>
        <YStack gap="$3">
          <H3 size="$5">Your Dedicated Technician</H3>
          <Card padding="$5" borderRadius="$4">
            <XStack gap="$4" alignItems="center" flexWrap="wrap">
              <XStack
                width={80}
                height={80}
                borderRadius="$4"
                backgroundColor="$color3"
                alignItems="center"
                justifyContent="center"
              >
                <Users size={40} color="$color10" />
              </XStack>
              <YStack flex={1} gap="$2" minWidth={200}>
                <SizableText size="$6" fontWeight="600">
                  Your Technician
                </SizableText>
                <Paragraph size="$3" color="$color10">
                  Dedicated expert assigned to your account. Available via Slack and scheduled calls.
                </Paragraph>
                <XStack gap="$3" marginTop="$2">
                  <Button size="$3" icon={<Slack size={16} />}>
                    Message
                  </Button>
                  <Button size="$3" icon={<Calendar size={16} />} chromeless>
                    Schedule Call
                  </Button>
                </XStack>
              </YStack>
            </XStack>
          </Card>
        </YStack>
      </FeatureGate>

      {/* Community */}
      <YStack gap="$3">
        <H3 size="$5">Community Support</H3>
        <Card padding="$5" borderRadius="$4">
          <XStack gap="$4" alignItems="center" justifyContent="space-between" flexWrap="wrap">
            <YStack gap="$1" flex={1} minWidth={200}>
              <SizableText size="$5" fontWeight="600">
                Community Forum
              </SizableText>
              <Paragraph size="$3" color="$color10">
                Connect with other solopreneurs, share experiences, and get help from the community.
              </Paragraph>
            </YStack>
            <Button {...useLink({ href: '/community' })}>
              Visit Forum
            </Button>
          </XStack>
        </Card>
      </YStack>
    </YStack>
  )
}

export function ConnectScreen() {
  const { hasAccess } = useSubscription()
  const canAccessConnect = hasAccess('technician_office_hours')

  return (
    <DashboardLayout activeSection="connect">
      <YStack gap="$8" maxWidth={1000}>
        {/* Header */}
        <YStack gap="$3">
          <XStack alignItems="center" gap="$2">
            <Users size={28} color="$purple10" />
            <H2 size="$8">Connect</H2>
          </XStack>
          <Paragraph size="$5" color="$color11">
            The Artist — Get expert guidance from experienced technicians who adapt to your needs.
          </Paragraph>
        </YStack>

        {canAccessConnect ? <ConnectContent /> : <UpgradePrompt />}
      </YStack>
    </DashboardLayout>
  )
}
