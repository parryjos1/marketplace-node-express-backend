
//Link the controller
const controller = require('../controllers/productsController');

module.exports = (app) => {

  app.route('/products')
      .get(controller.productsIndex)

};
