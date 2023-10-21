import { Slot } from 'expo-router'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import UserProvider from '~components/UserProvider'
import Layout from '~components/Layout'
import TabBar from '~components/TabBar'

import '~firebase'

function RootLayout() {
  return (
    <SafeAreaProvider>
      <ActionSheetProvider>
        <UserProvider>
          <Layout>
            <Slot />
            <TabBar />
          </Layout>
        </UserProvider>
      </ActionSheetProvider>
    </SafeAreaProvider>
  )
}

export default RootLayout
