import { StyleSheet, Text } from 'react-native'

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
})

export default Page
