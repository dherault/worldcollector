import { type PropsWithChildren } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

function Layout({ children }: PropsWithChildren) {
  const insets = useSafeAreaInsets()

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      {children}
    </View>
  )
}

export default Layout
