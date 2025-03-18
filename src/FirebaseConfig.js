// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCROd0jSM5H9X1fEjy-A-rqfKaf0SlooyQ",
  authDomain: "csit415.firebaseapp.com",
  projectId: "csit415",
  storageBucket: "csit415.firebasestorage.app",
  messagingSenderId: "651479032438",
  appId: "1:651479032438:web:0f8edc4bb41e8c9448f557",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

export default db;
