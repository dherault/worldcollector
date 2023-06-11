import 'react-native-get-random-values' // Crypto polyfill
import { KeyboardAvoidingView, NativeBaseProvider } from 'native-base'
import { Navigator, Slot } from 'expo-router'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { decode } from 'base-64'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-hooks-web'

import TabBar from '~components/TabBar'
import UserProvider from '~components/UserProvider'
import WorldCollectorProviders from '~components/WorldCollectorProviders'

import theme from '../src/theme'

if (typeof atob === 'undefined') {
  global.atob = decode
}

console.log('process.env.ALGOLIA_APP_ID', process.env.ALGOLIA_APP_ID)

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID || 'T09Y7M6GOZ',
  process.env.ALGOLIA_API_KEY || 'b563e3fa82ff3bacbdea9c369a2ea633'
)

function MainLayout() {
  return (
    <ActionSheetProvider>
      <NativeBaseProvider theme={theme}>
        <InstantSearch
          searchClient={searchClient}
          indexName="searchables"
        >
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
        </InstantSearch>
      </NativeBaseProvider>
    </ActionSheetProvider>
  )
}

export default MainLayout
