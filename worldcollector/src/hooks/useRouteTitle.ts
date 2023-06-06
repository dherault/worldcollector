import { useContext, useEffect } from 'react'

import RouteTitlesContext from '~contexts/RouteTitlesContext'

function useRouteTitle(key: string, title: string) {
  const { setRouteTitles } = useContext(RouteTitlesContext)

  useEffect(() => {
    setRouteTitles(x => ({
      ...x,
      [key]: title ?? x[key] ?? '',
    }))
  }, [key, title, setRouteTitles])
}

export default useRouteTitle
