import 'react-native-get-random-values' // Crypto polyfill
import { KeyboardAvoidingView, NativeBaseProvider } from 'native-base'
import { Navigator, Slot } from 'expo-router'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { decode } from 'base-64'

import TabBar from '~components/TabBar'
import UserProvider from '~components/UserProvider'
import WorldCollectorProviders from '~components/WorldCollectorProviders'

import theme from '../src/theme'

if (typeof atob === 'undefined') {
  global.atob = decode
}

function MainLayout() {
  return (
    <ActionSheetProvider>
      <NativeBaseProvider theme={theme}>
        <UserProvider>
          <WorldCollectorProviders>
            <Navigator>
              <KeyboardAvoidingView
                flex={1}
                behavior="height"
                contentContainerStyle={{
                  flexGrow: 1,
                  position: 'relative',
                }}
              >
                <Slot />
                <TabBar />
              </KeyboardAvoidingView>
            </Navigator>
          </WorldCollectorProviders>
        </UserProvider>
      </NativeBaseProvider>
    </ActionSheetProvider>
  )
}

export default MainLayout
