import { type PropsWithChildren } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

function Layout({ children }: PropsWithChildren) {
  const insets = useSafeAreaInsets()

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{ flex: 1, paddingTop: insets.top }}
    >
      {children}
    </KeyboardAvoidingView>
  )
}

export default Layout
