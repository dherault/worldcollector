import { Slot } from 'expo-router'
import { SafeAreaView, StyleSheet } from 'react-native'

import TabBar from '~components/TabBar'

import '~firebase'

function Layout() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Slot />
      <TabBar />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
})

export default Layout
