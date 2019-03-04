'use strict';

/*
  Variáveis de ambiente
*/
var { host, port, mongoConnStr } = require('./config');

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
mongoose.connect(mongoConnStr, { useNewUrlParser: true });
require('./api/models');

/*
  Configuração da api
*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
  Rotas
*/
var routes = require('./api/routes');
routes(app);

/*
  Executa a api
*/
app.listen(port);
console.log(`Server started on ${host}:${port}`);
