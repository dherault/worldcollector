import { Slot } from 'expo-router'
import { NativeBaseProvider } from 'native-base'

import theme from '../src/theme'

export default function HomeLayout() {
  return (
    <NativeBaseProvider theme={theme}>
      <Slot />
    </NativeBaseProvider>
  )
}
