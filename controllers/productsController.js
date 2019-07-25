

module.exports = {

  productsIndex(req, res) {
    console.log('hello from the products index');
    console.log(req.body);

    let search = req.body.headers.searchText
    console.log(`Search Terms is: ${search}`);

    // req.db.collection('products').find().toArray( (err, results) => {
    req.db.collection('products').find( { keywords: { $in: [`${search}`] } } ).toArray( (err, results) => {
      if( err ){
        res.json( { error: err });
      } else {
        console.log(res.body);
        res.json( results );
      }
    });

  } // end of productsIndex

};
