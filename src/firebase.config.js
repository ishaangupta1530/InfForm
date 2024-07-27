// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhlHygvkUcwUaYID5yilWPPyvwM79AvuU",
  authDomain: "techtask2119.firebaseapp.com",
  projectId: "techtask2119",
  storageBucket: "techtask2119.appspot.com",
  messagingSenderId: "460811934917",
  appId: "1:460811934917:web:e86799a667f885f30ee4ac",
  measurementId: "G-GRBWNWNG63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const dataref = getDatabase(app); // Using modular SDK for database
export const storage = getStorage(app);  // Using modular SDK for storage
export const firestore = getFirestore(app); // Using modular SDK for Firestore
