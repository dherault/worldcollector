import { type JSX, type PropsWithChildren } from 'react'
import { Navigate } from 'react-router'

import useUser from '~hooks/user/useUser'

import CenteredSpinner from '~components/common/CenteredSpinner'

function AuthenticationBouncer({ children }: PropsWithChildren) {
  const { viewer, user, loading } = useUser()

  if (loading) {
    return (
      <CenteredSpinner source="AuthenticationBouncer" />
    )
  }

  if (!(viewer && user)) {
    return (
      <Navigate
        replace
        to="/authentication"
      />
    )
  }

  return children as JSX.Element
}

export default AuthenticationBouncer
