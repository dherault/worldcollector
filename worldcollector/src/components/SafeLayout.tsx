import { PropsWithChildren } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

function SafeLayout({ children }: PropsWithChildren) {
  return (
    <SafeAreaView style={styles.flex}>
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
})

export default SafeLayout
