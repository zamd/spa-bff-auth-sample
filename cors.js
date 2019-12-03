const cors = require('cors');

const corsPolicy = cors({
    origin: process.env.SPA_DOMAIN,
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ['x-xsrf-token']
});

function configureApp(app) {
    app.use(corsPolicy);
}

module.exports = configureApp;
