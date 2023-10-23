import { useCallback, useContext, useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { useRouter } from 'expo-router'
import { Image } from 'expo-image'
import { validate as validateEmail } from 'email-validator'

import { User } from '~types'

import { authenticationErrors } from '~constants'

import { authentication, db } from '~firebase'

import ViewerContext from '~contexts/ViewerContext'

import TextInput from '~components/TextInput'
import Button from '~components/Button'
import Label from '~components/Label'
import Heading from '~components/Heading'
import UsernameInput from '~components/UsernameInput'

import theme from '~theme'

function AuthenticationScene() {
  const { viewer, setViewer } = useContext(ViewerContext)

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

  const error = authenticationErrors[errorCode as keyof typeof authenticationErrors] ?? (errorCode ? authenticationErrors.default : null)

  const router = useRouter()

  const handleReset = useCallback(() => {
    // setEmail('')
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

  const renderEmailPrompt = useCallback(() => (
    <>
      <Text style={styles.infoText}>
        Please enter your email to log in or sign up:
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
      <View style={styles.marginTop}>
        {loading && (
          <ActivityIndicator />
        )}
        {!loading && (
          <Button onPress={handleCheckEmail}>
            Continue
          </Button>
        )}
      </View>
    </>
  ), [
    email,
    handleCheckEmail,
    loading,
  ])

  const renderSignUp = useCallback(() => (
    <>
      <Text style={styles.infoText}>
        New here? Sign up!
      </Text>
      <Label>
        User name:
      </Label>
      <UsernameInput
        value={username}
        setValue={setUsername}
        isValid={isUsernameValid}
        setIsValid={setIsUsernameValid}
      />
      <Label style={styles.marginTop}>
        Password:
      </Label>
      <TextInput
        secureTextEntry
        placeholder="Choose a strong password"
        value={password}
        onChangeText={setPassword}
      />
      <Label style={styles.marginTop}>
        Password confirmation:
      </Label>
      <TextInput
        secureTextEntry
        placeholder="Repeat your password"
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        onSubmitEditing={handleSignUp}
      />
      <View style={styles.marginTop}>
        {loading && (
          <ActivityIndicator />
        )}
        {!loading && (
          <View style={styles.row}>
            <Button
              variant="ghost"
              onPress={handleReset}
            >
              Go back
            </Button>
            <Button onPress={handleSignUp}>
              Sign up
            </Button>
          </View>
        )}
      </View>
    </>
  ), [
    username,
    isUsernameValid,
    password,
    passwordConfirmation,
    loading,
    handleReset,
    handleSignUp,
  ])

  const renderSignIn = useCallback(() => (
    <>
      <Text>
        Good to see you again,
        {' '}
        {existingName}
      </Text>
      <Text style={styles.marginVertical}>
        Enter your password to continue:
      </Text>
      <TextInput
        secureTextEntry
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        onSubmitEditing={handleSignIn}
      />
      <View style={styles.marginTop}>
        {loading && (
          <ActivityIndicator />
        )}
        {!loading && (
          <View style={styles.row}>
            <Button
              variant="ghost"
              onPress={handleReset}
            >
              Go back
            </Button>
            <Button onPress={handleSignIn}>
              Sign in
            </Button>
          </View>
        )}
      </View>
    </>
  ), [
    existingName,
    password,
    loading,
    handleReset,
    handleSignIn,
  ])

  useEffect(() => {
    if (!viewer) return

    router.push('/')
  }, [viewer, router])

  return (
    <ScrollView
      contentContainerStyle={styles.rootContainer}
    >
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />
      <Heading style={styles.heading}>
        Welcome, collector!
      </Heading>
      {!continued && renderEmailPrompt()}
      {continued && !existingName && renderSignUp()}
      {continued && existingName && renderSignIn()}
      <View style={styles.marginTop}>
        {emailError && (
          <Text style={styles.errorText}>
            {emailError}
          </Text>
        )}
        {passwordError && (
          <Text style={styles.errorText}>
            {passwordError}
          </Text>
        )}
        {nameError && (
          <Text style={styles.errorText}>
            {nameError}
          </Text>
        )}
        {!!error && (
          <Text style={styles.errorText}>
            {error}
          </Text>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 32,
  },
  logo: {
    width: 128,
    height: 128,
    marginBottom: 32,
  },
  heading: {
    textAlign: 'center',
    marginBottom: 32,
  },
  infoText: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 16,
  },
  errorText: {
    color: theme.colors.red[500],
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  marginTop: {
    marginTop: 16,
  },
  marginVertical: {
    marginVertical: 16,
  },
})

export default AuthenticationScene
