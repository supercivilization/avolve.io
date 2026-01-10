'use client'

import { useState } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle, Loader } from '@tamagui/lucide-icons'
import {
  Button,
  Input,
  Label,
  Paragraph,
  Progress,
  SizableText,
  TextArea,
  XStack,
  YStack,
} from '@my/ui'
import { useSupabase } from 'app/utils/supabase/useSupabase'
import { useCreateSource, useProcessSource } from '../hooks'
import type { CSuiteDomain } from '../types'
import { DOMAIN_CONFIG, ACCEPTED_FILE_TYPES, MAX_FILE_SIZE_MB } from '../types'

interface FileUploadFormProps {
  domain: CSuiteDomain
  onSuccess: () => void
  onCancel: () => void
}

type UploadState = 'idle' | 'uploading' | 'processing' | 'success' | 'error'

export function FileUploadForm({ domain, onSuccess, onCancel }: FileUploadFormProps) {
  const config = DOMAIN_CONFIG[domain]
  const supabase = useSupabase()
  const createSource = useCreateSource()
  const processSource = useProcessSource()

  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [uploadState, setUploadState] = useState<UploadState>('idle')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return

    // Validate file type
    if (!ACCEPTED_FILE_TYPES.includes(selectedFile.type)) {
      setError(`Unsupported file type. Accepted: PDF, TXT, MD, DOCX, CSV, JSON`)
      return
    }

    // Validate file size
    const sizeMB = selectedFile.size / (1024 * 1024)
    if (sizeMB > MAX_FILE_SIZE_MB) {
      setError(`File too large. Maximum size: ${MAX_FILE_SIZE_MB}MB`)
      return
    }

    setFile(selectedFile)
    setTitle(selectedFile.name.replace(/\.[^/.]+$/, '')) // Remove extension for title
    setError(null)
  }

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select a file')
      return
    }

    if (!title.trim()) {
      setError('Please enter a title')
      return
    }

    try {
      setUploadState('uploading')
      setUploadProgress(0)
      setError(null)

      // Step 1: Create the source record and get upload URL
      const result = await createSource.mutateAsync({
        source_type: 'file',
        title: title.trim(),
        description: description.trim() || undefined,
        domains: [domain],
        metadata: {
          original_filename: file.name,
          mime_type: file.type,
          file_size: file.size,
        },
      })

      setUploadProgress(30)

      // Step 2: Upload file to storage using the signed URL
      if (result.upload_url) {
        const uploadResponse = await fetch(result.upload_url, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type,
          },
        })

        if (!uploadResponse.ok) {
          throw new Error('File upload failed')
        }
      } else {
        // Fallback: Upload directly to storage
        const fileName = `${result.source.profile_id}/${result.source.id}/${file.name}`
        const { error: uploadError } = await supabase.storage
          .from('knowledge-sources')
          .upload(fileName, file, {
            contentType: file.type,
            upsert: false,
          })

        if (uploadError) {
          throw new Error(`Upload failed: ${uploadError.message}`)
        }
      }

      setUploadProgress(60)
      setUploadState('processing')

      // Step 3: Trigger processing
      await processSource.mutateAsync(result.source.id)

      setUploadProgress(100)
      setUploadState('success')

      // Wait briefly to show success state
      setTimeout(onSuccess, 1000)
    } catch (err) {
      setUploadState('error')
      setError(err instanceof Error ? err.message : 'Upload failed')
    }
  }

  const getStateIcon = () => {
    switch (uploadState) {
      case 'uploading':
      case 'processing':
        return <Loader size={48} color="$blue10" />
      case 'success':
        return <CheckCircle size={48} color="$green10" />
      case 'error':
        return <AlertCircle size={48} color="$red10" />
      default:
        return <Upload size={48} color="$color10" />
    }
  }

  const getStateText = () => {
    switch (uploadState) {
      case 'uploading':
        return 'Uploading file...'
      case 'processing':
        return 'Processing content...'
      case 'success':
        return 'Upload complete!'
      case 'error':
        return 'Upload failed'
      default:
        return 'Drag & drop or click to select'
    }
  }

  const isProcessing = uploadState === 'uploading' || uploadState === 'processing'

  return (
    <YStack gap="$4" flex={1}>
      {/* File Drop Zone */}
      <YStack
        padding="$6"
        borderWidth={2}
        borderStyle="dashed"
        // @ts-expect-error - Dynamic color tokens work at runtime but TS can't verify
        borderColor={file ? `$${config.color}8` : '$color6'}
        borderRadius="$4"
        // @ts-expect-error - Dynamic color tokens work at runtime but TS can't verify
        backgroundColor={file ? `$${config.color}2` : '$color2'}
        alignItems="center"
        justifyContent="center"
        gap="$3"
        minHeight={150}
        position="relative"
        cursor={isProcessing ? 'default' : 'pointer'}
        pressStyle={isProcessing ? {} : { backgroundColor: '$color3' }}
        onPress={() => {
          if (!isProcessing) {
            document.getElementById('file-input')?.click()
          }
        }}
      >
        <input
          id="file-input"
          type="file"
          accept={ACCEPTED_FILE_TYPES.join(',')}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          disabled={isProcessing}
        />

        {getStateIcon()}

        <SizableText size="$3" color="$color10" textAlign="center">
          {getStateText()}
        </SizableText>

        {file && uploadState === 'idle' && (
          <XStack gap="$2" alignItems="center">
            {/* @ts-expect-error - Dynamic color tokens */}
            <FileText size={16} color={`$${config.color}10`} />
            {/* @ts-expect-error - Dynamic color tokens */}
            <SizableText size="$3" color={`$${config.color}11`} fontWeight="500">
              {file.name}
            </SizableText>
            <SizableText size="$2" color="$color9">
              ({(file.size / 1024).toFixed(1)} KB)
            </SizableText>
          </XStack>
        )}

        {isProcessing && (
          <Progress value={uploadProgress} width="80%">
            {/* @ts-expect-error - Dynamic color tokens */}
            <Progress.Indicator animation="bouncy" backgroundColor={`$${config.color}10`} />
          </Progress>
        )}
      </YStack>

      {/* Form Fields */}
      {uploadState === 'idle' && (
        <>
          <YStack gap="$2">
            <Label htmlFor="title" size="$3">
              Title *
            </Label>
            <Input
              id="title"
              value={title}
              onChangeText={setTitle}
              placeholder="Enter a title for this document"
              testID="file-title-input"
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
              testID="file-description-input"
            />
          </YStack>
        </>
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
          disabled={!file || isProcessing || uploadState === 'success'}
          icon={isProcessing ? <Loader size={16} /> : <Upload size={16} />}
          testID="file-upload-submit"
        >
          {isProcessing ? 'Processing...' : 'Upload'}
        </Button>
      </XStack>
    </YStack>
  )
}
