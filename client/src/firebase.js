// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-3d4a7.firebaseapp.com",
  projectId: "mern-auth-3d4a7",
  storageBucket: "mern-auth-3d4a7.appspot.com",
  messagingSenderId: "104490302394",
  appId: "1:104490302394:web:730f598204ce7d4f17bb83"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);