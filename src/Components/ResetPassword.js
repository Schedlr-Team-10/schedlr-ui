import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResetPassword.css";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract email from the navigation state
  const email = location.state?.email || "";

  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!email) {
      alert("Invalid process. Please start the reset process again.");
      navigate("/"); 
    }
  }, [email, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_PROFILE_MANAGEMENT_URL}/schedlr/reset-password`, {
        email: email,
        newPassword: password,
      });

      if (response.status === 200) {
        alert("Password reset successfully! Redirecting to login...");
        navigate("/");
      } else {
        alert("Failed to reset password. Please try again.");
      }
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
}
