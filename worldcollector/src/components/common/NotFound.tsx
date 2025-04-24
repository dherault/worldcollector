import { Link } from 'react-router'

import { Button } from '~components/ui/Button'

type Props = {
  source?: string
}

function NotFound({ source }: Props) {
  return (
    <div className="p-4 fixed inset-0 bg-white flex flex-col items-center justify-center text-center z-50">
      ¯\_(ツ)_/¯
      <br />
      Page not found
      {!!source && (
        <div className="text-xs text-neutral-500">
          Source:
          {' '}
          {source}
        </div>
      )}
      <Link
        to="/"
        className="mt-6"
      >
        <Button>
          Go home
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

export default NotFound
