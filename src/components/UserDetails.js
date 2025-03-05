// src/components/UserDetails.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams, Link, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [deposits, setDeposits] = useState([]);
  const { userId } = useParams(); // Get the userId from the URL
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  // Fetch user details and deposits when component mounts
  useEffect(() => {
    const getUserDetailsAndDeposits = async () => {
      // Fetch user details
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setUser(userDoc.data()); // Set user data
      } else {
        console.log("User not found");
      }

      // Fetch deposits for this user
      const q = query(collection(db, "deposits"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const depositsList = querySnapshot.docs.map((doc) => doc.data());
      setDeposits(depositsList);
    };

    getUserDetailsAndDeposits();
  }, [userId]);

  // Navigate to deposit form when button is clicked
  const handleMakeDeposit = () => {
    navigate(`/user/${userId}/add-deposit`);
  };

  return (
    <div>
      {user ? (
        <>
          <h2>{user.name}</h2>
          <p><strong>Father's Name:</strong> {user.fatherName}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Mobile:</strong> {user.mobile}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>NID:</strong> {user.nid}</p>
          <p><strong>Blood Group:</strong> {user.bloodGroup}</p>
          <p><strong>Occupation:</strong> {user.occupation}</p>
          <p><strong>Workplace:</strong> {user.workplace}</p>

          <h3>Deposits</h3>
          <ul>
            {deposits.map((deposit, index) => (
              <li key={index}>
                <p><strong>Amount:</strong> {deposit.amount}</p>
                <p><strong>Date:</strong> {deposit.date}</p>
              </li>
            ))}
          </ul>

          {/* Make Deposit Button */}
          <button onClick={handleMakeDeposit}>Make Deposit</button>
        </>
      ) : (
        <p>Loading...</p>
      )}

      {/* Link to go back to the users list */}
      <Link to="/">Back to Users List</Link>
    </div>
  );
};

export default UserDetails;
