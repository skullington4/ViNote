const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
require('./config/database');
require('./config/passport')(passport);

const app = express();
const authRoutes = require('./routes/api/auth');
const projectRoutes = require('./routes/api/projects');

const sessionSecret = process.env.SESSION_SECRET || 'yourSecretKey';

app.use(logger('dev'));
app.use(express.json());

app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

const port = process.env.PORT || 3001;

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});
