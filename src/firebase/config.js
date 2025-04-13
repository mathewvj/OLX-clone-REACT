import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyANuL-4rW8-PXsdZuQNedfYVzT_pLYJ9kM",
  authDomain: "olx-clone-c86a7.firebaseapp.com",
  projectId: "olx-clone-c86a7",
  storageBucket: "olx-clone-c86a7.appspot.com",
  messagingSenderId: "596779264688",
  appId: "1:596779264688:web:5e08cc476a11521584e975"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)


export {app, auth , db }