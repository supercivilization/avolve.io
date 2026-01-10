import { ScrollView, YStack } from '@my/ui'
import { PricingTiers } from '@my/ui'
import { useRouter } from 'solito/router'

import { CTASection } from './components/CTASection'
import { FeaturesSection } from './components/FeaturesSection'
import { FooterSection } from './components/FooterSection'
import { HeroSection } from './components/HeroSection'
import { HowItWorksSection } from './components/HowItWorksSection'
import { TestimonialsSection } from './components/TestimonialsSection'

export function LandingScreen() {
  const router = useRouter()

  const handleSelectTier = (tierId: string, isYearly: boolean) => {
    router.push(`/checkout/${tierId}?interval=${isYearly ? 'year' : 'month'}`)
  }

  return (
    <ScrollView flex={1} backgroundColor="$background">
      <YStack>
        {/* Hero */}
        <HeroSection />

        {/* C-Suite Framework */}
        <FeaturesSection />

        {/* How It Works */}
        <HowItWorksSection />

        {/* Pricing */}
        <YStack id="pricing">
          <PricingTiers onSelectTier={handleSelectTier} />
        </YStack>

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Final CTA */}
        <CTASection />

        {/* Footer */}
        <FooterSection />
      </YStack>
    </ScrollView>
  )
}
