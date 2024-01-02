import { type PropsWithChildren } from 'react'
import { Image, ImageBackground, Platform, StyleSheet, useWindowDimensions } from 'react-native'

const WIDTH = 400
const HEIGHT = 800

function CustomImageBackground({ children, source }: PropsWithChildren<{ source: any }>) {
  const { width, height } = useWindowDimensions()

  if (Platform.OS === 'web') {
    return (
      <div style={{ position: 'relative' }}>
        <Image
          source={source}
          resizeMode="cover"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: Math.min(WIDTH, width),
            height: Math.min(HEIGHT, height),
          }}
        />
        {children}
      </div>
    )
  }

  return (
    <ImageBackground
      source={source}
      resizeMode="cover"
      style={styles.root}
    >
      {children}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})

export default CustomImageBackground
