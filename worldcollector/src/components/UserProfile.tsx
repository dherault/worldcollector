import { useContext, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
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

function UserProfile({ userId }: UserProfileProps) {
  const { viewer } = useContext(ViewerContext)

  const [userLoading, setUserLoading] = useState(userId !== viewer?.id)

  const collectiblesQuery = useMemo(() => query(collection(db, 'collectibles'), where('ownerId', '==', userId)), [userId])

  const { data: collectibles, loading: collectiblesLoading } = useArrayQuery<Collectible>(collectiblesQuery)

  const user = useMemo(() => userId === viewer?.id ? viewer : null, [userId, viewer])

  if (userLoading || collectiblesLoading) return <FullScreenSpinner />
  if (!user) return <FullScreenNotFound />

  return (
    <View style={styles.root}>
      <View style={styles.image} />
      <Heading style={styles.title}>
        {user.name}
      </Heading>
      <CollectiblesList collectibles={collectibles} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 16,
    alignItems: 'center',
    overflow: 'hidden',
    maxHeight: '100%',
  },
  image: {
    backgroundColor: theme.colors.red[500],
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  title: {
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 32,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    width: '100%',
  },
})

export default UserProfile
