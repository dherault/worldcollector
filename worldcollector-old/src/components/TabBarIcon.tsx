import { type PressableProps, StyleSheet, type ViewStyle } from 'react-native'

import Hoverable from '~components/Hoverable'

import theme from '~theme'

type TabBarIconProps = PressableProps & {
  active: boolean
}

function TabBarIcon({ active, ...props }: TabBarIconProps) {

  return (
    <Hoverable
      style={active ? styles.rootActive : styles.root}
      styleHover={styles.rootHovered}
      {...props}
    />
  )
}

const baseStyle: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
  paddingHorizontal: 12,
  paddingVertical: 8,
} as const

const styles = StyleSheet.create({
  root: baseStyle,
  rootActive: {
    ...baseStyle,
    backgroundColor: theme.colors.grey[200],
  },
  rootHovered: {
    ...baseStyle,
    backgroundColor: theme.colors.grey[300],
  },
})

export default TabBarIcon
