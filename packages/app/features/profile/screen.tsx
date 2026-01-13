import { Avatar, Paragraph, Settings, XStack, YStack, getTokens, useWindowDimensions, SizableText } from '@my/ui'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { Brain, Cog, LayoutDashboard, Plane, User } from '@tamagui/lucide-icons'
import { useSafeAreaInsets } from 'app/utils/useSafeAreaInsets'
import { useUser } from 'app/utils/useUser'
import { SolitoImage } from 'solito/image'
import { useLink } from 'solito/link'

export function ProfileScreen(props) {
  const { profile, avatarUrl } = useUser()
  const name = profile?.name
  const insets = useSafeAreaInsets()
  const height = useWindowDimensions().height

  return (
    <DrawerContentScrollView {...props} f={1}>
      <YStack
        maw={600}
        mx="auto"
        w="100%"
        f={1}
        h={height - insets.bottom - insets.top}
        py="$4"
        pb="$2"
      >
        <Settings>
          <Settings.Items>
            <Settings.Group>
              <Settings.Item icon={User} {...useLink({ href: '/profile/edit' })} accentTheme="pink">
                Edit Profile
              </Settings.Item>
              <Settings.Item icon={LayoutDashboard} {...useLink({ href: '/dashboard' })} accentTheme="purple">
                Dashboard
              </Settings.Item>
              <Settings.Item icon={Brain} {...useLink({ href: '/brain' })} accentTheme="blue">
                Brain
              </Settings.Item>
              <Settings.Item icon={Plane} {...useLink({ href: '/ceo' })} accentTheme="green">
                C-Suite Roles
              </Settings.Item>
              <Settings.Item {...useLink({ href: '/settings' })} icon={Cog}>
                Settings
              </Settings.Item>
            </Settings.Group>
          </Settings.Items>
        </Settings>

        <XStack gap="$4" mb="$7" mt="auto" ai="center" px="$4">
          <Avatar circular size="$3">
            <SolitoImage
              src={avatarUrl}
              alt="your avatar"
              width={getTokens().size['3'].val}
              height={getTokens().size['3'].val}
            />
          </Avatar>
          <YStack>
            <SizableText size="$4" fontWeight="600">
              {name ?? 'No Name'}
            </SizableText>
            <SizableText size="$2" color="$color10">
              Solopreneur
            </SizableText>
          </YStack>
        </XStack>
      </YStack>
    </DrawerContentScrollView>
  )
}
