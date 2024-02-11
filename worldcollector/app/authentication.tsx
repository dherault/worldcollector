import { Text } from 'react-native'

import CustomImageBackground from '~components/CustomImageBackground'
import SafeLayout from '~components/SafeLayout'

function Page() {
  return (
    <CustomImageBackground source={require('../assets/splash-nologo.png')}>
      <SafeLayout>
        <Text>
          Rule #1
        </Text>
      </SafeLayout>
    </CustomImageBackground>
  )
}

export default Page
