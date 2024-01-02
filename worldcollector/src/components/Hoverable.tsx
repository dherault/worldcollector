import { useState } from 'react'
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native'

type HoverableProps = PressableProps & {
  style: StyleProp<ViewStyle>
  styleHover: StyleProp<ViewStyle>
}

function Hoverable({ children, style, styleHover, ...props }: HoverableProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Pressable
      style={hovered ? styleHover : style}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
      {...props}
    >
      {children}
    </Pressable>
  )
}

export default Hoverable
