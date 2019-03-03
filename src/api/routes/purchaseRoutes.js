'use strict';

module.exports = function(app) {
  var purchase = require('../controllers/purchaseController');
  app.route('/purchases').get(purchase.get_all_purchases);
};
