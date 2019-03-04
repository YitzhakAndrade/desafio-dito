'use strict';

module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  mongoConnStr: process.env.MONGO_CONN_STR || 'mongodb://localhost/desafio-dito',
  ditoEventsUri: 'https://storage.googleapis.com/dito-questions/events.json'
};
