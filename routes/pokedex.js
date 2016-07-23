'use strict';

const express = require('express');
const router = express.Router();
const { client, index, type } = require('../data/esClient');

function getHitSource(res){
  return res.hits.hits.map(r=>r._source);
}

router.get('/', ( req, res ) => client.search({ index, type, match_all : {} })
    .then(getHitSource)
    .then(res.json.bind(res))
);

module.exports = router;
