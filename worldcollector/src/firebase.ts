import { Platform } from 'react-native'
import Constants from 'expo-constants'
import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getReactNativePersistence, initializeAuth } from 'firebase/auth/react-native'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectStorageEmulator, getStorage } from 'firebase/storage'
import { ReCaptchaV3Provider, initializeAppCheck } from 'firebase/app-check'
import AsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDD9uEDGqg8vQeDHgjBUyZfpC4HcoxSNt4',
  authDomain: 'worldcollector-alpha.firebaseapp.com',
  projectId: 'worldcollector-alpha',
  storageBucket: 'worldcollector-alpha.appspot.com',
  messagingSenderId: '1046828814398',
  appId: '1:1046828814398:web:4777022753beeb8639816f',
  measurementId: 'G-G1FN71BKX5',
}

const app = initializeApp(firebaseConfig)

export const authentication = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})

export const db = getFirestore(app)

export const storage = getStorage(app)

if (process.env.NODE_ENV === 'development') {
  const origin = Constants.expoConfig.hostUri?.split(':').shift() || 'localhost'

  connectAuthEmulator(authentication, `http://${origin}:9099`, { disableWarnings: true })
  connectFirestoreEmulator(db, origin, 8080)
  connectStorageEmulator(storage, origin, 9199)
}

else if (Platform.OS === 'web') {
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6Lc77XAmAAAAADLO4gsH9i3MGlJ6fJAXlraOwyAw'),
    isTokenAutoRefreshEnabled: true,
  })
}
