'use strict';

var purchaseRoutes = require('./purchaseRoutes');
var eventRoutes = require('./eventRoutes');

module.exports = function(app) {
  purchaseRoutes(app);
  eventRoutes(app);
};
