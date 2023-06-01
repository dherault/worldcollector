import { Dispatch, SetStateAction, createContext } from 'react'

import { User } from '../types'

export type UserContext = {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
}

export default createContext<UserContext>({
  user: null,
  setUser: () => {},
})
