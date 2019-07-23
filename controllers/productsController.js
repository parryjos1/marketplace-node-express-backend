//
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

module.exports = {

  productsIndex(req, res) {
    console.log('hello from the products index');
    // res.send('yo we here!')
    req.db.collection('products').find().toArray( (err, results) => {
      if( err ){
        res.json( { error: err });
      } else {
        res.json( results );
      }
    });
  }

};
