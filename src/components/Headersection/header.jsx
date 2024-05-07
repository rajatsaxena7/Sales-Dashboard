import React, { useState, useEffect } from "react";
import { auth } from "../../firebase/firebase.js"; // Import Firebase auth object from auth.js
import "./header.css"; // Import CSS file for styling

const Header12 = () => {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes (user sign-in/sign-out)
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUserEmail(user.email);
      } else {
        // User is signed out
        setUserEmail(null);
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="header-container">
      {userEmail ? (
        <p className="welcome-text">Welcome, {userEmail}</p>
      ) : (
        <p className="sign-in-text">Please sign in</p>
      )}
    </div>
  );
};

export default Header12;
