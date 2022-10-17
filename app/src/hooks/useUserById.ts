import { doc, getDoc } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'

import { db } from '../firebase'
import { UserType } from '../types'

function useUserById(id: string) {
  const [loadingUser, setLoadingUser] = useState(true)
  const [user, setUser] = useState<UserType | null>(null)

  const fetchUser = useCallback(async () => {
    const querySnapshot = await getDoc(doc(db, 'users', id))

    if (querySnapshot.exists()) setUser(querySnapshot.data() as UserType)

    setLoadingUser(false)
  }, [id])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return { user, loadingUser }
}

export default useUserById
