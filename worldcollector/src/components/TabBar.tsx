import { HStack, Icon, IconButton } from 'native-base'
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

function TabBar({ state, descriptors, navigation, router }) {
  return (
    <HStack justifyContent="center">
      <HStack
        rounded="xl"
        bg="grey.100"
        shadow={4}
        py={2}
        px={2}
        mx={4}
        mb={8}
        justifyContent="center"
      >
        <IconButton
          bg={state.index === 0 ? 'grey.200' : 'transparent'}
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
              color={state.index === 0 ? 'brand.500' : 'grey.500'}
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
          bg={state.index === 1 ? 'grey.200' : 'transparent'}
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
              color={state.index === 1 ? 'brand.500' : 'grey.500'}
            />
          )}
          onPress={() => router.push('/marketplace')}
        />
      </HStack>
    </HStack>
  )
}

export default TabBar
