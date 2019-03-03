'use strict';
module.exports = function(app) {
  var event = require('../controllers/eventController');

  app
    .route('/events')
    .get(event.list_all_events)
    .post(event.create_an_event);
};