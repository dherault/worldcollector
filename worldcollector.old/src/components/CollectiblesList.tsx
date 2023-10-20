import { Link } from 'expo-router'
import { Box, HStack, Pressable, ScrollView } from 'native-base'

import { Collectible } from '~types'

import CollectibleCard from './CollectibleCard'

type CollectiblesListProps = {
  collectibles: Collectible[]
}

function CollectiblesList({ collectibles }: CollectiblesListProps) {
  return (
    <ScrollView
      width="100%"
      px={4}
    >
      {collectibles.map(collectible => (
        <Box
          mb={8}
          width="100%"
          key={collectible.id}
        >
          <CollectibleCard collectible={collectible} />
        </Box>
      ))}
    </ScrollView>
  )
}

export default CollectiblesList
