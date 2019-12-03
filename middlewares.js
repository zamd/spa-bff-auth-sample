
const url = require('url');


function saveState(req, res, next) {
    if (req.query && req.query.state) {
        req.session['returnState'] = req.query.state;
    }
    next();
}

function switchToSpa(req, res, next) {
    //atob
    restoreState = state => new Buffer(state, "base64").toString("ascii");
    const spaUrl = restoreState(req.session.returnState);
    res.cookie('XSRF-TOKEN', req.csrfToken(), { httpOnly: false, domain: url.parse(process.env.SPA_DOMAIN).host })
    res.redirect(spaUrl);
}


module.exports = { saveState, switchToSpa };