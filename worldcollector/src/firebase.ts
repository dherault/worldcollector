// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDD9uEDGqg8vQeDHgjBUyZfpC4HcoxSNt4',
  authDomain: 'worldcollector-alpha.firebaseapp.com',
  projectId: 'worldcollector-alpha',
  storageBucket: 'worldcollector-alpha.appspot.com',
  messagingSenderId: '1046828814398',
  appId: '1:1046828814398:web:4777022753beeb8639816f',
  measurementId: 'G-G1FN71BKX5',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const analytics = getAnalytics(app)
