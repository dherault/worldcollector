import { useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Div, H1 } from 'honorable'
import { doc, setDoc, updateDoc } from 'firebase/firestore'

import { db } from '../firebase'

import useCollectibleById from '../hooks/useCollectibleById'
import useCollectiblesToVerify from '../hooks/useCollectiblesToVerify'

import LayoutContainer from '../components/LayoutContainer'
import FullScreenSpinner from '../components/FullScreenSpinner'
import FullScreenNotFound from '../components/FullScreenNotFound'
import CollectibleCard from '../components/CollectibleCard'
import SimilarCollectibles from '../components/SimilarVerifiedCollectibles'

function VerifyCollectibles() {
  const { id = '' } = useParams()
  const { collectibles, setCollectibles, loadingCollectibles, paginate, ended } = useCollectiblesToVerify()
  const { collectible, loadingCollectible } = useCollectibleById(id)
  const navigate = useNavigate()

  const handleNext = useCallback(async () => {
    const nextCollectible = collectibles[0]

    if (nextCollectible) {
      const nextCollectibles = collectibles.slice(1)

      setCollectibles(nextCollectibles)

      if (!nextCollectibles.length) {
        await paginate()
      }

      navigate(`/verify/${nextCollectible.id}`)
    }
    else if (!ended) {
      await paginate()

      navigate('/verify/next')
    }
  }, [collectibles, setCollectibles, ended, paginate, navigate])

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
    if (collectibles.length && id === 'next') {
      navigate(`/verify/${collectibles[0].id}`)
    }
  }, [collectibles, id, navigate])

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
        xflex="y2"
        mt={2}
      >
        <Div
          textTransform="uppercase"
          color={collectible.verificationStatus === 'accepted' ? 'green.500' : collectible.verificationStatus === 'rejected' ? 'red.500' : 'text'}
        >
          {collectible.verificationStatus}
        </Div>
        <Div
          xflex="x4"
          mt={1}
        >
          <Button
            onClick={handleNext}
            mr={1}
          >
            Pass
          </Button>
          <Button
            danger
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
    </LayoutContainer>
  )
}

export default VerifyCollectibles
