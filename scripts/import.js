'use strict';


const { client, index, type } = require('../data/esClient');
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
