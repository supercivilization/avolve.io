'use client'

import { useMemo } from 'react'
import { validToken, AchievementCard, Button, H4, Theme, XStack, YStack } from '@my/ui'
import type { ThemeName } from 'tamagui'
import { ArrowRight, Brain, Compass, Plane, User } from '@tamagui/lucide-icons'
import { Platform } from 'react-native'
import { useLink } from 'solito/link'

import { ScrollAdapt } from './scroll-adapt'
import { useDashboardStats } from '../hooks/useDashboardStats'

const halfMinusSpace = validToken(
  Platform.select({
    web: 'calc(50% - 12px)',
    native: '53%',
  })
)

const quarterMinusSpace = validToken(
  Platform.select({
    web: 'calc(25% - 12px)',
    native: '21%',
  })
)

interface AchievementData {
  title: string
  progress: { current: number; full: number; label: string }
  theme: ThemeName
  href: string
  icon: typeof Plane
}

// Component wrapper to properly use hooks outside of map callback
function AchievementCardWrapper({ achievement }: { achievement: AchievementData }) {
  const linkProps = useLink({ href: achievement.href })

  return (
    <Theme name={achievement.theme}>
      <AchievementCard
        w={300}
        $gtMd={{
          w: halfMinusSpace,
        }}
        $gtLg={{
          w: quarterMinusSpace,
        }}
        icon={achievement.icon}
        title={achievement.title}
        progress={achievement.progress}
        action={{
          text: 'Get started',
          props: linkProps,
        }}
      />
    </Theme>
  )
}

export const AchievementsSection = () => {
  const { profileCompletion, brainStats, roleStats } = useDashboardStats()

  const achievementData: AchievementData[] = useMemo(
    () => [
      {
        title: 'Master CEO Role',
        progress: { current: roleStats.ceoVisited ? 1 : 0, full: 5, label: 'tasks completed' },
        theme: 'purple',
        href: '/ceo',
        icon: Plane,
      },
      {
        title: 'Build Your Brain',
        progress: { current: brainStats.documentCount, full: 10, label: 'documents added' },
        theme: 'blue',
        href: '/brain',
        icon: Brain,
      },
      {
        title: 'Complete Profile',
        progress: {
          current: profileCompletion.completedFields,
          full: profileCompletion.totalFields,
          label: 'sections filled',
        },
        theme: 'orange',
        href: '/profile/edit',
        icon: User,
      },
      {
        title: 'Explore All Roles',
        progress: {
          current: roleStats.rolesVisited,
          full: roleStats.totalRoles,
          label: 'roles visited',
        },
        theme: 'green',
        href: '/dashboard',
        icon: Compass,
      },
    ],
    [profileCompletion, brainStats, roleStats]
  )

  return (
    <YStack>
      <XStack px="$4.5" ai="center" gap="$2" jc="space-between" mb="$4">
        <H4 theme="alt1" fow="400">
          Getting Started
        </H4>
        <Button theme="alt2" size="$2" chromeless iconAfter={ArrowRight}>
          All Achievements
        </Button>
      </XStack>

      <ScrollAdapt>
        <XStack w="100%" px="$4" fw="wrap" f={1} gap="$3">
          {achievementData.map((achievement) => (
            <AchievementCardWrapper key={achievement.title} achievement={achievement} />
          ))}
        </XStack>
      </ScrollAdapt>
    </YStack>
  )
}
