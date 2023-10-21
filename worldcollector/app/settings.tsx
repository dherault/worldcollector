import { useCallback, useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { signOut } from 'firebase/auth'

import { authentication } from '~firebase'

import UserContext from '~contexts/ViewerContext'

import Heading from '~components/Heading'
import ButtonPrimaryLarge from '~components/ButtonPrimaryLarge'
import SettingsEditableField from '~components/SettingsEditableField'
import TextInputLabel from '~components/TextInputLabel'

function SettingsScene() {
  const { viewer, setViewer } = useContext(UserContext)

  const handleSignOut = useCallback(() => {
    signOut(authentication)
    setViewer(null)
  }, [setViewer])

  if (!viewer) return null

  return (
    <View style={styles.root}>
      <Heading style={styles.heading}>
        Settings
      </Heading>
      <Text style={styles.sectionTitle}>
        Account
      </Text>
      <TextInputLabel>
        Account id
      </TextInputLabel>
      <Text
        style={styles.id}
        selectable
      >
        {viewer.id}
      </Text>
      <View style={styles.marginTop}>
        <SettingsEditableField
          fieldKey="name"
          fieldLabel="User name"
        />
      </View>
      <View style={styles.marginTop}>
        <SettingsEditableField
          fieldKey="password"
          fieldLabel="Password"
        />
      </View>
      <ButtonPrimaryLarge
        onPress={handleSignOut}
        style={styles.signout}
      >
        Sign Out
      </ButtonPrimaryLarge>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  heading: {
    textAlign: 'center',
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  id: {
    fontSize: 16,
  },
  signout: {
    marginTop: 64,
    alignSelf: 'flex-start',
  },
  marginTop: {
    marginTop: 16,
  },
})

export default SettingsScene
