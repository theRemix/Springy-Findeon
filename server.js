'use strict';

const express = require('express');
const server = express();

const pokedex = require('./routes/pokedex');

server.use('/api/pokedex', pokedex);


module.exports = server;
