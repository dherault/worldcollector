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
          <Text style={[styles.text, styles.marginTop]}>
            The rules are simple:
          </Text>
          <Text style={[styles.text, styles.marginTop]}>
            1 - You can collect something only once. If another player has it you cannot have it.
          </Text>
          <Text style={[styles.text, styles.marginTop]}>
            2 - You cannot collect living beings.
          </Text>
          <Text style={[styles.text, styles.marginTop]}>
            3 - If you spend 30 days without login in your collectible are released.
          </Text>
        </View>
      </SafeLayout>
    </CustomImageBackground>
  ), [])

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
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  marginTop: {
    marginTop: 16,
  },
})

export default Page
