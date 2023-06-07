import { Link } from 'expo-router'
import { Box, HStack, Pressable } from 'native-base'

import { Collectible } from '~types'

import CollectibleCard from './CollectibleCard'

type CollectiblesListProps = {
  collectibles: Collectible[]
}

function CollectiblesList({ collectibles }: CollectiblesListProps) {
  return (
    <HStack
      flexWrap="wrap"
      width="full"
    >
      {collectibles.map(collectible => (
        <Box
          p={2}
          width="50%"
          key={collectible.id}
        >
          <CollectibleCard collectible={collectible} />
        </Box>
      ))}
    </HStack>
  )
}

export default CollectiblesList
