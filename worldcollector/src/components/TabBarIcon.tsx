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
      hoverStyle={active ? styles.rootHoveredActive : styles.rootHovered}
    >
      {children}
    </Hoverable>
  )
}

const baseStyle: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
  padding: 4,
} as const

const styles = StyleSheet.create({
  root: baseStyle,
  rootActive: {
    ...baseStyle,
    backgroundColor: theme.colors.red[500],
  },
  rootHovered: {
    ...baseStyle,
    backgroundColor: theme.colors.grey[300],
  },
  rootHoveredActive: {
    ...baseStyle,
    backgroundColor: theme.colors.red[600],
  },
})

export default TabBarIcon
