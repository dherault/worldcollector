import { StyleSheet, Text, type TextProps } from 'react-native'

function Heading(props: TextProps) {
  return (
    <Text
      {...props}
      style={styles.root}
    />
  )
}

const styles = StyleSheet.create({
  root: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})

export default Heading
