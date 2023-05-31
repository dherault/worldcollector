import { ReactNode, useEffect, useMemo, useState } from 'react'
import { User, getRedirectResult } from 'firebase/auth'

import { authentication } from '../firebase'

import UserContext from '../contexts/UserContext'

type AuthenticationProviderProps = {
  children: ReactNode
}

function AuthenticationProvider({ children }: AuthenticationProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  const userContextValue = useMemo(() => ({ user }), [user])

  useEffect(() => {
    getRedirectResult(authentication).then(result => {
      setUser(result.user)
    })
  }, [])

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  )
}

export default AuthenticationProvider
