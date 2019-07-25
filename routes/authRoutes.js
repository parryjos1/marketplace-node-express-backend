// const express = require('express');
// const controller = require('./controllers/usersController');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const jwtSecret = process.env.JWTSECRET;
// const jwtSecret = '~#~~#~#~#~#~#~#~#~#~';
module.exports = function(app, passport) {
  // const router = express.Router();

// find a user
// compare with bcrypt?

  // console.log({passport});

  // router.get()
  app.post('/login', passport.authenticate('local'), function(req, res){
    // this is only reached if authentication is successful
    const token = jwt.sign({ id: req.user._id }, jwtSecret);
    res.json({
      status: 'success',
      token,
      email: req.user.email,
      name: req.user.name
    });

  });

  // return router;
};
