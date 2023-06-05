import { Tabs, useRouter } from 'expo-router'

import TabBar from '../../src/components/TabBar'

function TabsLayout() {
  const router = useRouter()

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{ headerShown: false }}
      sceneContainerStyle={{ backgroundColor: 'transparent' }}
      tabBar={props => (
        <TabBar
          {...props}
          router={router}
        />
      )}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Home' }}
      />
      <Tabs.Screen
        name="marketplace"
        options={{ title: 'Marketplace' }}
      />
    </Tabs>
  )
}

export default TabsLayout
