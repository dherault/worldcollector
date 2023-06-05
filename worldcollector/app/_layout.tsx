import { Box, NativeBaseProvider } from 'native-base'
import { Navigator, Slot } from 'expo-router'

import TabBar from '../src/components/TabBar'

import theme from '../src/theme'

import UserProvider from '../src/components/UserProvider'

function MainLayout() {
  return (
    <NativeBaseProvider theme={theme}>
      <UserProvider>
        <Navigator>
          <Box
            safeAreaTop
            height="full"
          >
            <Slot />
            <TabBar />
          </Box>
        </Navigator>
      </UserProvider>
    </NativeBaseProvider>
  )
}

export default MainLayout
