import { collection, getDocs, query, where } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'

import { db } from '../firebase'
import { CollectibleType } from '../types'

function useUserById(id: string) {
  const [loadingCollectibles, setLoadingCollectibles] = useState(true)
  const [collectibles, setCollectibles] = useState<CollectibleType[]>([])

  const fetchCollectibles = useCallback(async () => {
    const q = query(collection(db, 'collectibles'), where('ownerId', '==', id))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const collectibles: CollectibleType[] = []

      querySnapshot.forEach(doc => {
        collectibles.push(doc.data() as CollectibleType)
      })

      setCollectibles(collectibles)
    }

    setLoadingCollectibles(false)
  }, [id])

  useEffect(() => {
    fetchCollectibles()
  }, [fetchCollectibles])

  return { collectibles, loadingCollectibles }
}

export default useUserById
