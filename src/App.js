import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import MarketPlace from "./Components/MarketPlace";
import Insights from "./Components/Insights";
import { Header } from "./Components/Header";
import CreatePost from "./Components/Createpost";
import MyProfile from "./Components/MyProfile";
import Home from "./Components/Home";
import Homepage from "./Components/Homepage";
import Privacy from "./Components/Privacy";
import PinterestAccessStatus from "./Components/PinterestAccessStatus";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
  };

  return (
    <Router>
      <div className="App">
        <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Homepage onLogin={handleLogin} />} />
          <Route path="/home" element={<Home />} />
          {isAuthenticated && (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/createpost" element={<CreatePost />} />
              <Route path="/marketplace" element={<MarketPlace />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/myprofile" element={<MyProfile />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/pinterestStatus" element={<PinterestAccessStatus />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
