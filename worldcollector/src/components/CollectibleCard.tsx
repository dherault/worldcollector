import { Image, Pressable } from 'native-base'
import { useEffect, useState } from 'react'
import { getDownloadURL, ref } from 'firebase/storage'

import { Collectible } from '~types'

import { storage } from '~firebase'

type CollectibleCardProps = {
  collectible: Collectible
}

function CollectibleCard({ collectible }: CollectibleCardProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!collectible) return

    getDownloadURL(ref(storage, collectible.imageStoragePath))
      .then(setImageUrl)
  }, [collectible])

  console.log('imageUrl', imageUrl)

  return (
    <Pressable
      flexGrow={1}
      position="relative"
      shadow={6}
      rounded="md"
      overflow="hidden"
    >
      <Image
        source={{ uri: imageUrl }}
        alt={collectible.name}
        width="100%"
        height={128}
      />
    </Pressable>
  )
}

export default CollectibleCard
