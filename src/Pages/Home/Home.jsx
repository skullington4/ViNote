import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

export default function Home({ user }) {


    return (
        <div className="home-container">
            {user ? (
                <div>
                    <h1>Welcome, {user.firstName}</h1>
                    <p>Your email: {user.email}</p>
                    <p>Profile Picture:</p>
                    <img src={user.avatar} alt="Profile" />
                </div>
            ) : (
                <div>
                    <h1>Welcome to Our Application</h1>
                    <p>Please log in to access your account.</p>
                </div>
            )}
        </div>
    );
}
