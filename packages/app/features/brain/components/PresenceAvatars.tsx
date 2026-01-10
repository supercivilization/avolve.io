'use client'

import { memo } from 'react'
import Animated, { FadeIn, FadeOut, Layout, useReducedMotion } from 'react-native-reanimated'
import { Avatar, SizableText, XStack, YStack } from '@my/ui'
import type { PresenceUser, TypingUser } from '../hooks/useRealtimeChat'

const AnimatedXStack = Animated.createAnimatedComponent(XStack)

interface PresenceAvatarsProps {
  presenceUsers: PresenceUser[]
  typingUsers?: TypingUser[]
  maxVisible?: number
  size?: 'small' | 'medium' | 'large'
}

const AVATAR_SIZES = {
  small: 24,
  medium: 32,
  large: 40,
}

const OVERLAP = {
  small: -8,
  medium: -10,
  large: -12,
}

/**
 * Displays presence avatars for users currently viewing the chat
 * Shows a stacked avatar group with overflow indicator
 * Respects prefers-reduced-motion per Vercel Web Interface Guidelines
 */
export const PresenceAvatars = memo(function PresenceAvatars({
  presenceUsers,
  typingUsers = [],
  maxVisible = 3,
  size = 'small',
}: PresenceAvatarsProps) {
  const reducedMotion = useReducedMotion()

  if (presenceUsers.length === 0) return null

  const visibleUsers = presenceUsers.slice(0, maxVisible)
  const overflowCount = presenceUsers.length - maxVisible
  const avatarSize = AVATAR_SIZES[size]
  const overlap = OVERLAP[size]

  // Check if a user is currently typing
  const isTyping = (userId: string) =>
    typingUsers.some((t) => t.userId === userId)

  // Skip animations for reduced motion users
  const enteringAnimation = reducedMotion ? undefined : FadeIn.duration(200)
  const exitingAnimation = reducedMotion ? undefined : FadeOut.duration(200)
  const layoutAnimation = reducedMotion ? undefined : Layout.springify()

  return (
    <AnimatedXStack
      entering={enteringAnimation}
      exiting={exitingAnimation}
      layout={layoutAnimation}
      alignItems="center"
    >
      {visibleUsers.map((user, index) => (
        <YStack
          key={user.id}
          marginLeft={index > 0 ? overlap : 0}
          zIndex={visibleUsers.length - index}
        >
          <Avatar
            circular
            size={avatarSize}
            borderWidth={2}
            borderColor={isTyping(user.id) ? '$green9' : '$background'}
          >
            {user.avatar ? (
              <Avatar.Image source={{ uri: user.avatar }} />
            ) : (
              <Avatar.Fallback
                backgroundColor="$color5"
                alignItems="center"
                justifyContent="center"
              >
                <SizableText
                  size={size === 'small' ? '$1' : size === 'medium' ? '$2' : '$3'}
                  fontWeight="600"
                  color="$color11"
                >
                  {user.name.charAt(0).toUpperCase()}
                </SizableText>
              </Avatar.Fallback>
            )}
          </Avatar>
          {/* Typing indicator dot */}
          {isTyping(user.id) && (
            <YStack
              position="absolute"
              bottom={-2}
              right={-2}
              width={size === 'small' ? 8 : 10}
              height={size === 'small' ? 8 : 10}
              borderRadius={size === 'small' ? 4 : 5}
              backgroundColor="$green9"
              borderWidth={2}
              borderColor="$background"
            />
          )}
        </YStack>
      ))}

      {/* Overflow indicator */}
      {overflowCount > 0 && (
        <YStack
          marginLeft={overlap}
          width={avatarSize}
          height={avatarSize}
          borderRadius={avatarSize / 2}
          backgroundColor="$color4"
          borderWidth={2}
          borderColor="$background"
          alignItems="center"
          justifyContent="center"
        >
          <SizableText
            size={size === 'small' ? '$1' : size === 'medium' ? '$2' : '$3'}
            fontWeight="600"
            color="$color11"
          >
            +{overflowCount}
          </SizableText>
        </YStack>
      )}
    </AnimatedXStack>
  )
})

/**
 * Displays typing indicator text
 * Shows "X is typing..." or "X, Y are typing..."
 */
interface TypingIndicatorTextProps {
  typingUsers: TypingUser[]
  maxNames?: number
}

export const TypingIndicatorText = memo(function TypingIndicatorText({
  typingUsers,
  maxNames = 2,
}: TypingIndicatorTextProps) {
  const reducedMotion = useReducedMotion()

  if (typingUsers.length === 0) return null

  let text: string
  if (typingUsers.length === 1) {
    text = `${typingUsers[0].userName} is typing...`
  } else if (typingUsers.length <= maxNames) {
    const names = typingUsers.map((u) => u.userName)
    const lastUser = names.pop()
    text = `${names.join(', ')} and ${lastUser} are typing...`
  } else {
    const names = typingUsers.slice(0, maxNames).map((u) => u.userName)
    const others = typingUsers.length - maxNames
    text = `${names.join(', ')} and ${others} others are typing...`
  }

  // Skip animations for reduced motion users
  const enteringAnimation = reducedMotion ? undefined : FadeIn.duration(200)
  const exitingAnimation = reducedMotion ? undefined : FadeOut.duration(200)

  return (
    <AnimatedXStack
      entering={enteringAnimation}
      exiting={exitingAnimation}
      paddingHorizontal="$2"
    >
      <SizableText size="$1" color="$color9" fontStyle="italic">
        {text}
      </SizableText>
    </AnimatedXStack>
  )
})

export default PresenceAvatars
