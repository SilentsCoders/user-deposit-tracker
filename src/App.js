// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersList from "./components/UsersList";
import UserDetails from "./components/UserDetails";
import DepositForm from "./components/DepositForm";
import TotalDepositCalculator from "./components/TotalDepositCalculator";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UsersList />} />
          <Route path="/user/:userId" element={<UserDetails />} />
          <Route path="/user/:userId/add-deposit" element={<DepositForm />} />
          <Route path="/total-deposit-calculator" element={<TotalDepositCalculator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
