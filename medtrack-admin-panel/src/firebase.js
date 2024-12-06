import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, update, remove } from "firebase/database";
import { getFirestore, doc, setDoc, getDoc, collection } from "firebase/firestore"; // Firestore imports

const firebaseConfig = {
    apiKey: "AIzaSyAQlLlduzg-LEfDGqz_Zq2yEXprPTBC38M",
    authDomain: "medtrack-68ec9.firebaseapp.com",
    databaseURL: "https://medtrack-68ec9-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "medtrack-68ec9",
    storageBucket: "medtrack-68ec9.firebasestorage.app",
    messagingSenderId: "474761412792",
    appId: "1:474761412792:web:d086b71f596b870216344d",
    measurementId: "G-32JBH1CP92",
};

const app = initializeApp(firebaseConfig);

// Realtime Database
const db = getDatabase(app);

// Firestore Database
const firestore = getFirestore(app);

// Exports
export { db, firestore, ref, onValue, update, remove, doc, setDoc, getDoc, collection };
