import { useContext } from 'react'

import ViewerContext from '../contexts/ViewerContext'

function useViewer() {
  return useContext(ViewerContext)
}

export default useViewer
