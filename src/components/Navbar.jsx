import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeMenu}>
                    CollegeEvents
                </Link>

                <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>

                <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/events" className="nav-item" onClick={closeMenu}>Events</Link>
                    {user ? (
                        <>
                            <Link to="/dashboard" className="nav-item" onClick={closeMenu}>Dashboard</Link>
                            {user.is_admin && <Link to="/admin" className="nav-item" onClick={closeMenu}>Admin</Link>}
                            <span className="nav-item user-email">{user.email}</span>
                            <button onClick={handleLogout} className="btn btn-logout">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-item" onClick={closeMenu}>Login</Link>
                            <Link to="/register" className="nav-item" onClick={closeMenu}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
