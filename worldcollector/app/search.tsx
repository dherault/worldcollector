import { Box, Input, ScrollView } from 'native-base'

function SearchScene() {
  return (
    <Box
      safeAreaTop
      flex={1}
    >
      <Input
        px={4}
        size="xl"
        colorScheme="grey"
        focusOutlineColor="grey.500"
        autoFocus
        variant="underlined"
        placeholder="Start typing to search..."
      />
      <ScrollView flex={1}>
        <Box>Results</Box>
      </ScrollView>
    </Box>
  )
}

export default SearchScene
