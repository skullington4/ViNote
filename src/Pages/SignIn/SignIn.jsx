import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { FaFacebook, FaApple, FaMicrosoft, FaEye, FaEyeSlash } from 'react-icons/fa';
import './SignIn.css';

export default function SignIn() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="signin-container">
            <div className="signin-form">
                <h1>Log in to Vinote</h1>
                <form>
                    <div className="input-group">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" placeholder="E-mail" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-container">
                            <input 
                                type={passwordVisible ? "text" : "password"} 
                                id="password" 
                                placeholder="Password" 
                            />
                            <button 
                                type="button" 
                                className="show-password" 
                                onClick={togglePasswordVisibility}
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
                        onSuccess={credentialResponse => {
                            const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
                            console.log('Login Successful', credentialResponseDecoded);
                            console.log('ID Token', credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                    <button className="social-button facebook"><FaFacebook /> Sign-up with Facebook</button>
                    <button className="social-button apple"><FaApple /> Sign-up with Apple</button>
                    <button className="social-button outlook"><FaMicrosoft /> Sign-up with Outlook</button>
                </div>
                <p className="signin-footer">
                    Already have an account? <a href="/login">Log in</a>
                </p>
            </div>
        </div>
    );
}
