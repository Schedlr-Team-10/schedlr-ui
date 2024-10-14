import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // For signup
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const response = await axios.post("http://localhost:8082/schedlr/login", {
          email: email,
          password: password,
        });
        console.log(response);
        if (response.data && response.data.userid) {
          alert("Login successful! Redirecting to homepage...");
          // Store the userId in localStorage
          localStorage.setItem("userId", response.data.userid);

          // Navigate to homepage
          navigate("/home");
        } else {
          alert("Login failed: User object not found.");
        }
      } catch (error) {
        alert("Login failed: " + (error.response?.data || "Unknown error"));
      }
    } else {
      try {
        const response = await axios.post("http://localhost:8082/schedlr/register", {
          username: username,
          email: email,
          password: password,
        });
        alert("Registration successful! Please login.");
        setIsLogin(true); // Switch to login form after successful registration
      } catch (error) {
        alert("Signup failed: " + (error.response?.data || "Unknown error"));
      }
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-toggle">
          <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>
            Login
          </button>
          <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>
            Signup
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {isLogin ? (
            <div className="form">
              <h2>Login Form</h2>
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
              <a href="#" onClick={() => alert("Reset link sent!")}>Forgot Password?</a>
              <button type="submit">Login</button>
              <p>
                Not a User?{" "}
                <a href="#" onClick={() => setIsLogin(false)}>Signup Now</a>
              </p>
            </div>
          ) : (
            <div className="form">
              <h2>Signup Form</h2>
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
              <button type="submit">SignUp</button>
              <p>
                Already have an account?{" "}
                <a href="#" onClick={() => setIsLogin(true)}>Login</a>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
