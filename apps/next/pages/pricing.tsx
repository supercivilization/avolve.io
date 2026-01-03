import { useRouter } from 'next/router'
import { PricingTiers, YStack, validToken } from '@my/ui'

export default function PricingPage() {
  const router = useRouter()

  const handleSelectTier = (tierId: string, isYearly: boolean) => {
    router.push(`/checkout/${tierId}?interval=${isYearly ? 'year' : 'month'}`)
  }

  return (
    <YStack flex={1} backgroundColor="$background" minHeight={validToken('100vh')}>
      <PricingTiers onSelectTier={handleSelectTier} />
    </YStack>
  )
}
