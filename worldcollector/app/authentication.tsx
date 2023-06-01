import { Box, Button, Input } from 'native-base'
import { useCallback, useContext, useEffect, useState } from 'react'
import { browserLocalPersistence, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { useRouter } from 'expo-router'
import { nanoid } from 'nanoid'

import { authentication, db } from '../src/firebase'
import UserContext from '../src/contexts/UserContext'

import { User } from '../src/types'

function Signup() {
  const { user, setUser } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [continued, setContinued] = useState(false)
  const [existingUserName, setExistingUserName] = useState('')
  const [name, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [nameError, setNameError] = useState('')
  const [error, setError] = useState(false)
  const router = useRouter()

  const handleCheckEmail = useCallback(async () => {
    setEmailError('')

    if (!email.trim()) {
      setEmailError('Email is required')

      return
    }

    setLoading(true)

    const querySnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', email)))

    querySnapshot.forEach(doc => {
      const user = doc.data()

      setExistingUserName(user.userName)
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

    try {
      await setPersistence(authentication, browserLocalPersistence)
      await createUserWithEmailAndPassword(authentication, email, password)
    }
    catch (error) {
      console.log(error)

      setError(true)

      return
    }

    const now = new Date().toISOString()
    const id = nanoid()
    const user: User = {
      id,
      name,
      email,
      createdAt: now,
      updatedAt: now,
    }

    await setDoc(doc(db, 'users', id), user)

    setUser(user)
  }, [email, name, password, setUser])

  const handleSignIn = useCallback(async () => {
    let id = ''

    try {
      const userCredentials = await signInWithEmailAndPassword(authentication, email, password)

      id = userCredentials.user.uid
    }
    catch (error) {
      console.log(error)

      setError(true)

      return
    }

    try {
      const user = await getDoc(doc(db, 'users', id))

      setUser(user.data() as User)
    }
    catch (error) {
      console.log(error)

    }

  }, [email, password, setUser])

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
      <Box>
        Welcome
        {' '}
        {existingUserName}
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
  ), [existingUserName, password, loading, handleSignIn])

  useEffect(() => {
    if (!user) return

    router.push('/')
  }, [user, router])

  return (
    <Box>
      <Box>Authentication</Box>
      {!continued && renderEmailPrompt()}
      {continued && !existingUserName && renderSignUp()}
      {continued && existingUserName && renderSignIn()}
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

export default Signup
