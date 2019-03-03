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

exports.search_event_autocomplete = function(req, res) {
  var searchText = req.query.text;
  if (!searchText || searchText.length < 2)
    return res.status(400).send('Termo da busca deve ter no mínimo 2 caracteres.');
  Event.find({ event: new RegExp('^' + searchText, 'i') })
    .distinct('event')
    .exec(function(err, events) {
      if (err) res.send(err);
      res.json(events);
    });
};
