'use client'

import {
  Button,
  Card,
  CardSkeleton,
  H2,
  H4,
  Paragraph,
  Separator,
  SizableText,
  Skeleton,
  Spinner,
  XStack,
  YStack,
} from '@my/ui'
import { CreditCard, ExternalLink, Settings, User } from '@tamagui/lucide-icons'
import { useState } from 'react'

import { useSubscription } from 'app/utils/subscription'
import { useUser } from 'app/utils/useUser'

function SettingsSkeleton() {
  return (
    <YStack flex={1} padding="$4" gap="$6" maxWidth={800}>
      <YStack gap="$2">
        <Skeleton width={120} height={32} variant="title" />
        <Skeleton width={280} height={16} />
      </YStack>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </YStack>
  )
}

export function SettingsScreen() {
  const { user, isLoading: isUserLoading } = useUser()
  const { tier, tierConfig, status, isSubscribed, isLoading: isSubLoading } = useSubscription()
  const [isLoadingPortal, setIsLoadingPortal] = useState(false)

  const isLoading = isUserLoading || isSubLoading

  if (isLoading) {
    return <SettingsSkeleton />
  }

  const handleManageBilling = async () => {
    setIsLoadingPortal(true)
    try {
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to open billing portal')
      }

      window.location.href = data.url
    } catch (error) {
      console.error('Error opening billing portal:', error)
      setIsLoadingPortal(false)
    }
  }

  return (
    <YStack flex={1} padding="$4" gap="$6" maxWidth={800}>
      <YStack gap="$2">
        <H2 size="$8" fontWeight="700">
          Settings
        </H2>
        <Paragraph size="$4" color="$color11">
          Manage your account and subscription
        </Paragraph>
      </YStack>

      {/* Account Section */}
      <Card padding="$5" bordered>
        <YStack gap="$4">
          <XStack gap="$3" alignItems="center">
            <User size={20} color="$color11" />
            <H4 size="$5" fontWeight="600">
              Account
            </H4>
          </XStack>

          <Separator />

          <YStack gap="$3">
            <XStack justifyContent="space-between" alignItems="center">
              <SizableText size="$4" color="$color11">
                Email
              </SizableText>
              <SizableText size="$4" fontWeight="500">
                {user?.email || 'Not set'}
              </SizableText>
            </XStack>

            <XStack justifyContent="space-between" alignItems="center">
              <SizableText size="$4" color="$color11">
                User ID
              </SizableText>
              <SizableText size="$3" fontFamily="$mono" color="$color10">
                {user?.id?.slice(0, 8)}...
              </SizableText>
            </XStack>
          </YStack>
        </YStack>
      </Card>

      {/* Subscription Section */}
      <Card padding="$5" bordered>
        <YStack gap="$4">
          <XStack gap="$3" alignItems="center">
            <CreditCard size={20} color="$color11" />
            <H4 size="$5" fontWeight="600">
              Subscription
            </H4>
          </XStack>

          <Separator />

          <YStack gap="$3">
            <XStack justifyContent="space-between" alignItems="center">
              <SizableText size="$4" color="$color11">
                Current Plan
              </SizableText>
              <XStack gap="$2" alignItems="center">
                <SizableText size="$4" fontWeight="600">
                  {tierConfig?.name || 'Free'}
                </SizableText>
                {status && (
                  <XStack
                    backgroundColor={status === 'active' ? '$green4' : '$yellow4'}
                    paddingHorizontal="$2"
                    paddingVertical="$1"
                    borderRadius="$2"
                  >
                    <SizableText
                      size="$1"
                      color={status === 'active' ? '$green11' : '$yellow11'}
                      textTransform="capitalize"
                    >
                      {status}
                    </SizableText>
                  </XStack>
                )}
              </XStack>
            </XStack>

            {tierConfig && (
              <XStack justifyContent="space-between" alignItems="center">
                <SizableText size="$4" color="$color11">
                  Price
                </SizableText>
                <SizableText size="$4">
                  ${tierConfig.monthlyPrice}/month
                </SizableText>
              </XStack>
            )}

            {isSubscribed && (
              <YStack gap="$3" marginTop="$2">
                <Button
                  size="$4"
                  theme="active"
                  onPress={handleManageBilling}
                  disabled={isLoadingPortal}
                  icon={isLoadingPortal ? <Spinner /> : <ExternalLink size={16} />}
                >
                  {isLoadingPortal ? 'Opening...' : 'Manage Billing'}
                </Button>
                <Paragraph size="$2" color="$color10" textAlign="center">
                  Update payment method, view invoices, or cancel subscription
                </Paragraph>
              </YStack>
            )}

            {!isSubscribed && (
              <YStack gap="$3" marginTop="$2">
                <Button
                  size="$4"
                  theme="active"
                  onPress={() => {
                    window.location.href = '/pricing'
                  }}
                >
                  Upgrade to Pro
                </Button>
                <Paragraph size="$2" color="$color10" textAlign="center">
                  Get access to all features and priority support
                </Paragraph>
              </YStack>
            )}
          </YStack>
        </YStack>
      </Card>

      {/* Preferences Section */}
      <Card padding="$5" bordered>
        <YStack gap="$4">
          <XStack gap="$3" alignItems="center">
            <Settings size={20} color="$color11" />
            <H4 size="$5" fontWeight="600">
              Preferences
            </H4>
          </XStack>

          <Separator />

          <YStack gap="$3">
            <XStack justifyContent="space-between" alignItems="center">
              <YStack>
                <SizableText size="$4">Email Notifications</SizableText>
                <SizableText size="$2" color="$color10">
                  Receive updates about your account
                </SizableText>
              </YStack>
              {/* Add Switch component here when needed */}
            </XStack>
          </YStack>
        </YStack>
      </Card>
    </YStack>
  )
}
