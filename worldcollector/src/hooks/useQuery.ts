import { useCallback, useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'

import { CollectionsType } from '~types'

import { db } from '~firebase'

function useQuery<T>(collection: CollectionsType, resourceId: string | null) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    if (resourceId === null) return

    const docSnapshot = await getDoc(doc(db, collection, resourceId))

    if (docSnapshot.exists()) setData(docSnapshot.data() as T)

    setLoading(false)
  }, [collection, resourceId])

  useEffect(() => {
    fetch()
  }, [fetch])

  return { data, loading }
}

export default useQuery
