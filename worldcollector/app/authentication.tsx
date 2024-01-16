import { useCallback, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { useRouter } from 'expo-router'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { validate as validateEmail } from 'email-validator'

import { User } from '~types'

import { authenticationErrors } from '~constants'

import { authentication, db } from '~firebase'

import useUser from '~hooks/authentication/useUser'

import ButtonPrimaryLarge from '~components/ButtonPrimaryLarge'
import CustomImageBackground from '~components/CustomImageBackground'
import FadeInView from '~components/FadeInView'
import SafeLayout from '~components/SafeLayout'
import TextInput from '~components/TextInput'
import Label from '~components/Label'
import UsernameInput from '~components/UsernameInput'

import theme from '~theme'

function Page() {
  const { viewer, setViewer } = useUser()

  const [step, setStep] = useState(0)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [continued, setContinued] = useState(false)
  const [existingName, setExistingName] = useState('')
  const [username, setUsername] = useState('')
  const [isUsernameValid, setIsUsernameValid] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [nameError, setNameError] = useState('')
  const [errorCode, setErrorCode] = useState('')

  const router = useRouter()

  const error = authenticationErrors[errorCode as keyof typeof authenticationErrors] ?? (errorCode ? authenticationErrors.default : null)

  const handleNext = useCallback(() => {
    setStep(x => x + 1)
  }, [])

  const handleReset = useCallback(() => {
    setLoading(false)
    setContinued(false)
    setExistingName('')
    setUsername('')
    setPassword('')
    setEmailError('')
    setPasswordError('')
    setNameError('')
    setErrorCode('')
  }, [])

  const handleCheckEmail = useCallback(async () => {
    setEmailError('')

    const safeEmail = email.trim().toLowerCase()

    if (!validateEmail(safeEmail)) {
      setEmailError('Invalid email')

      return
    }

    setLoading(true)

    try {
      const querySnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', safeEmail)))

      querySnapshot.forEach(doc => {
        const user = doc.data()

        setExistingName(user.name)
      })

      setContinued(true)
    }
    catch (error) {
      console.log(error)

      setErrorCode(error.code)
    }

    setLoading(false)
  }, [email])

  const handleSignUp = useCallback(async () => {
    let hasError = false

    setNameError('')
    setPasswordError('')
    setErrorCode('')

    if (!isUsernameValid) {
      setNameError('User name is already taken')

      hasError = true
    }

    if (!username.trim()) {
      setNameError('Name is required')

      hasError = true
    }

    if (!password.trim()) {
      setPasswordError('Password is required')

      hasError = true
    }

    if (password && password !== passwordConfirmation) {
      setPasswordError('Passwords do not match')

      hasError = true
    }

    if (hasError) return

    setLoading(true)

    let id = ''
    const safeEmail = email.trim().toLowerCase()

    try {
      const userCredentials = await createUserWithEmailAndPassword(authentication, safeEmail, password)

      id = userCredentials.user.uid
    }
    catch (error) {
      console.log(error)

      setErrorCode(error.code)
      setLoading(false)

      return
    }

    const now = new Date().toISOString()
    const user: User = {
      id,
      name: username,
      email: safeEmail,
      hasSwearedOath: false,
      createdAt: now,
      updatedAt: now,
    }

    await setDoc(doc(db, 'users', id), user)

    setViewer(user)
  }, [
    email,
    username,
    isUsernameValid,
    password,
    passwordConfirmation,
    setViewer,
  ])

  const handleSignIn = useCallback(async () => {
    // let id = ''
    const safeEmail = email.trim().toLowerCase()

    setLoading(true)

    try {
      // const userCredentials = await signInWithEmailAndPassword(authentication, safeEmail, password)
      await signInWithEmailAndPassword(authentication, safeEmail, password)

      // id = userCredentials.user.uid
    }
    catch (error) {
      console.log(error)

      setErrorCode(error.code)
      setLoading(false)

      // return
    }

    // try {
    //   const user = await getDoc(doc(db, 'users', id))

    //   setViewer(user.data() as User)
    // }
    // catch (error) {
    //   console.log(error)
    // }
  }, [
    email,
    password,
    // setViewer,
  ])

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

  const renderStepFour = useCallback(() => (
    <CustomImageBackground source={require('../assets/splash-nologo.png')}>
      <SafeLayout>
        <View style={styles.mainContainer}>
          <View style={styles.grow} />
          <Text style={styles.leadText}>
            Welcome, collector!
          </Text>
          <Text style={[styles.text, styles.marginTop]}>
            Enter your email to get started
          </Text>
          <Label>
            Email:
          </Label>
          <TextInput
            autoFocus
            autoCorrect={false}
            placeholder="you@example.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            onSubmitEditing={handleCheckEmail}
          />
          {!!emailError && (
            <Text style={[styles.errorText, styles.halfMarginTop]}>
              {emailError}
            </Text>
          )}
          <View style={styles.grow} />
          <View style={styles.buttonContainer}>
            {loading && (
              <ActivityIndicator />
            )}
            {!loading && (
              <ButtonPrimaryLarge onPress={handleCheckEmail}>
                Continue
              </ButtonPrimaryLarge>
            )}
          </View>
        </View>
      </SafeLayout>
    </CustomImageBackground>
  ), [handleCheckEmail])

  switch (step) {
    case 0: return renderStepZero()
    case 1: return renderStepOne()
    case 2: return renderStepTwo()
    case 3: return renderStepThree()
    case 4: return renderStepFour()
    default: return null
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
  leadText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
  errorText: {
    color: theme.colors.red[500],
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  marginTop: {
    marginTop: 16,
  },
  halfMarginTop: {
    marginTop: 8,
  },
})

export default Page
