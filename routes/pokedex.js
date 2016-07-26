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

router.get('/search/:query', ( req, res ) => client.search({
    index,
    type,
    size,
    body : {
      query : {
        wildcard : {
          name: `*${req.params.query}*`
        }
      }
    }
  })
  .then(getHitSource)
  .then(res.json.bind(res))
);

router.get('/startswith/:prefix', ( req, res ) => client.search({
    index,
    type,
    size,
    body : {
      query : {
        wildcard : {
          name: `${req.params.prefix}*`
        }
      }
    }
  })
  .then(getHitSource)
  .then(res.json.bind(res))
);

router.get('/types/or/*', ( req, res ) => client.search({
    index,
    type,
    size,
      body : {
        query : {
          terms : { types : req.params[0].split('/') }
        }
      }
  })
  .then(getHitSource)
  .then(res.json.bind(res))
);

router.get('/types/and/*', ( req, res ) => client.search({
    index,
    type,
    size,
      body : {
        query : {
          bool : {
            must : req.params[0].split('/').map(p => ({ term : { types : p } }))
          }
        }
      }
  })
  .then(getHitSource)
  .then(res.json.bind(res))
);

router.get('/:stat/is/:value', ( req, res ) => client.search({
    index,
    type,
    size,
    body : {
      query : {
        term : {
          [ `${req.params.stat}` ] : req.params.value
        }
      }
    }
  })
  .then(getHitSource)
  .then(res.json.bind(res))
);

router.get('/:stat/above/:value', ( req, res ) => client.search({
    index,
    type,
    size,
    body : {
      query : {
        range : {
          [ `${req.params.stat}` ] : {
            gte : req.params.value
          }
        }
      }
    }
  })
  .then(getHitSource)
  .then(res.json.bind(res))
);

router.get('/:stat/below/:value', ( req, res ) => client.search({
    index,
    type,
    size,
    body : {
      query : {
        range : {
          [ `${req.params.stat}` ] : {
            lt : req.params.value
          }
        }
      }
    }
  })
  .then(getHitSource)
  .then(res.json.bind(res))
);

module.exports = router;
