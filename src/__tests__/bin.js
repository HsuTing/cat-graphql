'use strict';

import path from 'path';
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
    it('## --schema', () => expect(build(
      'node buildGraphql.js --schema ./lib/__tests__/schemas/schema.js'
    )).resolves.toBe(result));

    it('## -s', () => expect(build(
      'node buildGraphql.js -s ./lib/__tests__/schemas/schema.js'
    )).resolves.toBe(result));
  });

  describe('# custom file path', () => {
    it('## --path', () => expect(build(
      'node buildGraphql.js -s ./lib/__tests__/schemas/schema.js --path ./'
    )).resolves.toBe(result));

    it('## -p', () => expect(build(
      'node buildGraphql.js -s ./lib/__tests__/schemas/schema.js -p ./'
    )).resolves.toBe(result));
  });

  describe('# custom file name', () => {
    it('## --name', () => expect(build(
      'node buildGraphql.js -s ./lib/__tests__/schemas/schema.js --name schema'
    )).resolves.toBe(result));

    it('## -n', () => expect(build(
      'node buildGraphql.js -s ./lib/__tests__/schemas/schema.js -n schema'
    )).resolves.toBe(result));
  });

  it('# no argument', () => expect(build(
    'node buildGraphql.js'
  )).rejects.toBeDefined());

  it('# unknown command', () => expect(build(
    'node buildGraphql.js -a'
  )).rejects.toBeDefined());

  it('# not set value', () => expect(build(
    'node buildGraphql.js -s'
  )).rejects.toBeDefined());
});
