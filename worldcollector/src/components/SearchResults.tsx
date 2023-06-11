import { Box, FlatList, Text } from 'native-base'
import { forwardRef } from 'react'
import { useInfiniteHits } from 'react-instantsearch-hooks'

function SearchResults(props, ref) {
  const { hits, isLastPage, showMore } = useInfiniteHits(props)

  return (
    <FlatList
      ref={ref}
      data={hits}
      keyExtractor={item => item.objectID}
      ItemSeparatorComponent={() => <Box borderBottomColor="grey.500" />}
      onEndReached={() => {
        if (!isLastPage) {
          showMore()
        }
      }}
      renderItem={({ item }) => (
        <Box p={2}>
          <Text>{item.name as string}</Text>
        </Box>
      )}
    />
  )
}

export default forwardRef(SearchResults)
