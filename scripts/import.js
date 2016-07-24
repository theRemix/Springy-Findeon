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
      body : Object.assign(i, {
        id : parseInt(i.id),
        totalStats : parseInt(i.totalStats),
        HP : parseInt(i.HP),
        attack : parseInt(i.attack),
        defense : parseInt(i.defense),
        spAtk : parseInt(i.spAtk),
        spDef : parseInt(i.spDef),
        speed : parseInt(i.speed)
      })
    }))
    .forEach(doc => client.create(doc)
      .then(console.log)
    );
  });
