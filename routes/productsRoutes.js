
//Link the controller
const controller = require('../controllers/productsController');

const jwt = require('jsonwebtoken');
require('dotenv').config()
const jwtSecret = process.env.JWTSECRET;

module.exports = (app, passport) => {

  app.route('/products')
      // .get(controller.productsIndex)
      .post(controller.productsIndex)

  app.route('/products/identifyseller')
      // .get(controller.productsIndex)
      .get( passport.authenticate('jwt', { session: false }), controller.productsSellUser)

  app.route('/products/newsell')
      // .get(controller.productsIndex)
      .post( passport.authenticate('jwt', { session: false }), controller.productsnewSell)

  app.route('/product/:id')
      // .get(controller.productsIndex)
      .get( passport.authenticate('jwt', { session: false }), controller.productShow)

  app.route('/product/add')
      // .get(controller.productsIndex)
      .post( passport.authenticate('jwt', { session: false }), controller.productAdd)
};
