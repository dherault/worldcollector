import type { PropsWithChildren } from 'react'
import { Link, useSearchParams } from 'react-router'
import { MailCheck } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '~components/ui/Alert'
import Logo from '~components/common/logos/Logo'

function AuthenticationLayout({ children }: PropsWithChildren) {
  const [searchParams] = useSearchParams()
  const passwordResetSuccess = searchParams.get('password-reset')

  return (
    <div className="py-8 md:py-16 px-4 flex flex-col items-center">
      <Link
        to="/"
        className="flex flex-col items-center gap-2 text-4xl font-display font-bold text-primary"
      >
        <Logo />
        World Collector
      </Link>
      <div className="mt-1 mx-auto px-0 w-full max-w-[384px]">
        {passwordResetSuccess && (
          <Alert
            variant="success"
            className="mt-4 -mb-4"
          >
            <MailCheck className="-mt-1 w-4" />
            <AlertTitle>
              Password reset
            </AlertTitle>
            <AlertDescription>
              Check your emails for a password reset link
            </AlertDescription>
          </Alert>
        )}
        <div className="mt-8">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthenticationLayout
