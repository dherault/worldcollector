import { Box, Button, HStack, Icon, IconButton, StatusBar, Text } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { getHeaderTitle } from '@react-navigation/elements'

function Header({ navigation, route, options }) {
  const title = getHeaderTitle(options, route.name)

  return (
    <>
      <StatusBar
        animated
        backgroundColor="brand.500"
      />
      <Box
        safeAreaTop
        bg="brand.500"
      />
      <HStack
        bg="brand.500"
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
                size="lg"
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
        <Button>
          Collect
        </Button>
      </HStack>
    </>
  )
}

export default Header
