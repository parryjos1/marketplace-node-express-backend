
//Link the controller
const controller = require('../controllers/usersController');

module.exports = (app) => {

  app.route('/users')
      .get(controller.usersIndex)
      .post(controller.usersCreate)

};
