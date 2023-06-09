import { useCallback } from 'react'
import { Box, Button } from 'native-base'

import createFakeData from '../src/scripts/create-fake-data'

function DevScene() {
  const handleCreateFakeData = useCallback(() => {
    createFakeData()
  }, [])

  return (
    <Box
      safeAreaTop
      p={2}
    >
      <Button onPress={handleCreateFakeData}>
        Create fake data
      </Button>
    </Box>
  )
}

export default DevScene
