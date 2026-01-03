/**
 * AI Chat Hook - Client-side integration for AI SDK 6.0
 *
 * This hook provides a React interface for the AI chat functionality.
 * Features:
 * - Streaming responses
 * - Message history management
 * - Loading and error states
 * - Tool execution tracking
 */

import { useChat } from 'ai/react'
import { useCallback, useMemo } from 'react'

export type AIModel = 'claude' | 'gpt'

interface UseAIChatOptions {
  /** Initial system message */
  systemMessage?: string
  /** Model to use */
  model?: AIModel
  /** Callback when a message is received */
  onFinish?: (message: string) => void
  /** Callback when an error occurs */
  onError?: (error: Error) => void
}

export function useAIChat(options: UseAIChatOptions = {}) {
  const { model = 'claude', onFinish, onError } = options

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
    isLoading,
    error,
    reload,
    stop,
    setMessages,
    append,
  } = useChat({
    api: '/api/ai/chat',
    body: { model },
    onFinish: (message) => {
      onFinish?.(message.content)
    },
    onError: (error) => {
      console.error('AI Chat error:', error)
      onError?.(error)
    },
  })

  // Enhanced submit that handles keyboard events
  const handleSubmit = useCallback(
    (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault()
      if (input.trim()) {
        originalHandleSubmit(e)
      }
    },
    [input, originalHandleSubmit]
  )

  // Send a message programmatically
  const sendMessage = useCallback(
    async (content: string) => {
      await append({ role: 'user', content })
    },
    [append]
  )

  // Clear the conversation
  const clearMessages = useCallback(() => {
    setMessages([])
  }, [setMessages])

  // Computed values
  const hasMessages = messages.length > 0
  const lastMessage = messages[messages.length - 1]
  const isAssistantTyping = isLoading && lastMessage?.role === 'assistant'

  // Filter to only show user and assistant messages (not system)
  const visibleMessages = useMemo(
    () => messages.filter((m) => m.role !== 'system'),
    [messages]
  )

  return {
    // Message state
    messages: visibleMessages,
    hasMessages,
    lastMessage,

    // Input state
    input,
    handleInputChange,
    handleSubmit,

    // Actions
    sendMessage,
    clearMessages,
    reload,
    stop,

    // Loading/error state
    isLoading,
    isAssistantTyping,
    error,
  }
}

export type UseAIChatReturn = ReturnType<typeof useAIChat>
