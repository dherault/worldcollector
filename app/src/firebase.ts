// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBVDc2EEqZM8IeBXN6Xts2EjXDnXiy5DnU',
  authDomain: 'worldcollector-1bd61.firebaseapp.com',
  projectId: 'worldcollector-1bd61',
  storageBucket: 'worldcollector-1bd61.appspot.com',
  messagingSenderId: '1065931325520',
  appId: '1:1065931325520:web:71a9b98f5214bc3fb55155',
  measurementId: 'G-LZDLB8V7W8',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
