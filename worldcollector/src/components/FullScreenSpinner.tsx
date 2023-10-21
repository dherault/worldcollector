import { ActivityIndicator, StyleSheet, View } from 'react-native'

function FullScreenSpinner() {
  return (
    <View style={styles.root}>
      <ActivityIndicator />
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

export default FullScreenSpinner
