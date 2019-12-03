const Auth0Startegy = require('passport-auth0'),
    passport = require('passport'),
    CustomStrategy = require('passport-custom');

const auth0 = new Auth0Startegy({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: "openid email profile offline_access",
    passReqToCallback: true

}, (req, accessToken, refreshToken, _, profile, done) => {

    req.session.a0Tokens = { accessToken, refreshToken };
    done(null, profile._json);
});

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(auth0);
passport.use("sessionAuth", new CustomStrategy(function (req, done) {
    //TODO: Validate Token
    //Simulate user from session for now. 
    done(null, req.user);
}));


module.exports = function setupPassport(app) {
    app.use(passport.initialize());
    app.use(passport.session());
}
