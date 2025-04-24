import { Link, useLocation } from 'react-router'

import { Button } from '~components/ui/Button'

type Props = {
  source: string
  message?: string
}

function ErrorOccured({ source, message }: Props) {
  const { pathname } = useLocation()
  const isDashboard = pathname.startsWith('/-/') // The trailing slash is important, it ensures the page is not the dashboard itself

  return (
    <div className="p-4 fixed inset-0 bg-white flex flex-col items-center justify-center text-center z-50">
      ¯\_(ツ)_/¯
      <br />
      An error occured
      <div className="mt-1 py-1 px-2 bg-neutral-50 border rounded-md text-xs text-neutral-400">
        <div>
          {source}
        </div>
        <div className="mt-1">
          {message ?? 'Unknown'}
        </div>
      </div>
      <Link
        to={isDashboard ? '/-' : '/'}
        className="mt-6"
      >
        <Button>
          Go
          {' '}
          {isDashboard ? 'back to dashboard' : 'home'}
        </Button>
      </Link>
      <Link
        to="/support"
        className="mt-2 text-primary hover:underline text-xs"
      >
        Contact support
      </Link>
    </div>
  )
}

export default ErrorOccured
