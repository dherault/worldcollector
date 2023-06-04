import { Drawer } from 'expo-router/drawer'

import HeaderRight from '../../src/components/HeaderRight'
import DrawerContent from '../../src/components/DrawerContent'

function HomeLayout() {
  return (
    <Drawer
      initialRouteName="index"
      screenOptions={{
        headerRight: HeaderRight,
      }}
      drawerContent={DrawerContent}
    >
      <Drawer.Screen
        name="index"
        options={{ title: 'Home' }}
      />
      <Drawer.Screen
        name="marketplace"
        options={{ title: 'Marketplace' }}
      />
    </Drawer>
  )
}

export default HomeLayout
