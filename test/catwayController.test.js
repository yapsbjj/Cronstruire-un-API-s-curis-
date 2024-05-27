const catwayController = require('../controllers/catwayController');
const mongoose = require('mongoose');
const Catway = require('../models/catwayModel');

describe('Test de catwayController', () => {
  let chai, expect;

  before(async () => {
    chai = await import('chai');
    expect = chai.expect;
  });

  describe('createCatway()', () => {
    it('should create a new catway', async () => {
      const req = { body: { catwayNumber: 1, type: 'long', catwayState: 'active' } };
      const res = {
        status: (code) => {
          expect(code).to.equal(201);
          return { send: (message) => { } };
        }
      };
      await catwayController.createCatway(req, res);
    });
  });

  describe('getCatways()', () => {
    it('should get all catways', async () => {
      const req = {};
      const res = {
        send: (message) => {
          expect(message).to.be.a('string');
        },
        status: (code) => {
          expect(code).to.equal(500);
          return { send: (message) => { } };
        }
      };
      await catwayController.getCatways(req, res);
    });
  });
});
