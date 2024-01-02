import { StyleSheet, Text, View } from 'react-native'

function Page() {
  return (
    <View style={styles.root}>
      <Text>
        Hello World
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})

export default Page
