import { useContext, useMemo, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { collection, query, where } from 'firebase/firestore'

import type { Collectible } from '~types'

import { db } from '~firebase'

import ViewerContext from '~contexts/ViewerContext'

import useArrayQuery from '~hooks/useArrayQuery'

import Heading from '~components/Heading'
import CollectiblesList from '~components/CollectiblesList'
import FullScreenSpinner from '~components/FullScreenSpinner'
import FullScreenNotFound from '~components/FullScreenNotFound'

import theme from '~theme'

type UserProfileProps = {
  userId: string
}

const EMPTY_IMAGE_RATIO = 691 / 756

function UserProfile({ userId }: UserProfileProps) {
  const { viewer } = useContext(ViewerContext)

  const [userLoading, setUserLoading] = useState(userId !== viewer?.id)

  const collectiblesQuery = useMemo(() => query(collection(db, 'collectibles'), where('ownerId', '==', userId)), [userId])

  const { data: collectibles, loading: collectiblesLoading } = useArrayQuery<Collectible>(collectiblesQuery)

  const isViewer = userId === viewer?.id
  const user = useMemo(() => isViewer ? viewer : null, [isViewer, viewer])

  if (!user) return <FullScreenNotFound />
  if (userLoading || collectiblesLoading) return <FullScreenSpinner />

  return (
    <View style={styles.root}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.image}
      />
      <Heading style={styles.title}>
        {user.name}
      </Heading>
      {!!collectibles.length && (
        <CollectiblesList collectibles={collectibles} />
      )}
      {!collectibles.length && (
        <Text>
          {isViewer ? 'Your' : 'This'}
          {' '}
          collection is empty.
        </Text>
      )}
      {!collectibles.length && isViewer && (
        <>
          <View style={styles.emptyContainer}>
            <Image
              source={require('../../assets/images/beach.svg')}
              style={styles.emptyImage}
            />
          </View>
          <View style={styles.tooltipContainer}>
            <View style={styles.tooltip}>
              <Text style={styles.tooltipText}>
                Start collecting!
              </Text>
            </View>
            <View style={styles.arrow} />
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 16,
    alignItems: 'center',
    maxHeight: '100%',
    // height: '100%',
  },
  image: {
    width: 64,
    height: 64,
    flexShrink: 0,
  },
  title: {
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 128 + 32,
  },
  emptyImage: {
    width: 256 - 64,
    height: (256 - 64) / EMPTY_IMAGE_RATIO,
  },
  tooltipContainer: {
    position: 'absolute',
    bottom: 64 + 32,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
  },
  tooltip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.red[500],
    borderRadius: 4,
  },
  tooltipText: {
    color: 'white',
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'red',
    transform: [{ rotate: '180deg' }],
  },
})

export default UserProfile
