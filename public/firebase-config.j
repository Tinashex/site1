// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3gPYOe-_BYJdioZxWJVntAmbF5FkmcoU",
  authDomain: "watson-dev1.firebaseapp.com",
  projectId: "watson-dev1",
  storageBucket: "watson-dev1.firebasestorage.app",
  messagingSenderId: "900178744298",
  appId: "1:900178744298:web:e6732e9e0959cfbf3f9893",
  measurementId: "G-N3L8FFGW62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);