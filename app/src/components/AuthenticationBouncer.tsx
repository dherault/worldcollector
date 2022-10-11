import { PropsWithChildren, useContext } from 'react'
import { Navigate } from 'react-router-dom'

import ViewerContext from '../contexts/ViewerContext'

import FullScreenSpinner from './FullScreenSpinner'

type AuthenticationBouncerProps = PropsWithChildren<Record<string, any>>

function AuthenticationBouncer({ children }: AuthenticationBouncerProps) {
  const { viewer, loadingViewer } = useContext(ViewerContext)

  if (loadingViewer) {
    return (
      <FullScreenSpinner />
    )
  }

  if (!viewer) {
    return (
      <Navigate to="/" />
    )
  }

  return children as JSX.Element
}

export default AuthenticationBouncer
