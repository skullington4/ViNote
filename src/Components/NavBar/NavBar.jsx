import { Link, NavLink } from 'react-router-dom';
import React from 'react';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
    const handleSignOut = () => {
        // Clear the user state to sign out
        setUser(null);
    };

    const firstName = user?.name.split(' ')[0];

    return (
        <nav className='navbar'>
            <div className='leftLinks'>
                <NavLink
                    className={({ isActive }) => (isActive ? 'linkStyle activeLink' : 'linkStyle')}
                    to="/projects"
                >
                    Projects
                </NavLink>
                <NavLink
                    className={({ isActive }) => (isActive ? 'linkStyle activeLink' : 'linkStyle')}
                    to="/charts"
                >
                    Charts
                </NavLink>
                <NavLink
                    className={({ isActive }) => (isActive ? 'linkStyle activeLink' : 'linkStyle')}
                    to="/notes"
                >
                    Notes
                </NavLink>
            </div>

            <div className='logo'>
                <NavLink
                    className={({ isActive }) => (isActive ? 'logoStyle activeLink' : 'logoStyle')}
                    to="/"
                >
                    ViNote
                </NavLink>
            </div>

            <div className='rightLinks'>
                <NavLink
                    className={({ isActive }) => (isActive ? 'linkStyle activeLink' : 'linkStyle')}
                    to="/about"
                >
                    About Us
                </NavLink>
                {user ? (
                    <>
                        <span className='welcomeMessage'>Welcome, {firstName}</span>
                        <button className='userButton' onClick={handleSignOut}>Sign Out</button>
                    </>
                ) : (
                    <>
                        <button className='userButton' onClick={() => window.location.href = '/signin'}>Sign In</button>
                        <button className='userButton' onClick={() => window.location.href = '/signup'}>Sign Up</button>
                    </>
                )}
            </div>
        </nav>
    );
}
