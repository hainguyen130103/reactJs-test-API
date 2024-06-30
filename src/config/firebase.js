// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3YWBasGWJyv3kOavrXSqQWAkvjG_FiU0",
  authDomain: "orchids-57db0.firebaseapp.com",
  projectId: "orchids-57db0",
  storageBucket: "orchids-57db0.appspot.com",
  messagingSenderId: "738064349612",
  appId: "1:738064349612:web:93bc0c8ed47f1a1bc8a209",
  measurementId: "G-7WTWR366PY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();
export { storage, googleProvider, auth };
