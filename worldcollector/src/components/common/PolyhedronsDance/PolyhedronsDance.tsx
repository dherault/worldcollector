import { type PropsWithChildren, useEffect, useRef } from 'react'

import useWindowSize from '~hooks/common/useWindowSize'

import handleCanvas from '~components/common/PolyhedronsDance/handleCanvas'

function PolyhedronsDance({ children }: PropsWithChildren) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const windowSize = useWindowSize()

  useEffect(() => {
    if (!canvasRef.current) return

    return handleCanvas(canvasRef.current)
  }, [windowSize])

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <canvas
          ref={canvasRef}
          className="h-full w-full"
        />
      </div>
      {children}
    </>
  )
}

export default PolyhedronsDance
