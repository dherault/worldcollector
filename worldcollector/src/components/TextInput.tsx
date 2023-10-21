import { useState } from 'react'
import { TextInput as ReactNativeTextInput, StyleSheet, type TextInputProps, type ViewStyle } from 'react-native'

import theme from '~theme'

function TextInput({ style, ...props }: TextInputProps) {
  const [focused, setFocused] = useState(false)

  return (
    <ReactNativeTextInput
      style={[focused ? styles.rootFocused : styles.root, style]}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...props}
    />
  )
}

const baseStyle: ViewStyle = {
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: theme.colors.grey[200],
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 4,
  width: '100%',
}

const styles = StyleSheet.create({
  root: baseStyle,
  rootFocused: {
    ...baseStyle,
    borderColor: theme.colors.blue[500],
  },
})

export default TextInput
