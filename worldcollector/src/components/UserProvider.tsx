import { ReactNode, useEffect, useMemo, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

import { authentication, db } from '../firebase'

import UserContext from '../contexts/UserContext'

import { User } from '../types'

type AuthenticationProviderProps = {
  children: ReactNode
}

function UserProvider({ children }: AuthenticationProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  const userContextValue = useMemo(() => ({ user, setUser }), [user])

  useEffect(() => {
    onAuthStateChanged(authentication, async userCredentials => {
      console.log('userCredentials', userCredentials)

      if (!userCredentials) return

      const docSnapshot = await getDoc(doc(db, 'users', userCredentials.uid))

      if (!docSnapshot.exists()) return

      const user = docSnapshot.data() as User

      setUser(user)

      console.log(`Logged as ${user.name}`)
    })
  }, [])

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
