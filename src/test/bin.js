'use strict';

import path from 'path';
import should from 'should'; // eslint-disable-line no-unused-vars
import {printSchema} from 'graphql/utilities';
import memFs from 'mem-fs';
import editor from 'mem-fs-editor';

import schema from './schemas/schema';
import buildGraphql from './../bin/core/buildGraphql';

const result = printSchema(schema);
const build = command => buildGraphql(command.split(' '))
  .then(() => {
    const store = memFs.create();
    const fs = editor.create(store);
    const data = fs.read(path.resolve(__dirname, './../../schema.graphql'));

    fs.delete(path.resolve(__dirname, './../../schema.graphql'));
    fs.commit(() => {});
    return data;
  });

describe('bin', () => {
  describe('# build schema', () => {
    it('## --schema', () => build(
      'node buildGraphql.js --schema ./lib/test/schemas/schema.js'
    ).should.be.eventually.equal(result));

    it('## -s', () => build(
      'node buildGraphql.js -s ./lib/test/schemas/schema.js'
    ).should.be.eventually.equal(result));
  });

  describe('# custom file path', () => {
    it('## --path', () => build(
      'node buildGraphql.js -s ./lib/test/schemas/schema.js --path ./'
    ).should.be.eventually.equal(result));

    it('## -p', () => build(
      'node buildGraphql.js -s ./lib/test/schemas/schema.js -p ./'
    ).should.be.eventually.equal(result));
  });

  describe('# custom file name', () => {
    it('## --name', () => build(
      'node buildGraphql.js -s ./lib/test/schemas/schema.js --name schema'
    ).should.be.eventually.equal(result));

    it('## -n', () => build(
      'node buildGraphql.js -s ./lib/test/schemas/schema.js -n schema'
    ).should.be.eventually.equal(result));
  });

  it('# no argument', () => build(
    'node buildGraphql.js'
  ).should.be.rejected());

  it('# unknown command', () => build(
    'node buildGraphql.js -a'
  ).should.be.rejected());

  it('# not set value', () => build(
    'node buildGraphql.js -s'
  ).should.be.rejected());
});
