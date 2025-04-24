import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

import useUser from '~hooks/user/useUser'

import { Button } from '~components/ui/Button'

function LoginButton() {
  const { user } = useUser()

  if (user) {
    return (
      <Link to="/-">
        <Button variant="ghost">
          Dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    )
  }

  return (
    <Link to="/-">
      <Button variant="ghost">
        Log in
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </Link>
  )
}

export default LoginButton
