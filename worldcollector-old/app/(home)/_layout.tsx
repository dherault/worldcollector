import { Stack } from 'expo-router'

function HomeLayout() {
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
