import { ReactNode, useEffect, useMemo, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { SplashScreen } from 'expo-router'

import { authentication, db } from '../firebase'

import UserContext from '../contexts/UserContext'

import { User } from '../types'

type AuthenticationProviderProps = {
  children: ReactNode
}

function UserProvider({ children }: AuthenticationProviderProps) {
  const [loading, setLoading] = useState(true)
  const [viewer, setViewer] = useState<User | null>(null)

  const userContextValue = useMemo(() => ({ viewer, setViewer }), [viewer])

  useEffect(() => {
    onAuthStateChanged(authentication, async userCredentials => {
      if (!userCredentials) {
        setLoading(false)

        return
      }

      const docSnapshot = await getDoc(doc(db, 'users', userCredentials.uid))

      if (!docSnapshot.exists()) return

      const user = docSnapshot.data() as User

      setViewer(user)
      setLoading(false)

      console.log(`Logged as ${user.name}`)
    })
  }, [])

  if (loading) {
    return (
      <SplashScreen />
    )
  }

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
