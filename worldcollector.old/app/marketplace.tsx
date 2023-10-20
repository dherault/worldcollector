import { Box, Heading, ScrollView, VStack } from 'native-base'

function Marketplace() {
  return (
    <Box safeAreaTop>
      <ScrollView>
        <VStack alignItems="center">
          <Heading my={4}>
            Marketplace
          </Heading>
        </VStack>
      </ScrollView>
    </Box>
  )
}

export default Marketplace
