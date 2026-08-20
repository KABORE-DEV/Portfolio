import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDD98U9cMJE-u77_1sz2bcKOoFsHYJ15JE",
  authDomain: "portfolio-frank-kabore.firebaseapp.com",
  projectId: "portfolio-frank-kabore",
  storageBucket: "portfolio-frank-kabore.firebasestorage.app",
  messagingSenderId: "227283546340",
  appId: "1:227283546340:web:52a7176c16fcbebf27bcf1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
