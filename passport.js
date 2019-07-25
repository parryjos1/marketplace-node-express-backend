// Here we are putting in our passport configuration

const localStrategy = require('passport-local').Strategy;
const

module.exports = function (passport) {

  // To add the user into our session
  passport.serializeUser( function( user, done ) {
    // When there is no error we can pass null
    done(null, user)

  })

  // Remove the user from the session
  passport.deserializeUser( function( user, done ) {
    done(null, user)
  })

  // done is the verfied callback
  passport.use(new localStrategy( function(username, password, done){
    // console.log(username, password);
    // from 26 minutes
    // find the user
    // compare the password bcrypt
    // if they are both valid

  }))


}
