import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUbXPAmpH5mvojF0u55GKX_qpHxIrF2z8",
  authDomain: "dreamstay-c093d.firebaseapp.com",
  projectId: "dreamstay-c093d",
  storageBucket: "dreamstay-c093d.appspot.com",
  messagingSenderId: "694833864391",
  appId: "1:694833864391:web:998b648adb4e0ac7c628e2",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
