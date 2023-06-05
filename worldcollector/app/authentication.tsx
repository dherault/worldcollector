import { useCallback, useContext, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { Box, Button, Input } from 'native-base'

import { User } from '~types'

import { authentication, db } from '~firebase'

import UserContext from '~contexts/UserContext'

function Authentication() {
  const { setViewer } = useContext(UserContext)
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

  const handleCheckEmail = useCallback(async () => {
    setEmailError('')

    if (!email.trim()) {
      setEmailError('Email is required')

      return
    }

    setLoading(true)

    const safeEmail = email.trim().toLowerCase()
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
      <Input
        placeholder="Email"
        w="100%"
        value={email}
        onChangeText={setEmail}
      />
      <Button
        onPress={handleCheckEmail}
        isLoading={loading}
      >
        Continue
      </Button>
    </>
  ), [email, loading, handleCheckEmail])

  const renderSignUp = useCallback(() => (
    <>
      <Box>
        Welcome
      </Box>
      <Input
        placeholder="User name"
        w="100%"
        value={name}
        onChangeText={setUserName}
      />
      <Input
        type="password"
        placeholder="Password"
        w="100%"
        value={password}
        onChangeText={setPassword}
      />
      <Button
        onPress={handleSignUp}
        isLoading={loading}
      >
        Sign up
      </Button>
    </>
  ), [name, password, loading, handleSignUp])

  const renderSignIn = useCallback(() => (
    <>
      <Box flexDirection="row">
        Welcome
        {' '}
        {existingName}
      </Box>
      <Input
        type="password"
        placeholder="Password"
        w="100%"
        value={password}
        onChangeText={setPassword}
      />
      <Button
        onPress={handleSignIn}
        isLoading={loading}
      >
        Sign in
      </Button>
    </>
  ), [existingName, password, loading, handleSignIn])

  return (
    <Box>
      <Box>Authentication</Box>
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
    </Box>
  )
}

export default Authentication
