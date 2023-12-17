// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYnzNRUAejCuDiN7ZfTfUfKyS4jF1nE8Y",
  authDomain: "netflix-7a82d.firebaseapp.com",
  projectId: "netflix-7a82d",
  storageBucket: "netflix-7a82d.appspot.com",
  messagingSenderId: "761611266742",
  appId: "1:761611266742:web:58874255127cc7bd451417",
  measurementId: "G-8HZ5C59LKT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);