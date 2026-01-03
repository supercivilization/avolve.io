'use client'

import { createClient } from 'app/utils/supabase/client'
import { YStack, XStack, H1, H3, Text, Button, Card } from '@my/ui'
import { formatDistance } from 'date-fns'
import { useEffect, useState } from 'react'

export const dynamic = 'force-dynamic'

interface Error {
  id: string
  message: string
  stack: string | null
  error_type: string | null
  url: string | null
  user_id: string | null
  created_at: string
  resolved: boolean
  metadata: Record<string, any>
}

export default function ErrorsPage() {
  const [errors, setErrors] = useState<Error[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function loadErrors() {
      const { data } = await supabase
        .from('errors')
        .select('*')
        .eq('resolved', false)
        .order('created_at', { ascending: false })
        .limit(50)

      setErrors(data || [])
      setLoading(false)
    }
    loadErrors()
  }, [])

  const errorCount = errors?.length || 0

  return (
    <YStack f={1} p="$4" gap="$4">
      <XStack jc="space-between" ai="center">
        <H1>Error Dashboard</H1>
        <Text size="$6" color="$gray11">
          {errorCount} unresolved {errorCount === 1 ? 'error' : 'errors'}
        </Text>
      </XStack>

      <YStack gap="$3">
        {loading ? (
          <Card p="$6" bc="$borderColor">
            <Text ta="center" color="$gray11">
              Loading...
            </Text>
          </Card>
        ) : errors && errors.length > 0 ? (
          errors.map((error: Error) => (
            <ErrorCard key={error.id} error={error} onResolve={() => {
              setErrors(errors.filter(e => e.id !== error.id))
            }} />
          ))
        ) : (
          <Card p="$6" bc="$borderColor">
            <Text ta="center" color="$gray11">
              No errors found! 🎉
            </Text>
          </Card>
        )}
      </YStack>
    </YStack>
  )
}

function ErrorCard({ error, onResolve }: { error: Error; onResolve: () => void }) {
  const supabase = createClient()
  const timeAgo = formatDistance(new Date(error.created_at), new Date(), {
    addSuffix: true,
  })

  const handleResolve = async () => {
    await supabase
      .from('errors')
      .update({ resolved: true, resolved_at: new Date().toISOString() })
      .eq('id', error.id)
    onResolve()
  }

  return (
    <Card p="$4" bc="$borderColor" hoverStyle={{ bc: '$color3' }}>
      <YStack gap="$2">
        <XStack jc="space-between" ai="flex-start">
          <YStack f={1} gap="$1">
            <XStack gap="$2" ai="center">
              <Text size="$2" color="$red10" fontWeight="bold">
                {error.error_type || 'Error'}
              </Text>
              <Text size="$2" color="$gray10">
                •
              </Text>
              <Text size="$2" color="$gray10">
                {timeAgo}
              </Text>
            </XStack>
            <H3 size="$6" fontWeight="600">
              {error.message}
            </H3>
          </YStack>
          <Button onPress={handleResolve} size="$2" chromeless>
            Resolve
          </Button>
        </XStack>

        {error.url && (
          <Text size="$2" color="$gray11">
            URL: {error.url}
          </Text>
        )}

        {error.user_id && (
          <Text size="$2" color="$gray11">
            User ID: {error.user_id}
          </Text>
        )}

        {error.stack && (
          <details>
            <summary style={{ cursor: 'pointer', color: '$gray11' }}>
              <Text size="$2" color="$gray11">
                View stack trace
              </Text>
            </summary>
            <Card mt="$2" p="$3" bg="$gray2">
              <Text size="$1" fontFamily="$mono" style={{ whiteSpace: 'pre-wrap' }}>
                {error.stack}
              </Text>
            </Card>
          </details>
        )}

        {error.metadata && Object.keys(error.metadata).length > 0 && (
          <details>
            <summary style={{ cursor: 'pointer' }}>
              <Text size="$2" color="$gray11">
                View metadata
              </Text>
            </summary>
            <Card mt="$2" p="$3" bg="$gray2">
              <Text size="$1" fontFamily="$mono">
                {JSON.stringify(error.metadata, null, 2)}
              </Text>
            </Card>
          </details>
        )}
      </YStack>
    </Card>
  )
}
