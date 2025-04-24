import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useNavigate } from 'react-router'
import {
  type User as Viewer,
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
} from 'firebase/auth'
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import LogRocket from 'logrocket'

import type { SignInProvider, User } from '~types'

import { NULL_DOCUMENT_ID } from '~constants'

import {
  authentication,
  database,
  logAnalytics,
  persistancePromise,
} from '~firebase'

import UserContext, { type UserContextType } from '~contexts/authentication/UserContext'

import useLiveDocument from '~hooks/db/useLiveDocument'

import createUser from '~utils/db/createUser'

import ErrorOccured from '~components/common/ErrorOccured'

function AuthenticationProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate()

  const [viewer, setViewer] = useState<Viewer | null>(null)
  const [loadingAuthentication, setLoadingAuthentication] = useState(true)

  const userId = viewer?.uid
  const userDocument = useMemo(() => doc(database, 'users', userId ?? NULL_DOCUMENT_ID), [userId])

  const { data: user, error: userError, loading: loadingUser } = useLiveDocument<User>(userDocument, !!userId)
  // useLiveDocument's loading has a delay
  // between the data fetching and the loading state
  // being set to false so we use this instead
  const loadingUserFinal = !!userId && !user

  const handleUpdateUser = useCallback(async (payload: Record<string, any>) => {
    if (!userId) return

    console.groupCollapsed('--> Updating user')
    console.log(payload)
    console.groupEnd()

    await updateDoc(userDocument, {
      ...payload,
      updatedAt: new Date().toISOString(),
    })
  }, [
    userId,
    userDocument,
  ])

  const handleSignOut = useCallback(async () => {
    setViewer(null)

    await signOut(authentication)

    logAnalytics('signout')
    navigate('/')
  }, [
    navigate,
  ])

  const handleAuthenticationStateChange = useCallback(async () => {
    await persistancePromise

    onAuthStateChanged(authentication, async viewer => {
      setViewer(viewer)
      setLoadingAuthentication(false)

      if (viewer) logAnalytics('signin')
    })
  }, [])

  const handleCreateUser = useCallback(async () => {
    if (!viewer) return
    if (loadingUser || user) return

    const existingUser = await getDoc(userDocument)

    if (existingUser.exists()) return

    const signInProvider = viewer.providerData[0].providerId as SignInProvider

    try {
      const createdUser = createUser({
        id: viewer.uid,
        userId: viewer.uid,
        email: viewer.email ?? '',
        name: viewer.displayName ?? '',
        imageUrl: viewer.photoURL ?? '',
        signInProviders: [signInProvider],
      })

      await setDoc(userDocument, createdUser)
    }
    catch (error) {
      console.error('Error creating user')
      console.error(error)
    }

    logAnalytics('signup', {
      method: signInProvider,
    })
  }, [
    viewer,
    user,
    loadingUser,
    userDocument,
  ])

  const handleUpdateUserData = useCallback(async () => {
    if (!(viewer && user)) return

    const updatedUser: Partial<Record<keyof User, any>> = {}
    const signInProviders = viewer.providerData.map(x => x.providerId as SignInProvider).sort()

    if (viewer.email !== user.email) updatedUser.email = viewer.email
    if (viewer.emailVerified !== user.hasVerifiedEmail) updatedUser.hasVerifiedEmail = viewer.emailVerified
    if (viewer.photoURL && viewer.photoURL !== user.imageUrl) updatedUser.imageUrl = viewer.photoURL
    if (user.signInProviders.length !== signInProviders.length || user.signInProviders.some((x, i) => x !== signInProviders[i])) updatedUser.signInProviders = signInProviders

    if (!Object.entries(updatedUser).length) return

    await handleUpdateUser(updatedUser)
  }, [
    viewer,
    user,
    handleUpdateUser,
  ])

  const handleFirstTimeUser = useCallback(async () => {
    if (!viewer) return
    if (!user || user.hasSentSignupMessages) return

    // sendSignupEmail(user)

    if (import.meta.env.PROD && user.signInProviders.includes('password')) {
      sendEmailVerification(viewer)
    }

    await handleUpdateUser({
      hasSentSignupMessages: true,
    })
  }, [
    viewer,
    user,
    handleUpdateUser,
  ])

  // Listen for auth change
  useEffect(() => {
    handleAuthenticationStateChange()
  }, [
    handleAuthenticationStateChange,
  ])

  // Create user on first sign in
  useEffect(() => {
    handleCreateUser()
  }, [
    handleCreateUser,
  ])

  // Handle first-time user
  useEffect(() => {
    handleFirstTimeUser()
  }, [
    handleFirstTimeUser,
  ])

  // Update sign in providers and other user data
  useEffect(() => {
    handleUpdateUserData()
  }, [
    handleUpdateUserData,
  ])

  // Identify Logrocket user
  useEffect(() => {
    if (!user || !import.meta.env.PROD) return

    LogRocket.identify(user.id, {
      name: user.name,
      email: user.email,
    })
  }, [
    user,
  ])

  const viewerContextValue = useMemo<UserContextType>(() => ({
    viewer,
    user,
    loading: loadingAuthentication || loadingUserFinal,
    updateUser: handleUpdateUser,
    signOut: handleSignOut,
  }), [
    viewer,
    user,
    loadingAuthentication,
    loadingUserFinal,
    handleUpdateUser,
    handleSignOut,
  ])

  if (userError) {
    return (
      <ErrorOccured
        source="AuthenticationProvider"
        message={userError.message}
      />
    )
  }

  return (
    <UserContext.Provider value={viewerContextValue}>
      {children}
    </UserContext.Provider>
  )
}

export default AuthenticationProvider
