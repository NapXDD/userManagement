// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlQetuW8z77kHx16tj250IBrPvyP3DyW8",
  authDomain: "usermanagement-e7b0b.firebaseapp.com",
  projectId: "usermanagement-e7b0b",
  storageBucket: "usermanagement-e7b0b.appspot.com",
  messagingSenderId: "253393222340",
  appId: "1:253393222340:web:457345b8975d143b0fe791"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth