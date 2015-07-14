let mocha   = require('mocha');
let expect  = require('chai').expect;
let genome  = require('../lib/genome');

describe('miscellaneous', function () {
  describe('.isGenerator', function () {
    it('should return true for generators', function () {
      expect(genome.isGenerator(function *() {})).to.be.true;
    });
    it('should return false for non-generators', function () {
      expect(genome.isGenerator(function () {})).to.be.false;
      expect(genome.isGenerator(null)).to.be.false;
    });
  })
});
