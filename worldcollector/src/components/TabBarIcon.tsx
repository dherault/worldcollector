import { PropsWithChildren } from 'react'
import { StyleSheet, ViewStyle } from 'react-native'

import Hoverable from '~components/Hoverable'

import theme from '~theme'

type TabBarIconProps = PropsWithChildren<{
  active: boolean
}>

function TabBarIcon({ children, active }: TabBarIconProps) {

  return (
    <Hoverable
      style={active ? styles.rootActive : styles.root}
      hoverStyle={styles.rootHovered}
    >
      {children}
    </Hoverable>
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
