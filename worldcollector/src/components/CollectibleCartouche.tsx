import { Image } from 'expo-image'
import { StyleSheet, Text, View } from 'react-native'

import type { Collectible } from '~types'

import theme from '~theme'

type CollectibleCartoucheProps = {
  collectible: Collectible
}

const IMAGE_RATIO = 256 / 630

function CollectibleCartouche({ collectible }: CollectibleCartoucheProps) {
  return (
    <View style={styles.root}>
      <Image
        source={require('../../assets/images/cartouches/2-left.png')}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.text}>
          {collectible.name}
        </Text>
      </View>
      <Image
        source={require('../../assets/images/cartouches/2-right.png')}
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    height: 16 / IMAGE_RATIO,
    width: 16,
    tintColor: theme.colors.gold[400],
  },
  content: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.gold[400],
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
})

export default CollectibleCartouche
