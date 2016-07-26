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

    describe('types/or/fire/ice', () => {
      let response;
      before((setup) => {
        response = null;
        agent.get('/api/pokedex/types/or/fire/ice')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(res => response = res)
          .end(setup);
      });

      it('should be an array', () => response.body.should.be.an.instanceof(Array) );

      it('should return 92 results', () => response.body.length.should.equal(92) );

      it('should only contain results of fire or ice type pokemon', () =>
        response.body.every(p => p.types.indexOf('fire') >= 0 || p.types.indexOf('ice') >= 0)
      );

    });

    describe('types/or/fire/ice/fairy', () => {
      let response;
      before((setup) => {
        response = null;
        agent.get('/api/pokedex/types/or/fire/ice/fairy')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(res => response = res)
          .end(setup);
      });

      it('should be an array', () => response.body.should.be.an.instanceof(Array) );

      it('should return 127 results', () => response.body.length.should.equal(127) );

      it('should only contain results of fire or ice or fairy type pokemon', () =>
        response.body.every(p =>
          p.types.indexOf('fire') >= 0 ||
          p.types.indexOf('ice') >= 0 ||
          p.types.indexOf('ice') >= 0
        )
      );

    });

  });


  describe('GET /api/pokedex/types/and/*', () => {

    describe('types/and/fire', () => {
      let response;
      before((setup) => {
        response = null;
        agent.get('/api/pokedex/types/and/fire')
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

    describe('types/and/water/grass', () => {
      let response;
      before((setup) => {
        response = null;
        agent.get('/api/pokedex/types/and/water/grass')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(res => response = res)
          .end(setup);
      });

      it('should be an array', () => response.body.should.be.an.instanceof(Array) );

      it('should return 3 results', () => response.body.length.should.equal(3) );

      it('should only contain results of water and grass type pokemon', () =>
        response.body.every(p => p.types.indexOf('fire') >= 0 && p.types.indexOf('ice') >= 0)
      );

    });

    describe('types/and/water/grass/flying', () => {
      let response;
      before((setup) => {
        response = null;
        agent.get('/api/pokedex/types/and/water/grass/flying')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(res => response = res)
          .end(setup);
      });

      it('should be an array', () => response.body.should.be.an.instanceof(Array) );

      it('should return 0 results', () => response.body.length.should.equal(0) );

    });
  });

  describe('GET /api/pokedex/:stat/is/:value', () => {

    const results = [
      {
        "id": 143,
        "name": "snorlax",
        "totalStats": 540,
        "HP": 160,
        "attack": 110,
        "defense": 65,
        "spAtk": 65,
        "spDef": 110,
        "speed": 30,
        "types": [
          "normal"
        ]
      }
    ];

    describe(':stat => "HP", :value => "160"', () => {
      let response;
      before((setup) => {
        response = null;
        agent.get('/api/pokedex/HP/is/160')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(res => response = res)
          .end(setup);
      });

      it('should be an array', () => response.body.should.be.an.instanceof(Array) );

      it('should return 1 result, snorlax', () => response.body.should.deep.equal(results) );
    });

    describe(':stat => "name", :value => "snorlax"', () => {
      let response;
      before((setup) => {
        response = null;
        agent.get('/api/pokedex/name/is/snorlax')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(res => response = res)
          .end(setup);
      });

      it('should be an array', () => response.body.should.be.an.instanceof(Array) );

      it('should return 1 result, snorlax', () => response.body.should.deep.equal(results) );
    });

    describe(':stat => "name", :value => "snorla"', () => {
      let response;
      before((setup) => {
        response = null;
        agent.get('/api/pokedex/name/is/snorla')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(res => response = res)
          .end(setup);
      });

      it('should be an array', () => response.body.should.be.an.instanceof(Array) );

      it('should return 0 results', () => response.body.length.should.equal(0) );
    });

  });

  describe('GET /api/pokedex/:stat/above/:value', () => {

    describe(':stat => "attack", :value => "180"', () => {
      let response;
      const results = [
        {
          "id": 150,
          "name": "mewtwomegamewtwox",
          "totalStats": 780,
          "HP": 106,
          "attack": 190,
          "defense": 100,
          "spAtk": 154,
          "spDef": 100,
          "speed": 130,
          "types": [
            "fighting",
            "psychic"
          ]
        },
        {
          "id": 384,
          "name": "rayquazamegarayquaza",
          "totalStats": 780,
          "HP": 105,
          "attack": 180,
          "defense": 100,
          "spAtk": 180,
          "spDef": 100,
          "speed": 115,
          "types": [
            "dragon",
            "flying"
          ]
        }
      ];

      before((setup) => {
        response = null;
        agent.get('/api/pokedex/attack/above/180')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(res => response = res)
          .end(setup);
      });

      it('should be an array', () => response.body.should.be.an.instanceof(Array) );

      it('should return 2 results, mewtwomegamewtwox and rayquazamegarayquaza', () => response.body.should.deep.equal(results) );
    });

  });

  describe('GET /api/pokedex/:stat/below/:value', () => {

    describe(':stat => "defense", :value => "10"', () => {
      let response;
      const results = [
        {
          "id": 113,
          "name": "chansey",
          "totalStats": 450,
          "HP": 250,
          "attack": 5,
          "defense": 5,
          "spAtk": 35,
          "spDef": 105,
          "speed": 50,
          "types": [
            "normal"
          ]
        },
        {
          "id": 440,
          "name": "happiny",
          "totalStats": 220,
          "HP": 100,
          "attack": 5,
          "defense": 5,
          "spAtk": 15,
          "spDef": 65,
          "speed": 30,
          "types": [
            "normal"
          ]
        }
      ];

      before((setup) => {
        response = null;
        agent.get('/api/pokedex/defense/below/10')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(res => response = res)
          .end(setup);
      });

      it('should be an array', () => response.body.should.be.an.instanceof(Array) );

      it('should return 2 results, chansey and happiny', () => response.body.should.deep.equal(results) );
    });

  });

});
