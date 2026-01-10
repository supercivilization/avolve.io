'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Platform, TextInput as RNTextInput } from 'react-native'
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import {
  Button,
  Card,
  Input,
  Paragraph,
  SizableText,
  Spinner,
  XStack,
  YStack,
} from '@my/ui'
import { Send, User, Bot, Sparkles, Users } from '@tamagui/lucide-icons'
import { useBrainChat, useRealtimeChat } from '../hooks'
import type { BrainMessage, CSuiteDomain } from '../types'
import { DOMAIN_CONFIG } from '../types'
import { PresenceAvatars, TypingIndicatorText } from './PresenceAvatars'

// Conditionally import FlashList for native only
let FlashList: any = null
if (Platform.OS !== 'web') {
  try {
    FlashList = require('@shopify/flash-list').FlashList
  } catch {
    // FlashList not available, will use fallback
  }
}

// Animated components
const AnimatedYStack = Animated.createAnimatedComponent(YStack)

// Typing indicator animation (for AI thinking)
// Respects prefers-reduced-motion per Vercel Web Interface Guidelines
function AITypingIndicator() {
  const reducedMotion = useReducedMotion()
  const dot1 = useSharedValue(0)
  const dot2 = useSharedValue(0)
  const dot3 = useSharedValue(0)

  useEffect(() => {
    // Skip animations if user prefers reduced motion
    if (reducedMotion) return

    dot1.value = withRepeat(
      withSequence(
        withTiming(-4, { duration: 300 }),
        withTiming(0, { duration: 300 })
      ),
      -1,
      false
    )
    setTimeout(() => {
      dot2.value = withRepeat(
        withSequence(
          withTiming(-4, { duration: 300 }),
          withTiming(0, { duration: 300 })
        ),
        -1,
        false
      )
    }, 100)
    setTimeout(() => {
      dot3.value = withRepeat(
        withSequence(
          withTiming(-4, { duration: 300 }),
          withTiming(0, { duration: 300 })
        ),
        -1,
        false
      )
    }, 200)
  }, [dot1, dot2, dot3, reducedMotion])

  const style1 = useAnimatedStyle(() => ({ transform: [{ translateY: dot1.value }] }))
  const style2 = useAnimatedStyle(() => ({ transform: [{ translateY: dot2.value }] }))
  const style3 = useAnimatedStyle(() => ({ transform: [{ translateY: dot3.value }] }))

  // Show static dots for reduced motion users
  if (reducedMotion) {
    return (
      <XStack gap="$1" alignItems="center" paddingVertical="$2">
        <Animated.View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#888' }} />
        <Animated.View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#888' }} />
        <Animated.View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#888' }} />
      </XStack>
    )
  }

  return (
    <XStack gap="$1" alignItems="center" paddingVertical="$2">
      <Animated.View style={[{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#888' }, style1]} />
      <Animated.View style={[{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#888' }, style2]} />
      <Animated.View style={[{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#888' }, style3]} />
    </XStack>
  )
}

// Message bubble component
// Respects prefers-reduced-motion per Vercel Web Interface Guidelines
interface MessageBubbleProps {
  message: BrainMessage
  isLast?: boolean
  domain?: CSuiteDomain
  reducedMotion?: boolean
}

function MessageBubble({ message, isLast, domain, reducedMotion }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const domainColor = domain ? DOMAIN_CONFIG[domain]?.color : 'blue'

  // Skip entering animation for reduced motion users
  const enteringAnimation = reducedMotion ? undefined : FadeInUp.duration(300).springify()

  return (
    <AnimatedYStack
      entering={enteringAnimation}
      alignSelf={isUser ? 'flex-end' : 'flex-start'}
      maxWidth="85%"
      marginBottom="$3"
    >
      <XStack gap="$2" alignItems="flex-start" flexDirection={isUser ? 'row-reverse' : 'row'}>
        {/* Avatar */}
        <YStack
          width={32}
          height={32}
          borderRadius={16}
          backgroundColor={isUser ? '$color4' : (`$${domainColor}4` as any)}
          alignItems="center"
          justifyContent="center"
        >
          {isUser ? (
            <User size={16} color="$color11" />
          ) : (
            <Bot size={16} color={`$${domainColor}11` as any} />
          )}
        </YStack>

        {/* Message content */}
        <Card
          backgroundColor={isUser ? '$color3' : (`$${domainColor}2` as any)}
          borderRadius="$4"
          padding="$3"
          borderTopLeftRadius={isUser ? '$4' : '$1'}
          borderTopRightRadius={isUser ? '$1' : '$4'}
        >
          <Paragraph size="$4" color="$color12">
            {message.content}
          </Paragraph>
        </Card>
      </XStack>

      {/* Timestamp */}
      <SizableText
        size="$1"
        color="$color9"
        alignSelf={isUser ? 'flex-end' : 'flex-start'}
        marginTop="$1"
        marginHorizontal="$5"
      >
        {new Date(message.created_at).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })}
      </SizableText>
    </AnimatedYStack>
  )
}

// Streaming message bubble (for assistant responses in progress)
// Respects prefers-reduced-motion per Vercel Web Interface Guidelines
interface StreamingBubbleProps {
  content: string
  domain?: CSuiteDomain
  reducedMotion?: boolean
}

function StreamingBubble({ content, domain, reducedMotion }: StreamingBubbleProps) {
  const domainColor = domain ? DOMAIN_CONFIG[domain]?.color : 'blue'

  // Skip entering animation for reduced motion users
  const enteringAnimation = reducedMotion ? undefined : FadeInDown.duration(200)

  return (
    <AnimatedYStack
      entering={enteringAnimation}
      alignSelf="flex-start"
      maxWidth="85%"
      marginBottom="$3"
    >
      <XStack gap="$2" alignItems="flex-start">
        <YStack
          width={32}
          height={32}
          borderRadius={16}
          backgroundColor={`$${domainColor}4` as any}
          alignItems="center"
          justifyContent="center"
        >
          <Sparkles size={16} color={`$${domainColor}11` as any} />
        </YStack>

        <Card
          backgroundColor={`$${domainColor}2` as any}
          borderRadius="$4"
          padding="$3"
          borderTopLeftRadius="$1"
        >
          <Paragraph size="$4" color="$color12">
            {content}
            <SizableText color="$color8">|</SizableText>
          </Paragraph>
        </Card>
      </XStack>
    </AnimatedYStack>
  )
}

// Main chat UI props
interface BrainChatUIProps {
  domain?: CSuiteDomain
  placeholder?: string
  welcomeMessage?: string
  enableRealtime?: boolean // Enable typing indicators and presence
}

export function BrainChatUI({
  domain,
  placeholder = 'Ask your brain anything...',
  welcomeMessage = "I'm your AI business advisor. Ask me anything about your knowledge base.",
  enableRealtime = true,
}: BrainChatUIProps) {
  // Accessibility: Respect user's motion preferences
  const reducedMotion = useReducedMotion()

  const {
    messages,
    isStreaming,
    streamingContent,
    isLoading,
    sendMessage,
    startNewConversation,
    conversationId,
  } = useBrainChat({ domain })

  // Realtime features (typing indicators, presence)
  const {
    typingUsers,
    presenceUsers,
    isConnected,
    broadcastTyping,
    stopTyping,
  } = useRealtimeChat({
    conversationId,
    domain,
  })

  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<RNTextInput>(null)
  const listRef = useRef<any>(null)

  const handleSend = useCallback(() => {
    if (!inputValue.trim() || isLoading) return

    // Stop typing indicator when sending
    if (enableRealtime) {
      stopTyping()
    }

    sendMessage({ content: inputValue.trim() })
    setInputValue('')
  }, [inputValue, isLoading, sendMessage, enableRealtime, stopTyping])

  // Handle input change with typing broadcast
  const handleInputChange = useCallback((text: string) => {
    setInputValue(text)

    // Broadcast typing to other users
    if (enableRealtime && text.length > 0) {
      broadcastTyping()
    } else if (enableRealtime && text.length === 0) {
      stopTyping()
    }
  }, [enableRealtime, broadcastTyping, stopTyping])

  // Scroll to bottom on new messages
  useEffect(() => {
    if (listRef.current && messages.length > 0) {
      setTimeout(() => {
        listRef.current?.scrollToEnd?.({ animated: true })
      }, 100)
    }
  }, [messages.length, streamingContent])

  const renderMessage = useCallback(
    ({ item, index }: { item: BrainMessage; index: number }) => (
      <MessageBubble
        message={item}
        isLast={index === messages.length - 1}
        domain={domain}
        reducedMotion={reducedMotion ?? false}
      />
    ),
    [domain, messages.length, reducedMotion]
  )

  const domainColor = domain ? DOMAIN_CONFIG[domain]?.color : 'blue'

  // Footer component with typing indicators
  const ListFooter = (
    <>
      {/* Other users typing */}
      {enableRealtime && typingUsers.length > 0 && (
        <XStack padding="$2" paddingLeft="$4">
          <TypingIndicatorText typingUsers={typingUsers} />
        </XStack>
      )}
      {/* AI streaming response */}
      {isStreaming && streamingContent && (
        <StreamingBubble content={streamingContent} domain={domain} reducedMotion={reducedMotion ?? false} />
      )}
      {/* AI thinking */}
      {isStreaming && !streamingContent && (
        <XStack padding="$4" gap="$2" alignItems="center">
          <Bot size={16} color={`$${domainColor}10` as any} />
          <AITypingIndicator />
        </XStack>
      )}
    </>
  )

  // Use FlashList on native, ScrollView fallback on web
  const MessageList = Platform.OS !== 'web' && FlashList ? (
    <FlashList
      ref={listRef}
      data={messages}
      renderItem={renderMessage}
      estimatedItemSize={100}
      keyExtractor={(item: BrainMessage) => item.id}
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        messages.length === 0 ? (
          <YStack padding="$6" alignItems="center" gap="$4">
            <YStack
              width={64}
              height={64}
              borderRadius={32}
              backgroundColor={`$${domainColor}3` as any}
              alignItems="center"
              justifyContent="center"
            >
              <Bot size={32} color={`$${domainColor}10` as any} />
            </YStack>
            <Paragraph size="$4" color="$color11" textAlign="center" maxWidth={300}>
              {welcomeMessage}
            </Paragraph>
          </YStack>
        ) : null
      }
      ListFooterComponent={ListFooter}
    />
  ) : (
    // Web fallback - uses ScrollView with map
    <YStack flex={1} padding="$4" overflow="scroll">
      {messages.length === 0 && (
        <YStack padding="$6" alignItems="center" gap="$4">
          <YStack
            width={64}
            height={64}
            borderRadius={32}
            backgroundColor={`$${domainColor}3` as any}
            alignItems="center"
            justifyContent="center"
          >
            <Bot size={32} color={`$${domainColor}10` as any} />
          </YStack>
          <Paragraph size="$4" color="$color11" textAlign="center" maxWidth={300}>
            {welcomeMessage}
          </Paragraph>
        </YStack>
      )}
      {messages.map((message, index) => (
        <MessageBubble
          key={message.id}
          message={message}
          isLast={index === messages.length - 1}
          domain={domain}
        />
      ))}
      {ListFooter}
    </YStack>
  )

  return (
    <YStack flex={1} backgroundColor="$background">
      {/* Header */}
      <XStack
        padding="$4"
        borderBottomWidth={1}
        borderBottomColor="$color4"
        alignItems="center"
        justifyContent="space-between"
      >
        <XStack gap="$2" alignItems="center">
          <Sparkles size={20} color={`$${domainColor}10` as any} />
          <SizableText size="$5" fontWeight="600">
            {domain ? `${domain.toUpperCase()} Brain` : 'Brain Chat'}
          </SizableText>
        </XStack>

        <XStack gap="$3" alignItems="center">
          {/* Presence avatars */}
          {enableRealtime && presenceUsers.length > 0 && (
            <XStack gap="$2" alignItems="center">
              <PresenceAvatars
                presenceUsers={presenceUsers}
                typingUsers={typingUsers}
                size="small"
                maxVisible={3}
              />
              <XStack gap="$1" alignItems="center" opacity={0.7}>
                <Users size={12} color="$color9" />
                <SizableText size="$1" color="$color9">
                  {presenceUsers.length + 1}
                </SizableText>
              </XStack>
            </XStack>
          )}

          {/* Connection indicator */}
          {enableRealtime && (
            <YStack
              width={8}
              height={8}
              borderRadius={4}
              backgroundColor={isConnected ? '$green9' : '$color6'}
            />
          )}

          {/* Touch target minimum 44px per Vercel Web Interface Guidelines */}
          <Button
            size="$4"
            chromeless
            onPress={startNewConversation}
            disabled={messages.length === 0}
          >
            New Chat
          </Button>
        </XStack>
      </XStack>

      {/* Messages */}
      <YStack flex={1}>
        {MessageList}
      </YStack>

      {/* Input */}
      <XStack
        padding="$4"
        gap="$3"
        borderTopWidth={1}
        borderTopColor="$color4"
        backgroundColor="$background"
      >
        <XStack
          flex={1}
          backgroundColor="$color2"
          borderRadius="$4"
          paddingHorizontal="$3"
          paddingVertical="$2"
          borderWidth={1}
          borderColor="$color4"
          focusStyle={{ borderColor: `$${domainColor}8` as any }}
        >
          <Input
            ref={inputRef}
            flex={1}
            value={inputValue}
            onChangeText={handleInputChange}
            placeholder={placeholder}
            backgroundColor="transparent"
            borderWidth={0}
            onSubmitEditing={handleSend}
            onBlur={enableRealtime ? stopTyping : undefined}
            returnKeyType="send"
            multiline
            maxHeight={100}
          />
        </XStack>
        <Button
          size="$4"
          circular
          theme={domainColor as any}
          onPress={handleSend}
          disabled={!inputValue.trim() || isLoading}
          icon={isLoading ? <Spinner size="small" /> : <Send size={18} />}
        />
      </XStack>
    </YStack>
  )
}

export default BrainChatUI
