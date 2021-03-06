const bcrypt = require('bcryptjs');
const saltRounds = 10;


module.exports = {

  usersCart(req, res) {
    res.json({status: 'success', user: req.user});
  },

  usersIndex(req, res) {
    // console.log('hello from the user index');
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

    // User validation
    req.db.collection('users').findOne({email: req.body.username})
    .then( user => {
      console.log(`The user that has been found is`);
      console.log(user);

      // If no user found add new user to database & encrypt password
      if (user === null) {
        bcrypt.hash(password, saltRounds, function(err, hash) {
                // Store hash in your password DB.
          req.db.collection('users').insert({name: req.body.name, email: req.body.username, password: hash})
        }); // end of bcrypt
      } else {
        console.log('there is already a user');
        res.json({message: "there is already a user"})
      }
    })
  }, // end usersCreate

  usersLogin( req, res) {
    console.log('USERS LOGIN ROUTE', req.body);
    //
    // //TODO QUESTION for luke --> what is req.db ??
    // console.log(req.body.email);
    // req.db.collection('users').findOne({email: req.body.username})
    // .then(user => {
    //   console.log(user);
    //   if(user) return res.status(200).json({message: "We found him"})
    // })
    // res.json({'all good'})

  },

  usersCartAdd(req, res) {
    console.log(req.body)

        // req.db.collection('products').updateOne({_id: ObjectId(req.)}, {$set: {"newField":"Jakarta"}})
        // req.db.collection('users').updateOne({_id: ObjectId(req.)}, {$set: {"newField":"Jakarta", "anotherField":"yelllooowww"}})

        var mongo = require('mongodb');
        var o_id = new mongo.ObjectID(req.body.seller);

        // console.log(o_id);
        //
        // db.users.updateOne({_id: ObjectId("5d39105bd7d2e896d235b8c2")}, {$set: {"cart": {"price": "110"}}})
        //
        // req.db.collection('users').updateOne( { _id: o_id }, {$set: {"cart": {"price": "110"}}})  )

        // db.users.updateOne({_id: ObjectId("5d39105bd7d2e896d235b8c2")}, {$set: {"shop": ['item']}})
        //
        // db.users.updateOne({_id: ObjectId("5d39105bd7d2e896d235b8c2")}, {$push: { "baker": "red"}})

        req.db.collection('users').updateOne({ _id: o_id }, {$push: { "cart": req.body.productID}})
    res.send('hello from the user tab')
  },

};
