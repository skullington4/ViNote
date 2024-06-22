module.exports.ensureAuth = function(req, res, next) {
    console.log('Checking authentication...');
    console.log('Session ID:', req.sessionID);
    console.log('Session:', req.session);
    console.log('User:', req.user);
    if (req.isAuthenticated()) {
        console.log('User is authenticated');
        return next();
    } else {
        console.log('User is not authenticated');
        res.status(401).json({ message: 'You need to log in to access this resource' });
    }
};
