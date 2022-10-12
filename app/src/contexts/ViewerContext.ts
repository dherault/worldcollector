import { Dispatch, SetStateAction, createContext } from 'react'

import { UserType } from '../types'

export type ViewerContextType = {
  viewer: UserType | null
  // viewerMetadata: UserMetadataType | null
  loadingViewer: boolean
  setViewer: Dispatch<SetStateAction<UserType | null>>
  // setViewerMetadata: Dispatch<SetStateAction<UserMetadataType | null>>
}

export default createContext<ViewerContextType>({
  viewer: null,
  // viewerMetadata: null,
  loadingViewer: false,
  setViewer: () => {},
  // setViewerMetadata: () => {},
})
