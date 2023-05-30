import { Box, NativeBaseProvider } from 'native-base'

import theme from './theme'

function Main() {
  return (
    <NativeBaseProvider theme={theme}>
      <Box>Hello world</Box>
    </NativeBaseProvider>
  )
}

export default Main
