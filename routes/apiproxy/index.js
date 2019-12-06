const express = require('express');
const passport = require('passport');
const httpProxy = require('http-proxy');
const router = express.Router();
const csrf = require('csurf');

const proxy = httpProxy.createProxyServer({
    target: "http://localhost:5005/api"
});

proxy.on('proxyReq', (proxyReq, req, res)=>{
    const tokens = req.session.a0Tokens;
    if (tokens)
        proxyReq.setHeader('Authorization', `Bearer ${tokens.accessToken}`);
});

const proxyCall = (req,res) => proxy.web(req,res);
const csrfCheck = csrf();
const ensureLoggedIn = passport.authenticate("sessionAuth");


router.get('*', ensureLoggedIn, proxyCall);
router.all('*', ensureLoggedIn, csrfCheck, proxyCall);

module.exports = router; 






