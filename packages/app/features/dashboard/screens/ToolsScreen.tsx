'use client'

import { ChevronRight, Code2, Cpu, Download, Layout, Settings2 } from '@tamagui/lucide-icons'
import {
  Button,
  Card,
  H2,
  H3,
  Paragraph,
  SizableText,
  XStack,
  YStack,
} from '@my/ui'
import { useLink } from 'solito/link'

import { FeatureGate } from 'app/utils/subscription'
import { DashboardLayout } from '../components/DashboardLayout'

interface ToolItemProps {
  title: string
  description: string
  type: 'template' | 'component' | 'config' | 'automation'
  downloads?: number
  href: string
}

function ToolItem({ title, description, type, downloads, href }: ToolItemProps) {
  const linkProps = useLink({ href })
  const icons = {
    template: Layout,
    component: Code2,
    config: Settings2,
    automation: Cpu,
  }
  const Icon = icons[type]

  return (
    <Card
      {...linkProps}
      padding="$4"
      borderRadius="$3"
      hoverStyle={{ backgroundColor: '$color3' }}
      pressStyle={{ scale: 0.99 }}
      cursor="pointer"
    >
      <XStack gap="$3" alignItems="center">
        <XStack
          width={40}
          height={40}
          borderRadius="$2"
          backgroundColor="$orange3"
          alignItems="center"
          justifyContent="center"
        >
          <Icon size={20} color="$orange11" />
        </XStack>
        <YStack flex={1} gap="$1">
          <XStack gap="$2" alignItems="center">
            <SizableText size="$4" fontWeight="600">
              {title}
            </SizableText>
            <XStack
              backgroundColor="$color3"
              paddingHorizontal="$2"
              paddingVertical="$1"
              borderRadius="$2"
            >
              <SizableText size="$1" color="$color10" textTransform="capitalize">
                {type}
              </SizableText>
            </XStack>
          </XStack>
          <SizableText size="$2" color="$color10" numberOfLines={1}>
            {description}
          </SizableText>
        </YStack>
        {downloads && (
          <XStack alignItems="center" gap="$1">
            <Download size={14} color="$color10" />
            <SizableText size="$2" color="$color10">
              {downloads.toLocaleString()}
            </SizableText>
          </XStack>
        )}
        <ChevronRight size={18} color="$color10" />
      </XStack>
    </Card>
  )
}

function ToolCategory({
  title,
  description,
  items,
}: {
  title: string
  description: string
  items: ToolItemProps[]
}) {
  return (
    <YStack gap="$3">
      <YStack gap="$1">
        <H3 size="$5">{title}</H3>
        <Paragraph size="$3" color="$color10">
          {description}
        </Paragraph>
      </YStack>
      <YStack gap="$2">
        {items.map((item) => (
          <ToolItem key={item.title} {...item} />
        ))}
      </YStack>
    </YStack>
  )
}

export function ToolsScreen() {
  // Sample tools - would be fetched from database
  const templates: ToolItemProps[] = [
    {
      title: 'Landing Page Template',
      description: 'High-converting landing page with Tamagui components',
      type: 'template',
      downloads: 1247,
      href: '/dashboard/tools/landing-template',
    },
    {
      title: 'Dashboard Starter',
      description: 'Full-featured admin dashboard template',
      type: 'template',
      downloads: 892,
      href: '/dashboard/tools/dashboard-template',
    },
    {
      title: 'E-commerce Store',
      description: 'Complete storefront with cart and checkout',
      type: 'template',
      downloads: 634,
      href: '/dashboard/tools/ecommerce-template',
    },
  ]

  const components: ToolItemProps[] = [
    {
      title: 'Authentication Forms',
      description: 'Sign in, sign up, password reset components',
      type: 'component',
      downloads: 2341,
      href: '/dashboard/tools/auth-components',
    },
    {
      title: 'Data Tables',
      description: 'Sortable, filterable, paginated tables',
      type: 'component',
      downloads: 1876,
      href: '/dashboard/tools/data-tables',
    },
    {
      title: 'Charts & Analytics',
      description: 'Beautiful charts for your dashboards',
      type: 'component',
      downloads: 1543,
      href: '/dashboard/tools/charts',
    },
  ]

  const configs: ToolItemProps[] = [
    {
      title: 'ESLint + Prettier Config',
      description: 'Opinionated code style configuration',
      type: 'config',
      downloads: 3421,
      href: '/dashboard/tools/eslint-config',
    },
    {
      title: 'TypeScript Config',
      description: 'Strict TypeScript configuration for monorepos',
      type: 'config',
      downloads: 2198,
      href: '/dashboard/tools/tsconfig',
    },
    {
      title: 'CI/CD Workflows',
      description: 'GitHub Actions for testing and deployment',
      type: 'config',
      downloads: 1654,
      href: '/dashboard/tools/cicd',
    },
  ]

  const automations: ToolItemProps[] = [
    {
      title: 'Email Sequences',
      description: 'Pre-built email automation workflows',
      type: 'automation',
      downloads: 876,
      href: '/dashboard/tools/email-automations',
    },
    {
      title: 'Supabase Functions',
      description: 'Edge functions for common tasks',
      type: 'automation',
      downloads: 654,
      href: '/dashboard/tools/supabase-functions',
    },
    {
      title: 'Stripe Integration',
      description: 'Payment and subscription automation',
      type: 'automation',
      downloads: 543,
      href: '/dashboard/tools/stripe-integration',
    },
  ]

  return (
    <DashboardLayout activeSection="tools">
      <YStack gap="$8" maxWidth={900}>
        {/* Header */}
        <YStack gap="$3">
          <XStack alignItems="center" gap="$2">
            <Cpu size={28} color="$orange10" />
            <H2 size="$8">Tools</H2>
          </XStack>
          <Paragraph size="$5" color="$color11">
            The Lever — Templates, components, and code to accelerate your build.
          </Paragraph>
        </YStack>

        {/* Templates */}
        <ToolCategory
          title="Templates"
          description="Production-ready project starters"
          items={templates}
        />

        {/* Components */}
        <ToolCategory
          title="Components"
          description="Reusable UI building blocks"
          items={components}
        />

        {/* Configs */}
        <ToolCategory
          title="Configurations"
          description="Best-practice project configurations"
          items={configs}
        />

        {/* Automations - Gated for PRO+ */}
        <FeatureGate feature="technology_premium">
          <ToolCategory
            title="Automations"
            description="Pre-built automation workflows"
            items={automations}
          />
        </FeatureGate>
      </YStack>
    </DashboardLayout>
  )
}
