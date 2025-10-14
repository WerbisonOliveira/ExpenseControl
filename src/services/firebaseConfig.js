import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBn6LRCdUbnV1J1GDyWushLW05-WheK75o",
  authDomain: "expensecontrol-ead35.firebaseapp.com",
  projectId: "expensecontrol-ead35",
  storageBucket: "expensecontrol-ead35.firebasestorage.app",
  messagingSenderId: "691250501277",
  appId: "1:691250501277:web:678c1d0bd7f5c8b5cea674"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);