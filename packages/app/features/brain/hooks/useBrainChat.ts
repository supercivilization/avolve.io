'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useCallback } from 'react'
import { useSupabase } from 'app/utils/supabase/useSupabase'
import { useUser } from 'app/utils/useUser'
import type {
  BrainConversation,
  BrainMessage,
  CSuiteDomain,
  ChatResponse,
} from '../types'

const CONVERSATIONS_QUERY_KEY = 'brain-conversations'
const MESSAGES_QUERY_KEY = 'brain-messages'

interface UseConversationsOptions {
  domain?: CSuiteDomain
  limit?: number
}

export function useConversations(options: UseConversationsOptions = {}) {
  const supabase = useSupabase()
  const { user } = useUser()
  const { domain, limit = 20 } = options

  return useQuery({
    queryKey: [CONVERSATIONS_QUERY_KEY, { domain, userId: user?.id }],
    queryFn: async () => {
      if (!user?.id) return []

      // Note: brain_conversations table types will be available after migration
      let query = (supabase as any)
        .from('brain_conversations')
        .select('*')
        .eq('profile_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(limit)

      if (domain) {
        query = query.eq('domain', domain)
      }

      const { data, error } = await query

      if (error) throw error
      return data as BrainConversation[]
    },
    enabled: !!user?.id,
  })
}

export function useConversation(conversationId: string | null) {
  const supabase = useSupabase()

  return useQuery({
    queryKey: [CONVERSATIONS_QUERY_KEY, conversationId],
    queryFn: async () => {
      if (!conversationId) return null

      const { data, error } = await (supabase as any)
        .from('brain_conversations')
        .select('*')
        .eq('id', conversationId)
        .single()

      if (error) throw error
      return data as BrainConversation
    },
    enabled: !!conversationId,
  })
}

export function useConversationMessages(conversationId: string | null) {
  const supabase = useSupabase()

  return useQuery({
    queryKey: [MESSAGES_QUERY_KEY, conversationId],
    queryFn: async () => {
      if (!conversationId) return []

      const { data, error } = await (supabase as any)
        .from('brain_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })

      if (error) throw error
      return data as BrainMessage[]
    },
    enabled: !!conversationId,
  })
}

export function useCreateConversation() {
  const supabase = useSupabase()
  const queryClient = useQueryClient()
  const { user } = useUser()

  return useMutation({
    mutationFn: async ({
      title,
      domain,
    }: {
      title?: string
      domain?: CSuiteDomain
    }) => {
      if (!user?.id) throw new Error('User not authenticated')

      const { data, error } = await (supabase as any)
        .from('brain_conversations')
        .insert({
          profile_id: user.id,
          title: title || 'New Conversation',
          domain,
        })
        .select()
        .single()

      if (error) throw error
      return data as BrainConversation
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONVERSATIONS_QUERY_KEY] })
    },
  })
}

export function useDeleteConversation() {
  const supabase = useSupabase()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (conversationId: string) => {
      const { error } = await (supabase as any)
        .from('brain_conversations')
        .delete()
        .eq('id', conversationId)

      if (error) throw error
      return conversationId
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONVERSATIONS_QUERY_KEY] })
    },
  })
}

// Main chat hook with streaming support
interface UseBrainChatOptions {
  conversationId?: string
  domain?: CSuiteDomain
  onStreamStart?: () => void
  onStreamEnd?: () => void
}

export function useBrainChat(options: UseBrainChatOptions = {}) {
  const { conversationId: initialConversationId, domain, onStreamStart, onStreamEnd } = options
  const supabase = useSupabase()
  const queryClient = useQueryClient()
  const { user } = useUser()

  const [conversationId, setConversationId] = useState<string | null>(initialConversationId || null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingContent, setStreamingContent] = useState('')

  const messages = useConversationMessages(conversationId)
  const conversation = useConversation(conversationId)

  // Send a message with RAG
  const sendMessage = useMutation({
    mutationFn: async ({
      content,
      contextLimit = 5,
    }: {
      content: string
      contextLimit?: number
    }) => {
      if (!user?.id) throw new Error('User not authenticated')

      // Create conversation if needed
      let activeConversationId = conversationId
      if (!activeConversationId) {
        const { data: newConversation, error: convError } = await (supabase as any)
          .from('brain_conversations')
          .insert({
            profile_id: user.id,
            title: content.slice(0, 50) + (content.length > 50 ? '...' : ''),
            domain,
          })
          .select()
          .single()

        if (convError) throw convError
        activeConversationId = newConversation.id
        setConversationId(activeConversationId)
      }

      // Save user message
      const { data: userMessage, error: userMsgError } = await (supabase as any)
        .from('brain_messages')
        .insert({
          conversation_id: activeConversationId,
          role: 'user',
          content,
        })
        .select()
        .single()

      if (userMsgError) throw userMsgError

      // Call the chat API (which handles RAG and Claude)
      setIsStreaming(true)
      setStreamingContent('')
      onStreamStart?.()

      try {
        const response = await fetch('/api/brain/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: content,
            conversation_id: activeConversationId,
            domain,
            context_limit: contextLimit,
          }),
        })

        if (!response.ok) {
          throw new Error('Chat API error')
        }

        // Handle streaming response
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        let fullContent = ''

        while (reader) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          fullContent += chunk
          setStreamingContent(fullContent)
        }

        // Save assistant message
        const { data: assistantMessage, error: assistantMsgError } = await (supabase as any)
          .from('brain_messages')
          .insert({
            conversation_id: activeConversationId,
            role: 'assistant',
            content: fullContent,
          })
          .select()
          .single()

        if (assistantMsgError) throw assistantMsgError

        // Update conversation title if this is the first exchange
        if (!conversationId) {
          await (supabase as any)
            .from('brain_conversations')
            .update({ title: content.slice(0, 50) + (content.length > 50 ? '...' : '') })
            .eq('id', activeConversationId)
        }

        return {
          userMessage,
          assistantMessage,
          conversationId: activeConversationId,
        }
      } finally {
        setIsStreaming(false)
        setStreamingContent('')
        onStreamEnd?.()
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MESSAGES_QUERY_KEY, conversationId] })
      queryClient.invalidateQueries({ queryKey: [CONVERSATIONS_QUERY_KEY] })
    },
  })

  // Start a new conversation
  const startNewConversation = useCallback(() => {
    setConversationId(null)
    setStreamingContent('')
  }, [])

  // Switch to an existing conversation
  const switchConversation = useCallback((id: string) => {
    setConversationId(id)
    setStreamingContent('')
  }, [])

  return {
    // State
    conversationId,
    conversation: conversation.data,
    messages: messages.data || [],
    isStreaming,
    streamingContent,
    isLoading: messages.isLoading || sendMessage.isPending,
    error: messages.error || sendMessage.error,

    // Actions
    sendMessage: sendMessage.mutate,
    sendMessageAsync: sendMessage.mutateAsync,
    startNewConversation,
    switchConversation,
  }
}

// Quick question without conversation (one-shot)
export function useAskBrain() {
  const { user } = useUser()

  return useMutation({
    mutationFn: async ({
      question,
      domain,
      contextLimit = 5,
    }: {
      question: string
      domain?: CSuiteDomain
      contextLimit?: number
    }) => {
      if (!user?.id) throw new Error('User not authenticated')

      const response = await fetch('/api/brain/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          domain,
          context_limit: contextLimit,
        }),
      })

      if (!response.ok) {
        throw new Error('Ask API error')
      }

      const data = await response.json()
      return data as {
        answer: string
        sources: Array<{
          chunk_id: string
          source_title: string
          relevance: number
        }>
      }
    },
  })
}
