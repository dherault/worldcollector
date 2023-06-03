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
          <Tabs.Screen
            name="(home)"
            options={{ title: 'Home' }}
          />
          <Tabs.Screen
            name="marketplace"
            options={{ title: 'Marketplace' }}
          />
          <Tabs.Screen
            name="authentication"
            options={{ title: 'Welcome, collector' }}
          />
        </Tabs>
      </UserProvider>
    </NativeBaseProvider>
  )
}
