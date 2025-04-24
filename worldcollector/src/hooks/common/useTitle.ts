import { useEffect } from 'react'

import { DEFAULT_TITLE } from '~constants'

function useTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | ${DEFAULT_TITLE}`

    return () => {
      document.title = DEFAULT_TITLE
    }
  }, [
    title,
  ])
}

export default useTitle
