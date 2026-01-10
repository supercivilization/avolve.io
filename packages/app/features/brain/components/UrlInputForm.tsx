'use client'

import { useState } from 'react'
import { Link2, CheckCircle, AlertCircle, Loader, Globe } from '@tamagui/lucide-icons'
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

interface UrlInputFormProps {
  domain: CSuiteDomain
  onSuccess: () => void
  onCancel: () => void
}

type SubmitState = 'idle' | 'validating' | 'creating' | 'processing' | 'success' | 'error'

export function UrlInputForm({ domain, onSuccess, onCancel }: UrlInputFormProps) {
  const config = DOMAIN_CONFIG[domain]
  const createSource = useCreateSource()
  const processSource = useProcessSource()

  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [error, setError] = useState<string | null>(null)
  const [urlMetadata, setUrlMetadata] = useState<{ title?: string; description?: string } | null>(null)

  const isValidUrl = (urlString: string): boolean => {
    try {
      const urlObj = new URL(urlString)
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
    } catch {
      return false
    }
  }

  const handleUrlBlur = async () => {
    if (!url || !isValidUrl(url)) return

    // Try to fetch metadata from URL
    setSubmitState('validating')
    try {
      // We could add a backend endpoint to fetch URL metadata
      // For now, extract hostname as a fallback title
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.replace('www.', '')
      const pathname = urlObj.pathname

      if (!title) {
        setTitle(hostname + (pathname !== '/' ? pathname : ''))
      }

      setUrlMetadata({ title: hostname })
      setSubmitState('idle')
    } catch {
      setSubmitState('idle')
    }
  }

  const handleSubmit = async () => {
    if (!url.trim()) {
      setError('Please enter a URL')
      return
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL (starting with http:// or https://)')
      return
    }

    if (!title.trim()) {
      setError('Please enter a title')
      return
    }

    try {
      setSubmitState('creating')
      setError(null)

      // Step 1: Create the source record
      const result = await createSource.mutateAsync({
        source_type: 'url',
        title: title.trim(),
        description: description.trim() || undefined,
        url: url.trim(),
        domains: [domain],
        metadata: {
          original_url: url.trim(),
        },
      })

      setSubmitState('processing')

      // Step 2: Trigger processing
      await processSource.mutateAsync(result.source.id)

      setSubmitState('success')

      // Wait briefly to show success state
      setTimeout(onSuccess, 1000)
    } catch (err) {
      setSubmitState('error')
      setError(err instanceof Error ? err.message : 'Failed to add URL')
    }
  }

  const isProcessing = submitState === 'validating' || submitState === 'creating' || submitState === 'processing'

  return (
    <YStack gap="$4" flex={1}>
      {/* URL Preview Card */}
      {url && isValidUrl(url) && (
        <XStack
          padding="$4"
          // @ts-expect-error - Dynamic color tokens work at runtime
          backgroundColor={`$${config.color}2`}
          borderRadius="$4"
          gap="$3"
          alignItems="center"
        >
          <YStack
            width={44}
            height={44}
            borderRadius="$3"
            // @ts-expect-error - Dynamic color tokens work at runtime
            backgroundColor={`$${config.color}4`}
            alignItems="center"
            justifyContent="center"
          >
            {/* @ts-expect-error - Dynamic color tokens */}
            <Globe size={20} color={`$${config.color}10`} />
          </YStack>
          <YStack flex={1}>
            <SizableText size="$3" fontWeight="500" numberOfLines={1}>
              {title || new URL(url).hostname}
            </SizableText>
            <SizableText size="$2" color="$color10" numberOfLines={1}>
              {url}
            </SizableText>
          </YStack>
          {submitState === 'success' && <CheckCircle size={20} color="$green10" />}
        </XStack>
      )}

      {/* Form Fields */}
      {submitState !== 'success' && (
        <>
          <YStack gap="$2">
            <Label htmlFor="url" size="$3">
              URL *
            </Label>
            <Input
              id="url"
              value={url}
              onChangeText={setUrl}
              onBlur={handleUrlBlur}
              placeholder="https://example.com/article"
              keyboardType="url"
              autoCapitalize="none"
              autoCorrect={false}
              disabled={isProcessing}
              testID="url-input"
            />
          </YStack>

          <YStack gap="$2">
            <Label htmlFor="title" size="$3">
              Title *
            </Label>
            <Input
              id="title"
              value={title}
              onChangeText={setTitle}
              placeholder="Enter a title for this content"
              disabled={isProcessing}
              testID="url-title-input"
            />
          </YStack>

          <YStack gap="$2">
            <Label htmlFor="description" size="$3">
              Description
            </Label>
            <TextArea
              id="description"
              value={description}
              onChangeText={setDescription}
              placeholder="Brief description (optional)"
              rows={3}
              disabled={isProcessing}
              testID="url-description-input"
            />
          </YStack>
        </>
      )}

      {/* Status Message */}
      {submitState === 'processing' && (
        <XStack gap="$2" alignItems="center" padding="$3" backgroundColor="$blue2" borderRadius="$3">
          <Loader size={16} color="$blue10" />
          <Paragraph size="$3" color="$blue11">
            Fetching and processing content...
          </Paragraph>
        </XStack>
      )}

      {submitState === 'success' && (
        <XStack gap="$2" alignItems="center" padding="$3" backgroundColor="$green2" borderRadius="$3">
          <CheckCircle size={16} color="$green10" />
          <Paragraph size="$3" color="$green11">
            URL added successfully!
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
          theme={config.color as any}
          onPress={handleSubmit}
          disabled={isProcessing || submitState === 'success'}
          icon={isProcessing ? <Loader size={16} /> : <Link2 size={16} />}
          testID="url-submit"
        >
          {submitState === 'creating' ? 'Creating...' : submitState === 'processing' ? 'Processing...' : 'Add URL'}
        </Button>
      </XStack>
    </YStack>
  )
}
