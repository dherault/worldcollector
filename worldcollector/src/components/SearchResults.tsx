import { forwardRef, useCallback } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { useInfiniteHits } from 'react-instantsearch-core'
import { useRouter } from 'expo-router'

import type { Searchable } from '~types'

import theme from '~theme'

function SearchResults(props, ref) {
  const { hits, isLastPage, showMore } = useInfiniteHits<Searchable>(props)
  const router = useRouter()

  const handlePress = useCallback(item => {
    router.push(item.description ? `/-/${item.id}` : '/')
  }, [router])

  return (
    <FlatList
      ref={ref}
      data={hits}
      keyExtractor={item => item.objectID}
      ItemSeparatorComponent={() => (
        <View style={styles.separator} />
      )}
      onEndReached={() => {
        if (!isLastPage) {
          showMore()
        }
      }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => handlePress(item)}
          style={styles.item}
        >
          <Text style={styles.textItem}>{item.name}</Text>
        </Pressable>
      )}
    />
  )
}

const styles = StyleSheet.create({
  separator: {
    borderBottomColor: theme.colors.grey[100],
    borderBottomWidth: 1,
    borderBottStyle: 'solid',
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  textItem: {
    fontSize: 16,
  },
})

export default forwardRef(SearchResults)
