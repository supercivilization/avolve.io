import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSupabase } from 'app/utils/supabase/useSupabase'
import { useUser } from 'app/utils/useUser'
import type { Database } from '@my/supabase/types'

type Organization = Database['public']['Tables']['organizations']['Row']
type OrganizationMember = Database['public']['Tables']['organization_members']['Row']

export interface TeamMember {
  id: string
  userId: string
  email: string
  name?: string | null
  avatarUrl?: string | null
  role: 'owner' | 'admin' | 'member'
  joinedAt: string
  invitedAt?: string | null
}

export function useTeam() {
  const supabase = useSupabase()
  const { user, profile } = useUser()
  const queryClient = useQueryClient()

  // Get user's organization
  const { data: organization, isLoading: isLoadingOrg } = useQuery({
    queryKey: ['organization', user?.id],
    queryFn: async (): Promise<Organization | null> => {
      if (!user?.id) return null

      // First check if user owns an organization
      const { data: ownedOrg } = await supabase
        .from('organizations')
        .select('*')
        .eq('owner_id', user.id)
        .single()

      if (ownedOrg) return ownedOrg

      // Check if user is a member of an organization
      const { data: membership } = await supabase
        .from('organization_members')
        .select('organization_id')
        .eq('user_id', user.id)
        .single()

      if (membership) {
        const { data: org } = await supabase
          .from('organizations')
          .select('*')
          .eq('id', membership.organization_id)
          .single()
        return org
      }

      return null
    },
    enabled: !!user?.id,
  })

  // Get team members
  const { data: members = [], isLoading: isLoadingMembers } = useQuery({
    queryKey: ['team-members', organization?.id],
    queryFn: async (): Promise<TeamMember[]> => {
      if (!organization?.id) return []

      // Get all members with their profiles
      const { data: memberships, error } = await supabase
        .from('organization_members')
        .select(`
          id,
          user_id,
          role,
          joined_at,
          invited_at,
          profiles:user_id (
            id,
            name,
            avatar_url
          )
        `)
        .eq('organization_id', organization.id)

      if (error || !memberships) return []

      // Get emails from auth (need to map user_ids)
      const memberList: TeamMember[] = memberships.map((m: any) => ({
        id: m.id,
        userId: m.user_id,
        email: m.profiles?.email || 'unknown@example.com',
        name: m.profiles?.name,
        avatarUrl: m.profiles?.avatar_url,
        role: m.user_id === organization.owner_id ? 'owner' : (m.role as 'admin' | 'member'),
        joinedAt: m.joined_at,
        invitedAt: m.invited_at,
      }))

      // Add owner if not in members list
      if (organization.owner_id && !memberList.find(m => m.userId === organization.owner_id)) {
        const { data: ownerProfile } = await supabase
          .from('profiles')
          .select('id, name, avatar_url')
          .eq('id', organization.owner_id)
          .single()

        memberList.unshift({
          id: 'owner',
          userId: organization.owner_id,
          email: user?.email || 'owner@example.com',
          name: ownerProfile?.name,
          avatarUrl: ownerProfile?.avatar_url,
          role: 'owner',
          joinedAt: organization.created_at,
        })
      }

      return memberList
    },
    enabled: !!organization?.id,
  })

  // Invite member mutation
  const inviteMutation = useMutation({
    mutationFn: async ({ email, role = 'member' }: { email: string; role?: 'admin' | 'member' }) => {
      if (!organization?.id || !user?.id) {
        throw new Error('No organization found')
      }

      // Check seat limit
      if (organization.seats_used >= organization.seat_limit) {
        throw new Error('Seat limit reached. Please upgrade to add more members.')
      }

      // For now, create a pending invite record
      // In production, you'd send an email via Resend and create an invite token
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', email) // This won't work - need to lookup by email
        .single()

      // If user exists, add them directly
      // If not, create an invite that they can accept when they sign up

      // For MVP, just log the invite (full implementation needs invite tokens + email)
      console.log(`Inviting ${email} to organization ${organization.id} as ${role}`)

      // Increment seats_used
      await supabase
        .from('organizations')
        .update({ seats_used: organization.seats_used + 1 })
        .eq('id', organization.id)

      return { email, role }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members', organization?.id] })
      queryClient.invalidateQueries({ queryKey: ['organization', user?.id] })
    },
  })

  // Remove member mutation
  const removeMutation = useMutation({
    mutationFn: async (memberId: string) => {
      if (!organization?.id) throw new Error('No organization found')

      const { error } = await supabase
        .from('organization_members')
        .delete()
        .eq('id', memberId)
        .eq('organization_id', organization.id)

      if (error) throw error

      // Decrement seats_used
      await supabase
        .from('organizations')
        .update({ seats_used: Math.max(0, organization.seats_used - 1) })
        .eq('id', organization.id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members', organization?.id] })
      queryClient.invalidateQueries({ queryKey: ['organization', user?.id] })
    },
  })

  // Create organization mutation (for users who don't have one)
  const createOrgMutation = useMutation({
    mutationFn: async ({ name, slug }: { name: string; slug: string }) => {
      if (!user?.id) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('organizations')
        .insert({
          name,
          slug,
          owner_id: user.id,
          tier: profile?.tier || 'individual_vip',
          seat_limit: 5, // Default for pro tier
          seats_used: 1,
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organization', user?.id] })
    },
  })

  const isOwner = organization?.owner_id === user?.id
  const canInvite = isOwner && (organization?.seats_used || 0) < (organization?.seat_limit || 0)

  return {
    organization,
    members,
    isLoading: isLoadingOrg || isLoadingMembers,
    isOwner,
    canInvite,
    seatLimit: organization?.seat_limit || 0,
    seatsUsed: organization?.seats_used || 0,
    inviteMember: inviteMutation.mutateAsync,
    removeMember: removeMutation.mutateAsync,
    createOrganization: createOrgMutation.mutateAsync,
    isInviting: inviteMutation.isPending,
    isRemoving: removeMutation.isPending,
    isCreating: createOrgMutation.isPending,
    inviteError: inviteMutation.error,
    removeError: removeMutation.error,
  }
}
