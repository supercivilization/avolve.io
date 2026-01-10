'use client'

import { useState } from 'react'
import {
  Brain,
  Plus,
  FileText,
  ChevronRight,
} from '@tamagui/lucide-icons'
import {
  Button,
  Card,
  H4,
  Paragraph,
  SizableText,
  Tabs,
  XStack,
  YStack,
} from '@my/ui'
import { KnowledgeSearch } from './KnowledgeSearch'
import { AddSourceSheet } from './AddSourceSheet'
import { useKnowledgeSources, useEntities } from '../hooks'
import type { CSuiteDomain } from '../types'
import { DOMAIN_CONFIG, SOURCE_TYPE_LABELS } from '../types'

interface DomainKnowledgePanelProps {
  domain: CSuiteDomain
}

export function DomainKnowledgePanel({ domain }: DomainKnowledgePanelProps) {
  const config = DOMAIN_CONFIG[domain]
  const [activeTab, setActiveTab] = useState('search')
  const [showAddSheet, setShowAddSheet] = useState(false)

  // Get sources for this domain
  const { data: sourcesData, isLoading: sourcesLoading } = useKnowledgeSources({
    domains: [domain],
    limit: 5,
  })

  // Get entities for this domain
  const { data: entitiesData, isLoading: entitiesLoading } = useEntities({
    domains: [domain],
    limit: 5,
  })

  const sources = sourcesData?.sources || []
  const entities = entitiesData?.entities || []

  // Dynamic colors for theme consistency (typed as any for Tamagui compatibility)
  const bgColor = `$${config.color}2` as any
  const iconColor = `$${config.color}10` as any
  const textColor = `$${config.color}11` as any
  const tabActiveColor = `$${config.color}4` as any

  return (
    <Card padding="$4" borderRadius="$4" backgroundColor={bgColor}>
      <YStack gap="$4">
        {/* Header */}
        <XStack justifyContent="space-between" alignItems="center">
          <XStack gap="$2" alignItems="center">
            <Brain size={22} color={iconColor} />
            <H4 color={textColor}>{config.sublabel} Knowledge</H4>
          </XStack>
          <Button
            size="$3"
            theme={config.color as any}
            icon={<Plus size={16} />}
            onPress={() => setShowAddSheet(true)}
          >
            Add
          </Button>
        </XStack>

        {/* Tabs */}
        <Tabs
          defaultValue="search"
          value={activeTab}
          onValueChange={setActiveTab}
          orientation="horizontal"
          flexDirection="column"
        >
          <Tabs.List gap="$2" backgroundColor="transparent">
            <Tabs.Tab flex={1} value="search" backgroundColor={activeTab === 'search' ? tabActiveColor : 'transparent'}>
              <SizableText size="$3" color={activeTab === 'search' ? textColor : '$color10'}>
                Search
              </SizableText>
            </Tabs.Tab>
            <Tabs.Tab flex={1} value="sources" backgroundColor={activeTab === 'sources' ? tabActiveColor : 'transparent'}>
              <SizableText size="$3" color={activeTab === 'sources' ? textColor : '$color10'}>
                Sources ({sources.length})
              </SizableText>
            </Tabs.Tab>
            <Tabs.Tab flex={1} value="entities" backgroundColor={activeTab === 'entities' ? tabActiveColor : 'transparent'}>
              <SizableText size="$3" color={activeTab === 'entities' ? textColor : '$color10'}>
                Entities ({entities.length})
              </SizableText>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Content value="search" paddingTop="$4">
            <KnowledgeSearch
              domain={domain}
              placeholder={`Search ${config.sublabel} knowledge...`}
            />
          </Tabs.Content>

          <Tabs.Content value="sources" paddingTop="$4">
            <YStack gap="$3">
              {sources.length === 0 ? (
                <YStack padding="$4" alignItems="center" gap="$2">
                  <FileText size={32} color="$color8" />
                  <Paragraph size="$3" color="$color10" textAlign="center">
                    No sources yet. Add files, URLs, or notes to build your {config.sublabel} knowledge base.
                  </Paragraph>
                </YStack>
              ) : (
                sources.map((source) => (
                  <XStack
                    key={source.id}
                    padding="$3"
                    backgroundColor="$background"
                    borderRadius="$3"
                    gap="$3"
                    alignItems="center"
                  >
                    <FileText size={18} color="$color10" />
                    <YStack flex={1}>
                      <SizableText size="$3" fontWeight="500" numberOfLines={1}>
                        {source.title}
                      </SizableText>
                      <SizableText size="$2" color="$color10">
                        {SOURCE_TYPE_LABELS[source.source_type]}
                      </SizableText>
                    </YStack>
                    <ChevronRight size={16} color="$color10" />
                  </XStack>
                ))
              )}
              {sources.length > 0 && (
                <Button size="$3" variant="outlined" theme={config.color as any}>
                  View All Sources
                </Button>
              )}
            </YStack>
          </Tabs.Content>

          <Tabs.Content value="entities" paddingTop="$4">
            <YStack gap="$3">
              {entities.length === 0 ? (
                <YStack padding="$4" alignItems="center" gap="$2">
                  <Brain size={32} color="$color8" />
                  <Paragraph size="$3" color="$color10" textAlign="center">
                    No entities extracted yet. Add sources and we'll automatically identify key concepts.
                  </Paragraph>
                </YStack>
              ) : (
                <>
                  <XStack gap="$2" flexWrap="wrap">
                    {entities.map((entity) => (
                      <XStack
                        key={entity.id}
                        padding="$2"
                        paddingHorizontal="$3"
                        backgroundColor="$background"
                        borderRadius="$3"
                        gap="$2"
                        alignItems="center"
                      >
                        <SizableText size="$2" color="$color11">
                          {entity.name}
                        </SizableText>
                        <SizableText
                          size="$1"
                          color="$color9"
                          backgroundColor="$color3"
                          paddingHorizontal="$2"
                          borderRadius="$2"
                        >
                          {entity.entity_type}
                        </SizableText>
                      </XStack>
                    ))}
                  </XStack>
                  <Button size="$3" variant="outlined" theme={config.color as any}>
                    View All Entities
                  </Button>
                </>
              )}
            </YStack>
          </Tabs.Content>
        </Tabs>
      </YStack>

      {/* Add Source Sheet */}
      <AddSourceSheet
        open={showAddSheet}
        onOpenChange={setShowAddSheet}
        domain={domain}
        onSuccess={() => {
          // Refetch sources and entities after successful add
          // React Query will handle this automatically via cache invalidation
        }}
      />
    </Card>
  )
}
