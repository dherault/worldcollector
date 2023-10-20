import { useCallback, useContext, useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { useRouter } from 'expo-router'
import { validate as validateEmail } from 'email-validator'

import { User } from '~types'

import { authentication, db } from '~firebase'

import ViewerContext from '~contexts/ViewerContext'

import TextInput from '~components/TextInput'
import Button from '~components/Button'

import theme from '~theme'

function Page() {
  const { viewer, setViewer } = useContext(ViewerContext)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [continued, setContinued] = useState(false)
  const [existingName, setExistingName] = useState('')
  const [name, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [nameError, setNameError] = useState('')
  const [error, setError] = useState(false)
  const router = useRouter()

  const handleReset = useCallback(() => {
    setEmail('')
    setLoading(false)
    setContinued(false)
    setExistingName('')
    setUserName('')
    setPassword('')
    setEmailError('')
    setPasswordError('')
    setNameError('')
    setError(false)
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
      setLoading(false)
    }
    catch (error) {
      console.log(error)

      setError(true)
    }
  }, [email])

  const handleSignUp = useCallback(async () => {
    let hasError = false

    if (!name.trim()) {
      setNameError('Name is required')

      hasError = true
    }

    if (!password.trim()) {
      setPasswordError('Password is required')

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

      setError(true)

      return
    }

    const now = new Date().toISOString()
    const user: User = {
      id,
      name,
      email: safeEmail,
      createdAt: now,
      updatedAt: now,
    }

    await setDoc(doc(db, 'users', id), user)

    setViewer(user)
  }, [email, name, password, setViewer])

  const handleSignIn = useCallback(async () => {
    let id = ''
    const safeEmail = email.trim().toLowerCase()

    try {
      const userCredentials = await signInWithEmailAndPassword(authentication, safeEmail, password)

      id = userCredentials.user.uid
    }
    catch (error) {
      console.log(error)

      setError(true)

      return
    }

    try {
      const user = await getDoc(doc(db, 'users', id))

      setViewer(user.data() as User)
    }
    catch (error) {
      console.log(error)
    }
  }, [email, password, setViewer])

  const renderEmailPrompt = useCallback(() => (
    <>
      <Text style={styles.infoText}>
        Please enter your email to sign in or sign up:
      </Text>
      <TextInput
        autoFocus
        placeholder="Email"
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
  ), [email, handleCheckEmail, loading])

  const renderSignUp = useCallback(() => (
    <>
      <Text style={styles.infoText}>
        New here? Sign up!
      </Text>
      <TextInput
        placeholder="User name"
        value={name}
        onChangeText={setUserName}
      />
      <View style={styles.input}>
        <TextInput
          secureTextEntry
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={handleSignUp}
        />
      </View>
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
  ), [name, password, loading, handleReset, handleSignUp])

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
  ), [existingName, password, loading, handleReset, handleSignIn])

  useEffect(() => {
    if (!viewer) return

    router.push('/')
  }, [viewer, router])

  return (
    <View style={styles.root}>
      <Text style={styles.header}>
        Welcome, collector!
      </Text>
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
        {error && (
          <Text style={styles.errorText}>
            An error occured
          </Text>
        )}
      </View>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
  },
  infoText: {
    textAlign: 'center',
    marginBottom: 16,
  },
  errorText: {
    color: theme.colors.red[500],
  },
  input: {
    marginTop: 16,
    width: '100%',
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

export default Page