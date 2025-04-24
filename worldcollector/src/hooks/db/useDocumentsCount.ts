import { useCallback, useEffect, useState } from 'react'
import { type Query, getCountFromServer } from 'firebase/firestore'

function useDocumentsCount(query: Query) {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await getCountFromServer(query)

      console.log('response.data()', response.data())
      setCount(response.data().count)
    }
    catch (error) {
      console.error(error)
      setError(error as Error)
    }

    setLoading(false)
  }, [
    query,
  ])

  useEffect(() => {
    fetch()
  }, [
    fetch,
  ])

  return {
    count,
    loading,
    error,
    refetch: fetch,
  }
}

export default useDocumentsCount
