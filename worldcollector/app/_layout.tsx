import { Slot } from 'expo-router'

import UserProvider from '~components/UserProvider'
import BaseLayout from '~components/BaseLayout'

function Layout() {
  return (
    <UserProvider>
      <BaseLayout>
        <Slot />
      </BaseLayout>
    </UserProvider>
  )
}

export default Layout
