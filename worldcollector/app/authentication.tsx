import { useCallback, useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { Box, Button, HStack, Heading, Input, Text, VStack } from 'native-base'
import { validate as validateEmail } from 'email-validator'
import { useRouter } from 'expo-router'

import { User } from '~types'

import { authentication, db } from '~firebase'

import ViewerContext from '~contexts/ViewerContext'

function Authentication() {
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

    const querySnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', safeEmail)))

    querySnapshot.forEach(doc => {
      const user = doc.data()

      setExistingName(user.name)
    })

    setContinued(true)
    setLoading(false)
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
      <Text>Please enter your email to sign in or up:</Text>
      <Input
        mt={2}
        placeholder="Email"
        w="100%"
        value={email}
        onChangeText={setEmail}
        onSubmitEditing={handleCheckEmail}
      />
      <Button
        mt={2}
        onPress={handleCheckEmail}
        isLoading={loading}
      >
        Continue
      </Button>
    </>
  ), [email, loading, handleCheckEmail])

  const renderSignUp = useCallback(() => (
    <>
      <Text>
        New here? Sign up!
      </Text>
      <Input
        mt={2}
        placeholder="User name"
        w="100%"
        value={name}
        onChangeText={setUserName}
      />
      <Input
        mt={2}
        type="password"
        placeholder="Password"
        w="100%"
        value={password}
        onChangeText={setPassword}
      />
      <HStack mt={2}>
        <Button
          variant="outline"
          onPress={handleReset}
          isLoading={loading}
        >
          Go back
        </Button>
        <Button
          ml={2}
          onPress={handleSignUp}
          isLoading={loading}
        >
          Sign up
        </Button>
      </HStack>
    </>
  ), [name, password, loading, handleReset, handleSignUp])

  const renderSignIn = useCallback(() => (
    <>
      <Text>
        Good to see you again,
        {' '}
        {existingName}
      </Text>
      <Text>
        Enter your password to continue:
      </Text>
      <Input
        mt={2}
        type="password"
        placeholder="Password"
        w="100%"
        value={password}
        onChangeText={setPassword}
        onSubmitEditing={handleSignIn}
      />
      <HStack mt={2}>
        <Button
          variant="outline"
          onPress={handleReset}
          isLoading={loading}
        >
          Go back
        </Button>
        <Button
          ml={2}
          onPress={handleSignIn}
          isLoading={loading}
        >
          Sign in
        </Button>
      </HStack>
    </>
  ), [existingName, password, loading, handleReset, handleSignIn])

  useEffect(() => {
    if (!viewer) return

    router.push('/')
  }, [viewer, router])

  return (
    <VStack
      alignItems="center"
      p={2}
    >
      <Heading
        mt={2}
        mb={4}
      >
        Welcome, collector!
      </Heading>
      {!continued && renderEmailPrompt()}
      {continued && !existingName && renderSignUp()}
      {continued && existingName && renderSignIn()}
      {emailError && (
        <Box>
          {emailError}
        </Box>
      )}
      {passwordError && (
        <Box>
          {passwordError}
        </Box>
      )}
      {nameError && (
        <Box>
          {nameError}
        </Box>
      )}
      {error && (
        <Box>
          An error occured
        </Box>
      )}
    </VStack>
  )
}

export default Authentication
