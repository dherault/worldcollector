import { useContext } from 'react'

import UserProfile from '../../../src/components/UserProfile'
import UserContext from '../../../src/contexts/ViewerContext'
import Landing from '../../../src/components/Landing'

function Main() {
  const { viewer } = useContext(UserContext)

  return viewer ? <UserProfile userId={viewer.id} /> : <Landing />
}

export default Main
