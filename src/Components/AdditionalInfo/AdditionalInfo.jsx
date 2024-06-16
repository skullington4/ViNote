import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AdditionalInfo() {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user;

    const [formData, setFormData] = useState({
        role: '',
        firstName: '',
        lastName: '',
        email: user?.email || '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/auth/signup', {
                ...formData,
                googleId: user.googleId,
                avatar: user.avatar,
            });
            console.log('User signup successful:', response.data);
            navigate('/welcome'); // Redirect to a welcome page or dashboard
        } catch (error) {
            console.error('User signup error:', error);
        }
    };

    return (
        <div className="additional-info-container">
            <h1>Complete Your Signup</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Role</label>
                    <select name="role" value={formData.role} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="business">Business</option>
                        <option value="accountant">Accountant</option>
                    </select>
                </div>
                <div>
                    <label>First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required readOnly />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
                <button type="submit">Complete Signup</button>
            </form>
        </div>
    );
}
