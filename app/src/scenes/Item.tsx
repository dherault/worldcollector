import { Link, useParams } from 'react-router-dom'
import { Button, Div, H1 } from 'honorable'

import useViewer from '../hooks/useViewer'
import useItemById from '../hooks/useItemById'
import useMarketplaceItemByItemId from '../hooks/useMarketplaceItemByItemId'

import FullScreenSpinner from '../components/FullScreenSpinner'
import FullScreenNotFound from '../components/FullScreenNotFound'

function Item() {
  const { id = '' } = useParams()
  const { viewer } = useViewer()
  const { item, loadingItem } = useItemById(id)
  const { marketplaceItem, loadingMarketplaceItem } = useMarketplaceItemByItemId(id)

  if (loadingItem || loadingMarketplaceItem) {
    return (
      <FullScreenSpinner />
    )
  }

  if (!item) {
    return (
      <FullScreenNotFound />
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
          {!marketplaceItem && (
            <Button
              as={Link}
              to={`/~/${id}/sell`}
            >
              Sell
            </Button>
          )}
        </Div>
      )}
      {marketplaceItem && (
        <Div
          xflex="x4"
          gap={1}
        >
          <Div>
            Price: {marketplaceItem.price}
          </Div>
          <Button
            as={Link}
            to={`/~/${id}/buy`}
          >
            Buy
          </Button>
        </Div>
      )}
    </>
  )
}

export default Item
