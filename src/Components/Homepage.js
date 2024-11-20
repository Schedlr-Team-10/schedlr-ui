// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Homepage({ onLogin }) { 
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState(""); 
//   const navigate = useNavigate(); 

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (isLogin) {
//       try {
//         const response = await axios.post("http://localhost:8082/schedlr/login", {
//           email: email,
//           password: password,
//         });
//         console.log(response);
//         if (response.data && response.data.userid) {
//           alert("Login successful! Redirecting to homepage...");
  
//           localStorage.setItem("userId", response.data.userid);
//           localStorage.setItem("accountType", response.data.accountType);
  
//           // Trigger authentication state change
//           onLogin(); // Call onLogin to update isAuthenticated in App.js
  
//           // Navigate to homepage
//           navigate("/home");
//         } else {
//           alert("Login failed: User object not found.");
//         }
//       } catch (error) {
//         alert("Login failed: " + (error.response?.data || "Unknown error"));
//       }
//     } else {
//       try {
//         console.log("Username: " + username);
//         console.log("Password: " + password);
//         console.log("Email: " + email);
//         const response = await axios.post("http://localhost:8082/schedlr/register", {
//           username: username,
//           email: email,
//           password: password,
//           accountType: role, // Include the role in registration payload
//         });
  
//         if (response.status !== 200) {
//           alert("Failed to register. Please try again.");
//           return;
//         }
  
//         alert("Registration successful! Please login.");
//         setIsLogin(true); // Switch to login form after successful registration
//       } catch (error) {
//         alert("Signup failed: " + (error.response?.data || "Unknown error"));
//       }
//     }
//   };
  

//   return (
//     <div className="container">
//       <div className="form-container">
//         <div className="form-toggle">
//           <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>
//             Login
//           </button>
//           <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>
//             Signup
//           </button>
//         </div>
//         <form onSubmit={handleSubmit}>
//           {isLogin ? (
//             <div className="form">
//               <h2>Login Form</h2>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <a href="#" onClick={() => alert("Reset link sent!")}>Forgot Password?</a>
//               <button type="submit">Login</button>
//               <p>
//                 Not a User?{" "}
//                 <a href="#" onClick={() => setIsLogin(false)}>Signup Now</a>
//               </p>
//             </div>
//           ) : (
//             <div className="form">
//               <h2>Signup Form</h2>
//               <input
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <select
//   value={accountType}
//   onChange={(e) => setAccountType(e.target.value)}
//   required
// >
//   <option value="INFLUENCER">Influencer</option>
//   <option value="PERSONAL">Personal</option>
// </select>
//               <button type="submit">SignUp</button>
//               <p>
//                 Already have an account?{" "}
//                 <a href="#" onClick={() => setIsLogin(true)}>Login</a>
//               </p>
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Homepage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [accountType, setAccountType] = useState("PERSONAL"); // Default to PERSONAL
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        console.log("Attempting to forward the credentials to the server...");
        const response = await axios.post("http://localhost:8082/schedlr/login", {
          email: email,
          password: password,
        });
        console.log(response);
        if (response.data && response.data.userid) {
          alert("Login successful! Redirecting to homepage...");

          localStorage.setItem("userId", response.data.userid);
          // Trigger authentication state change
          onLogin(); // Call onLogin to update isAuthenticated in App.js

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
        console.log("Username: " + username);
        console.log("Password: " + password);
        console.log("Email: " + email);
        console.log("Account Type: " + accountType);

        const response = await axios.post("http://localhost:8082/schedlr/register", {
          username: username,
          email: email,
          password: password,
          accountType: accountType, // Include the accountType in registration payload
        });

        if (response.status !== 200) {
          alert("Failed to register. Please try again.");
          return;
        }

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
              <select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                required
              >
                <option value="INFLUENCER">Influencer</option>
                <option value="PERSONAL">Personal</option>
              </select>
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
