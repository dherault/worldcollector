import { useCallback, useState } from 'react'
import { Button, Div, H1 } from 'honorable'
import { doc, writeBatch } from 'firebase/firestore'
import { nanoid } from 'nanoid'
import { faker } from '@faker-js/faker'

import { db } from '../firebase'
import { CollectibleType } from '../types'

import useViewer from '../hooks/useViewer'

import LayoutContainer from '../components/LayoutContainer'
import FullScreenSpinner from '../components/FullScreenSpinner'

function AdministratorDashboard() {
  const { viewer, loadingViewer } = useViewer()
  const [loading, setLoading] = useState(false)

  const handleCreateFakeData = useCallback(async () => {
    if (!viewer) return

    setLoading(true)

    const batch = writeBatch(db)

    for (let i = 0; i < 500; i++) { // Batch has max 5000 ops
      const id = nanoid()
      const now = new Date().toISOString()
      const collectible: CollectibleType = {
        id,
        name: faker.commerce.product(),
        description: faker.hacker.phrase(),
        verificationStatus: 'pending',
        verificationMessage: '',
        imageStoragePaths: [],
        ownerId: viewer.id,
        userId: viewer.id,
        createdAt: now,
        updatedAt: now,
      }

      batch.set(doc(db, 'collectibles', id), collectible)
    }

    await batch.commit()

    setLoading(false)
  }, [viewer])

  if (loadingViewer) {
    return (
      <FullScreenSpinner />
    )
  }

  return (
    <LayoutContainer>
      <H1>Administrator Dashboard</H1>
      <Div mt={2}>
        Status: {loading ? 'loading' : 'ready'}
      </Div>
      <Button
        onClick={handleCreateFakeData}
        mt={2}
      >
        Create fake collectibles for the current user
      </Button>
    </LayoutContainer>
  )
}

export default AdministratorDashboard
