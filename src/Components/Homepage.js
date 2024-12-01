import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Homepage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [accountType, setAccountType] = useState("PERSONAL");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isForgotPassword) {
      if (!email) {
        alert("Please enter your registered email.");
        return;
      }
      try {
        const response = await axios.post(`${process.env.REACT_APP_PROFILE_MANAGEMENT_URL}/schedlr/forgot-password`, {
          email: email,
        });
        if (response.data.message === "OTP sent to your registered email.") {
          setIsOtpSent(true);
          alert("OTP sent to your email. Please check your inbox.");
        } else {
          alert(response.data.message || "Failed to send OTP. Please try again.");
        }
      } catch (error) {
        alert("Error: " + (error.response?.data.message || "Unknown error"));
      }
    } else if (isLogin) {
      if (!email || !password) {
        alert("Please enter both email and password.");
        return;
      }
      try {
        const response = await axios.post(`${process.env.REACT_APP_PROFILE_MANAGEMENT_URL}/schedlr/login`, {
          email: email,
          password: password,
        });
        if (response.data.userid) {
          alert("Login successful! Redirecting to homepage...");
          localStorage.setItem("userId", response.data.userid);
          localStorage.setItem("accountType", response.data.accountType);
          onLogin();
          navigate("/home");
        } else {
          alert(response.data.message || "Invalid email or password.");
        }
      } catch (error) {
        alert("Login failed: " + (error.response?.data.message || "Unknown error"));
      }
    } else {
      
      if (!username || !email || !password) {
        alert("All fields are required for signup.");
        return;
      }
      try {
        const response = await axios.post(`${process.env.REACT_APP_PROFILE_MANAGEMENT_URL}/schedlr/register`, {
          username: username,
          email: email,
          password: password,
          accountType: accountType,
        });
        if (response.data.message === "Registration successful.") {
          alert("Registration successful! Please login.");
          setIsLogin(true);
        } else {
          alert(response.data.message || "Registration failed. Please try again.");
        }
      } catch (error) {
        alert("Signup failed: " + (error.response?.data.message || "Unknown error"));
      }
    }
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
    setIsLogin(false);
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_PROFILE_MANAGEMENT_URL}/schedlr/verify-otp`, {
        email: email,
        otp: otp,
      });
      if (response.status === 200) {
        alert("OTP verified successfully! Redirecting to reset password...");
        navigate("/reset-password", { state: { email: email } }); 
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      alert("Error: " + (error.response?.data || "Unknown error"));
    }
  };
  
  return (
    <div className="container">
      <div className="form-container">
        <div className="form-toggle">
          <button
            className={isLogin && !isForgotPassword ? "active" : ""}
            onClick={() => {
              setIsLogin(true);
              setIsForgotPassword(false);
            }}
          >
            Login
          </button>
          <button
            className={!isLogin && !isForgotPassword ? "active" : ""}
            onClick={() => {
              setIsLogin(false);
              setIsForgotPassword(false);
            }}
          >
            Signup
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {isForgotPassword ? (
            <div className="form">
              <h2>Forgot Password</h2>
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {isOtpSent ? (
                <>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button type="button" onClick={handleVerifyOtp}>
                    Verify OTP
                  </button>
                </>
              ) : (
                <button type="submit">Send OTP</button>
              )}
              <button
                type="button"
                onClick={() => {
                  setIsForgotPassword(false);
                  setIsLogin(true);
                }}
              >
                Back to Login
              </button>
            </div>
          ) : isLogin ? (
            <div className="form">
              <h2>Login</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a href="#" onClick={handleForgotPassword}>
                Forgot Password?
              </a>
              <button type="submit">Login</button>
            </div>
          ) : (
            <div className="form">
              <h2>Signup</h2>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                required
              >
                <option value="INFLUENCER">Influencer</option>
                <option value="PERSONAL">Personal</option>
              </select>
              <button type="submit">SignUp</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
