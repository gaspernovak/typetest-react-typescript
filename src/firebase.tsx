// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect} from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCugSrQmWzoPRmQbWZ9NSuI4A9tVdKNZak",
  authDomain: "typetest-ad2c5.firebaseapp.com",
  projectId: "typetest-ad2c5",
  storageBucket: "typetest-ad2c5.appspot.com",
  messagingSenderId: "498930912822",
  appId: "1:498930912822:web:cc61c094c48dafa8829297",
  measurementId: "G-E2N822CF7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);