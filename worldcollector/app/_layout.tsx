import { Slot } from 'expo-router'
import { NativeBaseProvider } from 'native-base'

import theme from '../src/theme'

import UserProvider from '../src/components/UserProvider'

export default function HomeLayout() {
  return (
    <NativeBaseProvider theme={theme}>
      <UserProvider>
        <Slot />
      </UserProvider>
    </NativeBaseProvider>
  )
}
