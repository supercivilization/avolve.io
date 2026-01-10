import { useRouter } from 'next/router'
import { PricingTiers, YStack, validToken } from '@my/ui'
import type { GetStaticProps } from 'next'
import Head from 'next/head'

export default function PricingPage() {
  const router = useRouter()

  const handleSelectTier = (tierId: string, isYearly: boolean) => {
    router.push(`/checkout/${tierId}?interval=${isYearly ? 'year' : 'month'}`)
  }

  return (
    <>
      <Head>
        <title>Pricing | Avolve</title>
        <meta name="description" content="Choose your Avolve plan. Start free, upgrade when you're ready." />
      </Head>
      <YStack flex={1} backgroundColor="$background" minHeight={validToken('100vh')}>
        <PricingTiers onSelectTier={handleSelectTier} />
      </YStack>
    </>
  )
}

// ISR: Regenerate every hour
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 3600, // Revalidate every hour
  }
}
