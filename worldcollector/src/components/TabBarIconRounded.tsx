import { PropsWithChildren } from 'react'
import { StyleSheet, ViewStyle } from 'react-native'

import Hoverable from '~components/Hoverable'

import theme from '~theme'

type TabBarIconRoundedProps = PropsWithChildren

function TabBarIconRounded({ children }: TabBarIconRoundedProps) {

  return (
    <Hoverable
      style={styles.root}
      hoverStyle={styles.rootHovered}
    >
      {children}
    </Hoverable>
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
