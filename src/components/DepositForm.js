// src/components/DepositForm.js
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";

const DepositForm = () => {
  const { userId } = useParams(); // Get the userId from the URL
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add a new deposit to Firestore
    try {
      await addDoc(collection(db, "deposits"), {
        userId: userId,
        amount: amount,
        date: date,
      });
      alert("Deposit added successfully!");
      navigate(`/user/${userId}`); // Navigate back to the user details page after success
    } catch (error) {
      console.error("Error adding deposit: ", error);
      alert("Error adding deposit");
    }
  };

  return (
    <div>
      <h2>Add New Deposit</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount: </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Deposit</button>
      </form>
    </div>
  );
};

export default DepositForm;
