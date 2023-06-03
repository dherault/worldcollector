import { Drawer } from 'expo-router/drawer'

import Header from '../../src/components/Header'
import DrawerContent from '../../src/components/DrawerContent'

function HomeLayout() {
  return (
    <Drawer
      initialRouteName="index"
      screenOptions={{
        header: Header,
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
