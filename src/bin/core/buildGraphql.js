'use strict';

import path from 'path';
import process from 'process';
import {printSchema} from 'graphql/utilities';
import commandLineArgs from 'command-line-args';

const root = process.cwd();

export default argv => {
  const {path: filePath, name, schema: schemaPath} = commandLineArgs([{
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
  const realSchemaPath = path.resolve(root, schemaPath);
  const realFilePath = path.resolve(root, filePath, `${name}.graphql`);
  const schema = require(realSchemaPath).default;

  return {
    filePath: realFilePath,
    schema: printSchema(schema)
  };
};
