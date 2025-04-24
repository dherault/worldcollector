import { useEffect } from 'react'

import useUser from '~hooks/user/useUser'

import CenteredSpinner from '~components/common/CenteredSpinner'

function SignOut() {
  const { signOut } = useUser()

  useEffect(() => {
    signOut()
  }, [
    signOut,
  ])

  return (
    <CenteredSpinner source="SignOut" />
  )
}

export default SignOut
