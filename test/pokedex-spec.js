'use strict';

const request = require('supertest');
const chai = require('chai');
chai.should();

const app = require('../server');
const agent = request.agent(app);

describe('Pokedex API', () => {

  describe('GET /api/pokedex', () => {

    let response;

    before((setup) => {
      response = null;
      agent.get('/api/pokedex')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => response = res)
        .end(setup);
    });

    it('should be an array', () => response.body.should.be.an.instanceof(Array) );

    it('should contain all 721 pokemen', () => response.body.should.have.lengthOf(721) );

    it('each pokemon result should have an id property', () =>
      response.body.every(p => p.hasOwnProperty('id')).should.be.true
    );

    it('each pokemon result should have a name property', () =>
      response.body.every(p => p.hasOwnProperty('name')).should.be.true
    );

    it('each pokemon result should have a totalStats property', () =>
      response.body.every(p => p.hasOwnProperty('totalStats')).should.be.true
    );

    it('each pokemon result should have an HP property', () =>
      response.body.every(p => p.hasOwnProperty('HP')).should.be.true
    );

    it('each pokemon result should have an attack property', () =>
      response.body.every(p => p.hasOwnProperty('attack')).should.be.true
    );

    it('each pokemon result should have a defense property', () =>
      response.body.every(p => p.hasOwnProperty('defense')).should.be.true
    );

    it('each pokemon result should have an spAtk property', () =>
      response.body.every(p => p.hasOwnProperty('spAtk')).should.be.true
    );

    it('each pokemon result should have an spDef property', () =>
      response.body.every(p => p.hasOwnProperty('spDef')).should.be.true
    );

    it('each pokemon result should have a speed property', () =>
      response.body.every(p => p.hasOwnProperty('speed')).should.be.true
    );

    it('each pokemon result should have a types property', () =>
      response.body.every(p => p.hasOwnProperty('types')).should.be.true
    );

    it('each pokemon types property should be an array of strings', () =>
      response.body.every(p => p.types.every(t => typeof t === 'string') ).should.be.true
    );

  });

  describe('GET /api/pokedex/1', () => {

    let response;
    const bulbasaur = {
      id:1,
      name:"bulbasaur",
      totalStats:318,
      HP:45,
      attack:49,
      defense:49,
      spAtk:65,
      spDef:65,
      speed:45,
      types:["grass","poison"]
    };

    before((setup) => {
      response = null;
      agent.get('/api/pokedex/1')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => response = res)
        .end(setup);
    });

    it('should be a json object', () => response.body.should.not.be.an.instanceof(Array) );

    it('should return bulbasaur', () => response.body.should.deep.equal(bulbasaur) );
  });

});
