import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    return (
        <nav className="navbar fixed-top">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-text">Auction</span>
                    <span className="logo-highlight">Elite</span>
                </Link>
                
                <div className="navbar-toggle mx-4" onClick={() => setIsOpen(!isOpen)}>
                    <span className="toggle-line"></span>
                    <span className="toggle-line"></span>
                    <span className="toggle-line"></span>
                </div>

                <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
                    <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                        Home
                    </Link>
                    <Link to="/auction" className={location.pathname === '/auction' ? 'active' : ''}>
                        Auctions
                    </Link>
                    <Link to="/login" className="btn btn-outline">
                        Login
                    </Link>
                    <Link to="/register" className="btn">
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
