import 'react-native-get-random-values' // Crypto polyfill
import { KeyboardAvoidingView, NativeBaseProvider } from 'native-base'
import { Navigator, Slot } from 'expo-router'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { decode } from 'base-64'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-core'

import TabBar from '~components/TabBar'
import UserProvider from '~components/UserProvider'

import theme from '../src/theme'

if (typeof atob === 'undefined') {
  global.atob = decode
}

console.log('process.env.NODE_ENV', process.env.NODE_ENV)
console.log('process.env.ALGOLIA_APP_ID', process.env.ALGOLIA_APP_ID)

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
)

function MainLayout() {
  return (
    <Navigator>
      <ActionSheetProvider>
        <NativeBaseProvider theme={theme}>
          <InstantSearch
            searchClient={searchClient}
            indexName="searchables"
          >
            <UserProvider>
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
            </UserProvider>
          </InstantSearch>
        </NativeBaseProvider>
      </ActionSheetProvider>
    </Navigator>
  )
}

export default MainLayout
