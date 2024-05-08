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
const db = getFirestore(app);
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

export { app, auth, db, loadCollection, collection };
