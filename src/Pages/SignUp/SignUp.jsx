import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp({ setUser }) {
    const navigate = useNavigate();

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await axios.post('http://localhost:3001/api/auth/google', {
                token: credentialResponse.credential,
            });

            // If user doesn't exist, create the user using the signup endpoint
            if (response.status === 200) {
                const user = response.data;

                // Set the user to the global state
                setUser(user);

                // Navigate to the home page
                navigate('/');
            }
        } catch (error) {
            console.error('Google sign-in error:', error);
        }
    };

    const handleGoogleFailure = () => {
        console.log('Google sign-in failed');
    };

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
            />
        </div>
    );
}
