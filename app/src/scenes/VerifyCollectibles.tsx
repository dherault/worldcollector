import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Div, H1 } from 'honorable'
import { doc, setDoc, updateDoc } from 'firebase/firestore'

import { db } from '../firebase'

import useCollectiblesToVerify from '../hooks/useCollectiblesToVerify'

import LayoutContainer from '../components/LayoutContainer'
import FullScreenSpinner from '../components/FullScreenSpinner'
import useCollectibleById from '../hooks/useCollectibleById'
import FullScreenNotFound from '../components/FullScreenNotFound'
import CollectibleCard from '../components/CollectibleCard'
import SimilarCollectibles from '../components/SimilarCollectibles'

function VerifyCollectibles() {
  const { id = '' } = useParams()
  const { collectibles, loadingCollectibles, paginate, ended } = useCollectiblesToVerify()
  const { collectible, loadingCollectible } = useCollectibleById(id)
  const [collectibleIndex, setCollectibleIndex] = useState(0)
  const navigate = useNavigate()

  console.log('collectibles', collectibles)

  const handlePrevious = useCallback(() => {
    if (collectibleIndex > 0) {
      setCollectibleIndex(collectibleIndex - 1)
    }
  }, [collectibleIndex])

  const handleNext = useCallback(async () => {
    if (collectibleIndex < collectibles.length - 1) {
      setCollectibleIndex(collectibleIndex + 1)
    }
    else if (!ended) {
      await paginate()

      setCollectibleIndex(collectibleIndex + 1)
    }
  }, [collectibleIndex, collectibles, ended, paginate])

  const handleDeny = useCallback(() => {
    if (!collectible) return

    updateDoc(doc(db, 'collectibles', collectible.id), {
      verificationStatus: 'rejected',
      verificationMessage: 'A similar collectible already exists.',
    })

    handleNext()
  }, [collectible, handleNext])

  const handleVerify = useCallback(async () => {
    if (!collectible) return

    await Promise.all([
      setDoc(doc(db, 'verifiedCollectibles', collectible.id), {
        ...collectible,
        verificationStatus: 'accepted',
      }),
      updateDoc(doc(db, 'collectibles', collectible.id), {
        verificationStatus: 'accepted',
      }),
    ])

    handleNext()
  }, [collectible, handleNext])

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

  if (!collectibles.length) {
    return (
      <Div
        xflex="x5"
        flexGrow={1}
      >
        All good!
      </Div>
    )
  }

  if (!collectible) {
    return (
      <FullScreenNotFound />
    )
  }

  return (
    <LayoutContainer>
      <H1>Verify collectible</H1>
      <Div
        xflex="y2"
        mt={2}
      >
        <CollectibleCard collectible={collectible} />
      </Div>
      <SimilarCollectibles
        collectible={collectible}
        mt={2}
      />
      <Div
        xflex="x8b"
        mt={2}
      >
        <Button
          onClick={handlePrevious}
          visibility={collectibleIndex > 0 ? 'visible' : 'hidden'}
        >
          Previous
        </Button>
        <Div xflex="y2">
          <Div>
            Status: {collectible.verificationStatus}
          </Div>
          <Div
            xflex="x4"
            mt={1}
          >
            <Button
              onClick={handleDeny}
              mr={1}
            >
              Deny
            </Button>
            <Button
              gradient="rainbow"
              onClick={handleVerify}
            >
              Verify
            </Button>
          </Div>
        </Div>
        <Button
          onClick={handleNext}
          visibility={collectibleIndex === collectibles.length - 1 && ended ? 'hidden' : 'visible'}
        >
          Next
        </Button>
      </Div>
    </LayoutContainer>
  )
}

export default VerifyCollectibles
