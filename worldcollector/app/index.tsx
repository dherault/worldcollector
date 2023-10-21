import { useContext } from 'react'

import ViewerContext from '~contexts/ViewerContext'

import UserProfile from '~components/UserProfile'

function HomeScene() {
  const { viewer } = useContext(ViewerContext)

  if (!viewer) return null

  return (
    <UserProfile userId={viewer.id} />
  )
}

export default HomeScene
