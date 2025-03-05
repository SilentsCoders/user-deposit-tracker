// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCC4ZbLkFGZ9WbnCZ1UYA1uIKjyBWWGsFk",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "https://userinfoapp-222ef-default-rtdb.firebaseio.com/",
  projectId: "userinfoapp-222ef",
  storageBucket: "userinfoapp-222ef.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "1:563993838079:android:7045f9f0b344b2a4b1e7ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
