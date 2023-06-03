import { ReactNode, useEffect, useMemo, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

import { authentication, db } from '../firebase'

import UserContext from '../contexts/UserContext'

import { User } from '../types'

import FullScreenSpinner from './FullScreenSpinner'

type AuthenticationProviderProps = {
  children: ReactNode
}

function UserProvider({ children }: AuthenticationProviderProps) {
  const [loading, setLoading] = useState(true)
  const [viewer, setViewer] = useState<User | null>(null)

  const userContextValue = useMemo(() => ({ viewer, setViewer }), [viewer])

  useEffect(() => {
    onAuthStateChanged(authentication, async userCredentials => {
      setLoading(false)

      if (!userCredentials) return

      const docSnapshot = await getDoc(doc(db, 'users', userCredentials.uid))

      if (!docSnapshot.exists()) return

      const user = docSnapshot.data() as User

      setViewer(user)

      console.log(`Logged as ${user.name}`)
    })
  }, [])

  if (loading) {
    return (
      <FullScreenSpinner />
    )
  }

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
