// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBESXGzT3mMu8J4sXFg1n_00w7P7ndqTrQ",
    authDomain: "pokedex-database-d9ebd.firebaseapp.com",
    projectId: "pokedex-database-d9ebd",
    storageBucket: "pokedex-database-d9ebd.firebasestorage.app",
    messagingSenderId: "494657025488",
    appId: "1:494657025488:web:3022eea108f2596c1cb5d5",
    measurementId: "G-DE1HYW9KRN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app)

export const usersRef = collection(firebaseDB, "users");
export const pokemonListRef = collection(firebaseDB, "pokemonList");
