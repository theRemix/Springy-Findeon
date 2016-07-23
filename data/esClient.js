'use strict';

const es = require('elasticsearch');
const esConf = {
  host : process.env.ES_HOST || 'localhost',
  port : process.env.ES_PORT || 9200
};
const client = new es.Client({
  host : `${esConf.host}:${esConf.port}`,
  log : 'trace'
});

const index = 'pokedex';
const type = 'pokemon';

module.exports = {
  client,
  index,
  type
};
