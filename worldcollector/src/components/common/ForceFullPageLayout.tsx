import type { PropsWithChildren } from 'react'

function ForceFullPageLayout({ children }: PropsWithChildren) {
  return (
    <div className="fixed inset-0 bg-white flex flex-col overflow-y-auto z-50">
      {children}
    </div>
  )
}

export default ForceFullPageLayout
