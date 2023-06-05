import { useRouter } from 'expo-router'
import { Box, HStack, Heading, Icon, IconButton } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'

function Collect() {
  const router = useRouter()

  return (
    <Box
      pt={4}
      position="relative"
    >
      <HStack justifyContent="center">
        <Heading size="xl">Collect</Heading>
      </HStack>
      <Box
        position="absolute"
        top={2.5}
        right={3}
      >
        <IconButton
          bg="transparent"
          _hover={{
            bg: 'grey.600:alpha.20',
          }}
          colorScheme="grey"
          rounded="xl"
          icon={(
            <Icon
              size="xl"
              as={MaterialIcons}
              name="close"
              color="black"
            />
          )}
          onPress={() => router.back()}
        />
      </Box>
    </Box>
  )
}

export default Collect
