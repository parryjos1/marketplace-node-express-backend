

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

  }, // end of productsIndex

  productsSellUser(req, res) {
    res.json({status: 'success', user: req.user});
  }, // end of productsIndex

  productsnewSell(req, res) {

    req.db.collection('products').insert({
      name: req.body.name,
      keywords: req.body.keywords,
      price: req.body.price,
      sellerID: req.body.seller,
      sellerName: req.body.sellerName,
      image: req.body.image
    })
    // console.log(req.body.seller);
    // console.log(req.body.keywords);
    // console.log(req.body.name);
    res.send('yo we here!')
    // res.json({status: 'success', user: req.user});
    console.log(req.body);
  }, // end of productsIndex

  productShow(req, res) {

    // console.log(req.params.id);
    //
    // req.db.collection('products').findOne( {_id: req.params.id } )
    // res.json( res )

    // _id: ObjectId("5d3a524a499c2c053cfaf74c")


    var mongo = require('mongodb');
    var o_id = new mongo.ObjectID(req.params.id);
    // collection.update({'_id': o_id});

        // req.db.collection('products').find( { _id: ObjectId("5d3a524a499c2c053cfaf74c") } ).toArray(

    req.db.collection('products').find( { _id: o_id } ).toArray( (err, results) => {
      if( err ){
        res.json( { error: err });
      } else {
        console.log(res.body);
        res.json( results );
      }
    });

    // .toArray( (err, results) => {
    //   if( err ){
    //     res.json( { error: err });
    //   } else {
    //     console.log(res.body);
    //     res.json( results );
    //   }
    // });
    //
    // res.send(
    //   'received! '
    // )
  }, // end of productShow


  productAdd(req, res) {
    // console.log('were in captain');
    // console.log(req.body);
    // console.log(req.body.image);
    //
    // // Terminal: db.projectOne.update({_id: ObjectId("5d2833616a800c11e5e5a52c")}, {a:1})
    //
    // // db.products.updateOne({_id: ObjectId("5d3a524a499c2c053cfaf74c")}, {$set: {"newField":"Jakarta"}})
    //
    //
    // req.db.collection('products').updateOne({_id: ObjectId(req.)}, {$set: {"newField":"Jakarta"}})
    //
    //
    // res.send('affirmative from the backend')

  }, // end of productsIndex





};
