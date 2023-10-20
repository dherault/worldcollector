import { useContext, useMemo, useState } from 'react'
import { Box, Heading, ScrollView, VStack } from 'native-base'
import { collection, query, where } from 'firebase/firestore'

import { Collectible } from '~types'

import { db } from '~firebase'

import UserContext from '~contexts/ViewerContext'

import useArrayQuery from '~hooks/useArrayQuery'

import FullScreenSpinner from '~components/FullScreenSpinner'
import FullScreenNotFound from '~components/FullScreenNotFound'
import CollectibleCard from '~components/CollectibleCard'

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
      flex={1}
      alignItems="center"
      overflow="hidden"
      maxHeight="100%"
    >
      <VStack
        alignItems="center"
        mb={4}
      >
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
      <ScrollView
        px={4}
        flex={1}
        width="100%"
      >
        {collectibles.map(collectible => (
          <Box
            mb={8}
            width="100%"
            key={collectible.id}
          >
            <CollectibleCard collectible={collectible} />
          </Box>
        ))}
        <Box height={24} />
      </ScrollView>
    </VStack>
  )
}

export default UserProfile