import { PropsWithChildren, useEffect, useRef } from 'react'
import { Animated } from 'react-native'

function FadeInView({ children }: PropsWithChildren) {
  const fadeAnimation = useRef(new Animated.Value(0)).current // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [fadeAnimation])

  return (
    <Animated.View
      style={{
        opacity: fadeAnimation,
      }}
    >
      {children}
    </Animated.View>
  )
}

export default FadeInView
