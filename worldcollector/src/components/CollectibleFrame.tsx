import { useCallback, useEffect, useState } from 'react'
import { type LayoutChangeEvent, StyleSheet, View } from 'react-native'
import { Image } from 'expo-image'
import { getDownloadURL, ref } from 'firebase/storage'

import type { Collectible } from '~types'

import { storage } from '~firebase'

type CollectibleFrameProps = {
  collectible: Collectible
}

const TOP_BOTTOM_RATIO = 162 / 1189
const LEFT_RIGHT_RATIO = 649 / 162
const LEFT_RIGHT_WIDTH_RATIO = 162 / 1189

function CollectibleFrame({ collectible }: CollectibleFrameProps) {
  const [width, setWidth] = useState(0)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width)
  }, [])

  useEffect(() => {
    if (!collectible) return

    getDownloadURL(ref(storage, collectible.imageStoragePath))
      .then(setImageUrl)
  }, [collectible])

  return (
    <View
      style={styles.column}
      onLayout={handleLayout}
    >
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
    </View>
  )
}

const styles = StyleSheet.create({
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
})

export default CollectibleFrame
