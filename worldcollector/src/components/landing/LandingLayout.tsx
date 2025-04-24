import type { PropsWithChildren } from 'react'

import PolyhedronsDance from '~components/common/PolyhedronsDance/PolyhedronsDance'
import LandingFooter from '~components/landing/LandingFooter'
import LandingNav from '~components/landing/LandingNav'

function LandingLayout({ children }: PropsWithChildren) {
  return (
    <PolyhedronsDance>
      <LandingNav />
      {children}
      <LandingFooter />
    </PolyhedronsDance>
  )
}

export default LandingLayout
