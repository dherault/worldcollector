import { StyleSheet, Text, View } from 'react-native'

import CustomImageBackground from '~components/CustomImageBackground'

function Page() {
  return (
    <CustomImageBackground source={require('../assets/splash.png')}>
      <Text>
        Hello World
      </Text>
    </CustomImageBackground>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
})

export default Page
