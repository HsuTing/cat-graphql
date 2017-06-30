#!/usr/bin/env node
'use strict';

import path from 'path';
import process from 'process';
import {printSchema} from 'graphql/utilities';
import memFs from 'mem-fs';
import editor from 'mem-fs-editor';
import chalk from 'chalk';

const root = process.cwd();
const store = memFs.create();
const fs = editor.create(store);
// default config
let schemaPath = './schema';
let filePath = './';
let name = 'schema';

const nextArgv = (argv, index) => {
  if(index + 1 >= process.argv.length)
    throw new Error('This value of the argument is not defined.');

  return process.argv[index + 1];
};

// get config
process.argv.forEach((argv, index) => {
  switch(argv) {
    case '--path':
    case '-p':
      filePath = nextArgv(argv, index);
      break;

    case '--name':
    case '-n':
      name = nextArgv(argv, index);
      break;

    case '--schema':
    case '-s':
      schemaPath = nextArgv(argv, index);
      break;

    default:
      if(index >= 2 && (/-/).test(argv))
        throw new Error(`${argv} is not in the argument list.`);
  }
});

// write schema
const realSchemaPath = path.resolve(root, schemaPath);
const realFilePath = path.resolve(root, filePath, `${name}.graphql`);
const schema = require(realSchemaPath).default || require(realSchemaPath);

fs.write(
  realFilePath,
  printSchema(schema)
);

fs.commit(err => {
  if(err)
    throw new Error(err);

  console.log(chalk.green('rendered ') + chalk.cyan(realFilePath));
});
