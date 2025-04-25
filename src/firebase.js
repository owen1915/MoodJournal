// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBTdyHAzmPEkyP7ffsUPyB4BCynALuw70",
  authDomain: "moodjournal-8573f.firebaseapp.com",
  projectId: "moodjournal-8573f",
  storageBucket: "moodjournal-8573f.firebasestorage.app",
  messagingSenderId: "716316338205",
  appId: "1:716316338205:web:18934c2b975934ae0fbef4",
  measurementId: "G-KEEJHY3BXY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth};