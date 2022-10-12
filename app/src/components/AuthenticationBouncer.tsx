import { PropsWithChildren } from 'react'

import useViewer from '../hooks/useViewer'

import FullScreenSpinner from './FullScreenSpinner'
import FullScreenForbidden from './FullScreenForbidden'

type AuthenticationBouncerProps = PropsWithChildren<Record<string, any>>

function AuthenticationBouncer({ children }: AuthenticationBouncerProps) {
  const { viewer, loadingViewer } = useViewer()

  if (loadingViewer) {
    return (
      <FullScreenSpinner />
    )
  }

  if (!viewer) {
    return (
      <FullScreenForbidden />
    )
  }

  return children as JSX.Element
}

export default AuthenticationBouncer
