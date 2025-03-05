// src/components/TotalDepositCalculator.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const TotalDepositCalculator = () => {
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users and their deposits
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get users
        const usersSnapshot = await getDocs(collection(db, "users"));
        const usersList = usersSnapshot.docs.map((doc) => doc.data());
        setUsers(usersList);

        // Use Promise.all() to fetch all deposits concurrently
        const depositPromises = usersList.map(async (user) => {
          const depositsSnapshot = await getDocs(
            query(collection(db, "deposits"), where("userId", "==", user.id))
          );
          let userTotalDeposit = 0;
          depositsSnapshot.docs.forEach((doc) => {
            userTotalDeposit += doc.data().amount;
          });
          return userTotalDeposit;
        });

        // Wait for all deposit promises to resolve
        const deposits = await Promise.all(depositPromises);

        // Calculate total deposit by summing up individual deposits
        const total = deposits.reduce((acc, curr) => acc + curr, 0);
        setTotalDeposits(total); // Set the total deposit
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Total Deposit Calculator</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>Total Deposits from All Users: ${totalDeposits}</h3>

          <h4>Users List</h4>
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                <strong>{user.name}</strong> - Total Deposit: $
                {user.id && (
                  <span>
                    {/* Calculate individual user deposit */}
                    {user.id} {/* Show user ID or name */}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TotalDepositCalculator;
