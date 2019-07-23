
//EXPRESS SERVER SETUP
const express = require('express');
const app = express();

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

const session = require('express-session');
app.use(
  session({
    secret: 'muppetmoonlanding', //pick a random string to make the hash that is generated secure
    resave: false, //required
  saveUninitialized: false //required
  })
)

const mongoExpress = require('express-mongo-db');
app.use(mongoExpress('mongodb://127.0.0.1:27017/marketplace'));

// // Set up MongoDB
// const MongoClient = require('mongodb').MongoClient;
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
const productsRoutes = require('./routes/productsRoutes');
productsRoutes(app); //pass the express app into our function which assigns routes

const usersRoutes = require('./routes/usersRoutes');
usersRoutes(app); //pass the express app into our function which assigns routes


app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
})

app.get('/', (req, res) => {
  res.send('Welcome to the Express backend')
});

app.use( (req, res, next) => {
  console.log('req.session', req.session);
  return next()
});

app.post('/user', (req, res) => {
  console.log('user signup');
  req.session.username = req.body.username;
  res.end()
})


// req.session Session {
//  cookie:
//   { path: '/',
//     _expires: null,
//     originalMaxAge: null,
//     httpOnly: true } }
