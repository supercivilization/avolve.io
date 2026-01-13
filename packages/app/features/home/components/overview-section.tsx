'use client'

import { Button, H4, OverviewCard, Theme, XStack, YStack } from '@my/ui'
import { ArrowRight } from '@tamagui/lucide-icons'

import { ScrollAdapt } from './scroll-adapt'
import { useDashboardStats } from '../hooks/useDashboardStats'

export const OverviewSection = () => {
  const { profileCompletion, brainStats, roleStats } = useDashboardStats()

  // Calculate metrics based on real data
  // CEO Mission Clarity = profile completion + brain docs
  const missionClarity = Math.min(
    100,
    Math.round((profileCompletion.percentage + brainStats.documentCount * 5) / 2)
  )

  // CMO Marketing Score = based on content creation (brain entities)
  const marketingScore = Math.min(100, brainStats.entityCount * 10)

  // CVO Product Health = brain conversations (product knowledge queries)
  const productHealth = Math.min(100, brainStats.conversationCount * 15)

  // COO Operations = roles visited completion
  const operations = Math.round((roleStats.rolesVisited / roleStats.totalRoles) * 100)

  return (
    <YStack>
      <XStack px="$4.5" ai="center" gap="$2" jc="space-between" mb="$4">
        <H4 theme="alt1" fow="400">
          Overview
        </H4>
        <Theme name="alt2">
          <Button size="$2" chromeless iconAfter={ArrowRight}>
            View All Stats
          </Button>
        </Theme>
      </XStack>

      <ScrollAdapt itemWidth={180} withSnap>
        <XStack fw="wrap" ai="flex-start" jc="flex-start" px="$4" gap="$8" mb="$4">
          <OverviewCard
            title="Mission Clarity"
            value={`${missionClarity}%`}
            badgeText="CEO"
            badgeState={missionClarity >= 50 ? 'success' : 'warning'}
          />

          <OverviewCard
            title="Marketing Score"
            value={`${marketingScore}%`}
            badgeText="CMO"
            badgeState={marketingScore >= 50 ? 'success' : 'warning'}
          />

          <OverviewCard
            title="Product Health"
            value={`${productHealth}%`}
            badgeText="CVO"
            badgeState={productHealth >= 50 ? 'success' : 'warning'}
          />

          <OverviewCard
            title="Operations"
            value={`${operations}%`}
            badgeText="COO"
            badgeState={operations >= 50 ? 'success' : 'warning'}
          />
        </XStack>
      </ScrollAdapt>
    </YStack>
  )
}
