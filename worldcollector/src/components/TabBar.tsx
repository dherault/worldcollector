import { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { usePathname, useRouter } from 'expo-router'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
// import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

// import ViewerContext from '~contexts/ViewerContext'
import TabBarIcon from '~components/TabBarIcon'
import TabBarIconRounded from '~components/TabBarIconRounded'

import theme from '~theme'

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
  // const { viewer } = useContext(ViewerContext)
  const router = useRouter()
  const pathname = usePathname()
  // const navigation = useNavigation()

  const tab = getTab(pathname)

  const handleNavigate = useCallback((givenPathname: string) => {
    if (givenPathname === pathname) {
      // navigation.dispatch(StackActions.reset({
      //   index: 0,
      //   actions: [NavigationActions.navigate({ routeName: '(home)' })],
      // }))

      return
    }

    router.push(givenPathname)
  }, [router, pathname])

  if (!includedTabs.includes(tab)) return null
  // if (!viewer) return null

  return (
    <View style={styles.root}>
      <View style={styles.main}>
        <TabBarIcon active={tab === TAB_SEARCH}>
          <MaterialIcons
            name="search"
            size={24}
            color={tab === TAB_SEARCH ? theme.colors.grey[800] : theme.colors.grey[700]}
          />
        </TabBarIcon>
        <TabBarIcon active={homeTabs.includes(tab)}>
          <MaterialIcons
            name="home"
            size={24}
            color={homeTabs.includes(tab) ? theme.colors.grey[800] : theme.colors.grey[700]}
          />
        </TabBarIcon>
        <View style={styles.plusContainer}>
          <TabBarIconRounded>
            <MaterialCommunityIcons
              name="plus"
              size={32}
              color="white"
            />
          </TabBarIconRounded>
        </View>
        <TabBarIcon active={tab === TAB_MARKETPLACE}>
          <MaterialCommunityIcons
            name="home-switch"
            size={24}
            color={tab === TAB_MARKETPLACE ? theme.colors.grey[800] : theme.colors.grey[700]}
          />
        </TabBarIcon>
        <TabBarIcon active={tab === TAB_SETTINGS}>
          <MaterialIcons
            name="settings"
            size={24}
            color={tab === TAB_SETTINGS ? theme.colors.grey[800] : theme.colors.grey[700]}
          />
        </TabBarIcon>
        {/*
        <IconButton
          mx={2}
          py={1}
          px={2}
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
        /> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    borderRadius: 8,
    backgroundColor: theme.colors.grey[100],
    elevation: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 24,
    // marginHorizontal: 'auto',
    // alignSelf: 'center',
  },
  plusContainer: {
    marginHorizontal: 8,
  },
})

export default TabBar
