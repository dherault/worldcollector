import { type PressableProps, StyleSheet, type ViewStyle } from 'react-native'

import Hoverable from '~components/Hoverable'

import theme from '~theme'

function TabBarIconRounded(props: PressableProps) {

  return (
    <Hoverable
      style={styles.root}
      styleHover={styles.rootHovered}
      {...props}
    />
  )
}

const baseStyle: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 24,
  padding: 8,
  backgroundColor: theme.colors.red[500],
} as const

const styles = StyleSheet.create({
  root: baseStyle,
  rootHovered: {
    ...baseStyle,
    backgroundColor: theme.colors.red[600],
  },
})

export default TabBarIconRounded
