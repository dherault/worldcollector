import { useContext } from 'react'

import ViewerContext from '~contexts/ViewerContext'

function useUser() {
  return useContext(ViewerContext)
}

export default useUser
