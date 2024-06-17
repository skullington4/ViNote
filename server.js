// server.js

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

require('dotenv').config();
require('./config/database');
require('./config/passport')(passport); // Passport configuration

const app = express();
const authRoutes = require('./routes/api/auth');
const projectRoutes = require('./routes/api/projects');

app.use(cors({
    origin: 'http://localhost:3000', // Client URL
    credentials: true // Allow credentials
}));

app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, function() {
    console.log(`Express app running on port ${port}`);
});
