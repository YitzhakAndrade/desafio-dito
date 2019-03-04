'use strict';

module.exports = function(app) {
  var purchase = require('../controllers/purchaseController');
  app.route('/api/purchases').get(purchase.get_all_purchases);
};
