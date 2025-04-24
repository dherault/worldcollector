import { type RefObject, useEffect } from 'react'

function useOutsideClick(ref: RefObject<HTMLElement>, onOutsideClick: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      console.log('click')
      if (!ref.current || ref.current.contains(event.target as Node)) return

      onOutsideClick()
    }

    window.addEventListener('mousedown', handleClickOutside, { capture: true })

    return () => {
      window.removeEventListener('mousedown', handleClickOutside, { capture: true })
    }
  }, [
    ref,
    onOutsideClick,
  ])
}

export default useOutsideClick
