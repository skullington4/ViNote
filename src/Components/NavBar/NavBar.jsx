import { Link } from 'react-router-dom';
import './NavBar.css';
import React from 'react';
import TaxysLogo from '../../Images/TaxysLogo.jpg';
import { NavLink } from 'react-router-dom';


export default function NavBar({}) {
    return (
        <nav>
            <div className='logo'>
                <NavLink className='linkStyle' to="/" exact activeClassName="activeLink">ViNote</NavLink>
            </div>

            <div className='centerLinks'>
                <NavLink className='linkStyle' to="/" exact activeClassName="activeLink">Home</NavLink>
                <NavLink className='linkStyle' to="/projects" activeClassName="activeLink">Projects</NavLink>
                <NavLink className='linkStyle' to="/charts" activeClassName="activeLink">Charts</NavLink>
                <NavLink className='linkStyle' to="/notes" activeClassName="activeLink">Notes</NavLink>
            </div>

            <div className='userLinks'>
                <button className='userButtons' onClick={() => window.location.href = '/signup'}>Sign-up</button>
                <button className='userButtons' onClick={() => window.location.href = '/signin'}>Sign-in</button>
            </div>
        </nav>
    );
}
