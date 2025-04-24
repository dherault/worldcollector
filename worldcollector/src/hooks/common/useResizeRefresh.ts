import { useCallback, useState } from 'react'

import useEventListener from '~hooks/common/useEventListener'

function useResizeRefresh() {
  const [, setX] = useState(true)

  const handleResize = useCallback(() => {
    setX(x => !x)
  }, [])

  useEventListener('resize', handleResize)
}

export default useResizeRefresh
