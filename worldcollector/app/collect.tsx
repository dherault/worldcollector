import { useRouter } from 'expo-router'
import { Camera, CameraCapturedPicture } from 'expo-camera'
import { Box, Button, HStack, Heading, Icon, IconButton, Image, Input, ScrollView, Text, VStack } from 'native-base'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useCallback, useRef, useState } from 'react'

function Collect() {
  const cameraRef = useRef<Camera | null>(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [picture, setPicture] = useState<CameraCapturedPicture | null>(null)
  const router = useRouter()
  const [permission, requestPermission] = Camera.useCameraPermissions()

  const handleCameraPress = useCallback(async () => {
    setLoading(true)

    const response = await requestPermission()

    if (response.granted) {
      setIsCameraActive(true)
    }

    setLoading(false)
  }, [requestPermission])

  const handleTakePicture = useCallback(async () => {
    if (!cameraRef.current) return

    const picture = await cameraRef.current.takePictureAsync()

    setPicture(picture)

    setIsCameraActive(false)
  }, [])

  const handleCloseCamera = useCallback(() => {
    setIsCameraActive(false)
  }, [])

  const handleRetakePicture = useCallback(() => {
    setPicture(null)
    setIsCameraActive(true)
  }, [])

  const renderOpenCameraButton = useCallback(() => (
    <Button
      mt={2}
      colorScheme="brand"
      onPress={handleCameraPress}
      isLoading={loading}
    >
      Choose or snap
    </Button>
  ), [loading, handleCameraPress])

  const renderPicturePreview = useCallback(() => (
    <>
      <Image
        mt={2}
        width={256}
        height={256}
        source={{ uri: picture?.uri }}
        alt="Picture preview"
      />
      <Text
        onPress={handleRetakePicture}
        mt={1}
        color="brand.500"
      >
        Snap again
      </Text>
    </>
  ), [picture, handleRetakePicture])

  const renderCamera = useCallback(() => (
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
          _hover={{
            bg: 'white.600:alpha.20',
          }}
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
          onPress={handleTakePicture}
        />
      </HStack>
      <Box
        position="absolute"
        top={10}
        right={4}
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
              color="white.500"
            />
          )}
          onPress={handleCloseCamera}
        />
      </Box>
    </Camera>
  ), [handleTakePicture, handleCloseCamera])

  if (isCameraActive && permission.granted) return renderCamera()

  return (
    <Box safeAreaTop>
      <ScrollView>
        <VStack
          pt={4}
          pb={16}
          px={2}
          alignItems="center"
          position="relative"
        >
          <Heading
            size="xl"
            textAlign="center"
          >
            Collect
          </Heading>
          <Heading
            mt={6}
            color="brand.500"
            textAlign="center"
          >
            1
          </Heading>
          <Heading textAlign="center">
            Name your collectible
          </Heading>
          <Text textAlign="center">
            It must be unique, make sure to check its unicity using the search function first.
          </Text>
          <Input
            mt={2}
            width="full"
            value={name}
            onChangeText={setName}
            placeholder="The Statue of Liberty"
          />
          <Heading
            mt={6}
            color="brand.500"
            textAlign="center"
          >
            2
          </Heading>
          <Heading textAlign="center">
            Describe it
          </Heading>
          <Text textAlign="center">
            Be clear and consise.
          </Text>
          <Input
            multiline
            numberOfLines={3}
            mt={2}
            width="full"
            value={description}
            onChangeText={setDescription}
            placeholder="A colossal neoclassical sculpture on Liberty Island in New York Harbor in New York City, in the United States."
          />
          <Heading
            mt={6}
            color="brand.500"
            textAlign="center"
          >
            3
          </Heading>
          <Heading textAlign="center">
            Add a picture
          </Heading>
          <Text textAlign="center">
            Make sure it represents your collectible well.
          </Text>
          {picture ? renderPicturePreview() : renderOpenCameraButton()}
          <Button
            mt={6}
            colorScheme="brand"
            disabled={!(name.trim() && description.trim() && picture)}
          >
            Add it to my collection!
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
      </ScrollView>
    </Box>
  )
}

export default Collect
