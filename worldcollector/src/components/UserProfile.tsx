import { useContext, useMemo, useState } from 'react'
import { Box, HStack, Heading, VStack } from 'native-base'

import UserContext from '../contexts/UserContext'

import FullScreenSpinner from './FullScreenSpinner'
import FullScreenNotFound from './FullScreenNotFound'

type UserProfileProps = {
  userId: string
}

function UserProfile({ userId }: UserProfileProps) {
  const { viewer } = useContext(UserContext)
  const [loading, setLoading] = useState(userId !== viewer?.id)

  const user = useMemo(() => userId === viewer?.id ? viewer : null, [userId, viewer])

  if (loading) return <FullScreenSpinner />
  if (!user) return <FullScreenNotFound />

  return (
    <Box pt={4}>
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
        <Heading mt={2}>
          {user.name}
        </Heading>
      </VStack>
    </Box>
  )
}

export default UserProfile
