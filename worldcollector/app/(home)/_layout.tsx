import { Stack } from 'expo-router'
import { useContext } from 'react'

import RouteTitlesContext from '~contexts/RouteTitlesContext'

function HomeLayout() {
  const { routeTitles } = useContext(RouteTitlesContext)

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        contentStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={({ route }) => ({ title: routeTitles.UserProfile ?? '' })}
      />
      <Stack.Screen
        name="-/[id]"
        options={({ route }) => ({ title: routeTitles.CollectibleScene ?? '' })}
      />
    </Stack>
  )
}

export default HomeLayout
