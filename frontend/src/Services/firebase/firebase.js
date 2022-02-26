import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD5hEEJH5_wWm3vXPPvkKld9yAi2QT8WWI",
    authDomain: "wecare-54f9b.firebaseapp.com",
    projectId: "wecare-54f9b",
    storageBucket: "wecare-54f9b.appspot.com",
    messagingSenderId: "707470584773",
    appId: "1:707470584773:web:afe4bed0ea5d6199a039ac",
    measurementId: "G-Z7P1CHYJ03"
})

const db = firebaseApp.firestore()

const auth = firebase.auth()

export { db, auth, firebaseApp }