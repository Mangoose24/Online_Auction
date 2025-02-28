import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './Navbar.css';

const Navbar = ({ user, setUser }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const renderAuthButtons = () => {
        if (user) {
            return (
                <>
                    {user.role === 'admin' && (
                        <Link 
                            to="/admin/dashboard" 
                            className={location.pathname === '/admin/dashboard' ? 'active' : ''}
                        >
                            Admin Dashboard
                        </Link>
                    )}
                    <span className="user-email">{user.email}</span>
                    <button 
                        onClick={handleLogout} 
                        className="btn btn-outline"
                    >
                        Logout
                    </button>
                </>
            );
        }

        return (
            <>
                <Link to="/login" className={`btn btn-outline ${location.pathname === '/login' ? 'active' : ''}`}>
                    Login
                </Link>
                <Link to="/register" className={`btn ${location.pathname === '/register' ? 'active' : ''}`}>
                    Register
                </Link>
            </>
        );
    };

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
                    {user && (
                        <Link 
                            to="/auction" 
                            className={location.pathname === '/auction' ? 'active' : ''}
                        >
                            Auctions
                        </Link>
                    )}
                    {renderAuthButtons()}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
