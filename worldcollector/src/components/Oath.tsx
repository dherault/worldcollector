import { StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useCallback, useContext } from 'react'
import { doc, updateDoc } from 'firebase/firestore'

import { db } from '~firebase'

import ViewerContext from '~contexts/ViewerContext'

import ButtonPrimaryLarge from '~components/ButtonPrimaryLarge'

function Oath() {
  const { viewer, setViewer } = useContext(ViewerContext)

  const handleSubmit = useCallback(() => {
    const update = {
      hasSwearedOath: true,
      updatedAt: new Date().toISOString(),
    }

    updateDoc(doc(db, 'users', viewer.id), update)
    setViewer(viewer => ({
      ...viewer,
      ...update,
    }))
  }, [viewer.id, setViewer])

  return (
    <View style={styles.root}>
      <Text style={styles.text}>
        <MaterialCommunityIcons
          name="format-quote-open"
          size={24}
          color="black"
        />
        I swear that I will not try to collect living beings or what has already been collected.
        <MaterialCommunityIcons
          name="format-quote-close"
          size={24}
          color="black"
        />
      </Text>
      <ButtonPrimaryLarge
        style={styles.button}
        onPress={handleSubmit}
      >
        I swear
      </ButtonPrimaryLarge>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32.0,
  },
  text: {
    fontSize: 24,
  },
  button: {
    marginTop: 32,
  },
})

export default Oath
