// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Import Firestore

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABG92-np7k2kDloeKXyD0P0oU6xpmNUqI",
  authDomain: "salesapp-b8f1b.firebaseapp.com",
  projectId: "salesapp-b8f1b",
  storageBucket: "salesapp-b8f1b.appspot.com",
  messagingSenderId: "444867697115",
  appId: "1:444867697115:web:643e37f46ff508e7d8affe",
  measurementId: "G-RMMBB4PK8Z",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app); // Initialize Firestore

// Function to load a Firestore collection
const loadCollection = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(firestore, collectionName));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.error("Error loading collection:", error);
    return []; // Return empty array on error
  }
};

export { app, auth, firestore, loadCollection };
