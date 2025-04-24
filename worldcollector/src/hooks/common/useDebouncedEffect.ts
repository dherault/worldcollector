import { useEffect, useRef } from 'react'

function useDebouncedEffect(effect: () => void, delay: number, deps: any[],): void {
  const callback = useRef(effect)
  const timeoutId = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    callback.current = effect
  }, [effect])

  useEffect(() => {
    timeoutId.current = setTimeout(() => {
      callback.current()
    }, delay)

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, delay])
}

export default useDebouncedEffect
