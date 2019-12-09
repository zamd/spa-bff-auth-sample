
require('dotenv').config()

const express = require("express");
const morgan = require("morgan");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());
app.use(morgan("dev"));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  audience: process.env.AUIDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithm: ["RS256"]
});

const items = [];


app.get("/api/cart", checkJwt, (req, res) => {
  return res.json(items)
});


app.post("/api/cart", checkJwt, (req, res) => {
  console.log(req.user);
  items.push(req.body);
  res.json({
    msg: "Item successfully added"
  });
});



process.on("SIGINT", function() {
  process.exit();
});

module.exports = app;


// const fs = require("fs");
// const path = require("path");

// const port = 5005;

// app.listen(port, () => console.log(`Server listening on port ${port}`));
