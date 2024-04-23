// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import {getFireStore} from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaN0T769y_b_DuprxNTzAORx57lMrOyRs",
  authDomain: "authentication-3754b.firebaseapp.com",
  projectId: "authentication-3754b",
  storageBucket: "authentication-3754b.appspot.com",
  messagingSenderId: "777657461221",
  appId: "1:777657461221:web:55f6c5fde97b3487ad270c",
  measurementId: "G-N1YTQJZ71X"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH=getAuth(FIREBASE_APP)

export const FIRESTORE_DB=getFireStore(FIREBASE_APP)
