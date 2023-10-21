import { useCallback } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useRouter } from 'expo-router'

import type { Collectible } from '~types'

import CollectibleFrame from '~components/CollectibleFrame'
import CollectibleCartouche from '~components/CollectibleCartouche'

type CollectibleCardProps = {
  collectible: Collectible
}

function CollectibleCard({ collectible }: CollectibleCardProps) {
  const router = useRouter()

  const handlePress = useCallback(() => {
    router.push(`-/${collectible.id}`)
  }, [router, collectible])

  return (
    <Pressable
      style={styles.root}
      onPress={handlePress}
    >
      <CollectibleFrame collectible={collectible} />
      <View style={styles.cartouche}>
        <CollectibleCartouche collectible={collectible} />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  cartouche: {
    flex: 1,
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: 16,
  },
})

export default CollectibleCard
