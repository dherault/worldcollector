import { doc, getDoc } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'

import { db } from '../firebase'
import { ItemType } from '../types'

function useItemById(id: string) {
  const [item, setItem] = useState<ItemType | null>(null)

  const fetchItem = useCallback(async () => {
    const itemResult = await getDoc(doc(db, 'items', id))

    setItem(itemResult.data() as ItemType)
  }, [id])

  useEffect(() => {
    fetchItem()
  }, [fetchItem])

  return item
}

export default useItemById
