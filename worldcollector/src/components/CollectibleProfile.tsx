import { StyleSheet, Text, View } from 'react-native'

import type { Collectible } from '~types'

import useQuery from '~hooks/useQuery'

import FullScreenSpinner from '~components/FullScreenSpinner'
import FullScreenNotFound from '~components/FullScreenNotFound'
import HeadingLarge from '~components/HeadingLarge'
import CollectibleFrame from '~components/CollectibleFrame'

type CollectibleProfileProps = {
  collectibleId: string
}

function CollectibleProfile({ collectibleId }: CollectibleProfileProps) {
  const { data: collectible, loading } = useQuery<Collectible>('collectibles', collectibleId)

  if (loading) {
    return (
      <FullScreenSpinner />
    )
  }

  if (!collectible) {
    return (
      <FullScreenNotFound />
    )
  }

  return (
    <View style={styles.root}>
      <HeadingLarge style={styles.heading}>
        {collectible.name}
      </HeadingLarge>
      <View style={styles.frame}>
        <CollectibleFrame collectible={collectible} />
      </View>
      <Text style={styles.textDescription}>
        {collectible.description}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingTop: 32,
    paddingBottom: 64,
    paddingHorizontal: 16,
  },
  heading: {
    textAlign: 'center',
  },
  frame: {
    marginTop: 32,
  },
  textDescription: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
})

export default CollectibleProfile
