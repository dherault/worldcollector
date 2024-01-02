import { StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image'

import Heading from '~components/Heading'

const IMAGE_RATIO = 598 / 581

function MarketplaceScene() {
  return (
    <View style={styles.root}>
      <Heading>
        Marketplace
      </Heading>
      <Text style={styles.textCommingSoon}>
        Comming soon!
      </Text>
      <Text style={styles.textInfo}>
        A marketplace to exchange your collectibles with other collectors.
      </Text>
      <Image
        source={require('../assets/images/flowers.svg')}
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  textCommingSoon: {
    marginTop: 32,
    fontSize: 16,
    textAlign: 'center',
  },
  textInfo: {
    marginTop: 16,
    fontSize: 16,
    paddingHorizontal: 32,
    textAlign: 'center',
  },
  image: {
    marginTop: 64,
    width: (256 - 64),
    height: (256 - 64) / IMAGE_RATIO,
  },
})

export default MarketplaceScene
