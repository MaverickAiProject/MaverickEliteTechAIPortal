// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjw4ckO996xbhABQpy1akORX2gn-H5rT0",
  authDomain: "maverick-ai-portal.firebaseapp.com",
  projectId: "maverick-ai-portal",
  storageBucket: "maverick-ai-portal.firebasestorage.app",
  messagingSenderId: "290047746634",
  appId: "1:290047746634:web:90e070dcd933b76e8efcb3",
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };
