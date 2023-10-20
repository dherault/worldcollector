import { useCallback, useRef, useState } from 'react'
import { Input } from 'native-base'
import { useSearchBox } from 'react-instantsearch-core'

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
    <Input
      ref={inputRef}
      value={inputValue}
      onChangeText={setQuery}
      clearButtonMode="while-editing"
      autoCapitalize="none"
      autoCorrect={false}
      spellCheck={false}
      autoComplete="off"
      px={4}
      size="xl"
      colorScheme="grey"
      focusOutlineColor="grey.500"
      autoFocus
      variant="underlined"
      placeholder="Start typing to search..."
    />
  )
}

export default SearchBox
