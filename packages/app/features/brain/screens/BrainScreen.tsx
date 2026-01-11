'use client'

import { useState } from 'react'
import {
  Brain,
  Search,
  Plus,
  FileText,
  Link as LinkIcon,
  StickyNote,
  Settings,
} from '@tamagui/lucide-icons'
import {
  Button,
  Card,
  H2,
  H3,
  Paragraph,
  Sheet,
  SizableText,
  Tabs,
  XStack,
  YStack,
} from '@my/ui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useUser } from 'app/utils/useUser'
import { BrainChatUI } from '../components/BrainChatUI'
import { KnowledgeSearch } from '../components/KnowledgeSearch'
import { AddSourceSheet } from '../components/AddSourceSheet'
import type { CSuiteDomain } from '../types'
import { DOMAIN_CONFIG } from '../types'

type BrainTab = 'chat' | 'search' | 'sources'

export function BrainScreen() {
  const insets = useSafeAreaInsets()
  const { user, isLoading } = useUser()
  const [activeTab, setActiveTab] = useState<BrainTab>('chat')
  const [activeDomain, setActiveDomain] = useState<CSuiteDomain | undefined>()
  const [showAddSource, setShowAddSource] = useState(false)

  const domains: CSuiteDomain[] = ['ceo', 'cmo', 'cvo', 'coo', 'cfo']

  return (
    <YStack flex={1} backgroundColor="$background" paddingTop={insets.top}>
      {/* Header */}
      <XStack
        padding="$4"
        gap="$3"
        alignItems="center"
        borderBottomWidth={1}
        borderBottomColor="$color4"
      >
        <YStack
          width={44}
          height={44}
          borderRadius="$3"
          backgroundColor="$purple4"
          alignItems="center"
          justifyContent="center"
        >
          <Brain size={24} color="$purple10" />
        </YStack>
        <YStack flex={1}>
          <H2 size="$6">Your Brain</H2>
          <Paragraph size="$2" color="$color11">
            AI-powered knowledge management
          </Paragraph>
        </YStack>
        <Button
          size="$3"
          icon={<Plus size={18} />}
          onPress={() => setShowAddSource(true)}
        >
          Add Source
        </Button>
      </XStack>

      {/* Domain Filter */}
      <XStack padding="$3" gap="$2" flexWrap="wrap">
        <Button
          size="$2"
          chromeless={activeDomain !== undefined}
          theme={activeDomain === undefined ? 'purple' : undefined}
          onPress={() => setActiveDomain(undefined)}
        >
          All Domains
        </Button>
        {domains.map((domain) => {
          const config = DOMAIN_CONFIG[domain]
          const isActive = activeDomain === domain
          return (
            <Button
              key={domain}
              size="$2"
              chromeless={!isActive}
              theme={isActive ? (config.color as any) : undefined}
              onPress={() => setActiveDomain(domain)}
            >
              {domain.toUpperCase()}
            </Button>
          )
        })}
      </XStack>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as BrainTab)}
        flexDirection="column"
        flex={1}
      >
        <Tabs.List
          paddingHorizontal="$4"
          borderBottomWidth={1}
          borderBottomColor="$color4"
        >
          <Tabs.Tab value="chat" flex={1}>
            <SizableText size="$3">Chat</SizableText>
          </Tabs.Tab>
          <Tabs.Tab value="search" flex={1}>
            <SizableText size="$3">Search</SizableText>
          </Tabs.Tab>
          <Tabs.Tab value="sources" flex={1}>
            <SizableText size="$3">Sources</SizableText>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Content value="chat" flex={1}>
          <BrainChatUI
            domain={activeDomain}
            placeholder={
              activeDomain
                ? `Ask about ${activeDomain.toUpperCase()} topics...`
                : 'Ask your brain anything...'
            }
            welcomeMessage={
              activeDomain
                ? `I'm your ${DOMAIN_CONFIG[activeDomain].label} advisor. Ask me anything about ${DOMAIN_CONFIG[activeDomain].description.toLowerCase()}.`
                : "I'm your AI business advisor. Ask me anything about your knowledge base."
            }
          />
        </Tabs.Content>

        <Tabs.Content value="search" flex={1} padding="$4">
          <KnowledgeSearch domain={activeDomain} />
        </Tabs.Content>

        <Tabs.Content value="sources" flex={1} padding="$4">
          <SourcesPanel onAddSource={() => setShowAddSource(true)} />
        </Tabs.Content>
      </Tabs>

      {/* Add Source Sheet */}
      <AddSourceSheet
        open={showAddSource}
        onOpenChange={setShowAddSource}
        domain={activeDomain}
      />
    </YStack>
  )
}

// Sources panel component
function SourcesPanel({ onAddSource }: { onAddSource: () => void }) {
  return (
    <YStack gap="$4">
      <XStack justifyContent="space-between" alignItems="center">
        <H3 size="$5">Knowledge Sources</H3>
        <Button size="$3" icon={<Plus size={16} />} onPress={onAddSource}>
          Add
        </Button>
      </XStack>

      <YStack gap="$3">
        <SourceTypeCard
          icon={<FileText size={20} color="$blue10" />}
          title="Documents"
          description="PDFs, Word docs, and text files"
          count={0}
          color="blue"
        />
        <SourceTypeCard
          icon={<LinkIcon size={20} color="$green10" />}
          title="Web Pages"
          description="URLs and web content"
          count={0}
          color="green"
        />
        <SourceTypeCard
          icon={<StickyNote size={20} color="$orange10" />}
          title="Notes"
          description="Personal notes and insights"
          count={0}
          color="orange"
        />
      </YStack>

      <Card padding="$4" backgroundColor="$color2" borderRadius="$4">
        <YStack gap="$2" alignItems="center">
          <Brain size={32} color="$color9" />
          <Paragraph size="$3" color="$color11" textAlign="center">
            Add knowledge sources to train your Brain AI.
            The more context you provide, the better answers you'll get.
          </Paragraph>
        </YStack>
      </Card>
    </YStack>
  )
}

interface SourceTypeCardProps {
  icon: React.ReactNode
  title: string
  description: string
  count: number
  color: string
}

function SourceTypeCard({ icon, title, description, count, color }: SourceTypeCardProps) {
  return (
    <Card
      padding="$4"
      borderRadius="$4"
      hoverStyle={{ backgroundColor: '$color3' }}
      pressStyle={{ scale: 0.98 }}
      animation="quick"
    >
      <XStack gap="$3" alignItems="center">
        <YStack
          width={44}
          height={44}
          borderRadius="$3"
          backgroundColor={`$${color}4` as any}
          alignItems="center"
          justifyContent="center"
        >
          {icon}
        </YStack>
        <YStack flex={1}>
          <SizableText size="$4" fontWeight="600">
            {title}
          </SizableText>
          <Paragraph size="$2" color="$color11">
            {description}
          </Paragraph>
        </YStack>
        <YStack
          paddingHorizontal="$3"
          paddingVertical="$1"
          backgroundColor="$color4"
          borderRadius="$2"
        >
          <SizableText size="$2" fontWeight="600">
            {count}
          </SizableText>
        </YStack>
      </XStack>
    </Card>
  )
}

export default BrainScreen
