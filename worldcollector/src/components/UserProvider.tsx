import { type PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { SplashScreen, usePathname, useRootNavigation, useRouter } from 'expo-router'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

import type { User } from '~types'

import { authentication, db } from '~firebase'

import UserContext from '~contexts/ViewerContext'

SplashScreen.preventAutoHideAsync()

function UserProvider({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(true)
  const [viewer, setViewer] = useState<User | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const rootNavigation = useRootNavigation()

  const [isNavigationReady, setNavigationReady] = useState(false)

  const userContextValue = useMemo(() => ({ viewer, setViewer }), [viewer])

  useEffect(() => (
    rootNavigation?.addListener('state', () => {
      setNavigationReady(true)
    })
  ), [rootNavigation])

  useEffect(() => {
    onAuthStateChanged(authentication, async userCredentials => {
      if (!userCredentials) {
        setLoading(false)

        return
      }

      const docSnapshot = await getDoc(doc(db, 'users', userCredentials.uid))

      if (!docSnapshot.exists()) return

      const user = docSnapshot.data() as User

      setViewer(user)
      setLoading(false)

      console.log(`Logged as ${user.name}`)
    })
  }, [])

  useEffect(() => {
    if (!isNavigationReady) return
    if (viewer) return
    if (pathname === '/authentication') return

    router.replace('/authentication')
  }, [isNavigationReady, viewer, pathname, router])

  useEffect(() => {
    if (loading) return

    SplashScreen.hideAsync()
  }, [loading])

  if (loading) return null

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
