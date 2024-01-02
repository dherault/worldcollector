import {
  type PressableProps,
  StyleSheet,
  Text,
  type ViewStyle,
} from 'react-native'

import Hoverable from '~components/Hoverable'

import theme from '~theme'

type ButtonPrimaryLargeProps = Omit<PressableProps, 'children' | 'style'> & {
  children: string
  style?: ViewStyle
}

function ButtonPrimaryLarge({ children, style, ...props }: ButtonPrimaryLargeProps) {
  return (
    <Hoverable
      {...props}
      style={[styles.root, style]}
      styleHover={[styles.rootHover, style]}
    >
      <Text style={styles.text}>
        {children}
      </Text>
    </Hoverable>
  )
}

const baseRootStyle: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
}

const styles = StyleSheet.create({
  root: {
    ...baseRootStyle,
    backgroundColor: theme.colors.red[500],
  },
  rootHover: {
    ...baseRootStyle,
    backgroundColor: theme.colors.red[600],
  },
  text: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: 'white',
    fontSize: 16,
  },
})

export default ButtonPrimaryLarge
