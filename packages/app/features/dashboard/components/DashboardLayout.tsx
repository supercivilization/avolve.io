'use client'

import {
  Plane,
  Zap,
  Layers,
  Cog,
  Fuel,
  LayoutDashboard,
  Settings,
  UsersRound,
} from '@tamagui/lucide-icons'
import {
  Button,
  H4,
  Separator,
  SizableText,
  Theme,
  XStack,
  YStack,
} from '@my/ui'
import { Link, useLink } from 'solito/link'

import { useSubscription } from 'app/utils/subscription'

// C-Suite Framework sections
export type AppSection =
  | 'overview'
  | 'ceo' | 'cmo' | 'cvo' | 'coo' | 'cfo'

// Backwards compatibility alias
export type DashboardSection = AppSection

interface AppLayoutProps {
  children: React.ReactNode
  activeSection?: AppSection
}

// Backwards compatibility alias
export type DashboardLayoutProps = AppLayoutProps

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  sublabel?: string
  description?: string
  isActive?: boolean
  disabled?: boolean
  theme?: string
}

function NavItem({ href, icon, label, sublabel, description, isActive, disabled, theme }: NavItemProps) {
  const linkProps = useLink({ href })

  return (
    <XStack
      {...(disabled ? {} : linkProps)}
      gap="$3"
      padding="$3"
      borderRadius="$4"
      backgroundColor={isActive ? '$color4' : 'transparent'}
      hoverStyle={disabled ? {} : { backgroundColor: '$color3' }}
      pressStyle={disabled ? {} : { backgroundColor: '$color4' }}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      opacity={disabled ? 0.5 : 1}
      alignItems="center"
    >
      <YStack
        width={40}
        height={40}
        borderRadius="$3"
        backgroundColor={isActive ? '$color8' : '$color3'}
        alignItems="center"
        justifyContent="center"
      >
        {icon}
      </YStack>
      <YStack flex={1}>
        <XStack gap="$2" alignItems="center">
          <SizableText
            size="$4"
            fontWeight={isActive ? '600' : '400'}
            color={isActive ? '$color12' : '$color11'}
          >
            {label}
          </SizableText>
          {sublabel && (
            <SizableText size="$2" color="$color10">
              {sublabel}
            </SizableText>
          )}
        </XStack>
        {description && (
          <SizableText size="$2" color="$color10">
            {description}
          </SizableText>
        )}
      </YStack>
    </XStack>
  )
}

function AppNav({ activeSection }: { activeSection?: AppSection }) {
  const { tier, hasAccess } = useSubscription()

  const navItems: Array<NavItemProps & { section: AppSection }> = [
    {
      section: 'overview',
      href: '/',
      icon: <LayoutDashboard size={20} color="$color11" />,
      label: 'Overview',
      description: 'Your business at a glance',
    },
    {
      section: 'ceo',
      href: '/ceo',
      icon: <Plane size={20} color="$purple10" />,
      label: 'Focus',
      sublabel: 'CEO',
      description: 'The Cockpit - Leadership',
      theme: 'purple',
    },
    {
      section: 'cmo',
      href: '/cmo',
      icon: <Zap size={20} color="$blue10" />,
      label: 'Users',
      sublabel: 'CMO',
      description: 'The Engines - Marketing & Sales',
      theme: 'blue',
    },
    {
      section: 'cvo',
      href: '/cvo',
      icon: <Layers size={20} color="$green10" />,
      label: 'Value',
      sublabel: 'CVO',
      description: 'The Wings - Products & Services',
      theme: 'green',
    },
    {
      section: 'coo',
      href: '/coo',
      icon: <Cog size={20} color="$orange10" />,
      label: 'Admin',
      sublabel: 'COO',
      description: 'The Body - Operations',
      theme: 'orange',
    },
    {
      section: 'cfo',
      href: '/cfo',
      icon: <Fuel size={20} color="$yellow10" />,
      label: 'Funds',
      sublabel: 'CFO',
      description: 'The Fuel Tanks - Cash Flow',
      theme: 'yellow',
    },
  ]

  return (
    <YStack gap="$2">
      {navItems.map((item) => (
        <NavItem
          key={item.section}
          {...item}
          isActive={activeSection === item.section}
        />
      ))}
    </YStack>
  )
}

function TierBadge() {
  const { tier, tierConfig } = useSubscription()

  if (!tier || !tierConfig) {
    return (
      <Link href="/pricing">
        <XStack
          backgroundColor="$color3"
          paddingHorizontal="$3"
          paddingVertical="$2"
          borderRadius="$3"
          gap="$2"
          hoverStyle={{ backgroundColor: '$color4' }}
        >
          <SizableText size="$2" color="$color11">
            Free Trial
          </SizableText>
          <SizableText size="$2" color="$blue10" fontWeight="600">
            Upgrade →
          </SizableText>
        </XStack>
      </Link>
    )
  }

  const tierColors: Record<string, string> = {
    individual_vip: 'green',
    collective_pro: 'blue',
    ecosystem_ceo: 'purple',
  }

  return (
    <Theme name={tierColors[tier] as any}>
      <XStack
        backgroundColor="$color4"
        paddingHorizontal="$3"
        paddingVertical="$2"
        borderRadius="$3"
      >
        <SizableText size="$2" fontWeight="600" color="$color11">
          {tierConfig.name}
        </SizableText>
      </XStack>
    </Theme>
  )
}

export function AppLayout({ children, activeSection = 'overview' }: AppLayoutProps) {
  return (
    <XStack flex={1} backgroundColor="$background">
      {/* Sidebar - Desktop */}
      <YStack
        width={280}
        borderRightWidth={1}
        borderRightColor="$borderColor"
        padding="$4"
        gap="$4"
        $sm={{ display: 'none' }}
      >
        {/* Logo/Brand */}
        <XStack paddingHorizontal="$2" gap="$2" alignItems="center">
          <H4>Avolve</H4>
          <TierBadge />
        </XStack>

        <Separator />

        {/* Navigation */}
        <AppNav activeSection={activeSection} />

        <YStack flex={1} />

        {/* Bottom section */}
        <Separator />
        <YStack gap="$2">
          <NavItem
            href="/team"
            icon={<UsersRound size={18} color="$color10" />}
            label="Team"
          />
          <NavItem
            href="/settings"
            icon={<Settings size={18} color="$color10" />}
            label="Settings"
          />
        </YStack>
      </YStack>

      {/* Main Content */}
      <YStack flex={1} padding="$4">
        {children}
      </YStack>
    </XStack>
  )
}

// Backwards compatibility alias
export const DashboardLayout = AppLayout
