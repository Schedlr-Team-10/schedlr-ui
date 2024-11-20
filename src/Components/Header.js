import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Header = ({ isAuthenticated, handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutAndRedirect = () => {
    handleLogout(); // Reset authentication state
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="header bg-[#000000] flex justify-between items-center h-12 px-0 sticky top-0 z-50 shadow-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <h2 className="header5 justify-start text-white text-center font mr-6 text-2xl" style={{ fontFamily: 'Julius Sans One, sans-serif' }}>
        SCHEDLR
      </h2>
      <div className="flex space-x-3">
        {isAuthenticated ? (
          <>
            <ul className="listlink flex justify-center no-underline">
              <li className="hover:bg-slate-500 mx-2 p-1 px-1 rounded-lg text-white font-serif text-base"  style={{ fontFamily: 'Julius Sans One, sans-serif' }}>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="hover:bg-slate-500 mx-2 p-1 px-1 rounded-lg text-white font-serif text-base" style={{ fontFamily: 'Julius Sans One, sans-serif' }}>
                <Link to="/createpost">CreatePost</Link>
              </li>
              <li className="hover:bg-slate-500 mx-2 p-1 px-1 rounded-lg text-white font-serif text-base" style={{ fontFamily: 'Julius Sans One, sans-serif' }}>
                <Link to="/marketplace">MarketPlace</Link>
              </li>
              <li className="hover:bg-slate-500 mx-2 p-1 px-1 rounded-lg text-white font-serif text-base" style={{ fontFamily: 'Julius Sans One, sans-serif' }}>
                <Link to="/insights">Insights</Link>
              </li>
              <li className="hover:bg-slate-500 mx-2 p-1 px-1 rounded-lg text-white font-serif text-base" style={{ fontFamily: 'Julius Sans One, sans-serif' }}>
                <Link to="/home">AboutUs</Link>
              </li>
              <li className="hover:bg-slate-500 mx-2 p-1 px-1 rounded-lg text-white font-serif text-base" style={{ fontFamily: 'Julius Sans One, sans-serif' }}>
                <Link to="/myprofile">MyProfile</Link>
              </li>
              <button onClick={handleLogoutAndRedirect} className="text-white hover:bg-slate-500 px-3 py-1 rounded-lg text-base" style={{ fontFamily: 'Julius Sans One, sans-serif' }}>Logout</button>
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
