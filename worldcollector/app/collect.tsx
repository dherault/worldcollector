import { useRouter } from 'expo-router'
import { Camera } from 'expo-camera'
import { Box, Button, HStack, Heading, Icon, IconButton, Input, Text, VStack } from 'native-base'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useCallback, useRef, useState } from 'react'

function Collect() {
  const cameraRef = useRef<Camera | null>(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const [isCameraActive, setIsCameraActive] = useState(false)

  const handleCameraPress = useCallback(async () => {
    const response = await requestPermission()

    if (!response.granted) return

    setIsCameraActive(true)
  }, [requestPermission])

  if (isCameraActive && permission.granted) {
    return (
      <Camera
        ref={cameraRef}
        style={{
          flex: 1,
          width: '100%',
          position: 'relative',
        }}
      >
        <HStack
          position="absolute"
          bottom={12}
          left={0}
          right={0}
          justifyContent="center"
        >
          <IconButton
            bg="white.500"
            colorScheme="white"
            rounded="full"
            icon={(
              <Icon
                size={12}
                as={MaterialCommunityIcons}
                name="camera"
                color="brand.500"
              />
            )}
            // onPress={() => router.back()}
          />
        </HStack>
      </Camera>
    )
  }

  return (
    <VStack
      safeAreaTop
      pt={4}
      px={2}
      alignItems="center"
      position="relative"
    >
      <Heading size="xl">Collect</Heading>
      <Heading
        color="brand.500"
        mt={6}
      >
        1
      </Heading>
      <Heading>
        Name your collectible
      </Heading>
      <Text>
        It must be unique, make sure to check its unicity using the search function first.
      </Text>
      <Input
        mt={2}
        width="full"
        value={name}
        onChangeText={setName}
        placeholder="The statue of Liberty"
      />
      <Heading
        color="brand.500"
        mt={6}
      >
        2
      </Heading>
      <Heading>
        Describe it
      </Heading>
      <Text>
        Be clear and consise.
      </Text>
      <Input
        multiline
        numberOfLines={3}
        mt={2}
        width="full"
        value={description}
        onChangeText={setDescription}
        placeholder="The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor in New York City, in the United States."
      />
      <Heading
        color="brand.500"
        mt={6}
      >
        3
      </Heading>
      <Heading>
        Add a picture
      </Heading>
      <Text>
        Make sure it represents your collectible well.
      </Text>
      <Button
        mt={2}
        colorScheme="brand"
        onPress={handleCameraPress}
      >
        Choose or snap
      </Button>
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
    </VStack>
  )
}

export default Collect
