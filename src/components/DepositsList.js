// src/components/DepositsList.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const DepositsList = () => {
  const [deposits, setDeposits] = useState([]);
  const [userName, setUserName] = useState("");
  const { userId } = useParams(); // Get the userId from the URL

  // Fetch deposits and user data
  useEffect(() => {
    const getDepositsAndUser = async () => {
      // Fetch deposits for the user
      const q = query(collection(db, "deposits"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const depositsList = querySnapshot.docs.map((doc) => doc.data());
      setDeposits(depositsList);

      // Fetch the user's name from the "users" collection
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setUserName(userDoc.data().name); // Set the user's name
      } else {
        console.log("User not found");
      }
    };

    getDepositsAndUser();
  }, [userId]);

  return (
    <div>
      <h2>Deposits for {userName}</h2>
      <ul>
        {deposits.map((deposit, index) => (
          <li key={index}>
            <p>Amount: {deposit.amount}</p>
            <p>Date: {deposit.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepositsList;
