import { Dispatch, SetStateAction, createContext } from 'react'

export type RouteTitlesContext = {
  routeTitles: Record<string, string>
  setRouteTitles: Dispatch<SetStateAction<Record<string, string>>>
}

export default createContext<RouteTitlesContext>({
  routeTitles: {},
  setRouteTitles: () => {},
})
