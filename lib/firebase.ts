import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyADBxcZ8qwtmHWA1K7dJmB0jvoMf1tfT1I",
  authDomain: "startup-3eb47.firebaseapp.com",
  projectId: "startup-3eb47",
  storageBucket: "startup-3eb47.appspot.com",
  messagingSenderId: "1089818434589",
  appId: "1:1089818434589:web:3a5ca57a66455ee065baf4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage()
export const firestore = getFirestore()
export const auth = getAuth()
export const googleProvider = new GoogleAuthProvider()