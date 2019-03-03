'use strict';

var mongoose = require('mongoose');
var Event = mongoose.model('Events');

exports.list_all_events = function(req, res) {
  Event.find({}, function(err, event) {
    if (err) res.send(err);
    res.json(event);
  });
};

exports.create_an_event = function(req, res) {
  var newEvent = new Event(req.body);
  newEvent.save(function(err, event) {
    if (err) res.send(err);
    res.json(event);
  });
};
