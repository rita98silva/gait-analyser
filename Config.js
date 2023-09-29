// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAie_eWEQXXO9iFB2C8VEwgRvTSnVgCIi8",
    authDomain: "gait-eda72.firebaseapp.com",
    databaseURL: "https://gait-eda72-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "gait-eda72",
    storageBucket: "gait-eda72.appspot.com",
    messagingSenderId: "456703850606",
    appId: "1:456703850606:web:b19173b24585e078178e7f",
    measurementId: "G-N80YRTLXV8"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const analytics = getAnalytics(app)


export const db = getDatabase(app);