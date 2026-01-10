import { Button, H1, Paragraph, YStack, validToken } from '@my/ui'
import { Home, ArrowLeft } from '@tamagui/lucide-icons'
import { useLink } from 'solito/link'
import Head from 'next/head'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found | Avolve</title>
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
        {/* 404 Number */}
        <YStack alignItems="center" gap="$2">
          <H1
            size="$15"
            fontWeight="800"
            color="$color6"
            opacity={0.5}
          >
            404
          </H1>
          <H1 size="$8" fontWeight="700" textAlign="center">
            Page Not Found
          </H1>
        </YStack>

        {/* Message */}
        <Paragraph
          size="$5"
          color="$color11"
          textAlign="center"
          maxWidth={400}
        >
          The page you're looking for doesn't exist or has been moved.
        </Paragraph>

        {/* Actions */}
        <YStack gap="$3" width="100%" maxWidth={300}>
          <Button
            {...useLink({ href: '/' })}
            size="$5"
            theme="active"
            icon={<Home size={18} />}
          >
            Go Home
          </Button>
          <Button
            size="$4"
            chromeless
            icon={<ArrowLeft size={16} />}
            onPress={() => {
              if (typeof window !== 'undefined') {
                window.history.back()
              }
            }}
          >
            Go Back
          </Button>
        </YStack>
      </YStack>
    </>
  )
}
