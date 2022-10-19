import { Link, useParams } from 'react-router-dom'
import { Button, Div, H1 } from 'honorable'

import useViewer from '../hooks/useViewer'
import useCollectibleById from '../hooks/useCollectibleById'
import useMarketplaceCollectibleByCollectibleId from '../hooks/useMarketplaceCollectibleByCollectibleId'

import FullScreenSpinner from '../components/FullScreenSpinner'
import FullScreenNotFound from '../components/FullScreenNotFound'
import LayoutContainer from '../components/LayoutContainer'

function Collectible() {
  const { id = '' } = useParams()
  const { viewer } = useViewer()
  const { collectible, loadingCollectible } = useCollectibleById(id)
  const { marketplaceCollectible, loadingMarketplaceCollectible } = useMarketplaceCollectibleByCollectibleId(id)

  if (loadingCollectible || loadingMarketplaceCollectible) {
    return (
      <FullScreenSpinner />
    )
  }

  if (!collectible) {
    return (
      <FullScreenNotFound />
    )
  }

  return (
    <LayoutContainer>
      <H1>
        {collectible.name}
      </H1>
      <Div mt={2}>
        {collectible.description}
      </Div>
      {collectible.ownerId === viewer?.id && (
        <Div
          xflex="x4"
          gap={1}
          mt={2}
        >
          <Div>You own that collectible</Div>
          {!marketplaceCollectible && (
            <Button
              as={Link}
              to={`/~/${id}/sell`}
            >
              Sell
            </Button>
          )}
        </Div>
      )}
      {marketplaceCollectible && (
        <Div
          xflex="x4"
          gap={1}
          mt={2}
        >
          <Div>
            Price: {marketplaceCollectible.price}
          </Div>
          <Button
            as={Link}
            to={`/~/${id}/buy`}
          >
            Buy
          </Button>
        </Div>
      )}
    </LayoutContainer>
  )
}

export default Collectible
