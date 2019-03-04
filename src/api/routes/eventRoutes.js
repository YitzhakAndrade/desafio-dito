'use strict';
module.exports = function(app) {
  var event = require('../controllers/eventController');

  app
    .route('/api/events')
    .get(event.list_all_events)
    .post(event.create_an_event);

  app.route('/api/events/search').get(event.search_event_autocomplete);

  app.route('/api/events/all').delete(event.delete_all);
};
