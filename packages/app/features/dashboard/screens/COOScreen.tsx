'use client'

import {
  Settings,
  Calendar,
  Users,
  Clock,
  ArrowRight,
  CheckCircle,
  Cog,
  ListChecks,
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
  href: string
  icon: React.ReactNode
  status?: 'complete' | 'in-progress' | 'not-started'
}

function ActionCard({ title, description, href, icon, status = 'not-started' }: ActionCardProps) {
  const linkProps = useLink({ href })

  return (
    <Card
      {...linkProps}
      padding="$4"
      borderRadius="$4"
      hoverStyle={{ backgroundColor: '$color3' }}
      pressStyle={{ scale: 0.98 }}
      animation="quick"
      cursor="pointer"
    >
      <XStack gap="$3" alignItems="center">
        <YStack
          width={44}
          height={44}
          borderRadius="$3"
          backgroundColor="$orange4"
          alignItems="center"
          justifyContent="center"
        >
          {icon}
        </YStack>
        <YStack flex={1} gap="$1">
          <SizableText size="$4" fontWeight="600">
            {title}
          </SizableText>
          <Paragraph size="$3" color="$color11">
            {description}
          </Paragraph>
        </YStack>
        {status === 'complete' ? (
          <CheckCircle size={20} color="$green10" />
        ) : (
          <ArrowRight size={18} color="$color10" />
        )}
      </XStack>
    </Card>
  )
}

function COOHeader() {
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
          backgroundColor="$orange4"
          alignItems="center"
          justifyContent="center"
        >
          <Cog size={28} color="$orange10" />
        </YStack>
        <YStack>
          <SizableText size="$3" color="$orange10" fontWeight="600">
            THE BODY
          </SizableText>
          <H2 size="$8">COO — Admin</H2>
        </YStack>
      </XStack>
      <Paragraph size="$5" color="$color11" maxWidth={600}>
        Management and operations. The body of the airplane that holds everything together and
        ensures smooth, efficient execution of your strategy.
      </Paragraph>
    </YStack>
  )
}

function FiveMeetingsSection() {
  const meetings = [
    {
      name: 'All-Staff Meeting',
      frequency: 'Weekly or Monthly',
      purpose: 'Align the entire team on mission, wins, and priorities',
      duration: '30-60 min',
    },
    {
      name: 'Leadership Meeting',
      frequency: 'Weekly',
      purpose: 'Strategic decisions and cross-functional coordination',
      duration: '60-90 min',
    },
    {
      name: 'Department Stand-up',
      frequency: 'Daily or Weekly',
      purpose: 'Quick sync on blockers and daily priorities',
      duration: '15 min',
    },
    {
      name: 'Priority Speed Check',
      frequency: 'Weekly',
      purpose: '1:1 check-ins on individual progress and obstacles',
      duration: '15-30 min',
    },
    {
      name: 'Quarterly Review',
      frequency: 'Quarterly',
      purpose: 'Deep performance review and goal setting',
      duration: '60 min',
    },
  ]

  return (
    <YStack gap="$4">
      <XStack justifyContent="space-between" alignItems="center">
        <H3 size="$6">5 Meetings System</H3>
        <Button size="$3" theme="orange" icon={<Calendar size={16} />}>
          Schedule Setup
        </Button>
      </XStack>
      <YStack gap="$3">
        {meetings.map((meeting, index) => (
          <Card key={meeting.name} padding="$4" borderRadius="$4">
            <XStack gap="$3" alignItems="flex-start">
              <YStack
                width={28}
                height={28}
                borderRadius="$2"
                backgroundColor="$orange4"
                alignItems="center"
                justifyContent="center"
              >
                <SizableText size="$3" fontWeight="600" color="$orange10">
                  {index + 1}
                </SizableText>
              </YStack>
              <YStack flex={1} gap="$1">
                <XStack justifyContent="space-between" alignItems="center">
                  <SizableText size="$4" fontWeight="600">
                    {meeting.name}
                  </SizableText>
                  <XStack gap="$2" alignItems="center">
                    <Clock size={14} color="$color10" />
                    <SizableText size="$2" color="$color10">
                      {meeting.duration}
                    </SizableText>
                  </XStack>
                </XStack>
                <SizableText size="$3" color="$orange10" fontWeight="500">
                  {meeting.frequency}
                </SizableText>
                <Paragraph size="$3" color="$color11">
                  {meeting.purpose}
                </Paragraph>
              </YStack>
            </XStack>
          </Card>
        ))}
      </YStack>
    </YStack>
  )
}

function TimeAllocationSection() {
  return (
    <YStack gap="$4">
      <H3 size="$6">Time Allocation</H3>
      <Card padding="$5" borderRadius="$4" backgroundColor="$orange3">
        <YStack gap="$4">
          <Paragraph size="$4" color="$orange11">
            Research shows solopreneurs spend 28% of time on email and 23% on admin tasks. The goal
            is to flip this: 70%+ on core work through automation and systems.
          </Paragraph>
          <XStack flexWrap="wrap" gap="$4">
            <YStack flex={1} minWidth={150} gap="$2">
              <SizableText size="$3" color="$orange10" fontWeight="600">
                CURRENT (TYPICAL)
              </SizableText>
              <SizableText size="$2" color="$orange11">
                28% Email
              </SizableText>
              <SizableText size="$2" color="$orange11">
                23% Admin tasks
              </SizableText>
              <SizableText size="$2" color="$orange11">
                49% Core work
              </SizableText>
            </YStack>
            <YStack flex={1} minWidth={150} gap="$2">
              <SizableText size="$3" color="$orange10" fontWeight="600">
                TARGET (OPTIMIZED)
              </SizableText>
              <SizableText size="$2" color="$orange11">
                10% Email (AI triage)
              </SizableText>
              <SizableText size="$2" color="$orange11">
                20% Admin (automated)
              </SizableText>
              <SizableText size="$2" color="$orange11">
                70% Core work
              </SizableText>
            </YStack>
          </XStack>
        </YStack>
      </Card>
    </YStack>
  )
}

function OperationsToolsSection() {
  const tools = [
    {
      title: 'Process Documentation',
      description: 'Document your core 6-10 processes for consistency',
      href: '/dashboard/coo/processes',
      icon: <ListChecks size={22} color="$orange10" />,
    },
    {
      title: 'Meeting Templates',
      description: 'Pre-built agendas for each of the 5 meeting types',
      href: '/dashboard/coo/meetings',
      icon: <Calendar size={22} color="$orange10" />,
    },
    {
      title: 'Automation Library',
      description: 'Ready-to-use workflows to reduce admin time',
      href: '/dashboard/coo/automations',
      icon: <Settings size={22} color="$orange10" />,
    },
  ]

  return (
    <YStack gap="$4">
      <H3 size="$6">Operations Tools</H3>
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
    'Audit your current time allocation across activities',
    'Implement the 5 Meetings System with clear agendas',
    'Document your top 6-10 core business processes',
    'Identify repetitive tasks that can be automated',
    'Set up weekly and quarterly review rhythms',
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
                backgroundColor="$orange4"
                alignItems="center"
                justifyContent="center"
              >
                <SizableText size="$2" fontWeight="600" color="$orange10">
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

export function COOScreen() {
  const { isLoading: isUserLoading } = useUser()
  const { isLoading: isSubLoading } = useSubscription()

  return (
    <DashboardLayout activeSection="coo">
      <YStack gap="$8" maxWidth={900}>
        <COOHeader />
        <DomainKnowledgePanel domain="coo" />
        <FiveMeetingsSection />
        <TimeAllocationSection />
        <OperationsToolsSection />
        <CriticalActionsSection />
      </YStack>
    </DashboardLayout>
  )
}
