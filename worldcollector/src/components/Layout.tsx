import { type PropsWithChildren } from 'react'
import { KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import theme from '~theme'

const WIDTH = 400
const HEIGHT = 844

function Layout({ children }: PropsWithChildren) {
  const insets = useSafeAreaInsets()
  const { width } = useWindowDimensions()

  if (Platform.OS === 'web' && width > WIDTH) {
    return (
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.colors.grey[50],
        }}
      >
        <div
          style={{
            flexGrow: 1,
            width: WIDTH,
            maxHeight: HEIGHT,
            backgroundColor: 'white',
            borderRadius: 16,
            border: `1px solid ${theme.colors.grey[200]}`,
            position: 'relative',
          }}
        >
          {children}
        </div>
      </div>
    )
  }

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
