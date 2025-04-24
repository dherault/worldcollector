import { useEffect } from 'react'

import { logAnalytics } from '~firebase'

function useLogAnalytics(eventName: string, eventParams?: Record<string, any>) {
  useEffect(() => {
    logAnalytics(eventName, eventParams)
  }, [
    eventName,
    eventParams,
  ])
}

export default useLogAnalytics
