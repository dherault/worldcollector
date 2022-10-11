import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { FacebookAuthProvider, GoogleAuthProvider, browserLocalPersistence, connectAuthEmulator, getAuth, setPersistence } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectStorageEmulator, getStorage } from 'firebase/storage'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'
import { ReCaptchaV3Provider, initializeAppCheck } from 'firebase/app-check'

const firebaseConfig = {
  apiKey: 'AIzaSyBVDc2EEqZM8IeBXN6Xts2EjXDnXiy5DnU',
  authDomain: 'worldcollector-1bd61.firebaseapp.com',
  projectId: 'worldcollector-1bd61',
  storageBucket: 'worldcollector-1bd61.appspot.com',
  messagingSenderId: '1065931325520',
  appId: '1:1065931325520:web:71a9b98f5214bc3fb55155',
  measurementId: 'G-LZDLB8V7W8',
}

const app = initializeApp(firebaseConfig)

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LeVe-AgAAAAALgxB_TevHVyGadpodHUrivz3if0'),
  isTokenAutoRefreshEnabled: true,
})

export const db = getFirestore(app)
export const storage = getStorage(app)
export const analytics = getAnalytics(app)
export const authentication = getAuth(app)
export const functions = getFunctions(app)

export const persistancePromise = setPersistence(authentication, browserLocalPersistence)
export const googleProvider = new GoogleAuthProvider()
export const facebookProvider = new FacebookAuthProvider()

if (import.meta.env.MODE === 'development') {
  connectFirestoreEmulator(db, 'localhost', 8080)
  connectStorageEmulator(storage, 'localhost', 9199)
  connectFunctionsEmulator(functions, 'localhost', 5001)
  connectAuthEmulator(authentication, 'http://localhost:9099', { disableWarnings: true })
}
