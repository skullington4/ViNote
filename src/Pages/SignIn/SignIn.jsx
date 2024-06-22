import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './SignIn.css';

export default function SignIn({ setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
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

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            const user = jwtDecode(token);
            setUser(user);
            navigate('/');
        } catch (error) {
            console.error('Error signing in', error);
            alert('Invalid email or password');
        }
    };

    return (
        <div className="signin-container">
            <form className="signin-form" onSubmit={handleSignIn}>
                <h1>Sign In</h1>
                <div className="input-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <div className="password-container">
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '80%' }}
                        />
                        <button
                            type="button"
                            className="show-password"
                            onClick={togglePasswordVisibility}
                            style={{ width: '15%' }}
                        >
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
                <button type="submit" className="signin-button">Log in</button>
                <a href="/forgot-password" className="forgot-password">Forgot your password?</a>
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
