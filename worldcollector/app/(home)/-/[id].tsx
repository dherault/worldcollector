import { Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

import type { Collectible } from '~types'

import useQuery from '~hooks/useQuery'

import FullScreenSpinner from '~components/FullScreenSpinner'

function CollectibleScene() {
  const { id } = useLocalSearchParams()
  const { data: collectible, loading } = useQuery<Collectible>('collectibles', id as string)

  if (loading) return <FullScreenSpinner />

  return (
    <Text>
      Collectible
      {' '}
      {JSON.stringify(collectible, null, 2)}
    </Text>
  )
}

export default CollectibleScene
