import { useCallback, useEffect, useState } from 'react'

function useRefresh(twice = false) {
  const [, setRefresh] = useState(false)

  useEffect(() => {
    setRefresh(x => !x)

    if (!twice) return

    setTimeout(() => setRefresh(x => !x), 2)
  }, [twice])

  const handleRefresh = useCallback(() => {
    setRefresh(x => !x)
  }, [])

  return handleRefresh
}

export default useRefresh
