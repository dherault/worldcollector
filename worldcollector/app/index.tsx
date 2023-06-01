import { Box } from 'native-base'
import { Link } from 'expo-router'

function Main() {
  return (
    <Box>
      <Box>Hello world</Box>
      <Link href="/authentication">
        Authentication
      </Link>
    </Box>
  )
}

export default Main
