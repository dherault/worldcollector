import { useCallback, useRef } from 'react'
import { ScrollView } from 'react-native'

import SearchBox from '~components/SearchBox'
import SearchResults from '~components/SearchResults'

function SearchScene() {
  const listRef = useRef(null)

  const scrollToTop = useCallback(() => {
    listRef.current?.scrollToOffset({ animated: false, offset: 0 })
  }, [])

  return (
    <ScrollView
      style={{ maxHeight: '100%' }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <SearchBox onChange={scrollToTop} />
      <SearchResults ref={listRef} />
    </ScrollView>
  )
}

export default SearchScene
