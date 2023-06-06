import { useCallback, useEffect, useState } from 'react'
import { Query, onSnapshot } from 'firebase/firestore'

function useArrayLiveQuery<T>(query: Query) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(() => onSnapshot(query, querySnapshot => {
    const data: T[] = []

    querySnapshot.forEach(doc => {
      data.push(doc.data() as T)
    })

    setData(data)
    setLoading(false)
  }), [query])

  useEffect(fetch, [fetch])

  return { data, loading }
}

export default useArrayLiveQuery
