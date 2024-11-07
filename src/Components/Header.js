import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Header = ({ isAuthenticated, handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutAndRedirect = () => {
    handleLogout(); // Reset authentication state
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="header bg-[#000000] flex justify-between items-center h-14 px-10 sticky top-0 z-50 shadow-lg">
      <h2 className="header5 justify-start text-white text-center font-bold">SCHEDLR</h2>
      <div className="flex space-x-4">
        {isAuthenticated ? (
          <>
            <ul className="listlink flex justify-center no-underline">
        
        <li className="hover:bg-slate-500 mx-2 p-1 px-2 rounded-lg text-white font-serif">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="hover:bg-slate-500 mx-2 p-1 px-2 rounded-lg text-white font-serif">
          <Link to="/createpost">CreatePost</Link>
        </li>
        <li className="hover:bg-slate-500 mx-2 p-1 px-2 rounded-lg text-white font-serif">
          <Link to="/marketplace">MarketPlace</Link>
        </li>
        <li className="hover:bg-slate-500 mx-2 p-1 px-2 rounded-lg text-white font-serif">
          <Link to="/insights">Insights</Link>
        </li>
        <li className="hover:bg-slate-500 mx-2 p-1 px-2 rounded-lg text-white font-serif">
          <Link to="/home">AboutUs</Link>
        </li>
        <li className="hover:bg-slate-500 mx-2 p-1 px-2 rounded-lg text-white font-serif">
          <Link to="/myprofile">MyProfile</Link>
        </li>
        <button onClick={handleLogoutAndRedirect} className="text-white hover:bg-slate-500 px-3 py-1 rounded-lg">Logout</button>
        </ul>
          </>
        ) : (
          <></>
          // <Link className="text-white hover:bg-slate-500 px-3 py-1 rounded-lg" to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Header;
