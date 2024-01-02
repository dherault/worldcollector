import { Slot } from 'expo-router'

import BaseLayout from '~components/BaseLayout'

function Layout() {
  return (
    <BaseLayout>
      <Slot />
    </BaseLayout>
  )
}

export default Layout
