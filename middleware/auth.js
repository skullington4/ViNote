const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.ensureAuth = function(req, res, next) {
    console.log('Checking authentication...');
    console.log('Session ID:', req.sessionID);
    console.log('Session:', req.session);

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        console.log('Token is missing');
        return res.status(401).json({ message: 'Token is missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            console.log('Token verification failed', err);
            return res.status(401).json({ message: 'Token verification failed' });
        }

        try {
            const user = await User.findById(decoded.id);
            if (!user) {
                console.log('User not found');
                return res.status(401).json({ message: 'User not found' });
            }

            req.user = user;
            console.log('User is authenticated', user);
            return next();
        } catch (err) {
            console.log('Error fetching user', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
};
