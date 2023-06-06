import { useContext, useMemo, useState } from 'react'
import { Box, Heading, VStack } from 'native-base'
import { collection, query, where } from 'firebase/firestore'

import { Collectible } from '~types'

import { db } from '~firebase'

import UserContext from '~contexts/ViewerContext'

import useArrayQuery from '~hooks/useArrayQuery'

import FullScreenSpinner from '~components/FullScreenSpinner'
import FullScreenNotFound from '~components/FullScreenNotFound'
import CollectiblesList from '~components/CollectiblesList'

type UserProfileProps = {
  userId: string
}

function UserProfile({ userId }: UserProfileProps) {
  const { viewer, setViewer } = useContext(UserContext)
  const [userLoading, setUserLoading] = useState(userId !== viewer?.id)
  const collectiblesQuery = useMemo(() => query(collection(db, 'collectibles'), where('ownerId', '==', userId)), [userId])
  const { data: collectibles, loading: collectiblesLoading } = useArrayQuery<Collectible>(collectiblesQuery)
  const user = useMemo(() => userId === viewer?.id ? viewer : null, [userId, viewer])

  if (userLoading) return <FullScreenSpinner />
  if (!user) return <FullScreenNotFound />

  return (
    <VStack
      safeAreaTop
      pt={4}
      px={4}
      alignItems="center"
    >
      <VStack alignItems="center">
        <Box
          bg="brand.500"
          w={16}
          h={16}
          borderRadius="full"
        />
        <Heading textAlign="center">
          {user.name}
        </Heading>
      </VStack>
      <CollectiblesList collectibles={collectibles} />
    </VStack>
  )
}

export default UserProfile
