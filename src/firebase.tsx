// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const analytics = getAnalytics(app);
export const db = getFirestore(app);