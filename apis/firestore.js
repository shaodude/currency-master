// Import the functions you need from the SDKs you need
// compat packages are API compatible with namespaced code
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzNP2FfwiYBwZwp6MB9LVvP0JMTn6UMYU",
  authDomain: "currency-master-6e0ea.firebaseapp.com",
  projectId: "currency-master-6e0ea",
  storageBucket: "currency-master-6e0ea.appspot.com",
  messagingSenderId: "1041609106915",
  appId: "1:1041609106915:web:5d34f962f60f2067eeecd6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;
