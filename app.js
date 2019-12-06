
require('dotenv').config()

const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const csrf = require('csurf');

const setupPassport = require('./passport');
const setupCors = require('./cors');
const csrfProtection = csrf();

const users = require('./routes/users');
const apiProxy = require('./routes/apiproxy');

const { saveState, switchToSpa} = require('./middlewares');

var app = express();
app.use(session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
setupPassport(app);
setupCors(app);

app.use(logger('dev'));
app.use(cookieParser());


app.use('/api',apiProxy);

// BFF Login
app.use('/users', passport.authenticate('sessionAuth'), users);
app.use('/callback', passport.authenticate("auth0"), csrfProtection, switchToSpa);
app.use('/login', saveState, passport.authenticate("auth0",{audience: process.env.AUDIENCE}));

module.exports = app;