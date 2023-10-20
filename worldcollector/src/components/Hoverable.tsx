import { useState } from 'react'
import { Pressable, PressableProps, type ViewStyle } from 'react-native'

type HoverableProps = PressableProps & {
  style: ViewStyle
  hoverStyle: ViewStyle
}

function Hoverable({ children, style, hoverStyle, ...props }: HoverableProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Pressable
      style={hovered ? hoverStyle : style}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
      {...props}
    >
      {children}
    </Pressable>
  )
}

export default Hoverable
