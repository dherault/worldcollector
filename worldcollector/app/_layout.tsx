import { NativeBaseProvider } from 'native-base'
import { Tabs } from 'expo-router'

import theme from '../src/theme'

import UserProvider from '../src/components/UserProvider'

export default function HomeLayout() {

  return (
    <NativeBaseProvider theme={theme}>
      <UserProvider>
        <Tabs
          initialRouteName="(home)"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tabs.Screen name="(home)" />
          <Tabs.Screen name="authentication" />
        </Tabs>
      </UserProvider>
    </NativeBaseProvider>
  )
}
