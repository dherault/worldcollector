import { type PropsWithChildren } from 'react'

import composeLayout from '~utils/layout/composeLayout'

import { Toaster } from '~components/ui/Toaster'
import { TooltipProvider } from '~components/ui/Tooltip'
import ReferenceProvider from '~components/common/ReferenceProvider'
import AuthenticationProvider from '~components/authentication/AuthenticationProvider'

const RootLayout = composeLayout(
  TooltipProvider,
  ReferenceProvider,
  AuthenticationProvider,
)

function Layout({ children }: PropsWithChildren) {
  return (
    <RootLayout>
      <div className="h-screen w-screen flex flex-col overflow-y-auto overflow-x-hidden">
        {children}
      </div>
      <Toaster />
    </RootLayout>
  )
}

export default Layout
