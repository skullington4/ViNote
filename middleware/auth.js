// middleware/auth.js

module.exports.ensureAuth = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).json({ message: 'You need to log in to access this resource' });
    }
};
