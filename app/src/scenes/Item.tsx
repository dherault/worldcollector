import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { H1 } from 'honorable'
import { doc, getDoc } from 'firebase/firestore'

import { ItemType } from '../types'
import { db } from '../firebase'
import FullScreenSpinner from '../components/FullScreenSpinner'

function Item() {
  const { id = '' } = useParams()
  const [item, setItem] = useState<ItemType | null>(null)

  const fetchItem = useCallback(async () => {
    const itemResult = await getDoc(doc(db, 'items', id))

    setItem(itemResult.data() as ItemType)
  }, [id])
  useEffect(() => {
    fetchItem()
  }, [fetchItem])

  if (!item) {
    return (
      <FullScreenSpinner />
    )
  }

  return (
    <H1>{item.name}</H1>
  )
}

export default Item
