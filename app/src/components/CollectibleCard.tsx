import { Div } from 'honorable'
import { Link } from 'react-router-dom'

import { CollectibleType } from '../types'

type CollectibleCardProps = {
  collectible: CollectibleType
}

function CollectibleCard({ collectible }: CollectibleCardProps) {
  return (
    <Div
      as={Link}
      to={`/~/${collectible.id}`}
      display="block"
      textDecoration="none"
      color="inherit"
      border="1px solid yellow.500"
      p={1}
    >
      <Div>{collectible.name}</Div>
      <Div>{collectible.description}</Div>
    </Div>
  )
}

export default CollectibleCard
