
//Link the controller


//Link the controller
const controller = require('../controllers/usersController');

module.exports = (app, passport) => {

  app.route('/users')
  // app.route('/users')
      .get( passport.authenticate('jwt', { session: false }), controller.usersIndex )
      .post(controller.usersCreate)

  app.route('/cart')
       .get( passport.authenticate('jwt', { session: false }), controller.usersCart )

  app.route('/cartadd')
       .post( passport.authenticate('jwt', { session: false }), controller.usersCartAdd )

};
