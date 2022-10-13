import { Div } from 'honorable'

function FullScreenForbidden() {
  return (
    <Div
      xflex="x5"
      flexGrow={1}
      zIndex={999999}
    >
      Forbidden
    </Div>
  )
}

export default FullScreenForbidden
