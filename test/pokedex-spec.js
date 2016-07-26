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

  describe('GET /api/pokedex/search/:query', () => {

    describe(':query => "sy"', () => {
      let response;
      const results = [
        {
          "id": 54,
          "name": "psyduck",
          "totalStats": 320,
          "HP": 50,
          "attack": 52,
          "defense": 48,
          "spAtk": 65,
          "spDef": 50,
          "speed": 55,
          "types": [
              "water"
          ]
        },
        {
          "id": 700,
          "name": "sylveon",
          "totalStats": 525,
          "HP": 95,
          "attack": 65,
          "defense": 65,
          "spAtk": 110,
          "spDef": 130,
          "speed": 60,
          "types": [
              "fairy"
          ]
        }
      ];

      before((setup) => {
        response = null;
        agent.get('/api/pokedex/search/sy')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(res => response = res)
          .end(setup);
      });

      it('should be an array', () => response.body.should.be.an.instanceof(Array) );

      it('should return 2 results, psyduck and sylveon', () => response.body.should.deep.equal(results) );
    });

    describe(':query => "py"', () => {
      let response;
      const results = [
        {
          "id": 668,
          "name": "pyroar",
          "totalStats": 507,
          "HP": 86,
          "attack": 68,
          "defense": 72,
          "spAtk": 109,
          "spDef": 66,
          "speed": 106,
          "types": [
            "fire",
            "normal"
          ]
        },
        {
          "id": 231,
          "name": "phanpy",
          "totalStats": 330,
          "HP": 90,
          "attack": 60,
          "defense": 60,
          "spAtk": 40,
          "spDef": 40,
          "speed": 40,
          "types": [
            "ground"
          ]
        }
      ];

      before((setup) => {
        response = null;
        agent.get('/api/pokedex/search/py')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(res => response = res)
          .end(setup);
      });

      it('should be an array', () => response.body.should.be.an.instanceof(Array) );

      it('should return 2 results, pyroar and phanpy', () => response.body.should.deep.equal(results) );
    });
  });

  describe('GET /api/pokedex/startsWith/:prefix', () => {

    describe(':prefix => "star"', () => {
      let response;
      const results = [
        {
          "id": 120,
          "name": "staryu",
          "totalStats": 340,
          "HP": 30,
          "attack": 45,
          "defense": 55,
          "spAtk": 70,
          "spDef": 55,
          "speed": 85,
          "types": [
            "water"
          ]
        },
        {
          "id": 397,
          "name": "staravia",
          "totalStats": 340,
          "HP": 55,
          "attack": 75,
          "defense": 50,
          "spAtk": 40,
          "spDef": 40,
          "speed": 80,
          "types": [
            "flying",
            "normal"
          ]
        },
        {
          "id": 396,
          "name": "starly",
          "totalStats": 245,
          "HP": 40,
          "attack": 55,
          "defense": 30,
          "spAtk": 30,
          "spDef": 30,
          "speed": 60,
          "types": [
            "flying",
            "normal"
          ]
        },
        {
          "id": 398,
          "name": "staraptor",
          "totalStats": 485,
          "HP": 85,
          "attack": 120,
          "defense": 70,
          "spAtk": 50,
          "spDef": 60,
          "speed": 100,
          "types": [
            "flying",
            "normal"
          ]
        },
        {
          "id": 121,
          "name": "starmie",
          "totalStats": 520,
          "HP": 60,
          "attack": 75,
          "defense": 85,
          "spAtk": 100,
          "spDef": 85,
          "speed": 115,
          "types": [
            "psychic",
            "water"
          ]
        }
      ];

      before((setup) => {
        response = null;
        agent.get('/api/pokedex/startsWith/star')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(res => response = res)
          .end(setup);
      });

      it('should be an array', () => response.body.should.be.an.instanceof(Array) );

      it('should return 5 results, staryu, staravia, starly and staraptor', () => response.body.should.deep.equal(results) );
    });

    describe(':prefix => "bli"', () => {
      let response;
      const results = [
        {
          "id": 522,
          "name": "blitzle",
          "totalStats": 295,
          "HP": 45,
          "attack": 60,
          "defense": 32,
          "spAtk": 50,
          "spDef": 32,
          "speed": 76,
          "types": [
            "electric"
          ]
        },
        {
          "id": 242,
          "name": "blissey",
          "totalStats": 540,
          "HP": 255,
          "attack": 10,
          "defense": 10,
          "spAtk": 75,
          "spDef": 135,
          "speed": 55,
          "types": [
            "normal"
          ]
        }
      ];

      before((setup) => {
        response = null;
        agent.get('/api/pokedex/startsWith/bli')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(res => response = res)
          .end(setup);
      });

      it('should be an array', () => response.body.should.be.an.instanceof(Array) );

      it('should return 2 results, blitzle and blissey', () => response.body.should.deep.equal(results) );
    });
  });

  describe('GET /api/pokedex/types/or/*', () => {

    describe('types/or/fire', () => {
      let response;
      before((setup) => {
        response = null;
        agent.get('/api/pokedex/types/or/fire')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(res => response = res)
          .end(setup);
      });

      it('should be an array', () => response.body.should.be.an.instanceof(Array) );

      it('should return 57 results', () => response.body.length.should.equal(57) );

      it('should only contain results of fire type pokemon', () =>
        response.body.every(p => p.types.indexOf('fire') >= 0)
      );

    });

  });


});
