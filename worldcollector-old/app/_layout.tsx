import 'react-native-get-random-values' // Crypto polyfill
import { Slot } from 'expo-router'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { InstantSearch } from 'react-instantsearch-core'
import algoliasearch from 'algoliasearch/lite'

import UserProvider from '~components/UserProvider'
import Layout from '~components/Layout'
import TabBar from '~components/TabBar'

import '~firebase'

const searchClient = algoliasearch(
  process.env.EXPO_PUBLIC_ALGOLIA_APP_ID,
  process.env.EXPO_PUBLIC_ALGOLIA_API_KEY
)

function RootLayout() {

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="searchables"
    >
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
    </InstantSearch>
  )
}

export default RootLayout
