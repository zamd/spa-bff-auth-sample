
require('dotenv').config()

const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const csrf = require('csurf');


const setupPassport = require('./passport');
const setupCors = require('./cors');
const csrfProtection = csrf();

const users = require('./routes/users');
const { saveState, switchToSpa } = require('./middlewares');

var app = express();
app.use(session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));

setupPassport(app);
setupCors(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', passport.authenticate('sessionAuth'), users);
app.use('/callback', passport.authenticate("auth0"), csrfProtection, switchToSpa);
app.use('/login', saveState, passport.authenticate("auth0"));

module.exports = app;
