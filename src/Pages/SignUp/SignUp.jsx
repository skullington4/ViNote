import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import './SignUp.css';

axios.defaults.withCredentials = true;

export default function SignUp({ setUser }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/auth/register', formData);
            const { token } = response.data;
            localStorage.setItem('token', token);
            const user = jwtDecode(token);
            setUser(user);
            navigate('/');
        } catch (error) {
            console.error('Error signing up', error);
            alert('Error signing up');
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            console.log('Google Credential Response:', credentialResponse);
            const { credential } = credentialResponse;
            const response = await axios.post('http://localhost:3001/api/auth/google', {
                token: credential,
            });

            const { token } = response.data;
            localStorage.setItem('token', token);
            const user = jwtDecode(token);
            setUser(user);
            navigate('/');
        } catch (error) {
            console.error('Google sign-in error:', error);
        }
    };

    const handleGoogleFailure = () => {
        console.log('Google sign-in failed');
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
            <hr />
            <div className="social-signin">
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleFailure}
                />
            </div>
        </div>
    );
}
