import React from "react";
import { Link } from "react-router-dom";

export const Header = ({ isAuthenticated }) => (
  <div className="flex justify-between px-52 items-center h-14 bg-[#2C3E50] sticky top-0 z-50 shadow-lg">
    <div className="flex items-center">
      <h2 className="mr-[250px] font-julius text-3xl text-white">
        <Link to="/">SCHEDLR</Link>
      </h2>
    </div>

    <div className="flex justify-center no-underline">
      <ul className="flex justify-center no-underline">
        
        <li className="hover:bg-slate-500 mx-2 p-1 px-2 rounded-lg text-white font-julius">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="hover:bg-slate-500 mx-2 p-1 px-2 rounded-lg text-white font-julius">
          <Link to="/createpost">CreatePost</Link>
        </li>
        <li className="hover:bg-slate-500 mx-2 p-1 px-2 rounded-lg text-white font-julius">
          <Link to="/marketplace">MarketPlace</Link>
        </li>
        <li className="hover:bg-slate-500 mx-2 p-1 px-2 rounded-lg text-white font-julius">
          <Link to="/insights">Insights</Link>
        </li>
        <li className="hover:bg-slate-500 mx-2 p-1 px-2 rounded-lg text-white font-julius">
          <Link to="/home">AboutUs</Link>
        </li>
        <li className="hover:bg-slate-500 mx-2 p-1 px-2 rounded-lg text-white font-julius">
          <Link to="/myprofile">MyProfile</Link>
        </li>
        {/* Conditionally render Login and Sign Up links */}
        {/* {!isAuthenticated && (
          <>
            <li className="hover:bg-slate-500 mx-2 p-1 px-2 rounded-lg text-white">
              <Link to="/login">Login / SignUp</Link>
            </li>
          </>
        )} */}
      </ul>
    </div>
  </div>
);

export default Header;
