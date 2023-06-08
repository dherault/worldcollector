import { Box, HStack, Image, Pressable, Text, VStack } from 'native-base'
import { useCallback, useEffect, useRef, useState } from 'react'
import { getDownloadURL, ref } from 'firebase/storage'
import { BlurView } from 'expo-blur'
import { LayoutChangeEvent } from 'react-native'

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

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width)
  }, [])

  useEffect(() => {
    if (!collectible) return

    getDownloadURL(ref(storage, collectible.imageStoragePath))
      .then(setImageUrl)
  }, [collectible])

  return (
    <Pressable
      flexGrow={1}
      width="100%"
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
          <HStack>
            <Image
              source={require('../../assets/frames/frame-gold-left.png')}
              alt="Frame left"
              width={width * LEFT_RIGHT_WIDTH_RATIO}
              height={width * LEFT_RIGHT_WIDTH_RATIO * LEFT_RIGHT_RATIO}
            />
            <Box flexGrow={1} />
            <Image
              source={require('../../assets/frames/frame-gold-right.png')}
              alt="Frame right"
              width={width * LEFT_RIGHT_WIDTH_RATIO}
              height={width * LEFT_RIGHT_WIDTH_RATIO * LEFT_RIGHT_RATIO}
            />
          </HStack>
          <Image
            source={require('../../assets/frames/frame-gold-bottom.png')}
            alt="Frame bottom"
            width="100%"
            height={width * TOP_BOTTOM_RATIO}
          />
        </VStack>
        {/* <Image
          source={{ uri: imageUrl }}
          alt={collectible.name}
          width="100%"
          height={128}
        />
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
        >
          <BlurView tint="dark">
            <Box p={2}>
              <Text color="white.500">
                {collectible.name}
              </Text>
            </Box>
          </BlurView>
        </Box> */}
      </Box>
    </Pressable>
  )
}

export default CollectibleCard
