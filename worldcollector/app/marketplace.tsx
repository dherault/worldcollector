import { StyleSheet, View } from 'react-native'

import Heading from '~components/Heading'

function MarketplaceScene() {
  return (
    <View style={styles.root}>
      <Heading>
        Marketplace
      </Heading>
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
})

export default MarketplaceScene
