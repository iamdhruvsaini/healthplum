// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJkUxklKJgj4DpkO0oHm-UxR-vxwryVyM",
  authDomain: "healthplum-d7c5a.firebaseapp.com",
  projectId: "healthplum-d7c5a",
  storageBucket: "healthplum-d7c5a.firebasestorage.app",
  messagingSenderId: "205884242786",
  appId: "1:205884242786:web:32104ff1921a9100d68a3b",
  measurementId: "G-ZWH4H37K06"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app);