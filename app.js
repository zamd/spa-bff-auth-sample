const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const Auth0Startegy = require('passport-auth0')
      passport = require('passport'),
      CustomStrategy = require('passport-custom');


const users = require('./routes/users');

passport.serializeUser( (user, done)=> done(null,user));
passport.deserializeUser( (user, done)=> done(null,user));

var app = express();
app.use(session({secret: "shhhh", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


const auth0 = new Auth0Startegy({
  domain: "fourzero.auth0.com",
  clientID: "zcaSURjejBMjujgriCtnrkgb93vhJ30x",
  clientSecret:"guVTAgmef4wWn7Ha50u6GgJgQKPN9MH9ILFi9cIYJJn8b6q8DlD8g8UNiUZzgt2H",
  callbackURL: "http://bff.myspa.com/callback",
  scope: "openid email profile offline_access",
  passReqToCallback: true

}, (req, accessToken, refreshToken, _, profile, done)=>{

  req.session.a0Tokens = {accessToken, refreshToken};
  done(null, profile);
});


function saveState(req, res, next) {
  if (req.query && req.query.state) {
    req.session['returnState'] = req.query.state;
  }
  next();
}

function switchToSpa(req, res, next) {
  //atob
  restoreState = state => new Buffer(state,"base64").toString("ascii");
  const url = restoreState(req.session.returnState);
  res.redirect(url);
}

passport.use(auth0);
passport.use("sessionAuth", new CustomStrategy(function(req,done){
  //TODO: Validate Token
  //Simulate user from session for now. 
  done(null, req.user);
}));



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', passport.authenticate('sessionAuth'), users);
app.use('/callback', passport.authenticate("auth0"), switchToSpa);
app.use('/login', saveState, passport.authenticate("auth0"));

module.exports = app;
