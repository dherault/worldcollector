import { useLocalSearchParams } from 'expo-router'
import { Text, VStack } from 'native-base'

import { Collectible } from '~types'

import useQuery from '~hooks/useQuery'
import useRouteTitle from '~hooks/useRouteTitle'

import FullScreenSpinner from '~components/FullScreenSpinner'

function CollectibleScene() {
  const { id } = useLocalSearchParams()
  const { data: collectible, loading } = useQuery<Collectible>('collectibles', id as string)

  useRouteTitle('CollectibleScene', collectible?.name)

  if (loading) return <FullScreenSpinner />

  return (
    <VStack>
      <Text>
        Collectible
        {' '}
        {JSON.stringify(collectible, null, 2)}
      </Text>
    </VStack>
  )
}

export default CollectibleScene
