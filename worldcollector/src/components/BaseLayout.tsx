import { type PropsWithChildren } from 'react'
import { KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native'

import theme from '~theme'

const WIDTH = 400
const HEIGHT = 800

function BaseLayout({ children }: PropsWithChildren) {
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
            borderRadius: 32,
            border: `1px solid ${theme.colors.grey[200]}`,
            position: 'relative',
            display: 'flex',
            flex: 1,
            overflow: 'hidden',
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
      style={{ flex: 1 }}
    >
      {children}
    </KeyboardAvoidingView>
  )
}

export default BaseLayout
