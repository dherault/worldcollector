import { ReactNode, useMemo, useState } from 'react'

import RouteTitlesContext from '~contexts/RouteTitlesContext'

type WorldCollectorProvidersProps = {
  children: ReactNode
}

function WorldCollectorProviders({ children }: WorldCollectorProvidersProps) {
  const [routeTitles, setRouteTitles] = useState<Record<string, string>>({})
  const routeTitlesContextValue = useMemo(() => ({ routeTitles, setRouteTitles }), [routeTitles])

  return (
    <RouteTitlesContext.Provider value={routeTitlesContextValue}>
      {children}
    </RouteTitlesContext.Provider>
  )
}

export default WorldCollectorProviders
