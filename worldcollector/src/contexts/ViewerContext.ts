import { Dispatch, SetStateAction, createContext } from 'react'

import { User } from '~types'

export type ViewerContext = {
  viewer: User | null
  setViewer: Dispatch<SetStateAction<User | null>>
}

export default createContext<ViewerContext>({
  viewer: null,
  setViewer: () => {},
})
