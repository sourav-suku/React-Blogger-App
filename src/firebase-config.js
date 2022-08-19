// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from 'firebase/firestore'
import {getAuth,GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2XAE3cR-X79SDWcbBD20X3yItKqkjysc",
  authDomain: "blogproject-65812.firebaseapp.com",
  projectId: "blogproject-65812",
  storageBucket: "blogproject-65812.appspot.com",
  messagingSenderId: "488534211485",
  appId: "1:488534211485:web:11c56d5dc8ab292ab7cd74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);
export const provider=new GoogleAuthProvider(app);
export const db=getFirestore(app);