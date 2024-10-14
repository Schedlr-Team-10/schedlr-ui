import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Updated import
import Dashboard from "./Components/Dashboard";
import MarketPlace from "./Components/MarketPlace";
import Insights from "./Components/Insights";
import { Header } from "./Components/Header";
import CreatePost from "./Components/Createpost";
import MyProfile from "./Components/MyProfile";
import Home from "./Components/Home";
import Homepage from "./Components/Homepage";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {/* <Route path="/EntryPage" element={<EntryPage />} /> */}
          <Route path="/Home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/" element={<Homepage onLogin={handleLogin} />} />
          {/* <Route path="/" element={<Homepage onLogin={handleLogin} />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
