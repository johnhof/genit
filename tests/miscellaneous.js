'use strict'

let mocha  = require('mocha');
let expect = require('chai').expect;
let genome = require('../lib/genome');
let _      = require('lodash');

describe('miscellaneous', function () {
  describe('.isGenerator', function () {
    it('should return true for generators', function () {
      expect(genome.isGenerator(function *() {})).to.be.true;
    });
    it('should return false for non-generators', function () {
      expect(genome.isGenerator(function () {})).to.be.false;
      expect(genome.isGenerator(null)).to.be.false;
    });
  });

  describe('.inject', function () {
    let genomeKeys = Object.keys(genome);
    let genLength  = genomeKeys.length;
    let baseKeys   = Object.keys(_);
    let baseLength = baseKeys.length;
    genome.inject(_);
    let newLength    = Object.keys(_).length;
    let nestLength   = Object.keys(_.genome || {}).length;
    let newPropcount = newLength + nestLength;

    it('should inject ' + genLength + ' new properties into lodash', function () {
      expect(newPropcount).to.be.equal(genLength + baseLength + 1);
    });
    it('should add unclaimed properties to target object', function () {
      _.each(genomeKeys, function (key) {
        expect(_[key]).not.to.be.undefined;
      });
    });

    it('should apply claimed properties to the .genome property', function () {
      _.each(genomeKeys, function (key) {
        _.each(baseKeys, function (baseKey) {
          if (baseKey === key) {
            expect(_.genome[key]).not.to.be.undefined;
          }
        })
      });
    });
  });
});
