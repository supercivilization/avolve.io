'use client'

import {
  Avatar,
  Button,
  Card,
  CardSkeleton,
  H2,
  H4,
  Input,
  ListItemSkeleton,
  Paragraph,
  Separator,
  SizableText,
  Skeleton,
  Spinner,
  XStack,
  YStack,
} from '@my/ui'
import { Mail, Plus, Shield, Trash2, UserPlus, Users } from '@tamagui/lucide-icons'
import { useState } from 'react'

import { useSubscription } from 'app/utils/subscription'
import { FeatureGate } from 'app/utils/subscription/FeatureGate'
import { useTeam, type TeamMember } from '../hooks/useTeam'

function TeamSkeleton() {
  return (
    <YStack flex={1} padding="$4" gap="$6" maxWidth={800}>
      <YStack gap="$2">
        <Skeleton width={80} height={32} variant="title" />
        <Skeleton width={280} height={16} />
      </YStack>
      <CardSkeleton />
      <Card padding="$5" bordered>
        <YStack gap="$4">
          <Skeleton width={150} height={24} />
          <Skeleton width="100%" height={1} />
          <YStack gap="$1">
            <ListItemSkeleton />
            <ListItemSkeleton />
            <ListItemSkeleton />
          </YStack>
        </YStack>
      </Card>
    </YStack>
  )
}

function MemberRow({
  member,
  isOwner,
  onRemove,
  isRemoving,
}: {
  member: TeamMember
  isOwner: boolean
  onRemove?: (id: string) => void
  isRemoving?: boolean
}) {
  const roleColors = {
    owner: '$purple10' as const,
    admin: '$blue10' as const,
    member: '$color10' as const,
  }

  return (
    <XStack
      justifyContent="space-between"
      alignItems="center"
      padding="$3"
      borderRadius="$3"
      hoverStyle={{ backgroundColor: '$color2' }}
    >
      <XStack gap="$3" alignItems="center" flex={1}>
        <Avatar circular size="$4">
          {member.avatarUrl ? (
            <Avatar.Image src={member.avatarUrl} />
          ) : (
            <Avatar.Fallback backgroundColor="$color5" alignItems="center" justifyContent="center">
              <SizableText size="$3" fontWeight="600">
                {member.name?.charAt(0) || member.email.charAt(0).toUpperCase()}
              </SizableText>
            </Avatar.Fallback>
          )}
        </Avatar>
        <YStack>
          <SizableText size="$4" fontWeight="500">
            {member.name || member.email}
          </SizableText>
          <SizableText size="$2" color="$color10">
            {member.email}
          </SizableText>
        </YStack>
      </XStack>

      <XStack gap="$3" alignItems="center">
        <XStack
          backgroundColor="$color3"
          paddingHorizontal="$2"
          paddingVertical="$1"
          borderRadius="$2"
        >
          <SizableText size="$1" color={roleColors[member.role]} textTransform="capitalize">
            {member.role}
          </SizableText>
        </XStack>

        {isOwner && member.role !== 'owner' && onRemove && (
          <Button
            size="$2"
            chromeless
            circular
            disabled={isRemoving}
            onPress={() => onRemove(member.id)}
            icon={isRemoving ? <Spinner size="small" /> : <Trash2 size={14} color="$red10" />}
          />
        )}
      </XStack>
    </XStack>
  )
}

function InviteMemberForm({ onInvite }: { onInvite: (email: string) => void }) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!email) return
    setIsLoading(true)
    await onInvite(email)
    setEmail('')
    setIsLoading(false)
  }

  return (
    <XStack gap="$3" alignItems="center">
      <Input
        flex={1}
        size="$4"
        placeholder="email@example.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button
        size="$4"
        theme="active"
        onPress={handleSubmit}
        disabled={isLoading || !email}
        icon={isLoading ? <Spinner /> : <UserPlus size={16} />}
      >
        Invite
      </Button>
    </XStack>
  )
}

function TeamUpgradePrompt() {
  return (
    <Card padding="$6" bordered backgroundColor="$color2">
      <YStack alignItems="center" gap="$4">
        <YStack
          width={64}
          height={64}
          borderRadius={32}
          backgroundColor="$blue4"
          alignItems="center"
          justifyContent="center"
        >
          <Users size={32} color="$blue10" />
        </YStack>
        <YStack alignItems="center" gap="$2">
          <H4 size="$6" fontWeight="600" textAlign="center">
            Team Features
          </H4>
          <Paragraph size="$4" color="$color11" textAlign="center" maxWidth={400}>
            Upgrade to Collective PRO to invite team members, collaborate on projects,
            and access team-only features.
          </Paragraph>
        </YStack>
        <Button
          size="$4"
          theme="active"
          onPress={() => {
            window.location.href = '/pricing'
          }}
        >
          Upgrade to PRO
        </Button>
      </YStack>
    </Card>
  )
}

export function TeamScreen() {
  const { hasAccess, isLoading: isLoadingSubscription } = useSubscription()
  const {
    organization,
    members,
    isLoading: isLoadingTeam,
    isOwner,
    canInvite,
    seatLimit,
    seatsUsed,
    inviteMember,
    removeMember,
    isInviting,
    isRemoving,
    inviteError,
  } = useTeam()

  // Check if user has team access (Collective PRO or higher)
  const hasTeamAccess = hasAccess('team_workspace')
  const isLoading = isLoadingSubscription || isLoadingTeam

  if (isLoading) {
    return <TeamSkeleton />
  }

  const maxSeats = seatLimit === 0 ? -1 : seatLimit
  const usedSeats = seatsUsed

  const handleInvite = async (email: string) => {
    try {
      await inviteMember({ email, role: 'member' })
    } catch (error) {
      console.error('Failed to invite:', error)
    }
  }

  const handleRemove = async (memberId: string) => {
    try {
      await removeMember(memberId)
    } catch (error) {
      console.error('Failed to remove member:', error)
    }
  }

  if (!hasTeamAccess) {
    return (
      <YStack flex={1} padding="$4" gap="$6" maxWidth={800}>
        <YStack gap="$2">
          <H2 size="$8" fontWeight="700">
            Team
          </H2>
          <Paragraph size="$4" color="$color11">
            Manage your team members and invitations
          </Paragraph>
        </YStack>
        <TeamUpgradePrompt />
      </YStack>
    )
  }

  return (
    <YStack flex={1} padding="$4" gap="$6" maxWidth={800}>
      <YStack gap="$2">
        <H2 size="$8" fontWeight="700">
          Team
        </H2>
        <Paragraph size="$4" color="$color11">
          Manage your team members and invitations
        </Paragraph>
      </YStack>

      {/* Seat Usage */}
      <Card padding="$4" bordered>
        <XStack justifyContent="space-between" alignItems="center">
          <YStack>
            <SizableText size="$4" fontWeight="600">
              Seats
            </SizableText>
            <SizableText size="$2" color="$color10">
              {usedSeats} of {maxSeats === -1 ? 'unlimited' : maxSeats} used
            </SizableText>
          </YStack>
          {maxSeats !== -1 && (
            <YStack alignItems="flex-end">
              <XStack
                width={100}
                height={8}
                backgroundColor="$color4"
                borderRadius="$4"
                overflow="hidden"
              >
                <YStack
                  width={`${Math.min((usedSeats / maxSeats) * 100, 100)}%`}
                  height="100%"
                  backgroundColor={usedSeats >= maxSeats ? '$red10' : '$green10'}
                />
              </XStack>
            </YStack>
          )}
        </XStack>
      </Card>

      {/* Invite Section */}
      <Card padding="$5" bordered>
        <YStack gap="$4">
          <XStack gap="$3" alignItems="center">
            <Mail size={20} color="$color11" />
            <H4 size="$5" fontWeight="600">
              Invite Members
            </H4>
          </XStack>
          <Separator />
          <InviteMemberForm onInvite={handleInvite} />
          {maxSeats !== -1 && usedSeats >= maxSeats && (
            <Paragraph size="$2" color="$red10">
              You've reached your seat limit. Upgrade to add more members.
            </Paragraph>
          )}
        </YStack>
      </Card>

      {/* Members List */}
      <Card padding="$5" bordered>
        <YStack gap="$4">
          <XStack gap="$3" alignItems="center">
            <Shield size={20} color="$color11" />
            <H4 size="$5" fontWeight="600">
              Team Members
            </H4>
          </XStack>
          <Separator />
          <YStack gap="$1">
            {members.map((member) => (
              <MemberRow
                key={member.id}
                member={member}
                isOwner={isOwner}
                onRemove={handleRemove}
                isRemoving={isRemoving}
              />
            ))}
          </YStack>
        </YStack>
      </Card>
    </YStack>
  )
}
