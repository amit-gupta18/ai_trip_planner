// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvOqNU7guqvtoysvCkXBXU2Ad39a4SClo",
  authDomain: "ai-trip-planner-1fcaa.firebaseapp.com",
  projectId: "ai-trip-planner-1fcaa",
  storageBucket: "ai-trip-planner-1fcaa.firebasestorage.app",
  messagingSenderId: "401338183789",
  appId: "1:401338183789:web:651b2ef7b2c641a3230f64",
  measurementId: "G-PJ9G6Z549V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app)
