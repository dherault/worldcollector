import { Dispatch, SetStateAction, createContext } from 'react'
import { User } from 'firebase/auth'

import { UserMetadataType } from '../types'

export type ViewerContextType = {
  viewer: UserMetadataType | null
  // viewerMetadata: UserMetadataType | null
  loadingViewer: boolean
  setViewer: Dispatch<SetStateAction<UserMetadataType | null>>
  // setViewerMetadata: Dispatch<SetStateAction<UserMetadataType | null>>
}

export default createContext<ViewerContextType>({
  viewer: null,
  // viewerMetadata: null,
  loadingViewer: false,
  setViewer: () => {},
  // setViewerMetadata: () => {},
})
