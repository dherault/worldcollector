import { useLocalSearchParams } from 'expo-router'

import CollectibleProfile from '~components/CollectibleProfile'

function CollectibleScene() {
  const { id } = useLocalSearchParams<{ id: string }>()

  return (
    <CollectibleProfile collectibleId={id} />
  )
}

export default CollectibleScene
