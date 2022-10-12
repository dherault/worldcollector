import { doc, getDoc } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'

import { db } from '../firebase'
import { ItemType } from '../types'

function useItemById(id: string) {
  const [loadingItem, setLoadingItem] = useState(true)
  const [item, setItem] = useState<ItemType | null>(null)

  const fetchItem = useCallback(async () => {
    const querySnapshot = await getDoc(doc(db, 'items', id))

    if (querySnapshot.exists()) setItem(querySnapshot.data() as ItemType)

    setLoadingItem(false)
  }, [id])

  useEffect(() => {
    fetchItem()
  }, [fetchItem])

  return { item, loadingItem }
}

export default useItemById
