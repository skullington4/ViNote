import { Link, NavLink, useNavigate } from 'react-router-dom';
import './NavBar.css';
import React from 'react';

export default function NavBar({ user, setUser }) {
    const navigate = useNavigate();
    const userName = user && user.firstName ? user.firstName : null;

    return (
        <nav className="navbar">
            <div className="leftLinks">
                <NavLink className="linkStyle" to="/projects" activeClassName="activeLink">Projects</NavLink>
                <NavLink className="linkStyle" to="/charts" activeClassName="activeLink">Charts</NavLink>
                <NavLink className="linkStyle" to="/notes" activeClassName="activeLink">Notes</NavLink>
            </div>

            <div className="logo">
                <NavLink className="logoStyle" to="/" exact activeClassName="activeLink">ViNote</NavLink>
            </div>

            <div className="rightLinks">
                {user ? (
                    <>
                        <span className="welcomeText">Welcome, {userName}</span>
                        <button className="userButton" onClick={() => {
                            setUser(null);
                            navigate('/signin');
                        }}>Sign Out</button>
                    </>
                ) : (
                    <>
                        <button className="userButton" onClick={() => navigate('/signup')}>Sign-up</button>
                        <button className="userButton" onClick={() => navigate('/signin')}>Sign-in</button>
                    </>
                )}
            </div>
        </nav>
    );
}
