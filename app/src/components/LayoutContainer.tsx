import { Div } from 'honorable'
import { PropsWithChildren } from 'react'

type LayoutContainerProps = PropsWithChildren

function LayoutContainer({ children }: LayoutContainerProps) {
  return (
    <Div
      width={512 + 256}
      mx="auto"
      xflex="y2s"
    >
      {children}
    </Div>
  )
}

export default LayoutContainer
