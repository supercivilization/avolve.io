'use client'

import { useState } from 'react'
import { StickyNote, CheckCircle, AlertCircle, Loader } from '@tamagui/lucide-icons'
import {
  Button,
  Input,
  Label,
  Paragraph,
  SizableText,
  TextArea,
  XStack,
  YStack,
} from '@my/ui'
import { useCreateSource, useProcessSource } from '../hooks'
import type { CSuiteDomain } from '../types'
import { DOMAIN_CONFIG } from '../types'

interface NoteEditorFormProps {
  domain?: CSuiteDomain
  onSuccess: () => void
  onCancel: () => void
}

type SubmitState = 'idle' | 'creating' | 'processing' | 'success' | 'error'

const DEFAULT_COLOR = 'blue'

export function NoteEditorForm({ domain, onSuccess, onCancel }: NoteEditorFormProps) {
  const config = domain ? DOMAIN_CONFIG[domain] : null
  const themeColor = config?.color || DEFAULT_COLOR
  const createSource = useCreateSource()
  const processSource = useProcessSource()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError('Please enter a title')
      return
    }

    if (!content.trim()) {
      setError('Please enter some content')
      return
    }

    try {
      setSubmitState('creating')
      setError(null)

      // Step 1: Create the source record with content
      const result = await createSource.mutateAsync({
        source_type: 'note',
        title: title.trim(),
        content: content.trim(),
        domains: domain ? [domain] : [],
        metadata: {
          word_count: content.trim().split(/\s+/).length,
          character_count: content.trim().length,
        },
      })

      setSubmitState('processing')

      // Step 2: Trigger processing (chunking, embeddings, entity extraction)
      await processSource.mutateAsync(result.source.id)

      setSubmitState('success')

      // Wait briefly to show success state
      setTimeout(onSuccess, 1000)
    } catch (err) {
      setSubmitState('error')
      setError(err instanceof Error ? err.message : 'Failed to create note')
    }
  }

  const isProcessing = submitState === 'creating' || submitState === 'processing'
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0

  return (
    <YStack gap="$4" flex={1}>
      {/* Note Preview Card */}
      {title && content && submitState === 'success' && (
        <XStack
          padding="$4"
          // @ts-expect-error - Dynamic color tokens work at runtime
          backgroundColor={`$${themeColor}2`}
          borderRadius="$4"
          gap="$3"
          alignItems="center"
        >
          <YStack
            width={44}
            height={44}
            borderRadius="$3"
            // @ts-expect-error - Dynamic color tokens work at runtime
            backgroundColor={`$${themeColor}4`}
            alignItems="center"
            justifyContent="center"
          >
            {/* @ts-expect-error - Dynamic color tokens */}
            <StickyNote size={20} color={`$${themeColor}10`} />
          </YStack>
          <YStack flex={1}>
            <SizableText size="$3" fontWeight="500" numberOfLines={1}>
              {title}
            </SizableText>
            <SizableText size="$2" color="$color10" numberOfLines={1}>
              {wordCount} words
            </SizableText>
          </YStack>
          <CheckCircle size={20} color="$green10" />
        </XStack>
      )}

      {/* Form Fields */}
      {submitState !== 'success' && (
        <>
          <YStack gap="$2">
            <Label htmlFor="note-title" size="$3">
              Title *
            </Label>
            <Input
              id="note-title"
              value={title}
              onChangeText={setTitle}
              placeholder="Enter a title for this note"
              disabled={isProcessing}
              testID="note-title-input"
            />
          </YStack>

          <YStack gap="$2" flex={1}>
            <XStack justifyContent="space-between" alignItems="center">
              <Label htmlFor="note-content" size="$3">
                Content *
              </Label>
              <SizableText size="$2" color="$color10">
                {wordCount} words
              </SizableText>
            </XStack>
            <TextArea
              id="note-content"
              value={content}
              onChangeText={setContent}
              placeholder="Write or paste your content here..."
              rows={10}
              disabled={isProcessing}
              testID="note-content-input"
              flex={1}
              minHeight={200}
            />
          </YStack>
        </>
      )}

      {/* Status Message */}
      {submitState === 'processing' && (
        <XStack gap="$2" alignItems="center" padding="$3" backgroundColor="$blue2" borderRadius="$3">
          <Loader size={16} color="$blue10" />
          <Paragraph size="$3" color="$blue11">
            Processing and indexing content...
          </Paragraph>
        </XStack>
      )}

      {submitState === 'success' && (
        <XStack gap="$2" alignItems="center" padding="$3" backgroundColor="$green2" borderRadius="$3">
          <CheckCircle size={16} color="$green10" />
          <Paragraph size="$3" color="$green11">
            Note created successfully!
          </Paragraph>
        </XStack>
      )}

      {/* Error Message */}
      {error && (
        <XStack gap="$2" alignItems="center" padding="$3" backgroundColor="$red2" borderRadius="$3">
          <AlertCircle size={16} color="$red10" />
          <Paragraph size="$3" color="$red11">
            {error}
          </Paragraph>
        </XStack>
      )}

      {/* Actions */}
      <XStack gap="$3" justifyContent="flex-end" marginTop="auto">
        <Button
          variant="outlined"
          onPress={onCancel}
          disabled={isProcessing}
        >
          Cancel
        </Button>
        <Button
          theme={themeColor as any}
          onPress={handleSubmit}
          disabled={isProcessing || submitState === 'success'}
          icon={isProcessing ? <Loader size={16} /> : <StickyNote size={16} />}
          testID="note-submit"
        >
          {submitState === 'creating' ? 'Creating...' : submitState === 'processing' ? 'Processing...' : 'Create Note'}
        </Button>
      </XStack>
    </YStack>
  )
}
