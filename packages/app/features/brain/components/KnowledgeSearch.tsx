'use client'

import { useState } from 'react'
import {
  Search,
  FileText,
  Link2,
  StickyNote,
  MessageSquare,
  Code,
  Image,
  Music,
  Video,
  X,
} from '@tamagui/lucide-icons'
import {
  Button,
  Card,
  H4,
  Input,
  Paragraph,
  SizableText,
  Spinner,
  XStack,
  YStack,
} from '@my/ui'
import { useKnowledgeSearch } from '../hooks'
import type { CSuiteDomain, KnowledgeSourceType, SearchResult } from '../types'
import { DOMAIN_CONFIG, SOURCE_TYPE_LABELS } from '../types'

const SOURCE_TYPE_ICONS: Record<KnowledgeSourceType, typeof FileText> = {
  file: FileText,
  url: Link2,
  note: StickyNote,
  conversation: MessageSquare,
  code: Code,
  image: Image,
  audio: Music,
  video: Video,
}

interface KnowledgeSearchProps {
  domain?: CSuiteDomain
  onResultSelect?: (result: SearchResult) => void
  placeholder?: string
}

export function KnowledgeSearch({
  domain,
  onResultSelect,
  placeholder = 'Search your knowledge...',
}: KnowledgeSearchProps) {
  const {
    query,
    setQuery,
    domains,
    setDomains,
    results,
    total,
    took_ms,
    isLoading,
    isFetching,
    clearSearch,
  } = useKnowledgeSearch({
    defaultDomains: domain ? [domain] : undefined,
  })

  const [selectedDomains, setSelectedDomains] = useState<CSuiteDomain[]>(domain ? [domain] : [])

  const handleDomainToggle = (d: CSuiteDomain) => {
    const newDomains = selectedDomains.includes(d)
      ? selectedDomains.filter((sd) => sd !== d)
      : [...selectedDomains, d]
    setSelectedDomains(newDomains)
    setDomains(newDomains)
  }

  return (
    <YStack gap="$4" width="100%">
      {/* Search Input */}
      <XStack gap="$3" alignItems="center">
        <XStack
          flex={1}
          backgroundColor="$color2"
          borderRadius="$4"
          paddingHorizontal="$3"
          alignItems="center"
          borderWidth={1}
          borderColor="$color4"
          focusStyle={{ borderColor: '$color8' }}
        >
          <Search size={18} color="$color10" />
          <Input
            flex={1}
            value={query}
            onChangeText={setQuery}
            placeholder={placeholder}
            backgroundColor="transparent"
            borderWidth={0}
            paddingHorizontal="$2"
          />
          {query && (
            <Button
              size="$2"
              circular
              chromeless
              onPress={clearSearch}
              icon={<X size={14} />}
            />
          )}
        </XStack>
      </XStack>

      {/* Domain Filters (only show if no default domain) */}
      {!domain && (
        <XStack gap="$2" flexWrap="wrap">
          {(Object.keys(DOMAIN_CONFIG) as CSuiteDomain[]).map((d) => {
            const config = DOMAIN_CONFIG[d]
            const isSelected = selectedDomains.includes(d)
            const bgColor = isSelected ? (`$${config.color}4` as any) : '$color2'
            const borderCol = isSelected ? (`$${config.color}8` as any) : '$color4'
            const textCol = isSelected ? (`$${config.color}10` as any) : '$color10'
            return (
              <Button
                key={d}
                size="$2"
                onPress={() => handleDomainToggle(d)}
                backgroundColor={bgColor}
                borderColor={borderCol}
                borderWidth={1}
              >
                <SizableText size="$2" color={textCol}>
                  {config.sublabel}
                </SizableText>
              </Button>
            )
          })}
        </XStack>
      )}

      {/* Results */}
      <YStack gap="$3">
        {/* Loading State */}
        {(isLoading || isFetching) && query.length > 2 && (
          <XStack padding="$4" justifyContent="center" alignItems="center" gap="$2">
            <Spinner size="small" />
            <SizableText size="$3" color="$color10">
              Searching...
            </SizableText>
          </XStack>
        )}

        {/* Results Header */}
        {results.length > 0 && !isLoading && (
          <XStack justifyContent="space-between" alignItems="center">
            <SizableText size="$2" color="$color10">
              {total} results in {took_ms}ms
            </SizableText>
          </XStack>
        )}

        {/* Result Cards */}
        {results.map((result) => {
          const Icon = SOURCE_TYPE_ICONS[result.source_type] || FileText
          return (
            <Card
              key={result.id}
              padding="$3"
              borderRadius="$3"
              pressStyle={{ backgroundColor: '$color3' }}
              hoverStyle={{ backgroundColor: '$color2' }}
              cursor="pointer"
              onPress={() => onResultSelect?.(result)}
            >
              <YStack gap="$2">
                <XStack gap="$2" alignItems="center">
                  <Icon size={16} color="$color10" />
                  <SizableText size="$3" color="$color11" fontWeight="500" flex={1} numberOfLines={1}>
                    {result.source_title}
                  </SizableText>
                  <XStack gap="$1">
                    {result.domains.map((d) => {
                      const domainColor = DOMAIN_CONFIG[d]?.color || 'color'
                      return (
                        <SizableText
                          key={d}
                          size="$1"
                          color={`$${domainColor}10` as any}
                          backgroundColor={`$${domainColor}3` as any}
                          paddingHorizontal="$2"
                          paddingVertical="$1"
                          borderRadius="$2"
                        >
                          {d.toUpperCase()}
                        </SizableText>
                      )
                    })}
                  </XStack>
                </XStack>
                <Paragraph size="$3" color="$color11" numberOfLines={3}>
                  {result.content}
                </Paragraph>
                <XStack gap="$2" alignItems="center">
                  <SizableText size="$1" color="$color9">
                    {SOURCE_TYPE_LABELS[result.source_type]}
                  </SizableText>
                  <SizableText size="$1" color="$color9">
                    •
                  </SizableText>
                  <SizableText size="$1" color="$color9">
                    Score: {(result.score * 100).toFixed(0)}%
                  </SizableText>
                </XStack>
              </YStack>
            </Card>
          )
        })}

        {/* Empty State */}
        {query.length > 2 && results.length === 0 && !isLoading && !isFetching && (
          <YStack padding="$6" alignItems="center" gap="$3">
            <Search size={40} color="$color8" />
            <YStack alignItems="center" gap="$2">
              <SizableText size="$4" color="$color11">
                No results found
              </SizableText>
              <Paragraph size="$3" color="$color10" textAlign="center">
                Try different keywords or add more sources to your knowledge base.
              </Paragraph>
            </YStack>
          </YStack>
        )}

        {/* Initial State */}
        {query.length <= 2 && results.length === 0 && (
          <YStack padding="$6" alignItems="center" gap="$3">
            <Search size={40} color="$color6" />
            <Paragraph size="$3" color="$color10" textAlign="center">
              Type at least 3 characters to search your knowledge base.
            </Paragraph>
          </YStack>
        )}
      </YStack>
    </YStack>
  )
}
