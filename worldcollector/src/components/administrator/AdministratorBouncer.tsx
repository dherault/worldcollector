import type { JSX, PropsWithChildren } from 'react'

import useUser from '~hooks/user/useUser'

import NotFound from '~components/common/NotFound'
import CenteredSpinner from '~components/common/CenteredSpinner'

function AdministratorBouncer({ children }: PropsWithChildren) {
  const { user, loading } = useUser()

  if (loading) {
    return (
      <CenteredSpinner source="AdministratorBouncer" />
    )
  }

  if (!user?.isAdministrator) {
    return (
      <NotFound source="AdministratorBouncer" />
    )
  }

  return children as JSX.Element
}

export default AdministratorBouncer
