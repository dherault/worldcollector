import 'react-native-get-random-values' // Crypto polyfill
import { SafeAreaView, StyleSheet } from 'react-native'
import { Slot } from 'expo-router'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'

import TabBar from '~components/TabBar'
import UserProvider from '~components/UserProvider'

import '~firebase'

function Layout() {
  return (
    <ActionSheetProvider>
      <UserProvider>
        <SafeAreaView style={styles.safeAreaView}>
          <Slot />
          <TabBar />
        </SafeAreaView>
      </UserProvider>
    </ActionSheetProvider>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
})

export default Layout
