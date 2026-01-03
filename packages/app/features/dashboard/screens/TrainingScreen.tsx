'use client'

import { BookOpen, ChevronRight, Clock, FileText, GraduationCap, Video } from '@tamagui/lucide-icons'
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

import { FeatureGate, useSubscription } from 'app/utils/subscription'
import { DashboardLayout } from '../components/DashboardLayout'

interface ContentItemProps {
  title: string
  description: string
  type: 'doc' | 'video' | 'guide'
  duration?: string
  href: string
}

function ContentItem({ title, description, type, duration, href }: ContentItemProps) {
  const linkProps = useLink({ href })
  const Icon = type === 'video' ? Video : type === 'guide' ? GraduationCap : FileText

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
          backgroundColor="$color3"
          alignItems="center"
          justifyContent="center"
        >
          <Icon size={20} color="$color11" />
        </XStack>
        <YStack flex={1} gap="$1">
          <SizableText size="$4" fontWeight="600">
            {title}
          </SizableText>
          <SizableText size="$2" color="$color10" numberOfLines={1}>
            {description}
          </SizableText>
        </YStack>
        {duration && (
          <XStack alignItems="center" gap="$1">
            <Clock size={14} color="$color10" />
            <SizableText size="$2" color="$color10">
              {duration}
            </SizableText>
          </XStack>
        )}
        <ChevronRight size={18} color="$color10" />
      </XStack>
    </Card>
  )
}

function TrainingCategory({
  title,
  description,
  items,
}: {
  title: string
  description: string
  items: ContentItemProps[]
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
          <ContentItem key={item.title} {...item} />
        ))}
      </YStack>
    </YStack>
  )
}

export function TrainingScreen() {
  const { tier } = useSubscription()

  // Sample content - would be fetched from database
  const gettingStarted: ContentItemProps[] = [
    {
      title: 'Welcome to Avolve',
      description: 'Get oriented with the platform and your growth journey',
      type: 'video',
      duration: '5 min',
      href: '/dashboard/training/welcome',
    },
    {
      title: 'Understanding the 5S × 4T Framework',
      description: 'Learn how Solutions, Systems, Software, Services, and Support work together',
      type: 'guide',
      duration: '15 min',
      href: '/dashboard/training/framework',
    },
    {
      title: 'Setting Up Your First Project',
      description: 'Step-by-step guide to launching your first project',
      type: 'doc',
      duration: '10 min',
      href: '/dashboard/training/first-project',
    },
  ]

  const fundamentals: ContentItemProps[] = [
    {
      title: 'Business Fundamentals',
      description: 'Core concepts every solopreneur needs to master',
      type: 'guide',
      duration: '45 min',
      href: '/dashboard/training/business-fundamentals',
    },
    {
      title: 'Technology Stack Overview',
      description: 'Understanding the tools and technologies we use',
      type: 'doc',
      duration: '20 min',
      href: '/dashboard/training/tech-stack',
    },
    {
      title: 'AI-Native Development',
      description: 'Leveraging AI throughout your workflow',
      type: 'video',
      duration: '30 min',
      href: '/dashboard/training/ai-native',
    },
  ]

  const advanced: ContentItemProps[] = [
    {
      title: 'Scaling Your Business',
      description: 'Strategies for growing from solo to team',
      type: 'guide',
      duration: '60 min',
      href: '/dashboard/training/scaling',
    },
    {
      title: 'Advanced Automation',
      description: 'Building systems that work while you sleep',
      type: 'video',
      duration: '45 min',
      href: '/dashboard/training/automation',
    },
    {
      title: 'Enterprise Architecture',
      description: 'Designing for scale and reliability',
      type: 'doc',
      duration: '90 min',
      href: '/dashboard/training/enterprise',
    },
  ]

  return (
    <DashboardLayout activeSection="training">
      <YStack gap="$8" maxWidth={900}>
        {/* Header */}
        <YStack gap="$3">
          <XStack alignItems="center" gap="$2">
            <BookOpen size={28} color="$green10" />
            <H2 size="$8">Training</H2>
          </XStack>
          <Paragraph size="$5" color="$color11">
            The Map — Build your knowledge foundation with documentation, tutorials, and guides.
          </Paragraph>
        </YStack>

        {/* Getting Started */}
        <TrainingCategory
          title="Getting Started"
          description="Essential resources to begin your journey"
          items={gettingStarted}
        />

        {/* Fundamentals */}
        <TrainingCategory
          title="Fundamentals"
          description="Core knowledge for building your business"
          items={fundamentals}
        />

        {/* Advanced - Gated */}
        <FeatureGate feature="training_advanced">
          <TrainingCategory
            title="Advanced Training"
            description="Deep dives for experienced builders"
            items={advanced}
          />
        </FeatureGate>
      </YStack>
    </DashboardLayout>
  )
}
