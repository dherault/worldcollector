import { useCallback, useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-types
function useDebouncedCallback<T extends Function>(callback: T, delay = 300) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  return useCallback((...args: any) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }, [callback, delay]) as unknown as T
}

export default useDebouncedCallback
