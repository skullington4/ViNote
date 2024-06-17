// routes/api/auth.js

const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const bcrypt = require('bcrypt');
const passport = require('passport');
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

        let user = await User.findOne({ googleId: sub });

        if (!user) {
            user = new User({
                googleId: sub,
                name,
                email,
                avatar: picture,
            });

            await user.save();
        }

        req.logIn(user, (err) => {
            if (err) {
                console.error('Error logging in user', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            console.log('User logged in:', user);
            res.status(200).json(user);
        });
    } catch (error) {
        console.error('Error verifying Google token', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
