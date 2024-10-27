import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">SCHEDLR</div>
            <nav className="nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/createpost">Create Post</Link></li>
                    <li><Link to="/marketplace">MarketPlace</Link></li>
                    <li><Link to="/insights">Insights</Link></li>
                    <li><Link to="/myprofile">My Profile</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
