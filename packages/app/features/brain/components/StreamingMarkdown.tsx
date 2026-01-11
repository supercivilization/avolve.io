'use client'

// StreamingMarkdown Component
// Renders streaming markdown content with Tamagui styling
// Uses Streamdown on web (if Tailwind available), custom renderer on native

import { Platform } from 'react-native'
import {
  Paragraph,
  H1,
  H2,
  H3,
  H4,
  SizableText,
  XStack,
  YStack,
  Card,
  Separator,
} from '@my/ui'
import { useMemo, type ReactNode } from 'react'

interface StreamingMarkdownProps {
  children: string
  isStreaming?: boolean
}

// Simple markdown parser for streaming content
function parseMarkdown(text: string): ReactNode[] {
  const lines = text.split('\n')
  const elements: ReactNode[] = []
  let codeBlock: string[] | null = null
  let codeLanguage = ''
  let listItems: string[] = []
  let listType: 'ul' | 'ol' | null = null

  const flushList = () => {
    if (listItems.length > 0 && listType) {
      elements.push(
        <YStack key={`list-${elements.length}`} paddingLeft="$4" gap="$1" marginVertical="$2">
          {listItems.map((item, i) => (
            <XStack key={i} gap="$2">
              <SizableText size="$3" color="$color10">
                {listType === 'ul' ? '•' : `${i + 1}.`}
              </SizableText>
              <Paragraph size="$3" flex={1}>
                {parseInline(item)}
              </Paragraph>
            </XStack>
          ))}
        </YStack>
      )
      listItems = []
      listType = null
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Code block handling
    if (line.startsWith('```')) {
      if (codeBlock === null) {
        flushList()
        codeBlock = []
        codeLanguage = line.slice(3).trim()
      } else {
        elements.push(
          <Card
            key={`code-${elements.length}`}
            backgroundColor="$color2"
            padding="$3"
            borderRadius="$3"
            marginVertical="$2"
          >
            <YStack>
              {codeLanguage && (
                <SizableText size="$1" color="$color9" marginBottom="$2">
                  {codeLanguage}
                </SizableText>
              )}
              <SizableText
                size="$3"
                fontFamily="$mono"
                color="$color12"
                whiteSpace="pre-wrap"
              >
                {codeBlock.join('\n')}
              </SizableText>
            </YStack>
          </Card>
        )
        codeBlock = null
        codeLanguage = ''
      }
      continue
    }

    if (codeBlock !== null) {
      codeBlock.push(line)
      continue
    }

    // Headers
    if (line.startsWith('# ')) {
      flushList()
      elements.push(<H1 key={`h1-${i}`} size="$8" marginVertical="$2">{parseInline(line.slice(2))}</H1>)
      continue
    }
    if (line.startsWith('## ')) {
      flushList()
      elements.push(<H2 key={`h2-${i}`} size="$7" marginVertical="$2">{parseInline(line.slice(3))}</H2>)
      continue
    }
    if (line.startsWith('### ')) {
      flushList()
      elements.push(<H3 key={`h3-${i}`} size="$6" marginVertical="$2">{parseInline(line.slice(4))}</H3>)
      continue
    }
    if (line.startsWith('#### ')) {
      flushList()
      elements.push(<H4 key={`h4-${i}`} size="$5" marginVertical="$2">{parseInline(line.slice(5))}</H4>)
      continue
    }

    // Horizontal rule
    if (line.match(/^[-*_]{3,}$/)) {
      flushList()
      elements.push(<Separator key={`hr-${i}`} marginVertical="$3" />)
      continue
    }

    // Unordered list
    if (line.match(/^[-*+]\s/)) {
      if (listType !== 'ul') {
        flushList()
        listType = 'ul'
      }
      listItems.push(line.replace(/^[-*+]\s/, ''))
      continue
    }

    // Ordered list
    if (line.match(/^\d+\.\s/)) {
      if (listType !== 'ol') {
        flushList()
        listType = 'ol'
      }
      listItems.push(line.replace(/^\d+\.\s/, ''))
      continue
    }

    // Blockquote
    if (line.startsWith('> ')) {
      flushList()
      elements.push(
        <Card
          key={`quote-${i}`}
          backgroundColor="$color3"
          borderLeftWidth={3}
          borderLeftColor="$color8"
          padding="$3"
          marginVertical="$2"
        >
          <Paragraph size="$3" color="$color11" fontStyle="italic">
            {parseInline(line.slice(2))}
          </Paragraph>
        </Card>
      )
      continue
    }

    // Empty line
    if (line.trim() === '') {
      flushList()
      continue
    }

    // Regular paragraph
    flushList()
    elements.push(
      <Paragraph key={`p-${i}`} size="$4" marginVertical="$1">
        {parseInline(line)}
      </Paragraph>
    )
  }

  // Handle unclosed code block (streaming)
  if (codeBlock !== null) {
    elements.push(
      <Card
        key={`code-${elements.length}`}
        backgroundColor="$color2"
        padding="$3"
        borderRadius="$3"
        marginVertical="$2"
      >
        <YStack>
          {codeLanguage && (
            <SizableText size="$1" color="$color9" marginBottom="$2">
              {codeLanguage}
            </SizableText>
          )}
          <SizableText
            size="$3"
            fontFamily="$mono"
            color="$color12"
            whiteSpace="pre-wrap"
          >
            {codeBlock.join('\n')}
            <SizableText color="$color8">|</SizableText>
          </SizableText>
        </YStack>
      </Card>
    )
  }

  flushList()
  return elements
}

// Parse inline formatting (bold, italic, code, links)
function parseInline(text: string): ReactNode {
  const parts: ReactNode[] = []
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    // Bold **text**
    const boldMatch = remaining.match(/^\*\*(.+?)\*\*/)
    if (boldMatch) {
      parts.push(
        <SizableText key={key++} fontWeight="700">
          {boldMatch[1]}
        </SizableText>
      )
      remaining = remaining.slice(boldMatch[0].length)
      continue
    }

    // Italic *text* or _text_
    const italicMatch = remaining.match(/^[*_](.+?)[*_]/)
    if (italicMatch) {
      parts.push(
        <SizableText key={key++} fontStyle="italic">
          {italicMatch[1]}
        </SizableText>
      )
      remaining = remaining.slice(italicMatch[0].length)
      continue
    }

    // Inline code `code`
    const codeMatch = remaining.match(/^`([^`]+)`/)
    if (codeMatch) {
      parts.push(
        <SizableText
          key={key++}
          fontFamily="$mono"
          backgroundColor="$color3"
          paddingHorizontal="$1"
          borderRadius="$1"
          size="$3"
        >
          {codeMatch[1]}
        </SizableText>
      )
      remaining = remaining.slice(codeMatch[0].length)
      continue
    }

    // Links [text](url)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/)
    if (linkMatch) {
      parts.push(
        <SizableText
          key={key++}
          color="$blue10"
          textDecorationLine="underline"
        >
          {linkMatch[1]}
        </SizableText>
      )
      remaining = remaining.slice(linkMatch[0].length)
      continue
    }

    // Unterminated bold (streaming)
    if (remaining.startsWith('**')) {
      const endPos = remaining.indexOf('**', 2)
      if (endPos === -1) {
        // Unterminated - show as bold with cursor
        parts.push(
          <SizableText key={key++} fontWeight="700">
            {remaining.slice(2)}
          </SizableText>
        )
        break
      }
    }

    // Unterminated code (streaming)
    if (remaining.startsWith('`')) {
      const endPos = remaining.indexOf('`', 1)
      if (endPos === -1) {
        // Unterminated - show as code with cursor
        parts.push(
          <SizableText
            key={key++}
            fontFamily="$mono"
            backgroundColor="$color3"
            paddingHorizontal="$1"
          >
            {remaining.slice(1)}
          </SizableText>
        )
        break
      }
    }

    // Regular text character
    parts.push(remaining[0])
    remaining = remaining.slice(1)
  }

  return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : <>{parts}</>
}

/**
 * StreamingMarkdown Component
 *
 * Renders markdown content with proper formatting, optimized for streaming.
 * Works on both web and native with Tamagui styling.
 *
 * Features:
 * - Headers (h1-h4)
 * - Bold, italic, inline code
 * - Code blocks with language labels
 * - Lists (ordered and unordered)
 * - Blockquotes
 * - Links
 * - Horizontal rules
 * - Handles unterminated blocks during streaming
 */
export function StreamingMarkdown({ children, isStreaming = false }: StreamingMarkdownProps) {
  const elements = useMemo(() => parseMarkdown(children), [children])

  return (
    <YStack>
      {elements}
      {isStreaming && (
        <SizableText color="$color8" animation="quick">
          |
        </SizableText>
      )}
    </YStack>
  )
}

export default StreamingMarkdown
