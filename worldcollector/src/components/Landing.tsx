import { Button, Heading, VStack } from 'native-base'
import { useRouter } from 'expo-router'

function Landing() {
  const router = useRouter()

  return (
    <VStack
      safeAreaTop
      p={2}
      alignItems="center"
    >
      <Heading>World Collector</Heading>
      <Button
        mt={4}
        onPress={() => router.push('/authentication')}
      >
        Authetication
      </Button>
    </VStack>
  )
}

export default Landing
