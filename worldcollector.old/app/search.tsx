import { useCallback, useRef } from 'react'
import { Box, ScrollView } from 'native-base'

import SearchBox from '~components/SearchBox'
import SearchResults from '~components/SearchResults'

function SearchScene() {
  const listRef = useRef(null)

  const scrollToTop = useCallback(() => {
    listRef.current?.scrollToOffset({ animated: false, offset: 0 })
  }, [])

  return (
    <Box
      safeAreaTop
      flex={1}
      maxHeight="100%"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        maxHeight="100%"
      >
        <SearchBox onChange={scrollToTop} />
        <SearchResults ref={listRef} />
      </ScrollView>
    </Box>
  )
}

export default SearchScene
