'use strict';

var { port } = require('./config');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var purchaseRoutes = require('./api/routes/purchaseRoutes');
purchaseRoutes(app);

app.use(function(req, res) {
  res.status(404).send();
});

app.listen(port);

console.log('Server started on port ' + port);
