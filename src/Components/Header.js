import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

export const Header = ({ isAuthenticated, handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutAndRedirect = () => {
    handleLogout(); // Reset authentication state
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="header">
      <h2 className="header-title">SCHEDLR</h2>
      <div className="header-links">
        {isAuthenticated ? (
          <>
            <ul className="nav-list">
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/createpost">CreatePost</Link>
              </li>
              <li>
                <Link to="/marketplace">MarketPlace</Link>
              </li>
              <li>
                <Link to="/insights">Insights</Link>
              </li>
              <li>
                <Link to="/home">AboutUs</Link>
              </li>
              <li>
                <Link to="/myprofile">MyProfile</Link>
              </li>
              <button onClick={handleLogoutAndRedirect} className="logout-button">
                Logout
              </button>
            </ul>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Header;
