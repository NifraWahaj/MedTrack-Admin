// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, update, remove } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAQlLlduzg-LEfDGqz_Zq2yEXprPTBC38M",
    authDomain: "medtrack-68ec9.firebaseapp.com",
    databaseURL: "https://medtrack-68ec9-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "medtrack-68ec9",
    storageBucket: "medtrack-68ec9.firebasestorage.app",
    messagingSenderId: "474761412792",
    appId: "1:474761412792:web:d086b71f596b870216344d",
    measurementId: "G-32JBH1CP92"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, onValue, update, remove };

