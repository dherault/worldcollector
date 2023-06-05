import { useContext } from 'react'

import UserContext from '~contexts/ViewerContext'

import UserProfile from '~components/UserProfile'
import Landing from '~components/Landing'

function Main() {
  const { viewer } = useContext(UserContext)

  return viewer ? <UserProfile userId={viewer.id} /> : <Landing />
}

export default Main
