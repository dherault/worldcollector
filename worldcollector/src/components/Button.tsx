import {
  type PressableProps,
  StyleSheet,
  Text,
  type TextStyle,
  type ViewStyle,
} from 'react-native'

import Hoverable from '~components/Hoverable'

import theme from '~theme'

type ButtonProps = Omit<PressableProps, 'children'> & {
  children: string
  variant?: 'ghost' | 'contained'
}

function Button({ children, variant = 'contained', ...props }: ButtonProps) {
  return (
    <Hoverable
      {...props}
      style={variant === 'ghost' ? styles.rootGhost : styles.rootContained}
      hoverStyle={variant === 'ghost' ? styles.rootGhostHover : styles.rootContainedHover}
    >
      <Text style={variant === 'ghost' ? styles.textGhost : styles.textContained}>
        {children}
      </Text>
    </Hoverable>
  )
}

const baseRootStyle: ViewStyle = {
  borderRadius: 4,
}

const baseTextStyle: TextStyle = {
  paddingVertical: 8,
  paddingHorizontal: 16,
}

const styles = StyleSheet.create({
  rootContained: {
    ...baseRootStyle,
    backgroundColor: theme.colors.blue[500],
  },
  rootContainedHover: {
    ...baseRootStyle,
    backgroundColor: theme.colors.blue[600],
  },
  rootGhost: baseRootStyle,
  rootGhostHover: {
    ...baseRootStyle,
    backgroundColor: theme.colors.grey[100],
  },
  textContained: {
    ...baseTextStyle,
    color: 'white',
  },
  textGhost: {
    ...baseTextStyle,
    color: theme.colors.blue[500],
  },
})

export default Button
