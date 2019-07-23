const bcrypt = require('bcryptjs');
const saltRounds = 10;


module.exports = {

  usersIndex(req, res) {
    console.log('hello from the user index');
    // res.send('yo we here!')
    req.db.collection('users').find().toArray( (err, results) => {
      if( err ){
        res.json( { error: err });
      } else {
        res.json( results );
      }
    });
  },

  usersCreate(req, res) {
    console.log('hello userCreate controller');
    // console.log(req.db);
    console.log(req.body);
    const password = req.body.password;


    bcrypt.hash(password, saltRounds, function(err, hash) {
      // Store hash in your password DB.
      req.db.collection('users').insert({name: req.body.name, email: req.body.username, password: hash})
    });

  }

};
