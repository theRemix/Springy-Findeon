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
const ds = require('../data/pokedex');

client.ping() // wait for connection
  .then(() => client.indices.create({ index, type }))
  .then(() => {
    ds.map(i => ({
      index,
      type,
      id : parseInt(i.id),
      body : i
    }))
    .forEach(doc => client.create(doc)
      .then(console.log)
    );
  });
