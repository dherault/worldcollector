import { useCallback } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'

import ButtonPrimaryLarge from '~components/ButtonPrimaryLarge'
import CustomImageBackground from '~components/CustomImageBackground'
import FadeInView from '~components/FadeInView'

function Page() {
  const handleStartGamePress = useCallback(() => {

  }, [])

  return (
    <CustomImageBackground source={require('../assets/splash.png')}>
      <SafeAreaView style={styles.flex}>
        <View style={styles.grow} />
        <View style={styles.buttonContainer}>
          <FadeInView>
            <ButtonPrimaryLarge onPress={handleStartGamePress}>
              Start game
            </ButtonPrimaryLarge>
          </FadeInView>
        </View>
      </SafeAreaView>
    </CustomImageBackground>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0,
    marginBottom: 42,
    alignItems: 'center',
    minHeight: 56,
  },
  grow: {
    flexGrow: 1,
  },
})

export default Page
