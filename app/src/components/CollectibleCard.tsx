import { Div } from 'honorable'

import { CollectibleType } from '../types'

type CollectibleCardProps = {
  collectible: CollectibleType
}

function CollectibleCard({ collectible }: CollectibleCardProps) {
  return (
    <Div
      border="1px solid yellow.500"
      p={1}
    >
      <Div>{collectible.name}</Div>
      <Div>{collectible.description}</Div>
    </Div>
  )
}

export default CollectibleCard
