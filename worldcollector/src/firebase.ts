import { initializeApp } from 'firebase/app'
import { getReactNativePersistence, initializeAuth } from 'firebase/auth/react-native'
import { getFirestore } from 'firebase/firestore'
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
