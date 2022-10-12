import { useCallback, useEffect, useMemo, useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

import ViewerContext, { ViewerContextType } from '../contexts/ViewerContext'
import { authentication, db, persistancePromise } from '../firebase'

import { UserType } from '../types'

function AuthenticationProvider({ children }: any) {
  const [viewer, setViewer] = useState<UserType | null>(null)
  const [loadingViewer, setViewerLoading] = useState(true)
  const viewerContextValue = useMemo<ViewerContextType>(() => ({ viewer, setViewer, loadingViewer }), [viewer, loadingViewer])

  const handleAuthenticationStateChange = useCallback(async () => {
    await persistancePromise

    onAuthStateChanged(authentication, async (viewer: User | null) => {
      if (viewer) {
        const result = await getDoc(doc(db, 'users', viewer.uid))

        setViewer(result.data() as UserType)
      }

      setViewerLoading(false)
    })
  }, [])

  useEffect(() => {
    handleAuthenticationStateChange()
  }, [handleAuthenticationStateChange])

  return (
    <ViewerContext.Provider value={viewerContextValue}>
      {children}
    </ViewerContext.Provider>
  )
}

export default AuthenticationProvider
