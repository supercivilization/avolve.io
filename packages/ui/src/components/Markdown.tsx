// Markdown Component
// Renders markdown content with Tamagui styling, optimized for streaming
// Compatible with Tamagui/Takeout/Bento UI design system

import { styled, YStack, XStack, Paragraph, H1, H2, H3, H4, SizableText, Separator, GetProps } from 'tamagui'
import { useMemo, type ReactNode } from 'react'

// =============================================================================
// STYLED COMPONENTS
// =============================================================================

/**
 * CodeBlock - Styled container for code snippets
 * Uses theme tokens for consistent dark/light mode support
 */
export const CodeBlock = styled(YStack, {
  name: 'CodeBlock',
  backgroundColor: '$color2',
  padding: '$3',
  borderRadius: '$3',
  marginVertical: '$2',
  borderWidth: 1,
  borderColor: '$color4',

  variants: {
    inline: {
      true: {
        padding: '$1',
        paddingHorizontal: '$1.5',
        marginVertical: 0,
        borderRadius: '$2',
      },
    },
  } as const,
})

/**
 * CodeText - Monospace text for code
 */
export const CodeText = styled(SizableText, {
  name: 'CodeText',
  fontFamily: '$mono',
  color: '$color12',
  size: '$3',

  variants: {
    inline: {
      true: {
        backgroundColor: '$color3',
        paddingHorizontal: '$1',
        borderRadius: '$1',
      },
    },
  } as const,
})

/**
 * Blockquote - Styled quote container
 */
export const Blockquote = styled(YStack, {
  name: 'Blockquote',
  backgroundColor: '$color3',
  borderLeftWidth: 3,
  borderLeftColor: '$color8',
  padding: '$3',
  marginVertical: '$2',
  borderRadius: '$2',
})

/**
 * MarkdownListContainer - Container for list items
 * Named with Markdown prefix to avoid collision with Tamagui's ListItem
 */
export const MarkdownListContainer = styled(YStack, {
  name: 'MarkdownListContainer',
  paddingLeft: '$4',
  gap: '$1',
  marginVertical: '$2',
})

/**
 * MarkdownListItem - Individual list item
 * Named with Markdown prefix to avoid collision with Tamagui's ListItem
 */
export const MarkdownListItem = styled(XStack, {
  name: 'MarkdownListItem',
  gap: '$2',
  alignItems: 'flex-start',
})

/**
 * MarkdownListBullet - Bullet or number for list items
 */
export const MarkdownListBullet = styled(SizableText, {
  name: 'MarkdownListBullet',
  size: '$3',
  color: '$color10',
  minWidth: 16,
})

/**
 * InlineLink - Styled link text
 */
export const InlineLink = styled(SizableText, {
  name: 'InlineLink',
  color: '$blue10',
  textDecorationLine: 'underline',
  cursor: 'pointer',

  hoverStyle: {
    color: '$blue11',
  },
})

/**
 * StreamingCursor - Animated cursor for streaming content
 */
export const StreamingCursor = styled(SizableText, {
  name: 'StreamingCursor',
  color: '$color8',
  animation: 'quick',
})

// =============================================================================
// MARKDOWN PARSER
// =============================================================================

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
        <CodeText key={key++} inline>
          {codeMatch[1]}
        </CodeText>
      )
      remaining = remaining.slice(codeMatch[0].length)
      continue
    }

    // Links [text](url)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/)
    if (linkMatch) {
      parts.push(
        <InlineLink key={key++}>
          {linkMatch[1]}
        </InlineLink>
      )
      remaining = remaining.slice(linkMatch[0].length)
      continue
    }

    // Unterminated bold (streaming)
    if (remaining.startsWith('**')) {
      const endPos = remaining.indexOf('**', 2)
      if (endPos === -1) {
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
        parts.push(
          <CodeText key={key++} inline>
            {remaining.slice(1)}
          </CodeText>
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

// Parse markdown content into React elements
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
        <MarkdownListContainer key={`list-${elements.length}`}>
          {listItems.map((item, i) => (
            <MarkdownListItem key={i}>
              <MarkdownListBullet>
                {listType === 'ul' ? '•' : `${i + 1}.`}
              </MarkdownListBullet>
              <Paragraph size="$3" flex={1}>
                {parseInline(item)}
              </Paragraph>
            </MarkdownListItem>
          ))}
        </MarkdownListContainer>
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
          <CodeBlock key={`code-${elements.length}`}>
            {codeLanguage && (
              <SizableText size="$1" color="$color9" marginBottom="$2" textTransform="uppercase">
                {codeLanguage}
              </SizableText>
            )}
            <CodeText whiteSpace="pre-wrap">
              {codeBlock.join('\n')}
            </CodeText>
          </CodeBlock>
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
        <Blockquote key={`quote-${i}`}>
          <Paragraph size="$3" color="$color11" fontStyle="italic">
            {parseInline(line.slice(2))}
          </Paragraph>
        </Blockquote>
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
      <CodeBlock key={`code-${elements.length}`}>
        {codeLanguage && (
          <SizableText size="$1" color="$color9" marginBottom="$2" textTransform="uppercase">
            {codeLanguage}
          </SizableText>
        )}
        <CodeText whiteSpace="pre-wrap">
          {codeBlock.join('\n')}
          <StreamingCursor>|</StreamingCursor>
        </CodeText>
      </CodeBlock>
    )
  }

  flushList()
  return elements
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export interface MarkdownProps {
  /** The markdown content to render */
  children: string
  /** Whether content is currently streaming (shows cursor) */
  isStreaming?: boolean
}

/**
 * Markdown Component
 *
 * Renders markdown content with Tamagui styling, optimized for AI streaming.
 * Compatible with Tamagui/Takeout/Bento UI design system.
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
 * - Theme-aware colors (light/dark mode)
 *
 * @example
 * ```tsx
 * import { Markdown } from '@my/ui'
 *
 * function ChatMessage({ content, isStreaming }) {
 *   return <Markdown isStreaming={isStreaming}>{content}</Markdown>
 * }
 * ```
 */
export function Markdown({ children, isStreaming = false }: MarkdownProps) {
  const elements = useMemo(() => parseMarkdown(children), [children])

  return (
    <YStack>
      {elements}
      {isStreaming && elements.length === 0 && (
        <StreamingCursor>|</StreamingCursor>
      )}
    </YStack>
  )
}

// Also export as StreamingMarkdown for backwards compatibility
export const StreamingMarkdown = Markdown

export type MarkdownComponentProps = GetProps<typeof Markdown>
