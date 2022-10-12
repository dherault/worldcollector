import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Div, H1 } from 'honorable'

import ViewerContext from '../contexts/ViewerContext'

import FullScreenSpinner from '../components/FullScreenSpinner'
import useItemById from '../hooks/useItemById'

function Item() {
  const { id = '' } = useParams()
  const { viewer } = useContext(ViewerContext)
  const item = useItemById(id)

  if (!item) {
    return (
      <FullScreenSpinner />
    )
  }

  return (
    <>
      <H1>{item.name}</H1>
      <Div>{item.description}</Div>
      {item.ownerId === viewer?.id && (
        <Div
          xflex="x4"
          gap={1}
        >
          <Div>You own that item</Div>
          <Button
            as={Link}
            to={`/~/${id}/sell`}
          >
            Sell
          </Button>
        </Div>
      )}
    </>
  )
}

export default Item
