import { Stack } from 'expo-router'
import { useContext } from 'react'

import RouteTitlesContext from '~contexts/RouteTitlesContext'

function HomeLayout() {
  const { routeTitles } = useContext(RouteTitlesContext)

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="-/[id]" />
    </Stack>
  )
}

export default HomeLayout
