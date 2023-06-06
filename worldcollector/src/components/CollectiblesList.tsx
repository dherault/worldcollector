import { Link } from 'expo-router'
import { Box, HStack } from 'native-base'

import { Collectible } from '~types'

type CollectiblesListProps = {
  collectibles: Collectible[]
}

function CollectiblesList({ collectibles }: CollectiblesListProps) {
  return (
    <HStack flexWrap="wrap">
      {collectibles.map(collectible => (
        <Box
          p={2}
          m={2}
          rounded="lg"
          key={collectible.id}
          bg="grey.100"
        >
          <Link href={`/-/${collectible.id}`}>
            {collectible.name}
          </Link>
        </Box>
      ))}
    </HStack>
  )
}

export default CollectiblesList
