'use client'

import { ChevronRight, Compass, FileCheck, ListChecks, Route } from '@tamagui/lucide-icons'
import {
  Card,
  H2,
  H3,
  Paragraph,
  SizableText,
  XStack,
  YStack,
} from '@my/ui'
import { useLink } from 'solito/link'

import { FeatureGate } from 'app/utils/subscription'
import { DashboardLayout } from '../components/DashboardLayout'

interface PlaybookItemProps {
  title: string
  description: string
  category: string
  steps: number
  href: string
}

function PlaybookItem({ title, description, category, steps, href }: PlaybookItemProps) {
  const linkProps = useLink({ href })

  return (
    <Card
      {...linkProps}
      padding="$4"
      borderRadius="$3"
      hoverStyle={{ backgroundColor: '$color3' }}
      pressStyle={{ scale: 0.99 }}
      cursor="pointer"
    >
      <XStack gap="$3" alignItems="center">
        <XStack
          width={40}
          height={40}
          borderRadius="$2"
          backgroundColor="$blue3"
          alignItems="center"
          justifyContent="center"
        >
          <Route size={20} color="$blue11" />
        </XStack>
        <YStack flex={1} gap="$1">
          <XStack gap="$2" alignItems="center">
            <SizableText size="$4" fontWeight="600">
              {title}
            </SizableText>
            <XStack
              backgroundColor="$color3"
              paddingHorizontal="$2"
              paddingVertical="$1"
              borderRadius="$2"
            >
              <SizableText size="$1" color="$color10">
                {category}
              </SizableText>
            </XStack>
          </XStack>
          <SizableText size="$2" color="$color10" numberOfLines={1}>
            {description}
          </SizableText>
        </YStack>
        <XStack alignItems="center" gap="$1">
          <ListChecks size={14} color="$color10" />
          <SizableText size="$2" color="$color10">
            {steps} steps
          </SizableText>
        </XStack>
        <ChevronRight size={18} color="$color10" />
      </XStack>
    </Card>
  )
}

function PlaybookCategory({
  title,
  description,
  items,
}: {
  title: string
  description: string
  items: PlaybookItemProps[]
}) {
  return (
    <YStack gap="$3">
      <YStack gap="$1">
        <H3 size="$5">{title}</H3>
        <Paragraph size="$3" color="$color10">
          {description}
        </Paragraph>
      </YStack>
      <YStack gap="$2">
        {items.map((item) => (
          <PlaybookItem key={item.title} {...item} />
        ))}
      </YStack>
    </YStack>
  )
}

export function TechniquesScreen() {
  // Sample playbooks - would be fetched from database
  const salesPlaybooks: PlaybookItemProps[] = [
    {
      title: 'Cold Outreach Sequence',
      description: 'Proven 5-touch sequence for reaching prospects',
      category: 'Sales',
      steps: 12,
      href: '/dashboard/techniques/cold-outreach',
    },
    {
      title: 'Discovery Call Framework',
      description: 'Run effective discovery calls that convert',
      category: 'Sales',
      steps: 8,
      href: '/dashboard/techniques/discovery-calls',
    },
    {
      title: 'Proposal Creation SOP',
      description: 'Create winning proposals in under 30 minutes',
      category: 'Sales',
      steps: 6,
      href: '/dashboard/techniques/proposals',
    },
  ]

  const operationsPlaybooks: PlaybookItemProps[] = [
    {
      title: 'Client Onboarding',
      description: 'Seamless onboarding experience for new clients',
      category: 'Operations',
      steps: 15,
      href: '/dashboard/techniques/client-onboarding',
    },
    {
      title: 'Project Kickoff',
      description: 'Start every project on the right foot',
      category: 'Operations',
      steps: 10,
      href: '/dashboard/techniques/project-kickoff',
    },
    {
      title: 'Weekly Review Process',
      description: 'Stay on track with structured weekly reviews',
      category: 'Operations',
      steps: 7,
      href: '/dashboard/techniques/weekly-review',
    },
  ]

  const teamPlaybooks: PlaybookItemProps[] = [
    {
      title: 'Hiring Process',
      description: 'Find and onboard great team members',
      category: 'Team',
      steps: 18,
      href: '/dashboard/techniques/hiring',
    },
    {
      title: 'Team Meeting Framework',
      description: 'Run effective meetings that respect everyone\'s time',
      category: 'Team',
      steps: 5,
      href: '/dashboard/techniques/meetings',
    },
    {
      title: 'Performance Review System',
      description: 'Growth-focused performance conversations',
      category: 'Team',
      steps: 12,
      href: '/dashboard/techniques/performance',
    },
  ]

  return (
    <DashboardLayout activeSection="techniques">
      <YStack gap="$8" maxWidth={900}>
        {/* Header */}
        <YStack gap="$3">
          <XStack alignItems="center" gap="$2">
            <Compass size={28} color="$blue10" />
            <H2 size="$8">Techniques</H2>
          </XStack>
          <Paragraph size="$5" color="$color11">
            The Method — Proven playbooks and SOPs to execute with confidence.
          </Paragraph>
        </YStack>

        {/* Sales Playbooks */}
        <PlaybookCategory
          title="Sales & Revenue"
          description="Close more deals with systematic approaches"
          items={salesPlaybooks}
        />

        {/* Operations Playbooks */}
        <PlaybookCategory
          title="Operations & Delivery"
          description="Streamline your day-to-day operations"
          items={operationsPlaybooks}
        />

        {/* Team Playbooks - Gated for PRO+ */}
        <FeatureGate feature="techniques_workshops">
          <PlaybookCategory
            title="Team & Leadership"
            description="Scale your team effectively"
            items={teamPlaybooks}
          />
        </FeatureGate>
      </YStack>
    </DashboardLayout>
  )
}
