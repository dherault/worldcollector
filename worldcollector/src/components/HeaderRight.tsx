import { useRouter } from 'expo-router'
import { Button } from 'native-base'
import { useCallback } from 'react'

function HeaderRight() {
  const router = useRouter()

  const handleCollectPress = useCallback(() => {
    router.push('collect')
  }, [router])

  return (
    <Button
      colorScheme="brand"
      mr={3}
      onPress={handleCollectPress}
    >
      Collect!
    </Button>
  )
}

export default HeaderRight
