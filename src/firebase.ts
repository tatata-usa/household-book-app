// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKWnbsRh4rVOz5JW5-INMAkwX3dZaNiVA",
  authDomain: "household-8d0cb.firebaseapp.com",
  projectId: "household-8d0cb",
  storageBucket: "household-8d0cb.firebasestorage.app",
  messagingSenderId: "177715614232",
  appId: "1:177715614232:web:60fca369a440181dd1e96d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}