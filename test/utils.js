'use strict';

const should = require('should');
const utils = require('./../lib/utils');

describe('utils', () => {
  it('# addNonNull', () => {
    const {
      GraphQLNonNull,
      GraphQLString
    } = require('graphql');

    (utils.addNonNull({
      test: {
        type: GraphQLString,
        description: 'Test'
      }
    })).should.be.eql({
      test: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Test'
      }
    });
  });
});
