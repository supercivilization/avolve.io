'use client'

import {
  BookOpen,
  Compass,
  Cpu,
  LayoutDashboard,
  Users,
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
import { useRouter as useNextRouter } from 'next/router'
import { Link, useLink } from 'solito/link'

import { useSubscription } from 'app/utils/subscription'

export type DashboardSection = 'overview' | 'training' | 'techniques' | 'tools' | 'connect'

interface DashboardLayoutProps {
  children: React.ReactNode
  activeSection?: DashboardSection
}

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  description?: string
  isActive?: boolean
  disabled?: boolean
}

function NavItem({ href, icon, label, description, isActive, disabled }: NavItemProps) {
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
        <SizableText
          size="$4"
          fontWeight={isActive ? '600' : '400'}
          color={isActive ? '$color12' : '$color11'}
        >
          {label}
        </SizableText>
        {description && (
          <SizableText size="$2" color="$color10">
            {description}
          </SizableText>
        )}
      </YStack>
    </XStack>
  )
}

function DashboardNav({ activeSection }: { activeSection?: DashboardSection }) {
  const { tier, hasAccess } = useSubscription()

  const navItems: Array<NavItemProps & { section: DashboardSection }> = [
    {
      section: 'overview',
      href: '/dashboard',
      icon: <LayoutDashboard size={20} color="$color11" />,
      label: 'Overview',
      description: 'Your progress at a glance',
    },
    {
      section: 'training',
      href: '/dashboard/training',
      icon: <BookOpen size={20} color="$color11" />,
      label: 'Training',
      description: 'The Map - Knowledge & docs',
    },
    {
      section: 'techniques',
      href: '/dashboard/techniques',
      icon: <Compass size={20} color="$color11" />,
      label: 'Techniques',
      description: 'The Method - Playbooks & SOPs',
    },
    {
      section: 'tools',
      href: '/dashboard/tools',
      icon: <Cpu size={20} color="$color11" />,
      label: 'Tools',
      description: 'The Lever - Templates & code',
    },
    {
      section: 'connect',
      href: '/dashboard/connect',
      icon: <Users size={20} color="$color11" />,
      label: 'Connect',
      description: 'The Artist - Expert guidance',
      disabled: !hasAccess('technician_office_hours'),
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

export function DashboardLayout({ children, activeSection = 'overview' }: DashboardLayoutProps) {
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
        <DashboardNav activeSection={activeSection} />

        <YStack flex={1} />

        {/* Bottom section */}
        <Separator />
        <YStack gap="$2">
          <NavItem
            href="/settings"
            icon={<Cpu size={18} color="$color10" />}
            label="Settings"
          />
          <NavItem
            href="/profile"
            icon={<Users size={18} color="$color10" />}
            label="Profile"
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
