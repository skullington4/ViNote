import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const navigate = useNavigate();

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await axios.post('http://localhost:3001/api/auth/google', {
                token: credentialResponse.credential,
            });
            console.log('Google sign-in successful:', response.data);
            navigate('/additional-info', { state: { user: response.data } });
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
