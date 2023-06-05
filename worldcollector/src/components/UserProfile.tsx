import { useCallback, useContext, useMemo, useState } from 'react'
import { Box, Button, HStack, Heading, VStack } from 'native-base'
import { signOut } from 'firebase/auth'

import { authentication } from '~firebase'

import UserContext from '../contexts/ViewerContext'

import FullScreenSpinner from './FullScreenSpinner'
import FullScreenNotFound from './FullScreenNotFound'

type UserProfileProps = {
  userId: string
}

function UserProfile({ userId }: UserProfileProps) {
  const { viewer, setViewer } = useContext(UserContext)
  const [loading, setLoading] = useState(userId !== viewer?.id)

  const user = useMemo(() => userId === viewer?.id ? viewer : null, [userId, viewer])

  const handleSignOut = useCallback(() => {
    signOut(authentication)
    setViewer(null)
  }, [setViewer])

  if (loading) return <FullScreenSpinner />
  if (!user) return <FullScreenNotFound />

  return (
    <VStack
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
