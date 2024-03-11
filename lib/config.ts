import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNd7oF-JboB0Vr0b5QjDhyEJDY5IkDCzw",
  authDomain: "quiz-505c4.firebaseapp.com",
  projectId: "quiz-505c4",
  storageBucket: "quiz-505c4.appspot.com",
  messagingSenderId: "858016075794",
  appId: "1:858016075794:web:1983903208330d4ce988cb",
  measurementId: "G-C8ZV94TMNV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
