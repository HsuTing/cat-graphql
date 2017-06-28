'use strict';

const should = require('should');
const {graphql} = require('graphql');
const {introspectionQuery} = require('graphql/utilities');

describe('bin', () => {
  it('# build schema', () => {
    const schema = require('./../lib/test/schema').default;
    const data = require('./../data/schema.json');

    graphql(schema, introspectionQuery).then(result => {
      (JSON.stringify(result)).should.equal(JSON.stringify(data));
    });
  });
});
