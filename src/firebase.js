// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-TlNdzqjFWG19AiycNejcS1LBqZePA5E",
    authDomain: "react-app-65416.firebaseapp.com",
    projectId: "react-app-65416",
    storageBucket: "react-app-65416.firebasestorage.app",
    messagingSenderId: "48632850305",
    appId: "1:48632850305:web:b03a548562ccd9fa196a80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };