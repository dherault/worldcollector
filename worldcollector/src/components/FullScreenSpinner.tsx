import { HStack, Spinner } from 'native-base'

function FullScreenSpinner() {
  return (
    <HStack
      space={8}
      justifyContent="center"
      alignItems="center"
    >
      <Spinner size="lg" />
    </HStack>
  )
}

export default FullScreenSpinner
