'use client'

import {
  Package,
  TrendingUp,
  DollarSign,
  Star,
  ArrowRight,
  CheckCircle,
  Layers,
} from '@tamagui/lucide-icons'
import {
  Button,
  Card,
  H2,
  H3,
  Paragraph,
  SizableText,
  Skeleton,
  XStack,
  YStack,
} from '@my/ui'

import { useUser } from 'app/utils/useUser'
import { useSubscription } from 'app/utils/subscription'
import { DashboardLayout } from '../components/DashboardLayout'
import { DomainKnowledgePanel } from 'app/features/brain'

interface ActionCardProps {
  title: string
  description: string
  icon: React.ReactNode
  status?: 'complete' | 'in-progress' | 'not-started' | 'coming-soon'
  onPress?: () => void
}

function ActionCard({ title, description, icon, status = 'coming-soon', onPress }: ActionCardProps) {
  const isComingSoon = status === 'coming-soon'

  return (
    <Card
      padding="$4"
      borderRadius="$4"
      hoverStyle={isComingSoon ? {} : { backgroundColor: '$color3' }}
      pressStyle={isComingSoon ? {} : { scale: 0.98 }}
      animation="quick"
      cursor={isComingSoon ? 'default' : 'pointer'}
      opacity={isComingSoon ? 0.7 : 1}
      onPress={isComingSoon ? undefined : onPress}
    >
      <XStack gap="$3" alignItems="center">
        <YStack
          width={44}
          height={44}
          borderRadius="$3"
          backgroundColor="$green4"
          alignItems="center"
          justifyContent="center"
        >
          {icon}
        </YStack>
        <YStack flex={1} gap="$1">
          <XStack gap="$2" alignItems="center">
            <SizableText size="$4" fontWeight="600">
              {title}
            </SizableText>
            {isComingSoon && (
              <XStack backgroundColor="$color4" paddingHorizontal="$2" paddingVertical="$1" borderRadius="$2">
                <SizableText size="$1" color="$color10">Coming Soon</SizableText>
              </XStack>
            )}
          </XStack>
          <Paragraph size="$3" color="$color11">
            {description}
          </Paragraph>
        </YStack>
        {status === 'complete' ? (
          <CheckCircle size={20} color="$green10" />
        ) : !isComingSoon ? (
          <ArrowRight size={18} color="$color10" />
        ) : null}
      </XStack>
    </Card>
  )
}

function CVOHeader() {
  const { isLoading } = useUser()

  if (isLoading) {
    return (
      <YStack gap="$3">
        <Skeleton width={200} height={32} variant="title" />
        <Skeleton width={400} height={20} />
      </YStack>
    )
  }

  return (
    <YStack gap="$3">
      <XStack alignItems="center" gap="$3">
        <YStack
          width={56}
          height={56}
          borderRadius="$4"
          backgroundColor="$green4"
          alignItems="center"
          justifyContent="center"
        >
          <Layers size={28} color="$green10" />
        </YStack>
        <YStack>
          <SizableText size="$3" color="$green10" fontWeight="600">
            THE WINGS
          </SizableText>
          <H2 size="$8">CVO — Value</H2>
        </YStack>
      </XStack>
      <Paragraph size="$5" color="$color11" maxWidth={600}>
        Products and services. The wings that create lift and keep your business airborne by
        delivering exceptional value to customers.
      </Paragraph>
    </YStack>
  )
}

function ProfitabilityAuditSection() {
  return (
    <YStack gap="$4">
      <XStack justifyContent="space-between" alignItems="center">
        <H3 size="$6">Profitability Audit</H3>
        <Button size="$3" theme="green" icon={<DollarSign size={16} />}>
          Run Audit
        </Button>
      </XStack>
      <Card padding="$5" borderRadius="$4" backgroundColor="$green3">
        <YStack gap="$4">
          <Paragraph size="$4" color="$green11">
            Evaluate each product or service: "If this were a separate business, would it survive on
            its own?" Score each offering to identify what to optimize, grow, or eliminate.
          </Paragraph>
          <XStack flexWrap="wrap" gap="$4">
            <YStack flex={1} minWidth={150} gap="$2">
              <SizableText size="$3" color="$green10" fontWeight="600">
                EVALUATE
              </SizableText>
              <SizableText size="$2" color="$green11">
                Revenue contribution
              </SizableText>
              <SizableText size="$2" color="$green11">
                Profit margin
              </SizableText>
              <SizableText size="$2" color="$green11">
                Customer satisfaction
              </SizableText>
            </YStack>
            <YStack flex={1} minWidth={150} gap="$2">
              <SizableText size="$3" color="$green10" fontWeight="600">
                DECIDE
              </SizableText>
              <SizableText size="$2" color="$green11">
                Optimize top 20%
              </SizableText>
              <SizableText size="$2" color="$green11">
                Fix or improve middle
              </SizableText>
              <SizableText size="$2" color="$green11">
                Kill bottom 20%
              </SizableText>
            </YStack>
          </XStack>
        </YStack>
      </Card>
    </YStack>
  )
}

function ProductScoringSection() {
  const criteria = [
    { label: 'Revenue Contribution', description: 'How much does this product generate?' },
    { label: 'Profit Margin', description: 'What is the profit percentage?' },
    { label: 'Customer Satisfaction', description: 'How happy are customers with it?' },
    { label: 'Strategic Alignment', description: 'Does it fit your mission and vision?' },
    { label: 'Scalability', description: 'Can it grow without proportional cost increase?' },
  ]

  return (
    <YStack gap="$4">
      <H3 size="$6">Product Scoring Matrix</H3>
      <SizableText size="$4" color="$color11">
        Rate each product/service on these 5 criteria (1-10 scale):
      </SizableText>
      <YStack gap="$3">
        {criteria.map((item, index) => (
          <Card key={item.label} padding="$4" borderRadius="$4">
            <XStack gap="$3" alignItems="center">
              <YStack
                width={28}
                height={28}
                borderRadius="$2"
                backgroundColor="$green4"
                alignItems="center"
                justifyContent="center"
              >
                <SizableText size="$3" fontWeight="600" color="$green10">
                  {index + 1}
                </SizableText>
              </YStack>
              <YStack flex={1}>
                <SizableText size="$4" fontWeight="600">
                  {item.label}
                </SizableText>
                <Paragraph size="$3" color="$color11">
                  {item.description}
                </Paragraph>
              </YStack>
            </XStack>
          </Card>
        ))}
      </YStack>
    </YStack>
  )
}

function ValueToolsSection() {
  const tools: Array<Omit<ActionCardProps, 'onPress'>> = [
    {
      title: 'Product Brief Template',
      description: 'Document and evaluate each offering systematically',
      icon: <Package size={22} color="$green10" />,
      status: 'coming-soon',
    },
    {
      title: 'Value Metrics Dashboard',
      description: 'Track customer value realization and satisfaction',
      icon: <TrendingUp size={22} color="$green10" />,
      status: 'coming-soon',
    },
    {
      title: 'Customer Feedback',
      description: 'Collect and analyze customer insights continuously',
      icon: <Star size={22} color="$green10" />,
      status: 'coming-soon',
    },
  ]

  return (
    <YStack gap="$4">
      <H3 size="$6">Value Optimization Tools</H3>
      <YStack gap="$3">
        {tools.map((tool) => (
          <ActionCard key={tool.title} {...tool} />
        ))}
      </YStack>
    </YStack>
  )
}

function CriticalActionsSection() {
  const actions = [
    'List all products and services you currently offer',
    'Run a profitability audit on each offering',
    'Score each product using the 5-criteria matrix',
    'Identify your top 20% performers and double down',
    'Create a plan to fix or eliminate bottom performers',
  ]

  return (
    <YStack gap="$4">
      <H3 size="$6">Critical Actions</H3>
      <Card padding="$4" borderRadius="$4">
        <YStack gap="$3">
          {actions.map((action, index) => (
            <XStack key={index} gap="$3" alignItems="flex-start">
              <YStack
                width={24}
                height={24}
                borderRadius="$2"
                backgroundColor="$green4"
                alignItems="center"
                justifyContent="center"
              >
                <SizableText size="$2" fontWeight="600" color="$green10">
                  {index + 1}
                </SizableText>
              </YStack>
              <Paragraph size="$4" color="$color11" flex={1}>
                {action}
              </Paragraph>
            </XStack>
          ))}
        </YStack>
      </Card>
    </YStack>
  )
}

export function CVOScreen() {
  const { isLoading: isUserLoading } = useUser()
  const { isLoading: isSubLoading } = useSubscription()

  return (
    <DashboardLayout activeSection="cvo">
      <YStack gap="$8" maxWidth={900}>
        <CVOHeader />
        <DomainKnowledgePanel domain="cvo" />
        <ProfitabilityAuditSection />
        <ProductScoringSection />
        <ValueToolsSection />
        <CriticalActionsSection />
      </YStack>
    </DashboardLayout>
  )
}
