import { useCallback, useContext } from 'react'
import { useNavigation, usePathname, useRouter } from 'expo-router'
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { HStack, Icon, IconButton } from 'native-base'
import { NavigationActions, StackActions } from 'react-navigation'

import ViewerContext from '~contexts/ViewerContext'

const TAB_NONE = -1
const TAB_HOME = 0
const TAB_COLLECT = 1
const TAB_MARKETPLACE = 2
const TAB_COLLECTIBLE = 3
const TAB_SEARCH = 4
const TAB_SETTINGS = 5

const pathnameRegexToTab = {
  '^/$': TAB_HOME,
  '^/collect$': TAB_COLLECT,
  '^/marketplace$': TAB_MARKETPLACE,
  '^/-/': TAB_COLLECTIBLE,
  '^/search': TAB_SEARCH,
  '^/settings': TAB_SETTINGS,
}

const includedTabs = [TAB_HOME, TAB_MARKETPLACE, TAB_COLLECTIBLE, TAB_SEARCH, TAB_SETTINGS]
const homeTabs = [TAB_HOME, TAB_COLLECTIBLE]

function getTab(pathname: string) {
  for (const [regex, tab] of Object.entries(pathnameRegexToTab)) {
    if (new RegExp(regex).test(pathname)) {
      return tab
    }
  }

  return TAB_NONE
}

function TabBar() {
  const { viewer } = useContext(ViewerContext)
  const router = useRouter()
  const pathname = usePathname()
  const navigation = useNavigation()

  const tab = getTab(pathname)

  const handleNavigate = useCallback((givenPathname: string) => {
    if (givenPathname === pathname) {
      navigation.dispatch(StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: '(home)' })],
      }))

      return
    }

    router.push(givenPathname)
  }, [router, navigation, pathname])

  if (!includedTabs.includes(tab)) return null
  if (!viewer) return null

  return (
    <HStack
      justifyContent="center"
      position="absolute"
      bottom={0}
      left={0}
      right={0}
    >
      <HStack
        rounded="xl"
        bg="grey.100"
        shadow={4}
        py={2}
        px={4}
        mx={4}
        mb={8}
        justifyContent="center"
      >
        <IconButton
          mr={2}
          bg={tab === TAB_SEARCH ? 'grey.200' : 'transparent'}
          _hover={{
            bg: 'grey.600:alpha.20',
          }}
          colorScheme="grey"
          rounded="xl"
          icon={(
            <Icon
              size="lg"
              as={MaterialIcons}
              name="search"
              color={tab === TAB_SEARCH ? 'brand.500' : 'grey.500'}
            />
          )}
          onPress={() => handleNavigate('/search')}
        />
        <IconButton
          bg={homeTabs.includes(tab) ? 'grey.200' : 'transparent'}
          _hover={{
            bg: 'grey.600:alpha.20',
          }}
          colorScheme="grey"
          rounded="xl"
          icon={(
            <Icon
              size="lg"
              as={MaterialIcons}
              name="home"
              color={homeTabs.includes(tab) ? 'brand.500' : 'grey.500'}
            />
          )}
          onPress={() => handleNavigate('/')}
        />
        <IconButton
          mx={2}
          py={1}
          px={1.5}
          _hover={{
            bg: 'grey.600:alpha.20',
          }}
          colorScheme="grey"
          rounded="xl"
          icon={(
            <Icon
              size={8}
              as={Feather}
              name="plus-circle"
              color="grey.900"
            />
          )}
          onPress={() => handleNavigate('/collect')}
        />
        <IconButton
          bg={tab === TAB_MARKETPLACE ? 'grey.200' : 'transparent'}
          _hover={{
            bg: 'grey.600:alpha.20',
          }}
          colorScheme="grey"
          rounded="xl"
          icon={(
            <Icon
              size="lg"
              as={MaterialCommunityIcons}
              name="home-switch"
              color={tab === TAB_MARKETPLACE ? 'brand.500' : 'grey.500'}
            />
          )}
          onPress={() => handleNavigate('/marketplace')}
        />
        <IconButton
          ml={2}
          bg={tab === TAB_SETTINGS ? 'grey.200' : 'transparent'}
          _hover={{
            bg: 'grey.600:alpha.20',
          }}
          colorScheme="grey"
          rounded="xl"
          icon={(
            <Icon
              size="lg"
              as={MaterialIcons}
              name="settings"
              color={tab === TAB_SETTINGS ? 'brand.500' : 'grey.500'}
            />
          )}
          onPress={() => handleNavigate('/settings')}
        />
      </HStack>
    </HStack>
  )
}

export default TabBar
