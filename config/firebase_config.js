// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app")
const { getFirestore } = require('firebase/firestore')

require("dotenv").config()
var firebase = require("firebase/app")

var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_API_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const fire = firebase.initializeApp(firebaseConfig)
    // console.log("ini fire", fire)

let db = getFirestore(fire);
// console.log("ini db di conifg", db)

module.exports = { db }