'use client'

import { useState } from 'react'
import { FileText, Link2, StickyNote, ChevronRight, X } from '@tamagui/lucide-icons'
import {
  Button,
  H3,
  Sheet,
  SizableText,
  XStack,
  YStack,
} from '@my/ui'
import type { CSuiteDomain } from '../types'
import { DOMAIN_CONFIG } from '../types'
import { FileUploadForm } from './FileUploadForm'
import { UrlInputForm } from './UrlInputForm'
import { NoteEditorForm } from './NoteEditorForm'

type AddSourceType = 'file' | 'url' | 'note' | null

interface AddSourceSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  domain: CSuiteDomain
  onSuccess?: () => void
}

export function AddSourceSheet({ open, onOpenChange, domain, onSuccess }: AddSourceSheetProps) {
  const [sourceType, setSourceType] = useState<AddSourceType>(null)
  const config = DOMAIN_CONFIG[domain]

  const handleClose = () => {
    setSourceType(null)
    onOpenChange(false)
  }

  const handleSuccess = () => {
    setSourceType(null)
    onOpenChange(false)
    onSuccess?.()
  }

  const handleBack = () => {
    setSourceType(null)
  }

  return (
    <Sheet
      modal
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setSourceType(null)
        }
        onOpenChange(isOpen)
      }}
      snapPoints={[85]}
      dismissOnSnapToBottom
    >
      <Sheet.Overlay />
      <Sheet.Frame padding="$4">
        <Sheet.Handle />
        <YStack gap="$4" paddingTop="$4" flex={1}>
          {/* Header */}
          <XStack justifyContent="space-between" alignItems="center">
            <XStack gap="$2" alignItems="center">
              {sourceType && (
                <Button
                  size="$2"
                  circular
                  icon={<ChevronRight size={16} style={{ transform: [{ rotate: '180deg' }] }} />}
                  onPress={handleBack}
                  chromeless
                />
              )}
              <H3>
                {sourceType === 'file' && 'Upload File'}
                {sourceType === 'url' && 'Add URL'}
                {sourceType === 'note' && 'Create Note'}
                {!sourceType && `Add to ${config.sublabel} Knowledge`}
              </H3>
            </XStack>
            <Button
              size="$2"
              circular
              icon={<X size={16} />}
              onPress={handleClose}
              chromeless
            />
          </XStack>

          {/* Content */}
          {!sourceType ? (
            <YStack gap="$3">
              <AddOption
                icon={<FileText size={20} />}
                title="Upload File"
                description="PDF, Markdown, TXT, DOCX, CSV, JSON"
                onPress={() => setSourceType('file')}
                testID="add-source-file"
              />
              <AddOption
                icon={<Link2 size={20} />}
                title="Add URL"
                description="Web page, article, documentation"
                onPress={() => setSourceType('url')}
                testID="add-source-url"
              />
              <AddOption
                icon={<StickyNote size={20} />}
                title="Create Note"
                description="Write or paste text directly"
                onPress={() => setSourceType('note')}
                testID="add-source-note"
              />
            </YStack>
          ) : (
            <YStack flex={1}>
              {sourceType === 'file' && (
                <FileUploadForm
                  domain={domain}
                  onSuccess={handleSuccess}
                  onCancel={handleBack}
                />
              )}
              {sourceType === 'url' && (
                <UrlInputForm
                  domain={domain}
                  onSuccess={handleSuccess}
                  onCancel={handleBack}
                />
              )}
              {sourceType === 'note' && (
                <NoteEditorForm
                  domain={domain}
                  onSuccess={handleSuccess}
                  onCancel={handleBack}
                />
              )}
            </YStack>
          )}
        </YStack>
      </Sheet.Frame>
    </Sheet>
  )
}

function AddOption({
  icon,
  title,
  description,
  onPress,
  testID,
}: {
  icon: React.ReactNode
  title: string
  description: string
  onPress: () => void
  testID?: string
}) {
  return (
    <XStack
      padding="$4"
      backgroundColor="$color2"
      borderRadius="$4"
      gap="$3"
      alignItems="center"
      pressStyle={{ backgroundColor: '$color3' }}
      cursor="pointer"
      onPress={onPress}
      testID={testID}
    >
      <YStack
        width={44}
        height={44}
        borderRadius="$3"
        backgroundColor="$color4"
        alignItems="center"
        justifyContent="center"
      >
        {icon}
      </YStack>
      <YStack flex={1}>
        <SizableText size="$4" fontWeight="500">
          {title}
        </SizableText>
        <SizableText size="$3" color="$color10">
          {description}
        </SizableText>
      </YStack>
      <ChevronRight size={18} color="$color10" />
    </XStack>
  )
}
