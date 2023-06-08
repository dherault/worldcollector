import { Box, HStack, Image, Pressable, VStack } from 'native-base'
import { useCallback, useEffect, useState } from 'react'
import { getDownloadURL, ref } from 'firebase/storage'
import { LayoutChangeEvent } from 'react-native'
import { useRouter } from 'expo-router'

import { Collectible } from '~types'

import { storage } from '~firebase'

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
      flexGrow={1}
      width="100%"
      onPress={handlePress}
    >
      <Box
        width="100%"
        onLayout={handleLayout}
        position="relative"
        shadow={6}
        rounded="md"
        overflow="hidden"
      >
        <VStack>
          <Image
            source={require('../../assets/frames/frame-gold-top.png')}
            alt="Frame top"
            width="100%"
            height={width * TOP_BOTTOM_RATIO}
          />
          <HStack height={width * LEFT_RIGHT_WIDTH_RATIO * LEFT_RIGHT_RATIO}>
            <Image
              source={require('../../assets/frames/frame-gold-left.png')}
              alt="Frame left"
              width={width * LEFT_RIGHT_WIDTH_RATIO}
              height="100%"
            />
            <Box
              flexGrow={1}
              height="100%"
            >
              <Image
                source={{ uri: imageUrl }}
                alt={collectible.name}
                width="100%"
                height="100%"
              />
            </Box>
            <Image
              source={require('../../assets/frames/frame-gold-right.png')}
              alt="Frame right"
              width={width * LEFT_RIGHT_WIDTH_RATIO}
              height="100%"
            />
          </HStack>
          <Image
            source={require('../../assets/frames/frame-gold-bottom.png')}
            alt="Frame bottom"
            width="100%"
            height={width * TOP_BOTTOM_RATIO}
          />
        </VStack>
      </Box>
    </Pressable>
  )
}

export default CollectibleCard
