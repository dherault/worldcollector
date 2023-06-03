import { NativeBaseProvider } from 'native-base'
import { Navigator, Slot } from 'expo-router'

import theme from '../src/theme'

import UserProvider from '../src/components/UserProvider'

export default function HomeLayout() {

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
