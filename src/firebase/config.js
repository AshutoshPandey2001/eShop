import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyA6ieTNJmJyRr7NL3w17sHRGAj-QjecfnE",
    authDomain: "eshop-2e2d6.firebaseapp.com",
    projectId: "eshop-2e2d6",
    storageBucket: "eshop-2e2d6.appspot.com",
    messagingSenderId: "402255344483",
    appId: "1:402255344483:web:d1a5284b9a89af173c1956"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = firebase.firestore();
export const storage = getStorage(app);
export default app;