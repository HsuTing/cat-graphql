'use strict';

const path = require('path');
const should = require('should');
const {graphql} = require('graphql');
const {printSchema} = require('graphql/utilities');
const memFs = require('mem-fs');
const editor = require('mem-fs-editor');

const store = memFs.create();
const fs = editor.create(store);

describe('bin', () => {
  it('# build schema', () => {
    const schema = require('./../lib/test/schema').default;
    const data = fs.read(path.resolve(__dirname, './../schema.graphql'));

    printSchema(schema).should.equal(data);
  });
});
