import { collection, getDocs, limit, orderBy, query, startAt, where } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'

import { db } from '../firebase'
import { CollectibleType } from '../types'

function useCollectiblesToVerify() {
  const [ended, setEnded] = useState(false)
  const [cursor, setCursor] = useState<any>(null)
  const [loadingCollectibles, setLoadingCollectibles] = useState(true)
  const [collectibles, setCollectibles] = useState<CollectibleType[]>([])

  const fetchCollectibles = useCallback(async () => {
    setLoadingCollectibles(true)

    const q = query(collection(db, 'collectibles'), where('verified', '==', false), orderBy('createdAt'), startAt(cursor), limit(1))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const collectibles: CollectibleType[] = []

      querySnapshot.forEach(doc => {
        collectibles.push(doc.data() as CollectibleType)
      })

      setCursor(querySnapshot.docs[querySnapshot.docs.length - 1])
      setCollectibles(x => [...x, ...collectibles])
    }
    else {
      setEnded(true)
    }

    setLoadingCollectibles(false)
  }, [cursor])

  useEffect(() => {
    fetchCollectibles()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { collectibles, loadingCollectibles, paginate: fetchCollectibles, ended }
}

export default useCollectiblesToVerify
