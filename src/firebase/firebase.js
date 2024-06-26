// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
  onSnapshot,
  Firestore,
  orderBy,
  query,
  limit,
  where,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firestore

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
const db = getFirestore(app);
const storage = getStorage(app);

const createUser = async (email, password, name, phone, file) => {
  const auth = getAuth(); // Get Firebase Auth instance
  const db = getFirestore(); // Initialize Firestore
  // Initialize Firebase Storage

  try {
    // Create user authentication record
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User created successfully:", userCredential.user);

    // Reference to where the photo will be stored in Firebase Storage
    const storageRef = ref(
      storage,
      `user-profiles/${userCredential.user.uid}/profile_picture`
    );

    // Upload the photo file to Firebase Storage
    const snapshot = await uploadBytes(storageRef, file);
    const photoUrl = await getDownloadURL(snapshot.ref);

    // Create or update the user document in Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      display_name: name,
      phone_number: phone,
      email: email,
      photo_url: photoUrl,
    });

    console.log("Firestore document and Storage upload successful");
  } catch (error) {
    console.error("Error creating user and uploading data:", error);
    throw error; // Throw the error to be handled or logged in the calling function
  }
};
const loadCollection = async (collectionName) => {
  try {
    const collRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collRef);
    const data = querySnapshot.docs.map((doc) => {
      const docData = doc.data();
      const attendance = docData.attendace
        ? docData.attendace.map((att) => ({
            onField: att.Onfield,
            clockIn: att.clock_in
              ? att.clock_in.toDate().toLocaleString()
              : null,
            clockOut: att.clock_out
              ? att.clock_out.toDate().toLocaleString()
              : null,
          }))
        : [];
      return {
        id: doc.id,
        name: docData.display_name,
        clients: docData.no_of_clients,
        proposals: docData.proposalsends,
        attendance,
        ...docData,
      };
    });
    return data;
  } catch (error) {
    console.error("Error loading collection:", error);
    return [];
  }
};

export {
  app,
  auth,
  where,
  createUser,
  db,
  doc,
  onSnapshot,
  orderBy,
  limit,
  Firestore,
  addDoc,
  deleteDoc,
  query,
  storage,
  getDocs,
  loadCollection,
  collection,
};
