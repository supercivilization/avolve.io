import { styled, YStack, XStack } from 'tamagui'

export const Skeleton = styled(YStack, {
  name: 'Skeleton',
  backgroundColor: '$color5',
  borderRadius: '$3',
  overflow: 'hidden',
  position: 'relative',

  // Simple opacity animation for skeleton effect
  opacity: 0.7,
  animation: 'slow',
  hoverStyle: {
    opacity: 0.5,
  },

  variants: {
    variant: {
      text: {
        height: 16,
        borderRadius: '$2',
      },
      title: {
        height: 24,
        borderRadius: '$2',
      },
      avatar: {
        borderRadius: 1000,
      },
      card: {
        borderRadius: '$4',
      },
      button: {
        height: 40,
        borderRadius: '$4',
      },
    },
    size: {
      sm: {
        height: 12,
      },
      md: {
        height: 16,
      },
      lg: {
        height: 24,
      },
      xl: {
        height: 32,
      },
    },
  } as const,

  defaultVariants: {
    variant: 'text',
  },
})

// Skeleton for card layouts
export function CardSkeleton() {
  return (
    <YStack
      padding="$4"
      backgroundColor="$color2"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      gap="$3"
    >
      <XStack gap="$3" alignItems="center">
        <Skeleton variant="avatar" width={40} height={40} />
        <YStack flex={1} gap="$2">
          <Skeleton width="60%" height={14} />
          <Skeleton width="40%" height={12} />
        </YStack>
      </XStack>
      <Skeleton width="100%" height={60} variant="card" />
      <XStack gap="$2">
        <Skeleton width={60} height={24} />
        <Skeleton width={80} height={24} />
      </XStack>
    </YStack>
  )
}

// Skeleton for list items
export function ListItemSkeleton() {
  return (
    <XStack
      padding="$3"
      gap="$3"
      alignItems="center"
      borderBottomWidth={1}
      borderBottomColor="$borderColor"
    >
      <Skeleton variant="avatar" width={48} height={48} />
      <YStack flex={1} gap="$2">
        <Skeleton width="70%" height={16} />
        <Skeleton width="50%" height={12} />
      </YStack>
      <Skeleton width={60} height={28} />
    </XStack>
  )
}

// Skeleton for stats/metrics
export function StatSkeleton() {
  return (
    <YStack
      padding="$4"
      backgroundColor="$color2"
      borderRadius="$4"
      gap="$2"
      alignItems="center"
    >
      <Skeleton width={60} height={32} />
      <Skeleton width={80} height={14} />
    </YStack>
  )
}

// Skeleton for dashboard overview
export function DashboardSkeleton() {
  return (
    <YStack gap="$6" padding="$4">
      {/* Header */}
      <YStack gap="$2">
        <Skeleton width={200} height={28} variant="title" />
        <Skeleton width={300} height={16} />
      </YStack>

      {/* Stats row */}
      <XStack gap="$4" flexWrap="wrap">
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
      </XStack>

      {/* Cards */}
      <XStack gap="$4" flexWrap="wrap">
        <YStack flex={1} minWidth={280}>
          <CardSkeleton />
        </YStack>
        <YStack flex={1} minWidth={280}>
          <CardSkeleton />
        </YStack>
      </XStack>

      {/* List */}
      <YStack>
        <ListItemSkeleton />
        <ListItemSkeleton />
        <ListItemSkeleton />
      </YStack>
    </YStack>
  )
}
