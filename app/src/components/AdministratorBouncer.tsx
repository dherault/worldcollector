import { PropsWithChildren } from 'react'

import useViewer from '../hooks/useViewer'

import FullScreenSpinner from './FullScreenSpinner'
import FullScreenForbidden from './FullScreenForbidden'

type AdministratorBouncerProps = PropsWithChildren<Record<string, any>>

function AdministratorBouncer({ children }: AdministratorBouncerProps) {
  const { viewer, loadingViewer } = useViewer()

  if (loadingViewer) {
    return (
      <FullScreenSpinner />
    )
  }

  if (!viewer?.isAdministrator) {
    return (
      <FullScreenForbidden />
    )
  }

  return children as JSX.Element
}

export default AdministratorBouncer
