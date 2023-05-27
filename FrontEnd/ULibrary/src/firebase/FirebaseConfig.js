
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDNv8JlQMMXHnGKuoUq5m3w3eArHKAAxoM",
  authDomain: "ulibrary-de77e.firebaseapp.com",
  projectId: "ulibrary-de77e",
  storageBucket: "ulibrary-de77e.appspot.com",
  messagingSenderId: "512776340505",
  appId: "1:512776340505:web:759cd5eab6d83166ca1688"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app)