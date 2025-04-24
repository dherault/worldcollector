import type { ComponentType, PropsWithChildren, ReactNode } from 'react'

type Layout = ComponentType<{ children: ReactNode}>

function composeLayout(...layouts: Layout[]) {
  return function ComposedLayout({ children }: PropsWithChildren) {
    return layouts.reduceRight((acc, Layout) => (
      <Layout>
        {acc}
      </Layout>
    ), children)
  }
}

export default composeLayout
