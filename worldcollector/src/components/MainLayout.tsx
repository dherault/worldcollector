import { Drawer } from 'expo-router/drawer'

import Header from './Header'
import DrawerContent from './DrawerContent'

function MainLayout() {
  return (
    <Drawer
      screenOptions={{
        header: Header,
      }}
      drawerContent={DrawerContent}
    />
  )
}

export default MainLayout
