import { Dispatch, SetStateAction, createContext } from 'react'

import { User } from '../types'

export type UserContext = {
  viewer: User | null
  setViewer: Dispatch<SetStateAction<User | null>>
}

export default createContext<UserContext>({
  viewer: null,
  setViewer: () => {},
})
