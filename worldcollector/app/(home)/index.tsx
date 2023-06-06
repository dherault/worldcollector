import { useContext } from 'react'

import UserContext from '~contexts/ViewerContext'

import UserProfile from '~components/UserProfile'
import Landing from '~components/Landing'

type HomeSceneProps = {
  segment: string
}

function HomeScene({ segment }: HomeSceneProps) {
  const { viewer } = useContext(UserContext)

  return viewer ? (
    <UserProfile
      userId={viewer.id}
    />
  ) : (
    <Landing />
  )
}

export default HomeScene
