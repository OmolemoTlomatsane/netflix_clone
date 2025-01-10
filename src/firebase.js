// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GreaterEqualDepth } from "three";
import {addDoc, collection, getFirestore } from 'firebase/firestore'
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5HSjXeszCHY0gtrshyp8MO4y3OIyETxc",
  authDomain: "netflix-clone-4cc69.firebaseapp.com",
  projectId: "netflix-clone-4cc69",
  storageBucket: "netflix-clone-4cc69.firebasestorage.app",
  messagingSenderId: "769120979546",
  appId: "1:769120979546:web:6c2e314a13a815aceb6663",
  measurementId: "G-FNDRKCT9ZK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)

const sign_up = async (name, email, password)=>{
   try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        await addDoc(collection(db, 'user', {
            uid: user.uid,
            name,
            authProvider: 'local',
            email
        }))
   } catch (error) {
    console.log(error)
    toast.error(error.code.split('/')[1].split('-').join(' '))
   }
}

const user_login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const logout = async ()=>{
    signOut(auth)
}

export {auth, db, user_login, sign_up, logout}