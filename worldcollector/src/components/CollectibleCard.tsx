import { useCallback, useEffect, useState } from 'react'
import { type LayoutChangeEvent, Pressable, StyleSheet, View } from 'react-native'
import { Image } from 'expo-image'
import { getDownloadURL, ref } from 'firebase/storage'
import { useRouter } from 'expo-router'

import type { Collectible } from '~types'

import { storage } from '~firebase'

import CollectibleCartouche from '~components/CollectibleCartouche'

type CollectibleCardProps = {
  collectible: Collectible
}

const TOP_BOTTOM_RATIO = 162 / 1189
const LEFT_RIGHT_RATIO = 649 / 162
const LEFT_RIGHT_WIDTH_RATIO = 162 / 1189

function CollectibleCard({ collectible }: CollectibleCardProps) {
  const [width, setWidth] = useState(0)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const router = useRouter()

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width)
  }, [])

  const handlePress = useCallback(() => {
    router.push(`-/${collectible.id}`)
  }, [router, collectible])

  useEffect(() => {
    if (!collectible) return

    getDownloadURL(ref(storage, collectible.imageStoragePath))
      .then(setImageUrl)
  }, [collectible])

  return (
    <Pressable
      style={styles.root}
      onPress={handlePress}
      onLayout={handleLayout}
    >
      <View style={styles.column}>
        <Image
          source={require('../../assets/images/frames/frame-gold-top.png')}
          style={[styles.imageVertical, { height: width * TOP_BOTTOM_RATIO }]}
        />
        <View style={[styles.row, { height: width * LEFT_RIGHT_WIDTH_RATIO * LEFT_RIGHT_RATIO }]}>
          <Image
            source={require('../../assets/images/frames/frame-gold-left.png')}
            style={[styles.imageHorizontal, { width: width * LEFT_RIGHT_WIDTH_RATIO }]}
          />
          <View style={styles.container}>
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
            />
          </View>
          <Image
            source={require('../../assets/images/frames/frame-gold-right.png')}
            style={[styles.imageHorizontal, { width: width * LEFT_RIGHT_WIDTH_RATIO }]}
          />
        </View>
        <Image
          source={require('../../assets/images/frames/frame-gold-bottom.png')}
          style={[styles.imageVertical, { height: width * TOP_BOTTOM_RATIO }]}
        />
        <View style={styles.cartouche}>
          <CollectibleCartouche collectible={collectible} />
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  card: {
    width: '100%',
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  column: {
    display: 'flex',
  },
  container: {
    flexGrow: 1,
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageVertical: {
    width: '100%',
  },
  imageHorizontal: {
    height: '100%',
  },
  cartouche: {
    flex: 1,
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: 16,
  },
})

export default CollectibleCard
