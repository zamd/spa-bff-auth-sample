const express = require('express');
const router = express.Router();

const csrf = require('csurf');
const csrfProtection = csrf();

//TODO: Ensure CSRF protection on all mutating endpoints. 
router.post('/me', csrfProtection, function(req, res, next) {
  res.json(req.user);
});

module.exports = router;
