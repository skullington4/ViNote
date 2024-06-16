const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const bcrypt = require('bcrypt');
const User = require('../../models/User');
require('dotenv').config();

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        });

        const { sub, name, email, picture } = ticket.getPayload();

        // Check if the user already exists
        let user = await User.findOne({ googleId: sub });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Return the user information without saving it to the database
        res.status(200).json({ googleId: sub, name, email, avatar: picture });
    } catch (error) {
        console.error('Error verifying Google token', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/signup', async (req, res) => {
    const { role, firstName, lastName, email, password, googleId, avatar } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            email,
            name: `${firstName} ${lastName}`,
            role,
            firstName,
            lastName,
            password: hashedPassword,
            googleId,
            avatar,
        });

        await user.save();

        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
