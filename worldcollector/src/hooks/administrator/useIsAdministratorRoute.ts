import { useLocation } from 'react-router'

function useIsAdministratorRoute() {
  const { pathname } = useLocation()

  return pathname.startsWith('/administrator')
}

export default useIsAdministratorRoute
