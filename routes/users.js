const express = require('express');
const router = express.Router();

router.post('/me', function(req, res, next) {
  res.json(req.user);
});

module.exports = router;
