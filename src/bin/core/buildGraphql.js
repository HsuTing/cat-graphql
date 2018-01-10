// @flow
'use strict';

import path from 'path';
import {printSchema} from 'graphql/utilities';
import commandLineArgs from 'command-line-args';

import type {GraphQLSchema} from 'graphql';

const root: string = process.cwd();

export default (
  argv: Array<string>
): {
  filePath: string,
  schema: string
} => {
  const {
    path: filePath,
    name,
    schema: schemaPath
  }: {
    path: string,
    name: string,
    schema: string
  } = commandLineArgs([{
    name: 'path',
    alias: 'p',
    type: String,
    defaultValue: './'
  }, {
    name: 'name',
    alias: 'n',
    type: String,
    defaultValue: 'schema'
  }, {
    name: 'schema',
    alias: 's',
    type: String,
    defaultValue: './schema',
    defaultOption: true
  }], {
    argv
  });

  // write schema
  const realSchemaPath: string = path.resolve(root, schemaPath);
  const realFilePath: string = path.resolve(root, filePath, `${name}.graphql`);
  const schema: GraphQLSchema = require(realSchemaPath).default || /* istanbul ignore next */ require(realSchemaPath);

  return {
    filePath: realFilePath,
    schema: printSchema(schema)
  };
};
