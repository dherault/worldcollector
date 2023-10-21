import { ScrollView, StyleSheet, View } from 'react-native'

import type { Collectible } from '~types'

import CollectibleCard from './CollectibleCard'

type CollectiblesListProps = {
  collectibles: Collectible[]
}

function CollectiblesList({ collectibles }: CollectiblesListProps) {
  return (
    <ScrollView style={styles.root}>
      {collectibles.map(collectible => (
        <View
          key={collectible.id}
          style={styles.container}
        >
          <CollectibleCard collectible={collectible} />
        </View>
      ))}
      <View style={styles.paddingBottom} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  container: {
    width: '100%',
    marginBottom: 32,
  },
  paddingBottom: {
    height: 64 + 32,
  },
})

export default CollectiblesList
