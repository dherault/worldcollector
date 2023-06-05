import { NativeBaseProvider } from 'native-base'
import { Navigator, Slot } from 'expo-router'

import TabBar from '~components/TabBar'
import UserProvider from '~components/UserProvider'

import theme from '../src/theme'

function MainLayout() {
  return (
    <NativeBaseProvider theme={theme}>
      <UserProvider>
        <Navigator>
          <Slot />
          <TabBar />
        </Navigator>
      </UserProvider>
    </NativeBaseProvider>
  )
}

export default MainLayout
