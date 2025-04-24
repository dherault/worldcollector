import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from 'firebase/analytics'
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  connectAuthEmulator,
  getAuth,
  setPersistence,
} from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectFunctionsEmulator, getFunctions, httpsCallable } from 'firebase/functions'
import { connectStorageEmulator, getStorage } from 'firebase/storage'
import { getPerformance } from 'firebase/performance'
// import { ReCaptchaV3Provider, initializeAppCheck } from 'firebase/app-check'

/* ---
  Firebase app
--- */

const firebaseConfig = {
  apiKey: 'AIzaSyDOTFceRZF0Qvj1YiEILTZMgDU60JUrmYw',
  authDomain: 'world-collector.firebaseapp.com',
  projectId: 'world-collector',
  storageBucket: 'world-collector.firebasestorage.app',
  messagingSenderId: '711319447416',
  appId: '1:711319447416:web:ba8156339ceefe7e388a8d',
  measurementId: 'G-WZ1873ENMQ',
}

const app = initializeApp(firebaseConfig)

export const analytics = getAnalytics(app)

export const authentication = getAuth(app)

export const database = getFirestore(app)

export const storage = getStorage(app)

export const functions = getFunctions(app)

/* ---
  Functions
--- */

type CreateStripePortalLinkParams = {
  returnUrl: string
  locale?: string
  configuration?: string
}

type CreateStripePortalLinkResponse = {
  url: string
}

export const invokeCreateStripePortalLink = httpsCallable<CreateStripePortalLinkParams, CreateStripePortalLinkResponse>(functions, 'ext-firestore-stripe-payments-createPortalLink')

/* ---
  Performance
--- */

if (import.meta.env.PROD) {
  getPerformance(app)
}

/* ---
  Authentication
--- */

export const persistancePromise = setPersistence(authentication, browserLocalPersistence)

export const googleProvider = new GoogleAuthProvider()

/* ---
  Analytics helper
--- */

export const logAnalytics = (eventName: string, eventParams?: Record<string, any>) => {
  if (!import.meta.env.PROD) return

  logEvent(analytics, eventName, eventParams)
}

/* ---
  Emulators
--- */

if (import.meta.env.DEV) {
  console.log('INFO: Using Firebase emulators')

  connectAuthEmulator(authentication, 'http://localhost:9099', { disableWarnings: true })
  connectFirestoreEmulator(database, 'localhost', 8080)
  connectStorageEmulator(storage, 'localhost', 9199)
  connectFunctionsEmulator(functions, '127.0.0.1', 5001)
}

/* ---
  App check
--- */

// if (import.meta.env.PROD) {
//   initializeAppCheck(app, {
//     provider: new ReCaptchaV3Provider('6Lf61ZcqAAAAANCNg60uAW1da7btM9bSKqJf7SLy'),
//     isTokenAutoRefreshEnabled: true,
//   })
// }
