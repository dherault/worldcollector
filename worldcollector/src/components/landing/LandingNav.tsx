import { Link } from 'react-router'

import useIsMobile from '~hooks/ui/useIsMobile'

import LoginButton from '~components/common/LoginButton'
import Logo from '~components/common/logos/Logo'

function LandingNav() {
  const isMobile = useIsMobile()

  return (
    <nav className="py-3 pl-4 pr-2 flex items-center gap-4 md:gap-8">
      <Link
        to="/"
        className="shrink-0"
      >
        <div className="flex items-center gap-3">
          <Logo size={isMobile ? 20 : 24} />
          <h1 className="hidden md:block text-lg md:text-2xl font-display font-bold text-primary leading-none">
            World Collector
          </h1>
        </div>
      </Link>
      {/* <Link
        to="/#product"
        onClick={() => setNonce(nonce + 1)}
        className="md:mt-1 font-semibold text-primary hover:underline"
      >
        Product
      </Link>
      <Link
        to="/#pricing"
        onClick={() => setNonce(nonce + 1)}
        className="md:mt-1 font-semibold text-primary hover:underline"
      >
        Pricing
      </Link> */}
      <div className="-ml-8 grow" />
      <LoginButton />
    </nav>
  )
}

export default LandingNav
