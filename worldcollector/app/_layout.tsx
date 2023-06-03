import { NativeBaseProvider } from 'native-base'
import { Navigator, Slot } from 'expo-router'

import theme from '../src/theme'

import UserProvider from '../src/components/UserProvider'

function MainLayout() {
  return (
    <NativeBaseProvider theme={theme}>
      <UserProvider>
        <Navigator>
          <Slot />
        </Navigator>
      </UserProvider>
    </NativeBaseProvider>
  )
}

export default MainLayout
