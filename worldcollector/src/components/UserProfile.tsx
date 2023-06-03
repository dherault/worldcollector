import { useContext, useMemo, useState } from 'react'

import { Box } from 'native-base'

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
    <Box flexDir="row">
      User
      {' '}
      {user.name}
    </Box>
  )
}

export default UserProfile
