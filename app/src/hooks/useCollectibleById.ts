import { doc, getDoc } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'

import { db } from '../firebase'
import { CollectibleType } from '../types'

function useCollectibleById(id: string) {
  const [loadingCollectible, setLoadingCollectible] = useState(true)
  const [collectible, setCollectible] = useState<CollectibleType | null>(null)

  const fetchCollectible = useCallback(async () => {
    if (!id) {
      setLoadingCollectible(false)

      return
    }

    const querySnapshot = await getDoc(doc(db, 'collectibles', id))

    if (querySnapshot.exists()) setCollectible(querySnapshot.data() as CollectibleType)

    setLoadingCollectible(false)
  }, [id])

  useEffect(() => {
    fetchCollectible()
  }, [fetchCollectible])

  return { collectible, loadingCollectible }
}

export default useCollectibleById
