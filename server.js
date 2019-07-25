
//EXPRESS SERVER SETUP
const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');

// Set up the port
const PORT = process.env.PORT || 4000;

//Requirements
const cors = require('cors');
app.use(cors());
app.use(express.json()); // to support JSON-encoded bodies (form data)
app.use(express.urlencoded({extended: true})); // to support URL-encoded bodies (for formdata)

// Passport
const passport = require('passport');
app.use(passport.initialize())
app.use(passport.session()) // calls serializeUser and deserializeUser
// require('./passport')(passport) //this is to the passport.js

// Testing .env file
require('dotenv').config()
console.log("MY_VARIABLE: " + process.env.MY_VARIABLE);

// Passport JWT strategy
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'secret goes here';
// // opts.issuer = 'accounts.examplesoft.com';
// // opts.audience = 'yoursite.net';
// passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//     console.log('GOT TO jwt STRATEGY TEST...');
//     return done('nope', false);
//     return done(false, {id: 1});
//     // User.findOne({id: jwt_payload.sub}, function(err, user) {
//     //     if (err) {
//     //         return done(err, false);
//     //     }
//     //     if (user) {
//     //         return done(null, user);
//     //     } else {
//     //         return done(null, false);
//     //         // or you could create a new account
//     //     }
//     // });
// }));



app.get('/test', passport.authenticate('jwt'), (req, res) => {
  res.json({status: 'good'});
});

//give Passport the User's id to store
passport.serializeUser(function(user, done) {
  done(null, user.email);
});

//Fetch the user from the database given an id
passport.deserializeUser(function(email, done) {
  db.collection('users')({ email: email }, (err, user) => done(err, user));
});

const LocalStrategy = require("passport-local").Strategy;
passport.use( new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, done) => {
    console.log('IN STRATEGY', email);

       db.collection('users').findOne({ email: email}, (err, user) => {
         if (err) { console.log('err!', err); return done(err); }
           if (!user) {
             console.log('no user ERROR');
             return done(null, false, { message: 'Incorrect username or password.' });
           }

           bcrypt.compare(password, user.password, (err, success) => {

             console.log('LOGIN CHECK AUTH', {err, success}, password, user.password);

              if( success ){
                console.log('all good????');
                return done(null, user);



              } else {
                console.log('wrong password!', err);
                return done(err);
              }

           });

       });

  } // strategy callback
));


// Passport JWT Strategy for checking tokens provided via AJAX requests,
// to protect routes only available to logged-in users

const {Strategy:JwtStrategy, ExtractJwt} = require("passport-jwt");
// const JwtStrategy = passportJWT.Strategy;
// const ExtractJwt = passportJWT.ExtractJwt;

require('dotenv').config()
const jwtSecret = process.env.JWTSECRET; // TODO: extract this

//use jwtStrategy to determing if user has a valid JWT token
let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
  // issuer: 'accounts.examplesoft.com',
  // audience: 'yoursite.net',
};
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  console.log('hello from JWT STrategy');
  console.log('*******jwt_payload:', jwt_payload);
  db.collection('users').findOne({'_id': new ObjectID(jwt_payload.id)}, (err, user) => {
      if (err) {
        console.log("err from JWT strategy (MongoDB query):", err);
        return done(err, false);
      }
      if (user) {
        console.log('Success from JWT Strategy', user);
        return done(null, user);
      } else {
        console.log('not sure what this is but it failed');
        return done(null, false);
      }
  });
 }));

//
// app.post('/login',
//   passport.authenticate(
//     'local'
//   // , { failureRedirect: '/loginxx' }
//   ),
//   function(req, res) {
//     // res.redirect('/');
//     console.log('GOT HERE');
//     res.json({status: 'sucess'});
//   });

// Session
// const session = require('express-session');
// app.use(
//   session({
//     secret: 'muppetmoonlanding', //pick a random string to make the hash that is generated secure
//     resave: false, //required
//   saveUninitialized: false //required
//   })
// )

// Configuring the middlewear
app.use(passport.initialize())
app.use(passport.session())

const mongoExpress = require('express-mongo-db');
const mongoDbMiddleware = mongoExpress('mongodb://127.0.0.1:27017/marketplace')
app.use(mongoDbMiddleware);

// Grab our own copy of the req.db connection to use in this file,
// i.e. for queries in Passport authentication strategies
var fakeReq = {};
let db;
mongoDbMiddleware(fakeReq, {}, function(err){
  if(err){
    return console.log('ERROR creating MongoDB connection middleware');
  }
  console.log('this got run', fakeReq.db, err);
  db = fakeReq.db;
});

// Set up MongoDB
const { ObjectID } = require('mongodb');
// let db; // global var to store the db connection object
//
// MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true }, (err, client) => {
//   if( err ) return console.log(err);  // early return on error
//
//   const marketplace = process.env['marketplace'] || 'marketplace';
//
//   console.log( 'Using database:', marketplace );
//   db = client.db( marketplace ); // success!
// });

// require the routes
const productsRoutes = require('./routes/productsRoutes')(app);

const authRoutes = require('./routes/authRoutes')(app, passport);

const usersRoutes = require('./routes/usersRoutes')(app, passport);

// const controller = require('./controllers/usersController');
// module.exports = function(passport) {
//
//   app.route('/users')
//       .get(controller.usersIndex)
//       .post(controller.usersCreate)
//
//   app.route('/login')
//       .post(controller.usersLogin)
//
// };


app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
})

app.get('/', (req, res) => {
  res.send('Welcome to the Express backend')
});

// app.use( (req, res, next) => {
//   console.log('req.session', req.session);
//   return next()
// });

// app.post('/user', (req, res) => {
//   console.log('user signup');
//   req.session.username = req.body.username;
//   res.end()
// })


// req.session Session {
//  cookie:
//   { path: '/',
//     _expires: null,
//     originalMaxAge: null,
//     httpOnly: true } }
