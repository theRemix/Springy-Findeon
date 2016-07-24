'use strict';

const express = require('express');
const router = express.Router();
const { client, index, type, MAX_SIZE } = require('../data/esClient');
const size = MAX_SIZE;

function getSource(doc){
  return doc._source;
}

function getHitSource(res){
  return res.hits.hits.map(getSource);
}

router.get('/', ( req, res ) => client.search({ index, type, size, match_all : {} })
    .then(getHitSource)
    .then(res.json.bind(res))
);

router.get('/:id', ( req, res ) => client.get({ index, type, id : req.params.id })
    .then(getSource)
    .then(res.json.bind(res))
);

module.exports = router;
