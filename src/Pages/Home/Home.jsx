import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

export default function Home() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/auth/me', {
                    withCredentials: true
                });
                setUser(res.data.user);
            } catch (err) {
                console.error(err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='home-container'>
            {user ? (
                <div>
                    <h1>Welcome, {user.firstName}</h1>
                    <p>Your email: {user.email}</p>
                    <p>Profile Picture:</p>
                    <img src={user.avatar} alt="Profile" />
                    {/* Add any other user information or additional content here */}
                </div>
            ) : (
                <div>
                    <h1>Welcome to Our Application</h1>
                    <p>Please log in to access your account.</p>
                    {/* Add any other guest information or additional content here */}
                </div>
            )}
        </div>
    );
}
