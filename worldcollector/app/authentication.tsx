import { useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import ButtonPrimaryLarge from '~components/ButtonPrimaryLarge'
import CustomImageBackground from '~components/CustomImageBackground'
import FadeInView from '~components/FadeInView'
import SafeLayout from '~components/SafeLayout'

function Page() {
  const [step, setStep] = useState(0)

  const handleNext = useCallback(() => {
    setStep(x => x + 1)
  }, [])

  const renderStepZero = useCallback(() => (
    <CustomImageBackground source={require('../assets/splash.png')}>
      <SafeLayout>
        <View style={styles.grow} />
        <View style={styles.buttonContainer}>
          <FadeInView>
            <ButtonPrimaryLarge onPress={handleNext}>
              Start game
            </ButtonPrimaryLarge>
          </FadeInView>
        </View>
      </SafeLayout>
    </CustomImageBackground>
  ), [handleNext])

  const renderStepOne = useCallback(() => (
    <CustomImageBackground source={require('../assets/splash-nologo.png')}>
      <SafeLayout>
        <View style={styles.mainContainer}>
          <View style={styles.grow} />
          <Text style={styles.ruleHeader}>
            Rule #1
          </Text>
          <Text style={styles.ruleContent}>
            You can collect anything except living beings.
          </Text>
          <View style={styles.grow} />
          <View style={styles.buttonContainer}>
            <ButtonPrimaryLarge onPress={handleNext}>
              Got it!
            </ButtonPrimaryLarge>
          </View>
        </View>
      </SafeLayout>
    </CustomImageBackground>
  ), [handleNext])

  const renderStepTwo = useCallback(() => (
    <CustomImageBackground source={require('../assets/splash-nologo.png')}>
      <SafeLayout>
        <View style={styles.mainContainer}>
          <View style={styles.grow} />
          <Text style={styles.ruleHeader}>
            Rule #2
          </Text>
          <Text style={styles.ruleContent}>
            After 30 days without login in, your collectibles will be lost.
          </Text>
          <View style={styles.grow} />
          <View style={styles.buttonContainer}>
            <ButtonPrimaryLarge onPress={handleNext}>
              Understood!
            </ButtonPrimaryLarge>
          </View>
        </View>
      </SafeLayout>
    </CustomImageBackground>
  ), [handleNext])

  const renderStepThree = useCallback(() => (
    <CustomImageBackground source={require('../assets/splash-nologo.png')}>
      <SafeLayout>
        <View style={styles.mainContainer}>
          <View style={styles.grow} />
          <Text style={styles.ruleHeader}>
            Rule #3
          </Text>
          <Text style={styles.ruleContent}>
            Pressing "like" on a collectible gives you a chance to acquire it if its owner does not log in for 30 days.
          </Text>
          <View style={styles.grow} />
          <View style={styles.buttonContainer}>
            <ButtonPrimaryLarge onPress={handleNext}>
              Let's begin!
            </ButtonPrimaryLarge>
          </View>
        </View>
      </SafeLayout>
    </CustomImageBackground>
  ), [handleNext])

  switch (step) {
    case 0: return renderStepZero()
    case 1: return renderStepOne()
    case 2: return renderStepTwo()
    case 3: return renderStepThree()
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
  ruleHeader: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ruleContent: {
    marginTop: 32,
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
  },
})

export default Page
