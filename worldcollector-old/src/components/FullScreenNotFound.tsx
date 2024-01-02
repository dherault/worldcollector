import { StyleSheet, Text, View } from 'react-native'

function FullScreenNotFound() {
  return (
    <View style={styles.root}>
      <Text>
        Not found
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default FullScreenNotFound
