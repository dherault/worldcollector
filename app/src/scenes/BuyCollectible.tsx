import { useParams } from 'react-router-dom'
import { Button, Div, H1 } from 'honorable'

import { useCallback } from 'react'

import useViewer from '../hooks/useViewer'
import useItemById from '../hooks/useCollectibleById'
import useMarketplaceCollectibleByCollectibleId from '../hooks/useMarketplaceCollectibleByCollectibleId'

import FullScreenSpinner from '../components/FullScreenSpinner'
import FullScreenNotFound from '../components/FullScreenNotFound'

function BuyCollectible() {
  const { id = '' } = useParams()
  const { viewer } = useViewer()
  const { collectible, loadingCollectible } = useItemById(id)
  const { marketplaceCollectible, loadingMarketplaceCollectible } = useMarketplaceCollectibleByCollectibleId(id)

  const handleBuy = useCallback(() => {

  }, [])

  if (loadingCollectible || loadingMarketplaceCollectible) {
    return (
      <FullScreenSpinner />
    )
  }

  if (!(collectible && marketplaceCollectible)) {
    return (
      <FullScreenNotFound />
    )
  }

  return (
    <>
      <H1>Buy {collectible.name}</H1>
      <Div>
        Price: {marketplaceCollectible.price}
      </Div>
      {viewer?.id !== marketplaceCollectible.userId && (
        <Button onClick={handleBuy}>
          Buy
        </Button>
      )}
    </>
  )
}

export default BuyCollectible
