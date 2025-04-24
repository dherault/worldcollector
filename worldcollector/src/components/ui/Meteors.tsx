import { useEffect, useRef, useState } from 'react'

import { cn } from '~utils/ui'

interface MeteorsProps {
  number?: number;
}

export function Meteors({ number = 20 }: MeteorsProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    [],
  )

  useEffect(() => {
    if (!rootRef.current) return

    const { width } = rootRef.current.getBoundingClientRect()
    const styles = [...new Array(number)].map(() => ({
      top: -6,
      left: `${Math.floor(Math.random() * 2 * width - width)}px`,
      animationDelay: `${Math.random() * 1 + 0.2}s`,
      animationDuration: `${Math.floor(Math.random() * 8 + 2)}s`,
    }))
    setMeteorStyles(styles)
  }, [number])

  return (
    <div
      ref={rootRef}
      className="relative h-full w-full"
    >
      {[...meteorStyles].map((style, idx) => (
        // Meteor Head
        <div
          key={idx}
          className={cn(
            'pointer-events-none absolute left-1/2 top-1/2 size-0.5 rotate-[215deg] animate-meteor rounded-full bg-primary shadow-[0_0_0_1px_#ffffff10]',
          )}
          style={style}
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-primary to-transparent" />
        </div>
      ))}
    </div>
  )
}

export default Meteors
