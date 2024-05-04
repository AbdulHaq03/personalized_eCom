// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAw93_GABPENwhCM7Gytjn5IVuQyjBgMiI",
  authDomain: "personalizedecom.firebaseapp.com",
  projectId: "personalizedecom",
  storageBucket: "personalizedecom.appspot.com",
  messagingSenderId: "141529712874",
  appId: "1:141529712874:web:a45e81429f94a9a668ef93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }