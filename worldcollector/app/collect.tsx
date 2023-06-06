import { useCallback, useContext, useState } from 'react'
import { useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { MaterialIcons } from '@expo/vector-icons'
import { Box, Button, Heading, Icon, IconButton, Image, Input, ScrollView, Text, VStack } from 'native-base'
import { nanoid } from 'nanoid'
import { ref, uploadString } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'

import { Collectible, CollectibleStatus } from '~types'

import { db, storage } from '~firebase'

import ViewerContext from '~contexts/ViewerContext'

const pictureOptions = {
  allowsMultipleSelection: false,
  quality: 1,
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  base64: true,
}

const actionSheetOptions = ['Take photo...', 'Choose from Library...', 'Cancel']
const cancelButtonIndex = 2

function Collect() {
  const { viewer } = useContext(ViewerContext)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [nameError, setNameError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const [picture, setPicture] = useState<ImagePicker.ImagePickerAsset | null>(null)
  const [pictureError, setPictureError] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()
  const { showActionSheetWithOptions } = useActionSheet()

  const handlePictureEnd = useCallback(async (isCamera: boolean) => {
    const result = await (isCamera ? ImagePicker.launchCameraAsync(pictureOptions) : ImagePicker.launchImageLibraryAsync(pictureOptions))

    if (result.canceled) return
    if (!result.assets?.length) return

    setPicture(result.assets[0])
  }, [])

  const handlePictureStart = useCallback(() => {
    showActionSheetWithOptions({
      options: actionSheetOptions,
      cancelButtonIndex,
    },
    selectedIndex => {
      switch (selectedIndex) {
        case 0:
          handlePictureEnd(true)
          break
        case 1:
          handlePictureEnd(false)
          break
      }
    })
  }, [showActionSheetWithOptions, handlePictureEnd])

  const handleSubmit = useCallback(async () => {
    setNameError('')
    setDescriptionError('')
    setPictureError('')

    let isError = false
    const safeName = name.trim()
    const safeDescription = description.trim()

    if (!safeName) {
      setNameError('You must add a name')

      isError = true
    }

    if (!safeDescription) {
      setDescriptionError('You must add a description')

      isError = true
    }

    if (!picture) {
      setPictureError('You must add a picture')

      isError = true
    }

    if (isError) return

    setLoading(true)

    const id = nanoid()
    const now = new Date().toISOString()

    try {
      console.log('picture.base64', picture.base64)
      const snapshot = await uploadString(ref(storage, `collectible-images/${id}`), picture.base64, 'base64')

      const collectible: Collectible = {
        id,
        name: safeName,
        description: safeDescription,
        ownerId: viewer.id,
        userId: viewer.id,
        status: CollectibleStatus.pending,
        imageStoragePath: snapshot.metadata.fullPath,
        createdAt: now,
        updatedAt: now,
      }

      await setDoc(doc(db, `collectibles/${id}`), collectible)

      router.push(`-/${id}`)
    }
    catch (error) {
      setError(true)
      setLoading(false)
    }

  }, [name, description, picture, viewer, router])

  return (
    <Box safeAreaTop>
      <ScrollView>
        <VStack
          pt={4}
          pb={16}
          px={4}
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
          {picture ? (
            <>
              <Image
                mt={2}
                width={256}
                height={256}
                source={{ uri: picture?.uri }}
                alt="Picture preview"
              />
              <Text
                onPress={handlePictureStart}
                mt={1}
                color="brand.500"
              >
                Snap again
              </Text>
            </>
          ) : (
            <Button
              variant="outline"
              mt={2}
              colorScheme="brand"
              onPress={handlePictureStart}
              isLoading={loading}
            >
              Choose or snap
            </Button>
          )}
          <Button
            mt={8}
            mb={2}
            colorScheme="brand"
            onPress={handleSubmit}
          >
            Add to my collection!
          </Button>
          {nameError && (
            <Text color="brand.500">
              {nameError}
            </Text>
          )}
          {descriptionError && (
            <Text color="brand.500">
              {descriptionError}
            </Text>
          )}
          {pictureError && (
            <Text color="brand.500">
              {pictureError}
            </Text>
          )}
          {error && (
            <Text color="brand.500">
              An error occured, please try again.
            </Text>
          )}
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
