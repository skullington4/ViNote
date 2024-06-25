const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../../models/user');
const { ensureAuth } = require('../../middleware/auth');
require('dotenv').config();

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            googleId: user.googleId,
            avatar: user.avatar
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

// Google OAuth route
router.post('/google', async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        });

        const { sub, name, email, picture } = ticket.getPayload();
        console.log('Google user info:', { sub, name, email, picture });

        // Split the name into firstName and lastName
        const [firstName, ...lastNameArray] = name.split(' ');
        const lastName = lastNameArray.join(' ');

        let user = await User.findOne({ googleId: sub });

        if (!user) {
            user = new User({
                googleId: sub,
                firstName,
                lastName,
                email,
                avatar: picture,
            });

            await user.save();
        }

        req.logIn(user, (err) => {
            if (err) {
                console.error('Error logging in user:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            console.log('User logged in:', user);
            const jwtToken = generateToken(user);
            res.status(200).json({ token: jwtToken });
        });
    } catch (error) {
        console.error('Error verifying Google token:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// New User Registration Route
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            googleId: null
        });

        await user.save();

        const token = generateToken(user);
        res.status(201).json({ token });
    } catch (error) {
        console.error('Error creating user', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Existing Login Route
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            const token = generateToken(user);
            res.json({ token });
        });
    })(req, res, next);
});

// Get the logged-in user's information
router.get('/me', ensureAuth, (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user });
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

module.exports = router;
