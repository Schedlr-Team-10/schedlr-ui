import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Header = ({ isAuthenticated, handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutAndRedirect = () => {
    handleLogout(); // Reset authentication state
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="bg-black flex justify-between items-center h-14 px-10 sticky top-0 z-50 shadow-md">
      <h2 className="text-white text-2xl font-bold mr-20 pb-2 font-julius">SCHEDLR</h2>
      <div>
        {isAuthenticated ? (
          <ul className="flex space-x-4 items-center m-0 p-0 list-none">
            <li className="rounded-md transition duration-300 ease-in-out hover:bg-gray-600">
              <Link to="/dashboard" className="text-white px-3 py-2 block font-julius">
                Dashboard
              </Link>
            </li>
            <li className="rounded-md transition duration-300 ease-in-out hover:bg-gray-600">
              <Link to="/createpost" className="text-white px-3 py-2 block font-julius">
                CreatePost
              </Link>
            </li>
            <li className="rounded-md transition duration-300 ease-in-out hover:bg-gray-600">
              <Link to="/marketplace" className="text-white px-3 py-2 block font-julius">
                MarketPlace
              </Link>
            </li>
            <li className="rounded-md transition duration-300 ease-in-out hover:bg-gray-600">
              <Link to="/insights" className="text-white px-3 py-2 block font-julius">
                Insights
              </Link>
            </li>
            <li className="rounded-md transition duration-300 ease-in-out hover:bg-gray-600">
              <Link to="/home" className="text-white px-3 py-2 block font-julius">
                AboutUs
              </Link>
            </li>
            <li className="rounded-md transition duration-300 ease-in-out hover:bg-gray-600">
              <Link to="/myprofile" className="text-white px-3 py-2 block font-julius">
                MyProfile
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogoutAndRedirect}
                className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition duration-300 shadow-md"
              >
                Logout
              </button>
            </li>
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
