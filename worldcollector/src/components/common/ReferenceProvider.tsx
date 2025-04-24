import { type PropsWithChildren, useEffect } from 'react'
import { useSearchParams } from 'react-router'

import { logAnalytics } from '~firebase'

import ReferenceContext from '~contexts/reference/ReferenceContext'

import usePersistedState from '~hooks/common/usePersistedState'

const REFERENCE_SEARCH_PARAMETER = 'ref'

function ReferenceProvider({ children }: PropsWithChildren) {
  const [searchParams, setSearchParams] = useSearchParams()

  const [reference, setReference] = usePersistedState('reference', '')

  useEffect(() => {
    const reference = searchParams.get(REFERENCE_SEARCH_PARAMETER) ?? ''

    if (!reference) return

    setReference(reference)

    setSearchParams(sp => {
      sp.delete(REFERENCE_SEARCH_PARAMETER)

      return sp
    })

    logAnalytics('reference', {
      reference,
    })
  }, [
    searchParams,
    setSearchParams,
    setReference,
  ])

  return (
    <ReferenceContext.Provider value={reference}>
      {children}
    </ReferenceContext.Provider>
  )
}

export default ReferenceProvider
