import { useCallback, useContext, useMemo, useState } from 'react'
import { Box, Button, HStack, Heading, Text, VStack } from 'native-base'
import { signOut } from 'firebase/auth'
import { collection, query, where } from 'firebase/firestore'

import { Collectible } from '~types'

import { authentication, db } from '~firebase'

import useArrayQuery from '~hooks/useArrayQuery'

import UserContext from '../contexts/ViewerContext'

import FullScreenSpinner from './FullScreenSpinner'
import FullScreenNotFound from './FullScreenNotFound'
import CollectiblesList from './CollectiblesList'

type UserProfileProps = {
  userId: string
}

function UserProfile({ userId }: UserProfileProps) {
  const { viewer, setViewer } = useContext(UserContext)
  const [userLoading, setUserLoading] = useState(userId !== viewer?.id)
  const user = useMemo(() => userId === viewer?.id ? viewer : null, [userId, viewer])
  const collectiblesQuery = useMemo(() => query(collection(db, 'collectibles'), where('ownerId', '==', userId)), [userId])
  const { data: collectibles, loading: collectiblesLoading } = useArrayQuery<Collectible>(collectiblesQuery)

  const handleSignOut = useCallback(() => {
    signOut(authentication)
    setViewer(null)
  }, [setViewer])

  if (userLoading) return <FullScreenSpinner />
  if (!user) return <FullScreenNotFound />

  return (
    <VStack
      safeAreaTop
      pt={4}
      alignItems="center"
    >
      <VStack alignItems="center">
        <HStack
          justifyContent="center"
          alignItems="center"
        >
          <Box
            bg="brand.500"
            w={16}
            h={16}
            borderRadius="full"
          />
        </HStack>
        <Heading
          selectable
          mt={2}
        >
          {user.name}
        </Heading>
      </VStack>
      <CollectiblesList collectibles={collectibles} />
      <Button
        colorScheme="brand"
        mt={2}
        onPress={handleSignOut}
      >
        Sign Out
      </Button>
    </VStack>
  )
}

export default UserProfile
