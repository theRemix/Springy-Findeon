'use strict';

const es = require('elasticsearch');
const esConf = {
  host : process.env.ES_HOST || 'localhost',
  port : process.env.ES_PORT || 9200
};
const client = new es.Client({
  host : `${esConf.host}:${esConf.port}`,
  log : 'error'
});

const index = 'pokedex';
const type = 'pokemon';
const MAX_SIZE = 1000;

module.exports = {
  client,
  index,
  type,
  MAX_SIZE
};
