import { type PressableProps, StyleSheet, type ViewStyle } from 'react-native'

import Hoverable from '~components/Hoverable'

import theme from '~theme'

type ButtonIconProps = Omit<PressableProps, 'style'> & {
  style?: ViewStyle
}

function ButtonIcon({ style, ...props }: ButtonIconProps) {
  return (
    <Hoverable
      style={[styles.root, style]}
      styleHover={[styles.rootHover, style]}
      {...props}
    />
  )
}

const baseStyle: ViewStyle = {
  padding: 4,
  borderRadius: 4,
}

const styles = StyleSheet.create({
  root: baseStyle,
  rootHover: {
    ...baseStyle,
    backgroundColor: theme.colors.grey[100],
  },
})

export default ButtonIcon
