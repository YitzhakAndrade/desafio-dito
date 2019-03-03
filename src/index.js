'use strict';

/*
  Variáveis de ambiente
*/
var { port } = require('./config');

/*
  Dependencias da api
*/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

/*
  Conexão com mongodb e configuração de models
*/
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/desafio-dito', { useNewUrlParser: true });
require('./api/models');

/*
  Configuração da api
*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
  Rotas
*/
var purchaseRoutes = require('./api/routes/purchaseRoutes');
var eventRoutes = require('./api/routes/eventRoutes');
purchaseRoutes(app);
eventRoutes(app);

app.listen(port);
console.log('Server started on port ' + port);
