import { Button, H1, Paragraph, YStack, validToken } from '@my/ui'
import { Home, RefreshCw } from '@tamagui/lucide-icons'
import { useLink } from 'solito/link'
import Head from 'next/head'

export default function Custom500() {
  return (
    <>
      <Head>
        <title>Server Error | Avolve</title>
        <meta name="robots" content="noindex" />
      </Head>
      <YStack
        flex={1}
        backgroundColor="$background"
        minHeight={validToken('100vh')}
        alignItems="center"
        justifyContent="center"
        padding="$6"
        gap="$6"
      >
        {/* 500 Number */}
        <YStack alignItems="center" gap="$2">
          <H1
            size="$15"
            fontWeight="800"
            color="$red6"
            opacity={0.5}
          >
            500
          </H1>
          <H1 size="$8" fontWeight="700" textAlign="center">
            Something Went Wrong
          </H1>
        </YStack>

        {/* Message */}
        <Paragraph
          size="$5"
          color="$color11"
          textAlign="center"
          maxWidth={400}
        >
          We're experiencing some technical difficulties. Please try again in a moment.
        </Paragraph>

        {/* Actions */}
        <YStack gap="$3" width="100%" maxWidth={300}>
          <Button
            size="$5"
            theme="active"
            icon={<RefreshCw size={18} />}
            onPress={() => {
              if (typeof window !== 'undefined') {
                window.location.reload()
              }
            }}
          >
            Try Again
          </Button>
          <Button
            {...useLink({ href: '/' })}
            size="$4"
            chromeless
            icon={<Home size={16} />}
          >
            Go Home
          </Button>
        </YStack>
      </YStack>
    </>
  )
}
