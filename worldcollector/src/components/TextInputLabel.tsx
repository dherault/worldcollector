import { StyleSheet, Text, type TextProps } from 'react-native'

function TextInputLabel({ style, ...props }: TextProps) {
  return (
    <Text
      style={[styles.root, style]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  root: {
    fontWeight: 'bold',
    marginBottom: 4,
    alignSelf: 'flex-start',
    fontSize: 12,
  },
})

export default TextInputLabel
