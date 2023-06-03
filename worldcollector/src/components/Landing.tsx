import { Box } from 'native-base'
import { Link } from 'expo-router'

function Landing() {
  return (
    <Box>
      <Box mb={4}>World Collector</Box>
      <Link href="/authentication">
        Authentication
      </Link>
    </Box>
  )
}

export default Landing
