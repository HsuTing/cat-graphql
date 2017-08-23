'use strict';

import cp from 'child_process';
import path from 'path';
import should from 'should'; // eslint-disable-line no-unused-vars
import {printSchema} from 'graphql/utilities';
import memFs from 'mem-fs';
import editor from 'mem-fs-editor';

import schema from './schemas/schema';

const store = memFs.create();
const fs = editor.create(store);

const build = command => new Promise((resolve, reject) => {
  cp.exec(command, err => {
    if(err)
      return reject(err);

    resolve(
      fs.read(path.resolve(__dirname, './../../schema.graphql'))
    );
  });
});

describe('bin', () => {
  describe('# build schema', () => {
    it('## --schema', () => build(
      'node ./lib/bin/buildGraphql.js --schema ./lib/test/schemas/schema.js'
    ).should.be.eventually.equal(
      printSchema(schema))
    );

    it('## -s', () => build(
      'node ./lib/bin/buildGraphql.js -s ./lib/test/schemas/schema.js'
    ).should.be.eventually.equal(
      printSchema(schema))
    );
  });

  describe('# custom file path', () => {
    it('## --path', () => build(
      'node ./lib/bin/buildGraphql.js --schema ./lib/test/schemas/schema.js --path ./'
    ).should.be.eventually.equal(
      printSchema(schema))
    );

    it('## -p', () => build(
      'node ./lib/bin/buildGraphql.js --schema ./lib/test/schemas/schema.js -p ./'
    ).should.be.eventually.equal(
      printSchema(schema))
    );
  });

  describe('# custom file name', () => {
    it('## --name', () => build(
      'node ./lib/bin/buildGraphql.js --schema ./lib/test/schemas/schema.js --name schema'
    ).should.be.eventually.equal(
      printSchema(schema))
    );

    it('## -n', () => build(
      'node ./lib/bin/buildGraphql.js --schema ./lib/test/schemas/schema.js -n schema'
    ).should.be.eventually.equal(
      printSchema(schema))
    );
  });

  it('# unknown command', () => build(
    'node ./lib/bin/buildGraphql.js -a'
  ).should.be.rejected())

  it('# not set value', () => build(
    'node ./lib/bin/buildGraphql.js -s'
  ).should.be.rejected())
});
