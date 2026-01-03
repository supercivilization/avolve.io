import { Check } from '@tamagui/lucide-icons'
import { useState } from 'react'
import {
  Button,
  Card,
  H2,
  H3,
  Paragraph,
  Separator,
  SizableText,
  Switch,
  Theme,
  XStack,
  YStack,
  styled,
} from 'tamagui'

// Tier configuration inline to avoid cross-package dependency issues
type SubscriptionTier = 'individual_vip' | 'collective_pro' | 'ecosystem_ceo'

interface TierConfig {
  id: SubscriptionTier
  name: string
  tagline: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  yearlyMonthlyEquivalent: number
  yearlySavings: number
  features: string[]
  highlighted?: boolean
}

const TIERS: TierConfig[] = [
  {
    id: 'individual_vip',
    name: 'Individual VIP',
    tagline: 'Vivify Further',
    description: 'For solopreneurs ready to accelerate their growth with AI-powered tools.',
    monthlyPrice: 28,
    yearlyPrice: 288,
    yearlyMonthlyEquivalent: 24,
    yearlySavings: 48,
    features: [
      'Full documentation & tutorials',
      'Playbooks & SOPs library',
      'Templates & components',
      'AI chat assistant (100/day)',
      'Community forum access',
      'Knowledge base access',
      'Up to 3 active projects',
    ],
  },
  {
    id: 'collective_pro',
    name: 'Collective PRO',
    tagline: 'Unify Faster',
    description: 'For teams building together with advanced features and group sessions.',
    monthlyPrice: 288,
    yearlyPrice: 2888,
    yearlyMonthlyEquivalent: 240.67,
    yearlySavings: 568,
    features: [
      'Everything in Individual VIP',
      'Team workspace (up to 10)',
      'Advanced training & deep dives',
      'Team workshops',
      'Premium templates & tools',
      'Monthly office hours (2 hrs)',
      'Quarterly group reviews',
      'Priority support',
      'AI chat (500/day)',
      'Up to 10 active projects',
    ],
    highlighted: true,
  },
  {
    id: 'ecosystem_ceo',
    name: 'Ecosystem CEO',
    tagline: 'Thrive Forever',
    description: 'For organizations requiring dedicated support and strategic partnership.',
    monthlyPrice: 2888,
    yearlyPrice: 22888,
    yearlyMonthlyEquivalent: 1907.33,
    yearlySavings: 11768,
    features: [
      'Everything in Collective PRO',
      'Unlimited team seats',
      'Custom training & 1:1 sessions',
      'Executive workshops',
      'Custom templates & enterprise tools',
      'Dedicated technician',
      'Private Slack channel',
      'Weekly strategy calls',
      'White-glove support',
      'SLA guarantees (4hr response)',
      'Unlimited AI chat & projects',
    ],
  },
]

const PricingCard = styled(Card, {
  name: 'PricingCard',
  flex: 1,
  padding: '$6',
  borderRadius: '$6',
  borderWidth: 2,
  borderColor: '$borderColor',
  minWidth: 300,
  maxWidth: 400,

  variants: {
    highlighted: {
      true: {
        borderColor: '$blue10',
        shadowColor: '$blue5',
        shadowRadius: 20,
      },
    },
  } as const,
})

const FeatureItem = ({ children }: { children: string }) => (
  <XStack gap="$2" alignItems="flex-start">
    <Check size={16} color="$green10" marginTop={3} />
    <SizableText size="$3" color="$color11">
      {children}
    </SizableText>
  </XStack>
)

interface PricingTierCardProps {
  tier: TierConfig
  isYearly: boolean
  onSelect: (tierId: SubscriptionTier, isYearly: boolean) => void
}

function PricingTierCard({ tier, isYearly, onSelect }: PricingTierCardProps) {
  const price = isYearly ? tier.yearlyMonthlyEquivalent : tier.monthlyPrice
  const displayPrice = isYearly ? tier.yearlyPrice : tier.monthlyPrice

  return (
    <Theme name={tier.highlighted ? 'blue' : undefined}>
      <PricingCard highlighted={tier.highlighted} elevate={tier.highlighted}>
        {tier.highlighted && (
          <XStack
            position="absolute"
            top={-12}
            left="50%"
            x="-50%"
            backgroundColor="$blue10"
            paddingHorizontal="$4"
            paddingVertical="$1"
            borderRadius="$10"
          >
            <SizableText size="$2" fontWeight="700" color="white">
              Most Popular
            </SizableText>
          </XStack>
        )}

        <YStack gap="$4">
          {/* Header */}
          <YStack gap="$2">
            <SizableText size="$2" color="$color11" fontWeight="600" textTransform="uppercase">
              {tier.tagline}
            </SizableText>
            <H3 size="$8">{tier.name}</H3>
            <Paragraph size="$3" color="$color11">
              {tier.description}
            </Paragraph>
          </YStack>

          {/* Price */}
          <YStack gap="$1">
            <XStack alignItems="baseline" gap="$1">
              <H2 size="$10" fontWeight="700">
                ${Math.round(price)}
              </H2>
              <SizableText size="$4" color="$color11">
                /mo
              </SizableText>
            </XStack>
            {isYearly && (
              <XStack gap="$2" alignItems="center">
                <SizableText size="$2" color="$color10" textDecorationLine="line-through">
                  ${tier.monthlyPrice}/mo
                </SizableText>
                <SizableText size="$2" color="$green10" fontWeight="600">
                  Save ${tier.yearlySavings}/year
                </SizableText>
              </XStack>
            )}
            {isYearly && (
              <SizableText size="$2" color="$color11">
                Billed ${displayPrice}/year
              </SizableText>
            )}
          </YStack>

          <Separator />

          {/* Features */}
          <YStack gap="$2">
            {tier.features.map((feature, index) => (
              <FeatureItem key={index}>{feature}</FeatureItem>
            ))}
          </YStack>

          {/* CTA */}
          <Button
            size="$5"
            theme={tier.highlighted ? 'active' : 'alt1'}
            themeInverse={tier.highlighted}
            onPress={() => onSelect(tier.id, isYearly)}
          >
            Get Started
          </Button>
        </YStack>
      </PricingCard>
    </Theme>
  )
}

export interface PricingTiersProps {
  onSelectTier?: (tierId: SubscriptionTier, isYearly: boolean) => void
  defaultYearly?: boolean
}

export function PricingTiers({ onSelectTier, defaultYearly = true }: PricingTiersProps) {
  const [isYearly, setIsYearly] = useState(defaultYearly)

  const handleSelect = (tierId: SubscriptionTier, yearly: boolean) => {
    onSelectTier?.(tierId, yearly)
  }

  return (
    <YStack gap="$8" padding="$4" alignItems="center">
      {/* Header */}
      <YStack gap="$4" alignItems="center" maxWidth={600}>
        <H2 size="$9" textAlign="center">
          Choose Your Growth Path
        </H2>
        <Paragraph size="$5" color="$color11" textAlign="center">
          Join thousands of solopreneurs building their future with the 5S × 4T framework.
        </Paragraph>
      </YStack>

      {/* Billing Toggle */}
      <XStack
        gap="$3"
        alignItems="center"
        backgroundColor="$background"
        padding="$3"
        borderRadius="$10"
      >
        <SizableText
          size="$4"
          fontWeight={!isYearly ? '700' : '400'}
          color={!isYearly ? '$color12' : '$color10'}
        >
          Monthly
        </SizableText>
        <Switch
          size="$3"
          checked={isYearly}
          onCheckedChange={setIsYearly}
          backgroundColor={isYearly ? '$green10' : '$gray6'}
        >
          <Switch.Thumb animation="quick" backgroundColor="white" />
        </Switch>
        <XStack gap="$2" alignItems="center">
          <SizableText
            size="$4"
            fontWeight={isYearly ? '700' : '400'}
            color={isYearly ? '$color12' : '$color10'}
          >
            Yearly
          </SizableText>
          <XStack
            backgroundColor="$green4"
            paddingHorizontal="$2"
            paddingVertical="$1"
            borderRadius="$4"
          >
            <SizableText size="$1" color="$green10" fontWeight="700">
              2 MONTHS FREE
            </SizableText>
          </XStack>
        </XStack>
      </XStack>

      {/* Pricing Cards */}
      <XStack
        flexWrap="wrap"
        gap="$4"
        justifyContent="center"
        maxWidth={1300}
        width="100%"
      >
        {TIERS.map((tier) => (
          <PricingTierCard
            key={tier.id}
            tier={tier}
            isYearly={isYearly}
            onSelect={handleSelect}
          />
        ))}
      </XStack>

      {/* Trust Badges */}
      <YStack gap="$2" alignItems="center" marginTop="$4">
        <SizableText size="$2" color="$color10">
          30-day money-back guarantee • Cancel anytime • Secure payment
        </SizableText>
      </YStack>
    </YStack>
  )
}
