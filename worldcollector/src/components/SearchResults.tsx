import { forwardRef, useCallback } from 'react'
import { Box, FlatList, Pressable, Text } from 'native-base'
import { useInfiniteHits } from 'react-instantsearch-hooks'
import { useRouter } from 'expo-router'

function SearchResults(props, ref) {
  const { hits, isLastPage, showMore } = useInfiniteHits(props)
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
        <Box
          borderBottomColor="grey.100"
          borderBottomWidth={1}
        />
      )}
      onEndReached={() => {
        if (!isLastPage) {
          showMore()
        }
      }}
      renderItem={({ item }) => (
        <Pressable onPress={() => handlePress(item)}>
          <Box p={2}>
            <Text>{item.name as string}</Text>
          </Box>
        </Pressable>
      )}
    />
  )
}

export default forwardRef(SearchResults)
