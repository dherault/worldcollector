import { type JSX, type PropsWithChildren } from 'react'
import { Navigate, useSearchParams } from 'react-router'

import useUser from '~hooks/user/useUser'

import CenteredSpinner from '~components/common/CenteredSpinner'

function AuthenticationRedirect({ children }: PropsWithChildren) {
  const { viewer, user, loading } = useUser()
  const [searchParams] = useSearchParams()

  if (loading) {
    return (
      <CenteredSpinner source="AuthenticationRedirect" />
    )
  }

  if (viewer && user) {
    return (
      <Navigate
        replace
        to={searchParams.get('redirect') ?? '/-'}
      />
    )
  }

  return children as JSX.Element
}

export default AuthenticationRedirect
