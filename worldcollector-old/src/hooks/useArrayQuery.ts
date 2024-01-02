import { useCallback, useEffect, useState } from 'react'
import { Query, getDocs } from 'firebase/firestore'

function useArrayQuery<T>(query: Query, enabled = true) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    const querySnapshot = await getDocs(query)
    const data: T[] = []

    querySnapshot.forEach(doc => {
      data.push(doc.data() as T)
    })

    setData(data)
    setLoading(false)
  }, [query])

  useEffect(() => {
    if (!enabled) return

    fetch()
  }, [enabled, fetch])

  return { data, loading }
}

export default useArrayQuery
