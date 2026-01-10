'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useSupabase } from 'app/utils/supabase/useSupabase'
import { useUser } from 'app/utils/useUser'
import type { RealtimeChannel } from '@supabase/supabase-js'
import type { CSuiteDomain } from '../types'

// Types for realtime events
export interface TypingUser {
  userId: string
  userName: string
  userAvatar?: string
  timestamp: number
}

export interface PresenceUser {
  id: string
  name: string
  avatar?: string
  online_at: string
}

interface UseRealtimeChatOptions {
  conversationId: string | null
  domain?: CSuiteDomain
  typingTimeoutMs?: number // How long before typing indicator disappears
}

interface RealtimeChatState {
  typingUsers: TypingUser[]
  presenceUsers: PresenceUser[]
  isConnected: boolean
}

/**
 * Hook for Supabase Realtime features in Brain Chat
 * - Typing indicators via Broadcast
 * - Presence tracking via Presence
 */
export function useRealtimeChat(options: UseRealtimeChatOptions) {
  const { conversationId, domain, typingTimeoutMs = 3000 } = options
  const supabase = useSupabase()
  const { user, profile } = useUser()

  const [state, setState] = useState<RealtimeChatState>({
    typingUsers: [],
    presenceUsers: [],
    isConnected: false,
  })

  const channelRef = useRef<RealtimeChannel | null>(null)
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastTypingBroadcastRef = useRef<number>(0)

  // Channel name based on conversation or domain
  const channelName = conversationId
    ? `brain-chat:${conversationId}`
    : domain
    ? `brain-domain:${domain}`
    : 'brain-global'

  // Clean up typing users that have timed out
  const cleanupTypingUsers = useCallback(() => {
    const now = Date.now()
    setState((prev) => ({
      ...prev,
      typingUsers: prev.typingUsers.filter(
        (u) => now - u.timestamp < typingTimeoutMs
      ),
    }))
  }, [typingTimeoutMs])

  // Broadcast that current user is typing
  const broadcastTyping = useCallback(() => {
    if (!channelRef.current || !user?.id) return

    // Throttle typing broadcasts to once per second
    const now = Date.now()
    if (now - lastTypingBroadcastRef.current < 1000) return
    lastTypingBroadcastRef.current = now

    channelRef.current.send({
      type: 'broadcast',
      event: 'typing',
      payload: {
        userId: user.id,
        userName: profile?.name || 'User',
        userAvatar: profile?.avatar_url,
        timestamp: now,
      },
    })
  }, [user?.id, profile?.name, profile?.avatar_url])

  // Stop typing broadcast
  const stopTyping = useCallback(() => {
    if (!channelRef.current || !user?.id) return

    channelRef.current.send({
      type: 'broadcast',
      event: 'stop_typing',
      payload: {
        userId: user.id,
      },
    })
  }, [user?.id])

  // Setup and teardown realtime channel
  useEffect(() => {
    if (!user?.id) return

    // Create channel with presence config
    const channel = supabase.channel(channelName, {
      config: {
        presence: {
          key: user.id,
        },
      },
    })

    // Handle typing broadcasts
    channel.on('broadcast', { event: 'typing' }, ({ payload }) => {
      const typingUser = payload as TypingUser
      // Don't show own typing indicator
      if (typingUser.userId === user.id) return

      setState((prev) => {
        // Update or add typing user
        const existingIndex = prev.typingUsers.findIndex(
          (u) => u.userId === typingUser.userId
        )
        if (existingIndex >= 0) {
          const updated = [...prev.typingUsers]
          updated[existingIndex] = typingUser
          return { ...prev, typingUsers: updated }
        }
        return {
          ...prev,
          typingUsers: [...prev.typingUsers, typingUser],
        }
      })
    })

    // Handle stop typing broadcasts
    channel.on('broadcast', { event: 'stop_typing' }, ({ payload }) => {
      const { userId } = payload as { userId: string }
      setState((prev) => ({
        ...prev,
        typingUsers: prev.typingUsers.filter((u) => u.userId !== userId),
      }))
    })

    // Handle presence sync (initial state and updates)
    channel.on('presence', { event: 'sync' }, () => {
      const presenceState = channel.presenceState()
      const users: PresenceUser[] = []

      Object.entries(presenceState).forEach(([_key, presences]) => {
        // Each user can have multiple presences (multiple tabs)
        // We just need one per user
        const presence = (presences as any[])[0]
        if (presence && presence.id !== user.id) {
          users.push({
            id: presence.id,
            name: presence.name || 'User',
            avatar: presence.avatar,
            online_at: presence.online_at,
          })
        }
      })

      setState((prev) => ({ ...prev, presenceUsers: users }))
    })

    // Handle presence join
    channel.on('presence', { event: 'join' }, ({ newPresences }) => {
      // Presence sync will handle the update
    })

    // Handle presence leave
    channel.on('presence', { event: 'leave' }, ({ leftPresences }) => {
      // Presence sync will handle the update
    })

    // Subscribe to channel
    channel
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          setState((prev) => ({ ...prev, isConnected: true }))

          // Track presence
          await channel.track({
            id: user.id,
            name: profile?.name || 'User',
            avatar: profile?.avatar_url,
            online_at: new Date().toISOString(),
          })
        } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
          setState((prev) => ({ ...prev, isConnected: false }))
        }
      })

    channelRef.current = channel

    // Cleanup interval for typing timeouts
    const cleanupInterval = setInterval(cleanupTypingUsers, 1000)

    return () => {
      clearInterval(cleanupInterval)
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
      channel.unsubscribe()
      channelRef.current = null
    }
  }, [
    user?.id,
    profile?.name,
    profile?.avatar_url,
    channelName,
    supabase,
    cleanupTypingUsers,
  ])

  return {
    // State
    typingUsers: state.typingUsers,
    presenceUsers: state.presenceUsers,
    isConnected: state.isConnected,

    // Actions
    broadcastTyping,
    stopTyping,
  }
}

export default useRealtimeChat
