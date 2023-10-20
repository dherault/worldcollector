import { useCallback, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { signOut } from 'firebase/auth'

import { authentication } from '~firebase'

import UserContext from '~contexts/ViewerContext'

import Heading from '~components/Heading'
import Button from '~components/Button'

function SettingsScene() {
  const { setViewer } = useContext(UserContext)

  const handleSignOut = useCallback(() => {
    signOut(authentication)
    setViewer(null)
  }, [setViewer])

  return (
    <View style={styles.root}>
      <Heading>
        Settings
      </Heading>
      <Button onPress={handleSignOut}>
        Sign Out
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
})

export default SettingsScene
