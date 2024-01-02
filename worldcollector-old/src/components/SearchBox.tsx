import { useCallback, useRef, useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { useSearchBox } from 'react-instantsearch-core'

import theme from '~theme'

function SearchBox({ onChange }) {
  const { query, refine } = useSearchBox()
  const [inputValue, setInputValue] = useState(query)
  const inputRef = useRef(null)

  const setQuery = useCallback(newQuery => {
    setInputValue(newQuery)
    refine(newQuery)
    onChange()
  }, [refine, onChange])

  // Track when the InstantSearch query changes to synchronize it with
  // the React state.
  // We bypass the state update if the input is focused to avoid concurrent
  // updates when typing.
  if (query !== inputValue && !inputRef.current?.isFocused()) {
    setInputValue(query)
  }

  return (
    <TextInput
      autoFocus
      ref={inputRef}
      value={inputValue}
      onChangeText={setQuery}
      clearButtonMode="while-editing"
      autoCapitalize="none"
      autoCorrect={false}
      spellCheck={false}
      autoComplete="off"
      placeholder="Start typing to search..."
      style={styles.root}
    />
  )
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    borderBottomColor: theme.colors.grey[100],
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
  },
})

export default SearchBox
