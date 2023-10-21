import { useCallback, useContext, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useRouter } from 'expo-router'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { MaterialIcons } from '@expo/vector-icons'
import { nanoid } from 'nanoid'
import { ref, uploadBytesResumable } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'

import { Collectible, Searchable } from '~types'

import { db, storage } from '~firebase'

import ViewerContext from '~contexts/ViewerContext'

import TextInput from '~components/TextInput'
import ButtonPrimaryLarge from '~components/ButtonPrimaryLarge'
import Heading from '~components/Heading'
import HeadingLarge from '~components/HeadingLarge'
import ButtonIcon from '~components/ButtonIcon'

import theme from '~theme'

const pictureOptions = {
  allowsMultipleSelection: false,
  quality: 1,
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  base64: true,
}

const actionSheetOptions = ['Take photo...', 'Choose from Library...', 'Cancel']
const cancelButtonIndex = 2

function CollectScene() {
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
  const [, requestCameraPermission] = ImagePicker.useCameraPermissions()
  const [, requestLibraryPermission] = ImagePicker.useMediaLibraryPermissions()

  const handleClose = useCallback(() => {
    router.push('/')
  }, [router])

  const handlePictureEnd = useCallback(async (isCamera: boolean) => {
    const permission = await (isCamera ? requestCameraPermission : requestLibraryPermission)()

    if (!permission.granted) return

    const result = await (isCamera ? ImagePicker.launchCameraAsync : ImagePicker.launchImageLibraryAsync)(pictureOptions)

    if (result.canceled) return
    if (!result.assets?.length) return

    setPicture(result.assets[0])
  }, [requestCameraPermission, requestLibraryPermission])

  const handlePictureStart = useCallback(() => {
    showActionSheetWithOptions(
      {
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
      }
    )
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
      const response = await fetch(picture.uri)
      const blob = await response.blob()

      const uploadTask = await uploadBytesResumable(ref(storage, `collectibles/${id}`), blob)

      uploadTask.task.on('state_changed', snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

        console.log(`Upload is ${progress}% done`)
      }, error => {
        throw error
      }, async () => {
        console.log('Upload complete')

        const collectible: Collectible = {
          id,
          name: safeName,
          description: safeDescription,
          ownerId: viewer.id,
          userId: viewer.id,
          status: 'pending',
          imageStoragePath: uploadTask.metadata.fullPath,
          createdAt: now,
          updatedAt: now,
        }

        await setDoc(doc(db, `collectibles/${id}`), collectible)

        const searchable: Searchable = {
          id,
          type: 'collectible',
          name: safeName,
          description: safeDescription,
          userId: viewer.id,
          createdAt: now,
          updatedAt: now,
        }

        await setDoc(doc(db, `searchables/${id}`), searchable)

        router.push(`-/${id}`)
      })
    }
    catch (error) {
      console.log('error', error)

      setError(true)
      setLoading(false)
    }

  }, [name, description, picture, viewer, router])

  return (
    <ScrollView>
      <View style={styles.container}>
        <HeadingLarge>
          Collect
        </HeadingLarge>
        <Heading style={styles.headingRed}>
          1
        </Heading>
        <Heading>
          Name your collectible
        </Heading>
        <Text style={styles.textInfo}>
          It must be unique, make sure to check its unicity using the search function first.
        </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="The Statue of Liberty"
          style={styles.input}
        />
        <Heading style={styles.headingRed}>
          2
        </Heading>
        <Heading>
          Describe it
        </Heading>
        <Text style={styles.textInfo}>
          Be clear and consise.
        </Text>
        <TextInput
          multiline
          numberOfLines={3}
          value={description}
          onChangeText={setDescription}
          placeholder="A colossal neoclassical sculpture on Liberty Island in New York Harbor in New York City, in the United States."
          style={styles.input}
        />
        <Heading style={styles.headingRed}>
          3
        </Heading>
        <Heading>
          Add a picture
        </Heading>
        <Text style={styles.textInfo}>
          Make sure it represents your collectible well.
        </Text>
        <View style={styles.marginTop}>
          {picture ? (
            <>
              <Image
                source={{ uri: picture?.uri }}
                alt="Picture preview"
                style={styles.image}
              />
              <Text
                onPress={handlePictureStart}
                style={styles.reset}
              >
                Reset picture
              </Text>
            </>
          ) : !loading && (
            <ButtonPrimaryLarge onPress={handlePictureStart}>
              Choose or take photo
            </ButtonPrimaryLarge>
          )}
        </View>
        <View style={styles.grow} />
        <View style={styles.buttonSubmit}>
          {!loading && (
            <ButtonPrimaryLarge onPress={handleSubmit}>
              Add it to my collection!
            </ButtonPrimaryLarge>
          )}
          {loading && (
            <ActivityIndicator />
          )}
        </View>
        {nameError && (
          <Text style={styles.textError}>
            {nameError}
          </Text>
        )}
        {descriptionError && (
          <Text style={styles.textError}>
            {descriptionError}
          </Text>
        )}
        {pictureError && (
          <Text style={styles.textError}>
            {pictureError}
          </Text>
        )}
        {error && (
          <Text style={styles.textError}>
            An error occured, please try again.
          </Text>
        )}
        <View style={styles.close}>
          <ButtonIcon onPress={handleClose}>
            <MaterialIcons
              name="close"
              size={24}
              color="black"
            />
          </ButtonIcon>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingTop: 16,
    paddingBottom: 64,
    paddingHorizontal: 24,
  },
  headingRed: {
    marginTop: 32,
    color: theme.colors.red[500],
  },
  textInfo: {
    marginVertical: 8,
  },
  textError: {
    color: theme.colors.red[500],
  },
  input: {
    marginTop: 8,
    fontSize: 16,
    paddingVertical: 12,
  },
  image: {
    width: 256,
    height: 256,
  },
  reset: {
    marginTop: 4,
    color: theme.colors.red[500],
  },
  buttonSubmit: {
    marginTop: 32,
    marginBottom: 8,
  },
  close: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  marginTop: {
    marginTop: 8,
  },
  grow: {
    flexGrow: 1,
  },
})

export default CollectScene
