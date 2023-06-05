import { HStack, Icon, IconButton } from 'native-base'
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { usePathname, useRouter } from 'expo-router'
import { useContext } from 'react'

import ViewerContext from '~contexts/ViewerContext'

const TAB_HOME = 0
const TAB_COLLECT = 1
const TAB_MARKETPLACE = 2

const pathnameToTab = {
  '/': TAB_HOME,
  '/collect': TAB_COLLECT,
  '/marketplace': TAB_MARKETPLACE,
}

const includedTabs = [TAB_HOME, TAB_MARKETPLACE]

function TabBar() {
  const { viewer } = useContext(ViewerContext)
  const router = useRouter()
  const pathname = usePathname()

  const tab = pathnameToTab[pathname]

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
          bg={tab === TAB_HOME ? 'grey.200' : 'transparent'}
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
              color={tab === TAB_HOME ? 'brand.500' : 'grey.500'}
            />
          )}
          onPress={() => router.push('/')}
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
          onPress={() => router.push('/collect')}
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
          onPress={() => router.push('/marketplace')}
        />
      </HStack>
    </HStack>
  )
}

export default TabBar
