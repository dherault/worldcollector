import { PropsWithChildren, useState } from 'react'
import { View, ViewStyle } from 'react-native'

type HoverableProps = PropsWithChildren<{
  style: ViewStyle
  hoverStyle: ViewStyle
}>

function Hoverable({ children, style, hoverStyle }: HoverableProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <View
      style={hovered ? hoverStyle : style}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
    >
      {children}
    </View>
  )
}

export default Hoverable
