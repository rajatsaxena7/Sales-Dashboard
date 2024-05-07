import React, { useState, useEffect } from "react";
import { firestore, loadCollection } from "../../firebase/firebase.js"; // Import Firestore and loadCollection function

const MainSection = () => {
  const [users, setUsers] = useState([]);
  const [totalUsersCount, setTotalUsersCount] = useState(0); // State to hold the total number of users

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await loadCollection("users"); // Load user data from Firestore collection
      setUsers(usersData);

      // Reference the Firestore collection to get total users count
      const usersCollectionRef = firestore.collection("users");
      const usersSnapshot = await usersCollectionRef.get();
      const totalUsersCount = usersSnapshot.size;
      setTotalUsersCount(totalUsersCount); // Update the totalUsersCount state
    };

    fetchUsers();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div>
      <h2>User Collection</h2>
      <p>Total Users: {totalUsersCount}</p>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-item">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainSection;
