// Import Firebase packages using the modular approach
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, doc, setDoc } = require("firebase/firestore");

// Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyAShKEBp6-BbhkHZM7YaUU5i3mFSeHiUSU",
    authDomain: "tickets-project-abc3c.firebaseapp.com",
    projectId: "tickets-project-abc3c",
    storageBucket: "tickets-project-abc3c.firebasestorage.app",
    messagingSenderId: "1046874177764",
    appId: "1:1046874177764:web:ff35453a0a0ff2369eecf1",
    measurementId: "G-64BVD16865"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

module.exports = { db, collection, addDoc, doc, setDoc };