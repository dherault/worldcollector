import { Text, VStack } from 'native-base'

type CollectibleProps = {
  id: string
}

function Collectible({ id }: CollectibleProps) {
  return (
    <VStack safeAreaTop>
      <Text>
        Collectible
        {' '}
        {id}
      </Text>
    </VStack>
  )
}

export default Collectible
