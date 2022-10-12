import { useParams } from 'react-router-dom'
import { Button, Div, H1 } from 'honorable'

import { useCallback } from 'react'

import useViewer from '../hooks/useViewer'
import useItemById from '../hooks/useItemById'
import useMarketplaceItemByItemId from '../hooks/useMarketplaceItemByItemId'

import FullScreenSpinner from '../components/FullScreenSpinner'
import FullScreenNotFound from '../components/FullScreenNotFound'

function BuyItem() {
  const { id = '' } = useParams()
  const { viewer } = useViewer()
  const { item, loadingItem } = useItemById(id)
  const { marketplaceItem, loadingMarketplaceItem } = useMarketplaceItemByItemId(id)

  const handleBuy = useCallback(() => {

  }, [])

  if (loadingItem || loadingMarketplaceItem) {
    return (
      <FullScreenSpinner />
    )
  }

  if (!(item && marketplaceItem)) {
    return (
      <FullScreenNotFound />
    )
  }

  return (
    <>
      <H1>Buy {item.name}</H1>
      <Div>
        Price: {marketplaceItem.price}
      </Div>
      {viewer?.id !== marketplaceItem.userId && (
        <Button onClick={handleBuy}>
          Buy
        </Button>
      )}
    </>
  )
}

export default BuyItem
