import { Box, Button, Heading, ScrollView, VStack } from 'native-base'
import { signOut } from 'firebase/auth'
import { useCallback, useContext } from 'react'

import { authentication } from '~firebase'

import UserContext from '~contexts/ViewerContext'

function SettingsScene() {
  const { setViewer } = useContext(UserContext)

  const handleSignOut = useCallback(() => {
    signOut(authentication)
    setViewer(null)
  }, [setViewer])

  return (
    <Box safeAreaTop>
      <ScrollView>
        <VStack alignItems="center">
          <Heading my={4}>
            Settings
          </Heading>
          <Button
            colorScheme="brand"
            mt={2}
            onPress={handleSignOut}
          >
            Sign Out
          </Button>
        </VStack>
      </ScrollView>
    </Box>
  )
}

export default SettingsScene
