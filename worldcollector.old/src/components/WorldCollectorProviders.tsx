import { ReactNode } from 'react'

type WorldCollectorProvidersProps = {
  children: ReactNode
}

function WorldCollectorProviders({ children }: WorldCollectorProvidersProps) {

  return children as JSX.Element
}

export default WorldCollectorProviders
