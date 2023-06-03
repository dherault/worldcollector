import { Box, HStack, Icon, IconButton, StatusBar, Text } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { getHeaderTitle } from '@react-navigation/elements'

function Header({ navigation, route, options }) {
  const title = getHeaderTitle(options, route.name)

  return (
    <>
      <StatusBar
        animated
        backgroundColor="brand.600"
      />
      <Box
        safeAreaTop
        bg="brand.800"
      />
      <HStack
        bg="brand.800"
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
      >
        <HStack alignItems="center">
          <IconButton
            icon={(
              <Icon
                size="md"
                as={MaterialIcons}
                name="menu"
                color="white"
              />
            )}
            onPress={() => navigation.toggleDrawer()}
          />
          <Text
            color="white"
            fontSize="20"
            fontWeight="bold"
          >
            {title}
          </Text>
        </HStack>
      </HStack>
    </>
  )
}

export default Header
