import { Slot } from 'expo-router'

import BaseLayout from '~components/BaseLayout'
import '~firebase'

function Layout() {
  return (
    <BaseLayout>
      <Slot />
    </BaseLayout>
  )
}

export default Layout
