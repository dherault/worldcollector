import { Div, Spinner } from 'honorable'

function FullScreenSpinner() {
  return (
    <Div
      xflex="x5"
      flexGrow={1}
      height="100vh"
      backgroundColor="background"
      zIndex={999999}
    >
      <Spinner size={64} />
    </Div>
  )
}

export default FullScreenSpinner
