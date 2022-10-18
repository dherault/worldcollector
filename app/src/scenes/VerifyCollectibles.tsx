import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { Button, Div, H1 } from 'honorable'

import { useCallback, useEffect, useState } from 'react'

import useCollectiblesToVerify from '../hooks/useCollectiblesToVerify'

import LayoutContainer from '../components/LayoutContainer'
import FullScreenSpinner from '../components/FullScreenSpinner'
import { CollectibleType } from '../types'
import useCollectibleById from '../hooks/useCollectibleById'

function VerifyCollectibles() {
  const { id = '' } = useParams()
  const { collectibles, loadingCollectibles, paginate, ended } = useCollectiblesToVerify()
  const { collectible, loadingCollectible } = useCollectibleById(id)
  const [collectibleIndex, setCollectibleIndex] = useState(0)

  const navigate = useNavigate()

  const handleDeny = useCallback(() => {

  }, [])

  const handleVerify = useCallback(() => {

  }, [])

  useEffect(() => {
    if (collectibles.length) {
      navigate(`/verify/${collectibles[collectibleIndex].id}`)
    }
  }, [navigate, collectibles, collectibleIndex])

  if (loadingCollectibles || loadingCollectible) {
    return (
      <FullScreenSpinner />
    )
  }

  return (
    <LayoutContainer>
      <H1>Verify collectible</H1>
      <Div mt={2}>
        {collectible?.name}
      </Div>
      <Div
        xflex="x2b"
        mt={2}
      >
        <Button onClick={handleDeny}>
          Deny
        </Button>
        <Button
          gradient="rainbow"
          onClick={handleVerify}
        >
          Verify
        </Button>
      </Div>
    </LayoutContainer>
  )
}

export default VerifyCollectibles
