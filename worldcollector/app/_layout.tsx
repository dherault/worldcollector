import { Slot } from 'expo-router'
import { SafeAreaView, StyleSheet } from 'react-native'

import TabBar from '~components/TabBar'
import UserProvider from '~components/UserProvider'

import '~firebase'

function Layout() {
  return (
    <UserProvider>
      <SafeAreaView style={styles.safeAreaView}>
        <Slot />
        <TabBar />
      </SafeAreaView>
    </UserProvider>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
})

export default Layout
