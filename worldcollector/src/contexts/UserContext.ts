import { createContext } from 'react'
import { User } from 'firebase/auth'

export type UserContext = {
  user: User | null
}

export default createContext<UserContext>({
  user: null,
})
