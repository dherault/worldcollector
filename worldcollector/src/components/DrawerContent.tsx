import { useCallback } from 'react'
import { useRouter } from 'expo-router'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { Box, Button } from 'native-base'

function DrawerContent(props) {
  const router = useRouter()

  const handleNavigation = useCallback((path: string) => {
    router.push(path)
  }, [router])

  return (
    <DrawerContentScrollView {...props}>
      <Box p={2}>
        <Button onPress={() => handleNavigation('/')}>Home</Button>
        <Button onPress={() => handleNavigation('/marketplace')}>Marketplace</Button>
        <Button onPress={() => handleNavigation('/authentication')}>Authentication</Button>
      </Box>
    </DrawerContentScrollView>
  )
}

export default DrawerContent
