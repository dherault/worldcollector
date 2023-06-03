import { Slot } from 'expo-router'
import { Box, NativeBaseProvider, StatusBar } from 'native-base'

import theme from '../src/theme'

import UserProvider from '../src/components/UserProvider'

export default function HomeLayout() {
  return (
    <NativeBaseProvider theme={theme}>
      <UserProvider>
        <StatusBar animated />
        <Box
          safeArea
          p={2}
        >
          <Slot />
        </Box>
      </UserProvider>
    </NativeBaseProvider>
  )
}
