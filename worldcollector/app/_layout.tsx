import { Slot } from 'expo-router'
import { NativeBaseProvider } from 'native-base'

import AuthenticationProvider from '../src/components/AuthenticationProvider'

import theme from '../src/theme'

export default function HomeLayout() {
  return (
    <NativeBaseProvider theme={theme}>
      <AuthenticationProvider>
        <Slot />
      </AuthenticationProvider>
    </NativeBaseProvider>
  )
}
