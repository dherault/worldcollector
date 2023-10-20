import { PropsWithChildren, useState } from 'react'
import { Pressable, ViewStyle } from 'react-native'

type HoverableProps = PropsWithChildren<{
  style: ViewStyle
  hoverStyle: ViewStyle
}>

function Hoverable({ children, style, hoverStyle }: HoverableProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Pressable
      style={hovered ? hoverStyle : style}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
    >
      {children}
    </Pressable>
  )
}

export default Hoverable
