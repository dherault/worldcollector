import 'react-native-get-random-values' // Crypto polyfill
import { NativeBaseProvider } from 'native-base'
import { Navigator, Slot } from 'expo-router'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'

import TabBar from '~components/TabBar'
import UserProvider from '~components/UserProvider'
import WorldCollectorProviders from '~components/WorldCollectorProviders'

import theme from '../src/theme'

function MainLayout() {
  return (
    <ActionSheetProvider>
      <NativeBaseProvider theme={theme}>
        <UserProvider>
          <WorldCollectorProviders>
            <Navigator>
              <Slot />
              <TabBar />
            </Navigator>
          </WorldCollectorProviders>
        </UserProvider>
      </NativeBaseProvider>
    </ActionSheetProvider>
  )
}

export default MainLayout
