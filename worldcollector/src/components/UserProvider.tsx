import { ReactNode, useMemo, useState } from 'react'

import UserContext from '../contexts/UserContext'

import { User } from '../types'

type AuthenticationProviderProps = {
  children: ReactNode
}

function UserProvider({ children }: AuthenticationProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  const userContextValue = useMemo(() => ({ user, setUser }), [user])

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
