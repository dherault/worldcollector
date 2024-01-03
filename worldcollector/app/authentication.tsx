import { useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import ButtonPrimaryLarge from '~components/ButtonPrimaryLarge'
import CustomImageBackground from '~components/CustomImageBackground'
import FadeInView from '~components/FadeInView'
import SafeLayout from '~components/SafeLayout'

function Page() {
  const [step, setStep] = useState(0)

  const handleStartGamePress = useCallback(() => {
    setStep(1)
  }, [])

  const renderStepZero = useCallback(() => (
    <CustomImageBackground source={require('../assets/splash.png')}>
      <SafeLayout>
        <View style={styles.grow} />
        <View style={styles.buttonContainer}>
          <FadeInView>
            <ButtonPrimaryLarge onPress={handleStartGamePress}>
              Start game
            </ButtonPrimaryLarge>
          </FadeInView>
        </View>
      </SafeLayout>
    </CustomImageBackground>
  ), [handleStartGamePress])

  const renderStepOne = useCallback(() => (
    <CustomImageBackground source={require('../assets/splash-nologo.png')}>
      <SafeLayout>
        <View style={styles.mainContainer}>
          <Text style={styles.text}>
            World Collector is a game about collecting elements from the world.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <FadeInView>
            <ButtonPrimaryLarge onPress={handleStartGamePress}>
              Start game
            </ButtonPrimaryLarge>
          </FadeInView>
        </View>
      </SafeLayout>
    </CustomImageBackground>
  ), [handleStartGamePress])

  switch (step) {
    case 0: return renderStepZero()
    case 1: return renderStepOne()
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 0,
    marginBottom: 42,
    alignItems: 'center',
    minHeight: 56,
  },
  grow: {
    flexGrow: 1,
  },
  mainContainer: {
    flex: 1,
    flexGrow: 1,
    paddingHorizontal: 32,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
})

export default Page
