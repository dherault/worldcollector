import { useEffect, useMemo, useState } from 'react'
import { Div } from 'honorable'

const minScale = 0.75
const maxScale = 1.25

function randomFloat(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function createDots(colors: string[], radius: number) {
  return colors.map((color, i) => ({
    color,
    x: radius * Math.cos(Math.PI * 2 / colors.length * i),
    y: radius * Math.sin(Math.PI * 2 / colors.length * i),
  }))
}

function BlurryDot({ size = 128 + 64, colors = ['primary'] }) {
  const center = useMemo(() => ({ x: randomFloat(25, 75), y: randomFloat(25, 75) }), [])
  const radius = useMemo(() => randomFloat(size, 3 * size), [size])
  const direction = useMemo(() => Math.random() > 0.5 ? 1 : -1, [])
  const dots = useMemo(() => createDots(colors, size / 2), [colors, size])
  const [circleAngle, setCircleAngle] = useState(Math.random() * 2 * Math.PI)
  const [selfAngle, setSelfAngle] = useState(Math.random() * 2 * Math.PI)
  const [scale, setScale] = useState(randomFloat(minScale, maxScale))
  const [scaleDirection, setScaleDirection] = useState(Math.random() > 0.5 ? 1 : -1)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCircleAngle(a => a + direction * 0.005)
      setSelfAngle(a => a + direction * 0.0075)
      setScale(s => s + scaleDirection * 0.005)

      if (scale > maxScale) setScaleDirection(-1)
      if (scale < minScale) setScaleDirection(1)
    }, 250)

    return () => {
      clearInterval(intervalId)
    }
  }, [direction, scale, scaleDirection])

  return (
    <Div
      position="absolute"
      top={`calc(${center.y}% + ${radius * Math.sin(circleAngle)}px)`}
      left={`calc(${center.x}% + ${radius * Math.sin(circleAngle)}px)`}
      transform={`rotate(${selfAngle}rad) scale(${scale})`}
      transition="all 250ms linear"
      filter={`blur(${1.5 * size}px)`}
      zIndex={-1}
    >
      {dots.map((dot, i) => (
        <Div
          key={i}
          position="absolute"
          top={dot.y}
          left={dot.x}
          width={size}
          height={size}
          borderRadius="50%"
          backgroundColor={dot.color}
        />
      ))}
    </Div>
  )
}

export default BlurryDot
