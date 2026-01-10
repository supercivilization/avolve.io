'use client'

import {
  DollarSign,
  PiggyBank,
  TrendingUp,
  Wallet,
  ArrowRight,
  CheckCircle,
  Fuel,
  Calculator,
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
import { useLink } from 'solito/link'

import { useUser } from 'app/utils/useUser'
import { useSubscription } from 'app/utils/subscription'
import { DashboardLayout } from '../components/DashboardLayout'
import { DomainKnowledgePanel } from 'app/features/brain'

interface ActionCardProps {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  status?: 'complete' | 'in-progress' | 'not-started'
}

function ActionCard({ title, description, href, icon, status = 'not-started' }: ActionCardProps) {
  const linkProps = useLink({ href })

  return (
    <Card
      {...linkProps}
      padding="$4"
      borderRadius="$4"
      hoverStyle={{ backgroundColor: '$color3' }}
      pressStyle={{ scale: 0.98 }}
      animation="quick"
      cursor="pointer"
    >
      <XStack gap="$3" alignItems="center">
        <YStack
          width={44}
          height={44}
          borderRadius="$3"
          backgroundColor="$yellow4"
          alignItems="center"
          justifyContent="center"
        >
          {icon}
        </YStack>
        <YStack flex={1} gap="$1">
          <SizableText size="$4" fontWeight="600">
            {title}
          </SizableText>
          <Paragraph size="$3" color="$color11">
            {description}
          </Paragraph>
        </YStack>
        {status === 'complete' ? (
          <CheckCircle size={20} color="$green10" />
        ) : (
          <ArrowRight size={18} color="$color10" />
        )}
      </XStack>
    </Card>
  )
}

function CFOHeader() {
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
          backgroundColor="$yellow4"
          alignItems="center"
          justifyContent="center"
        >
          <Fuel size={28} color="$yellow10" />
        </YStack>
        <YStack>
          <SizableText size="$3" color="$yellow10" fontWeight="600">
            THE FUEL TANKS
          </SizableText>
          <H2 size="$8">CFO — Funds</H2>
        </YStack>
      </XStack>
      <Paragraph size="$5" color="$color11" maxWidth={600}>
        Cash flow and financial management. The fuel that keeps your business running. Without
        proper fuel management, even the best airplane will crash.
      </Paragraph>
    </YStack>
  )
}

function FiveAccountsSection() {
  const accounts = [
    {
      name: 'Operating Expense',
      purpose: 'Day-to-day business expenses',
      allocation: '30%',
      description: 'Rent, software, contractors, marketing spend',
    },
    {
      name: 'Personal Checking',
      purpose: 'Owner compensation',
      allocation: '50%',
      description: 'Your salary - pay yourself consistently',
    },
    {
      name: 'Tax Account',
      purpose: 'Tax reserves',
      allocation: '15%',
      description: 'Set aside for quarterly and annual taxes',
    },
    {
      name: 'Profit Account',
      purpose: 'Business profit',
      allocation: '5%',
      description: 'Profit FIRST - the reward for building value',
    },
    {
      name: 'Investment Holdings',
      purpose: 'Growth capital',
      allocation: 'Variable',
      description: 'Funds for strategic investments and opportunities',
    },
  ]

  return (
    <YStack gap="$4">
      <XStack justifyContent="space-between" alignItems="center">
        <H3 size="$6">5 Accounts System</H3>
        <Button size="$3" theme="yellow" icon={<Wallet size={16} />}>
          Setup Accounts
        </Button>
      </XStack>
      <Card padding="$4" borderRadius="$4" backgroundColor="$yellow3">
        <Paragraph size="$4" color="$yellow11" marginBottom="$4">
          Based on "Profit First" by Mike Michalowicz. Allocate every dollar that comes in across
          these 5 accounts on the 10th and 25th of each month.
        </Paragraph>
      </Card>
      <YStack gap="$3">
        {accounts.map((account, index) => (
          <Card key={account.name} padding="$4" borderRadius="$4">
            <XStack gap="$3" alignItems="flex-start">
              <YStack
                width={28}
                height={28}
                borderRadius="$2"
                backgroundColor="$yellow4"
                alignItems="center"
                justifyContent="center"
              >
                <SizableText size="$3" fontWeight="600" color="$yellow10">
                  {index + 1}
                </SizableText>
              </YStack>
              <YStack flex={1} gap="$1">
                <XStack justifyContent="space-between" alignItems="center">
                  <SizableText size="$4" fontWeight="600">
                    {account.name}
                  </SizableText>
                  <XStack
                    backgroundColor="$yellow4"
                    paddingHorizontal="$2"
                    paddingVertical="$1"
                    borderRadius="$2"
                  >
                    <SizableText size="$2" fontWeight="600" color="$yellow10">
                      {account.allocation}
                    </SizableText>
                  </XStack>
                </XStack>
                <SizableText size="$3" color="$yellow10" fontWeight="500">
                  {account.purpose}
                </SizableText>
                <Paragraph size="$3" color="$color11">
                  {account.description}
                </Paragraph>
              </YStack>
            </XStack>
          </Card>
        ))}
      </YStack>
    </YStack>
  )
}

function ProfitFirstSection() {
  return (
    <YStack gap="$4">
      <H3 size="$6">Profit First Principle</H3>
      <Card padding="$5" borderRadius="$4" backgroundColor="$yellow3">
        <YStack gap="$4">
          <YStack gap="$2">
            <SizableText size="$3" color="$yellow10" fontWeight="600">
              TRADITIONAL FORMULA
            </SizableText>
            <SizableText size="$5" color="$yellow11">
              Revenue - Expenses = Profit
            </SizableText>
          </YStack>
          <YStack gap="$2">
            <SizableText size="$3" color="$yellow10" fontWeight="600">
              PROFIT FIRST FORMULA
            </SizableText>
            <SizableText size="$5" color="$yellow11" fontWeight="600">
              Revenue - Profit = Expenses
            </SizableText>
          </YStack>
          <Paragraph size="$4" color="$yellow11">
            Take your profit FIRST. Then figure out how to operate on what remains. This forces
            efficiency and ensures you always build value.
          </Paragraph>
        </YStack>
      </Card>
    </YStack>
  )
}

function FinanceToolsSection() {
  const tools = [
    {
      title: 'Cash Flow Dashboard',
      description: 'Real-time view of money in, money out, and runway',
      href: '/dashboard/cfo/dashboard',
      icon: <TrendingUp size={22} color="$yellow10" />,
    },
    {
      title: 'Allocation Calculator',
      description: 'Calculate your optimal account allocations',
      href: '/dashboard/cfo/calculator',
      icon: <Calculator size={22} color="$yellow10" />,
    },
    {
      title: 'Profit Tracker',
      description: 'Monitor profit growth over time',
      href: '/dashboard/cfo/profit',
      icon: <PiggyBank size={22} color="$yellow10" />,
    },
  ]

  return (
    <YStack gap="$4">
      <H3 size="$6">Finance Tools</H3>
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
    'Set up 5 separate bank accounts for the allocation system',
    'Implement bi-monthly allocation rhythm (10th and 25th)',
    'Start with 5% profit allocation and increase over time',
    'Track your cash flow weekly - know your numbers',
    'Build 3-6 months of operating expenses as runway',
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
                backgroundColor="$yellow4"
                alignItems="center"
                justifyContent="center"
              >
                <SizableText size="$2" fontWeight="600" color="$yellow10">
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

export function CFOScreen() {
  const { isLoading: isUserLoading } = useUser()
  const { isLoading: isSubLoading } = useSubscription()

  return (
    <DashboardLayout activeSection="cfo">
      <YStack gap="$8" maxWidth={900}>
        <CFOHeader />
        <DomainKnowledgePanel domain="cfo" />
        <FiveAccountsSection />
        <ProfitFirstSection />
        <FinanceToolsSection />
        <CriticalActionsSection />
      </YStack>
    </DashboardLayout>
  )
}
