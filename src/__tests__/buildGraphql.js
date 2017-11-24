'use strict';

import path from 'path';
import process from 'process';
import {printSchema} from 'graphql/utilities';

import schema from './schemas/schema';
import buildGraphql from './../bin/core/buildGraphql';

const result = {
  filePath: path.resolve(process.cwd(), './schema.graphql'),
  schema: printSchema(schema)
};

describe('buildGraphql', () => {
  it('# build schema', () => expect(buildGraphql([
    './lib/__tests__/schemas/schema.js'
  ])).toMatchObject(result));

  it('# custom file path', () => expect(buildGraphql([
    './lib/__tests__/schemas/schema.js',
    '--path',
    './'
  ])).toMatchObject(result));

  it('# custom file name', () => expect(buildGraphql([
    './lib/__tests__/schemas/schema.js',
    '--name',
    'schema'
  ])).toMatchObject(result));

  it('# no argument', () => expect(() => {
    buildGraphql([]);
  }).toThrow(`Cannot find module '${path.resolve(process.cwd(), './schema')}' from 'buildGraphql.js'`));

  it('# unknown command', () => expect(() => {
    try {
      buildGraphql(['-a']);
    } catch(e) {
      throw new Error(e);
    }
  }).toThrow('UNKNOWN_OPTION: Unknown option: -a'));
});
